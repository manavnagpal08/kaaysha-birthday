"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Heart, Music } from "lucide-react"
import GradientButton from "../GradientButton"

export default function MessageScreen({ onNext }) {
  const [flipped, setFlipped] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(true)

  // Play music
  useEffect(() => {
    const audio = new Audio("/birthday-music.mp3") // add your mp3 in public folder
    audio.loop = true
    if (musicPlaying) audio.play()
    return () => audio.pause()
  }, [musicPlaying])

  // Show confetti on flip
  useEffect(() => {
    if (flipped) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [flipped])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 p-6">

      {/* Music toggle button */}
      <button
        className="absolute top-6 right-6 bg-white/50 backdrop-blur-md px-3 py-2 rounded-full shadow hover:bg-white/80 transition"
        onClick={() => setMusicPlaying(!musicPlaying)}
      >
        <Music className={`w-6 h-6 ${musicPlaying ? "text-pink-500" : "text-gray-400"}`} />
      </button>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 drop-shadow-lg mb-10 text-center"
      >
        🎂 Happy Birthday Kaaysha 💖
      </motion.h1>

      {/* Confetti */}
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

      {/* Card */}
      <div className="relative w-full max-w-md h-[400px] [perspective:1000px] cursor-pointer" onClick={() => setFlipped(!flipped)}>
        <motion.div
          className="relative w-full h-full rounded-3xl shadow-2xl border border-pink-200 bg-white/40 backdrop-blur-xl [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Front */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 [backface-visibility:hidden]">
            <h3 className="text-2xl md:text-3xl font-semibold text-pink-600 mb-3">Tap to Open Your Wish 💌</h3>
            <p className="text-gray-700 text-base md:text-lg text-center">
              A heartfelt message awaits just for you...
            </p>
            <ArrowRight className="mt-4 text-pink-500 w-6 h-6 animate-bounce" />
          </div>

          {/* Back */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-[#301733] text-base md:text-lg leading-relaxed overflow-y-auto text-center max-h-[350px]">
              💗 Dearest <strong>Kaaysha</strong>,<br /><br />
              On this beautiful day, may your heart be full of laughter, your soul filled with peace, and your path lit with endless joy.  
              You radiate warmth, kindness, and beauty like a soft melody that brightens every room.  
              Never forget how deeply loved and cherished you are.  
              May today and every day after be as stunning and graceful as <strong>you</strong>. 🌸  
              <br /><br />
              With love & smiles — always 💖
            </p>
          </div>
        </motion.div>
      </div>

      {/* Continue button */}
      <motion.div className="mt-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
        <GradientButton onClick={onNext}>
          Continue the Celebration 🎉 <Heart className="ml-2 w-4 h-4" />
        </GradientButton>
      </motion.div>
    </div>
  )
}
