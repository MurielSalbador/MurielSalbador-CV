import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Brain, CheckCircle, MapPin, Zap } from "lucide-react";
import { PROJECTS, CERTIFICATES, YEARS_EXPERIENCE, SKILL_GROUPS } from "../data/projects";
import useLocalTime from "../lib/useLocalTime";
import SectionHeading from "../components/ui/SectionHeading";
import Spotlight from "../components/ui/Spotlight";
import Counter from "../components/ui/Counter";
import { Reveal } from "../components/ui/Reveal";
import { CV_URL } from "../lib/nav";

const PIPELINE = [
  { label: "Trigger", icon: Zap },
  { label: "Agente IA", icon: Brain },
  { label: "Acción", icon: CheckCircle },
];
const BOT_MESSAGES = ["Analizando solicitud…", "Ejecutando agente IA…", "¡Automatización lista!"];

// Mini demo de un flujo de automatización (n8n + IA).
const AutomationCard = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <p className="eyebrow">IA & Automatización</p>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-acid">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" /> live
        </span>
      </div>

      <div className="flex items-center gap-2">
        {PIPELINE.map(({ label, icon: Icon }, i) => {
          const on = step > i;
          return (
            <div key={label} className="contents">
              <div
                className={`flex flex-1 flex-col items-center gap-2 rounded-2xl border px-2 py-4 transition-all duration-500 ${
                  on ? "border-acid/40 bg-acid/10" : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <Icon className={`h-5 w-5 transition-colors duration-500 ${on ? "text-acid" : "text-zinc-600"}`} />
                <span className={`text-[11px] transition-colors duration-500 ${on ? "text-bone" : "text-zinc-600"}`}>
                  {label}
                </span>
              </div>
              {i < PIPELINE.length - 1 && (
                <span
                  className={`h-px w-4 shrink-0 transition-colors duration-500 ${step > i + 1 ? "bg-acid" : "bg-white/15"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-ink/60 p-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-acid/15">
          <Bot className="h-4 w-4 text-acid" />
        </span>
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-1.5 font-mono text-xs text-zinc-300"
        >
          {step === 0 ? "Esperando evento…" : BOT_MESSAGES[step - 1]}
        </motion.p>
      </div>

      <p className="text-sm text-zinc-400">n8n · GPT · Webhooks · Python</p>
    </div>
  );
};

const STATS = [
  { value: PROJECTS.length, label: "Proyectos entregados" },
  { value: CERTIFICATES.length, label: "Formaciones y cursos" },
  { value: YEARS_EXPERIENCE, suffix: "+", label: "Años de experiencia" },
];

const About = () => {
  const time = useLocalTime();

  return (
    <section id="About" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="Sobre mí"
          lines={[
            <>Código con</>,
            <>
              <em className="font-serif font-normal italic text-acid">criterio</em> de diseño.
            </>,
          ]}
        >
          Técnica en Programación (UTN-FRRO). Combino desarrollo, diseño UI/UX y automatización para convertir ideas en
          productos claros, rápidos y útiles.
        </SectionHeading>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
          {/* Bio */}
          <Reveal className="md:col-span-6 lg:col-span-7">
            <Spotlight className="flex h-full flex-col justify-between gap-10 p-6 sm:p-10">
              <p className="eyebrow">Hola, soy Muriel Elen Salbador</p>
              <div className="space-y-6">
                <p className="text-2xl font-light leading-snug tracking-tight text-bone sm:text-3xl lg:text-[2.4rem] lg:leading-[1.15]">
                  Desarrolladora front-end especializada en interfaces{" "}
                  <em className="font-serif italic text-acid">modernas y funcionales</em> con React, Node.js y
                  TypeScript.
                </p>
                <p className="max-w-xl text-base leading-relaxed text-zinc-400">
                  Tengo experiencia en bases de datos SQL y NoSQL, desarrollo web full-stack, visualización de datos con
                  Power BI y diseño UI/UX en Figma y Canva. Trabajo directo con clientes —emprendedores y pymes— desde la
                  idea hasta el deploy.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="btn-acid group">
                  Descargar CV
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </a>
              </div>
            </Spotlight>
          </Reveal>

          {/* Foto */}
          <Reveal delay={0.1} className="md:col-span-6 lg:col-span-5">
            <div className="group relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-white/[0.08]">
              <img
                src="/yo.webp"
                alt="Muriel Salbador"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[1.2s] ease-expo group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <p className="text-xl font-medium">Muriel Salbador</p>
                  <p className="font-serif text-lg italic text-zinc-300">Front-end Developer</p>
                </div>
                <div className="relative h-20 w-20" aria-hidden="true">
                  <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full">
                    <defs>
                      <path id="circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                    </defs>
                    <text className="fill-bone font-mono text-[10.5px] uppercase tracking-[0.2em]">
                      <textPath href="#circle">Disponible · Freelance · Remoto ·</textPath>
                    </text>
                  </svg>
                  <span className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-acid" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Stats */}
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="md:col-span-3 lg:col-span-3">
              <Spotlight className="flex h-full flex-col justify-between gap-8 p-6 sm:p-8">
                <span className="font-mono text-xs text-zinc-600">0{i + 1}</span>
                <div>
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    className="block text-6xl font-light tracking-tighter sm:text-7xl"
                  />
                  <p className="mt-2 text-sm text-zinc-400">{s.label}</p>
                </div>
              </Spotlight>
            </Reveal>
          ))}

          {/* Ubicación */}
          <Reveal delay={0.24} className="md:col-span-3 lg:col-span-3">
            <Spotlight className="flex h-full flex-col justify-between gap-8 p-6 sm:p-8">
              <MapPin className="h-5 w-5 text-acid" />
              <div>
                <p className="text-6xl font-light tabular-nums tracking-tighter sm:text-7xl">{time}</p>
                <p className="mt-2 text-sm text-zinc-400">Rosario, Argentina · GMT-3</p>
              </div>
            </Spotlight>
          </Reveal>

          {/* Cita */}
          <Reveal className="md:col-span-6 lg:col-span-5">
            <div className="relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-3xl bg-acid p-6 text-ink sm:p-10">
              <span className="font-serif text-8xl leading-[0.5]">“</span>
              <blockquote className="font-serif text-3xl leading-tight sm:text-4xl">
                Aprovechar la IA como herramienta profesional, no como reemplazo.
              </blockquote>
              <p className="font-mono text-xs uppercase tracking-[0.2em]">— Mi forma de trabajar</p>
            </div>
          </Reveal>

          {/* Automatización */}
          <Reveal delay={0.08} className="md:col-span-3 lg:col-span-4">
            <Spotlight className="h-full">
              <AutomationCard />
            </Spotlight>
          </Reveal>

          {/* Skills */}
          <Reveal delay={0.16} className="md:col-span-3 lg:col-span-3">
            <Spotlight className="flex h-full flex-col gap-6 p-6 sm:p-8">
              <p className="eyebrow">Habilidades</p>
              {SKILL_GROUPS.map(({ level, skills }, i) => (
                <div key={level}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium">{level}</p>
                    <span className="flex gap-1" aria-hidden="true">
                      {[0, 1, 2].map((b) => (
                        <span
                          key={b}
                          className={`h-1 w-4 rounded-full ${b < SKILL_GROUPS.length - i ? "bg-acid" : "bg-white/10"}`}
                        />
                      ))}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-400">{skills.join(" · ")}</p>
                </div>
              ))}
            </Spotlight>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
