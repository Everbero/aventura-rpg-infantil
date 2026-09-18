"use client";

import type { Adventure, DiceMode, DiceValue } from "@/data/types";

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
}: {
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
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#47414F]/35 p-4 backdrop-blur-sm md:items-center"
      onMouseDown={onClose}
    >
      <section
        className="w-full max-w-xl rounded-[2rem] border border-[#E1DAE4] bg-[#FFFDFC] p-6 shadow-[0_24px_70px_rgba(68,60,82,.16)]"
        onMouseDown={(event) => event.stopPropagation()}
        aria-label="Modo mestre"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#756D92]">
              Somente para o adulto
            </p>
            <h2 className="mt-1 text-2xl font-black text-[#4D4855]">
              Modo mestre
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-[#F1EDEF] px-4 py-2 font-bold text-[#69626E]"
          >
            Fechar
          </button>
        </div>

        <div className="mt-6">
          <p className="font-bold text-[#56505D]">Qual dado vamos usar?</p>
          <p className="mt-1 text-sm text-[#817A87]">
            A escolha fica salva para as próximas partidas.
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              onClick={() => onDiceModeChange("digital")}
              className={
                "rounded-2xl border-2 p-4 text-left transition " +
                (diceMode === "digital"
                  ? "border-[#BFB4CF] bg-[#F0EAF4] text-[#5D5470]"
                  : "border-[#E7E1E8] bg-[#FAF8F7] text-[#625D67]")
              }
            >
              <span className="block text-3xl">🎲</span>
              <span className="mt-2 block font-black">Dado digital</span>
              <span className="mt-1 block text-sm text-[#817A87]">
                O jogo rola o dado na tela.
              </span>
            </button>

            <button
              onClick={() => {
                onDiceModeChange("physical");
                onForceRoll(null);
              }}
              className={
                "rounded-2xl border-2 p-4 text-left transition " +
                (diceMode === "physical"
                  ? "border-[#BFD1BC] bg-[#ECF2E9] text-[#586754]"
                  : "border-[#E7E1E8] bg-[#FAF8F7] text-[#625D67]")
              }
            >
              <span className="block text-3xl">🎲</span>
              <span className="mt-2 block font-black">Dado físico</span>
              <span className="mt-1 block text-sm text-[#817A87]">
                Jogue um dado de verdade e informe o resultado.
              </span>
            </button>
          </div>
        </div>

        {diceMode === "digital" && (
          <div className="mt-6">
            <p className="font-bold text-[#56505D]">
              Forçar o próximo resultado do dado
            </p>
            <div className="mt-3 grid grid-cols-7 gap-2">
              <button
                onClick={() => onForceRoll(null)}
                className={
                  "rounded-xl p-3 font-bold " +
                  (forcedRoll === null
                    ? "bg-[#9188B8] text-white"
                    : "bg-[#F1EDEF] text-[#69626E]")
                }
              >
                🎲
              </button>

              {([1, 2, 3, 4, 5, 6] as DiceValue[]).map((roll) => (
                <button
                  key={roll}
                  onClick={() => onForceRoll(roll)}
                  className={
                    "rounded-xl p-3 font-black " +
                    (forcedRoll === roll
                      ? "bg-[#9188B8] text-white"
                      : "bg-[#F1EDEF] text-[#69626E]")
                  }
                >
                  {roll}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <label
            className="font-bold text-[#56505D]"
            htmlFor="jump-scene"
          >
            Ir para uma cena
          </label>

          <select
            id="jump-scene"
            value={currentScene}
            onChange={(event) => onJump(event.target.value)}
            className="mt-3 w-full rounded-xl border border-[#DFD9E2] bg-[#FFFDFC] p-3 font-semibold text-[#5F5965]"
          >
            {Object.values(adventure.scenes).map((scene) => (
              <option key={scene.id} value={scene.id}>
                {scene.title}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onReset}
          className="mt-6 w-full rounded-xl bg-[#F1DFE4] p-3 font-bold text-[#7D5A64]"
        >
          Recomeçar aventura
        </button>
      </section>
    </div>
  );
}
