import type {
  Student,
  Course,
  RiskLevel,
  MonthlyPoint,
  TimelineEvent,
} from "@/types";

export const COURSES: Course[] = [
  "Engenharia de Software",
  "Administração",
  "Direito",
  "Psicologia",
  "Sistemas de Informação",
];

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const students: Student[] = [
  { id: 1, nome: "João Silva", curso: "Engenharia de Software", frequencia: 68, media: 6.1, participacao: "Baixa", semestre: 4, risco: "medio" },
  { id: 2, nome: "Maria Oliveira", curso: "Administração", frequencia: 92, media: 8.7, participacao: "Alta", semestre: 3, risco: "baixo" },
  { id: 3, nome: "Pedro Santos", curso: "Direito", frequencia: 54, media: 4.8, participacao: "Baixa", semestre: 5, risco: "alto" },
  { id: 4, nome: "Ana Costa", curso: "Psicologia", frequencia: 88, media: 7.9, participacao: "Alta", semestre: 2, risco: "baixo" },
  { id: 5, nome: "Lucas Pereira", curso: "Sistemas de Informação", frequencia: 47, media: 4.2, participacao: "Baixa", semestre: 6, risco: "alto" },
  { id: 6, nome: "Beatriz Lima", curso: "Engenharia de Software", frequencia: 76, media: 6.8, participacao: "Média", semestre: 3, risco: "medio" },
  { id: 7, nome: "Gabriel Souza", curso: "Administração", frequencia: 95, media: 9.1, participacao: "Alta", semestre: 4, risco: "baixo" },
  { id: 8, nome: "Larissa Fernandes", curso: "Direito", frequencia: 61, media: 5.6, participacao: "Média", semestre: 7, risco: "medio" },
  { id: 9, nome: "Rafael Almeida", curso: "Psicologia", frequencia: 43, media: 3.9, participacao: "Baixa", semestre: 5, risco: "alto" },
  { id: 10, nome: "Juliana Ribeiro", curso: "Sistemas de Informação", frequencia: 84, media: 7.4, participacao: "Alta", semestre: 2, risco: "baixo" },
  { id: 11, nome: "Matheus Carvalho", curso: "Engenharia de Software", frequencia: 58, media: 5.1, participacao: "Baixa", semestre: 6, risco: "alto" },
  { id: 12, nome: "Camila Rodrigues", curso: "Administração", frequencia: 79, media: 7.0, participacao: "Média", semestre: 3, risco: "medio" },
  { id: 13, nome: "Felipe Martins", curso: "Direito", frequencia: 91, media: 8.3, participacao: "Alta", semestre: 4, risco: "baixo" },
  { id: 14, nome: "Isabela Gomes", curso: "Psicologia", frequencia: 66, media: 6.0, participacao: "Média", semestre: 5, risco: "medio" },
  { id: 15, nome: "Bruno Araújo", curso: "Sistemas de Informação", frequencia: 51, media: 4.5, participacao: "Baixa", semestre: 7, risco: "alto" },
  { id: 16, nome: "Letícia Barbosa", curso: "Engenharia de Software", frequencia: 89, media: 8.0, participacao: "Alta", semestre: 2, risco: "baixo" },
  { id: 17, nome: "Thiago Nunes", curso: "Administração", frequencia: 64, media: 5.8, participacao: "Baixa", semestre: 6, risco: "medio" },
  { id: 18, nome: "Mariana Dias", curso: "Direito", frequencia: 49, media: 4.0, participacao: "Baixa", semestre: 8, risco: "alto" },
  { id: 19, nome: "Vinícius Moreira", curso: "Psicologia", frequencia: 82, media: 7.6, participacao: "Alta", semestre: 3, risco: "baixo" },
  { id: 20, nome: "Sophia Cardoso", curso: "Sistemas de Informação", frequencia: 73, media: 6.5, participacao: "Média", semestre: 4, risco: "medio" },
];

/* ----------------------- Derived / aggregated data ----------------------- */

export const totalStudents = students.length;

export const countByRisk = (risco: RiskLevel) =>
  students.filter((s) => s.risco === risco).length;

export const highRiskCount = countByRisk("alto");
export const mediumRiskCount = countByRisk("medio");
export const lowRiskCount = countByRisk("baixo");

/** Taxa estimada de evasão (simulada): risco alto pesa mais que o médio */
export const estimatedDropoutRate = Math.round(
  ((highRiskCount + mediumRiskCount * 0.4) / totalStudents) * 100,
);

/** Evolução mensal de alunos em risco (mock) — usado no gráfico de linha */
export const riskEvolution = [
  { mes: "Jan", alto: 3, medio: 5 },
  { mes: "Fev", alto: 4, medio: 5 },
  { mes: "Mar", alto: 4, medio: 6 },
  { mes: "Abr", alto: 5, medio: 6 },
  { mes: "Mai", alto: 6, medio: 7 },
  { mes: "Jun", alto: highRiskCount, medio: mediumRiskCount },
];

/** Distribuição por nível de risco — gráfico de pizza */
export const riskDistribution = [
  { nome: "Baixo", valor: lowRiskCount, cor: "#16a34a" },
  { nome: "Médio", valor: mediumRiskCount, cor: "#f59e0b" },
  { nome: "Alto", valor: highRiskCount, cor: "#dc2626" },
];

/** Frequência média por curso — gráfico de barras */
export const avgFrequencyByCourse = COURSES.map((curso) => {
  const turma = students.filter((s) => s.curso === curso);
  const media =
    turma.reduce((acc, s) => acc + s.frequencia, 0) / (turma.length || 1);
  return { curso: curso.replace("Engenharia de ", "Eng. ").replace("Sistemas de ", "Sist. "), frequencia: Math.round(media) };
});

/** Evolução da evasão estimada ao longo dos semestres (mock) */
export const dropoutTrend = [
  { periodo: "2024.1", taxa: 14 },
  { periodo: "2024.2", taxa: 18 },
  { periodo: "2025.1", taxa: 16 },
  { periodo: "2025.2", taxa: 21 },
  { periodo: "2026.1", taxa: estimatedDropoutRate },
];

/* ----------------------- Agregações filtráveis (Relatórios) ----------------------- */

export interface ReportFilters {
  curso: Course | "todos";
  semestre: number | "todos";
}

const shortCourse = (curso: string) =>
  curso.replace("Engenharia de ", "Eng. ").replace("Sistemas de ", "Sist. ");

/** Aplica os filtros de curso/semestre ao conjunto de alunos. */
export function filterStudents(filters: ReportFilters): Student[] {
  return students.filter(
    (s) =>
      (filters.curso === "todos" || s.curso === filters.curso) &&
      (filters.semestre === "todos" || s.semestre === filters.semestre),
  );
}

/** Distribuição por nível de risco para um subconjunto de alunos. */
export function riskDistributionOf(subset: Student[]) {
  return [
    {
      nome: "Baixo",
      valor: subset.filter((s) => s.risco === "baixo").length,
      cor: "#15803d",
    },
    {
      nome: "Médio",
      valor: subset.filter((s) => s.risco === "medio").length,
      cor: "#d97706",
    },
    {
      nome: "Alto",
      valor: subset.filter((s) => s.risco === "alto").length,
      cor: "#dc2626",
    },
  ];
}

/** Frequência média por curso para um subconjunto de alunos. */
export function avgFrequencyByCourseOf(subset: Student[]) {
  return COURSES.map((curso) => {
    const turma = subset.filter((s) => s.curso === curso);
    const media = turma.length
      ? Math.round(turma.reduce((acc, s) => acc + s.frequencia, 0) / turma.length)
      : 0;
    return { curso: shortCourse(curso), frequencia: media };
  }).filter((c) => c.frequencia > 0);
}

/** Resumo numérico (cards) para um subconjunto de alunos. */
export function summaryOf(subset: Student[]) {
  const total = subset.length;
  const alto = subset.filter((s) => s.risco === "alto").length;
  const medio = subset.filter((s) => s.risco === "medio").length;
  const freqMedia = total
    ? Math.round(subset.reduce((a, s) => a + s.frequencia, 0) / total)
    : 0;
  const evasao = total ? Math.round(((alto + medio * 0.4) / total) * 100) : 0;
  return { total, alto, medio, freqMedia, evasao };
}

/* ---------------- Histórico e eventos por aluno (determinístico) ---------------- */

const HIST_MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/**
 * Gera o histórico mensal de frequência e média de um aluno.
 * Determinístico (sem Math.random): parte de uma linha de base e converge
 * para os valores atuais, oscilando conforme o id — alunos em risco pioram,
 * alunos saudáveis se mantêm estáveis.
 */
export function studentHistory(student: Student): MonthlyPoint[] {
  const trend =
    student.risco === "alto" ? -1 : student.risco === "medio" ? -0.5 : 0.15;
  return HIST_MESES.map((mes, i) => {
    const fromEnd = HIST_MESES.length - 1 - i; // 5..0
    const wobble = ((student.id + i) % 3) - 1; // -1, 0, 1 — oscilação reprodutível
    const freq = clamp(
      Math.round(student.frequencia + fromEnd * trend * 6 + wobble * 2),
      30,
      100,
    );
    const media = clamp(
      Number((student.media + fromEnd * trend * 0.5 + wobble * 0.15).toFixed(1)),
      2,
      10,
    );
    return { mes, frequencia: freq, media };
  });
}

/**
 * Gera a linha do tempo de acompanhamento de um aluno a partir dos seus
 * indicadores. Quanto maior o risco, mais eventos de falta/alerta/intervenção.
 */
export function studentTimeline(student: Student): TimelineEvent[] {
  const eventos: TimelineEvent[] = [];

  eventos.push({
    data: "02 Fev",
    tipo: "registro",
    titulo: "Início do período letivo",
    descricao: `Matrícula confirmada em ${student.curso}, ${student.semestre}º semestre.`,
  });

  if (student.frequencia < 75) {
    eventos.push({
      data: "18 Mar",
      tipo: "falta",
      titulo: "Sequência de faltas registrada",
      descricao:
        "Ausências consecutivas identificadas no controle de frequência das disciplinas.",
    });
  }

  if (student.media < 7) {
    eventos.push({
      data: "05 Abr",
      tipo: "alerta",
      titulo: "Queda de desempenho",
      descricao:
        "Média abaixo do esperado em avaliações parciais; disciplina sinalizada para acompanhamento.",
    });
  }

  if (student.risco === "alto") {
    eventos.push({
      data: "22 Abr",
      tipo: "intervencao",
      titulo: "Encaminhamento à coordenação",
      descricao:
        "Aluno classificado em risco elevado de evasão; contato de acompanhamento agendado.",
    });
  } else if (student.risco === "medio") {
    eventos.push({
      data: "28 Abr",
      tipo: "intervencao",
      titulo: "Convite para monitoria",
      descricao:
        "Aluno orientado a participar de monitoria nas disciplinas com menor rendimento.",
    });
  }

  if (student.participacao === "Baixa") {
    eventos.push({
      data: "12 Mai",
      tipo: "alerta",
      titulo: "Baixo engajamento",
      descricao:
        "Participação reduzida em atividades e fóruns; reforço de acompanhamento recomendado.",
    });
  }

  if (student.risco === "baixo") {
    eventos.push({
      data: "15 Mai",
      tipo: "registro",
      titulo: "Desempenho regular",
      descricao:
        "Indicadores dentro dos parâmetros esperados; acompanhamento de rotina mantido.",
    });
  }

  return eventos;
}
