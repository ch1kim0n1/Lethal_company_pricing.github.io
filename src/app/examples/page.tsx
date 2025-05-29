"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";

export default function Examples() {
  const examples = [
    {
      category: "ELECTRONICS",
      items: [
        {
          name: "Premium Wireless Headphones",
          retailer: "AMAZON",
          price: 89.99,
          copies: 9,
          emoji: "🎧",
        },
        {
          name: "Gaming Mechanical Keyboard",
          retailer: "BESTBUY",
          price: 129.99,
          copies: 13,
          emoji: "⌨️",
        },
        {
          name: "Smart Watch Series X",
          retailer: "APPLE",
          price: 399.0,
          copies: 40,
        },
        {
          name: "Bluetooth Speaker Pro",
          retailer: "TARGET",
          price: 67.5,
          copies: 7,
        },
      ],
    },
    {
      category: "TOOLS & EQUIPMENT",
      items: [
        {
          name: "LED Flashlight Tactical",
          retailer: "AMAZON",
          price: 24.99,
          copies: 3,
          emoji: "🔦",
        },
        {
          name: "Multi-tool Professional",
          retailer: "HOMEDEPOT",
          price: 45.0,
          copies: 5,
          emoji: "🔧",
        },
        {
          name: "Emergency Radio Solar",
          retailer: "WALMART",
          price: 32.99,
          copies: 4,
          emoji: "📻",
        },
        {
          name: "Survival Kit Deluxe",
          retailer: "EBAY",
          price: 89.99,
          copies: 9,
          emoji: "🎒",
        },
      ],
    },
    {
      category: "HOUSEHOLD ITEMS",
      items: [
        {
          name: "Kitchen Soap Dispenser",
          retailer: "TARGET",
          price: 12.99,
          copies: 2,
          emoji: "🧼",
        },
        {
          name: "Coffee Maker Premium",
          retailer: "AMAZON",
          price: 149.99,
          copies: 15,
          emoji: "☕",
        },
        {
          name: "Air Purifier HEPA",
          retailer: "COSTCO",
          price: 199.99,
          copies: 20,
          emoji: "💨",
        },
        {
          name: "Desk Lamp LED Adjustable",
          retailer: "IKEA",
          price: 34.99,
          copies: 4,
          emoji: "💡",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] relative">
      <div className="scan-lines"></div>

      <Header />

      <main className="pt-24 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="terminal-window p-6 mb-8 terminal-flicker"
          >
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-[#B30000] mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-[#DC2626] mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-[#39FF14] mr-4"></div>
              <span className="terminal-text text-[#39FF14] text-sm">
                CONVERSION_EXAMPLES.EXE
              </span>
            </div>
            <h1 className="terminal-text text-4xl md:text-6xl text-[#DC2626] mb-4 flicker">
              CONVERSION EXAMPLES
            </h1>{" "}
            <div className="typing-text terminal-text text-[#39FF14] text-lg">
              REAL PRODUCT PRICE CONVERSIONS - EARTH TO LETHAL COMPANY COPIES
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="terminal-window p-4 mb-8 border-[#39FF14] glow text-center"
          >
            {" "}
            <div className="text-[#39FF14] terminal-text text-2xl mb-2">
              CURRENT CONVERSION RATE
            </div>
            <div className="text-[#E6E6E6] font-mono text-4xl">
              <span className="text-[#DC2626]">ANY PRODUCT</span>
              <span className="text-[#39FF14] mx-4">÷10 =</span>
              <span className="text-[#DC2626]">LETHAL COMPANY</span>
            </div>
            <div className="text-[#39FF14] font-mono text-sm mt-2">
              LAST UPDATED: 2170.03.15 - COMPANY STANDARD TIME
            </div>
          </motion.div>
          {examples.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + categoryIndex * 0.2 }}
              className="mb-8"
            >
              <div className="terminal-window p-6">
                <h2 className="terminal-text text-2xl text-[#DC2626] mb-6 border-b-2 border-[#333] pb-2">
                  [ {category.category} ]
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.6 + categoryIndex * 0.2 + itemIndex * 0.1,
                      }}
                      className="bg-[#111111] border border-[#333] p-4 hover:border-[#DC2626] transition-all duration-300"
                    >
                      <div className="flex items-center mb-3">
                        <span className="text-3xl mr-3">{item.emoji}</span>
                        <div className="flex-1">
                          <div className="text-[#E6E6E6] font-mono text-lg leading-tight">
                            {item.name}
                          </div>
                          <div className="text-[#39FF14] font-mono text-xs">
                            SOURCE: {item.retailer}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-[#333] pt-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[#E6E6E6] font-mono text-sm">
                            MONEY WASTED:
                          </span>
                          <span className="text-[#DC2626] font-mono text-lg font-bold">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>{" "}
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[#E6E6E6] font-mono text-sm">
                            LETHAL COMPANY COPIES:
                          </span>
                          <span className="text-[#39FF14] font-mono text-lg font-bold">
                            {item.copies}
                          </span>
                        </div>
                        <div className="bg-[#0B0B0B] p-2 border border-[#DC2626] text-center">
                          <span className="text-[#DC2626] font-mono text-xs">
                            CONVERSION: ÷10 ROUNDED UP
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="terminal-window p-6 border-[#39FF14]"
          >
            <h2 className="terminal-text text-2xl text-[#DC2626] mb-4 border-b-2 border-[#333] pb-2">
              [ QUICK TEST URLS ]
            </h2>
            <div className="space-y-3">
              <p className="text-[#E6E6E6] font-mono mb-4">
                Copy and paste these example URLs into the converter to test:
              </p>

              {[
                "https://amazon.com/product/wireless-headphones",
                "https://ebay.com/item/vintage-gaming-console",
                "https://target.com/product/kitchen-soap-dispenser",
                "https://bestbuy.com/bluetooth-speaker-pro",
              ].map((url, index) => (
                <div
                  key={index}
                  className="bg-[#111111] p-3 border border-[#333] font-mono text-sm"
                >
                  <span className="text-[#39FF14]">{">"}</span>
                  <span className="text-[#E6E6E6] ml-2">{url}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-8 text-center"
          >
            <div className="terminal-window p-4 border-[#B30000] inline-block">
              <div className="text-[#B30000] font-mono text-sm flicker">
                ⚠ DISCLAIMER: PRICES ARE SIMULATED FOR DEMONSTRATION ⚠
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
