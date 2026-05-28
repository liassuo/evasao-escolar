import {
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Clock,
  UserCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { predictDropout, interventionPlan } from "@/lib/ai";
import type { Student, InterventionPriority } from "@/types";

const priorityStyle: Record<
  InterventionPriority,
  { label: string; cls: string }
> = {
  alta: { label: "Alta", cls: "bg-risk-high-bg text-risk-high" },
  media: { label: "Média", cls: "bg-risk-medium-bg text-risk-medium" },
  baixa: { label: "Baixa", cls: "bg-muted text-muted-foreground" },
};

export function InterventionPlan({ student }: { student: Student }) {
  const prediction = predictDropout(student);
  const steps = interventionPlan(student);

  const TrendIcon =
    prediction.tendencia === "piora"
      ? TrendingDown
      : prediction.tendencia === "melhora"
        ? TrendingUp
        : Minus;
  const trendColor =
    prediction.tendencia === "piora"
      ? "text-risk-high"
      : prediction.tendencia === "melhora"
        ? "text-risk-low"
        : "text-muted-foreground";

  // Cor do anel de probabilidade
  const probColor =
    prediction.probabilidade >= 55
      ? "text-risk-high"
      : prediction.probabilidade >= 28
        ? "text-risk-medium"
        : "text-risk-low";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      {/* Predição de evasão */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Predição de Evasão
          </CardTitle>
          <CardDescription>
            Estimativa da IA para os próximos {prediction.janelaDias} dias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-5">
            <ProbabilityRing value={prediction.probabilidade} color={probColor} />
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-sm">
                <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                <span className={`font-medium ${trendColor}`}>
                  {prediction.tendencia === "piora"
                    ? "Em piora"
                    : prediction.tendencia === "melhora"
                      ? "Em melhora"
                      : "Estável"}
                </span>
              </div>
              <div className="text-xs text-ink-soft">
                Confiança do modelo:{" "}
                <span className="font-medium text-ink">
                  {prediction.confianca}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground/90">
            {prediction.explicacao}
          </p>
          <p className="mt-3 text-[11px] italic text-muted-foreground">
            * Predição simulada para fins de demonstração acadêmica.
          </p>
        </CardContent>
      </Card>

      {/* Plano de intervenção */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Plano de Intervenção sugerido pela IA
          </CardTitle>
          <CardDescription>
            Ações priorizadas a partir do perfil de risco do estudante
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {steps.map((step, i) => {
              const p = priorityStyle[step.prioridade];
              return (
                <li
                  key={i}
                  className="rounded-lg border border-border bg-muted/30 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {step.titulo}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                          {step.descricao}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${p.cls}`}
                    >
                      {p.label}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 pl-9 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {step.prazo}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <UserCircle className="h-3.5 w-3.5" />
                      {step.responsavel}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

function ProbabilityRing({ value, color }: { value: number; color: string }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          className="text-muted"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className={color}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`tabular font-display text-xl font-semibold ${color}`}>
          {value}%
        </span>
        <span className="text-[10px] text-muted-foreground">evasão</span>
      </div>
    </div>
  );
}
