import { HubArticle, SpokeArticle } from "@/lib/types";
import { hub as 부동산Hub, spokes as 부동산Spokes } from "./부동산";
import { hub as 근로Hub, spokes as 근로Spokes } from "./근로";
import { hub as 세금Hub, spokes as 세금Spokes } from "./세금";
import { hub as 금융Hub, spokes as 금융Spokes } from "./금융";
import { hub as 실업급여Hub, spokes as 실업급여Spokes } from "./실업급여";
import { hub as 복지Hub, spokes as 복지Spokes } from "./복지";
import { hub as 법률Hub, spokes as 법률Spokes } from "./법률";
import { hub as 퇴직Hub, spokes as 퇴직Spokes } from "./퇴직";
import { hub as 생활경제Hub, spokes as 생활경제Spokes } from "./생활경제";
import { hub as 보험Hub, spokes as 보험Spokes } from "./보험";
import { hub as 교육Hub, spokes as 교육Spokes } from "./교육";
import { hub as 창업Hub, spokes as 창업Spokes } from "./창업";

export const hubArticles: Record<string, HubArticle> = {
  부동산: 부동산Hub,
  근로: 근로Hub,
  세금: 세금Hub,
  금융: 금융Hub,
  실업급여: 실업급여Hub,
  복지: 복지Hub,
  법률: 법률Hub,
  퇴직: 퇴직Hub,
  생활경제: 생활경제Hub,
  보험: 보험Hub,
  교육: 교육Hub,
  창업: 창업Hub,
};

export const spokeArticles: Record<string, Record<string, SpokeArticle>> = {
  부동산: 부동산Spokes,
  근로: 근로Spokes,
  세금: 세금Spokes,
  금융: 금융Spokes,
  실업급여: 실업급여Spokes,
  복지: 복지Spokes,
  법률: 법률Spokes,
  퇴직: 퇴직Spokes,
  생활경제: 생활경제Spokes,
  보험: 보험Spokes,
  교육: 교육Spokes,
  창업: 창업Spokes,
};

export function getHubArticle(categorySlug: string): HubArticle | undefined {
  return hubArticles[categorySlug];
}

export function getSpokeArticle(
  categorySlug: string,
  spokeSlug: string
): SpokeArticle | undefined {
  return spokeArticles[categorySlug]?.[spokeSlug];
}

export function getAllSpokeArticles(): SpokeArticle[] {
  return Object.values(spokeArticles).flatMap((cat) => Object.values(cat));
}

export function getSpokesByCategory(categorySlug: string): SpokeArticle[] {
  return Object.values(spokeArticles[categorySlug] || {});
}

export function getSpokeArticleBySlug(slug: string): SpokeArticle | undefined {
  for (const spokes of Object.values(spokeArticles)) {
    if (spokes[slug]) return spokes[slug];
  }
  return undefined;
}
