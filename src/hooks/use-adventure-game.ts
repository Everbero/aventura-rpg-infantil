"use client";

import { useEffect, useState } from "react";
import type { Adventure, DiceMode, DiceValue } from "@/data/types";

export type GamePhase = "story" | "roll" | "result";

type SavedGame = {
  sceneId: string;
  stars: number;
  visited: string[];
};

export function useAdventureGame(adventure: Adventure) {
  const storageKey = "aventura-rpg:" + adventure.slug;
  const diceModeStorageKey = "aventura-rpg:dice-mode";

  const [sceneId, setSceneId] = useState(adventure.startScene);
  const [stars, setStars] = useState(0);
  const [visited, setVisited] = useState<string[]>([adventure.startScene]);
  const [phase, setPhase] = useState<GamePhase>("story");
  const [roll, setRoll] = useState<DiceValue>(1);
  const [rolling, setRolling] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [parentOpen, setParentOpen] = useState(false);
  const [forcedRoll, setForcedRoll] = useState<DiceValue | null>(null);
  const [diceMode, setDiceMode] = useState<DiceMode>("digital");

  const scene = adventure.scenes[sceneId];
  const outcome = scene.outcomes[roll];

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

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ sceneId, stars, visited } satisfies SavedGame),
    );
  }, [hydrated, sceneId, stars, storageKey, visited]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(diceModeStorageKey, diceMode);
  }, [diceMode, diceModeStorageKey, hydrated]);

  function applyRoll(value: DiceValue) {
    setRoll(value);
    setStars((current) => current + scene.outcomes[value].stars);
    setForcedRoll(null);
    setPhase("result");
  }

  function rollDigital() {
    if (rolling) return;

    setRolling(true);
    const finalValue =
      forcedRoll ?? ((Math.floor(Math.random() * 6) + 1) as DiceValue);
    let ticks = 0;

    const timer = window.setInterval(() => {
      setRoll((Math.floor(Math.random() * 6) + 1) as DiceValue);
      ticks += 1;

      if (ticks >= 7) {
        window.clearInterval(timer);
        setRolling(false);
        applyRoll(finalValue);
      }
    }, 75);
  }

  function choose(next: string) {
    setSceneId(next);
    setVisited((current) => [...current, next]);
    setPhase("story");
    setRoll(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function jumpTo(next: string) {
    setSceneId(next);
    setVisited((current) => [...current, next]);
    setPhase("story");
    setParentOpen(false);
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

  function narrate() {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(
      scene.title + ". " + scene.narration + " " + scene.challenge,
    );
    speech.lang = "pt-BR";
    speech.rate = 0.88;
    window.speechSynthesis.speak(speech);
  }

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.();
      return;
    }

    await document.exitFullscreen?.();
  }

  return {
    scene,
    stars,
    sceneNumber: visited.length,
    phase,
    setPhase,
    roll,
    rolling,
    outcome,
    hydrated,
    parentOpen,
    setParentOpen,
    forcedRoll,
    setForcedRoll,
    diceMode,
    setDiceMode,
    rollDigital,
    registerPhysicalRoll: applyRoll,
    choose,
    jumpTo,
    reset,
    narrate,
    toggleFullscreen,
  };
}
