"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import PriceConverter from "../components/PriceConverter";
import ResultDisplay from "../components/ResultDisplay";

const MoneyRunner = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [playerPos, setPlayerPos] = useState(5);
  const [moneyPos, setMoneyPos] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sarcasticRemarks] = useState([
    "INCREDIBLE! You successfully avoided spending $5! Your bank account thanks you!",
    "LEGENDARY! You've mastered the ancient art of... not buying things!",
    "AMAZING! You could've bought a coffee but chose financial responsibility instead!",
    "OUTSTANDING! You've achieved the impossible: keeping money in your wallet!",
    "SPECTACULAR! Your friend would be so proud of this penny-pinching performance!",
    "PHENOMENAL! You've unlocked the 'Cheapskate Champion' achievement!",
  ]);
  const [currentRemark, setCurrentRemark] = useState(0);
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted || gameWon) return;

      if (e.key.toLowerCase() === "d") {
        e.preventDefault();
        setIsRunning(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "d") {
        setIsRunning(false);
      }
    };
    if (gameStarted && !gameWon) {
      document.addEventListener("keydown", handleKeyPress);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [gameStarted, gameWon]);
  useEffect(() => {
    if (!gameStarted || gameWon) return;

    const gameInterval = setInterval(() => {
      if (isRunning) {
        setPlayerPos((prev) => {
          const newPos = prev + 0.8;
          if (newPos >= 90) {
            setGameWon(true);
            setShowConfetti(true);
            setCurrentRemark(
              Math.floor(Math.random() * sarcasticRemarks.length)
            );
            setTimeout(() => setShowConfetti(false), 3000);
            return 90;
          }
          return newPos;
        });
      }

      setMoneyPos((prev) => {
        const newPos = prev + 0.3;
        return Math.min(newPos, 85);
      });
    }, 100);

    return () => clearInterval(gameInterval);
  }, [gameStarted, gameWon, isRunning, sarcasticRemarks.length]);

  const startGame = () => {
    setGameStarted(true);
    setGameWon(false);
    setPlayerPos(5);
    setMoneyPos(0);
    setIsRunning(false);
    setShowInstructions(false);
    setShowConfetti(false);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="terminal-window p-8"
        >
          {" "}
          <h2 className="text-3xl font-bold text-[#DC2626] mb-4 font-mono text-center terminal-flicker">
            MONEY RUNNER
          </h2>
          <p className="text-[#E6E6E6] mb-6 font-mono text-center">
            Hold D to run away from money! Reach the end to achieve ultimate
            cheapskate glory!
          </p>
          {/* Confetti Effect */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-40">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-bounce text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random() * 2}s`,
                  }}
                >
                  {["*", "*", "*", "*", "*"][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>
          )}
          {/* Instructions Popup */}
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            >
              <div className="terminal-window p-8 max-w-lg mx-4">
                {" "}
                <h3 className="text-2xl font-bold text-[#39FF14] mb-4 font-mono text-center">
                  GAME INSTRUCTIONS
                </h3>
                <div className="text-[#E6E6E6] font-mono space-y-3">
                  <p>
                    <span className="text-[#DC2626]">OBJECTIVE:</span> Run away
                    from money and reach the finish line!
                  </p>
                  <p>
                    <span className="text-[#DC2626]">CONTROLS:</span>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Hold D key to run forward</li>
                    <li>Release D to stop running</li>
                  </ul>
                  <p>
                    <span className="text-[#DC2626]">RULES:</span>
                  </p>{" "}
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Money chases you from behind</li>
                    <li>Keep running to avoid it catching up</li>
                    <li>Reach the end of the track to win!</li>
                    <li>Enjoy the sarcastic celebration!</li>
                  </ul>
                </div>
                <div className="flex justify-center space-x-4 mt-6">
                  <button
                    onClick={startGame}
                    className="bg-[#39FF14] text-black px-6 py-2 font-mono font-bold hover:bg-[#2ECC11]"
                  >
                    START GAME
                  </button>
                  <button
                    onClick={() => setShowInstructions(false)}
                    className="bg-[#DC2626] text-white px-6 py-2 font-mono font-bold hover:bg-[#B91C1C]"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          {/* Victory Popup */}
          {gameWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            >
              <div className="terminal-window p-12 max-w-2xl mx-4 text-center">
                <h3 className="text-4xl font-bold text-[#39FF14] mb-6 font-mono animate-pulse">
                  CONGRATULATIONS!
                </h3>
                <p className="text-[#E6E6E6] font-mono text-lg mb-6 leading-relaxed">
                  {sarcasticRemarks[currentRemark]}
                </p>
                <div className="text-6xl mb-6 animate-bounce">🎊🎉✨</div>
                <div className="space-y-4">
                  <p className="text-[#DC2626] font-mono text-xl font-bold">
                    ACHIEVEMENT UNLOCKED: &ldquo;Professional Money
                    Avoider&rdquo;
                  </p>
                  <p className="text-[#666] font-mono text-sm">
                    Your friend would be so proud... or maybe concerned.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setGameStarted(false);
                    setGameWon(false);
                    setShowConfetti(false);
                  }}
                  className="mt-8 bg-[#39FF14] text-black px-8 py-3 font-mono font-bold hover:bg-[#2ECC11] text-xl"
                >
                  RUN AWAY AGAIN!
                </button>
              </div>
            </motion.div>
          )}
          {!gameStarted && !showInstructions ? (
            <div className="text-center">
              <button
                onClick={() => setShowInstructions(true)}
                className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-8 py-3 font-mono font-bold transition-all duration-300 border-2 border-[#DC2626] hover:border-[#39FF14]"
              >
                START RUNNING FROM MONEY
              </button>
            </div>
          ) : gameStarted && !gameWon ? (
            <div>
              {/* Game Track */}
              <div className="relative h-32 bg-[#1A1A1A] border-2 border-[#39FF14] mb-4 overflow-hidden">
                {/* Finish Line */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#39FF14] opacity-50"></div>

                {/* Player */}
                <motion.div
                  animate={{ x: `${playerPos}%` }}
                  className="absolute bottom-4 w-8 h-8 text-2xl"
                  style={{ transform: "translateX(-50%)" }}
                >
                  🏃‍♂️
                </motion.div>

                {/* Money chasing */}
                <motion.div
                  animate={{ x: `${moneyPos}%` }}
                  className="absolute bottom-4 w-8 h-8 text-2xl"
                  style={{ transform: "translateX(-50%)" }}
                >
                  💰
                </motion.div>

                {/* Progress indicator */}
                <div className="absolute top-2 left-2 text-[#39FF14] font-mono text-sm">
                  Progress: {Math.round(playerPos)}%
                </div>
              </div>

              {/* Instructions */}
              <div className="text-center mb-4">
                <p className="text-[#39FF14] font-mono text-lg mb-2">
                  {isRunning
                    ? "🏃‍♂️ RUNNING AWAY FROM FINANCIAL RESPONSIBILITY!"
                    : "💤 Press and hold D to run!"}
                </p>
                <p className="text-[#666] font-mono text-sm">
                  🎮 Hold D key to run away from money!
                </p>
              </div>
            </div>
          ) : null}{" "}
          <div className="mt-6 text-center">
            <p className="text-[#666] font-mono text-sm">
              💡 Pro tip: Running away from money is much easier than actually
              saving it!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface SearchResult {
  originalPrice?: number;
  lethalCopies?: number;
  productName?: string;
  productImage?: string;
  url?: string;
  error?: string;
}

export default function Home() {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Loading overlay
  const LoadingOverlay = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-[#39FF14] text-2xl font-mono flex items-center space-x-4">
        <div className="animate-spin">⚡</div>
        <span>PROCESSING...</span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0B] relative overflow-hidden">
      <AnimatePresence>{isLoading && <LoadingOverlay />}</AnimatePresence>
      {/* Scan lines overlay */}
      <div className="scan-lines"></div>

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, #DC2626 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #39FF14 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, #B30000 0%, transparent 50%)
            `,
            backgroundSize: "400% 400%",
            animation: "float 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 60, 0, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 60, 0, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <Header />

      <main className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-16"
              >
                {" "}
                <h1 className="terminal-text text-6xl md:text-8xl font-bold text-[#E6E6E6] mb-6 leading-tight flicker">
                  <span className="text-[#DC2626]">LETHAL</span>
                  <br />
                  <span className="text-[#E6E6E6]">COPY</span>
                  <br />
                  <span className="text-[#39FF14]">CALCULATOR</span>
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-1 bg-gradient-to-r from-[#DC2626] to-[#39FF14] mx-auto max-w-md mb-8"
                />{" "}
                <p className="text-xl md:text-2xl text-[#E6E6E6] max-w-4xl mx-auto leading-relaxed font-mono">
                  Find out how many copies of{" "}
                  <span className="text-[#DC2626] font-bold terminal-flicker">
                    Lethal Company
                  </span>{" "}
                  you could buy instead!
                  <br />
                  Just paste any product link and see the conversion!
                </p>
              </motion.div>

              {/* Price Converter Component */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="w-full max-w-4xl"
              >
                <PriceConverter
                  onResultAction={setSearchResult}
                  onLoadingAction={setIsLoading}
                />
              </motion.div>
            </section>
            {/* Result Display */}
            <AnimatePresence mode="wait">
              {searchResult && (
                <ResultDisplay
                  result={searchResult}
                  onCloseAction={() => setSearchResult(null)}
                />
              )}{" "}
            </AnimatePresence>{" "}
            {/* Money Runner Game */}
            <MoneyRunner />
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}
