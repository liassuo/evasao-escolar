import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Users, AlertTriangle, AlertCircle, TrendingDown } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { RiskBadge } from "@/components/RiskBadge";
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
  students,
  totalStudents,
  highRiskCount,
  mediumRiskCount,
  estimatedDropoutRate,
  riskEvolution,
} from "@/data/students";

const riskOrder = { alto: 0, medio: 1, baixo: 2 } as const;
const tableStudents = [...students]
  .sort((a, b) => riskOrder[a.risco] - riskOrder[b.risco])
  .slice(0, 8);

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total de alunos"
          value={totalStudents}
          icon={Users}
          accent="blue"
          hint="Monitorados na instituição"
        />
        <StatCard
          title="Risco alto"
          value={highRiskCount}
          icon={AlertTriangle}
          accent="red"
          hint="Necessitam ação imediata"
        />
        <StatCard
          title="Risco médio"
          value={mediumRiskCount}
          icon={AlertCircle}
          accent="amber"
          hint="Acompanhamento próximo"
        />
        <StatCard
          title="Taxa estimada de evasão"
          value={`${estimatedDropoutRate}%`}
          icon={TrendingDown}
          accent="red"
          hint="Projeção do semestre"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução de Alunos em Risco</CardTitle>
          <CardDescription>
            Histórico mensal de estudantes classificados em risco alto e médio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={riskEvolution}
                margin={{ top: 8, right: 16, left: -16, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 13,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 13 }} />
                <Line
                  type="monotone"
                  dataKey="alto"
                  name="Risco alto"
                  stroke="#dc2626"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="medio"
                  name="Risco médio"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alunos que requerem atenção</CardTitle>
          <CardDescription>
            Ordenados por nível de risco — clique para ver o perfil completo
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Nome</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Média</TableHead>
                <TableHead className="pr-6">Risco</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableStudents.map((s) => (
                <TableRow
                  key={s.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/alunos/${s.id}`)}
                >
                  <TableCell className="pl-6 font-medium">{s.nome}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {s.curso}
                  </TableCell>
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
                  <TableCell className="pr-6">
                    <RiskBadge risco={s.risco} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
