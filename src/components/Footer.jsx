import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { scrollToTarget } from "../lib/scroll";
import useLocalTime from "../lib/useLocalTime";
import { LineReveal, Reveal } from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";
import { NAV_ITEMS, LINKEDIN } from "../lib/nav";

const SOCIALS = [
  { label: "LinkedIn", href: LINKEDIN },
  { label: "GitHub", href: "https://github.com/MurielSalbador" },
  { label: "Instagram", href: "https://www.instagram.com/muriel_salbador?igsh=dHp1a2F6ZGxkbjlt" },
];

const Footer = () => {
  const time = useLocalTime();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goTo = (e, id) => {
    e.preventDefault();
    if (pathname === "/") scrollToTarget(`#${id}`, id === "Home" ? { offset: 0 } : {});
    else navigate("/", { state: { scrollTo: `#${id}` } });
  };

  return (
    <footer id="Contacto" className="relative overflow-hidden border-t border-white/[0.08] bg-ink-50 pt-28 md:pt-40">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[40vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid/[0.07] blur-[140px]"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <Reveal className="eyebrow flex items-center gap-3">
          <span className="text-acid">04</span>
          <span className="h-px w-10 bg-white/20" />
          Contacto
        </Reveal>

        <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-[clamp(3rem,10vw,9.5rem)] font-medium leading-[0.9] tracking-[-0.055em]">
            <LineReveal
              lines={[
                <>¿Tenés una idea?</>,
                <>
                  <em className="font-serif font-normal italic text-acid">Hablemos.</em>
                </>,
              ]}
            />
          </h2>

          <Reveal delay={0.3} className="shrink-0">
            <Magnetic strength={0.4}>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-full bg-acid text-ink transition-transform duration-500 ease-expo hover:scale-105 sm:h-48 sm:w-48"
              >
                <ArrowUpRight className="h-8 w-8 transition-transform duration-500 ease-expo group-hover:rotate-45" />
                <span className="text-sm font-medium">Escribime</span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-10 border-t border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="eyebrow mb-5">Redes</p>
            <ul className="space-y-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-lg text-zinc-300 transition-colors hover:text-acid"
                  >
                    {s.label}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Navegación</p>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={(e) => goTo(e, item.id)}
                    className="text-lg text-zinc-300 transition-colors hover:text-acid"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Hora local</p>
            <p className="text-lg text-zinc-300">
              {time} <span className="text-zinc-500">· Rosario, AR</span>
            </p>
          </div>

          <div className="flex items-start sm:justify-start lg:justify-end">
            <button
              type="button"
              onClick={() => (pathname === "/" ? scrollToTarget(0, { offset: 0 }) : window.scrollTo({ top: 0 }))}
              className="group flex items-center gap-3 text-lg text-zinc-300 transition-colors hover:text-acid"
            >
              Volver arriba
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-acid">
                <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Firma gigante */}
      <div className="relative select-none overflow-hidden" aria-hidden="true">
        <p className="text-outline whitespace-nowrap text-center text-[15vw] font-semibold leading-[0.8] tracking-[-0.06em]">
          Muriel Salbador
        </p>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-zinc-500 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Muriel Salbador. Todos los derechos reservados.</span>
        <span>Diseñado y desarrollado con React, Tailwind y Framer Motion.</span>
      </div>
    </footer>
  );
};

export default Footer;
