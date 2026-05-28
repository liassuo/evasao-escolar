import type { Student, RiskLevel, RiskAssessment, RiskFactor } from "@/types";

/** Indicadores brutos usados pelo motor de risco (subconjunto de Student). */
export type RiskInput = Pick<
  Student,
  "frequencia" | "media" | "participacao" | "semestre"
>;

const riskLabel: Record<RiskLevel, string> = {
  baixo: "baixo",
  medio: "moderado",
  alto: "elevado",
};

/**
 * Motor de risco "da IA" (simulado, determinístico e explicável).
 *
 * Não há IA real: a função pondera os indicadores acadêmicos do aluno e produz
 * um score de evasão (0–100), o nível resultante e a lista de fatores que mais
 * pesaram — exatamente o que uma IA de apoio à decisão entregaria como saída
 * interpretável. A mesma entrada sempre gera a mesma saída.
 */
export function assessRisk(input: RiskInput): RiskAssessment {
  const fatores: RiskFactor[] = [];

  // Frequência (0–100): peso alto — principal preditor de evasão.
  if (input.frequencia < 60) {
    fatores.push({ rotulo: "Frequência crítica (< 60%)", peso: 38 });
  } else if (input.frequencia < 75) {
    fatores.push({ rotulo: "Frequência abaixo do ideal", peso: 20 });
  } else if (input.frequencia < 85) {
    fatores.push({ rotulo: "Frequência levemente reduzida", peso: 8 });
  }

  // Média geral (0–10).
  if (input.media < 5) {
    fatores.push({ rotulo: "Desempenho insuficiente (média < 5,0)", peso: 30 });
  } else if (input.media < 7) {
    fatores.push({ rotulo: "Rendimento acadêmico oscilante", peso: 15 });
  }

  // Participação qualitativa.
  if (input.participacao === "Baixa") {
    fatores.push({ rotulo: "Baixo engajamento e participação", peso: 18 });
  } else if (input.participacao === "Média") {
    fatores.push({ rotulo: "Participação intermediária", peso: 6 });
  }

  // Semestres avançados concentram mais desistências.
  if (input.semestre >= 7) {
    fatores.push({ rotulo: "Semestre avançado (maior atrito histórico)", peso: 6 });
  }

  const score = Math.min(
    100,
    fatores.reduce((acc, f) => acc + f.peso, 0),
  );

  const nivel: RiskLevel = score >= 55 ? "alto" : score >= 28 ? "medio" : "baixo";

  // Ordena por peso (fator mais relevante primeiro).
  fatores.sort((a, b) => b.peso - a.peso);

  return { score, nivel, fatores };
}

/** Conveniência: nível de risco derivado dos indicadores. */
export function riskLevelOf(input: RiskInput): RiskLevel {
  return assessRisk(input).nivel;
}

/**
 * Gera o texto de "análise da IA" a partir da avaliação de risco.
 * Compõe frases com base no score e nos fatores identificados.
 */
export function generateAIAnalysis(student: Student): string {
  const { nivel, score, fatores } = assessRisk(student);

  const fatoresTexto =
    fatores.length > 0
      ? `Os principais fatores identificados são ${listToText(
          fatores.slice(0, 3).map((f) => f.rotulo.toLowerCase()),
        )}.`
      : "Os indicadores acadêmicos permanecem dentro de parâmetros saudáveis.";

  return `Com base nos indicadores acadêmicos observados, o estudante apresenta risco ${riskLabel[nivel]} de evasão (score ${score}/100). ${fatoresTexto}`;
}

export function generateRecommendations(student: Student): string[] {
  const { nivel } = assessRisk(student);
  const recs: string[] = [];

  if (nivel !== "baixo") {
    recs.push("Agendar conversa com a coordenação");
  }
  if (student.media < 7) {
    recs.push("Oferecer monitoria nas disciplinas críticas");
    recs.push("Verificar dificuldades acadêmicas específicas");
  }
  if (student.frequencia < 75) {
    recs.push("Acompanhar a frequência nas próximas semanas");
  }
  if (student.participacao === "Baixa") {
    recs.push("Estimular a participação em projetos e grupos de estudo");
  }

  if (recs.length === 0) {
    recs.push("Manter o acompanhamento periódico de rotina");
    recs.push("Reconhecer e reforçar o bom desempenho do estudante");
  }

  return recs;
}

function listToText(items: string[]): string {
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}
