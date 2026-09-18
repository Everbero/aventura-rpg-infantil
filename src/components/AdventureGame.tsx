"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DiceStep } from "@/components/game/DiceStep";
import { GameHeader } from "@/components/game/GameHeader";
import { ResultStep } from "@/components/game/ResultStep";
import { StoryStep } from "@/components/game/StoryStep";
import { ParentPanel } from "@/components/ParentPanel";
import { SceneArtwork } from "@/components/SceneArtwork";
import { useAdventureGame } from "@/hooks/use-adventure-game";
import type { Adventure } from "@/data/types";

export function AdventureGame({ adventure }: { adventure: Adventure }) {
  const game = useAdventureGame(adventure);

  if (!game.hydrated) {
    return (
      <main className="grid min-h-screen place-items-center text-xl font-bold text-muted-foreground">
        Preparando a aventura…
      </main>
    );
  }

  return (
    <main className="min-h-screen p-3 md:p-6">
      <div className="mx-auto max-w-[1500px]">
        <GameHeader
          title={adventure.title}
          sceneNumber={game.sceneIndex}
          stars={game.stars}
          diceMode={game.diceMode}
          onNarrate={game.narrate}
          onFullscreen={game.toggleFullscreen}
          onSettings={() => game.setParentOpen(true)}
        />

        <div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr] lg:gap-6">
          <SceneArtwork
            scene={game.scene}
            randomNumber={game.sceneNumber}
          />

          <Card className="min-h-[420px] shadow-lg">
            <CardContent className="flex min-h-[420px] flex-1 flex-col p-5 md:p-8">
              {game.phase === "story" && (
                <StoryStep
                  scene={game.scene}
                  randomNumber={game.sceneNumber}
                  onContinue={() => game.setPhase("roll")}
                />
              )}

              {game.phase === "roll" && (
                <DiceStep
                  mode={game.diceMode}
                  value={game.roll}
                  rolling={game.rolling}
                  onDigitalRoll={game.rollDigital}
                  onPhysicalRoll={game.registerPhysicalRoll}
                />
              )}

              {game.phase === "result" && (
                <ResultStep
                  adventure={adventure}
                  scene={game.scene}
                  outcome={game.outcome}
                  roll={game.roll}
                  stars={game.stars}
                  onChoose={game.choose}
                  onReset={game.reset}
                />
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4 bg-card/80 md:mt-6">
          <CardContent className="p-4 text-sm text-muted-foreground md:px-6">
            <strong className="text-foreground">Dica para o adulto:</strong>{" "}
            {game.scene.parentPrompt}
          </CardContent>
        </Card>
      </div>

      <ParentPanel
        open={game.parentOpen}
        onClose={() => game.setParentOpen(false)}
        adventure={adventure}
        currentScene={game.scene.id}
        diceMode={game.diceMode}
        onDiceModeChange={game.setDiceMode}
        forcedRoll={game.forcedRoll}
        onForceRoll={game.setForcedRoll}
        onJump={game.jumpTo}
        onReset={game.reset}
      />
    </main>
  );
}
