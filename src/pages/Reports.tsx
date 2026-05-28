import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Users, AlertTriangle, CalendarCheck, TrendingDown } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import {
  COURSES,
  SEMESTERS,
  dropoutTrend,
  filterStudents,
  riskDistributionOf,
  avgFrequencyByCourseOf,
  summaryOf,
  type ReportFilters,
} from "@/data/students";
import type { Course } from "@/types";

const PERIODOS = ["2026.1", "2025.2", "2025.1"];

export function Reports() {
  const [curso, setCurso] = useState<Course | "todos">("todos");
  const [semestre, setSemestre] = useState<number | "todos">("todos");
  const [periodo, setPeriodo] = useState("2026.1");

  const filters: ReportFilters = { curso, semestre };
  const subset = useMemo(() => filterStudents(filters), [curso, semestre]);
  const distribuicao = useMemo(() => riskDistributionOf(subset), [subset]);
  const frequenciaCurso = useMemo(() => avgFrequencyByCourseOf(subset), [subset]);
  const resumo = useMemo(() => summaryOf(subset), [subset]);

  const filtrosAtivos =
    curso !== "todos" || semestre !== "todos" || periodo !== "2026.1";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios e Indicadores</CardTitle>
          <CardDescription>
            Visão consolidada dos indicadores de evasão da instituição
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Select
              label="Curso"
              value={curso}
              onChange={(e) => setCurso(e.target.value as Course | "todos")}
            >
              <option value="todos">Todos os cursos</option>
              {COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Select
              label="Semestre"
              value={String(semestre)}
              onChange={(e) =>
                setSemestre(
                  e.target.value === "todos" ? "todos" : Number(e.target.value),
                )
              }
            >
              <option value="todos">Todos os semestres</option>
              {SEMESTERS.map((s) => (
                <option key={s} value={s}>
                  {s}º semestre
                </option>
              ))}
            </Select>
            <Select
              label="Período"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
            >
              {PERIODOS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {filtrosAtivos ? (
              <>
                Exibindo <strong className="text-foreground">{resumo.total}</strong>{" "}
                aluno(s) com os filtros selecionados.
              </>
            ) : (
              <>Exibindo todos os {resumo.total} alunos monitorados.</>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Resumo numérico do recorte selecionado */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard title="Alunos no recorte" value={resumo.total} icon={Users} accent="blue" />
        <StatCard title="Risco alto" value={resumo.alto} icon={AlertTriangle} accent="red" />
        <StatCard title="Frequência média" value={`${resumo.freqMedia}%`} icon={CalendarCheck} accent="green" />
        <StatCard title="Evasão estimada" value={`${resumo.evasao}%`} icon={TrendingDown} accent="amber" />
      </div>

      {subset.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-sm text-muted-foreground">
            Nenhum aluno corresponde aos filtros selecionados. Ajuste o curso ou o
            semestre para visualizar os indicadores.
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Distribuição por nível de risco */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Nível de Risco</CardTitle>
                <CardDescription>Proporção atual de alunos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distribuicao}
                        dataKey="valor"
                        nameKey="nome"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
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

            {/* Frequência média por curso */}
            <Card>
              <CardHeader>
                <CardTitle>Frequência Média por Curso</CardTitle>
                <CardDescription>Percentual médio de presença</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={frequenciaCurso}
                      margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                      <XAxis
                        dataKey="curso"
                        tick={{ fontSize: 10, fill: "#64748b" }}
                        axisLine={false}
                        tickLine={false}
                        interval={0}
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
                      />
                      <Bar
                        dataKey="frequencia"
                        name="Frequência (%)"
                        fill="#0e7490"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={48}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Evolução da evasão estimada */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução da Evasão Estimada</CardTitle>
              <CardDescription>
                Taxa estimada de evasão por período letivo — período selecionado:{" "}
                <strong className="text-foreground">{periodo}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dropoutTrend}
                    margin={{ top: 8, right: 16, left: -16, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="dropoutFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0e7490" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#0e7490" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                    <XAxis
                      dataKey="periodo"
                      tick={(props) => {
                        const { x, y, payload } = props;
                        const sel = payload.value === periodo;
                        return (
                          <text
                            x={x}
                            y={y + 14}
                            textAnchor="middle"
                            fontSize={12}
                            fontWeight={sel ? 700 : 400}
                            fill={sel ? "#0e7490" : "#64748b"}
                          >
                            {payload.value}
                          </text>
                        );
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                      unit="%"
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 10,
                        border: "1px solid #e2e8f0",
                        fontSize: 13,
                      }}
                      formatter={(v) => [`${v}%`, "Taxa de evasão"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="taxa"
                      stroke="#0e7490"
                      strokeWidth={2.5}
                      fill="url(#dropoutFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
