import type { Metadata } from "next";
import AirportView from "@/components/fx/AirportView";
import { airportCompare, airportFaq, feeRange } from "@/components/fx/fxDerive";
import { won } from "@/components/fx/fxCore";
import { loadFx, trimFx } from "@/components/fx/snapshot";
import { JsonLd, breadcrumbLd, faqLd, webPageLd } from "@/components/fx/ld";
import type { FxData } from "@/components/fx/fxData";

/**
 * /fx/airport — 인천공항 환전 수수료 비교 (은행연합회 인천공항점 공시, 2026-10-01 수집 시작)
 *
 * 제목·설명 단어는 네이버 자동완성 실측(2026-10-22): 인천공항 환전 수수료 비교 · 인천공항 환전 수수료 엔화 ·
 * 인천공항 환전 수수료 은행 · 인천공항 환전 · 공항 환전 수수료 차이
 */
function pageMeta(data: FxData) {
  const ap = airportCompare(data, "USD", 1000);
  const aj = airportCompare(data, "JPY", 100000);
  const title =
    ap && ap.appFee != null
      ? `인천공항 환전 수수료 비교 — 1,000달러 공항 ${won(ap.airportFee)}원·앱 ${won(ap.appFee)}원, 엔화·은행별`
      : "인천공항 환전 수수료 비교 — 달러·엔화 은행별 인천공항점";
  const description = ap
    ? `인천공항 환전·인천공항 환전 수수료 엔화·은행별 — 인천공항점(${ap.rows.map((x) => x.bank).join("·")}) 달러 살 때 수수료율 ${feeRange(ap.minBuy, ap.maxBuy)}` +
      (ap.cityFeeRate != null && ap.times != null ? `로 시내 창구 ${+ap.cityFeeRate.toFixed(2)}%의 약 ${ap.times.toFixed(1)}배` : "") +
      `, 1,000달러면 공항 ${won(ap.airportFee)}원` +
      (ap.cityFee != null ? `·시내 ${won(ap.cityFee)}원` : "") +
      (ap.appFee != null ? `·앱 우대 ${won(ap.appFee)}원` : "") +
      ". " +
      (aj ? `엔화 10만 엔은 공항 수수료 ${won(aj.airportFee)}원. ` : "") +
      "공항 환전 수수료 차이를 통화 15종별로 은행연합회 공시로 비교합니다."
    : "인천공항점 환전 수수료율을 시내 창구·앱 우대와 비교합니다. 은행연합회 외환길잡이 공시 기준.";
  return { title, description };
}

export function generateMetadata(): Metadata {
  const { title, description } = pageMeta(loadFx());
  return {
    title: { absolute: title },
    description,
    keywords: ["인천공항 환전 수수료 비교", "인천공항 환전 수수료", "인천공항 환전 수수료 엔화", "인천공항 환전 수수료 은행", "인천공항 환전", "공항 환전 수수료 차이", "공항 환전 수수료"],
    alternates: { canonical: "/fx/airport" },
    openGraph: { type: "website", url: "/fx/airport", title, description },
  };
}

export default function FxAirportPage() {
  const data = loadFx();
  const faq = airportFaq(data);
  const { title, description } = pageMeta(data);
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "머니위키", path: "/" },
          { name: "오늘 환율", path: "/fx" },
          { name: "인천공항 환전 수수료", path: "/fx/airport" },
        ])}
      />
      <JsonLd data={webPageLd({ path: "/fx/airport", name: title, description, dateModified: data.updatedAt })} />
      {airportCompare(data, "USD", 1000) ? <JsonLd data={faqLd(faq)} /> : null}
      <AirportView initial={trimFx(data)} />
    </>
  );
}
