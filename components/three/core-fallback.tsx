export function CoreFallback() {
  return (
    <div className="core-fallback">
      <svg viewBox="0 0 640 720" fill="none" aria-hidden="true">
        <g className="orbit" stroke="#aeb8c8" strokeWidth="1">
          <ellipse cx="320" cy="340" rx="210" ry="78" transform="rotate(-18 320 340)" opacity="0.7" />
          <ellipse cx="320" cy="340" rx="168" ry="210" transform="rotate(24 320 340)" opacity="0.45" />
        </g>
        <path d="M320 150 470 236 470 408 320 494 170 408 170 236Z" stroke="#d5dde8" strokeWidth="1.4" />
        <path d="M250 250 390 300 360 470 214 390Z" stroke="#73e5f7" strokeWidth="1.2" opacity="0.9" />
        <path d="M300 230 430 360 300 500 188 360Z" stroke="#8e98a8" strokeWidth="1" />
        <circle cx="320" cy="348" r="28" fill="#73e5f7" />
        <circle cx="320" cy="348" r="70" stroke="#73e5f7" strokeWidth="1" opacity="0.7" />
        <circle cx="512" cy="286" r="4" fill="#f4f6fa" />
        <circle cx="146" cy="390" r="3.5" fill="#8173fa" />
        <circle cx="400" cy="150" r="3" fill="#f4f6fa" />
        <circle cx="250" cy="540" r="3" fill="#73e5f7" />
        <path d="M320 348 512 286M320 348 146 390M320 348 250 540" stroke="#73e5f7" strokeWidth="1" opacity="0.55" />
      </svg>
    </div>
  );
}
