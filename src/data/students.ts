import type { Student, Course, RiskLevel } from "@/types";

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
