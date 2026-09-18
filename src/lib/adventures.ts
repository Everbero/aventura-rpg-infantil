import type {
  Adventure,
  DiceOutcome,
  DiceValue,
  LearningConfig,
  Scene,
  SceneArt,
} from "@/data/types";
import { createPublicSupabaseClient } from "./supabase";

export type AdventureCard = Pick<
  Adventure,
  "slug" | "title" | "description" | "emoji" | "recommendedAge" | "learningGoals"
>;

type AdventureRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  emoji: string | null;
  recommended_age: string | null;
  learning_goals: string[] | null;
  start_scene_id: string | null;
};

type SceneRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  narration: string;
  challenge: string;
  parent_prompt: string | null;
  image_path: string | null;
  art: SceneArt | null;
  learning_config: LearningConfig | null;
  is_final: boolean;
  sort_order: number;
};

type OutcomeRow = {
  scene_id: string;
  dice_value: number;
  title: string;
  text: string;
  stars: number;
  mood: DiceOutcome["mood"];
};

type ChoiceRow = {
  scene_id: string;
  label: string;
  description: string;
  icon: string | null;
  next_scene_id: string;
  sort_order: number;
};

export async function getAdventureList(): Promise<AdventureCard[]> {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("adventures")
    .select("slug,title,description,emoji,recommended_age,learning_goals")
    .eq("published", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Erro carregando aventuras:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    emoji: row.emoji ?? "✨",
    recommendedAge: row.recommended_age ?? "",
    learningGoals: Array.isArray(row.learning_goals) ? row.learning_goals : [],
  }));
}

export async function getAdventureBySlug(
  slug: string,
): Promise<Adventure | null> {
  const supabase = createPublicSupabaseClient();

  const { data: adventureData, error: adventureError } = await supabase
    .from("adventures")
    .select(
      "id,slug,title,description,emoji,recommended_age,learning_goals,start_scene_id",
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (adventureError) {
    console.error("Erro carregando aventura:", adventureError);
    return null;
  }

  const adventure = adventureData as AdventureRow | null;
  if (!adventure) return null;

  const { data: sceneData, error: sceneError } = await supabase
    .from("scenes")
    .select(
      "id,slug,title,subtitle,narration,challenge,parent_prompt,image_path,art,learning_config,is_final,sort_order",
    )
    .eq("adventure_id", adventure.id)
    .order("sort_order", { ascending: true });

  if (sceneError) {
    console.error("Erro carregando cenas:", sceneError);
    return null;
  }

  const sceneRows = (sceneData ?? []) as SceneRow[];
  if (sceneRows.length === 0) return null;

  const sceneIds = sceneRows.map((scene) => scene.id);

  const [
    { data: outcomeData, error: outcomeError },
    { data: choiceData, error: choiceError },
  ] = await Promise.all([
    supabase
      .from("scene_outcomes")
      .select("scene_id,dice_value,title,text,stars,mood")
      .in("scene_id", sceneIds)
      .order("dice_value", { ascending: true }),
    supabase
      .from("choices")
      .select("scene_id,label,description,icon,next_scene_id,sort_order")
      .in("scene_id", sceneIds)
      .order("sort_order", { ascending: true }),
  ]);

  if (outcomeError || choiceError) {
    console.error("Erro carregando conteúdo da aventura:", {
      outcomeError,
      choiceError,
    });
    return null;
  }

  const outcomeRows = (outcomeData ?? []) as OutcomeRow[];
  const choiceRows = (choiceData ?? []) as ChoiceRow[];
  const slugBySceneId = new Map(sceneRows.map((scene) => [scene.id, scene.slug]));
  const scenes: Record<string, Scene> = {};

  for (const row of sceneRows) {
    const outcomes = {} as Record<DiceValue, DiceOutcome>;

    for (const outcome of outcomeRows.filter((item) => item.scene_id === row.id)) {
      outcomes[outcome.dice_value as DiceValue] = {
        title: outcome.title,
        text: outcome.text,
        stars: outcome.stars,
        mood: outcome.mood,
      };
    }

    const choices = choiceRows
      .filter((choice) => choice.scene_id === row.id)
      .map((choice) => ({
        label: choice.label,
        description: choice.description,
        icon: choice.icon ?? "→",
        next: slugBySceneId.get(choice.next_scene_id) ?? "",
      }))
      .filter((choice) => choice.next);

    scenes[row.slug] = {
      id: row.slug,
      title: row.title,
      subtitle: row.subtitle ?? "",
      narration: row.narration,
      challenge: row.challenge,
      parentPrompt: row.parent_prompt ?? "",
      art: row.art ?? {
        emoji: "✨",
        sky: "#E7E2EF",
        ground: "#D5E1D0",
        accent: "#F5E8B8",
      },
      learning: row.learning_config ?? { skills: [] },
      image: row.image_path ?? undefined,
      outcomes,
      choices,
      final: row.is_final,
    };
  }

  const startScene =
    sceneRows.find((scene) => scene.id === adventure.start_scene_id)?.slug ??
    sceneRows[0].slug;

  return {
    slug: adventure.slug,
    title: adventure.title,
    description: adventure.description ?? "",
    emoji: adventure.emoji ?? "✨",
    recommendedAge: adventure.recommended_age ?? "",
    learningGoals: Array.isArray(adventure.learning_goals)
      ? adventure.learning_goals
      : [],
    startScene,
    scenes,
  };
}
