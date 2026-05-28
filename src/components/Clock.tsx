import { useEffect, useState } from "react";

const diaSemana = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

const meses = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Relógio institucional do header: data por extenso + hora ao vivo. */
export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const data = `${diaSemana[now.getDay()]}, ${now.getDate()} de ${
    meses[now.getMonth()]
  } de ${now.getFullYear()}`;
  const hora = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
    now.getSeconds(),
  )}`;

  return (
    <div className="text-right leading-tight">
      <p className="text-[11px] font-light capitalize text-muted-foreground">
        {data}
      </p>
      <p className="tabular font-display text-sm font-medium tracking-tight text-foreground">
        {hora}
      </p>
    </div>
  );
}
