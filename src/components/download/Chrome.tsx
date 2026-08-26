import Link from "next/link";
import { INK, LINE, PAPER, LIME, MUTE, MONO, TICKER, NAV, SHELL_CSS } from "./theme";

/** 티커 + 헤더 + 푸터. 페이지마다 다시 쓰지 않으려고 여기 한 번만 둔다. */
export function DownloadShell({
  children,
  tab,
}: {
  children: React.ReactNode;
  /** 헤더 아래 탭 중 어느 것을 켤지. 없으면 아무것도 안 켠다. */
  tab?: "프로그램 예시" | "드라이버 예시" | "서식 예시";
}) {
  const tabs: { label: "프로그램 예시" | "드라이버 예시" | "서식 예시"; href: string }[] = [
    { label: "프로그램 예시", href: "/download/software" },
    { label: "드라이버 예시", href: "/download/driver" },
    { label: "서식 예시", href: "/download/font" },
  ];

  return (
    <div id="dl-standalone" style={{ minHeight: "100vh", background: INK, color: PAPER }}>
      <style>{SHELL_CSS}</style>

      <div style={{ borderBottom: `1px solid ${LINE}`, overflow: "hidden" }}>
        <div className="dl-marquee" style={{ display: "flex", width: "max-content" }}>
          {[0, 1].map((dup) => (
            <div key={dup} style={{ display: "flex", flex: "0 0 auto", gap: 40, padding: "9px 40px 9px 0" }}>
              {TICKER.map((t, i) => (
                <span
                  key={i}
                  style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: MUTE, textTransform: "uppercase", whiteSpace: "nowrap" }}
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header style={{ borderBottom: `1px solid ${LINE}`, position: "sticky", top: 0, zIndex: 20, background: INK }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 28px", height: 64 }}>
          <Link href="/download" className="dl-a" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>
              다운로드<span style={{ color: LIME }}>.</span>인덱스
            </span>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: MUTE, border: `1px solid ${LINE}`, padding: "2px 6px" }}>
              KR/2026
            </span>
          </Link>
          <nav className="dl-nav" style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="dl-a" style={{ fontSize: 14, whiteSpace: "nowrap" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="dl-search" style={{ marginLeft: "auto", borderLeft: `1px solid ${LINE}`, paddingLeft: 20, minWidth: 260, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: MUTE, fontFamily: MONO, fontSize: 12 }}>/</span>
            <span style={{ color: MUTE, fontSize: 13 }}>모델명 · 프로그램 검색</span>
          </div>
        </div>
        <div style={{ display: "flex", borderTop: `1px solid ${LINE}` }}>
          {tabs.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className="dl-a"
              style={{
                padding: "12px 22px",
                fontSize: 13,
                fontWeight: 700,
                background: tab === t.label ? LIME : "transparent",
                color: tab === t.label ? INK : PAPER,
                borderRight: `1px solid ${LINE}`,
              }}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </header>

      {children}

      <DownloadFooter />
    </div>
  );
}

export function DownloadFooter() {
  return (
    <footer style={{ borderTop: `1px solid ${LINE}`, padding: "40px 28px 56px", marginTop: 64 }}>
      <div className="dl-foot">
        <div>
          <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", color: LIME }}>DOWNLOAD INDEX</div>
          <p style={{ marginTop: 12, maxWidth: 420, fontSize: 13, lineHeight: 1.7, color: MUTE }}>
            공식 배포처 원본만 연결하는 다운로드 색인. 저작권 문제가 있는 파일은 신고 즉시 삭제합니다.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", color: MUTE }}>INDEX</div>
          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            {NAV.slice(0, 3).map((n) => (
              <Link key={n.href} href={n.href} className="dl-a" style={{ fontSize: 13 }}>
                {n.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", color: MUTE }}>INFO</div>
          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            <Link href="/download/request" className="dl-a" style={{ fontSize: 13 }}>요청 게시판</Link>
            <Link href="/terms" className="dl-a" style={{ fontSize: 13 }}>이용약관</Link>
            <Link href="/privacy" className="dl-a" style={{ fontSize: 13 }}>개인정보처리방침</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** 빵부스러기 — HOME / 소프트웨어 / 미디어 플레이어 / 곰플레이어 */
export function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <div style={{ borderBottom: `1px solid ${LINE}`, padding: "14px 28px", display: "flex", gap: 10, flexWrap: "wrap", fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: MUTE }}>
      <Link href="/download" className="dl-a">HOME</Link>
      {trail.map((t, i) => (
        <span key={i} style={{ display: "flex", gap: 10 }}>
          <span>/</span>
          {t.href ? (
            <Link href={t.href} className="dl-a">{t.label}</Link>
          ) : (
            <span style={{ color: PAPER }}>{t.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
