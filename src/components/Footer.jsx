import { ArrowUpRight, Github, Instagram, Linkedin, MapPin } from "lucide-react";
import { GITHUB, INSTAGRAM, LINKEDIN } from "../lib/nav";
import { Reveal } from "./ui/Reveal";

const CONTACTS = [
  { label: "in/muriel-salbador", href: LINKEDIN, icon: Linkedin },
  { label: "@MurielSalbador", href: GITHUB, icon: Github },
  { label: "@muriel_salbador", href: INSTAGRAM, icon: Instagram },
];

const Footer = () => (
  <footer id="Contacto" className="relative overflow-hidden pt-24 lg:pt-32">
    <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-rose-900/60 blur-[140px]" aria-hidden="true" />

    <div className="container-x relative">
      <div className="grid border border-white/[0.08] md:grid-cols-2 lg:grid-cols-12">
        <Reveal className="border-b border-white/[0.08] p-6 sm:p-8 md:border-r lg:col-span-4 lg:border-b-0">
          <p className="text-3xl font-light uppercase leading-tight tracking-wide sm:text-4xl">
            Creemos
            <br />
            algo
          </p>
          <p className="-mt-2 font-script text-7xl leading-none text-rose text-glow sm:text-8xl">increíble</p>
        </Reveal>

        <Reveal delay={0.05} className="flex flex-col gap-4 border-b border-white/[0.08] p-6 sm:p-8 lg:col-span-3 lg:border-b-0 lg:border-r">
          <p className="text-sm uppercase tracking-[0.15em]">
            Estoy disponible
            <br />
            para nuevos proyectos
          </p>
          <p className="text-sm text-sand-400">Construyamos algo con impacto, bien diseñado y que funcione.</p>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn-outline mt-auto self-start text-xs">
            Enviame un mensaje ✦
          </a>
        </Reveal>

        <Reveal delay={0.1} className="border-b border-white/[0.08] p-6 sm:p-8 md:border-r md:border-b-0 lg:col-span-3">
          <ul className="space-y-4">
            {CONTACTS.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-sand-200 transition-colors hover:text-rose"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-rose">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
            <li className="flex items-center gap-3 text-sm text-sand-200">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
                <MapPin className="h-4 w-4" />
              </span>
              Rosario, Argentina
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="relative min-h-[260px] overflow-hidden lg:col-span-2">
          <img
            src="/yo.webp"
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
          />
        </Reveal>
      </div>
    </div>

    <div className="mt-16 border-t border-rose/30 bg-gradient-to-r from-rose-900 via-rose-600/40 to-rose-900">
      <div className="container-x flex flex-col items-center justify-between gap-2 py-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-sand sm:flex-row">
        <span>Gracias por visitar ✦</span>
        <span className="text-sand/70">© {new Date().getFullYear()} Muriel Salbador</span>
      </div>
    </div>
  </footer>
);

export default Footer;
