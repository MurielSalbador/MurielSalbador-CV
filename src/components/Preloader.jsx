import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { EASE, EASE_IN_OUT } from "./ui/motion";

const WORDS = ["Hola", "Diseño", "Código", "Datos", "Automatización", "Muriel Salbador"];

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onComplete, 350),
    });
    return () => controls.stop();
  }, [onComplete]);

  useEffect(() => {
    if (index === WORDS.length - 1) return;
    const t = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 700 : 330);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0d0d10] p-5 sm:p-8 lg:p-12"
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: EASE_IN_OUT }}
    >
      <div className="eyebrow flex justify-between">
        <span>Portfolio</span>
        <span>©{new Date().getFullYear()}</span>
      </div>

      <div className="flex items-center justify-center">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="flex items-center gap-3 text-3xl font-medium tracking-tight sm:text-5xl"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-acid" />
          {index === WORDS.length - 1 ? (
            <span>
              Muriel <em className="font-serif font-normal italic">Salbador</em>
            </span>
          ) : (
            WORDS[index]
          )}
        </motion.p>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="mb-3 h-px flex-1 bg-white/10">
          <div className="h-px bg-acid" style={{ width: `${count}%` }} />
        </div>
        <span className="font-mono text-6xl font-light tabular-nums leading-none tracking-tighter sm:text-8xl lg:text-9xl">
          {count}
          <span className="text-acid">%</span>
        </span>
      </div>
    </motion.div>
  );
}
