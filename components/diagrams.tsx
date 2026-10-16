export function DivisionFigure({ slug }: { slug: string }) {
  if (slug === "ai-automation") {
    return (
      <svg viewBox="0 0 320 160" fill="none" aria-hidden="true">
        <circle cx="160" cy="80" r="18" stroke="#73e5f7" />
        <circle cx="70" cy="40" r="8" stroke="#aeb8c8" />
        <circle cx="250" cy="36" r="8" stroke="#aeb8c8" />
        <circle cx="64" cy="120" r="8" stroke="#aeb8c8" />
        <circle cx="256" cy="122" r="8" stroke="#aeb8c8" />
        <path d="M88 48 144 72M232 44 176 70M80 112 146 90M238 114 176 92" stroke="#73e5f7" />
      </svg>
    );
  }
  if (slug === "digital-product-engineering") {
    return (
      <svg viewBox="0 0 320 160" fill="none" aria-hidden="true">
        <rect x="48" y="28" width="150" height="104" stroke="#d5dde8" />
        <path d="M48 52h150" stroke="#aeb8c8" />
        <rect x="168" y="46" width="104" height="86" stroke="#73e5f7" />
        <path d="M188 78h64M188 96h40" stroke="#73e5f7" />
      </svg>
    );
  }
  if (slug === "web3-blockchain") {
    return (
      <svg viewBox="0 0 320 160" fill="none" aria-hidden="true">
        <path d="M70 80 110 58 150 80 110 102Z" stroke="#8173fa" />
        <path d="M150 80 190 58 230 80 190 102Z" stroke="#d5dde8" />
        <path d="M110 102 150 124 190 102" stroke="#73e5f7" />
        <path d="M150 80h0" stroke="#aeb8c8" />
        <circle cx="110" cy="80" r="3" fill="#73e5f7" />
        <circle cx="190" cy="80" r="3" fill="#f4f6fa" />
      </svg>
    );
  }
  if (slug === "financial-trading-technology") {
    return (
      <svg viewBox="0 0 320 160" fill="none" aria-hidden="true">
        <path d="M40 28v104M40 132h240" stroke="#aeb8c8" />
        <path d="M58 108 96 86 132 96 176 52 214 70 252 40" stroke="#73e5f7" />
        <path d="M58 40h28M58 58h16" stroke="#d5dde8" />
      </svg>
    );
  }
  if (slug === "cloud-devops") {
    return (
      <svg viewBox="0 0 320 160" fill="none" aria-hidden="true">
        <rect x="36" y="58" width="54" height="36" stroke="#d5dde8" />
        <rect x="132" y="58" width="54" height="36" stroke="#73e5f7" />
        <rect x="228" y="58" width="54" height="36" stroke="#d5dde8" />
        <path d="M90 76h42M186 76h42" stroke="#aeb8c8" />
      </svg>
    );
  }
  if (slug === "data-engineering") {
    return (
      <svg viewBox="0 0 320 160" fill="none" aria-hidden="true">
        <path d="M40 40h70M40 80h70M40 120h70" stroke="#aeb8c8" />
        <path d="M110 40 160 80 110 120M160 80h50" stroke="#73e5f7" />
        <rect x="214" y="52" width="66" height="56" stroke="#d5dde8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 160" fill="none" aria-hidden="true">
      <rect x="70" y="28" width="180" height="104" stroke="#d5dde8" />
      <path d="M70 28 160 80 250 28M70 132 160 80 250 132" stroke="#73e5f7" />
      <circle cx="160" cy="80" r="6" fill="#73e5f7" />
    </svg>
  );
}
