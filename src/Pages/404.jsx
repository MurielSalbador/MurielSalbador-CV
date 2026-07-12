import { Home, ArrowLeft, SearchX } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Fondo con glows sutiles, coherente con el resto del sitio */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />
      <div className="absolute -bottom-8 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />

      <div className="text-center relative z-10">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold mb-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Ups… esta página no existe
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            La página que estás buscando puede haber sido movida, eliminada o nunca existió.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-28 h-28 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <SearchX className="w-12 h-12 text-[#a78bfa]" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-white/10 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Volver atrás
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg"
          >
            <Home size={20} />
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
