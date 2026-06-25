import React, { useEffect, useRef } from "react"
import NeuralNetwork from "./NeuralNetwork"

const AnimatedBackground = () => {
  const blobRefs = useRef([])
  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const newScroll = window.pageYOffset
      blobRefs.current.forEach((blob, index) => {
        if (!blob) return
        const initialPos = initialPositions[index]
        const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340
        const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40
        blob.style.transform = `translate(${initialPos.x + xOffset}px, ${initialPos.y + yOffset}px)`
        blob.style.transition = "transform 1.4s ease-out"
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Blobs */}
      <div className="absolute inset-0">
        <div ref={(r) => (blobRefs.current[0] = r)}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 md:opacity-15" />
        <div ref={(r) => (blobRefs.current[1] = r)}
          className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 md:opacity-15 hidden sm:block" />
        <div ref={(r) => (blobRefs.current[2] = r)}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 md:opacity-15" />
        <div ref={(r) => (blobRefs.current[3] = r)}
          className="absolute -bottom-10 right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-15 md:opacity-8 hidden sm:block" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Neural Network 3D */}
      <NeuralNetwork />

      {/* Scan line overlay for hacker feel */}
      <div className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(99,102,241,0.012) 2px, rgba(99,102,241,0.012) 4px)',
        }}
      />

      {/* Corner accent glows */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top left, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle at bottom right, rgba(168,85,247,0.06) 0%, transparent 70%)' }} />
    </div>
  )
}

export default AnimatedBackground
