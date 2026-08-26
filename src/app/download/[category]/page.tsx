export const dynamic = "force-static";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DownloadShell, Breadcrumb } from "@/components/download/Chrome";
import { LINE, LIME, MUTE, MONO } from "@/components/download/theme";
import { CATEGORIES, itemsIn, itemHref, categoryLabel, type DownloadCategory } from "@/data/download";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!CATEGORIES.includes(category as DownloadCategory)) return { title: { absolute: "다운로드 인덱스" } };
  const label = categoryLabel(category as DownloadCategory);
  return {
    title: { absolute: `${label} 다운로드 — 다운로드 인덱스` },
    description: `${label} 분류의 설치 파일과 문서를 공식 배포처 원본으로 연결합니다.`,
    alternates: { canonical: `https://www.jjyu.co.kr/download/${category}` },
  };
}

const TAB: Record<string, "프로그램 예시" | "드라이버 예시" | "서식 예시" | undefined> = {
  software: "프로그램 예시",
  driver: "드라이버 예시",
  font: "서식 예시",
};

export default async function DownloadCategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (!CATEGORIES.includes(category as DownloadCategory)) notFound();
  const cat = category as DownloadCategory;
  const items = itemsIn(cat);
  const label = categoryLabel(cat);

  return (
    <DownloadShell tab={TAB[cat]}>
      <Breadcrumb trail={[{ label }]} />

      <section style={{ padding: "48px 28px 36px" }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", color: LIME }}>
          {cat.toUpperCase()}
        </div>
        <h1 style={{ marginTop: 12, fontSize: "clamp(34px,5.6vw,62px)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.03 }}>
          {label}
        </h1>
        <p style={{ marginTop: 16, maxWidth: 520, fontSize: 15, lineHeight: 1.7, color: MUTE }}>
          공식 배포처가 확인되는 파일만 색인합니다. 찾는 파일이 없으면 요청 게시판에 남겨주세요.
        </p>
      </section>

      <section style={{ padding: "0 28px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, borderBottom: `1px solid ${LINE}`, paddingBottom: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 800 }}>전체 목록</span>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: MUTE }}>
            TOTAL {String(items.length).padStart(2, "0")}
          </span>
        </div>

        {items.length === 0 ? (
          <p style={{ padding: "40px 0", fontSize: 14, color: MUTE }}>
            아직 색인된 파일이 없습니다. 필요한 파일을{" "}
            <Link href="/download/request" style={{ color: LIME }}>요청 게시판</Link>
            에 남겨주세요.
          </p>
        ) : (
          <div>
            {items.map((x, i) => (
              <Link
                key={x.slug}
                href={itemHref(x)}
                className="dl-row dl-a"
                style={{ display: "grid", gridTemplateColumns: "44px minmax(0,1fr) auto", alignItems: "center", gap: 16, padding: "20px 8px", borderBottom: `1px solid ${LINE}` }}
              >
                <span style={{ fontFamily: MONO, fontSize: 11, color: MUTE }}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span style={{ display: "block", fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>{x.listTitle}</span>
                  <span style={{ display: "block", marginTop: 5, fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.1em", color: MUTE }}>{x.listMeta}</span>
                </span>
                <span className="dl-get" style={{ fontSize: 13, color: LIME, whiteSpace: "nowrap" }}>보기 →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </DownloadShell>
  );
}
