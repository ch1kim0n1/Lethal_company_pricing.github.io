import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

interface ProductData {
  name: string;
  price: number;
  image?: string;
  source?: string;
}

async function scrapeAmazon(url: string): Promise<ProductData> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    let price = 0;
    let productName = 'Amazon Product';

    // Enhanced price selectors with cheerio
    const priceSelectors = [
      '.a-price .a-offscreen',
      '.a-price-whole',
      '.a-price-range .a-offscreen',
      '.a-price.a-text-price.a-size-medium.a-color-base .a-offscreen',
      '#corePrice_feature_div .a-offscreen',
      '.a-price-current .a-offscreen',
      '.a-button-text .a-offscreen',
      '[data-testid="price"] .a-offscreen',
    ];

    // Try to extract price using cheerio selectors
    for (const selector of priceSelectors) {
      const priceElement = $(selector).first();
      if (priceElement.length > 0) {
        const priceText = priceElement.text().trim();
        const priceMatch = priceText.match(/[\d,]+\.?\d*/);
        if (priceMatch) {
          const parsedPrice = parseFloat(priceMatch[0].replace(/,/g, ''));
          if (!isNaN(parsedPrice) && parsedPrice > 0) {
            price = parsedPrice;
            break;
          }
        }
      }
    }

    // Fallback to regex if cheerio fails
    if (price === 0) {
      const priceRegexes = [
        /'priceAmount':'([^']+)'/,
        /"priceAmount":"([^"]+)"/,
        /\$([0-9,]+\.?[0-9]*)/,
        /price.*?\$([0-9,]+\.?[0-9]*)/i,
        /\$([0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?)/,
      ];

      for (const regex of priceRegexes) {
        const match = html.match(regex);
        if (match) {
          const priceStr = match[1].replace(/[,$]/g, '');
          const parsedPrice = parseFloat(priceStr);
          if (!isNaN(parsedPrice) && parsedPrice > 0) {
            price = parsedPrice;
            break;
          }
        }
      }
    }

    // Extract product name with cheerio
    const titleSelectors = [
      '#productTitle',
      '.product-title',
      '[data-testid="product-title"]',
      'h1.a-size-large',
      'h1[data-automation-id="product-title"]',
    ];

    for (const selector of titleSelectors) {
      const titleElement = $(selector).first();
      if (titleElement.length > 0) {
        productName = titleElement.text().trim().substring(0, 100);
        if (productName.length > 10) break; // Got a good title
      }
    }

    // Fallback to regex for title
    if (productName === 'Amazon Product') {
      const titleMatch = html.match(/<title[^>]*>([^<]+)</i);
      if (titleMatch) {
        productName = titleMatch[1].trim().replace(/\s+/g, ' ').substring(0, 100);
        if (productName.includes('Amazon.com')) {
          productName = productName.split(':')[0].trim();
        }
      }
    }

    if (price === 0) {
      throw new Error('Could not extract price from Amazon page');
    }

    return {
      name: productName,
      price,
      image: '📦',
      source: 'amazon',
    };
  } catch (error) {
    console.error('Amazon scraping error:', error);
    throw new Error('Failed to scrape Amazon product');
  }
}

async function scrapeEbay(url: string): Promise<ProductData> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const html = await response.text();
    
    // eBay price selectors
    const priceSelectors = [
      /US \$([0-9,]+\.?[0-9]*)/,
      /\$([0-9,]+\.?[0-9]*)/,
      /"price":{"value":"([^"]+)"/,
      /notranslate[^>]*>\$([0-9,]+\.?[0-9]*)/,
    ];

    let price = 0;
    for (const selector of priceSelectors) {
      const match = html.match(selector);
      if (match) {
        const priceStr = match[1].replace(/[,$]/g, '');
        const parsedPrice = parseFloat(priceStr);
        if (!isNaN(parsedPrice) && parsedPrice > 0) {
          price = parsedPrice;
          break;
        }
      }
    }

    // Extract product name
    const titleMatch = html.match(/<title[^>]*>([^<]+)</i);
    let productName = 'eBay Item';
    if (titleMatch) {
      productName = titleMatch[1].split('|')[0].trim().substring(0, 100);
    }

    if (price === 0) {
      throw new Error('Could not extract price from eBay page');
    }

    return {
      name: productName,
      price,
      image: '🏷️',
      source: 'ebay',
    };
  } catch (error) {
    console.error('eBay scraping error:', error);
    throw new Error('Failed to scrape eBay product');
  }
}

async function scrapeWalmart(url: string): Promise<ProductData> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const html = await response.text();
    
    // Walmart price selectors
    const priceSelectors = [
      /"currentPrice":\{"price":"([^"]+)"/,
      /\$([0-9,]+\.?[0-9]*)/,
      /"price":"([^"]+)"/,
    ];

    let price = 0;
    for (const selector of priceSelectors) {
      const match = html.match(selector);
      if (match) {
        const priceStr = match[1].replace(/[,$]/g, '');
        const parsedPrice = parseFloat(priceStr);
        if (!isNaN(parsedPrice) && parsedPrice > 0) {
          price = parsedPrice;
          break;
        }
      }
    }

    // Extract product name
    const titleMatch = html.match(/<title[^>]*>([^<]+)</i);
    let productName = 'Walmart Item';
    if (titleMatch) {
      productName = titleMatch[1].split('|')[0].trim().substring(0, 100);
    }

    if (price === 0) {
      throw new Error('Could not extract price from Walmart page');
    }

    return {
      name: productName,
      price,
      image: '🛒',
      source: 'walmart',
    };
  } catch (error) {
    console.error('Walmart scraping error:', error);
    throw new Error('Failed to scrape Walmart product');
  }
}

async function scrapeTarget(url: string): Promise<ProductData> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const html = await response.text();
    
    // Target price selectors
    const priceSelectors = [
      /"currentPrice":"([^"]+)"/,
      /\$([0-9,]+\.?[0-9]*)/,
      /"price":"([^"]+)"/,
    ];

    let price = 0;
    for (const selector of priceSelectors) {
      const match = html.match(selector);
      if (match) {
        const priceStr = match[1].replace(/[,$]/g, '');
        const parsedPrice = parseFloat(priceStr);
        if (!isNaN(parsedPrice) && parsedPrice > 0) {
          price = parsedPrice;
          break;
        }
      }
    }

    // Extract product name
    const titleMatch = html.match(/<title[^>]*>([^<]+)</i);
    let productName = 'Target Item';
    if (titleMatch) {
      productName = titleMatch[1].split(':')[0].trim().substring(0, 100);
    }

    if (price === 0) {
      throw new Error('Could not extract price from Target page');
    }

    return {
      name: productName,
      price,
      image: '🎯',
      source: 'target',
    };
  } catch (error) {
    console.error('Target scraping error:', error);
    throw new Error('Failed to scrape Target product');
  }
}

async function scrapeBestBuy(url: string): Promise<ProductData> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const html = await response.text();
    
    // Best Buy price selectors
    const priceSelectors = [
      /"currentPrice":"([^"]+)"/,
      /\$([0-9,]+\.?[0-9]*)/,
      /"price":"([^"]+)"/,
    ];

    let price = 0;
    for (const selector of priceSelectors) {
      const match = html.match(selector);
      if (match) {
        const priceStr = match[1].replace(/[,$]/g, '');
        const parsedPrice = parseFloat(priceStr);
        if (!isNaN(parsedPrice) && parsedPrice > 0) {
          price = parsedPrice;
          break;
        }
      }
    }

    // Extract product name
    const titleMatch = html.match(/<title[^>]*>([^<]+)</i);
    let productName = 'Best Buy Item';
    if (titleMatch) {
      productName = titleMatch[1].split('|')[0].trim().substring(0, 100);
    }

    if (price === 0) {
      throw new Error('Could not extract price from Best Buy page');
    }

    return {
      name: productName,
      price,
      image: '🔌',
      source: 'bestbuy',
    };
  } catch (error) {
    console.error('Best Buy scraping error:', error);
    throw new Error('Failed to scrape Best Buy product');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const domain = parsedUrl.hostname.toLowerCase();
    let productData: ProductData;

    // Route to appropriate scraper based on domain
    if (domain.includes('amazon')) {
      productData = await scrapeAmazon(url);
    } else if (domain.includes('ebay')) {
      productData = await scrapeEbay(url);
    } else if (domain.includes('walmart')) {
      productData = await scrapeWalmart(url);
    } else if (domain.includes('target')) {
      productData = await scrapeTarget(url);
    } else if (domain.includes('bestbuy')) {
      productData = await scrapeBestBuy(url);
    } else {
      return NextResponse.json(
        { error: 'Unsupported retailer. Supported: Amazon, eBay, Walmart, Target, Best Buy' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data: productData });

  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to scrape product data',
        details: 'Make sure the URL is a valid product page with visible pricing'
      },
      { status: 500 }
    );
  }
}
