import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("es-AR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Argentina/Buenos_Aires",
});

// Hora local de Rosario, actualizada cada 30 segundos.
export default function useLocalTime() {
  const [time, setTime] = useState(() => formatter.format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatter.format(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return time;
}
