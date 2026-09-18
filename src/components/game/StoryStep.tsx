"use client";

import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Scene } from "@/data/types";

export function StoryStep({
  scene,
  onContinue,
}: {
  scene: Scene;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <Badge variant="secondary">💭 Hora de imaginar</Badge>

      <p className="mt-5 text-xl font-semibold leading-relaxed text-foreground/85 md:text-2xl">
        {scene.narration}
      </p>

      <Card className="mt-6 border-dashed bg-secondary/45 shadow-none">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[.16em] text-primary">
            <MessageCircleQuestion className="size-4" />
            Desafio
          </div>
          <p className="mt-2 text-2xl font-black leading-tight md:text-3xl">
            {scene.challenge}
          </p>
        </CardContent>
      </Card>

      <div className="mt-auto pt-7">
        <p className="mb-3 text-center text-sm font-semibold text-muted-foreground">
          Deixe a criança explicar a ideia antes de continuar.
        </p>
        <Button size="xl" className="w-full" onClick={onContinue}>
          Já pensamos numa solução!
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
