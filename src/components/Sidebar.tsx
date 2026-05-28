import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, GraduationCap, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/alunos", label: "Alunos", icon: Users, end: false },
  { to: "/relatorios", label: "Relatórios", icon: BarChart3, end: false },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
      <div className="flex items-center gap-2.5 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <p className="font-display text-lg font-bold tracking-tight">
            Persist<span className="text-primary">AI</span>
          </p>
          <p className="text-[11px] font-medium text-muted-foreground">
            Acompanhamento Estudantil
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="m-3 rounded-md border border-border bg-muted/60 p-3">
        <div className="mb-1 flex items-center gap-1.5 text-foreground">
          <Info className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-semibold">Ambiente de demonstração</span>
        </div>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          As análises são geradas a partir de indicadores acadêmicos para fins
          de demonstração.
        </p>
      </div>
    </aside>
  );
}
