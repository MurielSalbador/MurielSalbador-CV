import { memo, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Eye, GraduationCap, X } from "lucide-react";
import { CERTIFICATES, EXPERIENCE } from "../data/projects";
import { Reveal } from "../components/ui/Reveal";
import SectionTitle from "../components/ui/SectionTitle";
import { getLenis } from "../lib/scroll";
import { EASE } from "../components/ui/motion";

const Lightbox = ({ cert, onClose }) => {
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink-100 hover:border-rose hover:text-rose"
      >
        <X className="h-5 w-5" />
      </button>
      <motion.img
        src={cert.img}
        alt={cert.title}
        initial={{ scale: 0.9, rotate: -2, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-[0_0_80px_-10px_rgba(255,79,147,0.5)]"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
};

// Línea de tiempo cuya línea se "llena" a medida que se scrollea.
const Timeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className="relative pl-10">
      <div className="absolute bottom-2 left-[11px] top-2 w-px bg-white/10" aria-hidden="true" />
      <motion.div
        className="absolute left-[11px] top-2 w-px origin-top bg-gradient-to-b from-rose via-rose-300 to-rose-600 shadow-[0_0_12px_rgba(255,79,147,0.8)]"
        style={{ scaleY: fill, bottom: 8 }}
        aria-hidden="true"
      />
      <ol className="space-y-6">
        {EXPERIENCE.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal as="li" key={item.title} delay={i * 0.08} className="relative">
              <span className="absolute -left-10 top-5 flex h-6 w-6 items-center justify-center rounded-full border border-rose/50 bg-ink shadow-[0_0_14px_rgba(255,79,147,0.6)]">
                <span className="h-2 w-2 rounded-full bg-rose" />
              </span>
              <div className="rounded-xl border border-white/[0.08] bg-ink-100/70 p-5 transition-colors duration-300 hover:border-rose/40">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-sand">{item.title}</h4>
                    <p className="mt-0.5 flex items-center gap-1.5 font-mono text-xs text-rose">
                      <Icon className="h-3.5 w-3.5" /> {item.company}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-sand-400">
                    {item.period}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-sand-200">
                  {item.tasks.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-rose">›</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
};

const Journey = () => {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  const certificates = CERTIFICATES.filter((c) => c.img);
  const education = CERTIFICATES.filter((c) => !c.img);

  return (
    <section id="Trayectoria" className="relative border-t border-white/[0.08] py-24 lg:py-32">
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-rose-900/50 blur-[140px]" aria-hidden="true" />

      <div className="container-x relative">
        <div className="text-center">
          <Reveal as="h2" className="font-display text-5xl font-medium sm:text-6xl">
            Trayectoria
          </Reveal>
          <Reveal delay={0.05} className="mt-3 font-mono text-xs text-sand-400 sm:text-sm">
            Experiencia profesional, formación y certificaciones
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionTitle className="mb-8">Experiencia</SectionTitle>
            <Timeline />
          </div>

          <div>
            <SectionTitle className="mb-8">Educación</SectionTitle>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <Reveal key={edu.id} delay={i * 0.08}>
                  <div className="group flex gap-4 rounded-xl border border-white/[0.08] bg-ink-100/70 p-5 transition-all duration-300 hover:translate-x-1 hover:border-rose/40">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-rose/10 text-rose transition-transform group-hover:rotate-6">
                      <GraduationCap className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-semibold text-sand">{edu.title}</h4>
                      <p className="mt-0.5 font-mono text-xs text-rose">{edu.issuer}</p>
                      <p className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] text-sand-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {edu.year}
                        </span>
                        {edu.detail && <span className="text-sand">★ {edu.detail}</span>}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Certificados */}
        <div className="mt-24">
          <SectionTitle className="mb-8">Certificados</SectionTitle>
          <div className="grid gap-5 md:grid-cols-2">
            {certificates.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 0.1}>
                <button
                  type="button"
                  onClick={() => setSelected(cert)}
                  className="group grid h-full w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-100/70 text-left transition-all duration-500 hover:-translate-y-1 hover:border-rose/40 hover:shadow-[0_20px_50px_-20px_rgba(255,79,147,0.6)] sm:grid-cols-5"
                >
                  <div className="relative overflow-hidden sm:col-span-2">
                    <img
                      src={cert.img}
                      alt=""
                      loading="lazy"
                      className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-full"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent sm:bg-gradient-to-r" />
                  </div>
                  <div className="flex flex-col gap-3 p-5 sm:col-span-3">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-semibold leading-snug text-sand">{cert.title}</h4>
                      <span className="font-mono text-lg font-bold text-rose text-glow">{cert.year}</span>
                    </div>
                    <p className="font-mono text-xs text-sand-400">{cert.issuer}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto flex items-center gap-1.5 font-mono text-xs text-rose-300 group-hover:text-rose">
                      <Eye className="h-3.5 w-3.5" /> Ver certificado
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{selected && <Lightbox cert={selected} onClose={close} />}</AnimatePresence>
    </section>
  );
};

export default memo(Journey);
