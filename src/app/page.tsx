import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getAdventureList } from "@/lib/adventures";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const adventures = await getAdventureList();

  return (
    <main className="min-h-screen px-5 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <Badge variant="secondary" className="uppercase tracking-[.18em]">
            RPG para brincar junto
          </Badge>
          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
            Aventuras de Dados
          </h1>
          <p className="mt-5 text-xl font-semibold leading-relaxed text-muted-foreground md:text-2xl">
            Histórias para imaginar, resolver pequenos problemas e aprender os
            números de 1 a 6 — sem perder nem procurar uma resposta “certa”.
          </p>
        </header>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          {adventures.map((adventure) => (
            <Card key={adventure.slug} className="overflow-hidden shadow-lg">
              <div className="grid min-h-64 place-items-center bg-gradient-to-br from-secondary via-mist to-sage text-9xl">
                {adventure.emoji}
              </div>

              <CardContent className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-3xl">{adventure.title}</CardTitle>
                  <Badge variant="butter" className="whitespace-nowrap">
                    {adventure.recommendedAge}
                  </Badge>
                </div>

                <CardDescription className="mt-3 text-lg leading-relaxed">
                  {adventure.description}
                </CardDescription>

                <Link
                  href={"/aventura/" + adventure.slug}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-6 w-full text-base",
                  )}
                >
                  Começar aventura →
                </Link>
              </CardContent>
            </Card>
          ))}

          <Card className="grid min-h-[360px] place-items-center border-dashed bg-card/65 text-center shadow-none">
            <CardContent className="p-8">
              <div className="text-6xl">➕</div>
              <CardTitle className="mt-4 text-2xl">Próxima aventura</CardTitle>
              <CardDescription className="mt-2 max-w-sm">
                A estrutura já está pronta para piratas, dinossauros, espaço,
                fundo do mar e outras histórias.
              </CardDescription>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
