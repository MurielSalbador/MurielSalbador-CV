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
