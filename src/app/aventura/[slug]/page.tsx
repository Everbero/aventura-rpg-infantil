import { notFound } from "next/navigation";
import { AdventureGame } from "@/components/AdventureGame";
import { adventures } from "@/data/adventures";

export function generateStaticParams() {
  return Object.keys(adventures).map((slug) => ({ slug }));
}

export default async function AdventurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const adventure = adventures[slug];
  if (!adventure) notFound();
  return <AdventureGame adventure={adventure} />;
}
