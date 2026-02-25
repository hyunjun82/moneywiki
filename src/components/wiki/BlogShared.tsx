"use client";

import React, { useState } from "react";

// 색상 팔레트 (navy 테마)
export const C = {
  navy: "#1E3A5F",
  navyLight: "#EDF2F8",
  navyLight2: "#F5F8FB",
  t1: "#111827",
  t2: "#374151",
  t3: "#6B7280",
  t4: "#9CA3AF",
  line: "#E5E7EB",
};

// ── 공통 서브컴포넌트 ──

export const Btn = ({ group, value, label, sel, pick }: {
  group: string; value: string; label: string;
  sel: Record<string, string>; pick: (g: string, v: string) => void;
}) => (
  <button
    onClick={() => pick(group, value)}
    style={{
      padding: "8px 13px",
      border: sel[group] === value ? `1.5px solid ${C.navy}` : `1.5px solid ${C.line}`,
      borderRadius: 8,
      background: sel[group] === value ? C.navy : "#FFF",
      color: sel[group] === value ? "#FFF" : C.t3,
      fontSize: 12.5,
      fontWeight: sel[group] === value ? 700 : 500,
      cursor: "pointer",
      whiteSpace: "nowrap" as const,
      fontFamily: "inherit",
    }}
  >
    {label}
  </button>
);

export const Tag = ({ v, children }: { v: "a" | "b"; children: React.ReactNode }) => (
  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: v === "a" ? C.navy : C.navyLight, color: v === "a" ? "#fff" : C.navy }}>
    {children}
  </span>
);

export const Info = ({ type = "tip", children }: { type?: "warn" | "tip"; children: string }) => (
  <div style={{ borderRadius: 10, padding: "16px 18px", margin: "20px 0", display: "flex", gap: 10, fontSize: 13, lineHeight: 1.6, background: type === "warn" ? "#FFFBF0" : C.navyLight, border: type === "warn" ? "1px solid #F5E6C8" : "1px solid rgba(30,58,95,.08)", color: type === "warn" ? "#92400E" : C.navy }}>
    <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{type === "warn" ? "\u26A0\uFE0F" : "\uD83D\uDCA1"}</span>
    <div dangerouslySetInnerHTML={{ __html: children }} />
  </div>
);

export const SpokeLink = ({ num = "→", title, desc, href }: { num?: string; title: string; desc: string; href: string }) => (
  <a href={href} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 8, cursor: "pointer", textDecoration: "none", color: "inherit" }}>
    <div style={{ fontSize: 11, fontWeight: 800, color: C.navy, background: C.navyLight, width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{num}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: C.t1, lineHeight: 1.3 }}>{title}</div>
      <div style={{ fontSize: 11, color: C.t4, marginTop: 1 }}>{desc}</div>
    </div>
    <span style={{ fontSize: 13, color: C.t4 }}>{"\u2192"}</span>
  </a>
);

export const InlineLink = ({ icon = "📄", title, label, desc = "", href }: { icon?: string; title?: string; label?: string; desc?: string; href: string }) => {
  const t = title ?? label ?? "";
  return (
    <a href={href} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", margin: "24px 0", background: "#FFF", border: `1.5px solid ${C.line}`, borderRadius: 12, cursor: "pointer", textDecoration: "none", color: "inherit" }}>
      <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: C.navy, lineHeight: 1.35 }}>{t}</div>
        {desc && <div style={{ fontSize: 12.5, color: C.t3, marginTop: 3, lineHeight: 1.45 }}>{desc}</div>}
      </div>
      <span style={{ fontSize: 18, color: C.navy, fontWeight: 700, flexShrink: 0 }}>{"\u203A"}</span>
    </a>
  );
};

export const Divider = () => <div style={{ borderTop: `1px solid ${C.line}`, margin: "52px 0 0" }} />;

export const Sec = ({ n, id, title, question, sub, children }: { n?: string; id?: string; title?: string; question?: string; sub?: string; children?: React.ReactNode }) => {
  const num = n ?? (id ? id.replace("h2-", "0") : "");
  const heading = title ?? question ?? "";
  return (
    <div style={{ padding: "36px 0 0" }}>
      {num && <div style={{ fontSize: 11, fontWeight: 800, color: C.navy, letterSpacing: 1.5, marginBottom: 6 }}>{num}</div>}
      <h2 style={{ fontSize: 20, fontWeight: 800, color: C.t1, lineHeight: 1.35, marginBottom: sub ? 6 : 18 }}>{heading}</h2>
      {sub && <div style={{ fontSize: 13.5, color: C.navy, fontWeight: 600, marginBottom: 20 }}>{sub}</div>}
      {children}
    </div>
  );
};

export const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: C.t2, lineHeight: 1.78, marginBottom: 20 }}>{children}</p>
);

export const B = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: C.t1, fontWeight: 700 }}>{children}</strong>
);

export const A = ({ children, href }: { children: React.ReactNode; href?: string }) => href
  ? <a href={href} style={{ color: C.navy, fontWeight: 600, textDecoration: "underline", textDecorationColor: "rgba(30,58,95,.25)", textUnderlineOffset: 2 }}>{children}</a>
  : <span style={{ color: C.navy, fontWeight: 600, textDecoration: "underline", textDecorationColor: "rgba(30,58,95,.25)", textUnderlineOffset: 2, cursor: "pointer" }}>{children}</span>;

export const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 16.5, fontWeight: 800, color: C.t1, margin: "32px 0 14px" }}>{children}</h3>
);

export const TableTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 15, fontWeight: 800, color: C.t1, marginTop: 32, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>{children}</h3>
);

export const TableNote = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 11.5, color: C.t4, marginTop: 6, marginBottom: 24, lineHeight: 1.45 }}>{children}</div>
);

export const TH = ({ children }: { children: React.ReactNode }) => (
  <th style={{ padding: "9px 8px", fontWeight: 700, color: C.navy, background: C.navyLight, borderBottom: `2px solid ${C.navy}`, textAlign: "center", whiteSpace: "nowrap" as const }}>{children}</th>
);

export const THL = ({ children }: { children: React.ReactNode }) => (
  <th style={{ padding: "9px 8px", fontWeight: 700, color: C.navy, background: C.navyLight, borderBottom: `2px solid ${C.navy}`, textAlign: "left", whiteSpace: "nowrap" as const }}>{children}</th>
);

// ── 브릿지 카드 ──
export const BridgeCard = ({ question, q, body, a, btnText, label, href }: {
  question?: string; q?: string; body?: React.ReactNode; a?: string; btnText?: string; label?: string; href: string;
}) => {
  const heading = question ?? q ?? "";
  const bodyContent = body ?? a ?? "";
  const btn = btnText ?? label ?? "자세히 보기";
  return (
    <a href={href} style={{ display: "block", borderRadius: 12, padding: "20px 22px", margin: "28px 0", background: "#FFF", border: `1.5px solid ${C.line}`, position: "relative", overflow: "hidden", textDecoration: "none", color: "inherit" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: C.navy }} />
      <div style={{ fontSize: 15, fontWeight: 800, color: C.t1, lineHeight: 1.4, marginBottom: 8 }}>{heading}</div>
      <div style={{ fontSize: 13.5, color: C.t3, lineHeight: 1.6, marginBottom: 12 }}>{bodyContent}</div>
      <span style={{ display: "inline-flex", background: C.navy, color: "#fff", fontSize: 12.5, fontWeight: 700, padding: "8px 16px", borderRadius: 6 }}>{btn}</span>
    </a>
  );
};

// ── Ext 버튼 ──
export const ExtBtn = ({ badge, text, cta, href }: {
  badge: string; text: string; cta: string; href: string;
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", margin: "16px 0", padding: "16px 20px", background: C.navy, borderRadius: 10, textDecoration: "none", color: "#fff" }}>
    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 3, background: "rgba(255,255,255,.2)", marginBottom: 6, display: "inline-block" }}>{badge}</span>
    <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{text}</div>
    <div style={{ fontSize: 12, marginTop: 2, opacity: 0.8 }}>{cta}</div>
  </a>
);

// ── 본문 중간 관련 카드 섹션 ──
export function RelatedMid({ title = "다른 글도 비교해 보세요", items, hubHref, hubLabel }: {
  title?: string;
  items: { icon: string; title: string; desc: string; href: string }[];
  hubHref?: string;
  hubLabel?: string;
}) {
  return (
    <div style={{ margin: "32px 0", padding: "22px 20px", background: "#FFF", border: `1.5px solid ${C.line}`, borderRadius: 14 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: C.t1, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 4, height: 16, background: C.navy, borderRadius: 2, flexShrink: 0 }} />
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => (
          <a key={i} href={item.href} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", background: C.navyLight2, borderRadius: 10, border: `1px solid ${C.navyLight}`, textDecoration: "none", cursor: "pointer" }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: C.navy, lineHeight: 1.3 }}>{item.title}</div>
              <div style={{ fontSize: 12.5, color: C.t3, marginTop: 3 }}>{item.desc}</div>
            </div>
            <span style={{ fontSize: 16, color: C.t4, flexShrink: 0 }}>{"\u203A"}</span>
          </a>
        ))}
      </div>
      {hubHref && (
        <a href={hubHref} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 14, padding: "13px 0", borderRadius: 10, border: `1.5px solid ${C.line}`, background: "#FFF", textDecoration: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, color: C.t3 }}>
          <span style={{ fontSize: 15 }}>{"\u203A"}</span> {hubLabel ?? "전체 보기"}
        </a>
      )}
    </div>
  );
}

// ── 사이드바: CTA 카드 (amber 테마) ──
export function SidebarCTA({ items }: {
  items: { icon: string; title: string; sub: string; href: string; hot?: boolean }[];
}) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #F0E6D0" }}>
      {items.map((item, i) => (
        <a key={i} href={item.href} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: item.hot ? "#FFF8E7" : "#FFF", borderBottom: i < items.length - 1 ? "1px solid #F0E6D0" : "none", textDecoration: "none", cursor: "pointer", position: "relative", overflow: "hidden" }}>
          {item.hot && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "#E5A200" }} />}
          <div style={{ width: 40, height: 40, borderRadius: 10, background: item.hot ? "#FFF3CD" : "#FFF8E7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: C.t1, lineHeight: 1.3 }}>{item.title}</div>
            <div style={{ fontSize: 11.5, color: item.hot ? "#92600E" : C.t3, marginTop: 1 }}>{item.sub}</div>
          </div>
          <span style={{ fontSize: 14, color: item.hot ? "#E5A200" : C.t4, fontWeight: 700, flexShrink: 0 }}>{"\u203A"}</span>
        </a>
      ))}
    </div>
  );
}

// ── 사이드바: 관련 문서 ──
export function SidebarDocs({ items }: {
  items: { title: string; cat: string; href: string }[];
}) {
  return (
    <div style={{ background: "#FFF", borderRadius: 14, border: `1px solid ${C.line}`, padding: "16px" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 12, display: "flex", alignItems: "center", gap: 5 }}>{"\uD83D\uDCCE"} 관련 문서</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => (
          <a key={i} href={item.href} style={{ display: "flex", gap: 10, textDecoration: "none", cursor: "pointer" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.navyLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: C.navy, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, lineHeight: 1.35 }}>{item.title}</div>
              <div style={{ fontSize: 10.5, color: C.t4, marginTop: 1 }}>{item.cat}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── 사이드바: 인기 계산기 ──
export function SidebarCalc({ items }: {
  items: { title: string; href: string }[];
}) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${C.line}` }}>
      <div style={{ background: C.navy, padding: "12px 16px", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 14 }}>{"\uD83E\uDDEE"}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#FFF" }}>인기 계산기</span>
      </div>
      <div style={{ background: "#FFF", padding: "10px 16px" }}>
        {items.map((item, i) => (
          <a key={i} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < items.length - 1 ? `1px solid ${C.navyLight2}` : "none", textDecoration: "none", cursor: "pointer" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: i < 3 ? C.navy : C.navyLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 800, color: i < 3 ? "#FFF" : C.t3, flexShrink: 0 }}>{i + 1}</div>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: C.t2 }}>{item.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── 블로그 레이아웃 래퍼 (2컬럼 지원) ──
export function BlogLayout({
  breadcrumb,
  tags,
  date,
  title,
  description,
  sourceBar,
  stickyLabel,
  stickyValue,
  stickyBtn,
  stickyHref,
  sidebar,
  disclaimer,
  children,
}: {
  breadcrumb: string[];
  tags: string[];
  date: string;
  title: string;
  description: React.ReactNode;
  sourceBar?: { badge: string; name: string; date: string };
  stickyLabel: string;
  stickyValue: string;
  stickyBtn: string;
  stickyHref?: string;
  sidebar?: React.ReactNode;
  disclaimer?: string;
  children: React.ReactNode;
}) {
  const hasSidebar = !!sidebar;
  const containerWidth = hasSidebar ? 1020 : 680;
  return (
    <div style={{ background: "#FAFBFC", minHeight: "100vh", fontFamily: "'Pretendard',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      {/* 네비 */}
      <div style={{ background: "#FFF", borderBottom: `1px solid ${C.line}`, padding: "10px 0", position: "sticky", top: 0, zIndex: 90 }}>
        <div style={{ maxWidth: containerWidth, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: C.t4 }}>
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>{"\u203A"}</span>}
              {i < breadcrumb.length - 1
                ? <span>{b}</span>
                : <span style={{ color: C.t2, fontWeight: 600 }}>{b}</span>
              }
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 히어로 */}
      <div style={{ background: "#FFF", borderBottom: `1px solid ${C.line}`, padding: "32px 0 28px" }}>
        <div style={{ maxWidth: containerWidth, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
              <Tag v="a">{tags[0]}</Tag>
              {tags.slice(1).map((t, i) => <Tag key={i} v="b">{t}</Tag>)}
              <span style={{ fontSize: 11, color: C.t4, marginLeft: 4 }}>{"수정: "}{date}</span>
            </div>
          </div>
          <h1 style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.3, color: C.t1, letterSpacing: -0.5, marginBottom: 8 }}>{title}</h1>
          <div style={{ fontSize: 15, color: C.t3, lineHeight: 1.6 }}>{description}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.line}` }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff" }}>M</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>{"머니위키 에디터"}</div>
              <div style={{ fontSize: 11, color: C.t4 }}>{"복지\u00B7정책 콘텐츠 팀"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2컬럼 래퍼 */}
      <div style={{ maxWidth: containerWidth, margin: "0 auto", padding: "0 20px", display: hasSidebar ? "flex" : "block", gap: 32, alignItems: "flex-start" }}>
        {/* 좌: 본문 */}
        <div style={hasSidebar ? { flex: "1 1 680px", minWidth: 0, maxWidth: 680 } : {}}>
          {/* 출처 바 */}
          {sourceBar && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 8, padding: "11px 14px", margin: "14px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ background: C.navy, color: "#fff", fontSize: 10.5, fontWeight: 700, padding: "2px 7px", borderRadius: 3 }}>{sourceBar.badge}</span>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: C.t1 }}>{sourceBar.name}</span>
              </div>
              <span style={{ fontSize: 12, color: C.t4 }}>{sourceBar.date}</span>
            </div>
          )}

          {children}

          {/* 면책 */}
          <div style={{ background: C.navyLight2, border: `1px solid ${C.line}`, borderRadius: 8, padding: "12px 16px", margin: "16px 0", fontSize: 11.5, color: C.t4, lineHeight: 1.5 }}>
            {"\uD83D\uDCCC"} <strong style={{ color: C.t3 }}>{"면책 조항:"}</strong> {disclaimer ?? "이 글은 공식 법령과 정부 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 수급 판정은 고용센터 또는 고용24(work24.go.kr)에서 확인하세요."}
          </div>

          {/* 도움 투표 */}
          <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 10, padding: "18px", margin: "12px 0", textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.t1, marginBottom: 10 }}>{"이 글이 도움이 됐나요?"}</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button style={{ padding: "8px 20px", borderRadius: 8, border: `1px solid ${C.line}`, background: "#FFF", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>{"\uD83D\uDC4D 도움됐어요"}</button>
              <button style={{ padding: "8px 20px", borderRadius: 8, border: `1px solid ${C.line}`, background: "#FFF", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>{"\uD83D\uDC4E 부족해요"}</button>
            </div>
          </div>

          <div style={{ height: 100 }} />
        </div>

        {/* 우: 사이드바 (데스크톱 전용) */}
        {hasSidebar && (
          <aside style={{ flex: "0 0 280px", position: "sticky", top: 60, alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: 20, paddingTop: 16 }}>
            {sidebar}
          </aside>
        )}
      </div>

      {/* 스티키 하단 바 */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#FFF", borderTop: `1px solid ${C.line}`, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 14, zIndex: 80, boxShadow: "0 -2px 12px rgba(0,0,0,.05)" }}>
        <div>
          <div style={{ fontSize: 11, color: C.t3 }}>{stickyLabel}</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: C.navy }}>{stickyValue}</div>
        </div>
        {stickyHref ? (
          <a href={stickyHref} style={{ background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, padding: "11px 20px", borderRadius: 8, border: "none", textDecoration: "none", display: "inline-block" }}>
            {stickyBtn}
          </a>
        ) : (
          <button style={{ background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, padding: "11px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            {stickyBtn}
          </button>
        )}
      </div>
    </div>
  );
}

// ── 목차 컴포넌트 ──
export function TOC({ items }: { items: { t: string; sub?: string | null }[] }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background: "#FFF", margin: "10px 0", borderRadius: 12, border: `1px solid ${C.line}`, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "12px 18px", background: C.navyLight2, borderBottom: `1px solid ${C.line}`, fontSize: 13, fontWeight: 700, color: C.navy, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
        {"\uD83D\uDCD1 목차"} <span style={{ marginLeft: "auto", fontSize: 11, transform: open ? "none" : "rotate(-90deg)", transition: "transform .2s" }}>{"\u25BE"}</span>
      </div>
      {open && (
        <div style={{ padding: "10px 18px 14px" }}>
          {items.map((item, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, padding: "5px 0", fontSize: 13.5, color: C.t2, borderBottom: `1px solid ${C.navyLight2}` }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: C.navy, minWidth: 18 }}>{i + 1}.</span>{item.t}
              </div>
              {item.sub && item.sub.split(" · ").map((s, si) => (
                <div key={si} style={{ padding: "2px 0 2px 26px", fontSize: 12, color: C.t3 }}>
                  {"\u2514"} {s}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── 3줄 요약 ──
export function Summary3({ items }: { items: string[] }) {
  return (
    <div style={{ background: "#FFF", margin: "10px 0", borderRadius: 12, border: `1px solid ${C.line}`, overflow: "hidden" }}>
      <div style={{ padding: "12px 18px", background: C.navyLight2, borderBottom: `1px solid ${C.line}`, fontSize: 13, fontWeight: 700, color: C.navy }}>{"\uD83D\uDCCB 3줄 요약"}</div>
      <div style={{ padding: "14px 18px" }}>
        {items.map((t, i) => (
          <div key={i} style={{ fontSize: 14, color: C.t2, padding: "5px 0 5px 18px", position: "relative", lineHeight: 1.55 }}>
            <span style={{ position: "absolute", left: 1, top: 12, width: 6, height: 6, borderRadius: "50%", background: C.navy }} />
            <span dangerouslySetInnerHTML={{ __html: t }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FAQ 아코디언 ──
export function FAQAccordion({ items }: { items: ({ q?: string; a?: string; question?: string; answer?: string })[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const normalized = items.map(f => ({ q: f.q ?? f.question ?? "", a: f.a ?? f.answer ?? "" }));
  return (
    <div style={{ margin: "12px 0" }}>
      {normalized.map((faq, i) => (
        <div key={i} style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 8, marginBottom: 6, overflow: "hidden" }}>
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            style={{ width: "100%", padding: "12px 14px", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, color: C.t1, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ background: C.navy, color: "#fff", fontSize: 9, fontWeight: 800, width: 18, height: 18, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>Q</span>
              {faq.q}
            </span>
            <span style={{ fontSize: 11, color: C.t4, transform: openIdx === i ? "rotate(180deg)" : "none", transition: "transform .2s" }}>{"\u25BE"}</span>
          </button>
          {openIdx === i && (
            <div style={{ padding: "0 14px 14px", fontSize: 13, color: C.t3, lineHeight: 1.6 }}>
              <div dangerouslySetInnerHTML={{ __html: faq.a }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── 관련 글 섹션 ──
export function RelatedArticles({ items }: { items: { title: string; desc: string; href: string }[] }) {
  return (
    <>
      <Divider />
      <div style={{ marginTop: 28 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: C.t1, marginBottom: 14 }}>{"\uD83D\uDCCE 관련 글"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {items.map((item, i) => (
            <SpokeLink key={i} num={String(i + 1).padStart(2, "0")} title={item.title} desc={item.desc} href={item.href} />
          ))}
        </div>
      </div>
    </>
  );
}

// ── 이전/다음 네비게이션 ──
export function PrevNext({ prev, next }: {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "20px 0 0" }}>
      {prev ? (
        <a href={prev.href} style={{ padding: "14px 16px", background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 8, textDecoration: "none" }}>
          <div style={{ fontSize: 11, color: C.t4, marginBottom: 4 }}>{"\u2190 이전 글"}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, lineHeight: 1.3 }}>{prev.title}</div>
        </a>
      ) : <div />}
      {next ? (
        <a href={next.href} style={{ padding: "14px 16px", background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 8, textAlign: "right", textDecoration: "none" }}>
          <div style={{ fontSize: 11, color: C.t4, marginBottom: 4 }}>{"다음 글 \u2192"}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, lineHeight: 1.3 }}>{next.title}</div>
        </a>
      ) : <div />}
    </div>
  );
}

// ── 공식 박스 ──
export const FormulaCard = ({ formula, notes }: {
  formula: string; notes?: string[];
}) => (
  <div style={{ background: C.navyLight, border: "1px solid rgba(30,58,95,.08)", borderRadius: 8, padding: "14px 16px", margin: "12px 0", textAlign: "center" }}>
    <div style={{ fontSize: 15, fontWeight: 800, color: C.navy, marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: formula }} />
    {notes && notes.length > 0 && (
      <div style={{ fontSize: 12, color: C.t3, lineHeight: 1.5 }}>
        {notes.map((n, i) => (
          <React.Fragment key={i}>{i > 0 && <br />}{n}</React.Fragment>
        ))}
      </div>
    )}
  </div>
);

// ── 체커 쉘 (자격 체크 카드 래퍼) ──
export const CheckerShell = ({ icon = "✔", title, sub, desc, children }: {
  icon?: string; title: string; sub?: string; desc?: string; children: React.ReactNode;
}) => (
  <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
    <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{icon}</div>
      <div>
        <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>{title}</h3>
        {sub && <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>{sub}</p>}
      </div>
    </div>
    <div style={{ padding: "20px 18px" }}>
      {desc && <div style={{ fontSize: 13.5, color: C.t3, lineHeight: 1.65, marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${C.line}` }}>{desc}</div>}
      {children}
    </div>
  </div>
);

// ── 체커 질문 행 ──
export const CheckerQ = ({ n, label, group, opts, sel, pick }: {
  n: string; label: string; group: string;
  opts: [string, string][]; sel: Record<string, string>;
  pick: (g: string, v: string) => void;
}) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
      <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{n}</span>
      {label}
    </div>
    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
      {opts.map(([v, l]) => <Btn key={v} group={group} value={v} label={l} sel={sel} pick={pick} />)}
    </div>
  </div>
);

// ── 체커 통과 결과 래퍼 ──
export const ResultPass = ({ title = "✅ 수급 가능성이 높아요", desc, children }: {
  title?: string; desc?: string; children: React.ReactNode;
}) => (
  <div style={{ marginTop: 16, borderRadius: 10, background: "#FFF", border: `1.5px solid ${C.navy}`, overflow: "hidden" }}>
    <div style={{ background: C.navyLight, padding: "14px 16px", borderBottom: "1px solid rgba(30,58,95,.12)" }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: C.navy, marginBottom: 2 }}>{title}</div>
      {desc && <div style={{ fontSize: 12.5, color: C.t3, lineHeight: 1.5 }}>{desc}</div>}
    </div>
    <div style={{ padding: "14px 16px" }}>{children}</div>
  </div>
);

// ── 체커 탈락 결과 래퍼 ──
export const ResultFail = ({ title = "⛔ 기준 초과 — 하지만 방법이 있어요", desc, children }: {
  title?: string; desc?: string; children: React.ReactNode;
}) => (
  <div style={{ marginTop: 16, borderRadius: 10, background: "#FFF", border: `1.5px solid ${C.line}`, overflow: "hidden" }}>
    <div style={{ background: "#F9FAFB", padding: "14px 16px", borderBottom: `1px solid ${C.line}` }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: C.t1, marginBottom: 2 }}>{title}</div>
      {desc && <div style={{ fontSize: 12.5, color: C.t3, lineHeight: 1.5 }}>{desc}</div>}
    </div>
    <div style={{ padding: "14px 16px" }}>{children}</div>
  </div>
);

// ── 체커 결과 2×2 그리드 ──
export const ResultGrid = ({ items }: {
  items: { icon: string; name: string; pass: boolean; desc: string }[];
}) => (
  <div>
    <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 8 }}>{"\uD83D\uDCCB"} 나의 급여별 예상 결과</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 6 }}>
      {items.map((i, idx) => (
        <div key={idx} style={{ padding: "10px 12px", borderRadius: 6, background: i.pass ? C.navyLight : "#FAFAFA", border: `1px solid ${i.pass ? "rgba(30,58,95,.12)" : C.line}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
            <span style={{ fontSize: 14 }}>{i.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: i.pass ? C.navy : C.t4 }}>{i.name}</span>
          </div>
          <div style={{ fontSize: 11.5, color: i.pass ? C.t2 : C.t4, lineHeight: 1.45 }}>{i.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

// ── 체커 결과 CTA 링크 ──
export const ResultCTA = ({ icon = "\uD83D\uDD0D", title, desc, href, dark = false }: {
  icon?: string; title: string; desc?: string; href: string; dark?: boolean;
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{
    display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
    background: dark ? C.navy : "#F9FAFB",
    border: dark ? "none" : `1px solid ${C.line}`,
    borderRadius: 6, textDecoration: "none", marginBottom: 6,
  }}>
    <span style={{ fontSize: 16 }}>{icon}</span>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: dark ? "#fff" : C.t1 }}>{title}</div>
      {desc && <div style={{ fontSize: 11, color: dark ? "rgba(255,255,255,.7)" : C.t4, marginTop: 1 }}>{desc}</div>}
    </div>
    <span style={{ fontSize: 11, color: dark ? "rgba(255,255,255,.6)" : C.t4 }}>{"\u2192"}</span>
  </a>
);

// ── 체커 결과 내부 섹션 구분 ──
export const ResultSection = ({ icon, title, children }: {
  icon?: string; title: string; children: React.ReactNode;
}) => (
  <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.line}` }}>
    <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 8 }}>{icon && `${icon} `}{title}</div>
    {children}
  </div>
);

// ── 체커 대안 링크 목록 ──
export const ResultAltLinks = ({ items }: {
  items: { icon: string; title: string; desc: string }[];
}) => (
  <div>
    {items.map((item, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < items.length - 1 ? `1px solid ${C.navyLight}` : "none", cursor: "pointer" }}>
        <span style={{ fontSize: 15 }}>{item.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{item.title}</div>
          <div style={{ fontSize: 11, color: C.t4, marginTop: 1 }}>{item.desc}</div>
        </div>
        <span style={{ fontSize: 11, color: C.t4 }}>{"\u2192"}</span>
      </div>
    ))}
  </div>
);

// ── 사례 박스 (계산 예시) — navy 테마 ──
export const CaseBox = ({ badge, label, cond, conditions, steps, total, result, pass, note }: {
  badge: string; label: string;
  cond?: string; conditions?: string[];
  steps?: string[] | { label: string; value: string }[];
  total?: string;
  result: string;
  pass: boolean;
  note?: string;
}) => {
  const condText = cond || (conditions ? conditions.join(", ") : undefined);
  const stepStrings = steps?.map(s => typeof s === "string" ? s : `${s.label}: ${s.value}`);
  return (
    <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, margin: "12px 0", overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", background: C.navyLight, borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ background: C.navy, color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 4 }}>{badge}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.t1 }}>{label}</span>
      </div>
      <div style={{ padding: 16, fontSize: 13, color: C.t2, lineHeight: 1.7 }}>
        {condText && <div style={{ marginBottom: 8 }}><strong style={{ color: C.t1, fontWeight: 700 }}>{"조건:"}</strong> {condText}</div>}
        {stepStrings && (
          <div style={{ background: C.navyLight2, borderRadius: 6, padding: "12px 14px", fontSize: 12.5, lineHeight: 1.8 }}>
            {stepStrings.map((s, si) => <div key={si}>{s}</div>)}
            {total && <div style={{ marginTop: 6, paddingTop: 6, borderTop: `1px solid ${C.line}` }}><strong style={{ color: C.t1, fontWeight: 700 }}>{total}</strong></div>}
          </div>
        )}
        {!stepStrings && total && <div style={{ fontSize: 13.5, fontWeight: 800, color: C.t1, marginTop: 6 }}>{total}</div>}
        <div style={{ marginTop: 10, padding: "10px 14px", background: pass ? C.navyLight : "#F5F5F5", borderRadius: 6, border: pass ? "1px solid rgba(30,58,95,.15)" : `1px solid ${C.line}`, fontSize: 13 }}>
          {pass ? "\u2705" : "\u26D4"} <strong style={{ color: C.t1, fontWeight: 700 }}>{"결과:"}</strong>{" "}
          <span style={{ color: pass ? C.navy : C.t1, fontWeight: 700 }}>{result}</span>
          {note && <div style={{ fontSize: 12, color: C.t3, marginTop: 4 }}>{note}</div>}
        </div>
      </div>
    </div>
  );
};

// ── 칩스 그리드 (상태 비교) ──
export const ChipsGrid = ({ items }: {
  items: { icon: string; label: string; value: string }[];
}) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, 1fr)`, gap: 8, margin: "12px 0" }}>
    {items.map((ch, i) => (
      <div key={i} style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 8, padding: "12px 6px", textAlign: "center" as const }}>
        <div style={{ fontSize: 20, marginBottom: 3 }}>{ch.icon}</div>
        <div style={{ fontSize: 10.5, color: C.t4, marginBottom: 2 }}>{ch.label}</div>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.navy }}>{ch.value}</div>
      </div>
    ))}
  </div>
);

// ── 특징 리스트 (dbox 대체) ──
export const FeatureList = ({ title, items }: {
  title: string;
  items: { heading: string; desc: string }[];
}) => (
  <div style={{ background: C.navyLight2, border: `1px solid ${C.line}`, borderRadius: 8, margin: "12px 0", overflow: "hidden" }}>
    <div style={{ padding: "11px 16px", fontSize: 13.5, fontWeight: 700, color: C.t1, borderBottom: `1px solid ${C.line}`, background: "#FFF" }}>{title}</div>
    {items.map((item, i) => (
      <div key={i} style={{ padding: "12px 16px", borderBottom: i < items.length - 1 ? `1px solid ${C.line}` : "none", display: "flex", gap: 12 }}>
        <div style={{ width: 22, height: 22, background: C.navy, color: "#fff", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 1, margin: 0 }}>{item.heading}</h4>
          <p style={{ fontSize: 12, color: C.t3, lineHeight: 1.45, margin: 0 }}>{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

// ── 단계별 절차 ──
export const Steps = ({ items }: {
  items: { title: string; desc?: string }[];
}) => (
  <div style={{ margin: "14px 0" }}>
    {items.map((item, i) => (
      <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < items.length - 1 ? `1px solid ${C.line}` : "none" }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {i + 1}
        </div>
        <div style={{ flex: 1, paddingTop: 2 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.t1, lineHeight: 1.35 }}>{item.title}</div>
          {item.desc && <div style={{ fontSize: 13, color: C.t3, marginTop: 4, lineHeight: 1.6 }}>{item.desc}</div>}
        </div>
      </div>
    ))}
  </div>
);
