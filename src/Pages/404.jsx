import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { LineReveal, Reveal } from "../components/ui/Reveal";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <p
        className="text-outline pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[42vw] font-semibold leading-none tracking-[-0.06em]"
        aria-hidden="true"
      >
        404
      </p>

      <div className="container-x relative">
        <Reveal className="eyebrow mb-6">Error 404</Reveal>
        <h1 className="text-[clamp(2.8rem,9vw,8rem)] font-medium leading-[0.9] tracking-[-0.05em]">
          <LineReveal
            animate
            lines={[
              <>Esta página</>,
              <>
                <em className="font-serif font-normal italic text-acid">se perdió.</em>
              </>,
            ]}
          />
        </h1>
        <Reveal delay={0.3} className="mt-8 max-w-md text-lg text-zinc-400">
          La página que buscás puede haber sido movida, eliminada o nunca existió.
        </Reveal>
        <Reveal delay={0.4} className="mt-10 flex flex-wrap gap-3">
          <Link to="/" className="btn-acid group">
            Ir al inicio
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
          <button type="button" onClick={() => navigate(-1)} className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> Volver atrás
          </button>
        </Reveal>
      </div>
    </main>
  );
}
