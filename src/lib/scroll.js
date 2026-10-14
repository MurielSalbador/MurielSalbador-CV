// Instancia compartida de Lenis para que toda la app use el mismo motor de scroll.
let lenisInstance = null;

export const setLenis = (lenis) => {
  lenisInstance = lenis;
};

export const getLenis = () => lenisInstance;

// Vuelve arriba de todo sin animación (Lenis guarda su propia posición,
// así que hay que resetearlo además del scroll nativo).
export const resetScroll = () => {
  lenisInstance?.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
};

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
