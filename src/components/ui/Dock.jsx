import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Dock estilo macOS: los íconos se agrandan según la distancia al mouse.
function DockIcon({ mouseX, item }) {
  const ref = useRef(null);
  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - rect.x - rect.width / 2;
  });
  const size = useSpring(useTransform(distance, [-140, 0, 140], [44, 68, 44]), {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      target={item.href.startsWith("#") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={item.label}
      onClick={item.onClick}
      className="group relative"
    >
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-ink-200 px-2 py-1 font-mono text-[10px] text-sand opacity-0 transition-opacity group-hover:opacity-100">
        {item.label}
      </span>
      <motion.span
        ref={ref}
        style={{ width: size, height: size, background: item.bg }}
        className="flex items-center justify-center rounded-[14px] shadow-lg shadow-black/40"
      >
        <Icon className="h-1/2 w-1/2" style={{ color: item.color ?? "#fff" }} />
      </motion.span>
    </a>
  );
}

export default function Dock({ items, className = "" }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      aria-label="Redes"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`flex h-[68px] items-end gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-3 pb-2.5 backdrop-blur-xl ${className}`}
    >
      {items.map((item, i) =>
        item.divider ? (
          <span key={i} className="mb-1.5 h-10 w-px self-end bg-white/15" />
        ) : (
          <DockIcon key={item.label} item={item} mouseX={mouseX} />
        )
      )}
    </motion.nav>
  );
}
