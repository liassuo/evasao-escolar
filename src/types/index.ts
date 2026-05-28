export type RiskLevel = "baixo" | "medio" | "alto";

export type Course =
  | "Engenharia de Software"
  | "Administração"
  | "Direito"
  | "Psicologia"
  | "Sistemas de Informação";

export interface Student {
  id: number;
  nome: string;
  curso: Course;
  /** Frequência em porcentagem (0–100) */
  frequencia: number;
  /** Média geral (0–10) */
  media: number;
  /** Nível de participação qualitativo */
  participacao: "Alta" | "Média" | "Baixa";
  /** Semestre atual */
  semestre: number;
  risco: RiskLevel;
}
