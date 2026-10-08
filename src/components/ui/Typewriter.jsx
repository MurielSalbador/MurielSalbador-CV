import { useEffect, useState } from "react";

// Escribe y borra una lista de palabras en loop.
export default function Typewriter({ words, className = "" }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let delay = deleting ? 45 : 95;
    if (!deleting && text === word) delay = 1800;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-blink bg-rose" />
    </span>
  );
}
