import type { Metadata } from "next";
import CalculatorView from "@/components/fx/CalculatorView";
import { baseOf } from "@/components/fx/fxDerive";
import { korDate, won } from "@/components/fx/fxCore";
import { loadFx, trimFx } from "@/components/fx/snapshot";
import { JsonLd, breadcrumbLd } from "@/components/fx/ld";

/**
 * /fx/calculator — 환율 계산기·환전 계산기 (2026-10-01 /fx 에서 옮김. /fx 는 오늘 환율 허브가 됐다)
 */

export function generateMetadata(): Metadata {
  const data = loadFx();
  const usd = baseOf(data, "USD");
  const jpy = baseOf(data, "JPY");
  const title = usd
    ? `환율 계산기 · 환전 계산기 — 오늘 1달러 ${won(usd.rate, 2)}원, 통화 ${data.rates?.length ?? 17}종 환산`
    : "환율 계산기 · 환전 계산기";
  const description =
    `환율계산기·환전계산기 — ${korDate(data.updatedAt)} 기준 1달러 ${usd ? won(usd.rate, 2) : ""}원, 100엔 ${jpy ? won(jpy.rate, 2) : ""}원으로 ` +
    `원화↔달러·엔·유로·위안·동·바트 등 ${data.rates?.length ?? 17}개 통화를 바로 계산합니다. 은행에서 살 때 낼 원화는 은행별 환전 수수료 비교로 이어집니다.`;
  return {
    title: { absolute: title },
    description,
    keywords: ["환율 계산기", "환율계산기", "환전 계산기", "환율 계산", "환율계산", "달러 환율 계산기", "엔화 환율 계산기"],
    alternates: { canonical: "/fx/calculator" },
    openGraph: { type: "website", url: "/fx/calculator", title, description },
  };
}

export default function FxCalculatorPage() {
  const data = loadFx();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "머니위키", path: "/" },
          { name: "오늘 환율", path: "/fx" },
          { name: "환율 계산기", path: "/fx/calculator" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "환율 계산기",
          url: "https://www.jjyu.co.kr/fx/calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: 0, priceCurrency: "KRW" },
        }}
      />
      <CalculatorView initial={trimFx(data)} />
    </>
  );
}
