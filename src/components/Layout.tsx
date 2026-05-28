import { Outlet, NavLink } from "react-router-dom";
import { Home, LayoutDashboard, Users, BarChart3 } from "lucide-react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Clock } from "@/components/Clock";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Início", icon: Home, end: true },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: false },
  { to: "/alunos", label: "Alunos", icon: Users, end: false },
  { to: "/relatorios", label: "Relatórios", icon: BarChart3, end: false },
];

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <header className="sticky top-0 z-20 border-b border-border bg-card">
        <div className="mx-auto flex h-[68px] w-full max-w-[1400px] items-center gap-8 px-5 md:px-8">
          {/* Marca: ícone + nome */}
          <NavLink
            to="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="PersistAI — início"
          >
            <img src="/icon.png" alt="" className="h-9 w-9 object-contain" />
            <span className="font-display text-xl font-semibold tracking-tight text-ink">
              Persist<span className="text-primary">AI</span>
            </span>
          </NavLink>

          {/* Navegação sóbria (desktop) — sublinhado sutil no item ativo */}
          <nav className="hidden h-full items-stretch gap-1 md:flex">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-2 px-3 text-sm font-medium transition-colors",
                    "after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors",
                    isActive
                      ? "text-primary after:bg-primary"
                      : "text-muted-foreground after:bg-transparent hover:text-foreground",
                  )
                }
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Busca + relógio (direita) */}
          <div className="ml-auto flex items-center gap-5">
            <div className="hidden w-full max-w-[240px] lg:block">
              <GlobalSearch />
            </div>
            <Clock />
          </div>
        </div>

        {/* Busca (mobile/tablet) */}
        <div className="border-t border-border px-5 py-2.5 lg:hidden">
          <GlobalSearch />
        </div>
      </header>

      <main className="flex-1 px-5 py-7 md:px-8 md:py-9">
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
