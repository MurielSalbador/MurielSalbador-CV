import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, lazy, Suspense } from "react";
import Lenis from "lenis";
import "./index.css";
import Hero, { TechBand } from "./Pages/Home";
import Projects from "./Pages/Projects";
import About from "./Pages/About";
import Journey from "./Pages/Journey";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { scrollToTarget, setLenis } from "./lib/scroll";

const ProjectDetails = lazy(() => import("./components/ProjectDetail"));
const NotFoundPage = lazy(() => import("./Pages/404"));

const PageLoader = () => <div className="min-h-screen bg-ink" />;

const LandingPage = () => {
  const location = useLocation();
  const handledKey = useRef(null);

  // Al volver desde el detalle de un proyecto, saltamos a la sección pedida.
  useEffect(() => {
    if (handledKey.current === location.key) return;
    handledKey.current = location.key;
    const target = location.state?.scrollTo;
    if (target) requestAnimationFrame(() => scrollToTarget(target, { immediate: true }));
    else window.scrollTo(0, 0);
  }, [location.key, location.state]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechBand />
        <Projects />
        <About />
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
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);

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
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/project/:id" element={<ProjectPageLayout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
