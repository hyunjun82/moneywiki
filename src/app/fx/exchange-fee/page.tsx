import type { Metadata } from "next";
import ExchangeFeeView from "@/components/fx/ExchangeFeeView";
import { feeChannels, feeFaq } from "@/components/fx/fxDerive";
import { korDate, won } from "@/components/fx/fxCore";
import { loadFx, trimFx } from "@/components/fx/snapshot";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/fx/ld";

/** /fx/exchange-fee — 환전 수수료 아끼는 법 · 달러·엔화 환율 우대 (2026-10-09). 은행 우대 조건 원문을 보이므로 USD note 를 남긴다 */

export function generateMetadata(): Metadata {
  const data = loadFx();
  const usd = feeChannels(data, "USD", 1000);
  const fee = (k: string) => usd?.rows.find((r) => r.key === k)?.fee;
  const ap = fee("airport");
  const app = fee("app");
  const title =
    ap != null && app != null
      ? `환전 수수료 아끼는 법 — 달러·엔화 환율 우대, 1,000달러 공항 ${won(ap)}원 vs 앱 ${won(app)}원`
      : "환전 수수료 아끼는 법 — 달러·엔화 환율 우대 비교";
  const counter = fee("counter");
  const description =
    `환전 수수료·환율 우대 — 같은 1,000달러를 인천공항 창구·은행 창구·은행 앱 최대 우대·환율 100% 우대 통장에서 바꿀 때 낼 원화를 비교합니다. ` +
    (ap != null && counter != null && app != null
      ? `${korDate(data.updatedAt)} 기준 수수료 공항 약 ${won(ap)}원, 창구 ${won(counter)}원, 앱 ${won(app)}원. `
      : "") +
    "엔화 10만 엔, 은행별 우대 조건, 남은 외화 팔 때, 1만 달러 세관 신고까지.";
  return {
    title: { absolute: title },
    description,
    keywords: ["환전 수수료", "환율 우대", "달러 환전 수수료", "엔화 환전 수수료", "환전 수수료 아끼는 법", "환율 우대 받는 법", "환전 우대율"],
    alternates: { canonical: "/fx/exchange-fee" },
    openGraph: { type: "website", url: "/fx/exchange-fee", title, description },
  };
}

export default function FxExchangeFeePage() {
  const data = loadFx();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "머니위키", path: "/" },
          { name: "오늘 환율", path: "/fx" },
          { name: "환전 수수료 아끼는 법", path: "/fx/exchange-fee" },
        ])}
      />
      {feeChannels(data, "USD", 1000) ? <JsonLd data={faqLd(feeFaq(data))} /> : null}
      <ExchangeFeeView initial={trimFx(data, ["USD"])} />
    </>
  );
}
