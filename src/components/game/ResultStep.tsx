"use client";

import { RotateCcw, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dice } from "@/components/Dice";
import type {
  Adventure,
  DiceOutcome,
  DiceValue,
  Scene,
} from "@/data/types";

type Props = {
  adventure: Adventure;
  scene: Scene;
  outcome: DiceOutcome;
  roll: DiceValue;
  stars: number;
  onChoose: (next: string) => void;
  onReset: () => void;
};

export function ResultStep({
  adventure,
  scene,
  outcome,
  roll,
  stars,
  onChoose,
  onReset,
}: Props) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-5">
        <Dice value={roll} />
        <div>
          <p className="text-sm font-black uppercase tracking-[.2em] text-primary">
            Você tirou
          </p>
          <p className="text-6xl font-black">{roll}</p>
        </div>
      </div>

      <Card className="mt-6 bg-accent/65 shadow-none">
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-2xl font-black">{outcome.title}</h3>
            {outcome.stars > 0 && (
              <Badge variant="butter">
                <Star className="size-3 fill-current" />
                +{outcome.stars}
              </Badge>
            )}
          </div>
          <p className="mt-2 text-lg font-semibold leading-relaxed">
            {outcome.text}
          </p>
        </CardContent>
      </Card>

      <div className="mt-auto pt-7">
        {scene.final ? (
          <div className="text-center">
            <p className="mb-4 text-2xl font-black">
              🎉 Fim da aventura · {stars} estrelas!
            </p>
            <Button size="xl" className="w-full" onClick={onReset}>
              <RotateCcw />
              Jogar de novo
            </Button>
          </div>
        ) : (
          <>
            <p className="mb-3 text-center text-sm font-black uppercase tracking-[.16em] text-muted-foreground">
              Para onde vamos agora?
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {scene.choices.map((choice) => {
                const destination = adventure.scenes[choice.next];

                return (
                  <Button
                    key={choice.next + "-" + choice.description}
                    variant="outline"
                    className="h-auto min-h-28 flex-col items-start gap-1 p-5 text-left"
                    onClick={() => onChoose(choice.next)}
                    aria-label={
                      "Ir para " + (destination?.title ?? choice.description)
                    }
                  >
                    <span className="text-4xl">{choice.icon}</span>
                    <span className="mt-1 text-lg font-black">
                      {destination?.title ?? choice.label}
                    </span>
                    <span className="whitespace-normal text-sm font-semibold text-muted-foreground">
                      {choice.description}
                    </span>
                  </Button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
