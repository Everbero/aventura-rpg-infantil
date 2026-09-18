import { notFound } from "next/navigation";
import { AdventureGame } from "@/components/AdventureGame";
import { getAdventureBySlug } from "@/lib/adventures";

export const dynamic = "force-dynamic";

export default async function AdventurePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const adventure = await getAdventureBySlug(slug);

  if (!adventure) notFound();

  return <AdventureGame adventure={adventure} />;
}
