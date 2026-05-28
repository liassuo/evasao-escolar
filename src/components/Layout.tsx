import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, GraduationCap } from "lucide-react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Clock } from "@/components/Clock";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/alunos", label: "Alunos", icon: Users, end: false },
  { to: "/relatorios", label: "Relatórios", icon: BarChart3, end: false },
];

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <header className="sticky top-0 z-20 border-b border-border bg-card">
        {/* Linha principal: marca + busca + relógio */}
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-4 px-5 md:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <GraduationCap className="h-[22px] w-[22px]" strokeWidth={1.75} />
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-medium tracking-tight">
                Persist<span className="text-primary">AI</span>
              </p>
              <p className="hidden text-[11px] font-light text-muted-foreground sm:block">
                Acompanhamento Estudantil
              </p>
            </div>
          </div>

          <div className="ml-auto hidden w-full max-w-sm md:block">
            <GlobalSearch />
          </div>

          <div className="ml-auto md:ml-0">
            <Clock />
          </div>
        </div>

        {/* Linha de navegação (desktop) */}
        <nav className="mx-auto hidden w-full max-w-[1400px] items-center gap-1 px-5 md:flex md:px-8">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )
              }
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Busca (mobile) */}
        <div className="border-t border-border px-5 py-2.5 md:hidden">
          <GlobalSearch />
        </div>
      </header>

      <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-[1400px] animate-fade-in">
          <Outlet />
        </div>
      </main>

      {/* Navegação inferior (mobile) */}
      <nav className="sticky bottom-0 z-20 flex border-t border-border bg-card md:hidden">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                isActive ? "text-primary" : "text-muted-foreground",
              )
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
