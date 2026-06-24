import React, { useEffect, useRef } from "react"

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * 6,
  opacity: Math.random() * 0.4 + 0.1,
}));

const AnimatedBackground = () => {
  const blobRefs = useRef([])
  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ]

  useEffect(() => {
    let currentScroll = 0

    const handleScroll = () => {
      const newScroll = window.pageYOffset
      currentScroll = newScroll

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
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20" />
        <div ref={(r) => (blobRefs.current[1] = r)}
          className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block" />
        <div ref={(r) => (blobRefs.current[2] = r)}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20" />
        <div ref={(r) => (blobRefs.current[3] = r)}
          className="absolute -bottom-10 right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              animation: `floatParticle ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* 3D rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.03] pointer-events-none hidden md:flex">
        <div className="relative w-[700px] h-[700px]" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
          {[0, 60, 120].map((rot, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-purple-400"
              style={{
                transform: `rotateX(${70 + rot}deg) rotateZ(${rot}deg)`,
                animation: `spinRing ${20 + i * 5}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatParticle {
          0%   { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-30px) translateX(15px); }
        }
        @keyframes spinRing {
          from { transform: rotateX(70deg) rotateZ(0deg); }
          to   { transform: rotateX(70deg) rotateZ(360deg); }
        }
      `}</style>
    </div>
  )
}

export default AnimatedBackground
