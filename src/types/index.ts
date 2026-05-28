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

/** Ponto mensal do histórico acadêmico do aluno. */
export interface MonthlyPoint {
  mes: string;
  frequencia: number;
  media: number;
}

/** Fator que contribuiu para o score de risco, com peso explicável. */
export interface RiskFactor {
  rotulo: string;
  /** Pontos somados ao score de risco (0–100). */
  peso: number;
}

/** Resultado da avaliação de risco "pela IA": score, nível e fatores. */
export interface RiskAssessment {
  /** Score de risco de evasão (0–100; quanto maior, pior). */
  score: number;
  nivel: RiskLevel;
  fatores: RiskFactor[];
}

export type EventKind = "falta" | "alerta" | "intervencao" | "registro";

/** Evento na linha do tempo de acompanhamento do aluno. */
export interface TimelineEvent {
  data: string;
  tipo: EventKind;
  titulo: string;
  descricao: string;
}
