import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 text-center">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-900/70 blur-[120px]" />

      <div className="relative">
        <Reveal as="p" className="font-display text-[40vw] font-semibold leading-none text-sand sm:text-[16rem]">
          4<span className="text-rose text-glow">0</span>4
        </Reveal>
        <Reveal delay={0.1} className="label text-rose">Página no encontrada ✦</Reveal>
        <Reveal as="h1" delay={0.15} className="mt-4 font-display text-3xl sm:text-4xl">
          Ups… esta página <em className="text-rose">se perdió</em>
        </Reveal>
        <Reveal delay={0.2} className="mx-auto mt-4 max-w-md text-sand-200">
          La página que buscás puede haber sido movida, eliminada o nunca existió.
        </Reveal>
        <Reveal delay={0.3} className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-rose">
            <Home className="h-4 w-4" /> Ir al inicio
          </Link>
          <button type="button" onClick={() => navigate(-1)} className="btn-outline text-xs">
            <ArrowLeft className="h-4 w-4" /> Volver
          </button>
        </Reveal>
      </div>
    </main>
  );
}
