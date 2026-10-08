import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Layers, Sparkles, Tag } from "lucide-react";
import { PROJECTS } from "../data/projects";
import { Reveal } from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";
import { EASE } from "./ui/motion";

const pad = (n) => String(n).padStart(2, "0");

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

const NavCard = ({ project, label, direction }) => (
  <Link
    to={`/project/${project.id}`}
    className={`group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-ink-100/60 p-3 transition-all duration-300 hover:border-white/20 ${
      direction === "next" ? "flex-row-reverse text-right" : ""
    }`}
  >
    <img
      src={project.Img}
      alt=""
      loading="lazy"
      className="h-16 w-24 shrink-0 rounded-lg object-cover object-top transition-transform duration-500 group-hover:scale-105"
    />
    <div className="min-w-0 flex-1">
      <p className="label">{label}</p>
      <p className="mt-1 truncate font-semibold text-sand transition-colors group-hover:text-rose">{project.Title}</p>
    </div>
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink transition-transform duration-300 group-hover:scale-110"
      style={{ background: project.Color }}
    >
      {direction === "next" ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
    </span>
  </Link>
);

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const index = PROJECTS.findIndex((p) => String(p.id) === id);
  const project = index >= 0 ? PROJECTS[index] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="space-y-6 text-center">
          <h1 className="font-display text-4xl">Proyecto no encontrado</h1>
          <p className="text-sand-200">El proyecto que buscás no existe o fue movido.</p>
          <Link to="/" className="btn-rose">
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const repos = (project.Github || []).filter(Boolean);
  const meta = [
    { icon: Tag, label: "Tipo", value: project.Tagline },
    { icon: Layers, label: "Tecnologías", value: project.TechStack.length },
    { icon: Sparkles, label: "Estado", value: project.Link ? "En producción" : "Repositorio" },
  ];

  return (
    <main key={project.id} className="relative overflow-hidden" style={{ "--accent": project.Color }}>
      <div
        className="pointer-events-none absolute right-0 top-0 h-[40vw] w-[40vw] -translate-y-1/3 translate-x-1/4 rounded-full opacity-20 blur-[140px]"
        style={{ background: project.Color }}
        aria-hidden="true"
      />

      <header className="container-x relative flex items-center justify-between py-6">
        <button
          type="button"
          onClick={() => navigate("/", { state: { scrollTo: "#Proyectos" } })}
          className="btn-outline group px-5 py-2.5 text-xs"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Proyectos
        </button>
        <span className="font-mono text-xs text-sand-400">
          <span style={{ color: project.Color }}>{pad(index + 1)}</span> / {pad(PROJECTS.length)}
        </span>
      </header>

      {/* Encabezado: info + imagen */}
      <section className="container-x relative grid items-center gap-12 pb-20 pt-6 lg:grid-cols-12 lg:gap-10 lg:pt-10">
        <div className="lg:col-span-6">
          <motion.p {...fadeUp(0)} className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: project.Color }}>
            {project.Tagline}
          </motion.p>
          <motion.h1
            {...fadeUp(0.05)}
            className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-sand sm:text-5xl lg:text-6xl"
          >
            {project.Title}
          </motion.h1>
          <motion.p {...fadeUp(0.12)} className="mt-5 max-w-xl text-base leading-relaxed text-sand-200 sm:text-lg">
            {project.Description}
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="mt-7 flex flex-wrap gap-3">
            {project.Link && (
              <a href={project.Link} target="_blank" rel="noopener noreferrer" className="btn-rose group">
                Ver sitio en vivo
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            )}
            {repos.map((href, i) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={!project.Link && i === 0 ? "btn-rose group" : "btn-outline group text-xs"}
              >
                <Github className="h-4 w-4" />
                {repos.length > 1 ? `Código ${i + 1}` : "Ver código"}
              </a>
            ))}
          </motion.div>

          <motion.dl {...fadeUp(0.28)} className="mt-10 grid grid-cols-3 gap-3">
            {meta.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-white/[0.08] bg-ink-100/60 p-4">
                <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-sand-400">
                  <Icon className="h-3.5 w-3.5" style={{ color: project.Color }} /> {label}
                </dt>
                <dd className="mt-2 text-sm font-medium text-sand">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Imagen sobre el disco del color del proyecto */}
        <motion.div
          initial={{ opacity: 0, rotate: 8, scale: 0.9 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[520px] lg:col-span-6"
        >
          <div
            className="absolute inset-[8%] rounded-full"
            style={{ background: project.Color, boxShadow: `0 0 120px -20px ${project.Color}` }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_55%)]" />
            <div className="absolute inset-[12%] rounded-full border border-white/25" />
          </div>
          <div className="relative flex aspect-square items-center justify-center">
            <div className="w-[94%] animate-float overflow-hidden rounded-xl border border-white/20 bg-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)]">
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-ink-100 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                <span className="ml-2 truncate font-mono text-[10px] text-sand-400">
                  {project.Link ? project.Link.replace(/^https?:\/\//, "").replace(/\/$/, "") : project.ShortTitle}
                </span>
              </div>
              <img
                src={project.Img}
                alt={`Captura de ${project.Title}`}
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Características */}
      <section className="container-x relative border-t border-white/[0.08] py-20">
        <SectionTitle className="mb-8">Características principales</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          {project.Features.map((feature, i) => (
            <Reveal key={feature} delay={i * 0.05}>
              <div className="group flex h-full gap-4 rounded-2xl border border-white/[0.08] bg-ink-100/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)]">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold text-ink"
                  style={{ background: project.Color }}
                >
                  {pad(i + 1)}
                </span>
                <p className="text-sm leading-relaxed text-sand-200 sm:text-[15px]">{feature}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <SectionTitle className="mb-6 mt-16">Tecnologías</SectionTitle>
        <Reveal className="flex flex-wrap gap-2">
          {project.TechStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-ink-100/60 px-4 py-2 text-sm text-sand transition-colors hover:border-[color:var(--accent)]"
            >
              {tech}
            </span>
          ))}
        </Reveal>
      </section>

      {/* Navegación entre proyectos */}
      <nav aria-label="Otros proyectos" className="container-x grid gap-4 border-t border-white/[0.08] py-12 sm:grid-cols-2">
        <NavCard project={prev} label="Anterior" direction="prev" />
        <NavCard project={next} label="Siguiente" direction="next" />
      </nav>
    </main>
  );
};

export default ProjectDetails;
