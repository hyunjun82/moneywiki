export const dynamic = "force-static";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DownloadShell, Breadcrumb } from "@/components/download/Chrome";
import { DownloadSchema } from "@/components/download/Schema";
import { Favicon } from "@/components/download/Favicon";
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

  // 목차 — 경쟁 페이지에는 다 있는데 우리만 없었다. 실제로 있는 섹션만 넣는다.
  const toc = [
    { id: "how", label: it.howTitle },
    ...(it.picks && it.picks.length > 0
      ? [{ id: "picks", label: it.picksTitle ?? "함께 받는 프로그램" }]
      : []),
    { id: "faq", label: "자주 묻는 질문" },
  ];

  return (
    <DownloadShell tab={TAB[it.category]}>
      <DownloadSchema item={it} />
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

        <h1 style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 16, fontSize: "clamp(34px, 5.6vw, 62px)", lineHeight: 1.03, fontWeight: 800, letterSpacing: "-0.045em" }}>
          <Favicon url={it.builds[0]?.url} initialsFrom={it.titleTop} size={48} />
          <span>
            {it.titleTop}
            <br />
            <span style={{ color: MUTE }}>{it.titleBottom}</span>
          </span>
        </h1>

        {/* 받기 버튼 — 누르면 곧바로 게이트로 간다.
            전에는 여기서 전면 오버레이 광고를 띄웠는데 걷어냈다. 화면을 덮는 광고는
            애드센스가 자기 자동광고(비네트)로만 허용한다. 직접 만든 오버레이는 정책 위반이고,
            이 도메인에는 기존 글 수천 편이 같이 얹혀 있어서 제재를 맞으면 사이트 전체가 맞는다.
            광고는 게이트 페이지 안의 일반 디스플레이 자리에서만 노출된다. */}
        <a
          href={gateHref(it, 0)}
          style={{
            display: "block", width: "100%", maxWidth: 620, textDecoration: "none",
            background: LIME, color: INK, padding: "24px 26px", marginTop: 34,
          }}
        >
          <span style={{ display: "block", fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", opacity: 0.72 }}>
            {it.ctaPlatforms}
          </span>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>{it.ctaLabel}</span>
            <span style={{ fontSize: 20 }}>↓</span>
          </span>
        </a>

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

      {/* 목차 — 페이지에 뭐가 있는지 먼저 보여 준다 */}
      <nav
        aria-label="목차"
        style={{ padding: "24px 28px 0", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}
      >
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: MUTE }}>목차</span>
        {toc.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="dl-a"
            style={{ border: `1px solid ${LINE}`, padding: "7px 12px", fontSize: 13 }}
          >
            {t.label}
          </a>
        ))}
      </nav>

      {/* 본문 + 사이드 */}
      <section className="dl-main" style={{ padding: "40px 28px 0" }}>
        <div>
          <h2 id="how" style={{ scrollMarginTop: 24, fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.045em" }}>{it.howTitle}</h2>
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

          {/* 묶음 페이지의 추천 목록 — 이 색인 안의 다른 항목으로 이어 준다.
              내부 링크라 nofollow 를 붙이지 않는다. */}
          {it.picks && it.picks.length > 0 ? (
            <>
              <h2 id="picks" style={{ scrollMarginTop: 24, marginTop: 52, fontSize: "clamp(24px,3.2vw,34px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                {it.picksTitle ?? "함께 받는 프로그램"}
              </h2>
              <div style={{ marginTop: 18, borderTop: `1px solid ${LINE}` }}>
                {it.picks.map((pk, i) => (
                  <a
                    key={i}
                    href={pk.href}
                    className="dl-row dl-a"
                    style={{ display: "grid", gridTemplateColumns: "44px minmax(0,1fr) auto", alignItems: "center", gap: 16, padding: "18px 8px", borderBottom: `1px solid ${LINE}` }}
                  >
                    <span style={{ fontFamily: MONO, fontSize: 11, color: LIME }}>{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span style={{ display: "block", fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>{pk.title}</span>
                      {pk.note ? (
                        <span style={{ display: "block", marginTop: 5, fontSize: 13, lineHeight: 1.6, color: MUTE }}>{pk.note}</span>
                      ) : null}
                    </span>
                    <span className="dl-get" style={{ fontSize: 13, whiteSpace: "nowrap" }}>보기 →</span>
                  </a>
                ))}
              </div>
            </>
          ) : null}

          <h2 id="faq" style={{ scrollMarginTop: 24, marginTop: 52, fontSize: "clamp(24px,3.2vw,34px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
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
                <a
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
                </a>
              ))}
            </div>
          </div>

          <div style={{ border: `1px solid ${LINE}`, padding: 18, marginTop: 16 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: MUTE }}>{it.relatedTitle}</div>
            <div style={{ marginTop: 12 }}>
              {it.related.map((r, i) => {
                const inner = (
                  <>
                    <span style={{ background: CARD, color: MUTE, fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em", padding: "3px 6px" }}>
                      {r.tag}
                    </span>
                    <span style={{ fontSize: 13.5 }}>{r.name}</span>
                  </>
                );
                const style = {
                  display: "flex", gap: 10, alignItems: "center",
                  padding: "12px 0", borderTop: i ? `1px solid ${LINE}` : "none",
                } as const;
                // 우리 사이트 안으로 가는 링크는 nofollow 를 붙이지 않는다.
                // 외부용으로 만든 규칙을 내부 링크에 그대로 쓰면 페이지끼리 이어지지 않는다.
                // 둘 다 <a> 로 hard navigation 시킨다 — 전면광고는 완전한 페이지 이동에서만 붙는다.
                const isInternal = r.href?.startsWith("/");
                return (
                  <a
                    key={i}
                    href={r.href}
                    className="dl-a"
                    style={style}
                    {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer nofollow" })}
                  >
                    {inner}
                  </a>
                );
              })}
            </div>
          </div>

          <div style={{ background: CARD, padding: 18, marginTop: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 800 }}>찾는 파일이 없나요?</div>
            <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7, color: MUTE }}>{it.requestNote}</p>
            <a href="/download/request" style={{ display: "inline-block", marginTop: 12, color: LIME, fontSize: 13, fontWeight: 800, textDecoration: "none" }}>
              요청 게시판에 남기기 →
            </a>
          </div>
        </aside>
      </section>
    </DownloadShell>
  );
}
