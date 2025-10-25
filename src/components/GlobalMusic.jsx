// components/GlobalMusic.jsx
"use client"

import { useEffect, useRef, useState } from "react"
import { Music } from "lucide-react"

export default function GlobalMusic() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.loop = true
    if (playing) audioRef.current.play()
    return () => audioRef.current.pause()
  }, [playing])

  return (
    <>
      <audio ref={audioRef} src="/birthday-music.mp3" />
      <button
        className="fixed top-4 right-4 bg-white/50 backdrop-blur-md px-3 py-2 rounded-full shadow hover:bg-white/80 transition z-50"
        onClick={() => setPlaying(!playing)}
      >
        <Music className={`w-6 h-6 ${playing ? "text-pink-500" : "text-gray-400"}`} />
      </button>
    </>
  )
}
