import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { RiskBadge } from "@/components/RiskBadge";
import { RiskScore } from "@/components/RiskScore";
import { assessRisk } from "@/lib/ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { students, COURSES } from "@/data/students";
import type { RiskLevel } from "@/types";

export function Students() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [curso, setCurso] = useState("todos");
  const [risco, setRisco] = useState("todos");

  const filtered = useMemo(
    () =>
      students.filter((s) => {
        const matchesQuery = s.nome
          .toLowerCase()
          .includes(query.trim().toLowerCase());
        const matchesCurso = curso === "todos" || s.curso === curso;
        const matchesRisco = risco === "todos" || s.risco === (risco as RiskLevel);
        return matchesQuery && matchesCurso && matchesRisco;
      }),
    [query, curso, risco],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Alunos</h1>
        <p className="page-subtitle">
          Acompanhamento individual e classificação de risco de evasão
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
          <CardDescription>
            {filtered.length} de {students.length} alunos — selecione um aluno
            para ver o perfil e a análise da IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Buscar por nome
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex.: João Silva"
                  className="h-11 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/25"
                />
              </div>
            </div>
            <Select
              label="Curso"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
            >
              <option value="todos">Todos os cursos</option>
              {COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Select
              label="Nível de risco"
              value={risco}
              onChange={(e) => setRisco(e.target.value)}
            >
              <option value="todos">Todos os níveis</option>
              <option value="alto">Alto</option>
              <option value="medio">Médio</option>
              <option value="baixo">Baixo</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="px-0 py-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Nome</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Semestre</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Média</TableHead>
                <TableHead>Score IA</TableHead>
                <TableHead>Risco</TableHead>
                <TableHead className="pr-6" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow
                  key={s.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/alunos/${s.id}`)}
                >
                  <TableCell className="pl-6 font-medium">{s.nome}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {s.curso}
                  </TableCell>
                  <TableCell>{s.semestre}º</TableCell>
                  <TableCell
                    className={
                      s.frequencia < 60
                        ? "font-semibold text-risk-high"
                        : s.frequencia < 75
                          ? "font-semibold text-risk-medium"
                          : ""
                    }
                  >
                    {s.frequencia}%
                  </TableCell>
                  <TableCell>{s.media.toFixed(1)}</TableCell>
                  <TableCell>
                    {(() => {
                      const a = assessRisk(s);
                      return <RiskScore score={a.score} nivel={a.nivel} />;
                    })()}
                  </TableCell>
                  <TableCell>
                    <RiskBadge risco={s.risco} />
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    Nenhum aluno encontrado com os filtros selecionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
