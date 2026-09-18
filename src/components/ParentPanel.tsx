"use client";

import { Dices, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import type { Adventure, DiceMode, DiceValue } from "@/data/types";

type Props = {
  open: boolean;
  onClose: () => void;
  adventure: Adventure;
  currentScene: string;
  diceMode: DiceMode;
  onDiceModeChange: (mode: DiceMode) => void;
  forcedRoll: DiceValue | null;
  onForceRoll: (roll: DiceValue | null) => void;
  onJump: (sceneId: string) => void;
  onReset: () => void;
};

export function ParentPanel({
  open,
  onClose,
  adventure,
  currentScene,
  diceMode,
  onDiceModeChange,
  forcedRoll,
  onForceRoll,
  onJump,
  onReset,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent>
        <DialogHeader>
          <p className="text-xs font-black uppercase tracking-[.2em] text-primary">
            Somente para o adulto
          </p>
          <DialogTitle>Modo mestre</DialogTitle>
          <DialogDescription>
            Configure o dado e controle a aventura sem interromper a brincadeira.
          </DialogDescription>
        </DialogHeader>

        <section className="mt-2">
          <p className="font-bold">Qual dado vamos usar?</p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button
              variant={diceMode === "digital" ? "secondary" : "outline"}
              className="h-auto flex-col items-start p-4 text-left"
              onClick={() => onDiceModeChange("digital")}
            >
              <Dices className="size-6" />
              <span>Dado digital</span>
              <span className="whitespace-normal text-xs font-medium text-muted-foreground">
                O jogo rola o dado na tela.
              </span>
            </Button>

            <Button
              variant={diceMode === "physical" ? "sage" : "outline"}
              className="h-auto flex-col items-start p-4 text-left"
              onClick={() => {
                onDiceModeChange("physical");
                onForceRoll(null);
              }}
            >
              <Dices className="size-6" />
              <span>Dado físico</span>
              <span className="whitespace-normal text-xs font-medium text-muted-foreground">
                Use um dado real e informe o resultado.
              </span>
            </Button>
          </div>
        </section>

        {diceMode === "digital" && (
          <section>
            <p className="font-bold">Forçar o próximo resultado</p>
            <div className="mt-3 grid grid-cols-7 gap-2">
              <Button
                size="icon"
                variant={forcedRoll === null ? "default" : "secondary"}
                onClick={() => onForceRoll(null)}
              >
                <Dices />
              </Button>

              {([1, 2, 3, 4, 5, 6] as DiceValue[]).map((roll) => (
                <Button
                  key={roll}
                  size="icon"
                  variant={forcedRoll === roll ? "default" : "secondary"}
                  onClick={() => onForceRoll(roll)}
                >
                  {roll}
                </Button>
              ))}
            </div>
          </section>
        )}

        <section>
          <label className="font-bold" htmlFor="jump-scene">
            Ir para uma cena
          </label>
          <NativeSelect
            id="jump-scene"
            value={currentScene}
            onChange={(event) => onJump(event.target.value)}
            className="mt-3"
          >
            {Object.values(adventure.scenes).map((scene) => (
              <NativeSelectOption key={scene.id} value={scene.id}>
                {scene.title}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </section>

        <Button variant="destructive" className="w-full" onClick={onReset}>
          <RotateCcw />
          Recomeçar aventura
        </Button>
      </DialogContent>
    </Dialog>
  );
}
