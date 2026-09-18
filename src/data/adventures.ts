import { florestaEncantada } from "./floresta-encantada";
import type { Adventure } from "./types";

export const adventures: Record<string, Adventure> = {
  [florestaEncantada.slug]: florestaEncantada,
};

export const adventureList = Object.values(adventures);
