import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import Lenis from "lenis";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import WelcomeScreen from "./Pages/WelcomeScreen";
import ScrollProgress from "./components/ScrollProgress";
import Footer from "./components/Footer";
import { setLenis } from "./lib/scroll";
import { AnimatePresence } from "framer-motion";

const ProjectDetails = lazy(() => import("./components/ProjectDetail"));
const NotFoundPage = lazy(() => import("./Pages/404"));

const PageLoader = () => (
  <div className="min-h-screen bg-[#030014] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#6366f1]/30 border-t-[#6366f1] rounded-full animate-spin" />
  </div>
);

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  useEffect(() => {
    if (!showWelcome) {
      window.scrollTo(0, 0);
      AOS.refresh();
    }
  }, [showWelcome]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <ScrollProgress />
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <Footer />
        </>
      )}
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
  const [showWelcome, setShowWelcome] = useState(
    () => !sessionStorage.getItem("welcomeShown")
  );

  const handleWelcomeComplete = () => {
    sessionStorage.setItem("welcomeShown", "true");
    setShowWelcome(false);
  };

  useEffect(() => {
    AOS.init({ once: true, offset: 10 });

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
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
          <Route
            path="/"
            element={
              <LandingPage
                showWelcome={showWelcome}
                setShowWelcome={handleWelcomeComplete}
              />
            }
          />
          <Route path="/project/:id" element={<ProjectPageLayout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
