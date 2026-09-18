import Image from "next/image";
import type { Scene } from "@/data/types";

export function SceneArtwork({ scene }: { scene: Scene }) {
  if (scene.image) {
    return (
      <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] md:min-h-[520px]">
        <Image src={scene.image} alt={`Ilustração de ${scene.title}`} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      className="relative min-h-[300px] overflow-hidden rounded-[2rem] shadow-inner md:min-h-[520px]"
      style={{ background: `linear-gradient(180deg, ${scene.art.sky} 0 62%, ${scene.art.ground} 62% 100%)` }}
      role="img"
      aria-label={`Ilustração simples de ${scene.title}`}
    >
      <div className="absolute left-[8%] top-[10%] size-16 rounded-full opacity-90 md:size-24" style={{ background: scene.art.accent, boxShadow: `0 0 60px ${scene.art.accent}` }} />
      <div className="absolute -bottom-16 -left-16 size-60 rounded-full bg-black/10 md:size-96" />
      <div className="absolute -bottom-20 right-[4%] size-52 rounded-full bg-white/10 md:size-80" />
      <div className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 text-[8rem] drop-shadow-2xl md:text-[13rem] floaty">
        {scene.art.emoji}
      </div>
      {scene.art.secondaryEmoji && (
        <div className="absolute right-[10%] top-[18%] rotate-6 text-6xl drop-shadow-lg md:text-8xl">
          {scene.art.secondaryEmoji}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 to-transparent px-7 pb-7 pt-24 text-white md:px-10 md:pb-10">
        <p className="text-sm font-bold uppercase tracking-[.22em] text-white/80">{scene.subtitle}</p>
        <h2 className="mt-2 text-3xl font-black md:text-5xl">{scene.title}</h2>
      </div>
    </div>
  );
}
