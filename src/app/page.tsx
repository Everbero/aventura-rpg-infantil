import Link from "next/link";
import { getAdventureList } from "@/lib/adventures";

export const dynamic = "force-dynamic";

export default async function Home() {
  const adventureList = await getAdventureList();

  return (
    <main className="min-h-screen px-5 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full bg-[#E9E3F1] px-4 py-2 text-sm font-black uppercase tracking-[.18em] text-[#70658E]">
            RPG para brincar junto
          </div>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-[#393646] md:text-7xl">
            Aventuras de Dados
          </h1>
          <p className="mt-5 text-xl font-semibold leading-relaxed text-[#6E6978] md:text-2xl">
            Histórias para imaginar, resolver pequenos problemas e aprender os
            números de 1 a 6 — sem perder, morrer ou escolher uma resposta
            “certa”.
          </p>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          {adventureList.map((adventure) => (
            <article
              key={adventure.slug}
              className="overflow-hidden rounded-[2rem] border border-[#E1DCE6] bg-[#FFFDFC] shadow-[0_16px_50px_rgba(78,70,96,.10)]"
            >
              <div className="grid min-h-64 place-items-center bg-gradient-to-br from-[#E8E0EF] via-[#DCEAF0] to-[#DDE9D8] text-9xl">
                {adventure.emoji}
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-3xl font-black text-[#403C4A]">
                    {adventure.title}
                  </h2>
                  <span className="whitespace-nowrap rounded-full bg-[#F5E9BD] px-3 py-1 text-sm font-black text-[#6D603F]">
                    {adventure.recommendedAge}
                  </span>
                </div>
                <p className="mt-3 text-lg leading-relaxed text-[#726D78]">
                  {adventure.description}
                </p>
                <Link
                  href={"/aventura/" + adventure.slug}
                  className="mt-6 block rounded-2xl bg-[#9188B8] px-6 py-4 text-center text-xl font-black text-white transition hover:bg-[#8178A8]"
                >
                  Começar aventura →
                </Link>
              </div>
            </article>
          ))}

          <article className="grid min-h-[360px] place-items-center rounded-[2rem] border-2 border-dashed border-[#D9D3DE] bg-[#FCFAF8]/80 p-8 text-center">
            <div>
              <div className="text-6xl">➕</div>
              <h2 className="mt-4 text-2xl font-black text-[#46414F]">
                Próxima aventura
              </h2>
              <p className="mt-2 max-w-sm text-[#7C7682]">
                A estrutura já está pronta para piratas, dinossauros, espaço,
                fundo do mar e outras histórias.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
