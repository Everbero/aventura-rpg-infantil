"use client";

import { useEffect, useMemo, useState } from "react";
import { Dice } from "./Dice";
import { ParentPanel } from "./ParentPanel";
import { SceneArtwork } from "./SceneArtwork";
import type { Adventure, DiceMode, DiceValue } from "@/data/types";

type Phase = "story" | "roll" | "result";

type SavedGame = {
  sceneId: string;
  stars: number;
  visited: string[];
};

const moodStyle = {
  twist: "bg-amber-50 border-amber-300 text-amber-950",
  help: "bg-sky-50 border-sky-300 text-sky-950",
  retry: "bg-fuchsia-50 border-fuchsia-300 text-fuchsia-950",
  success: "bg-emerald-50 border-emerald-300 text-emerald-950",
  treasure: "bg-yellow-50 border-yellow-300 text-yellow-950",
  magic: "bg-violet-50 border-violet-300 text-violet-950",
};

const physicalDieFaces: Record<DiceValue, string> = {
  1: "⚀",
  2: "⚁",
  3: "⚂",
  4: "⚃",
  5: "⚄",
  6: "⚅",
};

export function AdventureGame({ adventure }: { adventure: Adventure }) {
  const storageKey = "aventura-rpg:" + adventure.slug;
  const diceModeStorageKey = "aventura-rpg:dice-mode";
  const [sceneId, setSceneId] = useState(adventure.startScene);
  const [stars, setStars] = useState(0);
  const [visited, setVisited] = useState<string[]>([adventure.startScene]);
  const [phase, setPhase] = useState<Phase>("story");
  const [roll, setRoll] = useState<DiceValue>(1);
  const [rolling, setRolling] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [parentOpen, setParentOpen] = useState(false);
  const [forcedRoll, setForcedRoll] = useState<DiceValue | null>(null);
  const [diceMode, setDiceMode] = useState<DiceMode>("digital");

  const scene = adventure.scenes[sceneId];
  const outcome = useMemo(() => scene.outcomes[roll], [scene, roll]);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        const save = JSON.parse(stored) as SavedGame;
        if (adventure.scenes[save.sceneId]) {
          setSceneId(save.sceneId);
          setStars(save.stars ?? 0);
          setVisited(save.visited?.length ? save.visited : [save.sceneId]);
        }
      } catch {}
    }

    const storedDiceMode = window.localStorage.getItem(diceModeStorageKey);
    if (storedDiceMode === "digital" || storedDiceMode === "physical") {
      setDiceMode(storedDiceMode);
    }

    setHydrated(true);
  }, [adventure.scenes, diceModeStorageKey, storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify({ sceneId, stars, visited } satisfies SavedGame));
  }, [hydrated, sceneId, stars, visited, storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(diceModeStorageKey, diceMode);
  }, [diceMode, diceModeStorageKey, hydrated]);

  function speakScene() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(scene.title + ". " + scene.narration + " " + scene.challenge);
    speech.lang = "pt-BR";
    speech.rate = 0.88;
    window.speechSynthesis.speak(speech);
  }

  async function fullscreen() {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  }

  function applyRoll(chosen: DiceValue) {
    setRoll(chosen);
    setStars((current) => current + scene.outcomes[chosen].stars);
    setForcedRoll(null);
    setPhase("result");
  }

  function doRoll() {
    if (rolling) return;
    setRolling(true);
    const chosen = forcedRoll ?? ((Math.floor(Math.random() * 6) + 1) as DiceValue);
    let ticks = 0;
    const timer = window.setInterval(() => {
      setRoll((Math.floor(Math.random() * 6) + 1) as DiceValue);
      ticks += 1;
      if (ticks >= 7) {
        window.clearInterval(timer);
        setRolling(false);
        applyRoll(chosen);
      }
    }, 75);
  }

  function registerPhysicalRoll(chosen: DiceValue) {
    if (rolling) return;
    applyRoll(chosen);
  }

  function choose(next: string) {
    setSceneId(next);
    setVisited((current) => [...current, next]);
    setPhase("story");
    setRoll(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setSceneId(adventure.startScene);
    setStars(0);
    setVisited([adventure.startScene]);
    setPhase("story");
    setRoll(1);
    setForcedRoll(null);
    window.localStorage.removeItem(storageKey);
    setParentOpen(false);
  }

  if (!hydrated) return <main className="grid min-h-screen place-items-center text-xl font-bold">Preparando a aventura…</main>;

  return (
    <main className="min-h-screen p-3 md:p-6">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-4 flex items-center justify-between gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm backdrop-blur md:mb-6 md:px-6">
          <div className="min-w-0">
            <p className="truncate text-xs font-black uppercase tracking-[.18em] text-violet-600">{adventure.title}</p>
            <p className="mt-1 text-sm font-bold text-slate-500">Cena {visited.length} · ⭐ {stars}</p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <button
              onClick={() => setParentOpen(true)}
              className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-black text-amber-900 md:px-4"
              title="Configurar o tipo de dado"
            >
              🎲 <span className="hidden sm:inline">{diceMode === "digital" ? "Digital" : "Físico"}</span>
            </button>
            <button onClick={speakScene} className="rounded-xl bg-sky-50 px-3 py-2 text-sm font-black text-sky-800 md:px-4">🔊 <span className="hidden sm:inline">Narrar</span></button>
            <button onClick={fullscreen} className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-800 md:px-4">⛶ <span className="hidden sm:inline">Tela cheia</span></button>
            <button onClick={() => setParentOpen(true)} className="rounded-xl bg-violet-50 px-3 py-2 text-sm font-black text-violet-800 md:px-4">⚙ <span className="hidden sm:inline">Mestre</span></button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr] lg:gap-6">
          <SceneArtwork scene={scene} />

          <section className="flex min-h-[420px] flex-col rounded-[2rem] bg-white p-5 shadow-xl md:p-8">
            {phase === "story" && (
              <>
                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-black text-violet-700">💭 Hora de imaginar</div>
                <p className="text-xl font-semibold leading-relaxed text-slate-700 md:text-2xl">{scene.narration}</p>
                <div className="mt-6 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/60 p-5">
                  <p className="text-sm font-black uppercase tracking-[.16em] text-violet-600">Desafio</p>
                  <p className="mt-2 text-2xl font-black leading-tight text-violet-950 md:text-3xl">{scene.challenge}</p>
                </div>
                <div className="mt-auto pt-7">
                  <p className="mb-3 text-center text-sm font-semibold text-slate-500">Deixe a criança explicar a ideia antes de continuar.</p>
                  <button onClick={() => setPhase("roll")} className="w-full rounded-2xl bg-violet-700 px-6 py-5 text-xl font-black text-white shadow-lg transition hover:bg-violet-800 active:scale-[.99]">Já pensamos numa solução! →</button>
                </div>
              </>
            )}

            {phase === "roll" && diceMode === "digital" && (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <p className="text-sm font-black uppercase tracking-[.2em] text-violet-600">Agora conte os pontinhos</p>
                <h3 className="mt-2 text-3xl font-black md:text-4xl">Jogue o dado</h3>
                <div className="my-7"><Dice value={roll} rolling={rolling} /></div>
                <p className="mb-5 max-w-md text-slate-500">O dado não diz que a ideia foi errada. Ele só conta que tipo de surpresa aconteceu.</p>
                <button disabled={rolling} onClick={doRoll} className="w-full rounded-2xl bg-amber-400 px-6 py-5 text-2xl font-black text-amber-950 shadow-lg transition hover:bg-amber-300 disabled:opacity-60">🎲 {rolling ? "Rolando…" : "Jogar dado"}</button>
              </div>
            )}

            {phase === "roll" && diceMode === "physical" && (
              <div className="flex flex-1 flex-col justify-center text-center">
                <p className="text-sm font-black uppercase tracking-[.2em] text-violet-600">Dado físico</p>
                <h3 className="mt-2 text-3xl font-black md:text-4xl">Jogue o dado de verdade!</h3>
                <p className="mx-auto mt-3 max-w-md text-slate-500">Depois, toque abaixo no número que apareceu.</p>
                <div className="mt-7 grid grid-cols-3 gap-3">
                  {([1, 2, 3, 4, 5, 6] as DiceValue[]).map((value) => (
                    <button
                      key={value}
                      onClick={() => registerPhysicalRoll(value)}
                      aria-label={"Registrar resultado " + value}
                      className="rounded-2xl border-2 border-slate-100 bg-slate-50 px-3 py-4 transition hover:border-violet-300 hover:bg-violet-50 active:scale-[.98]"
                    >
                      <span className="block text-5xl leading-none text-violet-900">{physicalDieFaces[value]}</span>
                      <span className="mt-2 block text-xl font-black text-slate-900">{value}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {phase === "result" && (
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-5">
                  <Dice value={roll} />
                  <div>
                    <p className="text-sm font-black uppercase tracking-[.2em] text-violet-600">Você tirou</p>
                    <p className="text-6xl font-black text-violet-950">{roll}</p>
                  </div>
                </div>

                <div className={"mt-6 rounded-2xl border-2 p-5 " + moodStyle[outcome.mood]}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-black">{outcome.title}</h3>
                    {outcome.stars > 0 && <span className="whitespace-nowrap rounded-full bg-white/70 px-3 py-1 font-black">+{outcome.stars} ⭐</span>}
                  </div>
                  <p className="mt-2 text-lg font-semibold leading-relaxed">{outcome.text}</p>
                </div>

                <div className="mt-auto pt-7">
                  {scene.final ? (
                    <div className="text-center">
                      <p className="mb-4 text-2xl font-black">🎉 Fim da aventura · {stars} estrelas!</p>
                      <button onClick={reset} className="w-full rounded-2xl bg-violet-700 px-6 py-5 text-xl font-black text-white">Jogar de novo</button>
                    </div>
                  ) : (
                    <>
                      <p className="mb-3 text-center text-sm font-black uppercase tracking-[.16em] text-slate-500">Para onde vamos agora?</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {scene.choices.map((choice) => {
                          const destination = adventure.scenes[choice.next];
                          return (
                            <button
                              key={choice.next + "-" + choice.description}
                              onClick={() => choose(choice.next)}
                              className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-5 text-left transition hover:border-violet-300 hover:bg-violet-50 active:scale-[.99]"
                              aria-label={"Ir para " + (destination?.title ?? choice.description)}
                            >
                              <span className="text-4xl">{choice.icon}</span>
                              <span className="mt-3 block text-xl font-black text-slate-950">
                                {destination?.title ?? choice.description}
                              </span>
                              <span className="mt-1 block text-sm font-semibold text-slate-500">{choice.description}</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="mt-4 rounded-2xl bg-white/70 p-4 text-sm text-slate-600 shadow-sm md:mt-6 md:px-6">
          <strong className="text-slate-900">Dica para o adulto:</strong> {scene.parentPrompt}
        </aside>
      </div>

      <ParentPanel
        open={parentOpen}
        onClose={() => setParentOpen(false)}
        adventure={adventure}
        currentScene={sceneId}
        diceMode={diceMode}
        onDiceModeChange={setDiceMode}
        forcedRoll={forcedRoll}
        onForceRoll={setForcedRoll}
        onJump={(next) => { setSceneId(next); setVisited((current) => [...current, next]); setPhase("story"); setParentOpen(false); }}
        onReset={reset}
      />
    </main>
  );
}
