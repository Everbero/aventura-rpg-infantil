"use client";

import { Dices, Maximize2, Settings2, Star, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { DiceMode } from "@/data/types";

type Props = {
  title: string;
  sceneNumber: number;
  stars: number;
  diceMode: DiceMode;
  onNarrate: () => void;
  onFullscreen: () => void;
  onSettings: () => void;
};

export function GameHeader({
  title,
  sceneNumber,
  stars,
  diceMode,
  onNarrate,
  onFullscreen,
  onSettings,
}: Props) {
  return (
    <Card className="mb-4 bg-card/90 backdrop-blur md:mb-6">
      <CardContent className="flex items-center justify-between gap-3 p-4 md:px-6">
        <div className="min-w-0">
          <p className="truncate text-xs font-black uppercase tracking-[.18em] text-primary">
            {title}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm font-bold text-muted-foreground">
            Cena {sceneNumber}
            <span aria-hidden>·</span>
            <Star className="size-4 fill-butter text-butter-foreground" />
            {stars}
          </p>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="butter" size="sm" onClick={onSettings}>
            <Dices />
            <span className="hidden sm:inline">
              {diceMode === "digital" ? "Digital" : "Físico"}
            </span>
          </Button>
          <Button variant="mist" size="sm" onClick={onNarrate}>
            <Volume2 />
            <span className="hidden sm:inline">Narrar</span>
          </Button>
          <Button variant="sage" size="sm" onClick={onFullscreen}>
            <Maximize2 />
            <span className="hidden sm:inline">Tela cheia</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={onSettings}>
            <Settings2 />
            <span className="hidden sm:inline">Mestre</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
