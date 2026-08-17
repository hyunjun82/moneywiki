import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CurrencyView from "@/components/fx/CurrencyView";
import {
  CURRENCIES,
  currencyDescription,
  currencyTitle,
  findCurrency,
} from "@/components/fx/currencies";

/**
 * /fx/[code] — 통화별 환율 페이지.
 *
 * 검색 수요가 "환율"보다 "달러 환율"·"엔화 환율"·"베트남 환율 계산기" 쪽에
 * 몰려 있어(네이버 자동완성 실측 2026-08-17) 통화마다 입구를 따로 낸다.
 *
 * output:'export' 라 generateStaticParams + dynamicParams=false 가 필요하다.
 */

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return CURRENCIES.map((c) => ({ code: c.code.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const meta = findCurrency(code);
  if (!meta) return { title: "환율" };
  const path = `/fx/${meta.code.toLowerCase()}`;
  return {
    title: currencyTitle(meta),
    description: currencyDescription(meta),
    keywords: [
      `${meta.common} 환율`,
      `${meta.country} 환율`,
      `${meta.common} 환전`,
      `${meta.country} 환율 계산기`,
      `${meta.code} 환율`,
      "오늘 환율",
    ],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: currencyTitle(meta),
      description: currencyDescription(meta),
    },
  };
}

export default async function FxCurrencyPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const meta = findCurrency(code);
  if (!meta) notFound();

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${meta.common} 환율은 어디서 확인하나요?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `이 페이지에서 ${meta.unit}${meta.unitName} 기준 시장 중간환율과 전일 대비 변동을 확인할 수 있습니다. 금액을 입력하면 원화로 바로 환산됩니다.`,
        },
      },
      {
        "@type": "Question",
        name: `표시된 ${meta.common} 환율로 환전할 수 있나요?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "그대로는 어렵습니다. 표시 환율은 시장 중간환율이고, 실제 환전에는 은행 환전수수료가 붙습니다. 우대율을 받으면 그 수수료가 깎여 중간환율에 가까워집니다.",
        },
      },
      {
        "@type": "Question",
        name: "환전 우대율은 무엇인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "은행이 매기는 환전수수료를 깎아 주는 비율입니다. 우대율 100%면 수수료 없이 중간환율로 환전하는 셈입니다. 은행과 앱, 등급에 따라 달라지며 전국은행연합회가 은행별로 공시합니다.",
        },
      },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "환율", item: "https://www.jjyu.co.kr/fx" },
      {
        "@type": "ListItem",
        position: 2,
        name: `${meta.common} 환율`,
        item: `https://www.jjyu.co.kr/fx/${meta.code.toLowerCase()}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <CurrencyView meta={meta} />
    </>
  );
}
