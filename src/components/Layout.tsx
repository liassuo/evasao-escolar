import { Outlet, NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, Search } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";

const mobileLinks = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/alunos", label: "Alunos", icon: Users, end: false },
  { to: "/relatorios", label: "Relatórios", icon: BarChart3, end: false },
];

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/alunos": "Alunos",
  "/relatorios": "Relatórios",
};

export function Layout() {
  const { pathname } = useLocation();
  const title =
    titles[pathname] ?? (pathname.startsWith("/alunos") ? "Perfil do Aluno" : "PersistIA");

  return (
    <div className="flex min-h-screen bg-muted">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-card/80 px-5 backdrop-blur md:px-8">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Monitoramento Inteligente de Evasão Escolar
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground sm:flex">
            <Search className="h-4 w-4" />
            <span>Buscar alunos…</span>
          </div>
        </header>

        <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-7xl animate-fade-in">
            <Outlet />
          </div>
        </main>

        {/* Navegação inferior (mobile) */}
        <nav className="sticky bottom-0 z-10 flex border-t border-border bg-card md:hidden">
          {mobileLinks.map(({ to, label, icon: Icon, end }) => (
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
    </div>
  );
}
