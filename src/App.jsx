import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import "./index.css";
import Hero from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Journey from "./Pages/Journey";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import Cursor from "./components/ui/Cursor";
import { getLenis, scrollToTarget, setLenis } from "./lib/scroll";

const ProjectDetails = lazy(() => import("./components/ProjectDetail"));
const NotFoundPage = lazy(() => import("./Pages/404"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <span className="h-2.5 w-2.5 animate-ping rounded-full bg-acid" />
  </div>
);

const LandingPage = ({ showIntro, onIntroDone }) => {
  const location = useLocation();
  const handledKey = useRef(null);

  // Pausamos el scroll mientras corre la intro.
  useEffect(() => {
    const lenis = getLenis();
    if (showIntro) lenis?.stop();
    else lenis?.start();
  }, [showIntro]);

  // Al volver desde el detalle de un proyecto, saltamos a la sección pedida.
  useEffect(() => {
    if (showIntro || handledKey.current === location.key) return;
    handledKey.current = location.key;
    const target = location.state?.scrollTo;
    if (target) requestAnimationFrame(() => scrollToTarget(target, { immediate: true }));
    else window.scrollTo(0, 0);
  }, [showIntro, location.key, location.state]);

  return (
    <>
      <AnimatePresence>{showIntro && <Preloader onComplete={onIntroDone} />}</AnimatePresence>
      <Navbar ready={!showIntro} />
      <main>
        <Hero ready={!showIntro} />
        <About />
        <Projects />
        <Journey />
      </main>
      <Footer />
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <Footer />
  </>
);

function App() {
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem("welcomeShown"));

  const handleIntroDone = useCallback(() => {
    sessionStorage.setItem("welcomeShown", "true");
    setShowIntro(false);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);
    // Los efectos de los hijos corren antes que este: si la intro está activa, frenamos acá.
    if (!sessionStorage.getItem("welcomeShown")) lenis.stop();

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage showIntro={showIntro} onIntroDone={handleIntroDone} />} />
          <Route path="/project/:id" element={<ProjectPageLayout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
