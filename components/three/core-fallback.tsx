export function CoreFallback() {
  return (
    <div className="core-fallback" role="img" aria-label="The Intelligent Assembly, an original Alitroz sculpture of folded glass membranes, flowing metal ribbons, a luminous core, and precision pathways.">
      <svg viewBox="0 0 760 680" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="assembly-glass-a" x1="112" y1="90" x2="574" y2="594">
            <stop stopColor="#F7F4FF" stopOpacity=".84" />
            <stop offset=".35" stopColor="#BBADFF" stopOpacity=".2" />
            <stop offset=".72" stopColor="#58DCD1" stopOpacity=".32" />
            <stop offset="1" stopColor="#83A5FF" stopOpacity=".14" />
          </linearGradient>
          <linearGradient id="assembly-glass-b" x1="588" y1="102" x2="238" y2="580">
            <stop stopColor="#83A5FF" stopOpacity=".58" />
            <stop offset=".42" stopColor="#6355C9" stopOpacity=".16" />
            <stop offset="1" stopColor="#FF825E" stopOpacity=".3" />
          </linearGradient>
          <linearGradient id="assembly-metal" x1="104" y1="214" x2="650" y2="442">
            <stop stopColor="#747B91" />
            <stop offset=".18" stopColor="#F6F4FC" />
            <stop offset=".37" stopColor="#8C93AA" />
            <stop offset=".58" stopColor="#FFFFFF" />
            <stop offset=".78" stopColor="#697189" />
            <stop offset="1" stopColor="#C8D5EF" />
          </linearGradient>
          <radialGradient id="assembly-core" cx="0" cy="0" r="1" gradientTransform="translate(381 334) rotate(90) scale(106)">
            <stop stopColor="#F6F4FC" />
            <stop offset=".18" stopColor="#D0F28C" />
            <stop offset=".48" stopColor="#58DCD1" />
            <stop offset="1" stopColor="#6355C9" stopOpacity="0" />
          </radialGradient>
          <filter id="assembly-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id="assembly-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <ellipse cx="382" cy="588" rx="224" ry="44" fill="#101426" opacity=".36" filter="url(#assembly-soft)" />
        <ellipse cx="382" cy="336" rx="98" ry="98" fill="url(#assembly-core)" opacity=".72" filter="url(#assembly-glow)" />

        <path d="M116 422 C104 270 190 130 348 112 C480 98 612 180 646 298 C678 408 610 530 480 568 C340 610 194 558 116 422Z" fill="url(#assembly-glass-a)" fillOpacity=".18" stroke="#BBADFF" strokeOpacity=".42" />
        <path d="M202 132 C332 78 518 126 586 252 C632 338 598 470 500 526 C412 576 282 536 224 442 C172 356 152 214 202 132Z" fill="url(#assembly-glass-b)" fillOpacity=".2" stroke="#83A5FF" strokeOpacity=".54" />
        <path d="M154 374 C202 212 344 132 492 178 C576 204 622 270 608 336 C590 420 470 470 344 450 C244 434 180 414 154 374Z" fill="#58DCD1" fillOpacity=".09" stroke="#58DCD1" strokeOpacity=".7" />

        <path d="M116 380 C198 236 286 184 394 202 C500 220 552 318 634 286" stroke="url(#assembly-metal)" strokeWidth="34" strokeLinecap="round" />
        <path d="M136 426 C246 478 332 478 410 420 C494 358 532 230 620 184" stroke="url(#assembly-metal)" strokeWidth="22" strokeLinecap="round" />
        <path d="M202 148 C236 256 278 318 376 342 C488 370 548 430 566 536" stroke="#F6F4FC" strokeOpacity=".72" strokeWidth="12" strokeLinecap="round" />

        <path d="M246 160 376 118 456 288 340 334 226 264Z" fill="url(#assembly-glass-a)" stroke="#F6F4FC" strokeOpacity=".55" />
        <path d="M438 170 548 240 484 402 356 342Z" fill="url(#assembly-glass-b)" stroke="#83A5FF" strokeOpacity=".75" />
        <path d="M260 356 376 334 472 456 318 522 210 438Z" fill="#58DCD1" fillOpacity=".16" stroke="#58DCD1" strokeOpacity=".8" />

        <circle cx="380" cy="336" r="68" fill="url(#assembly-core)" />
        <circle cx="380" cy="336" r="34" fill="#F6F4FC" fillOpacity=".76" stroke="#D0F28C" strokeWidth="2" />
        <circle cx="380" cy="336" r="15" fill="#20243A" stroke="#58DCD1" strokeWidth="4" />

        <path d="M86 486 C214 404 262 380 380 336 C504 290 584 214 676 112" stroke="#58DCD1" strokeWidth="2.5" />
        <path d="M100 208 C230 232 292 286 380 336 C470 386 536 468 666 520" stroke="#FF825E" strokeWidth="2.5" />
        <path d="M176 92 C248 220 294 286 380 336 C476 392 560 386 686 348" stroke="#BBADFF" strokeWidth="2.5" />
        <g fill="#F6F4FC" stroke="#20243A" strokeWidth="3">
          <circle cx="86" cy="486" r="7" />
          <circle cx="676" cy="112" r="7" />
          <circle cx="100" cy="208" r="7" />
          <circle cx="666" cy="520" r="7" />
          <circle cx="176" cy="92" r="7" />
          <circle cx="686" cy="348" r="7" />
        </g>
      </svg>
    </div>
  );
}
