import { FileSpreadsheet, FileDown } from "lucide-react";
import { exportCSV, printReport } from "@/lib/export";

interface ExportButtonsProps {
  /** Nome base do arquivo CSV (sem extensão). */
  filename: string;
  headers: string[];
  rows: (string | number)[][];
  /** Oculta o botão de PDF (ex: telas onde só CSV faz sentido). */
  pdf?: boolean;
}

/** Par de botões de exportação (CSV + PDF) reutilizável. */
export function ExportButtons({
  filename,
  headers,
  rows,
  pdf = true,
}: ExportButtonsProps) {
  return (
    <div className="flex items-center gap-2 print:hidden">
      <button
        onClick={() => exportCSV(filename, headers, rows)}
        className="inline-flex items-center gap-2 rounded-lg border border-input bg-card px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-primary/50 hover:bg-muted"
      >
        <FileSpreadsheet className="h-4 w-4 text-risk-low" />
        CSV
      </button>
      {pdf && (
        <button
          onClick={() => printReport()}
          className="inline-flex items-center gap-2 rounded-lg border border-input bg-card px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-primary/50 hover:bg-muted"
        >
          <FileDown className="h-4 w-4 text-risk-high" />
          PDF
        </button>
      )}
    </div>
  );
}
