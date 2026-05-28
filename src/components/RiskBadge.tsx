import { Badge } from "@/components/ui/badge";
import type { RiskLevel } from "@/types";

const map: Record<RiskLevel, { label: string; variant: "low" | "medium" | "high" }> = {
  baixo: { label: "Baixo", variant: "low" },
  medio: { label: "Médio", variant: "medium" },
  alto: { label: "Alto", variant: "high" },
};

export function RiskBadge({ risco }: { risco: RiskLevel }) {
  const { label, variant } = map[risco];
  return (
    <Badge variant={variant} className="gap-1.5">
      <span
        className={
          "h-1.5 w-1.5 rounded-full " +
          (variant === "low"
            ? "bg-green-600"
            : variant === "medium"
              ? "bg-amber-500"
              : "bg-red-600")
        }
      />
      {label}
    </Badge>
  );
}
