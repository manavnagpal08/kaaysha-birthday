"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Heart } from "lucide-react"
import GradientButton from "../GradientButton"

export default function MessageScreen({ onNext }) {
  const [flipped, setFlipped] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (flipped) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }, [flipped])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 p-6">

      {/* Soft Glow Orbs Background */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-soft-light blur-3xl opacity-30"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            background: `radial-gradient(circle, rgba(255,182,193,0.6), transparent)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 10 + 8,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 drop-shadow-lg mb-10 text-center"
      >
        🎂 Happy Birthday Kaaysha 💖
      </motion.h1>

      {/* Floating Sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400 opacity-70"
          initial={{
            y: Math.random() * 500 + 100,
            x: Math.random() * window.innerWidth,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [-100, Math.random() * 600 + 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Confetti Burst */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  backgroundColor: ["#f472b6", "#ec4899", "#a855f7", "#fb7185", "#f9a8d4"][i % 5],
                  width: 8,
                  height: 8,
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 400,
                  rotate: Math.random() * 360,
                  opacity: [1, 0],
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Birthday Card with Candle Glow */}
      <motion.div
        className="relative w-full max-w-md cursor-pointer [perspective:1000px]"
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="relative w-full h-[380px] md:h-[420px] bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-200 p-8 text-center [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* Front Side */}
          <div className="absolute inset-0 flex flex-col justify-center items-center [backface-visibility:hidden]">
            <div className="relative mb-5">
              <motion.div
                className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 w-3 h-6 bg-yellow-300 rounded-full shadow-lg"
                animate={{
                  opacity: [1, 0.8, 1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                }}
              />
              <motion.div className="w-8 h-20 bg-gradient-to-t from-pink-400 to-pink-200 rounded-full shadow-inner"></motion.div>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-pink-600 mb-3">
              Tap to Open Your Wish 💌
            </h3>
            <p className="text-gray-700 text-base md:text-lg">
              A heartfelt message awaits just for you...
            </p>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#301733] text-base md:text-lg leading-relaxed overflow-y-auto max-h-[300px]"
            >
              💗 Dearest <strong>Kaaysha</strong>,  
              On this beautiful day, may your heart be full of laughter, your soul filled with peace, and your path lit with endless joy.  
              You radiate warmth, kindness, and beauty like a soft melody that brightens every room.  
              Never forget how deeply loved and cherished you are.  
              May today and every day after be as stunning and graceful as *you*. 🌸  
              <br />
              With love & smiles — always 💖
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <GradientButton onClick={onNext}>
          Continue the Celebration 🎉 <Heart className="ml-2 w-4 h-4" />
        </GradientButton>
      </motion.div>
    </div>
  )
}
