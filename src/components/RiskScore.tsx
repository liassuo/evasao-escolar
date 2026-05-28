import type { RiskLevel } from "@/types";

const barColor: Record<RiskLevel, string> = {
  baixo: "bg-risk-low",
  medio: "bg-risk-medium",
  alto: "bg-risk-high",
};

const textColor: Record<RiskLevel, string> = {
  baixo: "text-risk-low",
  medio: "text-risk-medium",
  alto: "text-risk-high",
};

/**
 * Score de risco de evasão (0–100) com barra proporcional, colorida pelo nível.
 * Representa a saída quantitativa do motor de risco da IA.
 */
export function RiskScore({
  score,
  nivel,
  showValue = true,
}: {
  score: number;
  nivel: RiskLevel;
  showValue?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${barColor[nivel]}`}
          style={{ width: `${score}%` }}
        />
      </div>
      {showValue && (
        <span className={`tabular text-xs font-semibold ${textColor[nivel]}`}>
          {score}
        </span>
      )}
    </div>
  );
}
