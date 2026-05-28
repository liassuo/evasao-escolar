import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

/** Select nativo estilizado (sem Radix) para manter o MVP leve. */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, children, id, ...props }, ref) => {
    const selectId = id ?? React.useId();
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-medium text-muted-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "h-11 w-full appearance-none rounded-lg border border-input bg-card px-3.5 pr-9 text-sm text-foreground transition-colors",
              "focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/25",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select };
