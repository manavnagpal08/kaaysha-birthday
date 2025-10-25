"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { ArrowRight, Flame, WandSparkles } from "lucide-react"

const confettiColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"];

export default function CakeScreen({ onNext, onDecorate }) {
  const [decorated, setDecorated] = useState(false)
  const [lit, setLit] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(true)

  // background music
  useEffect(() => {
    const audio = new Audio("/birthday-music.mp3") // place your mp3 in public folder
    audio.loop = true
    if (musicPlaying) audio.play()
    return () => audio.pause()
  }, [musicPlaying])

  const decorate = () => {
    if (decorated) return
    setDecorated(true)
    setTimeout(() => onDecorate(), 500);
  }

  const lightCandle = () => {
    if (lit) return
    setLit(true)
    setTimeout(() => burst(), 500);
    setTimeout(() => burst(), 1000);
  }

  const burst = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors,
    })
  }

  return (
    <div className="relative px-4 md:px-6 py-10 text-center min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 overflow-hidden">

      {/* Music toggle */}
      <button
        className="absolute top-6 right-6 bg-white/50 backdrop-blur-md px-3 py-2 rounded-full shadow hover:bg-white/80 transition"
        onClick={() => setMusicPlaying(!musicPlaying)}
      >
        <WandSparkles className={`w-6 h-6 ${musicPlaying ? "text-pink-500" : "text-gray-400"}`} />
      </button>

      {/* Floating sparkles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400 opacity-50"
          initial={{ y: Math.random() * 600, x: Math.random() * window.innerWidth, scale: Math.random() * 0.5 + 0.5 }}
          animate={{ y: [-50, Math.random() * 500], opacity: [0, 1, 0], rotate: Math.random() * 360 }}
          transition={{ duration: Math.random() * 8 + 5, repeat: Infinity, ease: "easeInOut" }}
        >
          ✨
        </motion.div>
      ))}

      {/* Birthday message */}
      {lit && (
        <motion.div
          className="absolute top-20 lg:top-24 w-full text-center text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow mb-6 leading-tight px-4"
          style={{ filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        >
          Happy Birthday, Kaaysha! 💖
        </motion.div>
      )}

      {/* Cake + button */}
      <div className="relative flex flex-col items-center gap-8 mt-40">
        <Cake lit={lit} />

        <AnimatePresence mode="wait">
          {!lit ? (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <GradientButton onClick={lightCandle} className="flex items-center gap-2">
                <Flame size={20} /> Light the Candle
              </GradientButton>
            </motion.div>
          ) : (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <GradientButton onClick={onNext} className="flex items-center gap-2">
                Next <ArrowRight size={20} />
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Cake component with gradient layers and flickering flame
function Cake({ lit }) {
  return (
    <div className="flex flex-col items-center relative">
      <div className="relative w-40 h-40 md:w-52 md:h-52">
        {/* Cake layers */}
        <div className="absolute bottom-0 w-full h-16 md:h-20 bg-gradient-to-t from-pink-400 via-pink-300 to-pink-200 rounded-t-2xl shadow-lg"></div>
        <div className="absolute bottom-16 md:bottom-20 w-full h-12 md:h-16 bg-gradient-to-t from-purple-400 via-purple-300 to-purple-200 rounded-t-2xl shadow-md"></div>
        <div className="absolute bottom-28 md:bottom-36 w-full h-10 md:h-12 bg-gradient-to-t from-indigo-400 via-indigo-300 to-indigo-200 rounded-t-2xl shadow-sm"></div>

        {/* Candle */}
        <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-4 h-16 bg-yellow-300 rounded-sm shadow-inner">
          {lit && (
            <motion.div
              className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-full filter blur-sm"
              animate={{
                y: [0, -4, 0],
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
