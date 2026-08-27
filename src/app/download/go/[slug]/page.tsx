export const dynamic = "force-static";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DownloadShell } from "@/components/download/Chrome";
import { GateClient } from "@/components/download/GateClient";
import { LINE, LIME, MUTE, MONO } from "@/components/download/theme";
import { ALL_ITEMS, getItem, itemHref, recommended } from "@/data/download";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_ITEMS.map((it) => ({ slug: it.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const it = getItem(slug);
  if (!it) return { title: { absolute: "다운로드 인덱스" } };
  return {
    title: { absolute: `${it.titleTop} 내려받기 — 다운로드 인덱스` },
    description: it.description,
    // 게이트는 색인시킬 화면이 아니다. 검색 결과에는 상세 페이지가 올라가야 한다.
    robots: { index: false, follow: true },
    alternates: { canonical: `https://www.jjyu.co.kr${itemHref(it)}` },
  };
}

export default async function DownloadGatePage({ params }: PageProps) {
  const { slug } = await params;
  const it = getItem(slug);
  if (!it) notFound();

  const also = recommended(it.slug, 8);

  return (
    <DownloadShell>
      <section style={{ padding: "40px 28px 0" }}>
        <div style={{ maxWidth: 940, margin: "0 auto 22px" }}>
          <Link href={itemHref(it)} className="dl-a" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: MUTE }}>
            ← {it.titleTop} 페이지로
          </Link>
        </div>

        <GateClient builds={it.builds} sourceNote={it.sourceNote} label={it.ctaLabel} />
      </section>

      {also.length > 0 ? (
        <section style={{ padding: "56px 28px 0", maxWidth: 940, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
            <h2 style={{ fontSize: "clamp(24px,3.2vw,34px)", fontWeight: 800, letterSpacing: "-0.04em" }}>같이 많이 받는 파일</h2>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: MUTE }}>RECOMMENDED</span>
          </div>
          <div style={{ marginTop: 18, borderTop: `1px solid ${LINE}` }}>
            {also.map((x) => (
              <Link
                key={x.slug}
                href={itemHref(x)}
                className="dl-row dl-a"
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "18px 8px", borderBottom: `1px solid ${LINE}` }}
              >
                <span>
                  <span style={{ display: "block", fontSize: 15.5, fontWeight: 800, letterSpacing: "-0.02em" }}>{x.listTitle}</span>
                  <span style={{ display: "block", marginTop: 5, fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.1em", color: MUTE }}>{x.listMeta}</span>
                </span>
                <span className="dl-get" style={{ fontSize: 13, color: LIME, whiteSpace: "nowrap" }}>보기 →</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </DownloadShell>
  );
}
