import { useState } from "react";
import { GraduationCap, X, Maximize2 } from "lucide-react";
import DotWaveTerrain from "./DotWaveTerrain";

const IconBadge = ({ Icon = GraduationCap, size = "md" }) => {
  const sizes = {
    md: { circle: "w-11 h-11", icon: "w-5 h-5" },
    lg: { circle: "w-16 h-16", icon: "w-7 h-7" },
  };
  const s = sizes[size] || sizes.md;
  return (
    <div
      className={`${s.circle} shrink-0 rounded-full bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 border border-[#a855f7]/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
    >
      <Icon className={`${s.icon} text-[#a78bfa]`} />
    </div>
  );
};

/**
 * Tarjeta de certificado con 3 variantes (según el mockup):
 * - con imagen: preview + lightbox y pie con ícono, título y fecha
 * - "highlight": sin imagen, contenido centrado con onda de puntos al pie
 * - "wide": tarjeta horizontal con ondas decorativas a los costados
 */
const Certificate = ({ ImgSertif, title, date, icon, variant = "auto" }) => {
  const [open, setOpen] = useState(false);
  const hasImage = ImgSertif && ImgSertif.trim() !== "";
  const Icon = icon || GraduationCap;

  // Tarjeta con imagen + lightbox
  if (hasImage) {
    return (
      <div className="group h-full flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#6366f1]/30 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(99,102,241,0.15)] hover:-translate-y-0.5">
        <div
          className="relative flex-1 overflow-hidden cursor-pointer p-3 pb-0"
          onClick={() => setOpen(true)}
        >
          <img
            src={ImgSertif}
            alt={title || "Certificado"}
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-3 bottom-0 rounded-xl bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-white text-xs font-medium bg-black/50 rounded-lg px-3 py-1.5">
              <Maximize2 className="w-3.5 h-3.5" /> Ver completo
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 px-5 py-4">
          <IconBadge Icon={Icon} />
          <div className="text-left">
            {title && (
              <p className="text-white text-sm md:text-base font-semibold leading-snug">
                {title}
              </p>
            )}
            {date && (
              <p className="text-[#a78bfa] text-xs font-mono mt-1">{date}</p>
            )}
          </div>
        </div>

        {/* Lightbox */}
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={ImgSertif}
              alt={title || "Certificado"}
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    );
  }

  // Tarjeta ancha horizontal con ondas a los costados
  if (variant === "wide") {
    return (
      <div className="group relative h-full min-h-[130px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#6366f1]/[0.06] to-[#a855f7]/[0.06] hover:border-[#6366f1]/30 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(99,102,241,0.12)]">
        {/* Ondas decorativas laterales */}
        <div className="absolute inset-y-0 left-0 w-32 sm:w-44 opacity-70">
          <DotWaveTerrain height={150} className="w-full" />
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#a855f7]/40 to-transparent" />
        </div>
        <div className="absolute inset-y-0 right-0 w-32 sm:w-44 opacity-70">
          <DotWaveTerrain height={150} className="w-full" />
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#a855f7]/40 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center gap-4 px-24 sm:px-36 py-6">
          <IconBadge Icon={Icon} size="lg" />
          <div className="text-left">
            {title && (
              <p className="text-white text-sm md:text-lg font-semibold leading-snug">
                {title}
              </p>
            )}
            {date && (
              <p className="text-[#a78bfa] text-xs font-mono mt-1.5">{date}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Tarjeta destacada (sin imagen) con onda al pie
  return (
    <div className="group relative h-full min-h-[280px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#6366f1]/[0.08] to-[#a855f7]/[0.08] hover:border-[#6366f1]/30 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(99,102,241,0.15)] hover:-translate-y-0.5">
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-5 px-6 pt-8 pb-24">
        <IconBadge Icon={Icon} size="lg" />
        <div className="space-y-2">
          {title && (
            <p className="text-white text-base md:text-xl font-semibold leading-snug">
              {title}
            </p>
          )}
          {date && (
            <p className="text-[#a78bfa] text-xs font-mono">{date}</p>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 opacity-80">
        <DotWaveTerrain height={110} className="w-full" />
      </div>
    </div>
  );
};

export default Certificate;
