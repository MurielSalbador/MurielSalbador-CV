import { memo, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import {
  SiReact, SiVite, SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss, SiTailwindcss,
  SiGithub, SiFigma, SiMongodb, SiExpress, SiNodedotjs, SiMysql, SiSupabase, SiN8N,
} from "react-icons/si";
import { BarChart3 } from "lucide-react";
import { scrollToTarget } from "../lib/scroll";
import { CV_URL } from "../lib/nav";
import useLocalTime from "../lib/useLocalTime";
import { PROJECTS, CERTIFICATES, YEARS_EXPERIENCE } from "../data/projects";
import { LineReveal } from "../components/ui/Reveal";
import Magnetic from "../components/ui/Magnetic";
import Marquee from "../components/ui/Marquee";
import { EASE } from "../components/ui/motion";

const ROTATING = ["conectan.", "venden.", "automatizan.", "inspiran."];

const TECH_STACK = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", icon: SiExpress, color: "#d4d4d8" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Vite", icon: SiVite, color: "#a78bfa" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
  { name: "n8n", icon: SiN8N, color: "#EA4B71" },
  { name: "Python", icon: SiPython, color: "#4B8BBE" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Power BI", icon: BarChart3, color: "#F2C811" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss, color: "#1572B6" },
  { name: "GitHub", icon: SiGithub, color: "#e5e7eb" },
];

const STATS = [
  { value: String(PROJECTS.length).padStart(2, "0"), label: "Proyectos" },
  { value: `${YEARS_EXPERIENCE}+`, label: "Años creando" },
  { value: String(CERTIFICATES.length).padStart(2, "0"), label: "Formaciones" },
];

// Palabra que rota dentro del titular. Un "medidor" invisible con la palabra más
// larga fija el ancho, así el titular no salta entre palabras.
const LONGEST = ROTATING.reduce((a, b) => (b.length > a.length ? b : a));

const RotatingWord = ({ active }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2400);
    return () => clearInterval(id);
  }, [active]);

  return (
    <span className="relative inline-block overflow-hidden pr-[0.08em] align-bottom font-serif font-normal italic text-acid">
      <span className="invisible" aria-hidden="true">{LONGEST}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={ROTATING[index]}
          className="absolute left-0 top-0"
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {ROTATING[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const PhotoPill = () => (
  <span className="relative mx-[0.12em] inline-block h-[0.78em] w-[1.55em] -translate-y-[0.06em] overflow-hidden rounded-full align-middle ring-1 ring-white/20">
    <img src="/yo.webp" alt="" className="h-full w-full object-cover object-[50%_30%]" />
  </span>
);

const Hero = ({ ready }) => {
  const ref = useRef(null);
  const time = useLocalTime();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section id="Home" ref={ref} className="relative overflow-hidden">
      {/* Fondo */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="animate-aurora absolute -left-[10%] -top-[20%] h-[60vw] w-[60vw] rounded-full bg-[#6d5dfc]/[0.16] blur-[120px]" />
        <div className="animate-aurora absolute -right-[15%] top-[10%] h-[45vw] w-[45vw] rounded-full bg-acid/[0.08] blur-[120px] [animation-delay:-6s]" />
      </div>

      <motion.div style={{ y, opacity }} className="container-x relative flex min-h-[100svh] flex-col pb-10 pt-28 sm:pt-32">
        {/* Meta superior */}
        <motion.div {...fadeUp(0.2)} className="flex flex-wrap items-center justify-between gap-3">
          <span className="chip">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
            </span>
            Disponible para nuevos proyectos
          </span>
          <span className="eyebrow hidden sm:block">Rosario, AR — {time}</span>
        </motion.div>

        {/* Titular */}
        <div className="flex flex-1 items-center py-12">
          <h1 className="w-full text-[clamp(2.9rem,10.5vw,10rem)] font-medium leading-[0.9] tracking-[-0.055em]">
            <LineReveal
              animate={ready}
              delay={0.15}
              lines={[
                <>Diseño y desarrollo</>,
                <>
                  experiencias <em className="font-serif font-normal italic">web</em>
                </>,
                <>
                  que <PhotoPill /> <RotatingWord active={ready} />
                </>,
              ]}
            />
          </h1>
        </div>

        {/* Fila inferior */}
        <div className="grid gap-10 border-t border-white/10 pt-8 md:grid-cols-12 md:gap-6">
          <motion.p {...fadeUp(0.7)} className="max-w-md text-base leading-relaxed text-zinc-400 md:col-span-5 md:text-lg">
            Soy <span className="text-bone">Muriel Salbador</span>, desarrolladora front-end. Creo sitios y
            aplicaciones modernas con foco en la experiencia de usuario, bases de datos y automatizaciones con IA.
          </motion.p>

          <motion.dl {...fadeUp(0.8)} className="grid grid-cols-3 gap-4 md:col-span-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="eyebrow">{s.label}</dt>
                <dd className="mt-2 text-4xl font-light tracking-tight md:text-5xl">{s.value}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div {...fadeUp(0.9)} className="flex flex-wrap items-end gap-3 md:col-span-3 md:justify-end">
            <Magnetic>
              <a
                href="#Proyectos"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#Proyectos");
                }}
                className="btn-acid group"
              >
                Ver proyectos
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
                <FileText className="h-4 w-4" /> CV
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Stack en cinta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 1.1 }}
        className="relative border-y border-white/[0.08] bg-ink-50/60 py-5"
      >
        <Marquee speed={45}>
          {TECH_STACK.map(({ name, icon: Icon, color }) => (
            <span key={name} className="mx-6 flex items-center gap-3 text-lg text-zinc-400 sm:mx-10 sm:text-2xl">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color }} />
              <span className="tracking-tight">{name}</span>
              <span className="ml-6 text-acid sm:ml-10">✦</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
};

export default memo(Hero);
