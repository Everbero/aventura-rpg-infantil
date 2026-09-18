import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { numberWord } from "@/lib/numbers";
import type { RandomNumberConfig } from "@/data/types";

export function SceneCountingCard({
  value,
  config,
}: {
  value: number;
  config: RandomNumberConfig;
}) {
  const label = value === 1 ? config.singular : config.plural;
  const word = numberWord(value, config.gender);

  return (
    <Card className="mt-5 border-dashed bg-mist/35 shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Badge variant="mist">🔢 Vamos contar</Badge>
            <p className="mt-2 text-lg font-black">
              <span className="text-3xl text-primary">{value}</span>{" "}
              <mark className="rounded-md bg-butter/70 px-1 text-butter-foreground">
                {word}
              </mark>{" "}
              {label}
            </p>
          </div>

          <div
            className="max-w-[52%] text-right text-2xl leading-relaxed"
            aria-label={value + " " + label}
          >
            {Array.from({ length: value }, (_, index) => (
              <span key={index} className="inline-block px-0.5">
                {config.emoji}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
