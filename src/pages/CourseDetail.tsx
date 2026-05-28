import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ArrowLeft,
  Users,
  AlertTriangle,
  CalendarCheck,
  TrendingDown,
  FileSearch,
  ChevronRight,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { RiskBadge } from "@/components/RiskBadge";
import { RiskScore } from "@/components/RiskScore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  courseFromSlug,
  studentsOfCourse,
  summaryOf,
  riskDistributionOf,
  frequencyBySemester,
} from "@/data/students";
import { assessRisk, courseInsight } from "@/lib/ai";

const riskOrder = { alto: 0, medio: 1, baixo: 2 } as const;

export function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const curso = slug ? courseFromSlug(slug) : undefined;

  const turma = useMemo(() => (curso ? studentsOfCourse(curso) : []), [curso]);
  const resumo = useMemo(() => summaryOf(turma), [turma]);
  const distribuicao = useMemo(() => riskDistributionOf(turma), [turma]);
  const freqSemestre = useMemo(
    () => (curso ? frequencyBySemester(curso) : []),
    [curso],
  );
  const insight = useMemo(
    () => (curso ? courseInsight(curso, turma) : ""),
    [curso, turma],
  );

  const ordenados = useMemo(
    () => [...turma].sort((a, b) => riskOrder[a.risco] - riskOrder[b.risco]),
    [turma],
  );

  if (!curso) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-sm text-muted-foreground">Curso não encontrado.</p>
          <Link
            to="/cursos"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Voltar para os cursos
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>

      <div>
        <p className="eyebrow">Turma</p>
        <h1 className="page-title mt-1">{curso}</h1>
        <p className="page-subtitle">
          Panorama de acompanhamento e risco de evasão da turma
        </p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard title="Alunos" value={resumo.total} icon={Users} accent="blue" />
        <StatCard title="Risco alto" value={resumo.alto} icon={AlertTriangle} accent="red" />
        <StatCard title="Frequência média" value={`${resumo.freqMedia}%`} icon={CalendarCheck} accent="green" />
        <StatCard title="Evasão estimada" value={`${resumo.evasao}%`} icon={TrendingDown} accent="amber" />
      </div>

      {/* Leitura da IA */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-primary" />
            Leitura da IA sobre a turma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground/90">{insight}</p>
          <p className="mt-3 text-[11px] italic text-muted-foreground">
            * Interpretação simulada para fins de demonstração acadêmica.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Distribuição de risco */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Nível de Risco</CardTitle>
            <CardDescription>Proporção atual da turma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribuicao}
                    dataKey="valor"
                    nameKey="nome"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    label={(e) => `${e.nome}: ${e.valor}`}
                    labelLine={false}
                  >
                    {distribuicao.map((d) => (
                      <Cell key={d.nome} fill={d.cor} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid #e2e8f0",
                      fontSize: 13,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Frequência por semestre */}
        <Card>
          <CardHeader>
            <CardTitle>Frequência Média por Semestre</CardTitle>
            <CardDescription>Percentual médio de presença na turma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={freqSemestre}
                  margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                  <XAxis
                    dataKey="semestre"
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "#f1f5f9" }}
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid #e2e8f0",
                      fontSize: 13,
                    }}
                    formatter={(v) => [`${v}%`, "Frequência"]}
                  />
                  <Bar
                    dataKey="frequencia"
                    fill="#1d4ed8"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de alunos da turma */}
      <Card>
        <CardHeader>
          <CardTitle>Alunos da Turma</CardTitle>
          <CardDescription>
            {turma.length} alunos — ordenados por nível de risco
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Nome</TableHead>
                <TableHead>Semestre</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Média</TableHead>
                <TableHead>Score IA</TableHead>
                <TableHead>Risco</TableHead>
                <TableHead className="pr-6" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordenados.map((s) => {
                const a = assessRisk(s);
                return (
                  <TableRow
                    key={s.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/alunos/${s.id}`)}
                  >
                    <TableCell className="pl-6 font-medium">{s.nome}</TableCell>
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
                      <RiskScore score={a.score} nivel={a.nivel} />
                    </TableCell>
                    <TableCell>
                      <RiskBadge risco={s.risco} />
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
