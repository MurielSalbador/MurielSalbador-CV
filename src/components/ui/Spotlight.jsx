// Tarjeta con un halo de luz que sigue al cursor.
export default function Spotlight({ as: Comp = "div", className = "", children, ...props }) {
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Comp onMouseMove={onMove} className={`spotlight ${className}`} {...props}>
      {children}
    </Comp>
  );
}
