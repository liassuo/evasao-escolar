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
  blue: { ring: "bg-blue-50 text-primary", bar: "bg-primary" },
  red: { ring: "bg-red-50 text-risk-high", bar: "bg-risk-high" },
  amber: { ring: "bg-amber-50 text-risk-medium", bar: "bg-risk-medium" },
  green: { ring: "bg-green-50 text-risk-low", bar: "bg-risk-low" },
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
    <Card className="overflow-hidden transition-shadow hover:card-shadow-lg">
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            a.ring,
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {hint && (
            <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
