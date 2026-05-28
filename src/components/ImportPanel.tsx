import { useState } from "react";
import { FileText, CalendarCheck, Sparkle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileDropzone } from "@/components/FileDropzone";
import {
  historicoExemplo,
  frequenciaImportada,
} from "@/data/students";

const situacaoTone: Record<string, string> = {
  Aprovado: "text-risk-low",
  Reprovado: "text-risk-high",
  Cursando: "text-ink-soft",
};

/**
 * Painel de importação (demonstração) para a página de Alunos:
 * - Histórico escolar: ao importar, extrai e exibe nome, curso, período e notas.
 * - Lista de frequência: ao importar, exibe a frequência consolidada dos alunos.
 * Nenhum arquivo é processado de fato (MVP sem backend).
 */
export function ImportPanel() {
  const [histImportado, setHistImportado] = useState(false);
  const [freqImportada, setFreqImportada] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Importar histórico escolar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Importar histórico escolar
          </CardTitle>
          <CardDescription>
            Envie o histórico (PDF ou CSV) — a IA extrai aluno, curso, período e
            notas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileDropzone
            accept=".pdf,.csv"
            hint="Histórico em PDF ou CSV"
            onImported={() => setHistImportado(true)}
          />

          {histImportado && (
            <div className="animate-fade-in space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                <Sparkle className="h-3.5 w-3.5" />
                Dados extraídos pela IA
              </div>

              {/* Identificação extraída */}
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg border border-border bg-muted/40 p-3 text-sm">
                <Field label="Aluno" value={historicoExemplo.aluno} />
                <Field label="Matrícula" value={historicoExemplo.matricula} />
                <Field label="Curso" value={historicoExemplo.curso} />
                <Field label="Período" value={historicoExemplo.periodo} />
              </dl>

              {/* Notas extraídas */}
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/60 text-left text-xs text-muted-foreground">
                      <th className="px-3 py-2 font-medium">Disciplina</th>
                      <th className="px-3 py-2 text-center font-medium">Nota</th>
                      <th className="px-3 py-2 text-center font-medium">Freq.</th>
                      <th className="px-3 py-2 font-medium">Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicoExemplo.disciplinas.map((d) => (
                      <tr key={d.disciplina} className="border-b border-border last:border-0">
                        <td className="px-3 py-2 text-ink">{d.disciplina}</td>
                        <td
                          className={
                            "px-3 py-2 text-center font-medium " +
                            (d.nota < 5 ? "text-risk-high" : "text-ink")
                          }
                        >
                          {d.nota.toFixed(1)}
                        </td>
                        <td className="px-3 py-2 text-center text-ink-soft">
                          {d.frequencia}%
                        </td>
                        <td className={"px-3 py-2 font-medium " + situacaoTone[d.situacao]}>
                          {d.situacao}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] italic text-muted-foreground">
                * Extração simulada para fins de demonstração acadêmica.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Importar lista de frequência */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-primary" />
            Importar lista de frequência
          </CardTitle>
          <CardDescription>
            Envie a lista de presença (CSV ou XLSX) para consolidar a frequência
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileDropzone
            accept=".csv,.xlsx"
            hint="Lista de frequência em CSV ou XLSX"
            onImported={() => setFreqImportada(true)}
          />

          {freqImportada && (
            <div className="animate-fade-in space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                <Sparkle className="h-3.5 w-3.5" />
                {frequenciaImportada.length} alunos processados
              </div>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/60 text-left text-xs text-muted-foreground">
                      <th className="px-3 py-2 font-medium">Aluno</th>
                      <th className="px-3 py-2 text-center font-medium">Presenças</th>
                      <th className="px-3 py-2 text-center font-medium">Frequência</th>
                    </tr>
                  </thead>
                  <tbody>
                    {frequenciaImportada.map((f) => (
                      <tr key={f.aluno} className="border-b border-border last:border-0">
                        <td className="px-3 py-2">
                          <span className="block text-ink">{f.aluno}</span>
                          <span className="block text-[11px] text-muted-foreground">
                            {f.curso}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center text-ink-soft">
                          {f.aulasPresentes}/{f.aulasPrevistas}
                        </td>
                        <td
                          className={
                            "px-3 py-2 text-center font-medium " +
                            (f.frequencia < 60
                              ? "text-risk-high"
                              : f.frequencia < 75
                                ? "text-risk-medium"
                                : "text-risk-low")
                          }
                        >
                          {f.frequencia}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] italic text-muted-foreground">
                * Consolidação simulada para fins de demonstração acadêmica.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}
