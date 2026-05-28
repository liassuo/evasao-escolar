import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { courseSummaries, courseSlug } from "@/data/students";

export function Courses() {
  const cursos = courseSummaries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Cursos</h1>
        <p className="page-subtitle">
          Panorama de risco e frequência por turma
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cursos.map(({ curso, total, alto, freqMedia }) => (
          <Link key={curso} to={`/cursos/${courseSlug(curso)}`} className="group">
            <Card className="h-full transition-shadow hover:card-shadow-lg">
              <CardContent className="flex h-full flex-col p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
                    <GraduationCap className="h-[22px] w-[22px]" strokeWidth={1.9} />
                  </span>
                  <h2 className="font-display text-[15px] font-semibold leading-tight text-ink">
                    {curso}
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-border pt-4">
                  <Metric icon={Users} value={total} label="Alunos" />
                  <Metric
                    icon={AlertTriangle}
                    value={alto}
                    label="Risco alto"
                    tone={alto > 0 ? "text-risk-high" : "text-ink"}
                  />
                  <Metric
                    value={`${freqMedia}%`}
                    label="Freq. média"
                    tone={
                      freqMedia < 60
                        ? "text-risk-high"
                        : freqMedia < 75
                          ? "text-risk-medium"
                          : "text-risk-low"
                    }
                  />
                </div>

                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Ver turma
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  value,
  label,
  tone = "text-ink",
}: {
  icon?: typeof Users;
  value: string | number;
  label: string;
  tone?: string;
}) {
  return (
    <div>
      <p className={`tabular font-display text-xl font-semibold ${tone}`}>
        {value}
      </p>
      <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </p>
    </div>
  );
}
