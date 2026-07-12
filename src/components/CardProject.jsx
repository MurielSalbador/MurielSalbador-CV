import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Code2 } from 'lucide-react';

const MAX_TILT = 6; // grados

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id, TechStack = [] }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-py * MAX_TILT}deg) rotateY(${px * MAX_TILT}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = '';
  };

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm transition-transform duration-200 ease-out hover:border-[#6366f1]/30 hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)] flex flex-col will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image */}
      <div className="relative overflow-hidden h-44 shrink-0">
        {Img ? (
          <img
            src={Img}
            alt={Title}
            width="400"
            height="176"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 flex items-center justify-center">
            <Code2 className="w-12 h-12 text-[#6366f1]/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3 flex flex-col flex-1">
        <h3 className="text-base font-bold text-white leading-snug">{Title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1">{Description}</p>

        {/* Tech stack badges */}
        {TechStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {TechStack.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] rounded-full bg-[#6366f1]/10 text-[#a78bfa] border border-[#6366f1]/20 font-mono"
              >
                {tech}
              </span>
            ))}
            {TechStack.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-gray-500 border border-white/10">
                +{TechStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="pt-1 flex items-center gap-2 flex-wrap">
          {ProjectLink ? (
            <a
              href={ProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-xs font-medium hover:opacity-90 transition-all duration-200 hover:scale-105"
            >
              Ver Proyecto <ExternalLink className="w-3 h-3" />
            </a>
          ) : null}
          {id ? (
            <Link
              to={`/project/${id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-white/10 text-gray-400 text-xs hover:bg-white/5 hover:text-white hover:border-white/20 transition-all duration-200"
            >
              Detalles <ArrowRight className="w-3 h-3" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardProject;
