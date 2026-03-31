"use client";
import { useState } from "react";
const SIDEBAR_LINKS = ["협의이혼 절차","이혼 무료 법률상담","이혼 위자료 청구","이혼 재산분할 비율","이혼 친권·양육권","이혼 양육비 청구","가정폭력 이혼 방법","이혼 소송 증거 수집","이혼 전 재산 빼돌림","이혼 별거 중 양육비","이혼 배우자 가출","이혼 빚 공동부담","재산분할 청구 기한","위자료 소멸시효","이혼 후 공동명의 대출","이혼 퇴직금 재산분할","면접교섭권 신청","양육비 미지급 대응","대한법률구조공단 상담","이혼 일방 거부"];
const HUB_LINKS = [
  { title: "이혼 일방 거부·별거 이혼 사유 | 상대방이 거부해도 이혼하는 방법", desc: "상대방 거부 시 재판이혼 방법", href: "#" },
  { title: "이혼 무료 법률상담 소송구조 | 변호사비 없이 이혼하는 방법", desc: "소득 기준 125% 이하 무료 지원", href: "#" },
  { title: "이혼 위자료 청구 | 금액 기준과 소멸시효 확인", desc: "유책 배우자에게 위자료 청구", href: "#" },
  { title: "이혼 별거 중·소송 중 양육비 | 이혼 전 임시 양육비", desc: "별거 중 양육비 받는 방법", href: "#" },
];
const FAQS = [
  { urgent: true, q: "별거 중인데 상대방이 이혼에 동의하지 않아요. 재판으로 이혼할 수 있나요?", a: "가능해요. 장기 별거로 혼인관계가 사실상 회복 불가능하게 파탄 났다면 민법 840조 6호 '혼인을 계속하기 어려운 중대한 사유'로 재판이혼을 청구할 수 있어요. 별거 기간이 길수록 인정 가능성이 높아요. 최근 법원은 2~3년 이상 별거 + 화해 가능성 없음이 확인되면 이혼을 인용하는 경향이 있어요." },
  { urgent: true, q: "내가 먼저 집을 나왔는데 이혼을 청구할 수 있나요?", a: "원칙적으로 유책 배우자(혼인 파탄 책임이 있는 쪽)는 이혼을 청구할 수 없어요. 하지만 상대방도 이혼 의사가 있고 재산 조건 때문에 거부하는 것이라면 예외적으로 인정된 판례가 있어요. 또한 내가 나온 이유가 상대방의 폭력·학대·부정행위 때문이라면 오히려 상대방이 유책 배우자예요." },
  { urgent: false, q: "별거 기간이 얼마나 돼야 이혼이 가능한가요?", a: "법에 정해진 최소 별거 기간은 없어요. 법원은 별거 기간, 화해 가능성, 자녀 유무, 경제적 상황을 종합해서 판단해요. 실무상 1~2년 이상 별거 + 혼인 지속 의사 없음이 확인되면 이혼이 인용되는 경우가 많아요. 별거 기간이 짧아도 가정폭력·외도 등 명백한 이혼 사유가 있으면 별거 기간과 무관하게 이혼할 수 있어요." },
  { urgent: false, q: "별거 중에도 이혼 전에 재산이 처분될 수 있어요. 어떻게 막나요?", a: "이혼 소장을 제출하면서 동시에 부동산 처분금지가처분을 신청하세요. 가처분이 나오면 상대방이 재산을 팔거나 담보로 제공하는 것을 막을 수 있어요. 별거 중이어도 소장 제출 전에 먼저 가처분을 신청하는 것도 가능해요. 132에 전화하면 신청서 작성을 도와줘요." },
  { urgent: false, q: "별거 중에 상대방이 외도를 했어요. 증거를 모아야 하나요?", a: "외도가 이혼 후 이혼 소송에서 이혼 사유 + 위자료 청구 근거가 돼요. 증거를 합법적으로 수집하는 게 중요해요. 카카오톡·문자 캡처, 통화 녹음(본인 통화), 신용카드 내역이 증거가 돼요. 상대방 핸드폰을 몰래 보거나 차에 GPS를 달거나 주거지에 몰래 카메라를 설치하는 것은 불법이에요." },
];
const G = "#1D9E75", GL = "#E1F5EE", GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
const H2 = ({ children }: any) => <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>{children}</h2>;
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {FAQS.map((faq, i) => (
        <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 8 }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111", lineHeight: 1.5, display: "flex", alignItems: "center", gap: 8 }}>
              {faq.urgent && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 10, background: "#FEE2E2", color: "#DC2626", flexShrink: 0 }}>긴급</span>}
              {faq.q}
            </span>
            <span style={{ fontSize: 16, color: "#9ca3af", flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <div style={{ padding: "0 14px 14px", fontSize: 13, color: "#374151", lineHeight: 1.9, borderTop: "1px solid #f3f4f6" }}><p style={{ margin: "12px 0 0" }}>{faq.a}</p></div>}
        </div>
      ))}
    </div>
  );
}
function HubLinks() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", margin: "2rem 0" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>📋 관련 글도 함께 보세요</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {HUB_LINKS.map((link, i) => (
          <a key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", borderBottom: i < HUB_LINKS.length - 1 ? "1px solid #f3f4f6" : "none", textDecoration: "none" }}>
            <span style={{ color: G, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>›</span>
            <span style={{ flex: 1 }}><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{link.title}</span><span style={{ fontSize: 12, color: "#9ca3af" }}>{link.desc}</span></span>
          </a>
        ))}
      </div>
    </div>
  );
}
function Sidebar() {
  return (
    <div style={{ width: 176, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
      <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 14px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.05em" }}>이혼 관련 글</p>
        {SIDEBAR_LINKS.map((label, i) => (
          <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 0", fontSize: 12, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f0f0f0", lineHeight: 1.5 }}>
            <span style={{ color: "#d1d5db", fontSize: 10, flexShrink: 0 }}>›</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}
export default function ByelgeoIhonPage() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111", display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, color: G, fontWeight: 600, marginBottom: 10 }}>이혼 · 별거 · 재판상 이혼</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
          별거 중인데 이혼이 가능한가요 |<br />
          재판 청구 조건·기간·유책 판단 기준
        </h1>
        <p style={{ ...body, fontSize: 15 }}>
          별거 중인데 상대방이 이혼을 거부하고 있나요. 또는 별거가 길어졌는데 이혼을 어떻게 시작해야 할지 모르겠나요.<br />
          별거 기간이 길다면 상대방 동의 없이도 재판으로 이혼할 수 있어요.<br /><br />
          민법 840조 6호 '혼인을 계속하기 어려운 중대한 사유'가 적용돼요. 법에 정해진 최소 별거 기간은 없지만 법원은 별거 기간, 화해 가능성, 자녀 상황을 종합해서 판단해요.
        </p>
        <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "0 0 1.5rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
          <strong style={{ display: "block", marginBottom: 6 }}>별거 이혼 청구 핵심 정리</strong>
          법적 근거: 민법 840조 6호 — 혼인을 계속하기 어려운 중대한 사유<br />
          실무상 기준: 2~3년 이상 별거 + 화해 가능성 없음<br />
          주의사항: 유책 배우자(파탄 책임자)는 원칙적으로 이혼 청구 불가<br />
          예외: 상대방도 이혼 의사가 있거나, 상대방 귀책이 더 크면 예외 인정
        </div>
        <HubLinks />
        <H2>별거 중 이혼 청구 — 재판청구 조건·기간·유책 판단 기준</H2>
        <p style={body}>
          별거로 인한 이혼 소송에서 가장 중요한 것은 두 가지예요.<br />
          첫째, 혼인관계가 회복 불가능하게 파탄됐다는 것. 둘째, 내가 유책 배우자가 아니거나 상대방도 이혼 의사가 있다는 것이에요.<br />
          별거 기간이 길수록 파탄 입증이 쉬워져요. 별거 시작 날짜를 입증할 수 있는 자료(이사 영수증, 카드 내역, 주민등록 변경)를 확보하세요.
        </p>
        <Divider />
        <H2>유책 배우자도 이혼할 수 있나요</H2>
        <p style={body}>
          유책 배우자(혼인 파탄의 책임이 있는 쪽)는 원칙적으로 이혼 청구를 할 수 없어요.<br />
          하지만 실무에서는 예외가 인정되는 경우가 많아요.<br />
          상대방도 이혼 의사가 있거나, 상대방의 귀책이 더 크거나, 내가 나간 이유가 상대방의 폭력·부정행위 때문이라면 예외적으로 이혼이 인정될 수 있어요.<br />
          별거 기간이 길고 화해 가능성이 없다는 게 증명되면 가능성이 높아져요.
        </p>
        <Divider />
        <H2>별거 중 이혼에 대해 자주 묻는 것들</H2>
        <FAQ />
        <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "2rem 0" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 12 }}>지금 바로 도움받을 수 있어요</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "대한법률구조공단 (132)", url: "tel:132", sub: "별거 이혼 소장 작성 무료 지원" },
              { label: "대법원 전자소송 — 이혼 소장 제출", url: "https://ecfs.scourt.go.kr", sub: "온라인 이혼 소장 접수" },
            ].map((item, i) => (
              <a key={i} href={item.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#fff", textDecoration: "none", border: "1px solid #9FE1CB" }}>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: "#111", display: "block" }}>{item.label}</span><span style={{ fontSize: 11, color: "#6b7280" }}>{item.sub}</span></div>
                <span style={{ color: G, fontWeight: 700 }}>→</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "1.2rem", padding: "14px 18px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#9ca3af", lineHeight: 1.9 }}>
          이 글은 2026년 3월 기준 민법 제840조·찾기쉬운 생활법령을 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 대한법률구조공단(132)에 상담하세요.
        </div>
      </div>
    </div>
  );
}
