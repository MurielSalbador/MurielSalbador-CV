import React, { useState, useEffect, useCallback, memo } from "react"
import {
  Github, Linkedin, Mail, ExternalLink, Instagram, Zap, Brain, CheckCircle, Bot,
  ArrowRight, FolderKanban, Rocket, ShieldCheck, Lightbulb, BarChart3, Palette, Database
} from "lucide-react"
import {
  SiReact, SiVite, SiJavascript, SiTypescript, SiPython, SiC, SiHtml5, SiCss,
  SiGithub, SiFigma, SiMongodb, SiExpress, SiNodedotjs, SiMysql, SiSupabase
} from "react-icons/si"
import { scrollToTarget } from "../lib/scroll"
import { PROJECTS } from "../data/projects"

// Memoized Components
const RoleBadge = memo(() => (
  <div className="inline-block lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-700"></div>
      <div className="relative px-4 sm:px-5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-[#a855f7]/40">
        <span className="text-[#c4b5fd] text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.25em]">
          Desarrolladora
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-4" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Técnica en
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Programación
        </span>
      </span>
    </h1>
    <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7]"></div>
  </div>
));

const TechChip = memo(({ name, icon: Icon, color }) => (
  <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs sm:text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default">
    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" style={{ color }} />
    <span>{name}</span>
  </div>
));

const SocialLink = memo(({ icon: Icon, link, label }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group relative inline-block"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
    <div className="relative w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl flex items-center justify-center border border-white/10 group-hover:border-white/25 transition-all duration-300">
      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
    </div>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Apasionada por la tecnología"];

const TECH_STACK = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Vite", icon: SiVite, color: "#a78bfa" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Python", icon: SiPython, color: "#4B8BBE" },
  { name: "C", icon: SiC, color: "#A8B9CC" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss, color: "#1572B6" },
  { name: "GitHub", icon: SiGithub, color: "#e5e7eb" },
  { name: "Power BI", icon: BarChart3, color: "#F2C811" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Canva", icon: Palette, color: "#00C4CC" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Express.js", icon: SiExpress, color: "#d1d5db" },
  { name: "SQL", icon: Database, color: "#38BDF8" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
];

const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/MurielSalbador", label: "GitHub" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/muriel-salbador/", label: "LinkedIn" },
  { icon: Instagram, link: "https://www.instagram.com/muriel_salbador?igsh=dHp1a2F6ZGxkbjlt", label: "Instagram" }
];

const STATS = [
  { icon: FolderKanban, value: `${PROJECTS.length}+`, label: "Proyectos realizados", target: "#Portafolio" },
  { icon: Rocket, value: "100%", label: "Compromiso y dedicación", target: "#About" },
  { icon: ShieldCheck, value: "Soluciones reales", label: "con impacto", target: "#Portafolio" },
  { icon: Lightbulb, value: "Ideas convertidas", label: "en experiencias", target: "#Portafolio" },
];

const PIPELINE_NODES = [
  { label: "Trigger", icon: Zap, active: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30", textColor: "text-yellow-400" },
  { label: "IA", icon: Brain, active: "from-[#6366f1]/20 to-[#a855f7]/20 border-[#6366f1]/40", textColor: "text-[#a78bfa]" },
  { label: "Acción", icon: CheckCircle, active: "from-emerald-500/20 to-green-500/20 border-emerald-500/30", textColor: "text-emerald-400" },
];
const BOT_MESSAGES = ["Analizando solicitud...", "Ejecutando agente IA...", "¡Automatización lista!"];
const TECH_BADGES = ["n8n", "GPT-4", "Webhook", "Python"];

const StatItem = memo(({ icon: Icon, value, label, target }) => (
  <button
    type="button"
    onClick={() => scrollToTarget(target)}
    className="group flex items-center gap-3 sm:gap-4 px-4 py-4 sm:py-5 text-left w-full hover:bg-white/[0.04] transition-colors rounded-xl"
    aria-label={`${value} ${label}`}
  >
    <div className="relative shrink-0">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative w-11 h-11 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#a78bfa] group-hover:text-white transition-colors" />
      </div>
    </div>
    <div className="min-w-0">
      <p className="text-white font-semibold text-sm sm:text-base leading-tight truncate">{value}</p>
      <p className="text-gray-400 text-xs sm:text-sm mt-0.5 truncate">{label}</p>
    </div>
  </button>
));

// Anillos orbitales alrededor del widget
const OrbitRings = memo(() => (
  <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none" aria-hidden="true">
    <div className="absolute w-[620px] h-[620px] rounded-full border border-[#6366f1]/15 animate-orbit">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
      <div className="absolute bottom-[12%] right-[6%] w-1.5 h-1.5 rounded-full bg-[#6366f1] shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
    </div>
    <div className="absolute w-[780px] h-[780px] rounded-full border border-white/[0.06] animate-orbit-reverse">
      <div className="absolute top-[18%] left-[4%] w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_rgba(167,139,250,0.8)]"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-[#6366f1]/80 shadow-[0_0_10px_rgba(99,102,241,0.7)]"></div>
    </div>
  </div>
));

// Plataforma con brillo debajo del widget
const GlowPlatform = memo(() => (
  <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8%] sm:bottom-[2%] w-full flex flex-col items-center pointer-events-none" aria-hidden="true">
    <div className="w-[70%] h-20 bg-[#a855f7]/30 blur-3xl rounded-[100%]"></div>
    <div className="absolute bottom-2 w-[85%] h-10 border border-white/[0.05] rounded-[100%]"></div>
    <div className="absolute bottom-4 w-[65%] h-8 border border-[#6366f1]/10 rounded-[100%]"></div>
  </div>
));

const AIShowcaseWidget = memo(() => {
  const [step, setStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [chatText, setChatText] = useState("");
  const [chatCharIdx, setChatCharIdx] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const parallaxRef = React.useRef(null);

  useEffect(() => {
    const t = setInterval(() => setStep(p => (p + 1) % 4), 1500);
    return () => clearInterval(t);
  }, []);

  // Parallax sutil: el widget flota siguiendo el mouse, en dirección opuesta al fondo
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const el = parallaxRef.current;
      if (!el) return;
      const dx = (e.clientX / window.innerWidth - 0.5) * -14;
      const dy = (e.clientY / window.innerHeight - 0.5) * -10;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const current = BOT_MESSAGES[msgIdx];
    if (chatCharIdx < current.length) {
      const t = setTimeout(() => {
        setChatText(p => p + current[chatCharIdx]);
        setChatCharIdx(p => p + 1);
      }, 48);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setChatText("");
        setChatCharIdx(0);
        setMsgIdx(p => (p + 1) % BOT_MESSAGES.length);
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [chatCharIdx, msgIdx]);

  return (
    <div
      ref={parallaxRef}
      className="relative w-full max-w-[520px] transition-transform duration-300 ease-out will-change-transform"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`absolute -inset-6 rounded-3xl blur-3xl transition-all duration-700 ${isHovering ? "opacity-70 scale-105 bg-gradient-to-br from-[#6366f1]/30 to-[#a855f7]/30" : "opacity-30 scale-100 bg-gradient-to-br from-[#6366f1]/15 to-[#a855f7]/15"}`} />

      <div
        className={`relative rounded-2xl overflow-hidden border transition-all duration-500 ${isHovering ? "border-white/20 scale-[1.02]" : "border-white/10 scale-100"}`}
        style={{ boxShadow: isHovering ? "0 0 40px rgba(99,102,241,0.25), 0 0 80px rgba(168,85,247,0.12)" : "0 0 20px rgba(99,102,241,0.1)" }}
      >
        {/* Browser chrome */}
        <div className="bg-[#080420]/95 backdrop-blur-sm px-4 py-2.5 flex items-center gap-3 border-b border-white/[0.08]">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/75" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/75" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/75" />
          </div>
          <div className="flex-1 bg-white/5 rounded-full px-3 py-1 text-[11px] text-gray-400 font-mono truncate border border-white/[0.08]">
            automation.workflow.ai
          </div>
          <a
            href="https://github.com/MurielSalbador"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver repositorios en GitHub"
            className="shrink-0 text-gray-500 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Content */}
        <div className="bg-[#030014]/95 px-5 py-5 space-y-4" style={{ minHeight: "260px" }}>
          {/* Status row */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Automation Pipeline</span>
          </div>

          {/* Pipeline nodes */}
          <div className="flex items-center justify-between gap-2">
            {PIPELINE_NODES.map((node, i) => {
              const isActive = step >= i + 1;
              return (
                <React.Fragment key={i}>
                  <div className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all duration-500 ${isActive ? `bg-gradient-to-br ${node.active}` : "bg-white/[0.03] border-white/10"}`}>
                    <node.icon className={`w-5 h-5 transition-colors duration-500 ${isActive ? node.textColor : "text-gray-700"}`} />
                    <span className={`text-[10px] font-medium transition-colors duration-500 ${isActive ? "text-white" : "text-gray-700"}`}>{node.label}</span>
                  </div>
                  {i < PIPELINE_NODES.length - 1 && (
                    <div className={`h-0.5 w-5 rounded-full transition-all duration-500 shrink-0 ${step >= i + 2 ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7]" : "bg-white/10"}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Bot chat */}
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-3 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366f1]/30 to-[#a855f7]/30 border border-[#6366f1]/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-[#a78bfa]" />
            </div>
            <div className="flex-1 min-h-[36px]">
              <span className="text-[10px] text-gray-600 font-mono">Asistente IA</span>
              <p className="text-sm text-gray-300 font-mono leading-snug mt-0.5">
                {chatText}
                <span className="inline-block w-[3px] h-3.5 bg-[#6366f1] ml-0.5 animate-pulse align-middle" />
              </p>
            </div>
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5">
            {TECH_BADGES.map((badge, i) => (
              <span key={i} className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 font-mono">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#080420]/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-t border-white/[0.08]">
          <div>
            <p className="text-white font-semibold text-sm leading-tight">IA & Automatización</p>
            <p className="text-gray-400 text-[11px] mt-0.5">n8n · GPT · Bots · Notebooks</p>
          </div>
          <a
            href="#Portafolio"
            onClick={(e) => { e.preventDefault(); scrollToTarget("#Portafolio"); }}
            className="group flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-xs font-medium transition-opacity hover:opacity-90 shrink-0"
          >
            Ver proyectos
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Floating badge — estado */}
      <div className={`absolute -top-3 -right-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 text-[11px] font-mono transition-all duration-500 ${isHovering ? "opacity-100 text-emerald-400 border-emerald-500/30" : "opacity-60 text-emerald-500/70"}`}>
        ● Activo
      </div>

      {/* Floating badge — stack */}
      <div className={`absolute -bottom-3 -left-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 text-[11px] font-mono text-indigo-400 transition-all duration-500 ${isHovering ? "opacity-100" : "opacity-50"}`}>
        Python · n8n · GPT-4
      </div>
    </div>
  );
});

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] " id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto min-h-screen flex flex-col justify-center pt-24 lg:pt-20 pb-10">
          <div className="flex flex-col lg:flex-row items-center justify-center md:justify-between gap-0 sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200">
              <div className="space-y-4 sm:space-y-6">
                <RoleBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000">
                 Creo sitios web modernos y funcionales con foco en la experiencia del usuario y la integración de bases de datos.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                  {TECH_STACK.map((tech) => (
                    <TechChip key={tech.name} {...tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
                  <a
                    href="#Portafolio"
                    onClick={(e) => { e.preventDefault(); scrollToTarget("#Portafolio"); }}
                    className="group relative inline-flex items-center justify-center gap-2 w-[160px] h-12 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.45)]"
                  >
                    <span className="z-10">Proyectos</span>
                    <ExternalLink className="w-4 h-4 z-10 group-hover:rotate-45 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </a>

                </div>

                {/* Social Links */}
                <div className="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - AI Showcase */}
            <div
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[680px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              data-aos="fade-left"
              data-aos-delay="600">
              <OrbitRings />
              <GlowPlatform />
              <AIShowcaseWidget />
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="mt-10 sm:mt-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-white/[0.06] lg:divide-x lg:divide-white/[0.06]"
            data-aos="fade-up"
            data-aos-delay="1800"
          >
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
