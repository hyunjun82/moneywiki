import type { Metadata } from "next";
import BanksView from "@/components/fx/BanksView";
import { banksFaq, bestLabel, counterPay, rankBanks } from "@/components/fx/fxDerive";
import { korDate, won } from "@/components/fx/fxCore";
import { loadFx, trimFx } from "@/components/fx/snapshot";
import { JsonLd, breadcrumbLd, faqLd, webPageLd } from "@/components/fx/ld";
import type { FxData } from "@/components/fx/fxData";

/**
 * /fx/banks — 은행별 환전 수수료·우대율 비교
 *
 * 제목·설명 단어는 네이버 자동완성 실측(2026-10-22): 은행별 환전 수수료 비교 · 은행별 환전 우대율 비교 · 은행 환전 수수료 ·
 * 환전 우대율 · 달러 환전 수수료 · 엔화 환전 수수료
 */
function pageMeta(data: FxData) {
  const ranked = rankBanks(data, "USD", 1000);
  const counter = counterPay(data, "USD", 1000);
  const jRanked = rankBanks(data, "JPY", 100000);
  const title =
    ranked.length && counter
      ? `은행별 환전 수수료 비교 — 달러·엔화 우대율 순위, 1,000달러 최저 ${won(ranked[0].fee)}원`
      : "은행별 환전 수수료 비교 — 달러·엔화 우대율 순위";
  const description =
    `은행별 환전 수수료 비교·은행별 환전 우대율 비교 — 은행 16곳 달러 환전 수수료·엔화 환전 수수료와 앱 최대 우대율(은행연합회 공시, 최신 ${korDate(data.banks?.latestAsOf ?? undefined)}). ` +
    (ranked.length && counter
      ? `1,000달러를 살 때 수수료 최저 ${bestLabel(ranked)} ${won(ranked[0].fee)}원, 우대 없는 창구 ${won(counter.fee)}원. `
      : "") +
    (jRanked.length ? `10만 엔은 최저 ${bestLabel(jRanked)} ${won(jRanked[0].fee)}원. ` : "") +
    "유로·베트남 동 등 통화 15종별로 가장 싼 은행을 정리했습니다.";
  return { title, description };
}

export function generateMetadata(): Metadata {
  const { title, description } = pageMeta(loadFx());
  return {
    title: { absolute: title },
    description,
    keywords: ["은행별 환전 수수료 비교", "은행별 환전 우대율 비교", "은행 환전 수수료", "환전 우대율", "달러 환전 수수료", "엔화 환전 수수료", "은행별 환전 비교", "환전 수수료"],
    alternates: { canonical: "/fx/banks" },
    openGraph: { type: "website", url: "/fx/banks", title, description },
  };
}

export default function FxBanksPage() {
  const data = loadFx();
  const { title, description } = pageMeta(data);
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "머니위키", path: "/" },
          { name: "오늘 환율", path: "/fx" },
          { name: "은행별 환전 수수료 비교", path: "/fx/banks" },
        ])}
      />
      <JsonLd data={webPageLd({ path: "/fx/banks", name: title, description, dateModified: data.updatedAt })} />
      <JsonLd data={faqLd(banksFaq(data))} />
      <BanksView initial={trimFx(data, ["USD"])} />
    </>
  );
}
