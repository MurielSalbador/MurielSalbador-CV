import { useEffect, useMemo, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { PROJECTS } from "../data/projects";
import { LineReveal, Reveal } from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";
import { EASE } from "./ui/motion";

const pad = (n) => String(n).padStart(2, "0");

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef(null);

  const index = PROJECTS.findIndex((p) => String(p.id) === id);
  const project = index >= 0 ? PROJECTS[index] : null;
  const next = useMemo(() => (index >= 0 ? PROJECTS[(index + 1) % PROJECTS.length] : null), [index]);

  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const backToProjects = () => navigate("/", { state: { scrollTo: "#Proyectos" } });

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-medium tracking-tight">Proyecto no encontrado</h1>
          <p className="text-zinc-400">El proyecto que buscás no existe o fue movido.</p>
          <Link to="/" className="btn-acid">
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const links = [
    project.Link && { label: "Sitio en vivo", href: project.Link, icon: ArrowUpRight },
    ...(project.Github || []).filter(Boolean).map((href, i, arr) => ({
      label: arr.length > 1 ? `GitHub ${i + 1}` : "Código fuente",
      href,
      icon: Github,
    })),
  ].filter(Boolean);

  return (
    <main key={project.id} style={{ "--accent": project.Color }} className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-[30vw] left-1/2 h-[60vw] w-[80vw] -translate-x-1/2 rounded-full opacity-20 blur-[140px]"
        style={{ background: "var(--accent)" }}
        aria-hidden="true"
      />

      {/* Barra superior */}
      <header className="container-x relative flex items-center justify-between py-6">
        <button type="button" onClick={backToProjects} className="btn-ghost group px-5 py-2.5">
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Proyectos
        </button>
        <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-bone text-sm font-semibold text-ink">
          MS
        </Link>
      </header>

      {/* Encabezado */}
      <section className="container-x relative pb-16 pt-12 md:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="eyebrow flex items-center gap-3"
        >
          <span style={{ color: "var(--accent)" }}>
            {pad(index + 1)} / {pad(PROJECTS.length)}
          </span>
          <span className="h-px w-10 bg-white/20" />
          {project.Tagline}
        </motion.p>

        <h1 className="mt-6 text-[clamp(3rem,11vw,10rem)] font-medium leading-[0.9] tracking-[-0.055em]">
          <LineReveal animate lines={[project.Title]} delay={0.1} />
        </h1>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-12">
          <Reveal className="text-xl font-light leading-relaxed text-zinc-300 md:col-span-7 md:text-2xl">
            {project.Description}
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <dl className="divide-y divide-white/10 border-y border-white/10 text-sm">
              <div className="flex justify-between py-3">
                <dt className="text-zinc-500">Tipo</dt>
                <dd>{project.Tagline}</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-zinc-500">Tecnologías</dt>
                <dd>{project.TechStack.length}</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-zinc-500">Estado</dt>
                <dd>{project.Link ? "En producción" : "Uso interno"}</dd>
              </div>
            </dl>
            {links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {links.map(({ label, href, icon: Icon }, i) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={i === 0 ? "btn-acid group" : "btn-ghost group"}
                  >
                    {label}
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  </a>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Imagen principal */}
      <section ref={imageRef} className="container-x relative">
        <motion.div
          style={{ scale: imageScale }}
          className="overflow-hidden rounded-[28px] border border-white/10 bg-ink-100"
        >
          <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </span>
            <span className="flex-1 truncate text-center font-mono text-xs text-zinc-500">
              {project.Link ? project.Link.replace(/^https?:\/\//, "").replace(/\/$/, "") : project.Title}
            </span>
          </div>
          <div className="overflow-hidden">
            <motion.img
              style={{ y: imageY }}
              src={project.Img}
              alt={`Captura de ${project.Title}`}
              className="w-full scale-[1.12] object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Características + stack */}
      <section className="container-x relative grid gap-16 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-4">
          <Reveal className="eyebrow mb-6">Características</Reveal>
          <h2 className="text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-5xl">
            <LineReveal
              lines={[
                <>Qué hace</>,
                <>
                  <em className="font-serif font-normal italic" style={{ color: "var(--accent)" }}>
                    especial
                  </em>{" "}
                  a este proyecto
                </>,
              ]}
            />
          </h2>

          <Reveal delay={0.1} className="mt-12">
            <p className="eyebrow mb-4">Stack</p>
            <ul className="flex flex-wrap gap-2">
              {project.TechStack.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ol className="border-t border-white/10 md:col-span-7 md:col-start-6">
          {project.Features.map((feature, i) => (
            <Reveal as="li" key={feature} delay={i * 0.05} className="flex gap-6 border-b border-white/10 py-7">
              <span className="pt-1 font-mono text-sm" style={{ color: "var(--accent)" }}>
                {pad(i + 1)}
              </span>
              <p className="text-lg leading-relaxed text-zinc-300">{feature}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Siguiente proyecto */}
      {next && (
        <section className="relative border-t border-white/[0.08]">
          <Link
            to={`/project/${next.id}`}
            data-cursor="Siguiente"
            className="group container-x flex flex-col gap-10 py-20 md:flex-row md:items-center md:justify-between md:py-28"
          >
            <div>
              <p className="eyebrow mb-4">Siguiente proyecto</p>
              <p className="text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.05em] transition-transform duration-700 ease-expo group-hover:translate-x-3">
                {next.Title}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden h-40 w-64 overflow-hidden rounded-2xl border border-white/10 lg:block">
                <img
                  src={next.Img}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-expo group-hover:scale-110"
                />
              </div>
              <Magnetic>
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-acid text-ink">
                  <ArrowRight className="h-7 w-7 transition-transform duration-500 ease-expo group-hover:-rotate-45" />
                </span>
              </Magnetic>
            </div>
          </Link>
        </section>
      )}
    </main>
  );
};

export default ProjectDetails;
