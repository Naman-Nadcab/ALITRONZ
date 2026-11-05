import { familyFromCategory } from "@/components/visuals/family-visual";

function hash(value: string) {
  return [...value].reduce((total, character) => (total * 31 + character.charCodeAt(0)) % 9973, 17);
}

export function ArticleCover({
  slug,
  category,
}: {
  slug: string;
  category: string;
}) {
  const seed = hash(slug);
  const family = familyFromCategory(category);
  const paths = Array.from({ length: 6 }, (_, index) => {
    const start = 52 + ((seed + index * 43) % 260);
    const turn = 90 + ((seed * (index + 3)) % 260);
    const end = 80 + ((seed + index * 71) % 300);
    return `M 32 ${start} C 180 ${turn}, 380 ${end}, 688 ${70 + index * 62}`;
  });
  const nodes = Array.from({ length: 7 }, (_, index) => ({
    x: 90 + ((seed * (index + 5)) % 540),
    y: 70 + ((seed + index * 97) % 330),
    size: 5 + ((seed + index * 13) % 13),
  }));

  return (
    <figure className={`article-cover family-${family}`}>
      <svg viewBox="0 0 720 480" role="img" aria-label={`Original editorial diagram for ${category}`}>
        <rect width="720" height="480" rx="26" className="article-cover-bg" />
        <path d="M40 410 L270 102 L510 350 L680 76" className="article-cover-plane" />
        {paths.map((path, index) => (
          <path key={path} d={path} className={`article-cover-path path-${index % 3}`} />
        ))}
        {nodes.map((node, index) => (
          <g key={`${node.x}-${node.y}`}>
            <circle cx={node.x} cy={node.y} r={node.size * 2.5} className="article-cover-halo" />
            <circle cx={node.x} cy={node.y} r={node.size} className={`article-cover-node node-${index % 3}`} />
          </g>
        ))}
        <path d="M56 48 H250" className="article-cover-rule" />
        <path d="M470 432 H664" className="article-cover-rule" />
      </svg>
      <figcaption>{category} / Editorial system {String((seed % 89) + 10).padStart(2, "0")}</figcaption>
    </figure>
  );
}
