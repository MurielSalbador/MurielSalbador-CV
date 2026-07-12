import { useState, useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import { PROJECTS } from "../data/projects";
import DotWaveTerrain from "./DotWaveTerrain";

const MAX_CHIPS = 4;
const VISIBLE_THUMBS = 4; // como en el mockup: una sola fila de 4

/* ---- Calibración del efecto 3D de la pantalla ----
 * Ángulos medidos del mockup: giro hacia el COSTADO (Y) + leve
 * inclinación hacia atrás (X). El lado derecho queda más lejos.
 * SCREEN_TILT_Y: giro lateral (mockup ≈ 8-12). Valor negativo = gira al otro lado.
 * SCREEN_TILT_X: inclinación hacia atrás (mockup ≈ 6-10)
 * SCREEN_PERSPECTIVE: menor valor = perspectiva más dramática
 */
const SCREEN_TILT_Y = 10;
const SCREEN_TILT_X = 8;
const SCREEN_PERSPECTIVE = 1000;

const pad = (n) => String(n + 1).padStart(2, "0");

const ProjectShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = PROJECTS[activeIndex];

  const goPrev = useCallback(
    () => setActiveIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length),
    []
  );
  const goNext = useCallback(
    () => setActiveIndex((i) => (i + 1) % PROJECTS.length),
    []
  );

  // Navegación con teclado (← →)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  // Ventana deslizante de thumbnails: siempre UNA fila de 4
  const visibleThumbs = useMemo(() => {
    if (PROJECTS.length <= VISIBLE_THUMBS) {
      return PROJECTS.map((p, i) => ({ project: p, index: i }));
    }
    let start = activeIndex - 1;
    start = Math.max(0, Math.min(start, PROJECTS.length - VISIBLE_THUMBS));
    return PROJECTS.slice(start, start + VISIBLE_THUMBS).map((p, i) => ({
      project: p,
      index: start + i,
    }));
  }, [activeIndex]);

  return (
    <div className="relative pb-36 md:pb-48">
      <div className="grid grid-cols-1 lg:grid-cols-[230px_minmax(0,1fr)_290px] gap-10 lg:gap-8 items-center">
        {/* ---- Lista numerada (izquierda) ---- */}
        <div
          className="hidden lg:block relative self-start pt-6"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          {/* Línea vertical */}
          <div className="absolute left-[5px] top-8 bottom-8 w-px bg-white/10" />
          <ul className="space-y-7">
            {PROJECTS.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={project.id} className="relative pl-8">
                  {/* Punto */}
                  <span
                    className={`absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#a855f7] ring-4 ring-[#a855f7]/25 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                        : "bg-transparent border-2 border-slate-600"
                    }`}
                  />
                  <button
                    onClick={() => setActiveIndex(index)}
                    className="text-left group block w-full"
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span
                      className={`block text-lg font-bold leading-none transition-colors duration-300 ${
                        isActive
                          ? "text-[#a78bfa]"
                          : "text-slate-600 group-hover:text-slate-400"
                      }`}
                    >
                      {pad(index)}
                    </span>
                    <span
                      className={`block font-bold text-[15px] mt-1 transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-slate-500 group-hover:text-slate-300"
                      }`}
                    >
                      {project.ShortTitle}
                    </span>
                    <span
                      className={`block text-xs mt-0.5 transition-colors duration-300 ${
                        isActive ? "text-[#a78bfa]" : "text-slate-600"
                      }`}
                    >
                      {project.Tagline}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---- Carrusel central ---- */}
        <div
          className="relative flex flex-col items-center min-w-0"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <div className="relative w-full max-w-3xl mx-auto px-12 sm:px-16">
            {/* Resplandor debajo de la pantalla */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-40px] w-[95%] h-48 rounded-[50%] bg-[#7c3aed]/70 blur-[90px] pointer-events-none" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] w-[65%] h-24 rounded-[50%] bg-[#a855f7]/70 blur-[55px] pointer-events-none" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[15px] w-[40%] h-12 rounded-[50%] bg-[#e9d5ff]/40 blur-[35px] pointer-events-none" />

            {/* Flecha izquierda */}
            <button
              onClick={goPrev}
              aria-label="Proyecto anterior"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-white border border-[#a855f7]/40 bg-[#0b0121]/80 backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.65)] hover:border-[#a855f7]/70 hover:scale-105 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Flecha derecha */}
            <button
              onClick={goNext}
              aria-label="Proyecto siguiente"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-white border border-[#a855f7]/40 bg-[#0b0121]/80 backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.65)] hover:border-[#a855f7]/70 hover:scale-105 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/*
              Pantalla con perspectiva 3D.
              Estructura en 3 niveles para que nada pise la transformación:
              1) wrapper con key + fade (animación solo acá)
              2) contenedor de perspectiva (estático, sin animación)
              3) tarjeta rotada en X (inclinación tipo mockup)
            */}
            <div key={active.id} className="animate-showcase">
              <div style={{ perspective: `${SCREEN_PERSPECTIVE}px` }}>
                <div
                  className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0b0121] shadow-[0_50px_90px_-20px_rgba(0,0,0,0.95)]"
                  style={{
                    transform: `rotateX(${SCREEN_TILT_X}deg) rotateY(${SCREEN_TILT_Y}deg)`,
                    transformOrigin: "center center",
                  }}
                >
                  {active.Img ? (
                    <img
                      src={active.Img}
                      alt={active.ShortTitle}
                      className="w-full aspect-[16/10] object-cover object-top"
                    />
                  ) : (
                    <div className="w-full aspect-[16/10] bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 flex items-center justify-center">
                      <Code2 className="w-16 h-16 text-[#6366f1]/30" />
                    </div>
                  )}
                  {/* Brillo sutil sobre la pantalla */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#a855f7]/10 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Thumbnails: UNA sola fila de 4, superpuestos al borde inferior */}
            <div className="relative z-20 -mt-4 sm:-mt-6 flex justify-center">
              <div className="flex flex-nowrap gap-2 sm:gap-3 justify-center px-3 py-2 rounded-2xl bg-[#0b0121]/70 border border-white/10 backdrop-blur-md shadow-[0_15px_40px_-15px_rgba(0,0,0,0.85)]">
                {visibleThumbs.map(({ project, index }) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={project.id}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Ver ${project.ShortTitle}`}
                      className={`relative w-14 sm:w-20 md:w-24 shrink-0 aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        isActive
                          ? "border-[#a855f7] shadow-[0_0_18px_rgba(168,85,247,0.6)] scale-105"
                          : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/30"
                      }`}
                    >
                      {project.Img ? (
                        <img
                          src={project.Img}
                          alt=""
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1a1033] to-[#0b0121] flex items-center justify-center">
                          <Code2 className="w-5 h-5 text-[#6366f1]/40" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ---- Panel destacado (derecha) ---- */}
        <div
          key={`info-${active.id}`}
          className="animate-showcase self-center lg:self-start lg:pt-10"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#a855f7] mb-3">
            Proyecto Destacado
          </p>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {active.ShortTitle}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">{active.Description}</p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {active.TechStack.slice(0, MAX_CHIPS).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-[#6366f1]/10 text-[#a78bfa] border border-[#6366f1]/30"
              >
                {tech}
              </span>
            ))}
            {active.TechStack.length > MAX_CHIPS && (
              <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-slate-400 border border-white/10">
                +{active.TechStack.length - MAX_CHIPS}
              </span>
            )}
          </div>

          {/* Botones */}
          <div className="flex flex-col gap-3 max-w-[220px]">
            {active.Link ? (
              <a
                href={active.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] text-white text-sm font-semibold shadow-[0_8px_25px_-8px_rgba(168,85,247,0.7)] hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
              >
                Ver Proyecto <ExternalLink className="w-4 h-4" />
              </a>
            ) : null}
            <Link
              to={`/project/${active.id}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-slate-300 text-sm font-medium hover:bg-white/5 hover:text-white hover:border-white/30 transition-all duration-300"
            >
              Ver Detalles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ---- Dots de paginación ---- */}
      <div className="mt-12 flex items-center justify-center gap-2.5 relative z-10">
        {PROJECTS.map((project, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={project.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ir al proyecto ${pad(index)}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-7 bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.7)]"
                  : "w-4 bg-white/15 hover:bg-white/30"
              }`}
            />
          );
        })}
      </div>

      {/* ---- Onda de partículas (ancho completo, como en el mockup) ---- */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen">
        <DotWaveTerrain height={260} className="w-full" />
      </div>
    </div>
  );
};

export default ProjectShowcase;