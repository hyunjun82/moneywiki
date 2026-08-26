import type { DownloadCategory, DownloadItem } from "./types";
import { CATEGORY_LABEL } from "./types";
import software from "./items/software.json";
import driver from "./items/driver.json";
import game from "./items/game.json";
import font from "./items/font.json";
import app from "./items/app.json";

export type { DownloadItem, DownloadBuild, DownloadCategory } from "./types";
export { CATEGORY_LABEL } from "./types";

/**
 * 카테고리별 JSON 하나가 그 카테고리의 전부다.
 * 항목이 몇 만 개가 되어도 파일은 여기 다섯 개, 라우트는 네 개로 고정된다.
 */
const BY_CATEGORY: Record<DownloadCategory, DownloadItem[]> = {
  software: software as DownloadItem[],
  driver: driver as DownloadItem[],
  game: game as DownloadItem[],
  font: font as DownloadItem[],
  app: app as DownloadItem[],
};

export const ALL_ITEMS: DownloadItem[] = Object.values(BY_CATEGORY).flat();

const INDEX = new Map(ALL_ITEMS.map((it) => [it.slug, it]));

export function getItem(slug: string): DownloadItem | undefined {
  return INDEX.get(decodeURIComponent(slug));
}

export function itemsIn(category: DownloadCategory): DownloadItem[] {
  return BY_CATEGORY[category] ?? [];
}

export const CATEGORIES = Object.keys(BY_CATEGORY) as DownloadCategory[];

export function categoryLabel(c: DownloadCategory) {
  return CATEGORY_LABEL[c];
}

/** 상세 페이지 주소 */
export function itemHref(it: DownloadItem) {
  return `/download/${it.category}/${encodeURIComponent(it.slug)}`;
}

/** 게이트 주소 — b 는 builds 배열의 몇 번째인지 */
export function gateHref(it: DownloadItem, b = 0) {
  return `/download/go/${encodeURIComponent(it.slug)}${b ? `?b=${b}` : ""}`;
}

/** 게이트·상세 아래에 붙이는 '같이 많이 받는 파일'. 자기 자신은 뺀다. */
export function recommended(exclude?: string, n = 8): DownloadItem[] {
  return ALL_ITEMS.filter((it) => it.slug !== exclude).slice(0, n);
}
