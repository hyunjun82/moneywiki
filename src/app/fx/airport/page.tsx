import type { Metadata } from "next";
import AirportView from "@/components/fx/AirportView";
import { airportCompare, airportFaq, feeRange } from "@/components/fx/fxDerive";
import { won } from "@/components/fx/fxCore";
import { loadFx, trimFx } from "@/components/fx/snapshot";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/fx/ld";

/** /fx/airport — 인천공항 환전 수수료 비교 (은행연합회 인천공항점 공시, 2026-10-01 수집 시작) */

export function generateMetadata(): Metadata {
  const data = loadFx();
  const ap = airportCompare(data, "USD", 1000);
  const title = ap
    ? `인천공항 환전 수수료 비교 — 1,000달러 공항 ${won(ap.airportFee)}원, 앱 우대 ${won(ap.appFee)}원`
    : "인천공항 환전 수수료 비교 — 은행별 인천공항점";
  const description = ap
    ? `인천공항환전·공항 환전 수수료 — 인천공항점(${ap.rows.map((x) => x.bank).join("·")}) 달러 살 때 수수료율 ${feeRange(ap.minBuy, ap.maxBuy)}, 시내 창구 ${ap.cityFeeRate != null ? +ap.cityFeeRate.toFixed(2) : ""}%의 약 ${ap.times?.toFixed(1)}배. 엔화·유로·베트남 동 등 통화 15종의 공항·시내·앱 수수료를 은행연합회 공시로 비교합니다.`
    : "인천공항점 환전 수수료율을 시내 창구·앱 우대와 비교합니다. 은행연합회 외환길잡이 공시 기준.";
  return {
    title: { absolute: title },
    description,
    keywords: ["인천공항 환전 수수료", "인천공항 환전", "공항 환전 수수료", "인천공항점 환전수수료 비교", "공항 환전"],
    alternates: { canonical: "/fx/airport" },
    openGraph: { type: "website", url: "/fx/airport", title, description },
  };
}

export default function FxAirportPage() {
  const data = loadFx();
  const faq = airportFaq(data);
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "머니위키", path: "/" },
          { name: "오늘 환율", path: "/fx" },
          { name: "인천공항 환전 수수료", path: "/fx/airport" },
        ])}
      />
      {airportCompare(data, "USD", 1000) ? <JsonLd data={faqLd(faq)} /> : null}
      <AirportView initial={trimFx(data)} />
    </>
  );
}
