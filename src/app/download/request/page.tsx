export const dynamic = "force-static";
import type { Metadata } from "next";
import { DownloadShell } from "@/components/download/Chrome";
import { RequestForm } from "@/components/download/RequestForm";
import { LINE, LIME, MUTE, CARD, MONO } from "@/components/download/theme";
import requests from "@/data/download/requests.json";

export const metadata: Metadata = {
  title: { absolute: "없는 파일 요청 게시판 — 다운로드 인덱스" },
  description:
    "색인에 없는 프로그램·기기 모델명을 남기면 공식 배포처를 확인해 추가합니다. 공식 배포처가 없는 파일은 등록되지 않습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/download/request" },
};

type Request = {
  tag: string;
  title: string;
  detail?: string;
  nickname?: string;
  date: string;
  /** 접수 · 확인중 · 등록완료 */
  status: string;
};

const RULES = [
  "공식 배포처(제조사·개발사)가 확인되는 파일만 등록합니다.",
  "유료 프로그램의 크랙·시리얼 요청은 등록하지 않습니다.",
  "기기 모델명은 뒷면 스티커 표기 그대로 적어주시면 정확합니다.",
  "처리 시간은 약속하지 않습니다. 확인되면 상태가 등록완료로 바뀝니다.",
];

export default function DownloadRequestPage() {
  const list = requests as Request[];

  return (
    <DownloadShell>
      <section style={{ padding: "48px 28px 40px", borderBottom: `1px solid ${LINE}` }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", color: MUTE }}>REQUEST BOARD</div>
        <h1 style={{ marginTop: 12, fontSize: "clamp(34px,5.6vw,62px)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.03 }}>
          없는 파일 요청 게시판
        </h1>
        <p style={{ marginTop: 18, maxWidth: 560, fontSize: 15, lineHeight: 1.75, color: MUTE }}>
          찾는 프로그램·기기 모델명을 남겨주세요. 색인에 없는 항목만 확인해 추가합니다. 처리 시간은 확정하지 않으며,
          공식 배포처가 없는 파일은 등록되지 않습니다.
        </p>
      </section>

      <section className="dl-bottom" style={{ padding: "48px 28px 0" }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
            <h2 style={{ fontSize: "clamp(24px,3.2vw,34px)", fontWeight: 800, letterSpacing: "-0.04em" }}>접수된 요청</h2>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: MUTE }}>
              TOTAL {String(list.length).padStart(2, "0")}
            </span>
          </div>

          <div style={{ marginTop: 18, borderTop: `1px solid ${LINE}` }}>
            {list.length === 0 ? (
              <p style={{ padding: "36px 0", fontSize: 14, lineHeight: 1.8, color: MUTE }}>
                아직 공개된 요청이 없습니다. 오른쪽에서 첫 요청을 남겨주세요.
              </p>
            ) : (
              list.map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "20px 4px", borderBottom: `1px solid ${LINE}` }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ border: `1px solid ${LINE}`, color: MUTE, fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em", padding: "3px 7px" }}>
                        {r.tag}
                      </span>
                      <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>{r.title}</span>
                    </div>
                    {r.detail ? (
                      <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.7, color: MUTE }}>{r.detail}</p>
                    ) : null}
                    <div style={{ marginTop: 8, fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: "#5A5A5E" }}>
                      {r.nickname ? `${r.nickname} · ` : ""}
                      {r.date}
                    </div>
                  </div>
                  <span
                    style={{
                      alignSelf: "flex-start", whiteSpace: "nowrap", fontFamily: MONO, fontSize: 10,
                      letterSpacing: "0.08em", padding: "5px 9px",
                      background: r.status === "등록완료" ? LIME : CARD,
                      color: r.status === "등록완료" ? "#0B0B0C" : MUTE,
                    }}
                  >
                    {r.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <aside>
          <RequestForm />

          <div style={{ border: `1px solid ${LINE}`, padding: 20, marginTop: 16 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: MUTE }}>RULES</div>
            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              {RULES.map((r) => (
                <div key={r} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.65, color: MUTE }}>
                  <span style={{ color: LIME }}>—</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </DownloadShell>
  );
}
