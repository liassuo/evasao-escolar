# PersistIA

**Monitoramento Inteligente de Evasão Escolar** — MVP visual para a disciplina de
Inteligência Artificial Aplicada à Inovação Digital.

PersistIA é uma plataforma web (somente front-end) que demonstra como uma solução
baseada em IA poderia apoiar coordenadores e gestores educacionais na identificação
de estudantes com risco de evasão. **Não há IA real nem backend** — todos os dados
são mockados e as "análises da IA" são textos gerados a partir dos indicadores.

## Stack

- React + TypeScript + Vite
- Tailwind CSS (componentes no estilo shadcn/ui)
- Recharts (gráficos)
- Lucide Icons
- React Router

## Como executar

```bash
npm install
npm run dev
```

Acesse o endereço exibido no terminal (normalmente http://localhost:5173).

### Outros comandos

```bash
npm run build     # build de produção
npm run preview   # pré-visualiza o build
npm run lint      # checagem de tipos (tsc)
```

## Telas

| Rota           | Tela              | Descrição                                                        |
| -------------- | ----------------- | ---------------------------------------------------------------- |
| `/`            | Dashboard         | Cards de indicadores, gráfico de evolução e tabela de risco       |
| `/alunos`      | Alunos            | Lista com busca e filtros (curso, risco)                          |
| `/alunos/:id`  | Perfil do Aluno   | Indicadores, **Análise da IA** simulada e recomendações           |
| `/relatorios`  | Relatórios        | Distribuição de risco, frequência por curso e evolução da evasão  |

## Estrutura

```
src/
├── components/      # Layout, Sidebar, StatCard, RiskBadge, ui/ (primitivos)
├── data/            # students.ts — 20 alunos mockados + agregações
├── lib/             # utils (cn) e ai.ts (geração das análises simuladas)
├── pages/           # Dashboard, Students, StudentProfile, Reports
└── types/           # tipos de domínio (Student, RiskLevel, Course)
```

## Sobre a "IA"

Conforme o objetivo do MVP, a inteligência artificial é **simulada**. O módulo
`src/lib/ai.ts` compõe a análise e as recomendações com base na frequência, média
e participação de cada aluno, deixando claro o papel que uma IA real ocuparia:
analisar indicadores, identificar padrões e gerar recomendações.
