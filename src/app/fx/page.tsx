import type { Metadata } from "next";
import HubView from "@/components/fx/HubView";
import { baseOf, hubFaq } from "@/components/fx/fxDerive";
import { korDate, won } from "@/components/fx/fxCore";
import { loadFx, trimFx } from "@/components/fx/snapshot";
import { JsonLd, breadcrumbLd, faqLd, webPageLd } from "@/components/fx/ld";
import type { FxData } from "@/components/fx/fxData";
import { listFxNewsDates, loadFxNews } from "@/components/fx/newsData";

/**
 * /fx — 오늘 환율 조회 허브 (고정 주소). 통화별 페이지 /fx/<통화> 15종으로 보낸다.
 *
 * 2026-10-01 계산기는 /fx/calculator 로 옮겼다. "환율"·"환율조회"·"오늘 환율" 검색어는 이 주소가 받는다.
 * 숫자는 빌드 때 스냅숏으로 굽고 브라우저가 최신값으로 바꾼다(fxData.useFx).
 */

/*
 * 제목·설명 단어는 네이버 자동완성 실측(2026-10-22): 오늘 환율 · 오늘 환율 조회 · 오늘 환율 달러 시세 · 오늘 환율 엔화 시세 ·
 * 환율조회 · 중국 환율 · 유로 환율. "환전 시세"는 자동완성에 거의 없다(다낭 환전 시세·환전시세비교뿐) — 설명에만 둔다.
 */
function pageMeta(data: FxData) {
  const usd = baseOf(data, "USD");
  const jpy = baseOf(data, "JPY");
  const eur = baseOf(data, "EUR");
  const cny = baseOf(data, "CNY");
  const usdPart = usd ? `달러 시세 ${won(usd.rate, 2)}원` : "달러 시세";
  const jpyPart = jpy ? `엔화 시세 100엔 ${won(jpy.rate, 2)}원` : "엔화 시세";
  const title = `오늘 환율 조회 — ${usdPart}·${jpyPart}`;
  const others = [eur ? `유로 ${won(eur.rate, 2)}원` : "", cny ? `중국 위안 ${won(cny.rate, 2)}원` : ""].filter(Boolean).join(", ");
  const description =
    `오늘 환율·환율조회 — ${korDate(data.updatedAt)} 기준 ${usdPart}, ${jpyPart}${others ? `, ${others}` : ""}. ` +
    "베트남·대만·태국 등 통화 15종의 환전 시세(현찰 살 때·팔 때)와 은행 16곳 환전 수수료·우대율, 인천공항 환전 수수료를 비교합니다.";
  return { title, description };
}

export function generateMetadata(): Metadata {
  const { title, description } = pageMeta(loadFx());
  return {
    title: { absolute: title },
    description,
    keywords: ["오늘 환율", "오늘 환율 조회", "환율조회", "오늘 환율 달러 시세", "오늘 환율 엔화 시세", "달러 환율", "엔화 환율", "중국 환율", "유로 환율", "환전 시세"],
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
  const { title, description } = pageMeta(data);
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "머니위키", path: "/" },
          { name: "오늘 환율", path: "/fx" },
        ])}
      />
      <JsonLd data={webPageLd({ path: "/fx", name: title, description, dateModified: data.updatedAt })} />
      <JsonLd data={faqLd(hubFaq(data))} />
      <HubView initial={trimFx(data)} latestNews={latestNews()} />
    </>
  );
}
