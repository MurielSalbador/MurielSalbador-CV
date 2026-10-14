import { Reveal } from "./Reveal";

// Encabezado de panel: "MIS PROYECTOS ✦" + acción opcional a la derecha.
export default function SectionTitle({ children, right, className = "" }) {
  return (
    <Reveal className={`relative z-30 flex items-center justify-between gap-4 ${className}`}>
      <h2 className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-sand">
        {children} <span className="text-rose">✦</span>
      </h2>
      {right}
    </Reveal>
  );
}
