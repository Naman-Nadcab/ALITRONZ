"use client";

import { useState } from "react";
import { processStages } from "@/content/home";

export function SystemDiagram() {
  const [index, setIndex] = useState(0);
  const current = processStages[index];

  function move(next: number) {
    const count = processStages.length;
    setIndex((next + count) % count);
  }

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Engineering sequence">
        {processStages.map((stage, stageIndex) => (
          <button
            key={stage.title}
            type="button"
            role="tab"
            id={`stage-tab-${stageIndex}`}
            aria-selected={stageIndex === index}
            aria-controls="stage-panel"
            tabIndex={stageIndex === index ? 0 : -1}
            onClick={() => setIndex(stageIndex)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                move(stageIndex + 1);
              }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                move(stageIndex - 1);
              }
            }}
          >
            {String(stageIndex + 1).padStart(2, "0")} {stage.title}
          </button>
        ))}
      </div>
      <div className="tab-panel stage-panel" role="tabpanel" id="stage-panel" aria-labelledby={`stage-tab-${index}`}>
        <h3>{current.title}</h3>
        <p className="gap-top">{current.summary}</p>
        <p className="gap-top">{current.purpose}</p>
      </div>
    </div>
  );
}
