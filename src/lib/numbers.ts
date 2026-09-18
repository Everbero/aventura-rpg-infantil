import type { NumberGender } from "@/data/types";

const masculine = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez"] as const;
const feminine = ["", "uma", "duas", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez"] as const;

export function numberWord(value: number, gender: NumberGender = "masculine") {
  if (value < 1 || value > 10) return String(value);
  return (gender === "feminine" ? feminine : masculine)[value];
}

export function randomInt(min: number, max: number) {
  const low = Math.max(1, Math.min(10, Math.ceil(min)));
  const high = Math.max(low, Math.min(10, Math.floor(max)));
  return Math.floor(Math.random() * (high - low + 1)) + low;
}
