"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, Music } from "lucide-react"
import GradientButton from "../GradientButton"

export default function MessageScreen({ onNext }) {
  const [showMessage, setShowMessage] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(true)

  // Background music
  useEffect(() => {
    const audio = new Audio("/birthday-music.mp3") // put your music in public folder
    audio.loop = true
    if (musicPlaying) audio.play()
    return () => audio.pause()
  }, [musicPlaying])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 p-6">
      
      {/* Music Toggle */}
      <button
        className="absolute top-6 right-6 bg-white/50 backdrop-blur-md px-3 py-2 rounded-full shadow hover:bg-white/80 transition"
        onClick={() => setMusicPlaying(!musicPlaying)}
      >
        <Music className={`w-6 h-6 ${musicPlaying ? "text-pink-500" : "text-gray-400"}`} />
      </button>

      {/* Floating hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400 opacity-50"
          initial={{ y: Math.random() * 600, x: Math.random() * window.innerWidth, scale: Math.random() * 0.5 + 0.5 }}
          animate={{ y: [-100, Math.random() * 600], opacity: [0, 1, 0] }}
          transition={{ duration: Math.random() * 8 + 5, repeat: Infinity, ease: "easeInOut" }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 drop-shadow-lg mb-10 text-center"
      >
        🎂 Happy Birthday Kaaysha 💖
      </motion.h1>

      {/* Reveal Button */}
      {!showMessage && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          onClick={() => setShowMessage(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Open Your Birthday Message 💌
        </motion.button>
      )}

      {/* Message Card */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-lg bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-200 p-8 mt-8 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[#301733] text-base md:text-lg leading-relaxed overflow-y-auto max-h-[350px]"
          >
            💗 Dearest <strong>Kaaysha</strong>,<br /><br />
            On this beautiful day, may your heart be full of laughter, your soul filled with peace, and your path lit with endless joy.  
            You radiate warmth, kindness, and beauty like a soft melody that brightens every room.  
            Never forget how deeply loved and cherished you are.  
            May today and every day after be as stunning and graceful as <strong>you</strong>. 🌸<br /><br />
            With love & smiles — always 💖
          </motion.p>
        </motion.div>
      )}

      {/* Continue Button */}
      {showMessage && (
        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <GradientButton onClick={onNext}>
            Continue the Celebration 🎉 <Heart className="ml-2 w-4 h-4" />
          </GradientButton>
        </motion.div>
      )}

    </div>
  )
}
