import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CornerDownLeft } from "lucide-react";
import { RiskBadge } from "@/components/RiskBadge";
import { students } from "@/data/students";

/**
 * Busca global de alunos disponível no cabeçalho.
 * Atalhos: "/" ou Ctrl/Cmd+K focam o campo; setas navegam; Enter abre o perfil.
 */
export function GlobalSearch() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return students
      .filter(
        (s) =>
          s.nome.toLowerCase().includes(q) ||
          s.curso.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query]);

  // Atalhos globais de teclado
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key === "k")) {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Fechar ao clicar fora
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => setActive(0), [query]);

  function go(id: number) {
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
    navigate(`/alunos/${id}`);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active].id);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={onInputKey}
        placeholder="Buscar alunos por nome ou curso…"
        aria-label="Buscar alunos"
        className="h-10 w-full rounded-md border border-input bg-muted/40 pl-9 pr-12 text-sm outline-none transition-colors focus:border-primary focus:bg-card focus:ring-2 focus:ring-ring/30"
      />
      <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:block">
        /
      </kbd>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-12 z-30 overflow-hidden rounded-md border border-border bg-card card-shadow-lg">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              Nenhum aluno encontrado para “{query.trim()}”.
            </p>
          ) : (
            <ul className="max-h-80 overflow-auto py-1">
              {results.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(s.id)}
                    className={
                      "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors " +
                      (i === active ? "bg-primary-light" : "hover:bg-muted")
                    }
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-foreground">
                        {s.nome}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {s.curso} · {s.semestre}º semestre
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <RiskBadge risco={s.risco} />
                      {i === active && (
                        <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
