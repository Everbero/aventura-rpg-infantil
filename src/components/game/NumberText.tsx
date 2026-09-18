import type { ReactNode } from "react";
import { numberWord } from "@/lib/numbers";
import type { LearningConfig } from "@/data/types";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
}

export function NumberText({
  text,
  learning,
  randomNumber,
}: {
  text: string;
  learning: LearningConfig;
  randomNumber?: number;
}) {
  const terms = new Set<string>();

  if (learning.fixed) {
    terms.add(String(learning.fixed.value));
    terms.add(numberWord(learning.fixed.value, learning.fixed.gender));
  }

  if (learning.random && randomNumber) {
    terms.add(String(randomNumber));
    terms.add(numberWord(randomNumber, learning.random.gender));
  }

  const words = [...terms].filter(Boolean);
  if (!words.length) return <>{text}</>;

  const pattern = new RegExp(
    "(" + words.map(escapeRegExp).sort((a, b) => b.length - a.length).join("|") + ")",
    "gi",
  );

  return (
    <>
      {text.split(pattern).map((part, index): ReactNode => {
        const highlighted = words.some(
          (word) => word.toLocaleLowerCase("pt-BR") === part.toLocaleLowerCase("pt-BR"),
        );

        return highlighted ? (
          <mark
            key={index}
            className="rounded-md bg-butter/70 px-1 font-black text-butter-foreground"
          >
            {part}
          </mark>
        ) : (
          part
        );
      })}
    </>
  );
}
