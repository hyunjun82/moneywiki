import type { Metadata } from "next";
import BanksView from "@/components/fx/BanksView";
import { banksFaq, bestLabel, counterPay, rankBanks } from "@/components/fx/fxDerive";
import { korDate, won } from "@/components/fx/fxCore";
import { loadFx, trimFx } from "@/components/fx/snapshot";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/fx/ld";

/** /fx/banks — 은행별 환전 수수료·우대율 비교 (검색어 "환전 수수료 은행별 비교") */

export function generateMetadata(): Metadata {
  const data = loadFx();
  const ranked = rankBanks(data, "USD", 1000);
  const counter = counterPay(data, "USD", 1000);
  const title =
    ranked.length && counter
      ? `은행별 환전 수수료 · 우대율 비교 — 오늘 1,000달러 수수료 최저 ${won(ranked[0].fee)}원`
      : "은행별 환전 수수료 · 우대율 비교";
  const description =
    `환전수수료 은행별 비교·은행 환율 비교 — 은행 16곳 환전 수수료율과 앱 최대 우대율(은행연합회 공시, 최신 ${korDate(data.banks?.latestAsOf ?? undefined)}). ` +
    (ranked.length && counter
      ? `1,000달러를 살 때 수수료 최저 ${bestLabel(ranked)} ${won(ranked[0].fee)}원, 우대 없는 창구 ${won(counter.fee)}원. `
      : "") +
    "달러·엔화·유로·베트남 동 등 통화 15종별로 가장 싼 은행을 정리했습니다.";
  return {
    title: { absolute: title },
    description,
    keywords: ["환전 수수료 은행별 비교", "은행별 환전 수수료", "환전 우대율 비교", "은행 환율 비교", "환전 수수료", "환전 우대율"],
    alternates: { canonical: "/fx/banks" },
    openGraph: { type: "website", url: "/fx/banks", title, description },
  };
}

export default function FxBanksPage() {
  const data = loadFx();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "머니위키", path: "/" },
          { name: "오늘 환율", path: "/fx" },
          { name: "은행별 환전 수수료 비교", path: "/fx/banks" },
        ])}
      />
      <JsonLd data={faqLd(banksFaq(data))} />
      <BanksView initial={trimFx(data, ["USD"])} />
    </>
  );
}
