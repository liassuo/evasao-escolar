import type {
  Student,
  Course,
  RiskLevel,
  MonthlyPoint,
  TimelineEvent,
} from "@/types";
import { riskLevelOf } from "@/lib/ai";

export const COURSES: Course[] = [
  "Engenharia de Software",
  "Administração",
  "Direito",
  "Psicologia",
  "Sistemas de Informação",
];

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * Cadastro de alunos com os indicadores acadêmicos brutos.
 * O nível de `risco` NÃO é fixo: é derivado desses indicadores pelo motor de
 * risco da IA (ver `assessRisk` em lib/ai.ts) ao montar o array `students`.
 */
type StudentRaw = Omit<Student, "risco">;

const studentsRaw: StudentRaw[] = [
  { id: 1, nome: "Thiago Henrique", curso: "Engenharia de Software", frequencia: 68, media: 6.1, participacao: "Baixa", semestre: 4 },
  { id: 2, nome: "Maria Oliveira", curso: "Administração", frequencia: 92, media: 8.7, participacao: "Alta", semestre: 3 },
  { id: 3, nome: "Pedro Santos", curso: "Direito", frequencia: 54, media: 4.8, participacao: "Baixa", semestre: 5 },
  { id: 4, nome: "Ana Costa", curso: "Psicologia", frequencia: 88, media: 7.9, participacao: "Alta", semestre: 2 },
  { id: 5, nome: "Guilherme Gabriel", curso: "Sistemas de Informação", frequencia: 47, media: 4.2, participacao: "Baixa", semestre: 6 },
  { id: 6, nome: "Beatriz Lima", curso: "Engenharia de Software", frequencia: 76, media: 6.8, participacao: "Média", semestre: 3 },
  { id: 7, nome: "Gabriel Souza", curso: "Administração", frequencia: 95, media: 9.1, participacao: "Alta", semestre: 4 },
  { id: 8, nome: "Larissa Fernandes", curso: "Direito", frequencia: 61, media: 5.6, participacao: "Média", semestre: 7 },
  { id: 9, nome: "Rafael Almeida", curso: "Psicologia", frequencia: 43, media: 3.9, participacao: "Baixa", semestre: 5 },
  { id: 10, nome: "Juliana Ribeiro", curso: "Sistemas de Informação", frequencia: 84, media: 7.4, participacao: "Alta", semestre: 2 },
  { id: 11, nome: "Davi Valerio", curso: "Engenharia de Software", frequencia: 58, media: 5.1, participacao: "Baixa", semestre: 6 },
  { id: 12, nome: "Camila Rodrigues", curso: "Administração", frequencia: 79, media: 7.0, participacao: "Média", semestre: 3 },
  { id: 13, nome: "Felipe Martins", curso: "Direito", frequencia: 91, media: 8.3, participacao: "Alta", semestre: 4 },
  { id: 14, nome: "Isabela Gomes", curso: "Psicologia", frequencia: 66, media: 6.0, participacao: "Média", semestre: 5 },
  { id: 15, nome: "Bruno Araújo", curso: "Sistemas de Informação", frequencia: 51, media: 4.5, participacao: "Baixa", semestre: 7 },
  { id: 16, nome: "Letícia Barbosa", curso: "Engenharia de Software", frequencia: 89, media: 8.0, participacao: "Alta", semestre: 2 },
  { id: 17, nome: "Thiago Nunes", curso: "Administração", frequencia: 64, media: 5.8, participacao: "Baixa", semestre: 6 },
  { id: 18, nome: "Mariana Dias", curso: "Direito", frequencia: 49, media: 4.0, participacao: "Baixa", semestre: 8 },
  { id: 19, nome: "Vinícius Moreira", curso: "Psicologia", frequencia: 82, media: 7.6, participacao: "Alta", semestre: 3 },
  { id: 20, nome: "Sophia Cardoso", curso: "Sistemas de Informação", frequencia: 73, media: 6.5, participacao: "Média", semestre: 4 },
];

/* ----------------------- Geração de alunos adicionais ----------------------- */

const PRIMEIROS_NOMES = [
  "Enzo", "Helena", "Miguel", "Valentina", "Arthur", "Laura", "Heitor", "Alice",
  "Bernardo", "Manuela", "Théo", "Cecília", "Gael", "Eloá", "Ravi", "Maitê",
  "Noah", "Heloísa", "Lorenzo", "Lívia", "Benício", "Antonella", "Anthony", "Sarah",
  "Samuel", "Esther", "Henry", "Maria Luísa", "Murilo", "Lorena", "Otávio", "Yasmin",
  "Caio", "Clara", "Nicolas", "Marina", "Pietro", "Olívia", "Leonardo", "Isadora",
  "Emanuel", "Rebeca", "Augusto", "Lara", "Vitor", "Agatha", "Daniel", "Bruna",
  "Eduardo", "Carolina", "Joaquim", "Mirella", "Bryan", "Letícia", "André", "Júlia",
  "Levi", "Ana Júlia", "Yuri", "Catarina", "Kauã", "Luiza", "Antônio", "Maya",
  "Ícaro", "Stella", "Breno", "Sofia", "Diego", "Melissa", "Fábio", "Vitória",
  "Renan", "Bianca", "Igor", "Nina", "Marcelo", "Aurora", "Sérgio", "Elisa",
];

const SOBRENOMES = [
  "Silva", "Souza", "Costa", "Pereira", "Almeida", "Nascimento", "Lima", "Araújo",
  "Ferreira", "Carvalho", "Gomes", "Martins", "Rocha", "Ribeiro", "Alves", "Monteiro",
  "Mendes", "Barros", "Freitas", "Cardoso", "Cavalcanti", "Teixeira", "Correia", "Pinto",
];

const PARTICIPACOES: Student["participacao"][] = ["Baixa", "Média", "Alta"];

/**
 * Gera alunos adicionais de forma determinística (sem aleatoriedade), variando
 * indicadores a partir do índice para produzir uma distribuição realista de
 * risco. IDs continuam a partir do último aluno do cadastro base.
 */
function gerarAlunos(quantidade: number, startId: number): StudentRaw[] {
  const out: StudentRaw[] = [];
  for (let i = 0; i < quantidade; i++) {
    const id = startId + i;
    const nome = `${PRIMEIROS_NOMES[i % PRIMEIROS_NOMES.length]} ${
      SOBRENOMES[(i * 7 + 3) % SOBRENOMES.length]
    }`;
    const curso = COURSES[i % COURSES.length];
    const semestre = ((i * 3) % 8) + 1;

    // Frequência variando ~42–98 em ciclos; média e participação correlacionadas.
    const freqBase = 42 + ((i * 13) % 57); // 42..98
    const frequencia = Math.min(98, Math.max(40, freqBase));
    const media = Number(
      Math.min(9.6, Math.max(3.5, 3.8 + ((i * 17) % 60) / 10)).toFixed(1),
    );
    const participacao =
      frequencia >= 82 && media >= 7
        ? "Alta"
        : frequencia < 62 || media < 5
          ? "Baixa"
          : PARTICIPACOES[(i + 1) % 3];

    out.push({ id, nome, curso, frequencia, media, participacao, semestre });
  }
  return out;
}

const studentsGerados = gerarAlunos(80, studentsRaw.length + 1);

/** Alunos com o nível de risco derivado dos indicadores pela IA. */
export const students: Student[] = [...studentsRaw, ...studentsGerados].map(
  (s) => ({
    ...s,
    risco: riskLevelOf(s),
  }),
);

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

/**
 * Evolução mensal de alunos em risco — curva crescente que converge para os
 * contadores atuais (proporcional ao total, escala com qualquer nº de alunos).
 */
const evoFactors = [0.55, 0.64, 0.72, 0.82, 0.91, 1];
export const riskEvolution = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"].map(
  (mes, i) => ({
    mes,
    alto: Math.round(highRiskCount * evoFactors[i]),
    medio: Math.round(mediumRiskCount * evoFactors[i]),
  }),
);

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

/**
 * Evolução da evasão estimada ao longo dos semestres — termina na taxa atual e
 * deriva os períodos anteriores proporcionalmente (mantém a curva coerente com
 * qualquer nº de alunos).
 */
export const dropoutTrend = [
  { periodo: "2024.1", taxa: Math.round(estimatedDropoutRate * 0.7) },
  { periodo: "2024.2", taxa: Math.round(estimatedDropoutRate * 0.82) },
  { periodo: "2025.1", taxa: Math.round(estimatedDropoutRate * 0.78) },
  { periodo: "2025.2", taxa: Math.round(estimatedDropoutRate * 0.9) },
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
      cor: "#16a34a",
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
  // `trend` é a variação rumo ao presente: negativo = piora, positivo = melhora.
  // O valor passado é o atual menos a evolução acumulada até agora.
  return HIST_MESES.map((mes, i) => {
    const fromEnd = HIST_MESES.length - 1 - i; // 5..0 (meses atrás)
    const wobble = ((student.id + i) % 3) - 1; // -1, 0, 1 — oscilação reprodutível
    const freq = clamp(
      Math.round(student.frequencia - fromEnd * trend * 6 + wobble * 2),
      30,
      100,
    );
    const media = clamp(
      Number((student.media - fromEnd * trend * 0.5 + wobble * 0.15).toFixed(1)),
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

/* ----------------------- Agregados da Página Inicial ----------------------- */

export interface StudentTrend {
  student: Student;
  /** Variação de frequência do primeiro ao último mês do histórico. */
  delta: number;
}

/**
 * Destaques da IA: alunos cuja frequência mais caiu no período (maior risco
 * emergente). Ordenados pela maior queda.
 */
export function aiHighlights(limit = 4): StudentTrend[] {
  return students
    .map((student) => {
      const hist = studentHistory(student);
      const delta = hist[hist.length - 1].frequencia - hist[0].frequencia;
      return { student, delta };
    })
    .filter((t) => t.delta < 0)
    .sort((a, b) => a.delta - b.delta)
    .slice(0, limit);
}

export interface RecentActivity extends TimelineEvent {
  studentId: number;
  studentName: string;
}

const eventOrder = ["02 Fev", "18 Mar", "05 Abr", "22 Abr", "28 Abr", "12 Mai", "15 Mai"];

/**
 * Atividade recente agregada de todos os alunos (faltas, alertas, intervenções),
 * ordenada do evento mais recente para o mais antigo.
 */
export function recentActivity(limit = 6): RecentActivity[] {
  const all: RecentActivity[] = [];
  for (const s of students) {
    for (const ev of studentTimeline(s)) {
      if (ev.tipo === "registro") continue; // foca em ações de acompanhamento
      all.push({ ...ev, studentId: s.id, studentName: s.nome });
    }
  }
  all.sort((a, b) => eventOrder.indexOf(b.data) - eventOrder.indexOf(a.data));
  return all.slice(0, limit);
}

/** Resumo do dia para a saudação da home. */
export const todaySummary = {
  total: totalStudents,
  alto: highRiskCount,
  medio: mediumRiskCount,
  evasao: estimatedDropoutRate,
};

/* ----------------------- Importação simulada (demonstração) ----------------------- */

export interface DisciplinaHistorico {
  disciplina: string;
  carga: number;
  nota: number;
  frequencia: number;
  situacao: "Aprovado" | "Reprovado" | "Cursando";
}

export interface HistoricoEscolar {
  aluno: string;
  matricula: string;
  curso: Course;
  periodo: string;
  disciplinas: DisciplinaHistorico[];
}

/**
 * Histórico escolar de exemplo "extraído" de um arquivo importado.
 * Conteúdo simulado para demonstração — em um sistema real, viria do parsing
 * do PDF/CSV enviado.
 */
export const historicoExemplo: HistoricoEscolar = {
  aluno: "Davi Valerio",
  matricula: "2023.1.04812",
  curso: "Engenharia de Software",
  periodo: "2026.1 · 6º semestre",
  disciplinas: [
    { disciplina: "Estruturas de Dados", carga: 80, nota: 5.2, frequencia: 62, situacao: "Cursando" },
    { disciplina: "Banco de Dados", carga: 80, nota: 4.1, frequencia: 55, situacao: "Cursando" },
    { disciplina: "Engenharia de Requisitos", carga: 60, nota: 6.0, frequencia: 70, situacao: "Cursando" },
    { disciplina: "Cálculo III", carga: 80, nota: 3.4, frequencia: 48, situacao: "Reprovado" },
    { disciplina: "Programação Web", carga: 80, nota: 6.8, frequencia: 74, situacao: "Cursando" },
    { disciplina: "Sistemas Operacionais", carga: 60, nota: 5.5, frequencia: 58, situacao: "Cursando" },
  ],
};

/** Lista de frequência de exemplo "importada" (sessões registradas por aluno). */
export interface FrequenciaRegistro {
  aluno: string;
  curso: Course;
  aulasPrevistas: number;
  aulasPresentes: number;
  frequencia: number;
}

export const frequenciaImportada: FrequenciaRegistro[] = students
  .slice(0, 8)
  .map((s) => {
    const previstas = 48;
    const presentes = Math.round((s.frequencia / 100) * previstas);
    return {
      aluno: s.nome,
      curso: s.curso,
      aulasPrevistas: previstas,
      aulasPresentes: presentes,
      frequencia: s.frequencia,
    };
  });

/* ----------------------- Turmas / Cursos ----------------------- */

/** Converte o nome do curso em slug de URL e vice-versa. */
export function courseSlug(curso: Course): string {
  return curso
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export function courseFromSlug(slug: string): Course | undefined {
  return COURSES.find((c) => courseSlug(c) === slug);
}

/** Alunos de um curso. */
export function studentsOfCourse(curso: Course): Student[] {
  return students.filter((s) => s.curso === curso);
}

/** Frequência média por semestre dentro de um curso (para gráfico). */
export function frequencyBySemester(curso: Course) {
  const turma = studentsOfCourse(curso);
  const semestres = [...new Set(turma.map((s) => s.semestre))].sort(
    (a, b) => a - b,
  );
  return semestres.map((sem) => {
    const alunos = turma.filter((s) => s.semestre === sem);
    const media = Math.round(
      alunos.reduce((acc, s) => acc + s.frequencia, 0) / alunos.length,
    );
    return { semestre: `${sem}º`, frequencia: media, alunos: alunos.length };
  });
}

/** Resumo consolidado de cada curso (para a lista de cursos). */
export function courseSummaries() {
  return COURSES.map((curso) => {
    const turma = studentsOfCourse(curso);
    const total = turma.length;
    const alto = turma.filter((s) => s.risco === "alto").length;
    const freqMedia = total
      ? Math.round(turma.reduce((a, s) => a + s.frequencia, 0) / total)
      : 0;
    return { curso, total, alto, freqMedia };
  });
}
