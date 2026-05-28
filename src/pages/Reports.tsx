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
  riskDistribution,
  avgFrequencyByCourse,
  dropoutTrend,
} from "@/data/students";

export function Reports() {
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
            <Select label="Curso" defaultValue="todos">
              <option value="todos">Todos os cursos</option>
              {COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Select label="Semestre" defaultValue="todos">
              <option value="todos">Todos os semestres</option>
              {SEMESTERS.map((s) => (
                <option key={s} value={s}>
                  {s}º semestre
                </option>
              ))}
            </Select>
            <Select label="Período" defaultValue="2026.1">
              <option value="2026.1">2026.1</option>
              <option value="2025.2">2025.2</option>
              <option value="2025.1">2025.1</option>
            </Select>
          </div>
          <p className="mt-2 text-[11px] italic text-muted-foreground">
            * Filtros ilustrativos para fins de demonstração.
          </p>
        </CardContent>
      </Card>

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
                    data={riskDistribution}
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
                    {riskDistribution.map((d) => (
                      <Cell key={d.nome} fill={d.cor} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
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
                  data={avgFrequencyByCourse}
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
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      fontSize: 13,
                    }}
                  />
                  <Bar
                    dataKey="frequencia"
                    name="Frequência (%)"
                    fill="#2563EB"
                    radius={[6, 6, 0, 0]}
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
            Taxa estimada de evasão por período letivo
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
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                <XAxis
                  dataKey="periodo"
                  tick={{ fontSize: 12, fill: "#64748b" }}
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
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 13,
                  }}
                  formatter={(v) => [`${v}%`, "Taxa de evasão"]}
                />
                <Area
                  type="monotone"
                  dataKey="taxa"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fill="url(#dropoutFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
