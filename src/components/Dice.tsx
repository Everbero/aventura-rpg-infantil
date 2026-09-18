"use client";

import { cn } from "@/lib/utils";
import type { DiceValue } from "@/data/types";

const pipPositions: Record<DiceValue, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

export function Dice({
  value,
  rolling = false,
}: {
  value: DiceValue;
  rolling?: boolean;
}) {
  const pips = new Set(pipPositions[value]);

  return (
    <div
      aria-label={"Dado mostrando " + value}
      className={cn(
        "grid aspect-square w-32 grid-cols-3 grid-rows-3 gap-2 rounded-3xl border-4 border-card bg-card p-5 shadow-lg md:w-40",
        rolling && "animate-die",
      )}
    >
      {Array.from({ length: 9 }, (_, index) => (
        <span
          key={index}
          className={cn(
            "m-auto block size-4 rounded-full md:size-5",
            pips.has(index) ? "bg-primary" : "bg-transparent",
          )}
        />
      ))}
    </div>
  );
}
