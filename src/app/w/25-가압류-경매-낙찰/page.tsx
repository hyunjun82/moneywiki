"use client";
import { useState } from "react";

// ─── 민사집행법 기준
// 소제주의: 경매 낙찰로 소멸하는 권리
//   저당권·근저당권, 담보가등기, 압류·가압류, 말소기준권리 후순위 전세권·임차권 등
// 인수주의: 낙찰자가 인수해야 하는 권리
//   청구권보전가등기(선순위), 선순위 전세권, 대항력 있는 선순위 임차인
// 말소기준권리: 최선순위 담보물권(저당권·근저당권) 또는 압류·가압류 중 가장 먼저 설정된 것
// 가압류: 경매 낙찰 시 소멸. 채권자는 배당 참가 (소제주의)
// 처분금지가처분: 말소기준권리 후순위이면 소멸, 선순위이면 인수 가능
// 전세권: 말소기준권리 후순위이면 소멸. 선순위이면 낙찰자 인수
// 임차인 보호: 전입+확정일자+점유 = 대항력+우선변제권
//   말소기준권리 전 임차인 → 낙찰자 인수
// 배당 순서: 경매비용 → 최우선변제 임금 → 소액임차인 최우선 → 조세 → 담보권자 → 후순위

const SIDEBAR_LINKS = [
  "가압류 경매 낙찰 효력",
  "소제주의 인수주의",
  "말소기준권리",
  "경매 권리분석",
  "담보가등기 경매 소멸",
  "전세권 인수 조건",
  "임차인 대항력 경매",
  "확정일자 우선변제",
  "경매 배당 순서",
  "근저당 경매",
  "처분금지가처분 경매",
  "선순위 임차인 낙찰",
  "말소기준권리 찾는 법",
  "경매 등기부 분석",
  "낙찰 후 인수 권리",
  "임의경매 강제경매",
  "법정지상권 경매",
  "유치권 경매",
  "경매 명도 소송",
  "부동산 경매 절차",
];

const HUB_LINKS = [
  { title: "가등기 효력 | 순위보전 효력과 물권변동 시기", desc: "담보가등기 vs 청구권보전가등기 차이", href: "#" },
  { title: "전세권과 임차권 차이 | 확정일자 대항력 기준", desc: "경매 시 인수 여부 판단하는 법", href: "#" },
];

const FAQS = [
  {
    urgent: true,
    q: "가압류가 있는 부동산을 낙찰받으면 그 채무도 내가 갚아야 하나요?",
    a: "아니에요. 가압류는 경매 낙찰로 소멸해요(소제주의). 가압류채권자는 낙찰대금에서 배당받는 것으로 끝나요. 낙찰자가 가압류 채무를 인수하지 않아요. 낙찰대금이 부족해서 채권자가 배당을 다 못 받아도 그 손해는 채권자가 지는 것이고 낙찰자와는 무관해요.",
  },
  {
    urgent: true,
    q: "말소기준권리가 뭔가요? 어떻게 찾나요?",
    a: "이 권리보다 후순위인 것들을 경매로 소멸시키는 기준이에요. 등기부에서 가장 먼저 설정된 저당권·근저당권 또는 압류·가압류가 말소기준권리예요. 이보다 선순위 권리는 낙찰자가 인수하고, 후순위 권리는 소멸해요. 권리분석의 출발점이에요.",
  },
  {
    urgent: true,
    q: "선순위 전세권이 있으면 낙찰자가 전세금을 돌려줘야 하나요?",
    a: "말소기준권리보다 전세권 설정일이 빠르면 낙찰자가 인수해야 해요. 전세금 반환 의무를 지게 돼요. 이 보증금을 낙찰가에서 빼야 실제 취득 비용이에요. 반면 말소기준권리보다 후순위 전세권은 소멸하고 전세권자는 배당에 참가해요.",
  },
  {
    urgent: false,
    q: "임차인이 있는 집을 낙찰받으면 어떻게 해야 하나요?",
    a: "임차인의 전입신고일과 말소기준권리 설정일을 비교해야 해요. 전입이 빠른 대항력 있는 임차인은 낙찰자가 인수해야 해요. 전입이 느린 임차인은 배당에 참가하거나 명도해야 해요. 경매 전 현황조사서와 임차인 권리신고 내용을 반드시 확인하세요.",
  },
  {
    urgent: false,
    q: "배당 순서가 어떻게 되나요?",
    a: "경매비용 → 임금·퇴직금 등 최우선채권 → 소액임차인 최우선변제 → 조세·공과금 → 담보권자(근저당 등, 확정일자 임차인 포함) 순이에요. 낙찰대금이 부족하면 후순위 채권자는 배당을 못 받아요.",
  },
  {
    urgent: false,
    q: "처분금지가처분은 경매 후에도 효력이 있나요?",
    a: "말소기준권리 후순위이면 소멸해요. 선순위이면 낙찰자가 인수해야 할 수 있어요. 처분금지가처분이 있는 물건은 복잡한 권리관계가 있을 수 있어서 입찰 전 전문가 자문을 받는 게 좋아요.",
  },
  {
    urgent: false,
    q: "경매에서 권리분석은 어떻게 해야 하나요?",
    a: "등기부등본 확인 → 말소기준권리 파악 → 선순위 권리 인수 여부 확인 → 현황조사서·임차인 권리신고 확인 → 인수금액 계산(낙찰가에서 인수 보증금 차감). 이 순서로 분석하고 인수 금액이 포함된 실제 취득 비용을 계산해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "민사집행법: 부동산 강제경매 절차", url: "https://www.law.go.kr/" },
      { label: "가등기담보 등에 관한 법률 제15조: 담보가등기 소멸", url: "https://www.law.go.kr/" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "대법원 법원경매정보: 매각물건명세서 확인", url: "https://www.courtauction.go.kr" },
    ],
  },
];

const G  = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}

function H2({ children }: any) {
  return (
    <h2 style={{
      fontSize: 18,
      fontWeight: 700,
      color: "#111",
      borderLeft: `3px solid ${G}`,
      paddingLeft: 12,
      margin: "0 0 14px",
      lineHeight: 1.5,
    }}>
      {children}
    </h2>
  );
}

function Bdg({ children }: any) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: 11,
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 20,
      background: GL,
      color: "#0F6E56",
      marginBottom: 10,
    }}>
      {children}
    </span>
  );
}

function GreenBox({ title, children }: any) {
  return (
    <div style={{
      background: GL,
      borderRadius: 8,
      padding: "14px 18px",
      margin: "12px 0 1.2rem",
      fontSize: 14,
      lineHeight: 1.95,
      color: GD,
    }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function WarnBox({ title, children }: any) {
  return (
    <div style={{
      background: "#FFF7ED",
      border: "1px solid #FED7AA",
      borderRadius: 8,
      padding: "14px 18px",
      margin: "12px 0 1.2rem",
      fontSize: 14,
      lineHeight: 1.95,
    }}>
      <strong style={{ display: "block", color: "#C2410C", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function UrgentBanner() {
  const [type, setType] = useState(null);

  const messages = {
    bid: {
      title: "경매 입찰을 앞두고 있다면",
      color: G,
      bg: GL,
      text: "낙찰가에서 인수 금액을 빼야 실제 취득 비용이에요. 아래 표로 말소기준권리보다 선순위인 권리가 있는지 확인하고, 인수 금액을 더해서 입찰가를 결정하세요. 현황조사서와 임차인 권리신고도 반드시 확인하세요.",
    },
    after: {
      title: "낙찰받은 후 권리 문제가 생겼다면",
      color: "#DC2626",
      bg: "#FEF2F2",
      text: "낙찰 후 발견된 하자로 잔금 납부를 포기할 수 있지만 입찰보증금은 몰수돼요. 인수해야 할 선순위 권리가 있다면 잔금 납부 전에 전문가와 상담하세요. 포기 전에 실제 인수 금액을 먼저 정확히 계산해보세요.",
    },
    confused: {
      title: "어떤 권리가 소멸하고 어떤 게 인수되는지 헷갈린다면",
      color: "#7C3AED",
      bg: "#F5F3FF",
      text: "핵심은 말소기준권리예요. 이 권리보다 후순위면 소멸, 선순위면 인수예요. 아래 표에서 각 권리별 처리 방식을 한눈에 확인하세요.",
    },
  };

  if (!type) {
    return (
      <div style={{
        background: "#FFF7ED",
        border: "1px solid #FED7AA",
        borderRadius: 10,
        padding: "16px 18px",
        marginBottom: "1.5rem",
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>
          📌 지금 어떤 상황이에요?
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "bid",      label: "경매 입찰을 준비 중이에요." },
            { id: "after",    label: "낙찰받은 후 권리 관계 문제가 생겼어요." },
            { id: "confused", label: "어떤 권리가 소멸하고 어떤 게 인수되는지 헷갈려요." },
          ].map((item: any) => (
            <button
              key={item.id}
              onClick={(: any) => setType(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #FED7AA",
                background: "#fff",
                fontSize: 13,
                color: "#374151",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ color: "#F97316", flexShrink: 0 }}>→</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const m = messages[type];
  return (
    <div style={{
      background: m.bg,
      border: `1px solid ${m.color}40`,
      borderRadius: 10,
      padding: "16px 18px",
      marginBottom: "1.5rem",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: 0 }}>{m.title}</p>
        <button
          onClick={(: any) => setType(null)}
          style={{
            background: "none",
            border: "none",
            fontSize: 12,
            color: "#9ca3af",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
            marginLeft: 12,
          }}
        >
          다시 선택
        </button>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>{m.text}</p>
    </div>
  );
}

function RightsTable() {
  const rows = [
    { right: "저당권·근저당권",          how: "소멸",    note: "경매 낙찰로 소멸, 배당 참가" },
    { right: "담보가등기",               how: "소멸",    note: "가담법 §15, 우선변제권 있음" },
    { right: "압류·가압류",              how: "소멸",    note: "채권자는 배당 참가" },
    { right: "말소기준권리 후순위 전세권", how: "소멸",    note: "전세권자는 배당 참가" },
    { right: "청구권보전가등기 (선순위)", how: "인수",    note: "본등기 청구 위험 있음" },
    { right: "선순위 전세권",            how: "인수",    note: "낙찰자가 보증금 반환 의무" },
    { right: "대항력 있는 임차인 (선순위)", how: "인수",  note: "전입+확정일자+점유, 보증금 인수" },
    { right: "처분금지가처분 (선순위)",   how: "인수 가능", note: "상황에 따라 다름, 전문가 확인" },
  ];

  return (
    <div style={{ overflowX: "auto", margin: "12px 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: GL }}>
            {["권리 종류", "경매 후 처리", "비고"].map((h: any) => (
              <th
                key={h}
                style={{
                  padding: "8px 10px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: GD,
                  borderBottom: `2px solid ${G}`,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r: any, i: any) => (
            <tr
              key={i}
              style={{
                borderBottom: "1px solid #e5e7eb",
                background: r.how.includes("인수") ? "#FEF2F2" : i % 2 === 0 ? "#fff" : "#fafafa",
              }}
            >
              <td style={{ padding: "9px 10px" }}>{r.right}</td>
              <td style={{
                padding: "9px 10px",
                fontWeight: 700,
                color: r.how.includes("인수") ? "#DC2626" : G,
              }}>
                {r.how}
              </td>
              <td style={{ padding: "9px 10px", color: "#9ca3af", fontSize: 12 }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>
        ※ 인수(붉은색) = 낙찰자 부담. 낙찰가에서 인수 금액을 빼야 실제 취득 비용이에요.
      </p>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState({});
  const toggle = (i) => setOpen((p) => ({ ...p, [i]: !p[i] }));
  return (
    <div style={{ margin: "10px 0 1.2rem" }}>
      {FAQS.map((faq: any, i: any) => (
        <div key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <button
            onClick={(: any) => toggle(i)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "13px 4px",
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {faq.urgent && (
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 20,
                background: "#FEE2E2",
                color: "#DC2626",
                flexShrink: 0,
                marginTop: 2,
                whiteSpace: "nowrap",
              }}>
                자주 막히는 곳
              </span>
            )}
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", flex: 1, lineHeight: 1.6 }}>
              {faq.q}
            </span>
            <span style={{ color: "#9ca3af", fontSize: 16, flexShrink: 0 }}>
              {open[i] ? "▲" : "▼"}
            </span>
          </button>
          {open[i] && (
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.9, padding: "0 4px 14px", margin: 0 }}>
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 같이 보면 도움 되는 글</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link: any, i: any) => (
          <a
            key={i}
            href={link.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 4px",
              textDecoration: "none",
              borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none",
            }}
          >
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>
                {link.title}
              </span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function References() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 16, background: "#d1d5db", borderRadius: 2, display: "inline-block" }} />
        출처 및 참고자료
      </h3>
      {REFERENCES.map((group: any) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 6 }}>
            {group.category.toUpperCase()}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map((item: any) => (
              <a
                key={item.label}
                href={item.url}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 12px",
                  borderRadius: 6,
                  border: "1px solid #f3f4f6",
                  background: "#fafafa",
                  fontSize: 13,
                  color: "#374151",
                  textDecoration: "none",
                }}
              >
                <span style={{ color: G, fontSize: 11, flexShrink: 0 }}>↗</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, lineHeight: 1.7 }}>
        이 글은 2026년 3월 기준 민사집행법 등을 바탕으로 작성됐어요. 경매 참여 전 전문가 자문을 권장해요.
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>
          경매 권리분석 관련 글
        </p>
        {SIDEBAR_LINKS.map((label: any, i: any) => (
          <a
            key={i}
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 0",
              fontSize: 12,
              color: "#374151",
              textDecoration: "none",
              borderBottom: "1px solid #f0f0f0",
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function AuctionRightsPage() {
  return (
    <div style={{
      maxWidth: 1060,
      margin: "0 auto",
      padding: "2rem 1.5rem",
      fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
      color: "#111",
      display: "flex",
      gap: 28,
      alignItems: "flex-start",
    }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>
          부동산 경매 · 권리분석 · 소제주의
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          가압류·처분금지가처분 경매 낙찰 효력 |<br />
          말소되는 것과 낙찰자가 인수하는 것
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          경매로 낙찰받으면 모든 권리가 사라진다고 알고 계셨나요?<br />
          <strong>말소기준권리보다 선순위인 권리는 낙찰 후에도 낙찰자가 인수해야 해요.</strong><br /><br />
          인수 금액을 낙찰가에서 빼야 실제 취득 비용이에요. 입찰 전에 반드시 확인하세요.
        </p>

        <UrgentBanner />

        <Divider />

        <H2>말소되는 것과 낙찰자가 인수하는 것</H2>
        <p style={body}>
          경매 물건마다 다르기 때문에 입찰 전에 직접 확인해야 해요.<br />
          아래 표로 내가 낙찰받으려는 물건의 권리가 소멸인지 인수인지 먼저 파악하세요.
        </p>
        <Bdg>권리별 경매 후 처리 방식</Bdg>
        <RightsTable />
        <WarnBox title="인수 금액을 낙찰가에서 꼭 빼세요">
          선순위 전세권이나 대항력 있는 임차인이 있으면 낙찰자가 그 보증금을 반환해야 해요. 낙찰가에서 인수 보증금을 빼야 실제 취득 비용이에요. 이걸 놓치면 경매로 손해를 볼 수 있어요.
        </WarnBox>

        <Divider />

        <H2>말소기준권리를 찾아야 권리분석이 시작돼요</H2>
        <p style={body}>
          "어디서부터 소멸이고 어디서부터 인수냐"를 가르는 기준선이 말소기준권리예요.<br />
          이걸 먼저 찾아야 나머지 권리 분석이 가능해요.
        </p>
        <div style={{ margin: "12px 0 1.2rem" }}>
          {[
            { step: "등기부등본 확인", desc: "갑구(소유권 관련)와 을구(제한물권 관련)를 모두 확인해요." },
            { step: "말소기준권리 파악", desc: "최선순위 저당권·근저당권 또는 압류·가압류 중 접수 날짜가 가장 빠른 것이 말소기준권리예요." },
            { step: "선순위 권리 확인", desc: "말소기준권리보다 접수일이 빠른 권리를 찾아요. 이것이 낙찰자가 인수해야 할 권리예요." },
            { step: "인수 금액 계산", desc: "선순위 전세권·대항력 있는 임차인 보증금을 합산해요. 낙찰가에서 이 금액을 빼면 실제 취득 비용이에요." },
          ].map((item: any, i: any) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: i % 2 === 0 ? "#fafafa" : "#fff",
                marginBottom: 8,
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: G,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>
                  {item.step}
                </p>
                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <HubLinks />

        <Divider />

        <H2>가압류가 있는 물건, 낙찰자에게 위험하지 않나요?</H2>
        <p style={body}>
          "가압류 있는 물건은 피해야 한다"고 알고 계셨죠.<br />
          하지만 가압류는 경매 낙찰로 소멸해요. 낙찰자가 채무를 인수하지 않아요.
        </p>
        <GreenBox title="가압류는 소멸, 채권자는 배당으로 해결돼요">
          가압류채권자는 낙찰대금에서 배당받는 것으로 끝나요.<br />
          낙찰대금이 부족하면 채권자가 배당을 다 못 받을 수 있지만, 그 손해는 채권자가 지는 것이고 낙찰자와는 무관해요.<br />
          오히려 가압류 많은 물건은 경쟁이 줄어 싸게 낙찰받을 기회가 되기도 해요.
        </GreenBox>

        <Divider />

        <H2>자주 묻는 것들</H2>
        <p style={{ ...body, marginBottom: 14 }}>
          "이 경우엔 내가 갚아야 하나요?"로 가장 많이 물어보는 것들이에요. 급한 것부터 위에 올렸어요.
        </p>
        <FAQ />

        <div style={{ background: GL, borderRadius: 12, padding: "20px 22px", margin: "2rem 0 1rem" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 8 }}>
            경매 입찰 전 대법원 법원경매정보를 확인하세요
          </p>
          <a
            href="https://www.courtauction.go.kr"
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              background: G,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            ↗ 대법원 법원경매정보
          </a>
        </div>

        <Divider />
        <References />

        <div style={{
          marginTop: "1.2rem",
          padding: "14px 18px",
          background: "#f9fafb",
          borderRadius: 10,
          fontSize: 12,
          color: "#9ca3af",
          lineHeight: 1.9,
        }}>
          이 글은 2026년 3월 기준 민사집행법 등을 바탕으로 작성됐어요. 경매 참여 전 전문가 자문을 권장해요.
        </div>
      </div>
    </div>
  );
}
