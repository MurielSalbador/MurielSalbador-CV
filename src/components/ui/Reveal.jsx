import { motion } from "framer-motion";
import { EASE } from "./motion";

// Aparición suave al entrar en pantalla.
export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

// Cada línea sube desde abajo, recortada por una máscara.
export function LineReveal({ lines, className = "", lineClassName = "", delay = 0, animate }) {
  const trigger = animate === undefined
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-60px" } }
    : { initial: "hidden", animate: animate ? "show" : "hidden" };

  return (
    <motion.span className={`block ${className}`} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 1.1, ease: EASE, delay: delay + i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
