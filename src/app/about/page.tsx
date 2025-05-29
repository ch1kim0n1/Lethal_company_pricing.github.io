"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] relative">
      <div className="scan-lines"></div>

      <Header />

      <main className="pt-24 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
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
                SYSTEM_INFO.EXE
              </span>
            </div>
            <h1 className="terminal-text text-4xl md:text-6xl text-[#DC2626] mb-4 flicker">
              ABOUT THE CONVERTER
            </h1>
            <div className="typing-text terminal-text text-[#39FF14] text-lg">
              AUTHORIZED PERSONNEL ONLY - CLEARANCE LEVEL: OMEGA
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="terminal-window p-6 mb-8"
          >
            <h2 className="terminal-text text-2xl text-[#DC2626] mb-4 border-b-2 border-[#333] pb-2">
              [ WHY THIS EXISTS ]
            </h2>
            <div className="space-y-4 text-[#E6E6E6]">
              <p className="font-mono leading-relaxed">
                The{" "}
                <span className="text-[#39FF14]">
                  LETHAL COMPANY PRICE CONVERTER
                </span>{" "}
                is an advanced economic analysis tool designed to translate
                anything into Lethal Companies.
              </p>
              <p className="font-mono leading-relaxed">
                In the year 2170, as humanity expands into the outer reaches of
                space, Arnav would still not buy shit and say its too expensive.
                Never a game, never something cool, therefore this system is
                established to show that bafoon what hes missing out on.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="terminal-window p-6 mb-8"
          >
            <h2 className="terminal-text text-2xl text-[#DC2626] mb-4 border-b-2 border-[#333] pb-2">
              [ TECHNICAL SPECIFICATIONS ]
            </h2>
            <div className="terminal-grid grid-cols-1 md:grid-cols-2 p-4">
              <div className="bg-[#111111] p-4">
                <h3 className="text-[#39FF14] font-mono text-lg mb-2">
                  SYSTEM STATUS
                </h3>
                <ul className="space-y-2 font-mono text-sm">
                  <li>
                    <span className="text-[#DC2626]">█</span> AI EXTRACTION:{" "}
                    <span className="status-active">ONLINE</span>
                  </li>
                  <li>
                    <span className="text-[#DC2626]">█</span> PRICE ANALYSIS:{" "}
                    <span className="status-active">ACTIVE</span>
                  </li>
                  <li>
                    <span className="text-[#DC2626]">█</span> CONVERSION ENGINE:{" "}
                    <span className="status-active">OPERATIONAL</span>
                  </li>
                  <li>
                    <span className="text-[#DC2626]">█</span> DATABASE:{" "}
                    <span className="status-active">SYNCED</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#111111] p-4">
                <h3 className="text-[#39FF14] font-mono text-lg mb-2">
                  SUPPORTED RETAILERS
                </h3>
                <ul className="space-y-2 font-mono text-sm">
                  <li>
                    <span className="text-[#39FF14]">{">"}</span> AMAZON.COM
                  </li>
                  <li>
                    <span className="text-[#39FF14]">{">"}</span> EBAY.COM
                  </li>
                  <li>
                    <span className="text-[#39FF14]">{">"}</span> TARGET.COM
                  </li>
                  <li>
                    <span className="text-[#39FF14]">{">"}</span> WALMART.COM
                  </li>
                  <li>
                    <span className="text-[#39FF14]">{">"}</span> BESTBUY.COM
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="terminal-window p-6 mb-8 border-[#B30000] danger-glow"
          >
            <h2 className="terminal-text text-2xl text-[#B30000] mb-4 flicker">
              ⚠ WARNING - COMPANY NOTICE ⚠
            </h2>
            <div className="bg-[#0B0B0B] p-4 border-2 border-[#B30000]">
              <p className="font-mono text-[#B30000] text-center text-lg leading-relaxed">
                THIS TOOL IS FOR SIMULATION PURPOSES ONLY.
                <br />
                THE COMPANY IS NOT RESPONSIBLE FOR ANY FINANCIAL DECISIONS
                <br />
                MADE BASED ON CONVERSION RESULTS.
                <br />
                <span className="text-[#DC2626]">
                  ACTUAL MORTALITY RATES MAY VARY.
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="terminal-window p-6 mb-8"
          >
            <h2 className="terminal-text text-2xl text-[#DC2626] mb-4 border-b-2 border-[#333] pb-2">
              [ DEVELOPMENT TEAM ]
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  role: "Literally did everything",
                  name: "Vlad",
                  status: "ACTIVE ASF",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-[#111111] p-4 border border-[#333]"
                >
                  <div className="text-[#39FF14] font-mono text-sm mb-1">
                    {member.role}
                  </div>
                  <div className="text-[#E6E6E6] font-mono text-lg mb-2">
                    {member.name}
                  </div>
                  <div
                    className={`font-mono text-xs ${
                      member.status === "ACTIVE"
                        ? "status-active"
                        : member.status === "MIA"
                        ? "status-warning"
                        : "status-danger"
                    }`}
                  >
                    STATUS: {member.status}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-center"
          >
            <div className="terminal-window p-8 inline-block">
              <div className="text-6xl text-[#DC2626] mb-4">₵</div>
              <div className="terminal-text text-[#39FF14] text-xl">
                THE COMPANY
              </div>
              <div className="font-mono text-[#E6E6E6] text-sm mt-2">
                &ldquo;WE OWN ARNAV&rdquo;
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
