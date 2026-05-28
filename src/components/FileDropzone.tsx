import { useRef, useState } from "react";
import { UploadCloud, FileText, CheckCircle2, Loader2, X } from "lucide-react";

type Status = "idle" | "processing" | "done";

interface FileDropzoneProps {
  /** Extensões aceitas, ex: ".csv,.pdf" */
  accept?: string;
  /** Chamado quando o "processamento" simulado termina, com o nome do arquivo. */
  onImported?: (fileName: string) => void;
  hint?: string;
}

/**
 * Campo de upload simulado (sem backend). Aceita arrastar ou clicar, lê o nome
 * real do arquivo e simula um processamento com estados visuais — coerente com
 * o MVP acadêmico, sem enviar/processar o conteúdo de verdade.
 */
export function FileDropzone({
  accept = ".csv,.pdf,.xlsx",
  onImported,
  hint = "CSV, PDF ou XLSX até 10 MB",
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number>();
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string>("");
  const [dragging, setDragging] = useState(false);

  function handleFile(file: File) {
    setFileName(file.name);
    setStatus("processing");
    // Simula o processamento/extração (sem backend).
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setStatus("done");
      onImported?.(file.name);
    }, 1400);
  }

  function reset() {
    window.clearTimeout(timer.current);
    setStatus("idle");
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  }

  if (status !== "idle") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
          {status === "processing" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-risk-low" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate text-sm font-medium text-ink">
            <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            {fileName}
          </p>
          <p className="text-xs text-ink-soft">
            {status === "processing"
              ? "Lendo e extraindo dados…"
              : "Importado com sucesso"}
          </p>
        </div>
        {status === "done" && (
          <button
            onClick={reset}
            className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Remover arquivo"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files?.[0];
        if (f) handleFile(f);
      }}
      className={
        "flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors " +
        (dragging
          ? "border-primary bg-primary-light"
          : "border-input bg-muted/30 hover:border-primary/50 hover:bg-muted/60")
      }
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
        <UploadCloud className="h-5 w-5" />
      </span>
      <span className="text-sm font-medium text-ink">
        Arraste o arquivo ou clique para selecionar
      </span>
      <span className="text-xs text-ink-soft">{hint}</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
    </button>
  );
}
