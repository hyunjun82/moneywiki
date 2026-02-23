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

export const Info = ({ type, children }: { type: "warn" | "tip"; children: string }) => (
  <div style={{ borderRadius: 8, padding: "12px 14px", margin: "10px 0", display: "flex", gap: 9, fontSize: 12.5, lineHeight: 1.55, background: type === "warn" ? "#F9FAFB" : C.navyLight, border: type === "warn" ? `1px solid ${C.line}` : "1px solid rgba(30,58,95,.08)", color: type === "warn" ? C.t2 : C.navy }}>
    <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{type === "warn" ? "\u26A0\uFE0F" : "\uD83D\uDCA1"}</span>
    <div dangerouslySetInnerHTML={{ __html: children }} />
  </div>
);

export const SpokeLink = ({ num, title, desc, href }: { num: string; title: string; desc: string; href: string }) => (
  <a href={href} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 8, cursor: "pointer", textDecoration: "none", color: "inherit" }}>
    <div style={{ fontSize: 11, fontWeight: 800, color: C.navy, background: C.navyLight, width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{num}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: C.t1, lineHeight: 1.3 }}>{title}</div>
      <div style={{ fontSize: 11, color: C.t4, marginTop: 1 }}>{desc}</div>
    </div>
    <span style={{ fontSize: 13, color: C.t4 }}>\u2192</span>
  </a>
);

export const InlineLink = ({ icon, title, desc, href }: { icon: string; title: string; desc: string; href: string }) => (
  <a href={href} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", margin: "14px 0", background: C.navyLight2, border: `1px solid ${C.line}`, borderRadius: 10, cursor: "pointer", textDecoration: "none", color: "inherit" }}>
    <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.t1, lineHeight: 1.35 }}>{title}</div>
      <div style={{ fontSize: 12, color: C.t3, marginTop: 2, lineHeight: 1.4 }}>{desc}</div>
    </div>
    <span style={{ fontSize: 18, color: C.navy, fontWeight: 700, flexShrink: 0 }}>\u203A</span>
  </a>
);

export const Divider = () => <div style={{ borderTop: `1px solid ${C.line}`, margin: "36px 0 0" }} />;

export const Sec = ({ n, title, sub }: { n: string; title: string; sub?: string }) => (
  <div style={{ padding: "32px 0 0" }}>
    <div style={{ fontSize: 11, fontWeight: 800, color: C.navy, letterSpacing: 1.5, marginBottom: 4 }}>{n}</div>
    <h2 style={{ fontSize: 20, fontWeight: 800, color: C.t1, lineHeight: 1.35, marginBottom: sub ? 4 : 14 }}>{title}</h2>
    {sub && <div style={{ fontSize: 13.5, color: C.navy, fontWeight: 600, marginBottom: 16 }}>{sub}</div>}
  </div>
);

export const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: C.t2, lineHeight: 1.76, marginBottom: 14 }}>{children}</p>
);

export const B = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: C.t1, fontWeight: 700 }}>{children}</strong>
);

export const A = ({ children, href }: { children: React.ReactNode; href?: string }) => href
  ? <a href={href} style={{ color: C.navy, fontWeight: 600, textDecoration: "underline", textDecorationColor: "rgba(30,58,95,.25)", textUnderlineOffset: 2 }}>{children}</a>
  : <span style={{ color: C.navy, fontWeight: 600, textDecoration: "underline", textDecorationColor: "rgba(30,58,95,.25)", textUnderlineOffset: 2, cursor: "pointer" }}>{children}</span>;

export const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 16.5, fontWeight: 800, color: C.t1, margin: "24px 0 10px" }}>{children}</h3>
);

export const TableTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 15, fontWeight: 800, color: C.t1, marginTop: 24, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>{children}</h3>
);

export const TableNote = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 11.5, color: C.t4, marginTop: 4, marginBottom: 20, lineHeight: 1.45 }}>{children}</div>
);

export const TH = ({ children }: { children: React.ReactNode }) => (
  <th style={{ padding: "9px 8px", fontWeight: 700, color: C.navy, background: C.navyLight, borderBottom: `2px solid ${C.navy}`, textAlign: "center", whiteSpace: "nowrap" as const }}>{children}</th>
);

export const THL = ({ children }: { children: React.ReactNode }) => (
  <th style={{ padding: "9px 8px", fontWeight: 700, color: C.navy, background: C.navyLight, borderBottom: `2px solid ${C.navy}`, textAlign: "left", whiteSpace: "nowrap" as const }}>{children}</th>
);

// ── 브릿지 카드 ──
export const BridgeCard = ({ question, body, btnText, href }: {
  question: string; body: React.ReactNode; btnText: string; href: string;
}) => (
  <a href={href} style={{ display: "block", borderRadius: 12, padding: "18px 20px", margin: "16px 0", background: "#FFF", border: `1.5px solid ${C.line}`, position: "relative", overflow: "hidden", textDecoration: "none", color: "inherit" }}>
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: C.navy }} />
    <div style={{ fontSize: 15, fontWeight: 800, color: C.t1, lineHeight: 1.4, marginBottom: 8 }}>{question}</div>
    <div style={{ fontSize: 13.5, color: C.t3, lineHeight: 1.6, marginBottom: 12 }}>{body}</div>
    <span style={{ display: "inline-flex", background: C.navy, color: "#fff", fontSize: 12.5, fontWeight: 700, padding: "8px 16px", borderRadius: 6 }}>{btnText}</span>
  </a>
);

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

// ── 블로그 레이아웃 래퍼 ──
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
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: "#FAFBFC", minHeight: "100vh", fontFamily: "'Pretendard',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      {/* 네비 */}
      <div style={{ background: "#FFF", borderBottom: `1px solid ${C.line}`, padding: "10px 0", position: "sticky", top: 0, zIndex: 90 }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: C.t4 }}>
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>\u203A</span>}
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
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
              <Tag v="a">{tags[0]}</Tag>
              {tags.slice(1).map((t, i) => <Tag key={i} v="b">{t}</Tag>)}
              <span style={{ fontSize: 11, color: C.t4, marginLeft: 4 }}>\uC218\uC815: {date}</span>
            </div>
          </div>
          <h1 style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.3, color: C.t1, letterSpacing: -0.5, marginBottom: 8 }}>{title}</h1>
          <div style={{ fontSize: 15, color: C.t3, lineHeight: 1.6 }}>{description}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.line}` }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff" }}>M</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>\uBA38\uB2C8\uC704\uD0A4 \uC5D0\uB514\uD130</div>
              <div style={{ fontSize: 11, color: C.t4 }}>\uBCF5\uC9C0\xB7\uC815\uCC45 \uCF58\uD150\uCE20 \uD300</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
        {/* 출처 바 */}
        {sourceBar && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 8, padding: "11px 14px", margin: "8px 0" }}>
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
          \uD83D\uDCCC <strong style={{ color: C.t3 }}>\uBA74\uCC45 \uC870\uD56D:</strong> \uC774 \uAE00\uC740 \uACF5\uC2DD \uBC95\uB839\uACFC \uC815\uBD80 \uC790\uB8CC\uB97C \uBC14\uD0D5\uC73C\uB85C \uC791\uC131\uB41C \uC815\uBCF4 \uC81C\uACF5 \uBAA9\uC801\uC758 \uCF58\uD150\uCE20\uC608\uC694. \uC815\uD655\uD55C \uC218\uAE09 \uD310\uC815\uC740 \uACE0\uC6A9\uC13C\uD130 \uB610\uB294 \uACE0\uC6A924(work24.go.kr)\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.
        </div>

        {/* 도움 투표 */}
        <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 8, padding: "16px", margin: "12px 0", textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.t1, marginBottom: 10 }}>\uC774 \uAE00\uC774 \uB3C4\uC6C0\uC774 \uB410\uB098\uC694?</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <button style={{ padding: "8px 20px", borderRadius: 6, border: `1px solid ${C.line}`, background: "#FFF", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>\uD83D\uDC4D \uB3C4\uC6C0\uB410\uC5B4\uC694</button>
            <button style={{ padding: "8px 20px", borderRadius: 6, border: `1px solid ${C.line}`, background: "#FFF", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>\uD83D\uDC4E \uBD80\uC871\uD574\uC694</button>
          </div>
        </div>

        <div style={{ height: 100 }} />
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
        \uD83D\uDCD1 \uBAA9\uCC28 <span style={{ marginLeft: "auto", fontSize: 11, transform: open ? "none" : "rotate(-90deg)", transition: "transform .2s" }}>\u25BE</span>
      </div>
      {open && (
        <div style={{ padding: "10px 18px 14px" }}>
          {items.map((item, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, padding: "5px 0", fontSize: 13.5, color: C.t2, borderBottom: `1px solid ${C.navyLight2}` }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: C.navy, minWidth: 18 }}>{i + 1}.</span>{item.t}
              </div>
              {item.sub && (
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, padding: "3px 0 3px 26px", fontSize: 12, color: C.t3 }}>
                  \u2514 {item.sub}
                </div>
              )}
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
      <div style={{ padding: "12px 18px", background: C.navyLight2, borderBottom: `1px solid ${C.line}`, fontSize: 13, fontWeight: 700, color: C.navy }}>\uD83D\uDCCB 3\uC904 \uC694\uC57D</div>
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
export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div style={{ margin: "12px 0" }}>
      {items.map((faq, i) => (
        <div key={i} style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 8, marginBottom: 6, overflow: "hidden" }}>
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            style={{ width: "100%", padding: "12px 14px", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, color: C.t1, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ background: C.navy, color: "#fff", fontSize: 9, fontWeight: 800, width: 18, height: 18, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>Q</span>
              {faq.q}
            </span>
            <span style={{ fontSize: 11, color: C.t4, transform: openIdx === i ? "rotate(180deg)" : "none", transition: "transform .2s" }}>\u25BE</span>
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
      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: C.t1, marginBottom: 10 }}>\uD83D\uDCCE \uAD00\uB828 \uAE00</div>
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
          <div style={{ fontSize: 11, color: C.t4, marginBottom: 4 }}>\u2190 \uC774\uC804 \uAE00</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, lineHeight: 1.3 }}>{prev.title}</div>
        </a>
      ) : <div />}
      {next ? (
        <a href={next.href} style={{ padding: "14px 16px", background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 8, textAlign: "right", textDecoration: "none" }}>
          <div style={{ fontSize: 11, color: C.t4, marginBottom: 4 }}>\uB2E4\uC74C \uAE00 \u2192</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, lineHeight: 1.3 }}>{next.title}</div>
        </a>
      ) : <div />}
    </div>
  );
}
