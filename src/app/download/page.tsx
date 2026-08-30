export const dynamic = "force-static";
import type { Metadata } from "next";
import { DownloadShell } from "@/components/download/Chrome";
import { INK, LINE, PAPER, LIME, MUTE, CARD, CARD2, MONO } from "@/components/download/theme";
import { ALL_ITEMS, CATEGORIES, itemsIn, itemHref, categoryLabel } from "@/data/download";

export const metadata: Metadata = {
  // 루트 레이아웃이 "%s | 머니위키" 템플릿을 붙인다. 이 페이지는 독립 화면이라 absolute 로 끊는다.
  title: { absolute: "다운로드 인덱스 — 프로그램·드라이버·게임·폰트·서식" },
  description:
    "프로그램·드라이버·게임·폰트·서식을 국내 기기 모델 단위까지 색인한 다운로드 데이터베이스. 공식 배포처 원본만 연결합니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/download" },
};

/** 카테고리 카드의 색조 — 원본 배치를 그대로 따른다 */
const TONE: Record<string, string> = {
  software: "lime",
  driver: "paper",
  game: "dark",
  font: "dark2",
  app: "dark",
};

const DESC: Record<string, string> = {
  software: "곰플레이어·알집·V3·한글뷰어 등 PC 필수 프로그램",
  driver: "프린터·노트북·그래픽카드·복합기 모델별 드라이버와 매뉴얼",
  game: "웹보드 게임부터 PC·모바일 설치 파일까지",
  font: "무료폰트, 사직서·근로계약서 등 실무 양식",
  app: "모바일 앱, 코덱, 미디어 도구",
};

const makers = [
  { name: "삼성전자", n: "SL · SCX" },
  { name: "HP", n: "LaserJet" },
  { name: "캐논", n: "PIXMA" },
  { name: "엡손", n: "L · XP" },
  { name: "브라더", n: "DCP · HL" },
  { name: "LG전자", n: "그램 · PC" },
  { name: "신도리코", n: "D · N" },
  { name: "NVIDIA", n: "GeForce" },
];

function toneStyle(tone: string) {
  if (tone === "lime") return { background: LIME, color: INK, sub: "rgba(11,11,12,.68)" };
  if (tone === "paper") return { background: PAPER, color: INK, sub: "rgba(11,11,12,.62)" };
  if (tone === "dark2") return { background: CARD2, color: PAPER, sub: MUTE };
  return { background: CARD, color: PAPER, sub: MUTE };
}

export default function DownloadPage() {
  // 숫자는 실제 색인된 항목에서 뽑는다. 손으로 적어 두면 데이터가 늘어도 그대로 굳는다.
  const total = ALL_ITEMS.length;
  const driverCount = itemsIn("driver").length;
  const stats = [
    { k: "INDEXED FILES", v: total.toLocaleString("ko-KR"), lime: false },
    { k: "DEVICE MODELS", v: driverCount.toLocaleString("ko-KR"), lime: false },
    { k: "공식 배포처 연결", v: "100%", lime: true },
  ];
  const latest = ALL_ITEMS.slice(0, 8);

  return (
    <DownloadShell>
      {/* 히어로 */}
      <section className="dl-hero" style={{ padding: "56px 28px 40px" }}>
        <div>
          <h1 style={{ fontSize: "clamp(56px, 10.5vw, 151px)", lineHeight: 0.86, fontWeight: 800, letterSpacing: "-0.055em", margin: 0 }}>
            DOWNLOAD
            <br />
            INDEX<span style={{ color: LIME }}>.</span>
          </h1>
          <p style={{ marginTop: 26, maxWidth: 430, fontSize: 16, lineHeight: 1.6, color: MUTE }}>
            프로그램·드라이버·게임·폰트·서식. 국내 기기 모델 단위까지 색인한 다운로드 데이터베이스.
          </p>
        </div>
        <div style={{ marginTop: 90 }}>
          {stats.map((s) => (
            <div
              key={s.k}
              style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, borderTop: `1px solid ${LINE}`, padding: "22px 0" }}
            >
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: MUTE }}>{s.k}</span>
              <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", color: s.lime ? LIME : PAPER }}>{s.v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 카테고리 5개 */}
      <section className="dl-cats" style={{ padding: "0 28px 64px" }}>
        {CATEGORIES.map((c, i) => {
          const t = toneStyle(TONE[c]);
          const n = itemsIn(c).length;
          return (
            <a
              key={c}
              href={`/download/${c}`}
              className="dl-cat"
              style={{
                background: t.background, color: t.color, textDecoration: "none",
                padding: "18px 18px 24px", minHeight: 340, display: "flex", flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", opacity: 0.7 }}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>{n.toLocaleString("ko-KR")}</span>
              </div>
              <h2 style={{ marginTop: "auto", fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                {categoryLabel(c)}
              </h2>
              <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.55, color: t.sub }}>{DESC[c]}</p>
            </a>
          );
        })}
      </section>

      {/* 새로 올라온 파일 */}
      <section style={{ padding: "0 28px 72px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
          <h2 style={{ fontSize: "clamp(30px,4.4vw,63px)", lineHeight: 0.95, fontWeight: 800, letterSpacing: "-0.05em", margin: 0 }}>
            새로 올라온 파일
          </h2>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: MUTE }}>
            LATEST {String(latest.length).padStart(2, "0")}
          </span>
        </div>
        <ul style={{ listStyle: "none", margin: "26px 0 0", padding: 0 }}>
          {latest.map((w, i) => (
            <li key={w.slug} className="dl-row" style={{ borderTop: `1px solid ${LINE}` }}>
              <a
                href={itemHref(w)}
                className="dl-a"
                style={{ display: "grid", gridTemplateColumns: "44px minmax(0,1fr) auto auto", alignItems: "center", gap: 16, padding: "18px 8px" }}
              >
                <span style={{ fontFamily: MONO, fontSize: 12, color: LIME }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>{w.listTitle}</span>
                  <span style={{ display: "block", marginTop: 6, fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: MUTE }}>{w.listMeta}</span>
                </span>
                <span className="dl-tag" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: MUTE, border: `1px solid ${LINE}`, padding: "4px 8px", whiteSpace: "nowrap" }}>
                  {categoryLabel(w.category)}
                </span>
                <span className="dl-get" style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>받기 ↓</span>
              </a>
            </li>
          ))}
        </ul>
        {latest.length === 0 ? (
          <p style={{ padding: "36px 0", fontSize: 14, color: MUTE }}>아직 색인된 파일이 없습니다.</p>
        ) : null}
      </section>

      {/* 제조사별 드라이버 + 요청 */}
      <section className="dl-bottom" style={{ padding: "0 28px 72px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
            <h2 style={{ fontSize: "clamp(26px,3.6vw,52px)", lineHeight: 0.95, fontWeight: 800, letterSpacing: "-0.05em", margin: 0 }}>
              제조사별 드라이버
            </h2>
            <a href="/download/driver" className="dl-a" style={{ fontSize: 13, color: MUTE, whiteSpace: "nowrap" }}>
              전체 보기 →
            </a>
          </div>
          <div className="dl-makers" style={{ marginTop: 22, background: LINE, border: `1px solid ${LINE}` }}>
            {makers.map((m) => (
              <div key={m.name} style={{ background: INK, padding: "16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</span>
                <span style={{ fontFamily: MONO, fontSize: 11, color: MUTE }}>{m.n}</span>
              </div>
            ))}
            <div style={{ background: CARD2 }} />
            <div style={{ background: CARD2 }} />
          </div>
        </div>

        <aside>
          <div style={{ background: LIME, color: INK, padding: "26px 24px 28px" }}>
            <p style={{ margin: 0, fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em" }}>FIND MY DRIVER</p>
            <h3 style={{ margin: "14px 0 0", fontSize: 28, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.22 }}>
              모델명 하나로
              <br />
              정확히 찾기
            </h3>
            <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.55, color: "rgba(11,11,12,.72)" }}>
              기기 뒷면 스티커의 모델명을 그대로 입력하세요.
            </p>
            <a href="/download/driver" style={{ display: "flex", gap: 8, marginTop: 18, textDecoration: "none" }}>
              <span style={{ flex: 1, background: INK, color: MUTE, fontFamily: MONO, fontSize: 12, padding: "12px 14px" }}>예 : SL-M2020</span>
              <span style={{ background: INK, color: PAPER, fontSize: 13, fontWeight: 700, padding: "12px 18px" }}>목록</span>
            </a>
          </div>

          <div style={{ marginTop: 26 }}>
            <p style={{ margin: 0, fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", color: MUTE }}>REQUEST</p>
            <a href="/download/request" className="dl-a" style={{ display: "block", marginTop: 12, borderTop: `1px solid ${LINE}`, padding: "18px 0" }}>
              <span style={{ display: "block", fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>찾는 파일이 없나요?</span>
              <span style={{ display: "block", marginTop: 8, fontSize: 13, lineHeight: 1.7, color: MUTE }}>
                프로그램명·기기 모델명을 남기면 공식 배포처를 확인해 색인에 추가합니다.
              </span>
              <span style={{ display: "block", marginTop: 12, fontSize: 13, fontWeight: 800, color: LIME }}>요청 게시판에 남기기 →</span>
            </a>
          </div>
        </aside>
      </section>
    </DownloadShell>
  );
}
