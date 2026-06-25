import React, { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
         Disponibilidad inmediata
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
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
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Apasionada por la tecnología"];
const TECH_STACK = ["React","Vite", "Javascript", "Python", "C", "HTML", "CSS", "GitHub", "Power BI", "Figma", "Canva", "MongoDB", "Express.js", "SQL", "Node.js", "MySQL", "Supabase" ];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/MurielSalbador" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/muriel-salbador/" },
  { icon: Instagram, link: "https://www.instagram.com/muriel_salbador?igsh=dHp1a2F6ZGxkbjlt" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
       
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

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
  }, [handleTyping]);

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] " id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto  min-h-screen ">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200">
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
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
                <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
                  <CTAButton href="#Portafolio" text="Proyectos" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contacto" icon={Mail} />
                </div>

                {/* Social Links */}
                <div className="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Zafiro Beauty Showcase */}
            <div
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600">

              <div className="relative w-full max-w-[520px]">

                {/* Outer glow */}
                <div className={`absolute -inset-6 rounded-3xl blur-3xl transition-all duration-700 ${
                  isHovering
                    ? "opacity-70 scale-105 bg-gradient-to-br from-[#6366f1]/30 to-[#a855f7]/30"
                    : "opacity-30 scale-100 bg-gradient-to-br from-[#6366f1]/15 to-[#a855f7]/15"
                }`} />

                {/* Card */}
                <div className={`relative rounded-2xl overflow-hidden border transition-all duration-500 ${
                  isHovering ? "border-white/20 scale-[1.02]" : "border-white/10 scale-100"
                }`}
                  style={{ boxShadow: isHovering ? '0 0 40px rgba(99,102,241,0.25), 0 0 80px rgba(168,85,247,0.12)' : '0 0 20px rgba(99,102,241,0.1)' }}>

                  {/* Browser chrome */}
                  <div className="bg-[#080420]/95 backdrop-blur-sm px-4 py-2.5 flex items-center gap-3 border-b border-white/8">
                    <div className="flex gap-1.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/75" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/75" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/75" />
                    </div>
                    <div className="flex-1 bg-white/5 rounded-full px-3 py-1 text-[11px] text-gray-400 font-mono truncate border border-white/8">
                      zafiro-beauty-web.vercel.app
                    </div>
                    <a
                      href="https://zafiro-beauty-web.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-gray-500 hover:text-indigo-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Screenshot */}
                  <div className="relative overflow-hidden bg-[#030014]">
                    <img
                      src="/ZafiroBeauty.png"
                      alt="Zafiro Beauty — plataforma de turnos láser"
                      onLoad={() => setImgLoaded(true)}
                      className={`w-full object-cover object-top transition-all duration-700 ${
                        isHovering ? "scale-[1.04]" : "scale-100"
                      } ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                      style={{ maxHeight: '360px' }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030014]/80 pointer-events-none" />

                    {/* Scan line effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-20"
                      style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(99,102,241,0.04) 3px,rgba(99,102,241,0.04) 4px)' }} />
                  </div>

                  {/* Footer info */}
                  <div className="bg-[#080420]/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-t border-white/8">
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">Zafiro Beauty</p>
                      <p className="text-gray-400 text-[11px] mt-0.5">Full-stack · Turnos · MercadoPago</p>
                    </div>
                    <a href="#Portafolio"
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-xs font-medium transition-opacity hover:opacity-90 shrink-0">
                      Ver proyecto
                    </a>
                  </div>
                </div>

                {/* Floating badge: estado */}
                <div className={`absolute -top-3 -right-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 text-[11px] font-mono transition-all duration-500 ${
                  isHovering ? "opacity-100 translate-y-0 text-emerald-400 border-emerald-500/30" : "opacity-60 translate-y-0.5 text-emerald-500/70"
                }`}>
                  ● En producción
                </div>

                {/* Floating badge: stack */}
                <div className={`absolute -bottom-3 -left-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 text-[11px] font-mono text-indigo-400 transition-all duration-500 ${
                  isHovering ? "opacity-100 translate-y-0" : "opacity-50 translate-y-0.5"
                }`}>
                  React · NestJS · PostgreSQL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
