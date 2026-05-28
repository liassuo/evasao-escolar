/**
 * Ícone da marca PersistAI: capelo de formatura + check de aprovação,
 * em um quadrado arredondado azul institucional. SVG inline (escala perfeita).
 */
export function BrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="PersistAI"
    >
      <rect width="48" height="48" rx="13" fill="#16308f" />
      {/* Capelo de formatura (topo) */}
      <path d="M24 12L38 17.5L24 23L10 17.5L24 12Z" fill="#ffffff" />
      {/* Borla pendente à direita */}
      <path
        d="M38 17.5V23"
        stroke="#ffffff"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="38" cy="23.6" r="1.3" fill="#ffffff" />
      {/* Arco da cabeça descendo para o check (lado esquerdo) */}
      <path
        d="M15 20.5V26.5C15 29.4 17.4 31.8 20.3 32.4"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Check azul de aprovação (proeminente) */}
      <path
        d="M19 28.5L24.5 34L34 23.5"
        stroke="#2f6df6"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
