"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: "CONVERTER", href: "/" },
    { name: "HOW IT WORKS", href: "/how-it-works" },
    { name: "EXAMPLES", href: "/examples" },
    { name: "ABOUT", href: "/about" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 bg-[#0B0B0B]/95 backdrop-blur-md border-b-2 border-[#333]"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {" "}
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-[#DC2626] border-2 border-[#333] flex items-center justify-center terminal-flicker">
              <span className="text-[#0B0B0B] font-bold text-xl terminal-text">
                ₵
              </span>
            </div>{" "}
            <div>
              <h1 className="text-xl font-bold text-[#E6E6E6] terminal-text">
                LETHAL COPY CALCULATOR
              </h1>
              <p className="text-sm text-[#39FF14] font-mono">
                PRODUCT TO GAME COPIES
              </p>
            </div>
          </motion.div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                whileHover={{ scale: 1.1, color: "#DC2626" }}
                className="text-[#E6E6E6] hover:text-[#DC2626] transition-colors duration-300 font-mono font-medium"
              >
                {item.name}
              </motion.a>
            ))}

            {/* Steam Button */}
            <motion.a
              href="https://store.steampowered.com/app/1966720/Lethal_Company/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 + 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#1B2838] hover:bg-[#2A475E] border-2 border-[#DC2626] px-4 py-2 text-[#E6E6E6] font-mono font-medium transition-all duration-300 flex items-center space-x-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1024px-Steam_icon_logo.svg.png"
                alt="Steam logo"
                className="w-5 h-5"
              />
              <span>STEAM</span>
            </motion.a>
          </nav>
          {/* Conversion Rate Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="hidden md:flex items-center space-x-2 bg-[#1A1A1A] px-4 py-2 border-2 border-[#333] terminal-window"
          >
            <span className="text-[#E6E6E6] font-mono text-xs">
              ANY PRODUCT
            </span>
            <span className="text-[#39FF14]">÷10</span>
            <span className="text-[#39FF14]">=</span>
            <span className="text-[#DC2626] font-mono font-bold">
              LETHAL COMPANY
            </span>
          </motion.div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#E6E6E6] focus:outline-none"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 45 : 0 }}
              className="w-6 h-6 flex flex-col justify-center space-y-1"
            >
              {" "}
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 6 : 0,
                }}
                className="block w-6 h-0.5 bg-[#DC2626]"
              />
              <motion.span
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                className="block w-6 h-0.5 bg-[#DC2626]"
              />
              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -6 : 0,
                }}
                className="block w-6 h-0.5 bg-[#DC2626]"
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          {" "}
          <nav className="py-4 space-y-4 border-t border-[#333] mt-4">
            {" "}
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ x: 10, color: "#DC2626" }}
                className="block text-[#E6E6E6] hover:text-[#DC2626] transition-colors duration-300 font-mono"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            {/* Mobile Steam Button */}
            <motion.a
              href="https://store.steampowered.com/app/1966720/Lethal_Company/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 10 }}
              className="bg-[#1B2838] hover:bg-[#2A475E] border-2 border-[#DC2626] px-4 py-2 text-[#E6E6E6] font-mono font-medium transition-all duration-300 flex items-center space-x-2 w-fit"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1024px-Steam_icon_logo.svg.png"
                alt="Steam logo"
                className="w-5 h-5"
              />
              <span>STEAM</span>
            </motion.a>
            <div className="flex items-center space-x-2 bg-[#1A1A1A] px-4 py-2 border-2 border-[#333] w-fit">
              <span className="text-[#E6E6E6] font-mono text-xs">
                ANY PRODUCT
              </span>
              <span className="text-[#39FF14]">÷10</span>
              <span className="text-[#39FF14]">=</span>
              <span className="text-[#DC2626] font-mono font-bold">
                LETHAL COMPANY
              </span>
            </div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}
