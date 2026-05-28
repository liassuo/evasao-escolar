# PersistAI

**Monitoramento de Evasão Escolar** — MVP visual para a disciplina de
Inteligência Artificial Aplicada à Inovação Digital.

PersistAI é uma plataforma web (somente front-end) que demonstra como uma solução
baseada em IA poderia apoiar coordenadores e gestores educacionais na identificação
de estudantes com risco de evasão. **Não há IA real nem backend** — todos os dados
são mockados e as "análises da IA" são textos gerados a partir dos indicadores.

## Stack

- React + TypeScript + Vite
- Tailwind CSS (componentes no estilo shadcn/ui)
- Recharts (gráficos)
- Lucide Icons
- React Router

## Identidade visual

- **Paleta:** azul-petróleo institucional (`#0e7490` / `#155e75`), cinzas neutros e
  as cores semânticas de risco (verde / âmbar / vermelho).
- **Tipografia:** _Fraunces_ (display serifada) nos títulos e _Inter_ no corpo,
  com numerais tabulares nas tabelas e indicadores.
- **Tom:** software de gestão acadêmica — denso em informação, sóbrio, sem cara de
  landing page ou produto de IA genérico.

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
| `/alunos/:id`  | Perfil do Aluno   | Indicadores, histórico, linha do tempo e **Análise da IA** simulada |
| `/relatorios`  | Relatórios        | Distribuição de risco, frequência por curso e evolução da evasão  |

## Funcionalidades

- **Busca global** no cabeçalho (atalho `/` ou `Ctrl/Cmd + K`) que localiza alunos
  por nome a partir de qualquer tela e leva ao perfil.
- **Filtros de relatórios funcionais** — curso, semestre e período recalculam os
  gráficos em tempo real.
- **Perfil do aluno com histórico** — evolução mensal de frequência e média, além de
  uma linha do tempo de eventos acadêmicos (faltas, alertas, intervenções).

## Estrutura

```
src/
├── components/      # Layout, Sidebar, StatCard, RiskBadge, GlobalSearch, ui/ (primitivos)
├── data/            # students.ts — 20 alunos mockados, histórico, eventos e agregações
├── lib/             # utils (cn) e ai.ts (geração das análises simuladas)
├── pages/           # Dashboard, Students, StudentProfile, Reports
└── types/           # tipos de domínio (Student, RiskLevel, Course)
```

## Sobre a "IA"

Conforme o objetivo do MVP, a inteligência artificial é **simulada**. O módulo
`src/lib/ai.ts` compõe a análise e as recomendações com base na frequência, média
e participação de cada aluno, deixando claro o papel que uma IA real ocuparia:
analisar indicadores, identificar padrões e gerar recomendações.
