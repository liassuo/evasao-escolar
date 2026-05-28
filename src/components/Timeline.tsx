import {
  CalendarX,
  AlertTriangle,
  UserCheck,
  FileText,
  type LucideIcon,
} from "lucide-react";
import type { EventKind, TimelineEvent } from "@/types";

const config: Record<
  EventKind,
  { icon: LucideIcon; dot: string; ring: string }
> = {
  falta: { icon: CalendarX, dot: "text-risk-high", ring: "bg-risk-high-bg" },
  alerta: { icon: AlertTriangle, dot: "text-risk-medium", ring: "bg-risk-medium-bg" },
  intervencao: { icon: UserCheck, dot: "text-primary", ring: "bg-primary-light" },
  registro: { icon: FileText, dot: "text-muted-foreground", ring: "bg-muted" },
};

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative space-y-5 pl-2">
      {events.map((ev, i) => {
        const c = config[ev.tipo];
        const Icon = c.icon;
        const last = i === events.length - 1;
        return (
          <li key={i} className="relative flex gap-3.5">
            {/* Linha vertical conectando os eventos */}
            {!last && (
              <span
                className="absolute left-[15px] top-8 h-[calc(100%+0.5rem)] w-px bg-border"
                aria-hidden
              />
            )}
            <span
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${c.ring}`}
            >
              <Icon className={`h-4 w-4 ${c.dot}`} />
            </span>
            <div className="-mt-0.5 min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">{ev.titulo}</p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {ev.data}
                </span>
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {ev.descricao}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
