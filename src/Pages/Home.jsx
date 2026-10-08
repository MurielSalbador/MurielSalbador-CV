import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, FileText, FolderOpen, Globe, Linkedin, Github, Instagram } from "lucide-react";
import {
  SiReact, SiJavascript, SiTypescript, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss,
  SiVite, SiNextdotjs, SiPostgresql, SiSupabase, SiN8N, SiPython, SiFigma, SiMysql, SiGithub,
} from "react-icons/si";
import { PROJECTS } from "../data/projects";
import { CV_URL, GITHUB, INSTAGRAM, LINKEDIN } from "../lib/nav";
import { scrollToTarget } from "../lib/scroll";
import Typewriter from "../components/ui/Typewriter";
import Marquee from "../components/ui/Marquee";
import Dock from "../components/ui/Dock";
import { EASE } from "../components/ui/motion";

const ROLES = ["Desarrolladora Front-end", "Full-Stack MERN", "Automatización con IA", "Diseño UI/UX"];

// Posiciones de las miniaturas que flotan alrededor de la foto (inspo: collage flotante).
const FLOAT_SPOTS = [
  { top: "17%", left: "16%", depth: 18 },
  { top: "13%", left: "74%", depth: 26 },
  { top: "40%", left: "8%", depth: 32 },
  { top: "37%", left: "84%", depth: 14 },
  { top: "50%", left: "28%", depth: 22 },
  { top: "47%", left: "64%", depth: 30 },
];

const TECH = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", icon: SiExpress, color: "#e5e5e5" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Vite", icon: SiVite, color: "#a78bfa" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#6c9bd2" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
  { name: "n8n", icon: SiN8N, color: "#EA4B71" },
  { name: "Python", icon: SiPython, color: "#4B8BBE" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
];

const FloatingThumb = ({ project, spot, index, mx, my }) => {
  const x = useTransform(mx, (v) => v * spot.depth);
  const y = useTransform(my, (v) => v * spot.depth);

  return (
    <motion.div
      className="absolute z-20 hidden lg:block"
      style={{ top: spot.top, left: spot.left, x, y }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.8 + index * 0.1 }}
    >
      <Link
        to={`/project/${project.id}`}
        className="group flex animate-float flex-col items-center gap-1.5"
        style={{ animationDelay: `${index * -1.1}s` }}
      >
        <span className="block h-14 w-20 overflow-hidden rounded-md border border-white/20 shadow-xl shadow-black/60 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-125">
          <img src={project.Img} alt="" className="h-full w-full object-cover object-top" />
        </span>
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-sand/80 transition-colors group-hover:text-rose">
          {project.ShortTitle}
        </span>
      </Link>
    </motion.div>
  );
};

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

const Hero = () => {
  // Parallax según la posición del mouse (−0.5 a 0.5).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const photoX = useTransform(smx, (v) => v * -12);
  const titleX = useTransform(smx, (v) => v * 24);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const dockItems = [
    { label: "GitHub", href: GITHUB, icon: Github, bg: "linear-gradient(135deg,#2b2b2b,#0d0d0d)" },
    { label: "LinkedIn", href: LINKEDIN, icon: Linkedin, bg: "linear-gradient(135deg,#1d8cf0,#0a5bb5)" },
    { label: "Instagram", href: INSTAGRAM, icon: Instagram, bg: "linear-gradient(135deg,#feda75,#d62976 50%,#4f5bd5)" },
    { divider: true },
    { label: "Descargar CV", href: CV_URL, icon: FileText, bg: "linear-gradient(135deg,#ff8ab8,#d6286f)" },
    {
      label: "Proyectos",
      href: "#Proyectos",
      icon: FolderOpen,
      bg: "linear-gradient(135deg,#ead7c3,#9c8a7b)",
      color: "#0c0709",
      onClick: (e) => {
        e.preventDefault();
        scrollToTarget("#Proyectos");
      },
    },
  ];

  return (
    <section id="Home" className="relative overflow-hidden">
      {/* Fondo */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
        <div className="absolute left-1/2 top-[30%] h-[55vw] w-[55vw] -translate-x-1/2 rounded-full bg-rose-900/60 blur-[140px]" />
      </div>

      <div className="container-x relative flex min-h-[100svh] flex-col pb-8 pt-24 sm:pt-28">
        {/* Meta superior */}
        <motion.div {...fadeUp(0.1)} className="label relative z-30 flex justify-between gap-4">
          <span>Full-Stack & UI/UX</span>
          <span>Portfolio creativo · {new Date().getFullYear()}</span>
        </motion.div>

        {/* Título gigante detrás de la foto */}
        <motion.h1
          style={{ x: titleX }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
          className="relative z-0 mt-2 select-none text-center font-display text-[25vw] font-medium uppercase leading-[0.8] tracking-[-0.04em] text-sand lg:text-[19vw] xl:text-[17rem]"
        >
          Muriel
          <span className="sr-only"> Salbador — desarrolladora full-stack</span>
        </motion.h1>

        {/* Foto recortada, delante del título */}
        <motion.div
          style={{ x: photoX }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
          className="pointer-events-none relative z-10 -mt-[14vw] flex h-[105vw] max-h-[620px] justify-center lg:absolute lg:inset-x-0 lg:bottom-0 lg:mx-auto lg:mt-0 lg:h-[82%] lg:max-h-none"
        >
          <div className="absolute bottom-[10%] left-1/2 h-2/3 w-1/2 max-w-sm -translate-x-1/2 rounded-full bg-rose/35 blur-[80px]" />
          <div className="relative h-full drop-shadow-[0_0_28px_rgba(255,79,147,0.35)]">
            <img src="/yo-cutout.webp" alt="Muriel Salbador" className="mask-portrait h-full w-auto object-contain" />
          </div>
        </motion.div>

        {/* Miniaturas flotantes de proyectos */}
        {PROJECTS.slice(0, FLOAT_SPOTS.length).map((p, i) => (
          <FloatingThumb key={p.id} project={p} spot={FLOAT_SPOTS[i]} index={i} mx={smx} my={smy} />
        ))}

        {/* Contenido inferior */}
        <div className="relative z-30 -mt-16 grid gap-6 lg:mt-auto lg:grid-cols-2">
          <motion.div {...fadeUp(0.6)} className="max-w-sm space-y-4">
            <p className="font-mono text-sm leading-relaxed sm:text-base">
              <span className="text-sand-200">Hola, soy Muriel —</span>
              <br />
              <Typewriter words={ROLES} className="text-rose text-glow" />
            </p>
            <p className="text-xl font-light uppercase leading-snug tracking-wide text-sand sm:text-2xl">
              Diseño y desarrollo experiencias web que conectan
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-sand/25 px-4 py-2 font-mono text-[10px] uppercase tracking-widest">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose" />
              Disponible para proyectos ✦
            </span>
            <p className="font-script text-5xl leading-none text-rose/90">Muriel Salbador</p>
          </motion.div>

          <motion.div {...fadeUp(0.75)} className="flex flex-col gap-5 lg:items-end lg:text-right">
            <p className="max-w-xs text-sm leading-relaxed text-sand-200">
              Técnica en Programación (UTN). Creo sitios y aplicaciones modernas, funcionales y centradas en las
              personas — del diseño en Figma al deploy.
            </p>
            <div className="flex items-center gap-3 lg:flex-row-reverse">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-sand/25">
                <Globe className="h-5 w-5 animate-spin-slow text-sand" />
              </span>
              <p className="label leading-relaxed text-sand-200">
                Basada en Rosario
                <br />
                Trabajo remoto
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToTarget("#Proyectos")}
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sand hover:text-rose"
            >
              Ver proyectos
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
          </motion.div>
        </div>

        <motion.div {...fadeUp(1)} className="relative z-30 mt-8 flex justify-center">
          <Dock items={dockItems} />
        </motion.div>
      </div>
    </section>
  );
};

// Franja de tecnologías (inspo: banda de stack bajo el hero).
export const TechBand = memo(() => (
  <div className="relative border-y border-rose/30 bg-gradient-to-r from-rose-900 via-rose-600/40 to-rose-900 py-4 shadow-[0_0_60px_-10px_rgba(255,79,147,0.5)]">
    <Marquee speed={40}>
      {TECH.map(({ name, icon: Icon, color }) => (
        <span key={name} className="flex items-center gap-3 px-7 font-mono text-xs text-sand sm:text-sm">
          <Icon className="h-6 w-6" style={{ color }} />
          {name}
          <span className="ml-7 h-5 w-px bg-sand/20" />
        </span>
      ))}
    </Marquee>
  </div>
));

export default memo(Hero);
