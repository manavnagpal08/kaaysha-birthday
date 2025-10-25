"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Heart } from "lucide-react"
import GradientButton from "../GradientButton"

export default function MessageScreen({ onNext }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-200 p-6">

      {/* Floating Hearts Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400"
            initial={{
              y: Math.random() * 600 + 100,
              x: Math.random() * window.innerWidth,
              scale: Math.random() * 0.8 + 0.4,
              opacity: 0,
            }}
            animate={{
              y: [Math.random() * 600 + 100, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 drop-shadow mb-8 text-center"
      >
        🎂 Happy Birthday Kaaysha 💖
      </motion.h2>

      {/* Message Card */}
      <motion.div
        className="relative w-full max-w-lg cursor-pointer [perspective:1000px]"
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="relative w-full h-[360px] md:h-[400px] bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-pink-200 p-6 text-center [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Front Side */}
          <div className="absolute inset-0 flex flex-col justify-center items-center [backface-visibility:hidden]">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl font-semibold text-pink-600 mb-3"
            >
              A Special Message Awaits 🎁
            </motion.h3>
            <p className="text-gray-700 mb-4 text-base md:text-lg max-w-sm">
              Tap to open your birthday surprise 💌
            </p>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="text-pink-500" size={28} />
            </motion.div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#301733] text-base md:text-lg leading-relaxed overflow-y-auto max-h-[300px]"
            >
              Happy Birthday, <strong>Cutiepie 💗</strong>!  
              You deserve all the happiness, love, and smiles in the world today and always.  
              You have this magical way of making everything brighter — your smile, your kindness, and the warmth you bring to everyone around you.  
              I hope your day is filled with laughter, surprises, and little moments that make your heart glow.  
              Keep shining like the star you are ✨, and never stop being your beautiful self.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* Button Section */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <GradientButton onClick={onNext}>
          Continue Celebration <Heart className="ml-2 w-4 h-4" />
        </GradientButton>
      </motion.div>
    </div>
  )
}
