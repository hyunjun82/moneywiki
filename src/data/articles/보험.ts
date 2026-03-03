import { HubArticle, SpokeArticle } from "@/lib/types";

export const hub: HubArticle = {
  categorySlug: "보험",
  datePublished: "2026-03-03",
  dateModified: "2026-03-03",
  title: "",
  h1: "",
  metaDescription: "",
  description: "",
  heroDescription: "",
  spokes: [],
};

const spokeList: SpokeArticle[] = [
];

export const spokes: Record<string, SpokeArticle> = Object.fromEntries(
  spokeList.map((s) => [s.slug, s])
);
