import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { scrollToTarget, getLenis } from "../lib/scroll";
import { EASE, EASE_IN_OUT } from "./ui/motion";
import { NAV_ITEMS, LINKEDIN } from "../lib/nav";


export default function Navbar({ ready = true }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sección activa: la que cruza el centro de la pantalla.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const wasOpen = useRef(false);
  useEffect(() => {
    if (!open && !wasOpen.current) return;
    wasOpen.current = open;
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    // Esperamos a que se cierre el menú para que Lenis vuelva a estar activo.
    requestAnimationFrame(() => scrollToTarget(`#${id}`, id === "Home" ? { offset: 0 } : {}));
  };

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-acid"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`pointer-events-none absolute inset-0 -bottom-6 bg-gradient-to-b from-ink via-ink/80 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
        <div className="container-x relative flex items-center justify-between py-4 sm:py-5">
          <a
            href="#Home"
            onClick={(e) => go(e, "Home")}
            className="group relative z-[70] flex items-center gap-2.5"
            aria-label="Ir al inicio"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bone text-sm font-semibold text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
              MS
            </span>
            <span className="hidden text-sm font-medium sm:block">
              Muriel <em className="font-serif text-base font-normal italic">Salbador</em>
            </span>
          </a>

          <nav
            aria-label="Principal"
            className={`hidden items-center gap-1 rounded-full border p-1.5 backdrop-blur-xl transition-colors duration-500 md:flex ${
              scrolled ? "border-white/10 bg-ink/70" : "border-white/[0.06] bg-white/[0.03]"
            }`}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  active === item.id ? "text-ink" : "text-zinc-400 hover:text-bone"
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-bone"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-full bg-acid px-4 py-2.5 text-sm font-medium text-ink md:inline-flex"
            >
              Hablemos
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="relative z-[70] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-ink/60 backdrop-blur-xl md:hidden"
            >
              <span
                className={`h-px w-4 bg-bone transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-4 bg-bone transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-ink-50 px-5 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 42px) 42px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 42px) 42px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 42px) 42px)" }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          >
            <nav aria-label="Menú móvil" className="flex flex-col">
              {NAV_ITEMS.map((item, i) => (
                <div key={item.id} className="overflow-hidden border-b border-white/10">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.25 + i * 0.06 }}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className={`text-5xl font-medium tracking-tight ${active === item.id ? "text-acid" : ""}`}>
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-zinc-500">0{i + 1}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
              className="btn-acid w-full"
            >
              Hablemos <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
