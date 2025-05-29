"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ResultDisplayProps {
  result: {
    originalPrice?: number;
    lethalCopies?: number;
    productName?: string;
    productImage?: string;
    url?: string;
    error?: string;
  };
  onCloseAction: () => void;
}

export default function ResultDisplay({
  result,
  onCloseAction,
}: ResultDisplayProps) {
  const priceRef = useRef<HTMLDivElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (result.lethalCopies && priceRef.current && creditsRef.current) {
      // Epic price animation sequence
      const timeline = gsap.timeline(); // Initial pulse effect
      timeline.fromTo(
        priceRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1.2,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      );

      // Credits counter animation
      timeline.fromTo(
        creditsRef.current,
        { scale: 0, y: 100, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.3"
      );

      // Number counting animation
      const copyValue = result.lethalCopies;
      const counterObj = { value: 0 };

      timeline.to(
        counterObj,
        {
          value: copyValue,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (creditsRef.current) {
              creditsRef.current.querySelector(".copy-number")!.textContent =
                Math.ceil(counterObj.value).toString();
            }
          },
        },
        "-=0.5"
      );

      // Final glow effect
      timeline.to([priceRef.current, creditsRef.current], {
        boxShadow: "0 0 50px rgba(255, 60, 0, 0.8)",
        duration: 0.5,
        yoyo: true,
        repeat: 1,
      });
    }
  }, [result]);

  if (result.error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0B0B0B]/95 flex items-center justify-center z-50 p-4"
        onClick={onCloseAction}
      >
        <motion.div
          initial={{ scale: 0.5, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 100 }}
          className="terminal-window p-8 max-w-md text-center border-[#B30000] danger-glow"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-2xl font-bold text-[#B30000] mb-4 terminal-text flicker">
            ERROR
          </h3>
          <p className="text-[#E6E6E6] mb-6 font-mono">{result.error}</p>
          <motion.button
            onClick={onCloseAction}
            className="terminal-button px-6 py-3 font-bold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            TRY AGAIN
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0B0B0B]/98 flex items-center justify-center z-50 p-4"
        onClick={onCloseAction}
      >
        {/* Particle Effects Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#DC2626] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.3, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          exit={{ scale: 0.3, rotateY: -180 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="relative terminal-window p-12 max-w-2xl w-full text-center shadow-2xl border-[#DC2626]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#B30000] mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-[#DC2626] mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-[#39FF14] mr-4"></div>
              <span className="terminal-text text-[#39FF14] text-sm">
                CONVERSION_RESULT.EXE
              </span>
            </div>{" "}
            <motion.button
              onClick={onCloseAction}
              className="text-[#E6E6E6] hover:text-[#DC2626] text-2xl"
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.8 }}
            >
              ✕
            </motion.button>
          </div>
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="text-6xl mb-4">{result.productImage}</div>
            <h2 className="text-2xl font-bold text-[#E6E6E6] mb-2 terminal-text">
              {result.productName}
            </h2>
            <p className="text-[#39FF14] text-sm truncate font-mono">
              {result.url}
            </p>
          </motion.div>
          {/* Original Price */}
          <motion.div
            ref={priceRef}
            className="mb-8 p-6 bg-[#111111] border-2 border-[#333] terminal-window"
          >
            <div className="text-[#E6E6E6] text-lg mb-2 font-mono">
              YOU WASTED
            </div>
            <div className="text-4xl font-bold text-[#E6E6E6] terminal-text">
              ${result.originalPrice?.toFixed(2)}
            </div>
          </motion.div>
          {/* Conversion Arrow */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-6xl mb-8 text-[#39FF14]"
          >
            ⬇️
          </motion.div>{" "}
          {/* Lethal Copies Result */}{" "}
          <motion.div
            ref={creditsRef}
            className="mb-8 p-8 bg-gradient-to-br from-[#DC2626] to-[#B30000] border-4 border-[#39FF14] relative overflow-hidden terminal-window"
          >
            {/* Glowing Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />

            <div className="relative z-10">
              <div className="text-[#39FF14] text-xl font-bold mb-2 terminal-text">
                LETHAL COMPANY COPIES
              </div>
              <div className="text-5xl font-bold text-[#fd0202] flex items-center justify-center terminal-text">
                <span className="copy-number">0</span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="text-[#39FF14]/80 text-sm mt-2 font-mono"
              ></motion.div>
            </div>
          </motion.div>
          {/* Epic Announcement Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, duration: 0.8, ease: "backOut" }}
            className="text-center"
          >
            <motion.h3
              animate={{
                textShadow: [
                  "0 0 10px #DC2626",
                  "0 0 20px #DC2626, 0 0 30px #DC2626",
                  "0 0 10px #DC2626",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl font-bold text-[#DC2626] mb-4 terminal-text flicker"
            >
              CONVERSION COMPLETE!
            </motion.h3>{" "}
            <p className="text-[#E6E6E6] text-lg font-mono">
              YOU COULD HAVE HAD THESE MANY COPIES OF{" "}
              <span className="text-[#DC2626] font-bold terminal-flicker">
                LETHAL COMPANY
              </span>{" "}
              FOR THE PRICE OF THIS ITEM!
            </p>
          </motion.div>
          {/* Try Another Button */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5 }}
            onClick={onCloseAction}
            className="mt-8 terminal-button py-3 px-8 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CONVERT ANOTHER ITEM
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
