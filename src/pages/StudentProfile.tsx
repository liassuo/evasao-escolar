import { useParams, useNavigate, Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  ArrowLeft,
  CalendarCheck,
  GraduationCap,
  Activity,
  FileSearch,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";
import { RiskBadge } from "@/components/RiskBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { students } from "@/data/students";
import { generateAIAnalysis, generateRecommendations } from "@/lib/ai";

export function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find((s) => s.id === Number(id));

  if (!student) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            Aluno não encontrado.
          </p>
          <Link
            to="/alunos"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Voltar para a lista de alunos
          </Link>
        </CardContent>
      </Card>
    );
  }

  const analysis = generateAIAnalysis(student);
  const recommendations = generateRecommendations(student);
  const participacaoScore =
    student.participacao === "Alta" ? 85 : student.participacao === "Média" ? 55 : 28;

  const performanceData = [
    { nome: "Frequência", valor: student.frequencia, cor: "#1e40af" },
    { nome: "Média (x10)", valor: Math.round(student.media * 10), cor: "#2563EB" },
    { nome: "Participação", valor: participacaoScore, cor: "#60a5fa" },
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>

      {/* Cabeçalho do aluno */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              {student.nome
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {student.nome}
              </h2>
              <p className="text-sm text-muted-foreground">
                {student.curso} · {student.semestre}º semestre
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Risco de evasão:
            </span>
            <RiskBadge risco={student.risco} />
          </div>
        </CardContent>
      </Card>

      {/* Cards de desempenho */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          icon={CalendarCheck}
          label="Frequência"
          value={`${student.frequencia}%`}
          progress={student.frequencia}
          tone={student.frequencia < 60 ? "high" : student.frequencia < 75 ? "medium" : "low"}
        />
        <MetricCard
          icon={GraduationCap}
          label="Média Geral"
          value={student.media.toFixed(1)}
          progress={student.media * 10}
          tone={student.media < 5 ? "high" : student.media < 7 ? "medium" : "low"}
        />
        <MetricCard
          icon={Activity}
          label="Participação"
          value={student.participacao}
          progress={participacaoScore}
          tone={
            student.participacao === "Baixa"
              ? "high"
              : student.participacao === "Média"
                ? "medium"
                : "low"
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Gráfico de desempenho */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Indicadores de Desempenho</CardTitle>
            <CardDescription>Escala normalizada (0–100)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                  <XAxis
                    dataKey="nome"
                    tick={{ fontSize: 11, fill: "#64748b" }}
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
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      fontSize: 13,
                    }}
                  />
                  <Bar dataKey="valor" radius={[6, 6, 0, 0]} maxBarSize={56}>
                    {performanceData.map((d) => (
                      <Cell key={d.nome} fill={d.cor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Análise da IA + recomendações */}
        <div className="space-y-6 lg:col-span-3">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-primary" />
                Análise da IA
              </CardTitle>
              <CardDescription>
                Interpretação automática dos indicadores acadêmicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/90">
                {analysis}
              </p>
              <p className="mt-3 text-[11px] italic text-muted-foreground">
                * Conteúdo gerado por simulação de IA para fins de demonstração
                acadêmica.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                Recomendações
              </CardTitle>
              <CardDescription>
                Ações sugeridas pela plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {recommendations.map((rec) => (
                  <li key={rec} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-risk-low" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  progress,
  tone,
}: {
  icon: typeof CalendarCheck;
  label: string;
  value: string;
  progress: number;
  tone: "low" | "medium" | "high";
}) {
  const bar =
    tone === "high"
      ? "bg-risk-high"
      : tone === "medium"
        ? "bg-risk-medium"
        : "bg-risk-low";
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <Progress value={progress} indicatorClassName={bar} />
      </CardContent>
    </Card>
  );
}
