"use client";

import { Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dice } from "@/components/Dice";
import type { DiceMode, DiceValue } from "@/data/types";

const faces: Record<DiceValue, string> = {
  1: "⚀",
  2: "⚁",
  3: "⚂",
  4: "⚃",
  5: "⚄",
  6: "⚅",
};

type Props = {
  mode: DiceMode;
  value: DiceValue;
  rolling: boolean;
  onDigitalRoll: () => void;
  onPhysicalRoll: (value: DiceValue) => void;
};

export function DiceStep({
  mode,
  value,
  rolling,
  onDigitalRoll,
  onPhysicalRoll,
}: Props) {
  if (mode === "physical") {
    return (
      <div className="flex flex-1 flex-col justify-center text-center">
        <p className="text-sm font-black uppercase tracking-[.2em] text-primary">
          Dado físico
        </p>
        <h3 className="mt-2 text-3xl font-black md:text-4xl">
          Jogue o dado de verdade!
        </h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Depois, toque no número que apareceu.
        </p>

        <div className="mt-7 grid grid-cols-3 gap-3">
          {([1, 2, 3, 4, 5, 6] as DiceValue[]).map((roll) => (
            <Button
              key={roll}
              variant="outline"
              className="h-auto flex-col gap-1 py-4"
              onClick={() => onPhysicalRoll(roll)}
              aria-label={"Registrar resultado " + roll}
            >
              <span className="text-5xl leading-none text-primary">
                {faces[roll]}
              </span>
              <span className="text-xl">{roll}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <p className="text-sm font-black uppercase tracking-[.2em] text-primary">
        Agora conte os pontinhos
      </p>
      <h3 className="mt-2 text-3xl font-black md:text-4xl">Jogue o dado</h3>

      <div className="my-7">
        <Dice value={value} rolling={rolling} />
      </div>

      <p className="mb-5 max-w-md text-muted-foreground">
        O dado só conta que tipo de surpresa aconteceu.
      </p>

      <Button
        variant="butter"
        size="xl"
        className="w-full text-xl"
        disabled={rolling}
        onClick={onDigitalRoll}
      >
        <Dices />
        {rolling ? "Rolando…" : "Jogar dado"}
      </Button>
    </div>
  );
}
