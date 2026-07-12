import { useEffect, useRef } from "react";

/**
 * Onda de partículas en perspectiva (terreno de puntos violeta)
 * Replica la onda del mockup: grilla de puntos con colinas animadas.
 * - Se adapta al ancho del contenedor (ResizeObserver)
 * - Respeta prefers-reduced-motion (dibuja un frame estático)
 */
const DotWaveTerrain = ({ height = 300, className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let t = 0;
    let width = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const COLS = 110; // puntos por fila
    const ROWS = 26; // filas hacia el horizonte

    const resize = () => {
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const heightField = (x, z, time) => {
      // combinación de senos para simular colinas
      return (
        Math.sin(x * 0.9 + time * 0.8) * 0.5 +
        Math.sin(x * 0.35 - time * 0.5) * 0.8 +
        Math.cos(z * 1.4 + time * 0.6) * 0.45 +
        Math.sin((x + z) * 0.6 + time * 0.35) * 0.35
      );
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      const horizon = height * 0.18;

      for (let r = 0; r < ROWS; r++) {
        const depth = r / (ROWS - 1); // 0 = lejos, 1 = cerca
        // perspectiva: filas cercanas más separadas y anchas
        const y = horizon + Math.pow(depth, 1.65) * (height - horizon);
        const rowWidth = width * (0.55 + 0.55 * depth);
        const xStart = (width - rowWidth) / 2;
        const amp = 10 + depth * 46; // amplitud de las colinas

        for (let c = 0; c <= COLS; c++) {
          const u = c / COLS;
          const px = xStart + u * rowWidth;
          const h = heightField(u * 10, depth * 6, time);
          const py = y - h * amp * 0.35 - Math.max(h, 0) * amp * 0.4;

          const glow = Math.max(0, h); // picos más brillantes
          const alpha = (0.08 + depth * 0.5) * (0.35 + glow * 0.9);
          const size = (0.6 + depth * 1.5) * (0.8 + glow * 0.5);

          ctx.beginPath();
          ctx.fillStyle =
            glow > 0.9
              ? `rgba(192, 132, 252, ${Math.min(alpha + 0.25, 1)})` // #c084fc
              : `rgba(139, 92, 246, ${Math.min(alpha, 0.9)})`; // #8b5cf6
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // desvanecer suavemente hacia arriba
      const fade = ctx.createLinearGradient(0, 0, 0, height);
      fade.addColorStop(0, "rgba(3, 0, 20, 1)");
      fade.addColorStop(0.35, "rgba(3, 0, 20, 0)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, width, height);
    };

    const loop = () => {
      t += 0.012;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduceMotion) {
      draw(1.5); // frame estático
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(1.5);
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [height]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      style={{ height }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DotWaveTerrain;
