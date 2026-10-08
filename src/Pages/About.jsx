import { memo } from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Target, Bot, Palette } from "lucide-react";
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTypescript, SiFigma, SiN8N, SiSupabase,
  SiGithub, SiPostman, SiVercel, SiNotion,
} from "react-icons/si";
import { BarChart3 } from "lucide-react";
import { PROJECTS, CERTIFICATES, YEARS_EXPERIENCE, PROCESS } from "../data/projects";
import { Reveal } from "../components/ui/Reveal";
import SectionTitle from "../components/ui/SectionTitle";

const STATS = [
  { value: `${PROJECTS.length}+`, label: "Proyectos realizados" },
  { value: `${YEARS_EXPERIENCE}+`, label: "Años de experiencia" },
  { value: CERTIFICATES.length, label: "Formaciones" },
  { value: "24/7", label: "Aprendiendo" },
];

const CARDS = [
  {
    icon: Compass,
    title: "Mi filosofía",
    text: "Combinar diseño cuidado con tecnologías modernas para crear experiencias únicas, rápidas y fáciles de usar.",
  },
  {
    icon: Target,
    title: "Mi misión",
    text: "Transformar ideas complejas en interfaces claras, responsivas y pensadas para las personas que las usan.",
  },
  {
    icon: Bot,
    title: "IA como herramienta",
    text: "“Aprovechar la IA como herramienta profesional, no como reemplazo.” Automatizo con n8n y agentes.",
  },
];

const ORBIT_INNER = [
  { icon: SiReact, color: "#61DAFB" },
  { icon: SiNodedotjs, color: "#5FA04E" },
  { icon: SiMongodb, color: "#47A248" },
  { icon: SiExpress, color: "#e5e5e5" },
];
const ORBIT_OUTER = [
  { icon: SiTypescript, color: "#3178C6" },
  { icon: SiFigma, color: "#F24E1E" },
  { icon: SiN8N, color: "#EA4B71" },
  { icon: SiSupabase, color: "#3FCF8E" },
  { icon: SiGithub, color: "#ffffff" },
  { icon: BarChart3, color: "#F2C811" },
];

const TOOLS = [
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "n8n", icon: SiN8N, color: "#EA4B71" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
  { name: "Power BI", icon: BarChart3, color: "#F2C811" },
  { name: "Canva", icon: Palette, color: "#00C4CC" },
  { name: "Notion", icon: SiNotion, color: "#ffffff" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
];

// Órbita de tecnologías: los anillos giran y los íconos contra-giran para quedar derechos.
const Ring = ({ items, size, duration, reverse = false }) => (
  <motion.div
    className="absolute left-1/2 top-1/2 rounded-full border border-rose/20"
    style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
    animate={{ rotate: reverse ? -360 : 360 }}
    transition={{ duration, repeat: Infinity, ease: "linear" }}
  >
    {items.map(({ icon: Icon, color }, i) => {
      const angle = (i / items.length) * Math.PI * 2;
      return (
        <motion.span
          key={i}
          className="absolute flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-100 shadow-lg shadow-black/50"
          style={{
            left: size / 2 + Math.cos(angle) * (size / 2) - 22,
            top: size / 2 + Math.sin(angle) * (size / 2) - 22,
          }}
          animate={{ rotate: reverse ? 360 : -360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </motion.span>
      );
    })}
  </motion.div>
);

const Orbit = () => (
  <div className="relative mx-auto h-[340px] w-[340px] sm:h-[400px] sm:w-[400px]" aria-hidden="true">
    <div className="absolute inset-[30%] rounded-full bg-rose/30 blur-3xl" />
    <Ring items={ORBIT_OUTER} size={330} duration={40} reverse />
    <Ring items={ORBIT_INNER} size={200} duration={26} />
    <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-rose/50 bg-gradient-to-br from-rose-600 to-rose-900 shadow-[0_0_60px_rgba(255,79,147,0.6)]">
      <span className="font-display text-3xl font-semibold italic text-white">MS</span>
    </div>
  </div>
);

const About = () => (
  <section id="About" className="relative overflow-hidden py-24 lg:py-32">
    <div className="container-x">
      {/* Conoceme */}
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Reveal className="label text-rose">Conoceme</Reveal>
          <Reveal as="h2" delay={0.05} className="mt-3 font-display text-5xl font-medium sm:text-6xl">
            Sobre <em className="text-rose text-glow">mí</em> ✿
          </Reveal>
          <Reveal delay={0.1} className="mt-6 space-y-4 text-sm leading-relaxed text-sand-200 sm:text-base">
            <p>
              Soy <strong className="font-medium text-sand">Muriel Elen Salbador</strong>, desarrolladora de software
              front-end y Técnica en Programación por la UTN-FRRO. Me especializo en interfaces modernas con React,
              Node.js y TypeScript.
            </p>
            <p>
              Trabajo con bases de datos SQL y NoSQL, visualización de datos con Power BI y diseño UI/UX en Figma y
              Canva. Me encanta convertir ideas en realidad a través del código y el diseño.
            </p>
          </Reveal>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.15 + i * 0.05}>
                <dd className="font-mono text-3xl font-bold text-rose text-glow">{s.value}</dd>
                <dt className="mt-1 text-xs text-sand-400">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={0.1} className="lg:col-span-4">
          <Orbit />
        </Reveal>

        <div className="space-y-4 lg:col-span-4">
          {CARDS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={0.1 + i * 0.08}>
              <div className="group rounded-2xl border border-white/[0.08] bg-ink-100/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-rose/40 hover:shadow-[0_10px_40px_-15px_rgba(255,79,147,0.6)]">
                <h3 className="flex items-center gap-2 font-mono text-sm font-bold text-rose">
                  <Icon className="h-4 w-4" /> {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sand-200">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Proceso + herramientas (grilla editorial) */}
      <div className="mt-24 grid border border-white/[0.08] lg:mt-32 lg:grid-cols-2">
        <div className="relative overflow-hidden border-b border-white/[0.08] p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <SectionTitle>Mi proceso</SectionTitle>
          <ol className="mt-6">
            {PROCESS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.06}>
                <div className="group flex gap-5 border-b border-white/[0.06] py-4 last:border-0">
                  <span className="font-display text-3xl text-sand-400 transition-colors duration-300 group-hover:text-rose">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest transition-transform duration-300 group-hover:translate-x-1">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm text-sand-400">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
          <Sparkles className="absolute -bottom-6 -right-6 h-32 w-32 text-rose/10" aria-hidden="true" />
        </div>

        <div className="p-6 sm:p-8">
          <SectionTitle>Herramientas que uso</SectionTitle>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {TOOLS.map(({ name, icon: Icon, color }, i) => (
              <Reveal key={name} delay={i * 0.03}>
                <div className="group flex items-center gap-3 rounded-lg border border-white/[0.06] bg-ink-100/70 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose/40">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}1f` }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider">{name}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="label mt-6">& muchas herramientas más ✦</p>
        </div>
      </div>
    </div>
  </section>
);

export default memo(About);
