export const dynamic = "force-static";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DownloadShell, Breadcrumb } from "@/components/download/Chrome";
import { DownloadCta } from "@/components/download/DownloadCta";
import { INK, LINE, LIME, MUTE, CARD, MONO } from "@/components/download/theme";
import { ALL_ITEMS, getItem, gateHref, categoryLabel } from "@/data/download";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return ALL_ITEMS.map((it) => ({ category: it.category, slug: it.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const it = getItem(slug);
  if (!it) return { title: { absolute: "다운로드 인덱스" } };
  return {
    title: { absolute: `${it.titleTop} ${it.titleBottom} — 다운로드 인덱스` },
    description: it.description,
    alternates: {
      canonical: `https://www.jjyu.co.kr/download/${category}/${encodeURIComponent(it.slug)}`,
    },
  };
}

const TAB: Record<string, "프로그램 예시" | "드라이버 예시" | "서식 예시" | undefined> = {
  software: "프로그램 예시",
  driver: "드라이버 예시",
  font: "서식 예시",
};

export default async function DownloadDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const it = getItem(slug);
  if (!it || it.category !== category) notFound();

  const trail = [
    { label: categoryLabel(it.category), href: `/download/${it.category}` },
    ...it.trail.slice(1).map((t) => ({ label: t })),
    { label: it.titleTop },
  ];

  return (
    <DownloadShell tab={TAB[it.category]}>
      <Breadcrumb trail={trail} />

      {/* 히어로 — 배지 · 제목 두 줄 · 받기 버튼 · 출처 한 줄 */}
      <section style={{ padding: "48px 28px 44px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ background: LIME, color: INK, fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", padding: "5px 10px" }}>
            {it.kicker}
          </span>
          {it.badges.map((b) => (
            <span key={b} style={{ border: `1px solid ${LINE}`, color: MUTE, fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", padding: "5px 10px" }}>
              {b}
            </span>
          ))}
        </div>

        <h1 style={{ marginTop: 26, fontSize: "clamp(34px, 5.6vw, 62px)", lineHeight: 1.03, fontWeight: 800, letterSpacing: "-0.045em" }}>
          {it.titleTop}
          <br />
          <span style={{ color: MUTE }}>{it.titleBottom}</span>
        </h1>

        <DownloadCta platforms={it.ctaPlatforms} label={it.ctaLabel} href={gateHref(it, 0)} />

        <p style={{ marginTop: 16, fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: MUTE }}>
          {it.sourceNote}
        </p>
      </section>

      {/* 제원 */}
      <section className="dl-specs" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        {it.specs.map((s) => (
          <div key={s.label} style={{ padding: "22px 28px", borderRight: `1px solid ${LINE}` }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: MUTE }}>{s.label}</div>
            <div style={{ marginTop: 8, fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em" }}>{s.value}</div>
          </div>
        ))}
      </section>

      {/* 본문 + 사이드 */}
      <section className="dl-main" style={{ padding: "56px 28px 0" }}>
        <div>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.045em" }}>{it.howTitle}</h2>
          <div style={{ marginTop: 22, borderTop: `1px solid ${LINE}` }}>
            {it.steps.map((s, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "72px minmax(0,1fr)", gap: 20, padding: "26px 0", borderBottom: `1px solid ${LINE}` }}>
                <div style={{ fontFamily: MONO, fontSize: 30, fontWeight: 800, color: "#2E2E33", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>{s.title}</div>
                  <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.75, color: MUTE }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: 52, fontSize: "clamp(24px,3.2vw,34px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
            자주 묻는 질문
          </h2>
          <div style={{ marginTop: 18, borderTop: `1px solid ${LINE}` }}>
            {it.faqs.map((f, i) => (
              <div key={i} style={{ padding: "22px 0", borderBottom: `1px solid ${LINE}` }}>
                <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>{f.q}</div>
                <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.75, color: MUTE }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <div style={{ border: `1px solid ${LINE}`, padding: 18 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: MUTE }}>{it.buildsTitle}</div>
            <div style={{ marginTop: 12 }}>
              {it.builds.map((b, i) => (
                <Link
                  key={i}
                  href={gateHref(it, i)}
                  className="dl-a"
                  style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "14px 0", borderTop: i ? `1px solid ${LINE}` : "none" }}
                >
                  <span>
                    <span style={{ display: "block", fontSize: 14, fontWeight: 800 }}>{b.name}</span>
                    {b.note ? (
                      <span style={{ display: "block", marginTop: 4, fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: MUTE }}>
                        {b.note}
                      </span>
                    ) : null}
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: LIME, whiteSpace: "nowrap" }}>{b.size}</span>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ border: `1px solid ${LINE}`, padding: 18, marginTop: 16 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: MUTE }}>{it.relatedTitle}</div>
            <div style={{ marginTop: 12 }}>
              {it.related.map((r, i) => (
                <a
                  key={i}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="dl-a"
                  style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 0", borderTop: i ? `1px solid ${LINE}` : "none" }}
                >
                  <span style={{ background: CARD, color: MUTE, fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em", padding: "3px 6px" }}>
                    {r.tag}
                  </span>
                  <span style={{ fontSize: 13.5 }}>{r.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div style={{ background: CARD, padding: 18, marginTop: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 800 }}>찾는 파일이 없나요?</div>
            <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7, color: MUTE }}>{it.requestNote}</p>
            <Link href="/download/request" style={{ display: "inline-block", marginTop: 12, color: LIME, fontSize: 13, fontWeight: 800, textDecoration: "none" }}>
              요청 게시판에 남기기 →
            </Link>
          </div>
        </aside>
      </section>
    </DownloadShell>
  );
}
