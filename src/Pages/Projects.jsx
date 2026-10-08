import { memo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS } from "../data/projects";
import SectionHeading from "../components/ui/SectionHeading";
import useMediaQuery from "../lib/useMediaQuery";

const pad = (n) => String(n).padStart(2, "0");

const BrowserFrame = ({ project }) => (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl shadow-black/50">
    <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </span>
      <span className="flex-1 truncate rounded-full bg-white/[0.04] px-3 py-1 text-center font-mono text-[11px] text-zinc-500">
        {project.Link ? project.Link.replace(/^https?:\/\//, "").replace(/\/$/, "") : "app de escritorio · uso interno"}
      </span>
    </div>
    <div className="relative flex-1 overflow-hidden">
      <img
        src={project.Img}
        alt={`Captura de ${project.Title}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.04]"
      />
    </div>
  </div>
);

const ProjectCard = ({ project, index, total, progress }) => {
  // El apilado solo tiene sentido en pantallas grandes, donde las tarjetas son sticky.
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const targetScale = 1 - (total - index - 1) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="mb-6 md:sticky md:top-0 md:mb-0 md:flex md:h-screen md:items-center">
      <motion.article
        style={{ scale: isDesktop ? scale : 1, "--accent": project.Color, "--offset": `${index * 26}px` }}
        className="group relative w-full origin-top overflow-hidden rounded-[28px] border border-white/10 bg-ink-100 md:h-[80vh] md:max-h-[780px] md:[top:var(--offset)]"
      >
        {/* Halo de color del proyecto */}
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[120%] w-[80%] rounded-full opacity-20 blur-[120px] transition-opacity duration-700 group-hover:opacity-35"
          style={{ background: "var(--accent)" }}
          aria-hidden="true"
        />

        <div className="relative grid h-full gap-8 p-5 sm:p-8 md:grid-cols-12 md:gap-10 lg:p-10">
          <div className="flex flex-col justify-between gap-8 md:col-span-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-zinc-500">
                  <span style={{ color: "var(--accent)" }}>{pad(index + 1)}</span> / {pad(total)}
                </span>
                <span className="chip">{project.Tagline}</span>
              </div>
              <h3 className="mt-6 text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-5xl xl:text-6xl">
                {project.Title}
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400 md:line-clamp-4">{project.Description}</p>
            </div>

            <div className="space-y-5">
              <ul className="flex flex-wrap gap-2">
                {project.TechStack.slice(0, 5).map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
                {project.TechStack.length > 5 && <li className="chip text-zinc-500">+{project.TechStack.length - 5}</li>}
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <Link to={`/project/${project.id}`} className="btn-acid group/btn">
                  Ver caso
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-45" />
                </Link>
                {project.Link && (
                  <a href={project.Link} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    Sitio en vivo
                  </a>
                )}
                {project.Github?.[0] && (
                  <a
                    href={project.Github[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Repositorio de ${project.Title} en GitHub`}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-white/40 hover:bg-white/5"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <Link
            to={`/project/${project.id}`}
            data-cursor="Ver caso"
            aria-label={`Ver caso ${project.Title}`}
            className="block aspect-[16/11] md:col-span-7 md:aspect-auto"
          >
            <BrowserFrame project={project} />
          </Link>
        </div>
      </motion.article>
    </div>
  );
};

const Projects = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="Proyectos" className="relative py-28 md:pb-20 md:pt-40">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Proyectos seleccionados"
          lines={[
            <>Trabajo que</>,
            <>
              <em className="font-serif font-normal italic text-acid">habla</em> por sí solo.
            </>,
          ]}
        >
          E-commerce, sistemas de gestión, plataformas de turnos y sitios institucionales. Cada proyecto es un desafío
          real resuelto de punta a punta.
        </SectionHeading>

        <div ref={container} className="relative">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              total={PROJECTS.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);
