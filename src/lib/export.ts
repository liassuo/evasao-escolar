/**
 * Utilitários de exportação sem dependências externas.
 * - CSV: gerado em memória e baixado via Blob.
 * - PDF: usa a janela de impressão do navegador (Salvar como PDF).
 */

/** Escapa um valor para CSV (aspas e separadores). */
function csvCell(value: string | number): string {
  const s = String(value ?? "");
  if (/[";\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

/**
 * Gera e baixa um arquivo CSV. Usa ";" como separador (padrão pt-BR/Excel)
 * e prefixa BOM para acentuação correta ao abrir no Excel.
 */
export function exportCSV(
  filename: string,
  headers: string[],
  rows: (string | number)[][],
): void {
  const linhas = [
    headers.map(csvCell).join(";"),
    ...rows.map((r) => r.map(csvCell).join(";")),
  ];
  const conteudo = "﻿" + linhas.join("\r\n"); // BOM + CRLF
  const blob = new Blob([conteudo], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Abre a janela de impressão do navegador para o relatório em PDF.
 * O elemento com a classe `.print-area` é estilizado para impressão; o
 * restante da interface é ocultado via @media print (ver index.css).
 */
export function printReport(): void {
  window.print();
}
