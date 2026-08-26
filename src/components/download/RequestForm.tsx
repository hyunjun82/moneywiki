"use client";

import { useState } from "react";
import { INK, LINE, LIME, MONO } from "./theme";

/**
 * 요청 폼.
 *
 * 이 사이트는 정적 export 라 서버가 없다. 그래서 받는 곳을 환경변수로 뺐다.
 *   NEXT_PUBLIC_DL_REQUEST_ENDPOINT  — Formspree·Web3Forms·Cloudflare Function 등 POST 받을 주소
 *   NEXT_PUBLIC_DL_REQUEST_MAIL      — 위가 없을 때 쓸 메일 주소
 * 둘 다 없으면 보내기 전에 그렇다고 알려 준다. 눌렀는데 아무 일도 안 나는 게 제일 나쁘다.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_DL_REQUEST_ENDPOINT ?? "";
const MAIL = process.env.NEXT_PUBLIC_DL_REQUEST_MAIL ?? "";

const CATEGORIES = ["소프트웨어", "드라이버·설명서", "게임", "폰트·서식", "앱·미디어"];

export function RequestForm() {
  const [name, setName] = useState("");
  const [cat, setCat] = useState(CATEGORIES[0]);
  const [detail, setDetail] = useState("");
  const [nick, setNick] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "unset">("idle");

  const field: React.CSSProperties = {
    width: "100%", background: "transparent", color: INK,
    border: `1px solid rgba(11,11,12,.34)`, padding: "13px 14px",
    fontSize: 14, fontFamily: "inherit",
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const body = [
      `분류: ${cat}`,
      `프로그램·모델명: ${name.trim()}`,
      detail.trim() ? `내용: ${detail.trim()}` : "",
      nick.trim() ? `닉네임: ${nick.trim()}` : "",
    ].filter(Boolean).join("\n");

    if (ENDPOINT) {
      setState("sending");
      try {
        const r = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ category: cat, name: name.trim(), detail: detail.trim(), nickname: nick.trim() }),
        });
        setState(r.ok ? "done" : "error");
        if (r.ok) { setName(""); setDetail(""); setNick(""); }
      } catch {
        setState("error");
      }
      return;
    }
    if (MAIL) {
      window.location.href = `mailto:${MAIL}?subject=${encodeURIComponent(`[파일 요청] ${name.trim()}`)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setState("unset");
  }

  return (
    <form onSubmit={submit} style={{ background: LIME, color: INK, padding: 26 }}>
      <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", opacity: 0.66 }}>NEW REQUEST</div>
      <div style={{ marginTop: 8, fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em" }}>요청 남기기</div>

      <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
        <input
          style={field}
          placeholder="프로그램명 또는 기기 모델명"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-label="프로그램명 또는 기기 모델명"
        />
        <select style={field} value={cat} onChange={(e) => setCat(e.target.value)} aria-label="분류">
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <textarea
          style={{ ...field, minHeight: 92, resize: "vertical" }}
          placeholder="OS 버전, 어디서 막혔는지 등 (선택)"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          aria-label="상세 내용"
        />
        <input
          style={field}
          placeholder="닉네임 (선택)"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
          aria-label="닉네임"
        />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        style={{
          width: "100%", marginTop: 12, background: INK, color: LIME,
          border: "none", padding: "16px 14px", fontSize: 15, fontWeight: 800,
          cursor: state === "sending" ? "default" : "pointer",
        }}
      >
        {state === "sending" ? "보내는 중…" : "요청 등록 →"}
      </button>

      <p style={{ marginTop: 12, fontSize: 12.5, lineHeight: 1.6, color: "rgba(11,11,12,.72)" }}>
        {state === "done"
          ? "요청을 받았습니다. 공식 배포처가 확인되면 목록에 올립니다."
          : state === "error"
          ? "전송이 되지 않았습니다. 잠시 뒤 다시 시도해 주세요."
          : state === "unset"
          ? "아직 접수처가 연결되지 않았습니다. 사이트 관리자가 요청받을 주소를 지정해야 등록됩니다."
          : "공식 배포처가 있는 파일만 등록됩니다."}
      </p>
    </form>
  );
}
