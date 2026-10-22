import type { Metadata } from "next";
import CalculatorView from "@/components/fx/CalculatorView";
import { baseOf, calcFaq } from "@/components/fx/fxDerive";
import { korDate, won } from "@/components/fx/fxCore";
import { loadFx, trimFx } from "@/components/fx/snapshot";
import { JsonLd, breadcrumbLd, faqLd, webPageLd } from "@/components/fx/ld";
import type { FxData } from "@/components/fx/fxData";

/**
 * /fx/calculator — 환율 계산기(수수료 없는 기준 환율 환산). 2026-10-01 /fx 에서 옮김.
 * 은행·우대율별 낼 원화는 /fx/exchange-calculator(환전 계산기)가 따로 맡는다.
 *
 * 제목·설명 단어는 네이버 자동완성 실측(2026-10-22)에 있는 검색어만 쓴다:
 *   환율 계산기 · 환율계산기 · 달러 환율 계산기 · 엔화 환율 계산기 · 일본 환율 계산기 · 베트남·대만·홍콩 환율 계산기 · 달러 환율 · 엔화 환율
 * 달러 환율·엔화 환율은 제목에 반드시 넣는다.
 */

function pageMeta(data: FxData) {
  const usd = baseOf(data, "USD");
  const jpy = baseOf(data, "JPY");
  const usdPart = usd ? `달러 환율 ${won(usd.rate, 2)}원` : "달러 환율";
  const jpyPart = jpy ? `엔화 환율 100엔 ${won(jpy.rate, 2)}원` : "엔화 환율";
  const title = `환율 계산기 — ${usdPart}·${jpyPart}`;
  const example =
    usd && jpy ? `100달러는 ${won(usd.perUnit * 100)}원, 10만 엔은 ${won(jpy.perUnit * 100000)}원. ` : "";
  const description =
    `환율계산기·달러 환율 계산기·엔화 환율 계산기 — ${korDate(data.updatedAt)} 기준 ${usdPart}, ${jpyPart}. ${example}` +
    `원화↔달러·엔화·유로·위안·베트남 동·대만 달러·홍콩 달러 등 ${data.rates?.length ?? 17}개 통화를 수수료 없는 기준 환율로 바로 계산합니다.`;
  return { title, description };
}

export function generateMetadata(): Metadata {
  const { title, description } = pageMeta(loadFx());
  return {
    title: { absolute: title },
    description,
    keywords: ["환율 계산기", "환율계산기", "달러 환율 계산기", "엔화 환율 계산기", "일본 환율 계산기", "베트남 환율 계산기", "대만 환율 계산기", "달러 환율", "엔화 환율"],
    alternates: { canonical: "/fx/calculator" },
    openGraph: { type: "website", url: "/fx/calculator", title, description },
  };
}

export default function FxCalculatorPage() {
  const data = loadFx();
  const { title, description } = pageMeta(data);
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "머니위키", path: "/" },
          { name: "오늘 환율", path: "/fx" },
          { name: "환율 계산기", path: "/fx/calculator" },
        ])}
      />
      <JsonLd data={webPageLd({ path: "/fx/calculator", name: title, description, dateModified: data.updatedAt })} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "환율 계산기",
          alternateName: ["환율계산기", "달러 환율 계산기", "엔화 환율 계산기"],
          url: "https://www.jjyu.co.kr/fx/calculator",
          description,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          inLanguage: "ko-KR",
          offers: { "@type": "Offer", price: 0, priceCurrency: "KRW" },
        }}
      />
      <JsonLd data={faqLd(calcFaq(data))} />
      <CalculatorView initial={trimFx(data)} />
    </>
  );
}
