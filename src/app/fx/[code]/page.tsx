import type { Metadata } from "next";
import CurrencyView from "@/components/fx/CurrencyView";
import {
  SPOKES,
  amountLabel,
  baseOf,
  bestLabel,
  airportCompare,
  counterPay,
  currencyFaq,
  feeRange,
  josa,
  metaBySlug,
  quoteLabel,
  rankBanks,
} from "@/components/fx/fxDerive";
import { korDate, won } from "@/components/fx/fxCore";
import { loadFx, loadHistory, trimFx } from "@/components/fx/snapshot";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/fx/ld";

/**
 * /fx/<통화> — 통화 15종 스포크. 허브(/fx)는 오늘 환율 전체, 여기는 한 통화의 환율·환전.
 *
 * 제목·설명·JSON-LD·첫 화면 숫자는 빌드 때 스냅숏(src/data/fx-snapshot)으로 굽는다 — 검색엔진이 읽는 값.
 * 브라우저는 열린 뒤 최신 fx.json 으로 화면 숫자를 바꾼다.
 */

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return SPOKES.map((m) => ({ code: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const meta = metaBySlug(code);
  if (!meta) return {};
  const data = loadFx();
  const base = baseOf(data, meta.code);
  const path = `/fx/${meta.slug}`;
  if (!base) return { title: meta.keyword, alternates: { canonical: path } };

  const q = quoteLabel(meta, base.unit);
  const ranked = rankBanks(data, meta.code, meta.sample);
  const counter = counterPay(data, meta.code, meta.sample);
  const ap = airportCompare(data, meta.code, meta.sample);

  const title = `${meta.keyword} — 오늘 ${q} ${won(base.rate, 2)}원, 은행별 환전 수수료 비교`;
  const bits = [
    `${meta.aliases.join("·")} — ${korDate(data.updatedAt)} 기준 ${q} ${won(base.rate, 2)}원(${base.label}).`,
  ];
  if (ranked.length && counter) {
    bits.push(
      `${josa(amountLabel(meta, meta.sample), "을를")} 살 때 앱 최대 우대 최저 ${bestLabel(ranked)} ${won(ranked[0].pay)}원, 우대 없는 창구 ${won(counter.pay)}원.`
    );
  }
  if (ap) bits.push(`인천공항점 수수료율 ${feeRange(ap.minBuy, ap.maxBuy)}.`);
  bits.push(`은행 ${ranked.length || 16}곳 수수료·우대율과 1년 흐름을 은행연합회 공시로 비교합니다.`);
  const description = bits.join(" ");

  return {
    title: { absolute: title },
    description,
    keywords: [...meta.aliases, `${meta.short} 환전`, `은행별 ${meta.short} 환율 비교`, `${meta.short} 환전 수수료`, `인천공항 ${meta.short} 환전`],
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title, description },
  };
}

export default async function CurrencyPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const meta = metaBySlug(code)!;
  const data = loadFx();
  const base = baseOf(data, meta.code);
  const faq = currencyFaq(data, meta);

  const rateLd = base
    ? {
        "@context": "https://schema.org",
        "@type": "ExchangeRateSpecification",
        name: `${meta.keyword} (${base.label})`,
        currency: meta.code,
        currentExchangeRate: {
          "@type": "UnitPriceSpecification",
          price: +base.perUnit.toFixed(4),
          priceCurrency: "KRW",
          validFrom: data.updatedAt,
        },
      }
    : null;

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "머니위키", path: "/" },
          { name: "오늘 환율", path: "/fx" },
          { name: meta.keyword, path: `/fx/${meta.slug}` },
        ])}
      />
      <JsonLd data={rateLd} />
      {faq.length ? <JsonLd data={faqLd(faq)} /> : null}
      <CurrencyView slug={meta.slug} initial={trimFx(data, [meta.code])} history={loadHistory(meta.code)} />
    </>
  );
}
