export function CoreFallback() {
  return (
    <div className="core-fallback" role="img" aria-label="The Alitroz Core, an asymmetric digital-industrial sculpture of interlocking glass blades, chrome beams, and luminous pathways.">
      <svg viewBox="0 0 640 720" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="core-glass-a" x1="170" y1="120" x2="450" y2="570">
            <stop stopColor="#F8F5FF" stopOpacity=".76" />
            <stop offset=".42" stopColor="#AD94FF" stopOpacity=".2" />
            <stop offset="1" stopColor="#71E6E4" stopOpacity=".42" />
          </linearGradient>
          <linearGradient id="core-chrome" x1="260" y1="120" x2="380" y2="580">
            <stop stopColor="#F8F5FF" />
            <stop offset=".3" stopColor="#7D849A" />
            <stop offset=".56" stopColor="#E8EEFA" />
            <stop offset="1" stopColor="#586078" />
          </linearGradient>
          <filter id="core-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <ellipse cx="320" cy="594" rx="178" ry="34" fill="#171925" opacity=".22" />
        <path d="M276 92 352 108 388 570 312 594Z" fill="url(#core-chrome)" stroke="#F8F5FF" strokeOpacity=".35" />
        <path d="M124 412 150 342 522 218 540 286Z" fill="url(#core-chrome)" stroke="#C8BAFF" strokeOpacity=".48" />
        <path d="M176 142 244 112 462 522 392 550Z" fill="url(#core-glass-a)" stroke="#C8BAFF" strokeWidth="2" />
        <path d="M446 126 500 170 230 560 174 522Z" fill="#71E6E4" fillOpacity=".16" stroke="#71E6E4" strokeWidth="2" />
        <path d="M126 264 158 210 526 424 492 478Z" fill="#82A7FF" fillOpacity=".14" stroke="#82A7FF" strokeWidth="1.5" />
        <path d="M300 292 352 266 394 350 334 394 278 354Z" fill="#71E6E4" opacity=".3" filter="url(#core-glow)" />
        <path d="M300 292 352 266 394 350 334 394 278 354Z" fill="#71E6E4" stroke="#F8F5FF" />
        <path d="M92 432 184 410 208 440 118 470Z" fill="#82A7FF" stroke="#C8BAFF" />
        <path d="M448 164 542 194 532 230 440 204Z" fill="#FF927E" stroke="#FFD0C7" />
        <path d="M434 494 544 458 558 490 450 526Z" fill="#D0F28C" stroke="#EFFFCB" />
        <path d="M104 254 196 224 208 256 116 286Z" fill="#71E6E4" stroke="#C5FFFD" />
        <path d="M104 448 C190 410 246 382 332 338 S468 240 536 212" stroke="#71E6E4" strokeWidth="3" />
        <path d="M164 154 C226 226 270 278 332 338 S446 446 520 500" stroke="#AD94FF" strokeWidth="3" />
        <path d="M104 270 C198 282 260 310 332 338 S446 426 504 474" stroke="#FF927E" strokeWidth="2" />
        <g fill="#F8F5FF">
          <rect x="101" y="445" width="7" height="7" transform="rotate(-20 101 445)" />
          <rect x="532" y="208" width="7" height="7" transform="rotate(20 532 208)" />
          <rect x="516" y="496" width="7" height="7" transform="rotate(-18 516 496)" />
        </g>
      </svg>
    </div>
  );
}
