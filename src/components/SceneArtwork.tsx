import Image from "next/image";
import { NumberText } from "@/components/game/NumberText";
import type { Scene } from "@/data/types";

const emojiPositions = [
  "left-[7%] top-[13%]",
  "left-[20%] top-[27%]",
  "left-[36%] top-[13%]",
  "right-[36%] top-[25%]",
  "right-[20%] top-[11%]",
  "right-[7%] top-[30%]",
  "left-[12%] top-[48%]",
  "left-[29%] top-[57%]",
  "right-[28%] top-[50%]",
  "right-[10%] top-[59%]",
];

function FixedVisual({ scene }: { scene: Scene }) {
  const fixed = scene.learning.fixed;
  if (!fixed) return null;

  if (fixed.visual === "trails") {
    return (
      <div className="absolute inset-x-0 bottom-[12%] top-[43%]" aria-label="duas trilhas">
        <div className="absolute bottom-0 left-[15%] h-[95%] w-[18%] origin-bottom rotate-[18deg] rounded-[50%_50%_15%_15%] bg-[#D8C6AA]/80 shadow-inner" />
        <div className="absolute bottom-0 right-[15%] h-[95%] w-[18%] origin-bottom -rotate-[18deg] rounded-[50%_50%_15%_15%] bg-[#D8C6AA]/80 shadow-inner" />
      </div>
    );
  }

  if (!fixed.emoji) return null;

  return (
    <div
      className="absolute inset-x-[8%] top-[34%] flex flex-wrap justify-center gap-3 text-4xl md:text-5xl"
      aria-label={fixed.value + " " + fixed.label}
    >
      {Array.from({ length: fixed.value }, (_, index) => (
        <span key={index} className="drop-shadow-sm">
          {fixed.emoji}
        </span>
      ))}
    </div>
  );
}

function RandomVisual({
  scene,
  value,
}: {
  scene: Scene;
  value?: number;
}) {
  const random = scene.learning.random;
  if (!random || value === undefined) return null;

  return (
    <div className="absolute inset-0" aria-label={value + " " + (value === 1 ? random.singular : random.plural)}>
      {Array.from({ length: value }, (_, index) => (
        <span
          key={index}
          className={
            "absolute z-20 text-3xl drop-shadow-sm md:text-4xl " +
            emojiPositions[index % emojiPositions.length]
          }
        >
          {random.emoji}
        </span>
      ))}
    </div>
  );
}

export function SceneArtwork({
  scene,
  randomNumber,
}: {
  scene: Scene;
  randomNumber?: number;
}) {
  return (
    <div
      className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-border shadow-inner md:min-h-[520px]"
      style={
        scene.image
          ? undefined
          : {
              background:
                "linear-gradient(180deg, " +
                scene.art.sky +
                " 0 62%, " +
                scene.art.ground +
                " 62% 100%)",
            }
      }
      role="img"
      aria-label={"Ilustração de " + scene.title}
    >
      {scene.image && (
        <>
          <Image
            src={scene.image}
            alt=""
            fill
            priority
            className="object-cover saturate-[.78] contrast-[.93]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-card/5" />
        </>
      )}

      {!scene.image && (
        <>
          <div
            className="absolute left-[8%] top-[10%] size-16 rounded-full opacity-70 md:size-24"
            style={{
              background: scene.art.accent,
              boxShadow: "0 0 55px " + scene.art.accent,
            }}
          />
          <div className="absolute -bottom-16 -left-16 size-60 rounded-full bg-foreground/[.05] md:size-96" />
          <div className="absolute -bottom-20 right-[4%] size-52 rounded-full bg-white/20 md:size-80" />

          <FixedVisual scene={scene} />

          {scene.learning.fixed?.emoji !== scene.art.emoji && (
            <div className="floaty absolute left-1/2 top-[42%] z-10 -translate-x-1/2 -translate-y-1/2 text-[7rem] drop-shadow-sm md:text-[10rem]">
              {scene.art.emoji}
            </div>
          )}

          {scene.art.secondaryEmoji && (
            <div className="absolute right-[8%] top-[18%] z-10 rotate-6 text-5xl opacity-80 md:text-7xl">
              {scene.art.secondaryEmoji}
            </div>
          )}
        </>
      )}

      <RandomVisual scene={scene} value={randomNumber} />

      <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-foreground/55 to-transparent px-7 pb-7 pt-24 text-white md:px-10 md:pb-10">
        <p className="text-sm font-bold uppercase tracking-[.22em] text-white/85">
          {scene.subtitle}
        </p>
        <h2 className="mt-2 text-3xl font-black md:text-5xl">
          <NumberText
            text={scene.title}
            learning={scene.learning}
            randomNumber={randomNumber}
          />
        </h2>
      </div>
    </div>
  );
}
