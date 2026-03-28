import { useState, useEffect } from "react";
import React from "react";

// ─── 데이터
const TYPES = [{"minAge": 19, "name": "일반 이용권", "age": "만 19세 이상", "income": "기초생활수급자·차상위계층 우선 / 잔여 추첨", "color": "#1D9E75", "bg": "#E1F5EE", "quota": "-"}, {"minAge": 30, "name": "AI·디지털 이용권", "age": "만 30세 이상", "income": "소득 무관", "color": "#2563EB", "bg": "#EFF6FF", "quota": "-"}, {"minAge": 65, "name": "노인 이용권", "age": "만 65세 이상", "income": "소득 무관", "color": "#D97706", "bg": "#FFFBEB", "quota": "-"}];
const SIDEBAR_LINKS = ["경남 평생교육이용권 신청방법", "경상남도 평생교육이용권 자격", "평생교육이용권 AI디지털 이용권", "평생교육이용권 사용처 조회", "서울 평생교육이용권 신청", "인천 평생교육이용권 신청", "충남 평생교육이용권 신청", "광주 평생교육이용권 신청", "NH농협카드 채움카드 발급", "차상위계층 확인 방법", "기초생활수급자 신청", "경남 복지 교육 지원", "평생교육이용권 추첨 기준", "평생교육이용권 우수이용자 70만원", "경남 평생학습 포털"];
const HUB_LINKS = [{"title": "서울 평생교육이용권 | 4월 9일까지", "desc": "서울 4개 유형 자격·절차 정리", "href": "/w/서울-평생교육이용권"}, {"title": "충남 평생교육이용권 | 4월 17일까지", "desc": "충남 신청 조건·사용처 안내", "href": "/w/충남-평생교육이용권"}, {"title": "광주 평생교육이용권 | 4월 15일까지", "desc": "광주 일반·노인 이용권 비교", "href": "/w/광주-평생교육이용권"}, {"title": "부산 평생교육이용권 | 4월 7일까지", "desc": "부산 일반 이용권 자격·사용처 정리", "href": "/w/부산-평생교육이용권"}];
const STEPS = [{"title": "내 유형 먼저 고르세요", "desc": "일반·AI디지털·노인 중 1개만 신청. 중복 신청 자동 무효예요.", "tip": "소득 무관 유형이 경쟁 모수가 작아요"}, {"title": "lllcard.kr/gyeongnam 접속", "desc": "카카오·PASS 간편인증 후 신청서를 작성해요. 장애인은 정부24 또는 거주지 시군청 방문도 가능해요.", "link": {"label": "lllcard.kr/gyeongnam", "url": "https://www.lllcard.kr/gyeongnam"}}, {"title": "신청서 작성 + 제출", "desc": "유형 선택 → 자격 정보 입력 → 제출. 장애인 방문 신청은 사전 확인 필요해요.", "tip": "4월 17일 마감, 여유 있게 신청하세요"}, {"title": "선정 결과 통보", "desc": "문자·카카오톡으로 개별 통보. 선정 시 NH농협 채움카드에 35만원 포인트 자동 충전이에요. 경남 선정 결과는 4월 30일 발표 예정이에요."}, {"title": "강좌 수강 + 사용", "desc": "등록된 기관에서 수강료·교재비로 결제해요. 12월 31일까지 사용해야 해요.", "tip": "미사용 잔액 연말 자동 소멸"}];
const FAQS = [{"urgent": true, "q": "거창·함양 같은 소도시에서도 교육기관을 이용할 수 있나요?", "a": "온라인 사용기관은 전국 공통이에요. 소도시에 오프라인 기관이 적더라도 어학, 자격증, AI 관련 온라인 강좌는 어디서나 수강할 수 있어요. lllcard.kr/gyeongnam에서 온라인 기관 목록을 확인하세요."}, {"urgent": true, "q": "경남 장애인 이용권은 어떻게 신청해요?", "a": "정부24(보조금24) 온라인 신청 또는 거주지 시군청 방문 신청이 가능해요. 예를 들어 거창군은 거창군청 인구교육과 방문 신청이 가능해요. 방문 신청 가능 여부는 해당 시군청에 사전 확인하세요."}, {"urgent": false, "q": "창원시에 사는데 경남 공고로 신청하면 되나요?", "a": "네. 창원시는 경상남도 소속이에요. 경남 공고(lllcard.kr/gyeongnam)로 신청하면 돼요."}, {"urgent": false, "q": "NH농협카드가 없어요.", "a": "선정 후 card.nonghyup.com 또는 NH농협은행·농축협 영업점에서 채움카드를 발급하면 돼요."}, {"urgent": false, "q": "추첨 탈락하면 기회가 없나요?", "a": "2차 모집이 진행될 수 있어요. lllcard.kr/gyeongnam에서 다음 공고를 확인하세요."}];
const COURSES = [{"cat": "자격증", "col": "#1D9E75", "items": ["컴퓨터활용능력", "정보처리기사", "공인중개사", "사회복지사"]}, {"cat": "어학", "col": "#2563EB", "items": ["영어 회화", "일본어", "중국어", "HSK 준비"]}, {"cat": "AI·디지털", "col": "#7C3AED", "items": ["ChatGPT 활용", "영상편집", "코딩 입문", "데이터분석"]}, {"cat": "취미·생활", "col": "#D97706", "items": ["바리스타", "제과제빵", "캘리그라피", "인문학"]}];
const REFERENCES = [{"category": "공식 공고", "items": [{"label": "경남 평생교육이용권 누리집 (lllcard.kr/gyeongnam)", "url": "https://www.lllcard.kr/gyeongnam"}]}, {"category": "법령·카드", "items": [{"label": "평생교육법 제16조의2 — 평생교육이용권의 발급 등", "url": "https://www.law.go.kr/"}, {"label": "NH농협카드 채움카드 신규 발급", "url": "https://card.nonghyup.com"}]}];
const APPLY_URL = "https://www.lllcard.kr/gyeongnam";
const APPLY_LABEL = "경남 평생교육이용권 신청하기";
const DEADLINE_ISO = "2026-04-17T23:59:00+09:00";
const DEADLINE_LABEL = "2026년 4월 17일(금) 마감";
const DEADLINE_SHORT = "4월 17일";
const NOTE_SPECIFIC = "경남 1차: 일반·AI디지털·노인 3개 유형 · 선정 결과 4월 30일 발표";


// ─── 디자인 토큰
const G  = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

// ─── 공통 UI
function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}
function H2({ children }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: "3px solid #1D9E75", paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
}
function Bdg({ children }) {
  return <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: "#E1F5EE", color: "#0F6E56", marginBottom: 10 }}>{children}</span>;
}
function GreenBox({ title, children }) {
  return (
    <div style={{ background: "#E1F5EE", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: "#085041" }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}
function BorderBox({ title, children }) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}


// ─── 긴급 배너
function UrgentBanner() {
  const [type, setType] = React.useState(null);
  const messages = {
    apply: { title: "신청하려는 분께", color: "#1D9E75", bg: "#E1F5EE",
      text: "마감 전에 유형 1개를 골라 공식 누리집에서 신청해요. 주민등록등본 상 주소지 기준이에요. 중복 신청은 자동 무효예요." },
    check: { title: "자격이 되는지 모르겠다면", color: "#2563EB", bg: "#EFF6FF",
      text: "30세 이상이면 AI·디지털(소득 무관), 65세 이상이면 노인(소득 무관)으로 신청할 수 있어요. 일반 이용권은 기초생활수급자·차상위 우선이고 잔여는 추첨이라, 소득이 높아도 도전할 수 있어요." },
    use:   { title: "이미 선정됐다면", color: "#D97706", bg: "#FFFBEB",
      text: "NH농협 채움카드가 없으면 먼저 발급하세요. 공식 누리집에서 사용 기관을 검색하고 원하는 강좌를 신청하면 돼요. 2026년 12월 31일까지 사용하지 않으면 잔액이 자동 소멸돼요." },
  };
  if (!type) {
    return (
      <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>📌 지금 어떤 상황이에요?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "apply", label: "신청 기간인 거 알았어요. 바로 신청하고 싶어요." },
            { id: "check", label: "내가 자격이 되는지 확인하고 싶어요." },
            { id: "use",   label: "이미 선정됐는데 사용법을 모르겠어요." },
          ].map((item) => (
            <button key={item.id} onClick={() => setType(item.id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: "1px solid #FED7AA", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>
              <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>{item.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
  const m = messages[type];
  return (
    <div style={{ background: m.bg, border: `1px solid ${m.color}40`, borderRadius: 10, padding: "16px 18px", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: 0 }}>{m.title}</p>
        <button onClick={() => setType(null)} style={{ background: "none", border: "none", fontSize: 12, color: "#9ca3af", cursor: "pointer", padding: 0, flexShrink: 0, marginLeft: 12 }}>다시 선택</button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

// ─── 상단 신청 버튼
function ApplyButtons({ url, cardUrl, label }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "1.4rem 0" }}>
      <a href={url} target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#1D9E75", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
        📝 {label}
      </a>
      <a href={cardUrl || "https://card.nonghyup.com"} target="_self"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 12px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", textAlign: "center", border: "1px solid #e5e7eb" }}>
        💳 NH농협카드 채움카드 발급
      </a>
    </div>
  );
}

// ─── D-day
function Deadline({ isoDate, label }) {
  const [days, setDays] = React.useState(null);
  React.useEffect(() => {
    const calc = () => {
      const diff = new Date(isoDate) - new Date();
      setDays(Math.max(0, Math.floor(diff / 86400000)));
    };
    calc();
    const t = setInterval(calc, 60000);
    return () => clearInterval(t);
  }, [isoDate]);
  if (days === null) return null;
  if (days === 0) return (
    <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 8, padding: "12px 16px", margin: "12px 0", fontSize: 13, color: "#DC2626", fontWeight: 600 }}>
      오늘 마감이에요. 지금 바로 신청하세요.
    </div>
  );
  const urg = days <= 3;
  return (
    <div style={{ background: urg ? "#FEF2F2" : "#E1F5EE", border: `1px solid ${urg ? "#FCA5A5" : "#9FE1CB"}`, borderRadius: 8, padding: "12px 16px", margin: "12px 0", display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 22, fontWeight: 800, color: urg ? "#DC2626" : "#1D9E75" }}>D-{days}</span>
      <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.7 }}>
        마감까지 <strong>{days}일</strong> 남았어요<br />
        <span style={{ fontSize: 12, color: "#6b7280" }}>{label}</span>
      </span>
    </div>
  );
}

// ─── 유형 체커
function TypeChecker({ types }) {
  const [age, setAge] = React.useState("");
  const ageNum = parseInt(age, 10);
  function getResult() {
    if (!age || isNaN(ageNum)) return null;
    const sorted = [...types].sort((a, b) => b.minAge - a.minAge);
    return sorted.find(t => ageNum >= t.minAge) || null;
  }
  const result = getResult();
  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 20px", margin: "10px 0 1.2rem" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.7 }}>만 나이를 입력하면 바로 결과가 나와요.</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <label style={{ fontSize: 13, color: "#6b7280", flexShrink: 0 }}>만 나이</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="예: 42"
          style={{ flex: 1, padding: "9px 12px", borderRadius: 7, border: "1px solid #d1d5db", fontSize: 14 }} />
      </div>
      {result && (
        <div style={{ marginTop: 14, padding: "14px 16px", borderRadius: 8, background: result.bg, border: `1px solid ${result.color}33` }}>
          <p style={{ fontSize: 11, color: result.color, fontWeight: 700, marginBottom: 4 }}>추천 유형</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 6 }}>{result.name}</p>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85 }}>
            나이 기준: <strong>{result.age}</strong><br />
            소득 조건: <strong>{result.income}</strong>
          </p>
        </div>
      )}
      {age && !isNaN(ageNum) && ageNum < 19 && (
        <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 8, background: "#FEF2F2", border: "1px solid #FCA5A5" }}>
          <p style={{ fontSize: 13, color: "#DC2626" }}>만 19세 미만은 신청 대상이 아니에요.</p>
        </div>
      )}
    </div>
  );
}

// ─── 절차 스텝
function ProcessSteps({ steps }) {
  return (
    <div style={{ margin: "10px 0 1rem" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
          {i < steps.length - 1 && (
            <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 1, background: "#e5e7eb" }} />
          )}
          <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: "#E1F5EE", color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
            {i + 1}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.85 }}>{s.desc}</div>
            {s.link && (
              <div style={{ marginTop: 8 }}>
                <a href={s.link.url} target="_self"
                  style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: "#E1F5EE", color: "#0F6E56", textDecoration: "none", fontWeight: 600 }}>
                  🌐 {s.link.label}
                </a>
              </div>
            )}
            {s.tip && (
              <span style={{ display: "inline-block", fontSize: 12, marginTop: 7, background: "#E1F5EE", color: "#0F6E56", borderRadius: 6, padding: "4px 10px" }}>
                {s.tip}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── FAQ
function FAQ({ faqs }) {
  const [open, setOpen] = React.useState(null);
  return (
    <div>
      {faqs.map((f, i) => (
        <div key={i} style={{ border: `1px solid ${f.urgent ? "#FED7AA" : "#e5e7eb"}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)}
            style={{ padding: "12px 16px", fontSize: 14, fontWeight: f.urgent ? 600 : 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open === i ? "#f9fafb" : f.urgent ? "#FFF7ED" : "#fff" }}>
            <span>
              {f.urgent && <span style={{ fontSize: 11, background: "#F97316", color: "#fff", borderRadius: 4, padding: "1px 6px", marginRight: 8, fontWeight: 600 }}>긴급</span>}
              {f.q}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▼</span>
          </div>
          {open === i && (
            <div style={{ padding: "10px 16px 14px", fontSize: 13, color: "#6b7280", lineHeight: 1.95, borderTop: "1px solid #f3f4f6" }}>
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── CTA
function CTA({ url, deadline, ctaTitle, ctaDesc }) {
  return (
    <div style={{ background: "#E1F5EE", borderRadius: 12, padding: "26px 22px", margin: "2rem 0 1rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: "#085041", fontWeight: 600, marginBottom: 6 }}>{deadline} 마감이에요</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.5 }}>{ctaTitle}</p>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, lineHeight: 1.8 }}>{ctaDesc}</p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <a href={url} target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#1D9E75", color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none" }}>
          📝 신청하기
        </a>
        <a href="https://card.nonghyup.com" target="_self"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 8, textDecoration: "none", border: "1px solid #d1d5db" }}>
          💳 NH농협카드 발급
        </a>
      </div>
    </div>
  );
}

// ─── 허브 링크
function HubLinks({ links }) {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 다른 지역 신청도 확인해보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {links.map((link, i) => (
          <a key={i} href={link.href} target="_self"
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < links.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: "#1D9E75", fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── 출처
function References({ refs }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />
        출처 및 참고자료
      </h3>
      {refs.map((group) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>{group.category.toUpperCase()}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item) => (
              <a key={item.label} href={item.url} target="_self"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 6, border: "1px solid #f3f4f6", background: "#fafafa", fontSize: 13, color: "#374151", textDecoration: "none" }}>
                <span style={{ color: "#1D9E75", fontSize: 11, flexShrink: 0 }}>↗</span>{item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 공식 공고를 바탕으로 작성됐어요. 중요한 결정 전에 반드시 위 공식 출처를 직접 확인하세요.
      </p>
    </div>
  );
}

// ─── 사이드바
function Sidebar({ links }) {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>평생교육 관련 글</p>
        {links.map((label, i) => (
          <a key={i} href="#" target="_self"
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}


export default function GyeongnamPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar links={SIDEBAR_LINKS} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 교육 지원 · 경상남도</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          2026 경남 평생교육이용권 신청방법 |<br />
          창원·거창 등 시군별 접수처 안내
        </h1>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" }}>
          경남은 18개 시군에 걸쳐 거주하는 도민이 많아요.\n온라인 신청이 기본이지만 장애인은 시군청 방문도 가능해요.\n4월 17일까지 여유가 있으니 내 유형부터 확인하세요.
        </p>

        <ApplyButtons url={APPLY_URL} label={APPLY_LABEL} />

        <UrgentBanner />
        <Deadline isoDate={DEADLINE_ISO} label={DEADLINE_LABEL} />

        <Divider />

        <H2>경상남도 평생교육이용권, 신청 전에 이것부터 확인하세요</H2>
        <p style={body}>
          경상남도에 주민등록이 있어야 경상남도 공고로 신청할 수 있어요.<br />
          2026년부터 국가 단일 모집이 아닌 광역 지자체별 개별 모집으로 바뀌었어요.<br />
          타 지역 공고로 신청하면 자동 탈락이에요.
        </p>
        <GreenBox title="2026 경상남도 1차 핵심 정보">
          신청 기간: 2026년 3월 23일(월) ~ 4월 17일(금)<br />
          지원 금액: 1인당 연 35만원 · 우수이용자 최대 70만원<br />
          신청 방법: www.lllcard.kr/gyeongnam (PC·모바일 가능)<br />
          결제 수단: NH농협 채움카드 포인트 자동 충전<br />
          사용 기한: 2026년 12월 31일까지<br />
          유형: 일반 / AI·디지털 / 노인 이용권 (3개)\n장애인은 정부24 또는 거주지 시군청 방문 신청 가능
        </GreenBox>

        <Divider />

        <H2>내 상황에 맞는 유형부터 확인하세요</H2>
        <p style={body}>
          신청 가능한 유형 중 1개만 선택할 수 있어요. 중복 신청은 자동 무효예요.<br />
          소득 무관 유형이 있다면 추첨 경쟁 없이 신청할 수 있어요.
        </p>
        <Bdg>나이로 유형 바로 찾기</Bdg>
        <TypeChecker types={TYPES} />

        <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["유형", "신청 나이", "소득 조건"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#374151", borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TYPES.map((t, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: t.color }}>{t.name}</td>
                  <td style={{ padding: "10px 12px", color: "#374151" }}>{t.age}</td>
                  <td style={{ padding: "10px 12px", color: "#374151" }}>{t.income}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BorderBox title="일반 이용권 우선선발 기준">
          1순위: 기초생활수급자<br />
          2순위: 차상위계층 (장애수당 수급자, 한부모가족 지원 대상자 포함)<br />
          잔여: 위 기준 외 신청자 컴퓨터 무작위 추첨<br /><br />
          소득이 높아도 추첨 참여는 가능해요. 단, 소득 무관 유형이 있으면 그쪽을 먼저 고려해보세요.
        </BorderBox>

        <Divider />

        <H2>경상남도 신청 기간·방법·선정 결과</H2>
        <p style={body}>
          온라인 신청이 기본이에요. PC와 스마트폰 모두 가능해요.<br />
          회원가입 후 카카오톡·PASS 간편인증으로 본인 확인하면 신청 완료까지 10분이면 충분해요.
        </p>
        <Bdg>신청 절차</Bdg>
        <ProcessSteps steps={STEPS} />
        <BorderBox title="선정 결과 및 카드 발급">
          결과 통보: 문자 또는 카카오톡 개별 발송<br />
          NH농협 채움카드 없으면: card.nonghyup.com 또는 영업점 신규 발급<br />
          기존 채움카드 소지자: 선정 후 포인트 자동 충전, 별도 신청 불필요<br />
          ※ 2025년부터 구 평생교육희망카드(BC카드)는 사용 불가
        </BorderBox>

        <HubLinks links={HUB_LINKS} />

        <H2>35만원으로 들을 수 있는 강좌 예시</H2>
        <p style={body}>
          온라인 사용기관은 전국 공통이에요. 경상남도 어디서나 수강할 수 있어요.<br />
          실제 강좌 목록은 www.lllcard.kr/gyeongnam에서 검색하세요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, margin: "12px 0 1.2rem" }}>
          {COURSES.map((group) => (
            <div key={group.cat} style={{ background: "#f9fafb", borderRadius: 8, padding: "14px 16px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: group.col, marginBottom: 8 }}>{group.cat}</p>
              {group.items.map((item, j) => (
                <p key={j} style={{ fontSize: 12, color: "#374151", margin: "4px 0", lineHeight: 1.6 }}>· {item}</p>
              ))}
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: "1.2rem" }}>
          ※ AI·디지털 이용권은 디지털 전용 사용기관에서만 사용 가능해요. 일반·노인 이용권은 전 영역 사용 가능해요.
        </p>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: 14 }}>급한 상황부터 위에 올렸어요.</p>
        <FAQ faqs={FAQS} />

        <CTA url={APPLY_URL} deadline={DEADLINE_SHORT} ctaTitle={"지금 바로 신청하세요.\\n4월 17일 마감이에요."} ctaDesc={"AI·디지털(30세↑)·노인(65세↑) 이용권은 소득 조건 없어요.\\n온라인 강좌는 전국 공통 — 경남 어디서나 수강 가능해요."} />

        <Divider />
        <References refs={REFERENCES} />

        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 법률·정책 정보 제공을 목적으로 작성됐어요. 개별 선정 결과는 경상남도 공고 기준에 따르며, 중요한 결정 전에 반드시 공식 출처를 직접 확인하세요.
          <br />※ 경남 1차: 일반·AI디지털·노인 3개 유형 · 선정 결과 4월 30일 발표
        </div>
      </div>
    </div>
  );
}
