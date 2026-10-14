// Cinta horizontal infinita; el contenido se duplica para que el loop sea continuo.
export default function Marquee({ children, className = "", reverse = false, speed = 40 }) {
  const style = { animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" };

  return (
    <div className={`marquee mask-fade-x flex overflow-hidden ${className}`}>
      <div className="animate-marquee flex w-max shrink-0" style={style}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
