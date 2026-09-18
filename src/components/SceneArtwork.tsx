import Image from "next/image";
import type { Scene } from "@/data/types";

export function SceneArtwork({ scene }: { scene: Scene }) {
  if (scene.image) {
    return (
      <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-[#E4DEE8] md:min-h-[520px]">
        <Image
          src={scene.image}
          alt={"Ilustração de " + scene.title}
          fill
          priority
          className="object-cover saturate-[.82] contrast-[.94]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#544C5F]/35 via-transparent to-[#FFF8F0]/5" />
      </div>
    );
  }

  return (
    <div
      className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-[#E0D9E4] shadow-inner md:min-h-[520px]"
      style={{
        background:
          "linear-gradient(180deg, " +
          scene.art.sky +
          " 0 62%, " +
          scene.art.ground +
          " 62% 100%)",
      }}
      role="img"
      aria-label={"Ilustração simples de " + scene.title}
    >
      <div
        className="absolute left-[8%] top-[10%] size-16 rounded-full opacity-75 md:size-24"
        style={{
          background: scene.art.accent,
          boxShadow: "0 0 55px " + scene.art.accent,
        }}
      />

      <div className="absolute -bottom-16 -left-16 size-60 rounded-full bg-[#5E5966]/[.055] md:size-96" />
      <div className="absolute -bottom-20 right-[4%] size-52 rounded-full bg-white/20 md:size-80" />

      <div className="floaty absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 text-[8rem] drop-shadow-[0_8px_18px_rgba(76,69,84,.15)] md:text-[13rem]">
        {scene.art.emoji}
      </div>

      {scene.art.secondaryEmoji && (
        <div className="absolute right-[10%] top-[18%] rotate-6 text-6xl opacity-90 drop-shadow-[0_6px_16px_rgba(76,69,84,.12)] md:text-8xl">
          {scene.art.secondaryEmoji}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#4B4552]/45 to-transparent px-7 pb-7 pt-24 text-white md:px-10 md:pb-10">
        <p className="text-sm font-bold uppercase tracking-[.22em] text-white/85">
          {scene.subtitle}
        </p>
        <h2 className="mt-2 text-3xl font-black md:text-5xl">
          {scene.title}
        </h2>
      </div>
    </div>
  );
}
