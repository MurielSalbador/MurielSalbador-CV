import { memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { CERTIFICATES, EXPERIENCE } from "../data/projects";
import SectionHeading from "../components/ui/SectionHeading";
import Spotlight from "../components/ui/Spotlight";
import { Reveal } from "../components/ui/Reveal";
import { getLenis } from "../lib/scroll";
import { EASE } from "../components/ui/motion";

const ExperienceRow = ({ item, index }) => (
  <Reveal as="li" delay={index * 0.06} className="group relative border-b border-white/10">
    {/* Barrido de fondo al pasar el mouse */}
    <span
      className="absolute inset-0 origin-bottom scale-y-0 bg-white/[0.03] transition-transform duration-500 ease-expo group-hover:scale-y-100"
      aria-hidden="true"
    />
    <div className="relative grid gap-4 py-8 md:grid-cols-12 md:gap-6 md:py-10">
      <p className="font-mono text-sm text-zinc-500 md:col-span-2 md:pt-2">{item.period}</p>
      <div className="md:col-span-5">
        <h3 className="text-3xl font-medium tracking-[-0.03em] transition-transform duration-500 ease-expo group-hover:translate-x-2 md:text-4xl">
          {item.title}
        </h3>
        <p className="mt-1 font-serif text-xl italic text-acid">{item.company}</p>
      </div>
      <ul className="space-y-2 text-zinc-400 md:col-span-5 md:pt-2">
        {item.tasks.map((task) => (
          <li key={task} className="flex gap-3">
            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
            {task}
          </li>
        ))}
      </ul>
    </div>
  </Reveal>
);

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
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink transition-colors hover:bg-white/10"
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>
      <motion.img
        src={cert.img}
        alt={cert.title}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="max-h-[88vh] max-w-full rounded-2xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
};

const Journey = () => {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  const withImage = CERTIFICATES.filter((c) => c.img);
  const withoutImage = CERTIFICATES.filter((c) => !c.img);

  return (
    <section id="Trayectoria" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Trayectoria"
          lines={[
            <>Experiencia &</>,
            <>
              <em className="font-serif font-normal italic text-acid">formación.</em>
            </>,
          ]}
        >
          Mi recorrido profesional, la formación que lo respalda y los cursos con los que sigo creciendo.
        </SectionHeading>

        {/* Experiencia */}
        <ul className="border-t border-white/10">
          {EXPERIENCE.map((item, i) => (
            <ExperienceRow key={item.title} item={item} index={i} />
          ))}
        </ul>

        {/* Formación */}
        <div className="mt-24 md:mt-32">
          <Reveal className="eyebrow mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-white/20" /> Formación & certificados
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            {withImage.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 0.08} className="lg:col-span-4">
                <button
                  type="button"
                  onClick={() => setSelected(cert)}
                  data-cursor="Ampliar"
                  className="group block h-full w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-50 text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={cert.img}
                      alt={cert.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-expo group-hover:scale-105"
                    />
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 p-6">
                    <p className="font-medium leading-snug">{cert.title}</p>
                    <span className="shrink-0 font-mono text-xs text-zinc-500">{cert.date.replace(/[()]/g, "")}</span>
                  </div>
                </button>
              </Reveal>
            ))}

            <Reveal delay={0.16} className="md:col-span-2 lg:col-span-4">
              <Spotlight className="flex h-full flex-col divide-y divide-white/[0.08]">
                {withoutImage.map((cert) => {
                  const Icon = cert.icon;
                  return (
                    <div key={cert.id} className="flex flex-1 items-start gap-4 p-6">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-acid/10">
                        <Icon className="h-5 w-5 text-acid" />
                      </span>
                      <div>
                        <p className="font-medium leading-snug">{cert.title}</p>
                        <p className="mt-1 font-mono text-xs text-zinc-500">{cert.date.replace(/[()]/g, "")}</p>
                      </div>
                    </div>
                  );
                })}
              </Spotlight>
            </Reveal>
          </div>
        </div>
      </div>

      <AnimatePresence>{selected && <Lightbox cert={selected} onClose={close} />}</AnimatePresence>
    </section>
  );
};

export default memo(Journey);
