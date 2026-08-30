import type { DownloadItem } from "@/data/download";
import { categoryLabel } from "@/data/download";

const BASE = "https://www.jjyu.co.kr";

/**
 * 다운로드 상세 페이지의 구조화 데이터.
 *
 * 이걸 붙이기 전에는 이 페이지가 무엇인지 검색엔진에 말한 적이 없었다.
 * 사이트 공통 스키마(WebSite/Organization/Person)만 깔려 있어서
 * "소프트웨어를 받는 화면"이라는 신호가 0이었다.
 *
 * 경쟁 페이지(softonic.kr)는 SoftwareApplication + BreadcrumbList + ItemList 를 쓴다.
 * 같은 언어로 말해야 같은 자리에서 겨룰 수 있다.
 */

/** 카테고리 → schema.org applicationCategory */
const APP_CATEGORY: Record<string, string> = {
  software: "UtilitiesApplication",
  driver: "DriverApplication",
  game: "GameApplication",
  font: "DesignApplication",
  app: "MultimediaApplication",
};

/** specs 배열에서 라벨로 값을 찾는다. 항목마다 라벨 표기가 달라(버전/VERSION 등) 후보를 여럿 받는다. */
function spec(it: DownloadItem, ...labels: string[]): string | undefined {
  for (const label of labels) {
    const v = it.specs.find((s) => s.label === label)?.value;
    if (v) return v;
  }
  return undefined;
}

/**
 * 요금 표기를 Offer 로 바꾼다.
 * 값을 지어내지 않는다 — "무료"가 확인된 것만 0원으로 적고,
 * 유료거나 애매하면 offers 자체를 넣지 않는다.
 */
function offer(it: DownloadItem) {
  const fee = (spec(it, "요금", "LICENSE") || "").trim();
  // "무료 체험"은 평가판이지 무료가 아니다. "무료 검사"는 기능 일부만 무료라는 뜻이고,
  // "무료 위주"는 묶음 페이지라 항목마다 다르다는 뜻이다 — 셋 다 확실한 무료가 아니라서 뺀다.
  const EXCLUDE = /체험|평가판|시험|검사|위주|별도|상이/;
  const isFree = !EXCLUDE.test(fee) && (/^무료$/.test(fee) || /^무료[ ·]/.test(fee) || fee === "프리웨어");
  if (!isFree) return undefined;
  return {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
    availability: "https://schema.org/InStock",
  };
}

export function DownloadSchema({ item }: { item: DownloadItem }) {
  const url = `${BASE}/download/${item.category}/${encodeURIComponent(item.slug)}`;

  const os = spec(item, "OS");
  const maker = spec(item, "배포처", "SOURCE");
  const version = spec(item, "버전", "VERSION");
  const fileSize = spec(item, "용량", "파일크기", "FILE SIZE");

  const app: Record<string, unknown> = {
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: item.listTitle,
    description: item.description,
    url,
    applicationCategory: APP_CATEGORY[item.category] ?? "UtilitiesApplication",
    inLanguage: "ko-KR",
  };
  if (os) app.operatingSystem = os;
  if (version) app.softwareVersion = version;
  if (fileSize) app.fileSize = fileSize;
  if (maker) app.publisher = { "@type": "Organization", name: maker };
  const o = offer(item);
  if (o) app.offers = o;

  // 받는 곳은 공식 배포처다. 우리 서버가 아니다 — 그대로 적는다.
  const official = item.builds[0]?.url;
  if (official) app.installUrl = official;

  const crumbs = [
    { name: "다운로드 인덱스", item: `${BASE}/download` },
    { name: categoryLabel(item.category), item: `${BASE}/download/${item.category}` },
    { name: item.listTitle, item: url },
  ];

  const graph: Record<string, unknown>[] = [
    app,
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    },
  ];

  if (item.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: item.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  // 묶음 페이지는 담긴 항목을 목록으로 알린다.
  if (item.picks && item.picks.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#picks`,
      name: item.picksTitle ?? "함께 받는 프로그램",
      numberOfItems: item.picks.length,
      itemListElement: item.picks.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        url: `${BASE}${p.href}`,
      })),
    });
  }

  const json = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      // 데이터에서 만든 값이라 신뢰할 수 있지만, 스크립트 종료 태그만 막아 둔다.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(json).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** 목록(카테고리) 페이지용 — 무엇이 몇 개 들어 있는지 알린다. */
export function DownloadListSchema({
  category,
  items,
}: {
  category: string;
  items: DownloadItem[];
}) {
  const url = `${BASE}/download/${category}`;
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: `${categoryLabel(category as DownloadItem["category"])} 다운로드`,
        url,
        inLanguage: "ko-KR",
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        numberOfItems: items.length,
        itemListElement: items.slice(0, 100).map((x, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: x.listTitle,
          url: `${BASE}/download/${x.category}/${encodeURIComponent(x.slug)}`,
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(json).replace(/</g, "\\u003c"),
      }}
    />
  );
}
