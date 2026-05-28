import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3 } from "lucide-react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Clock } from "@/components/Clock";
import { BrandIcon } from "@/components/BrandIcon";
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
        {/* Linha principal: marca (esq) · abas centralizadas · busca+relógio (dir) */}
        <div className="mx-auto grid h-16 w-full max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 md:px-8">
          {/* Marca */}
          <div className="flex items-center gap-2.5">
            <BrandIcon className="h-10 w-10 shrink-0" />
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold tracking-tight">
                Persist<span className="text-primary">AI</span>
              </p>
              <p className="hidden text-[11px] font-light text-muted-foreground sm:block">
                Acompanhamento Estudantil
              </p>
            </div>
          </div>

          {/* Abas centralizadas (desktop) */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
              >
                <Icon className="h-[18px] w-[18px]" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Busca + relógio (direita) */}
          <div className="flex items-center justify-end gap-4">
            <div className="hidden w-full max-w-[260px] lg:block">
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
