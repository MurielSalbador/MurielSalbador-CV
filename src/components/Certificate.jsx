import React, { useState } from "react";
import { GraduationCap, X, Maximize2 } from "lucide-react";

const Certificate = ({ ImgSertif, title, date }) => {
  const [open, setOpen] = useState(false);
  const hasImage = ImgSertif && ImgSertif.trim() !== "";

  if (hasImage) {
    return (
      <div className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#6366f1]/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(99,102,241,0.12)] hover:-translate-y-0.5">
        <div
          className="relative overflow-hidden cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <img
            src={ImgSertif}
            alt={title || "Certificado"}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-white text-xs font-medium bg-black/50 rounded-lg px-3 py-1.5">
              <Maximize2 className="w-3.5 h-3.5" /> Ver completo
            </div>
          </div>
        </div>

        {(title || date) && (
          <div className="px-3 py-2.5 text-center border-t border-white/[0.06]">
            {title && <p className="text-white text-xs font-semibold leading-snug">{title}</p>}
            {date && <p className="text-[#a78bfa] text-[10px] font-mono mt-0.5">{date}</p>}
          </div>
        )}

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

  // No image — styled card
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#6366f1]/[0.07] to-[#a855f7]/[0.07] p-5 flex flex-col items-center text-center gap-3 hover:border-[#6366f1]/30 hover:from-[#6366f1]/[0.12] hover:to-[#a855f7]/[0.12] transition-all duration-300 group min-h-[130px] justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 to-[#a855f7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 w-11 h-11 rounded-full bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 border border-[#6366f1]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <GraduationCap className="w-5 h-5 text-[#a78bfa]" />
      </div>

      <div className="relative z-10 space-y-1">
        {title && (
          <p className="text-white text-xs font-semibold leading-snug">{title}</p>
        )}
        {date && (
          <p className="text-[#a78bfa] text-[10px] font-mono">{date}</p>
        )}
      </div>
    </div>
  );
};

export default Certificate;
