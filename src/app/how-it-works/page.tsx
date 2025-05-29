"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "URL INPUT PROTOCOL",
      description:
        "Paste any product URL from supported retailers into the input terminal",
      details: [
        "SUPPORTED: Amazon, eBay, Target, Walmart, Best Buy",
        "URL FORMAT: https://retailer.com/product/item-name",
        "SECURITY: All URLs are sanitized and validated",
        "TIMEOUT: 30 seconds maximum processing time",
      ],
      status: "ACTIVE",
    },
    {
      step: "02",
      title: "AI EXTRACTION ENGINE",
      description:
        "Advanced AI algorithms scan and extract product pricing data",
      details: [
        "SCRAPING: Real-time page analysis",
        "PARSING: Price pattern recognition",
        "VALIDATION: Cross-reference multiple sources",
        "ACCURACY: 99.7% success rate",
      ],
      status: "PROCESSING",
    },
    {
      step: "03",
      title: "CONVERSION ALGORITHM",
      description: "Conversion",
      details: [
        "Literally divide price by 10",
        "ROUNDING: Round up to nearest whole number",
      ],
      status: "CALCULATING",
    },
    {
      step: "04",
      title: "RESULT DEPLOYMENT",
      description:
        "Display converted price with epic visual effects and animations",
      details: [
        "ANIMATION: 3D transforms and particle effects",
        "SOUND: Terminal beeps and confirmation tones",
        "DISPLAY: High-contrast terminal interface",
        "EXPORT: Results can be saved or shared",
      ],
      status: "COMPLETE",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] relative">
      {/* Scan lines overlay */}
      <div className="scan-lines"></div>

      <Header />

      <main className="pt-24 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Terminal Header */}
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
                OPERATION_MANUAL.EXE
              </span>
            </div>
            <h1 className="terminal-text text-4xl md:text-6xl text-[#DC2626] mb-4 flicker">
              HOW IT WORKS
            </h1>
            <div className="typing-text terminal-text text-[#39FF14] text-lg">
              OPERATIONAL PROCEDURES FOR PRICE CONVERSION SYSTEM
            </div>
          </motion.div>

          {/* Process Overview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="terminal-window p-6 mb-8 border-[#39FF14]"
          >
            <h2 className="terminal-text text-2xl text-[#DC2626] mb-4 border-b-2 border-[#333] pb-2">
              [ SYSTEM OVERVIEW ]
            </h2>
            <div className="bg-[#111111] p-6 font-mono">
              <div className="text-[#39FF14] text-center text-lg mb-4">
                CONVERSION PIPELINE ARCHITECTURE
              </div>
              <div className="flex justify-center items-center space-x-4 text-sm">
                <div className="text-[#E6E6E6] bg-[#0B0B0B] p-2 border border-[#DC2626]">
                  URL INPUT
                </div>
                <div className="text-[#DC2626]">→</div>
                <div className="text-[#E6E6E6] bg-[#0B0B0B] p-2 border border-[#DC2626]">
                  AI SCAN
                </div>
                <div className="text-[#DC2626]">→</div>
                <div className="text-[#E6E6E6] bg-[#0B0B0B] p-2 border border-[#DC2626]">
                  CONVERT
                </div>
                <div className="text-[#DC2626]">→</div>
                <div className="text-[#E6E6E6] bg-[#0B0B0B] p-2 border border-[#39FF14]">
                  RESULT
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step-by-Step Process */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className="terminal-window p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Step Header */}
                  <div className="lg:col-span-1">
                    <div className="bg-[#111111] p-6 border border-[#333] text-center">
                      <div className="terminal-text text-[#DC2626] text-3xl mb-2">
                        STEP {step.step}
                      </div>
                      <div className="text-[#E6E6E6] font-mono text-lg mb-4">
                        {step.title}
                      </div>
                      <div
                        className={`inline-block px-3 py-1 border font-mono text-xs ${
                          step.status === "ACTIVE"
                            ? "border-[#39FF14] text-[#39FF14]"
                            : step.status === "PROCESSING"
                            ? "border-[#DC2626] text-[#DC2626]"
                            : step.status === "CALCULATING"
                            ? "border-[#DC2626] text-[#DC2626]"
                            : "border-[#39FF14] text-[#39FF14]"
                        }`}
                      >
                        STATUS: {step.status}
                      </div>
                    </div>
                  </div>

                  {/* Step Details */}
                  <div className="lg:col-span-2">
                    <div className="bg-[#111111] p-6 border border-[#333] h-full">
                      <h3 className="text-[#39FF14] font-mono text-xl mb-4">
                        OPERATION DETAILS
                      </h3>
                      <p className="text-[#E6E6E6] font-mono mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-[#DC2626] font-mono text-sm mb-3">
                          TECHNICAL SPECIFICATIONS:
                        </h4>
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center">
                            <span className="text-[#39FF14] mr-3">■</span>
                            <span className="text-[#E6E6E6] font-mono text-sm">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="terminal-window p-6 mt-8 border-[#B30000] danger-glow"
          >
            <h2 className="terminal-text text-2xl text-[#B30000] mb-4 flicker">
              [ SECURITY PROTOCOLS ]
            </h2>
            <div className="bg-[#0B0B0B] p-4 border-2 border-[#B30000]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#B30000] font-mono text-sm">
                <div>
                  <div className="text-[#DC2626] mb-2">DATA PROTECTION:</div>
                  <ul className="space-y-1">
                    <li>• No personal information stored</li>
                    <li>• URLs processed in real-time</li>
                    <li>• All sessions are anonymous</li>
                    <li>• No tracking or analytics</li>
                  </ul>
                </div>
                <div>
                  <div className="text-[#DC2626] mb-2">SYSTEM INTEGRITY:</div>
                  <ul className="space-y-1">
                    <li>• Encrypted data transmission</li>
                    <li>• Malware scanning enabled</li>
                    <li>• Rate limiting protection</li>
                    <li>• 24/7 monitoring active</li>
                  </ul>
                </div>
              </div>
            </div>{" "}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
