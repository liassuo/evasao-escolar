import type { Student } from "@/types";

const riskLabel: Record<Student["risco"], string> = {
  baixo: "baixo",
  medio: "moderado",
  alto: "elevado",
};

/**
 * Gera um texto de "análise da IA" simulada a partir dos indicadores do aluno.
 * Não há IA real — apenas composição de frases com base nos dados mockados.
 */
export function generateAIAnalysis(student: Student): string {
  const fatores: string[] = [];

  if (student.frequencia < 60)
    fatores.push("queda acentuada na frequência às aulas");
  else if (student.frequencia < 75)
    fatores.push("redução gradual da frequência");

  if (student.media < 5)
    fatores.push("desempenho acadêmico abaixo do esperado");
  else if (student.media < 7)
    fatores.push("oscilação no rendimento acadêmico");

  if (student.participacao === "Baixa")
    fatores.push("baixo engajamento e participação nas atividades");

  const fatoresTexto =
    fatores.length > 0
      ? `Os principais fatores identificados são ${listToText(fatores)}.`
      : "Os indicadores acadêmicos permanecem dentro de parâmetros saudáveis.";

  return `Com base nos indicadores acadêmicos observados, o estudante apresenta risco ${riskLabel[student.risco]} de evasão. ${fatoresTexto}`;
}

export function generateRecommendations(student: Student): string[] {
  const recs: string[] = [];

  if (student.risco !== "baixo") {
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
