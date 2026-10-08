import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Plus } from "lucide-react";
import { PROJECTS } from "../data/projects";
import SectionTitle from "../components/ui/SectionTitle";
import { EASE } from "../components/ui/motion";

const N = PROJECTS.length;
const STEP = 360 / N;
const AUTOPLAY_MS = 6000;
const pad = (n) => String(n).padStart(2, "0");
const mod = (n, m) => ((n % m) + m) % m;

// La captura entra y sale "girando" alrededor del disco, según la dirección.
const screenVariants = {
  enter: (dir) => ({ rotate: dir * 28, x: dir * 220, y: 60, opacity: 0, scale: 0.75 }),
  center: { rotate: 0, x: 0, y: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ rotate: dir * -28, x: dir * -220, y: 60, opacity: 0, scale: 0.75 }),
};

const RING_TEXT = "MURIEL SALBADOR ✦ PROYECTOS ✦ DISEÑO ✦ DESARROLLO ✦ ";

const Stage = ({ project, turn, dir }) => (
  <div className="relative mx-auto aspect-square w-full max-w-[560px]">
    {/* Disco del color del proyecto: gira un paso con cada cambio */}
    <motion.div
      className="absolute inset-[6%] rounded-full"
      animate={{ rotate: turn * STEP, backgroundColor: project.Color }}
      transition={{ duration: 1, ease: EASE }}
      style={{ boxShadow: `0 0 120px -20px ${project.Color}` }}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_55%)]" />
      <div className="absolute inset-[10%] rounded-full border border-white/25" />
      <div className="absolute inset-[22%] rounded-full border border-dashed border-white/20" />
      {/* Marcas sobre el borde para que se note el giro */}
      {Array.from({ length: N }).map((_, i) => (
        <span key={i} className="absolute inset-0" style={{ transform: `rotate(${i * STEP}deg)` }}>
          <span className="absolute left-1/2 top-[3%] h-3 w-3 -translate-x-1/2 rounded-full bg-white/70" />
        </span>
      ))}
    </motion.div>

    {/* Texto circular que gira en sentido contrario */}
    <motion.svg
      viewBox="0 0 200 200"
      className="absolute inset-0 h-full w-full"
      animate={{ rotate: -turn * STEP }}
      transition={{ duration: 1, ease: EASE }}
      aria-hidden="true"
    >
      <defs>
        <path id="ring" d="M100,100 m-94,0 a94,94 0 1,1 188,0 a94,94 0 1,1 -188,0" />
      </defs>
      <text className="fill-sand/50 font-mono text-[7px] tracking-[0.3em]">
        <textPath href="#ring">{RING_TEXT.repeat(2)}</textPath>
      </text>
    </motion.svg>

    {/* Captura del proyecto */}
    <div className="absolute inset-0 flex items-center justify-center">
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={project.id}
          custom={dir}
          variants={screenVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.9, ease: EASE }}
          className="w-[92%] origin-bottom"
        >
          <Link
            to={`/project/${project.id}`}
            aria-label={`Ver ${project.Title}`}
            className="block overflow-hidden rounded-xl border border-white/20 bg-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-ink-100 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            </div>
            <img
              src={project.Img}
              alt={`Captura de ${project.Title}`}
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
);

const Projects = () => {
  const [turn, setTurn] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef(null);
  const active = mod(turn, N);
  const project = PROJECTS[active];

  const go = useCallback((delta, fromUser = true) => {
    setDir(delta > 0 ? 1 : -1);
    setTurn((t) => t + delta);
    if (!fromUser) return;
    setPaused(true);
    clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 12000);
  }, []);

  const select = (i) => {
    const delta = mod(i - active + N / 2, N) - N / 2;
    if (delta !== 0) go(delta);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1, false), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, go]);

  useEffect(() => () => clearTimeout(pauseTimer.current), []);

  return (
    <section
      id="Proyectos"
      className="relative overflow-hidden border-b border-white/[0.08] py-20 lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{ background: `radial-gradient(55% 60% at 72% 55%, ${project.Color}26 0%, transparent 70%)` }}
        transition={{ duration: 1 }}
      />

      <div className="container-x relative">
        <SectionTitle
          right={
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-sand-400">
                <span className="text-rose">{pad(active + 1)}</span> / {pad(N)}
              </span>
              {[
                { d: -1, label: "Proyecto anterior", Icon: ArrowLeft },
                { d: 1, label: "Proyecto siguiente", Icon: ArrowRight },
              ].map(({ d, label, Icon }) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => go(d)}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sand/20 transition-colors hover:border-rose hover:bg-rose hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          }
        >
          Proyectos seleccionados
        </SectionTitle>

        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Info */}
          <div className="order-2 min-w-0 lg:order-1 lg:col-span-6">
            {/* Palabra gigante */}
            <div className="relative h-[19vw] overflow-hidden lg:h-[9.5vw] xl:h-[8.5rem]" aria-hidden="true">
              <AnimatePresence initial={false} custom={dir}>
                <motion.p
                  key={project.Word}
                  className="absolute inset-x-0 top-0 flex font-display text-[19vw] font-semibold uppercase leading-[0.95] tracking-[-0.03em] lg:text-[9.5vw] xl:text-[8.5rem]"
                  style={{ color: project.Color }}
                >
                  {project.Word.split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-105%" }}
                      transition={{ duration: 0.7, ease: EASE, delay: i * 0.035 }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </motion.p>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-4"
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: project.Color }}>
                  {project.Tagline}
                </p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-sand sm:text-4xl">{project.Title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-sand-200 sm:text-base">{project.Description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link to={`/project/${project.id}`} className="btn-rose group">
                    Ver proyecto
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </Link>
                  {project.Link && (
                    <a href={project.Link} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs">
                      Sitio en vivo
                    </a>
                  )}
                  {project.Github?.[0] && (
                    <a
                      href={project.Github[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Código en GitHub"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-sand/25 transition-colors hover:border-rose hover:text-rose"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Disco giratorio */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <Stage project={project} turn={turn} dir={dir} />
          </div>
        </div>

        {/* Tarjetas de proyectos */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {PROJECTS.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => select(i)}
                aria-current={isActive}
                className={`group relative overflow-hidden rounded-2xl border p-2 text-left transition-all duration-500 ${
                  isActive
                    ? "-translate-y-1 border-transparent bg-ink-200"
                    : "border-white/[0.08] bg-ink-100/60 hover:-translate-y-1 hover:border-white/20"
                }`}
                style={isActive ? { boxShadow: `0 0 0 1px ${p.Color}, 0 18px 40px -18px ${p.Color}` } : undefined}
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={p.Img}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-end justify-between gap-2 px-1 pb-1 pt-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-sand">{p.ShortTitle}</p>
                    <p className="truncate text-[11px] text-sand-400">{p.Tagline}</p>
                  </div>
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink transition-transform duration-300 group-hover:rotate-90"
                    style={{ background: p.Color }}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </div>
                {isActive && !paused && (
                  <motion.span
                    key={turn}
                    className="absolute bottom-0 left-0 h-0.5"
                    style={{ background: p.Color }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);
