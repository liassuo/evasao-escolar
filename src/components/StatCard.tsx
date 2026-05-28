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
  blue: { ring: "bg-primary-light text-primary", bar: "bg-primary" },
  red: { ring: "bg-risk-high-bg text-risk-high", bar: "bg-risk-high" },
  amber: { ring: "bg-risk-medium-bg text-risk-medium", bar: "bg-risk-medium" },
  green: { ring: "bg-risk-low-bg text-risk-low", bar: "bg-risk-low" },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  accent = "blue",
  hint,
}: StatCardProps) {
  const a = accentMap[accent];
  return (
    <Card className="relative overflow-hidden transition-shadow hover:card-shadow-lg">
      <span className={cn("absolute inset-y-0 left-0 w-1", a.bar)} aria-hidden />
      <CardContent className="flex items-center gap-4 p-5 pl-6">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
            a.ring,
          )}
        >
          <Icon className="h-[22px] w-[22px]" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <p className="tabular font-display text-[26px] font-bold leading-tight tracking-tight">
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
