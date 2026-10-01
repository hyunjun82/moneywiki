import type { Metadata } from "next";
import HubView from "@/components/fx/HubView";
import { baseOf, hubFaq } from "@/components/fx/fxDerive";
import { korDate, won } from "@/components/fx/fxCore";
import { loadFx, trimFx } from "@/components/fx/snapshot";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/fx/ld";
import { listFxNewsDates, loadFxNews } from "@/components/fx/newsData";

/**
 * /fx — 오늘 환율 조회 허브 (고정 주소). 통화별 페이지 /fx/<통화> 15종으로 보낸다.
 *
 * 2026-10-01 계산기는 /fx/calculator 로 옮겼다. "환율"·"환율조회"·"오늘 환율" 검색어는 이 주소가 받는다.
 * 숫자는 빌드 때 스냅숏으로 굽고 브라우저가 최신값으로 바꾼다(fxData.useFx).
 */

export function generateMetadata(): Metadata {
  const data = loadFx();
  const usd = baseOf(data, "USD");
  const jpy = baseOf(data, "JPY");
  const eur = baseOf(data, "EUR");
  const title = usd
    ? `오늘 환율 조회 — 달러 ${won(usd.rate, 2)}원·엔화 100엔 ${jpy ? won(jpy.rate, 2) : ""}원, 환전 시세`
    : "오늘 환율 조회 · 환전 시세";
  const description =
    `환율조회·오늘 환율·환전 시세 — ${korDate(data.updatedAt)} 기준 달러 ${usd ? won(usd.rate, 2) : ""}원, 엔화 100엔 ${jpy ? won(jpy.rate, 2) : ""}원, 유로 ${eur ? won(eur.rate, 2) : ""}원. ` +
    "베트남·중국·태국 등 통화 15종의 현찰 살 때·팔 때와 은행 16곳 환전 수수료·우대율, 인천공항 수수료를 비교합니다.";
  return {
    title: { absolute: title },
    description,
    keywords: ["환율", "환율조회", "오늘 환율", "환전 시세", "오늘 환전 시세", "달러 환율", "엔화 환율", "유로 환율"],
    alternates: { canonical: "/fx" },
    openGraph: { type: "website", url: "/fx", title, description },
  };
}

function latestNews() {
  const d = listFxNewsDates()[0];
  const doc = d ? loadFxNews(d) : null;
  return doc ? { date: doc.date, title: doc.title } : null;
}

export default function FxHubPage() {
  const data = loadFx();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "머니위키", path: "/" },
          { name: "오늘 환율", path: "/fx" },
        ])}
      />
      <JsonLd data={faqLd(hubFaq(data))} />
      <HubView initial={trimFx(data)} latestNews={latestNews()} />
    </>
  );
}
