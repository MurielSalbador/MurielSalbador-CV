// Instancia compartida de Lenis para que toda la app use el mismo motor de scroll.
let lenisInstance = null;

export const setLenis = (lenis) => {
  lenisInstance = lenis;
};

export const getLenis = () => lenisInstance;

export const scrollToTarget = (target, options = {}) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -80, ...options });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: options.immediate ? "auto" : "smooth" });
    }
  }
};
