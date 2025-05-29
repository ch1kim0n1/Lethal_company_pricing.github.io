"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ProductData {
  name: string;
  price: number;
  image?: string;
  source?: string;
}

interface PriceConverterProps {
  onResultAction: (result: {
    originalPrice?: number;
    lethalCopies?: number;
    productName?: string;
    productImage?: string;
    url?: string;
    error?: string;
  }) => void;
  onLoadingAction: (loading: boolean) => void;
}

export default function PriceConverter({
  onResultAction,
  onLoadingAction,
}: PriceConverterProps) {
  const [url, setUrl] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Real price extraction function using API
  const extractPrice = async (productUrl: string): Promise<ProductData> => {
    try {
      const response = await fetch("/api/scrape-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: productUrl }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to scrape product data");
      }

      if (!result.success || !result.data) {
        throw new Error("Invalid response from scraping service");
      }

      return result.data;
    } catch (error) {
      console.error("Price extraction error:", error);
      throw error;
    }
  };

  const handleSearch = async () => {
    if (!url.trim()) return;

    setIsSearching(true);
    onLoadingAction(true);

    try {
      // Extract price from URL (mock implementation)
      const productData = await extractPrice(url);

      // Convert to Lethal Company copies (divide by 10 and round up)
      const lethalCopies = Math.ceil(productData.price / 10);

      onResultAction({
        originalPrice: productData.price,
        lethalCopies,
        productName: productData.name,
        productImage: productData.image,
        url,
      });
    } catch (error) {
      console.error("Error extracting price:", error);
      // Show error result with more specific message
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      onResultAction({
        error: `Failed to extract price: ${errorMessage}. Supported sites: Amazon, eBay, Walmart, Target, Best Buy.`,
        url,
      });
    } finally {
      setIsSearching(false);
      onLoadingAction(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isSearching) {
      handleSearch();
    }
  };

  return (
    <motion.div
      className="terminal-window p-8 shadow-2xl"
      whileHover={{ scale: 1.02, borderColor: "#DC2626" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col space-y-6">
        {/* Terminal Header */}
        <div className="flex items-center mb-4">
          <div className="w-3 h-3 rounded-full bg-[#39FF14] mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD44] mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-[#B30000] mr-2"></div>
        </div>

        {/* Input Section */}
        <div className="relative">
          <motion.input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="PASTE PRODUCT URL HERE (AMAZON, EBAY, TARGET...)"
            className="terminal-input w-full bg-black/20 text-[#39FF14] p-4 rounded border-2 border-[#39FF14]/50 focus:border-[#39FF14] outline-none"
            whileFocus={{ scale: 1.02 }}
            disabled={isSearching}
          />

          {/* URL Icon */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#39FF14]">
            🔗
          </div>
        </div>

        {/* Search Button */}
        <motion.button
          onClick={handleSearch}
          className="terminal-button relative py-4 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          whileTap={{ scale: 0.95 }}
          disabled={isSearching || !url.trim()}
        >
          {isSearching ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin mr-2">⚡</div>
              PROCESSING...
            </div>
          ) : (
            "CONVERT TO COPIES"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
