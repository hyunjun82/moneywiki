import type { Metadata } from "next";
import ExchangeView from "@/components/fx/ExchangeView";
import { bestLabel, counterPay, exchangeFaq, rankBanks } from "@/components/fx/fxDerive";
import { korDate, won } from "@/components/fx/fxCore";
import { loadFx, trimFx } from "@/components/fx/snapshot";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/fx/ld";

/**
 * /fx/exchange-calculator — 환전 계산기 (은행·우대율별 낼 원화). 2026-10-01 환율 계산기(/fx/calculator)와 나눴다.
 */

export function generateMetadata(): Metadata {
  const data = loadFx();
  const counter = counterPay(data, "USD", 1000);
  const ranked = rankBanks(data, "USD", 1000);
  const title =
    counter && ranked.length
      ? `환전 계산기 — 1,000달러 우대 없이 ${won(counter.pay)}원, 최대 우대 ${won(ranked[0].pay)}원`
      : "환전 계산기 — 은행·우대율별 낼 원화 계산";
  const description =
    `환전 계산기·환전 수수료 계산 — 통화·금액·은행·우대율을 넣으면 현찰로 살 때 낼 원화와 팔 때 받을 원화를 계산합니다. ` +
    (counter && ranked.length
      ? `${korDate(data.updatedAt)} 기준 1,000달러 수수료는 우대 없는 창구 ${won(counter.fee)}원, 공시 최대 우대 최저 ${bestLabel(ranked)} ${won(ranked[0].fee)}원. `
      : "") +
    "은행 16곳·인천공항점 공시 수수료율 기준.";
  return {
    title: { absolute: title },
    description,
    keywords: ["환전 계산기", "환전계산기", "환전 수수료 계산", "환전 수수료 계산기", "우대율 계산", "달러 환전 계산기", "엔화 환전 계산기"],
    alternates: { canonical: "/fx/exchange-calculator" },
    openGraph: { type: "website", url: "/fx/exchange-calculator", title, description },
  };
}

export default function FxExchangeCalculatorPage() {
  const data = loadFx();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "머니위키", path: "/" },
          { name: "오늘 환율", path: "/fx" },
          { name: "환전 계산기", path: "/fx/exchange-calculator" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "환전 계산기",
          url: "https://www.jjyu.co.kr/fx/exchange-calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: 0, priceCurrency: "KRW" },
        }}
      />
      <JsonLd data={faqLd(exchangeFaq(data))} />
      <ExchangeView initial={trimFx(data, ["USD"])} />
    </>
  );
}
