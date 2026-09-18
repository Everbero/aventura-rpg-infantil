import Link from "next/link";
import { adventureList } from "@/data/adventures";

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-black uppercase tracking-[.18em] text-violet-700">RPG para brincar junto</div>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 md:text-7xl">Aventuras de Dados</h1>
          <p className="mt-5 text-xl font-semibold leading-relaxed text-slate-600 md:text-2xl">Histórias para imaginar, resolver pequenos problemas e aprender os números de 1 a 6 — sem perder, morrer ou escolher uma resposta “certa”.</p>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          {adventureList.map((adventure) => (
            <article key={adventure.slug} className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
              <div className="grid min-h-64 place-items-center bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-400 text-9xl">{adventure.emoji}</div>
              <div className="p-7">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-3xl font-black text-slate-950">{adventure.title}</h2>
                  <span className="whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-sm font-black text-amber-900">{adventure.recommendedAge}</span>
                </div>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{adventure.description}</p>
                <Link href={`/aventura/${adventure.slug}`} className="mt-6 block rounded-2xl bg-violet-700 px-6 py-4 text-center text-xl font-black text-white transition hover:bg-violet-800">Começar aventura →</Link>
              </div>
            </article>
          ))}

          <article className="grid min-h-[360px] place-items-center rounded-[2rem] border-2 border-dashed border-slate-300 bg-white/45 p-8 text-center">
            <div>
              <div className="text-6xl">➕</div>
              <h2 className="mt-4 text-2xl font-black">Próxima aventura</h2>
              <p className="mt-2 max-w-sm text-slate-500">A estrutura já está pronta para piratas, dinossauros, espaço, fundo do mar e outras histórias.</p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
