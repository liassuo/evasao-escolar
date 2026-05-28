import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TrendingDown,
  ArrowRight,
  Users,
  BarChart3,
  AlertTriangle,
  CalendarX,
  UserCheck,
  Sparkle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RiskBadge } from "@/components/RiskBadge";
import { Dashboard } from "@/pages/Dashboard";
import {
  aiHighlights,
  recentActivity,
  todaySummary,
} from "@/data/students";

function greeting(hour: number) {
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

const activityIcon = {
  falta: CalendarX,
  alerta: AlertTriangle,
  intervencao: UserCheck,
  registro: Sparkle,
} as const;

const activityTone = {
  falta: "text-risk-high bg-risk-high-bg",
  alerta: "text-risk-medium bg-risk-medium-bg",
  intervencao: "text-primary bg-primary-light",
  registro: "text-muted-foreground bg-muted",
} as const;

export function Home() {
  const navigate = useNavigate();
  const saudacao = useMemo(() => greeting(new Date().getHours()), []);
  const highlights = useMemo(() => aiHighlights(4), []);
  const activity = useMemo(() => recentActivity(6), []);

  return (
    <div className="space-y-8">
      {/* Saudação + resumo do dia */}
      <section>
        <p className="eyebrow">Página inicial</p>
        <h1 className="page-title mt-1.5 text-[28px]">
          {saudacao}, equipe de permanência
        </h1>
        <p className="page-subtitle max-w-2xl">
          Há{" "}
          <strong className="font-semibold text-risk-high">
            {todaySummary.alto} alunos em risco alto
          </strong>{" "}
          e {todaySummary.medio} em risco médio que requerem acompanhamento. A
          taxa estimada de evasão do semestre é de {todaySummary.evasao}%.
        </p>
      </section>

      {/* Atalhos rápidos */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <QuickAction
          to="/alunos"
          icon={Users}
          title="Acompanhar alunos"
          desc="Lista completa com filtros e score de risco"
        />
        <QuickAction
          to="/dashboard"
          icon={BarChart3}
          title="Ver dashboard"
          desc="Indicadores e evolução de risco"
        />
        <QuickAction
          to="/relatorios"
          icon={TrendingDown}
          title="Gerar relatórios"
          desc="Distribuição e tendências de evasão"
        />
      </section>

      {/* Destaques da IA + Atividade recente */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Destaques da IA */}
        <Card className="lg:col-span-3">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-light text-primary">
                <Sparkle className="h-4 w-4" />
              </span>
              <div>
                <h2 className="section-title">Destaques da IA</h2>
                <p className="text-xs text-ink-soft">
                  Alunos com maior queda de frequência no período
                </p>
              </div>
            </div>

            <ul className="divide-y divide-border">
              {highlights.map(({ student, delta }) => (
                <li key={student.id}>
                  <button
                    onClick={() => navigate(`/alunos/${student.id}`)}
                    className="flex w-full items-center gap-3 py-3 text-left transition-colors hover:bg-muted/60"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {student.nome
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">
                        {student.nome}
                      </span>
                      <span className="block truncate text-xs text-ink-soft">
                        {student.curso}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-risk-high">
                      <TrendingDown className="h-4 w-4" />
                      {delta}%
                    </span>
                    <RiskBadge risco={student.risco} />
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Atividade recente */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="section-title mb-4">Atividade recente</h2>
            <ol className="space-y-4">
              {activity.map((ev, i) => {
                const Icon = activityIcon[ev.tipo];
                return (
                  <li key={i} className="flex gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activityTone[ev.tipo]}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/alunos/${ev.studentId}`}
                        className="text-sm font-medium text-ink hover:text-primary"
                      >
                        {ev.studentName}
                      </Link>
                      <p className="text-xs leading-snug text-ink-soft">
                        {ev.titulo}
                      </p>
                      <span className="text-[11px] text-muted-foreground">
                        {ev.data}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* Dashboard embutido */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="section-title">Visão geral</h2>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Abrir dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Dashboard />
      </section>
    </div>
  );
}

function QuickAction({
  to,
  icon: Icon,
  title,
  desc,
}: {
  to: string;
  icon: typeof Users;
  title: string;
  desc: string;
}) {
  return (
    <Link to={to} className="group">
      <Card className="h-full transition-shadow hover:card-shadow-lg">
        <CardContent className="flex items-center gap-4 p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Icon className="h-[22px] w-[22px]" strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <p className="font-display text-[15px] font-semibold text-ink">
              {title}
            </p>
            <p className="truncate text-xs text-ink-soft">{desc}</p>
          </div>
          <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </CardContent>
      </Card>
    </Link>
  );
}
