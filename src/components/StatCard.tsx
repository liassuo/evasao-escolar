import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  accent?: "blue" | "red" | "amber" | "green";
  hint?: string;
}

const accentMap = {
  blue: "bg-primary-light text-primary",
  red: "bg-risk-high-bg text-risk-high",
  amber: "bg-risk-medium-bg text-risk-medium",
  green: "bg-risk-low-bg text-risk-low",
};

export function StatCard({
  title,
  value,
  icon: Icon,
  accent = "blue",
  hint,
}: StatCardProps) {
  return (
    <Card className="transition-shadow hover:card-shadow-lg">
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
            accentMap[accent],
          )}
        >
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <p className="tabular font-display text-[27px] font-semibold leading-tight tracking-tight">
            {value}
          </p>
          {hint && (
            <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
