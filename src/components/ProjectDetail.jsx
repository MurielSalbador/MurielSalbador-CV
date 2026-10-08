import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { PROJECTS } from "../data/projects";
import { Reveal } from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";
import { EASE } from "./ui/motion";

const pad = (n) => String(n).padStart(2, "0");

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef(null);

  const index = PROJECTS.findIndex((p) => String(p.id) === id);
  const project = index >= 0 ? PROJECTS[index] : null;
  const next = index >= 0 ? PROJECTS[(index + 1) % PROJECTS.length] : null;

  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.9, 1]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const backToProjects = () => navigate("/", { state: { scrollTo: "#Proyectos" } });

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

  const links = [
    project.Link && { label: "Sitio en vivo", href: project.Link, icon: ArrowUpRight },
    ...(project.Github || []).filter(Boolean).map((href, i, arr) => ({
      label: arr.length > 1 ? `GitHub ${i + 1}` : "Código fuente",
      href,
      icon: Github,
    })),
  ].filter(Boolean);

  return (
    <main key={project.id} className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[50vw] w-[70vw] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-25 blur-[140px]"
        style={{ background: project.Color }}
        aria-hidden="true"
      />

      <header className="container-x relative flex items-center justify-between py-6">
        <button type="button" onClick={backToProjects} className="btn-outline group px-5 py-2.5 text-xs">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Proyectos
        </button>
        <Link to="/" className="font-mono text-sm font-bold tracking-wider">
          <span className="text-rose">MU</span>RIEL
        </Link>
      </header>

      <section className="container-x relative pb-14 pt-10 text-center md:pt-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="label"
        >
          <span style={{ color: project.Color }}>
            {pad(index + 1)} / {pad(PROJECTS.length)}
          </span>{" "}
          · {project.Tagline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-5 max-w-5xl font-display text-5xl font-medium leading-[0.95] sm:text-7xl lg:text-8xl"
        >
          {project.Title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-sand-200 sm:text-lg"
        >
          {project.Description}
        </motion.p>
        {links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {links.map(({ label, href, icon: Icon }, i) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={i === 0 ? "btn-rose group" : "btn-outline group text-xs"}
              >
                {label}
                <Icon className="h-4 w-4 transition-transform group-hover:rotate-12" />
              </a>
            ))}
          </motion.div>
        )}
      </section>

      {/* Captura con efecto de inclinación al scrollear */}
      <section ref={imageRef} className="container-x relative [perspective:1200px]">
        <motion.div
          style={{ rotateX, scale }}
          className="overflow-hidden rounded-2xl border border-white/15 bg-ink-100 shadow-[0_30px_100px_-30px_rgba(255,79,147,0.55)]"
        >
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center font-mono text-[11px] text-sand-400">
              {project.Link ? project.Link.replace(/^https?:\/\//, "").replace(/\/$/, "") : "aplicación de escritorio"}
            </span>
          </div>
          <img src={project.Img} alt={`Captura de ${project.Title}`} className="w-full" />
        </motion.div>
      </section>

      {/* Ficha + características */}
      <section className="container-x relative py-24">
        <div className="grid border border-white/[0.08] lg:grid-cols-3">
          <div className="border-b border-white/[0.08] p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <SectionTitle>Ficha</SectionTitle>
            <dl className="mt-6 divide-y divide-white/[0.06] text-sm">
              {[
                ["Tipo", project.Tagline],
                ["Tecnologías", project.TechStack.length],
                ["Estado", project.Link ? "En producción" : "Uso interno"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-3">
                  <dt className="text-sand-400">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="label mt-8">Stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.TechStack.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:col-span-2">
            <SectionTitle>Características principales</SectionTitle>
            <ol className="mt-4">
              {project.Features.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 0.05} className="group flex gap-5 border-b border-white/[0.06] py-4 last:border-0">
                  <span className="font-display text-2xl text-sand-400 transition-colors group-hover:text-rose">
                    {pad(i + 1)}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-sand-200 sm:text-base">{f}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Siguiente proyecto */}
      {next && (
        <Link
          to={`/project/${next.id}`}
          className="group relative block border-t border-white/[0.08] py-16 text-center transition-colors hover:bg-rose/[0.04] sm:py-24"
        >
          <p className="label">Siguiente proyecto ✦</p>
          <p className="mt-4 font-display text-5xl font-medium transition-colors duration-500 group-hover:text-rose sm:text-7xl">
            {next.Title}
          </p>
          <span className="mx-auto mt-8 flex h-14 w-14 items-center justify-center rounded-full border border-sand/25 transition-all duration-500 group-hover:border-rose group-hover:bg-rose group-hover:text-ink">
            <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-45" />
          </span>
        </Link>
      )}
    </main>
  );
};

export default ProjectDetails;
