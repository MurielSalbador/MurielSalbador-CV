import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToTarget } from "../lib/scroll";
import { NAV_ITEMS, LINKEDIN } from "../lib/nav";
import { EASE } from "./ui/motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Se esconde al bajar y reaparece al subir.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 300 && !open);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(`#${id}`, id === "Home" ? { offset: 0 } : {});
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4"
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full border border-rose/20 bg-ink-100/80 py-2 pl-5 pr-2 shadow-[0_10px_40px_-10px_rgba(255,79,147,0.35)] backdrop-blur-xl">
        <a
          href="#Home"
          onClick={(e) => go(e, "Home")}
          className="font-mono text-sm font-bold tracking-wider"
          aria-label="Ir al inicio"
        >
          <span className="text-rose">MU</span>
          <span className="text-sand">RIEL</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              className={`relative px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wider transition-colors ${
                active === item.id ? "text-rose" : "text-sand-200 hover:text-sand"
              }`}
            >
              {item.label}
              {active === item.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-rose"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rose hidden px-5 py-2 text-xs sm:inline-flex"
          >
            Contratame
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Menú móvil"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-4xl overflow-hidden rounded-3xl border border-rose/20 bg-ink-100/95 p-2 backdrop-blur-xl md:hidden"
          >
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-mono text-sm uppercase tracking-wider ${
                  active === item.id ? "bg-rose/10 text-rose" : "text-sand"
                }`}
              >
                {item.label}
                <span className="text-xs text-sand-400">0{i + 1}</span>
              </a>
            ))}
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn-rose mt-2 w-full">
              Contratame
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
