"use client";

/*
Q1. 경매 낙찰 후 매각허가결정에 문제가 있는데, 이의를 제기할 수 있는지·어떻게 하는지 모르는 상황이에요.
Q2. 이의신청 vs 즉시항고를 구분하고, 7일 이내에 법원에 제출할 수 있어야 해요.
Q3. 이의신청 사유(민사집행법 121조), 이의신청 vs 즉시항고 구분(사법보좌관/판사), 7일 불변기간, 즉시항고 보증금(매각대금 10%), 확정 후 취소신청.
Q4. GreenBox(핵심 비교) + Steps(절차) + BorderBox(비용) + Checklist + FAQ.
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// ─── 데이터 ───

const OBJECTION_STEPS = [
  { title: "결정 통지서 확인", desc: "매각허가결정 통지를 받으면 '사법보좌관 결정'인지 '판사 결정'인지 먼저 확인해요." },
  { title: "사법보좌관 결정 → 이의신청서 제출", desc: "고지받은 날부터 7일 이내에 해당 법원에 이의신청서를 제출해요. 인지대 약 2,000원이에요." },
  { title: "판사 결정 → 즉시항고장 제출 + 보증금 공탁", desc: "7일 이내에 항고장 제출 + 매각대금의 10%를 보증금으로 공탁해야 해요." },
  { title: "법원 심리", desc: "이의신청은 판사가, 즉시항고는 항고법원이 사유를 심리해요." },
  { title: "결과 확인", desc: "인용되면 매각허가 취소. 기각되면 원래 결정이 유지되고, 즉시항고 보증금은 상대방 손해 배상에 쓰여요." },
];

const CHECKLIST_ITEMS = [
  "고지받은 날짜 정확히 기록 (7일 불변기간 — 주말·공휴일 포함)",
  "사법보좌관 결정인지 판사 결정인지 확인",
  "이의 사유가 민사집행법 제121조에 해당하는지 검토",
  "즉시항고 시 매각대금 10% 보증금 현금 준비",
  "이의신청서/항고장에 구체적 법적 근거 명시",
];

const FAQS = [
  { q: "7일 기한을 1일이라도 넘기면 어떻게 되나요?", a: "불변기간이라 1일만 넘겨도 이의신청이나 즉시항고가 불가능해요. 매각허가결정이 그대로 확정되죠. 이후에는 취소신청으로만 다툴 수 있어요." },
  { q: "'비싸게 샀다'는 이유로 이의신청 할 수 있나요?", a: "안 돼요. 이의 사유는 민사집행법 제121조에 정해진 것만 인정돼요. 최저입찰가 미달, 낙찰자 자격 미충족, 절차 위법, 권리관계 중대 하자 등이에요." },
  { q: "즉시항고 보증금은 돌려받을 수 있나요?", a: "항고가 인용(받아들여짐)되면 전액 돌려받아요. 기각되면 보증금으로 상대방의 손해를 배상하게 되죠." },
  { q: "이의신청 비용은 얼마나 드나요?", a: "이의신청 자체는 인지대 약 2,000원이에요. 변호사 없이 본인이 직접 해도 되죠. 반면 즉시항고는 매각대금의 10% 보증금이 필요해서 금액이 클 수 있어요." },
  { q: "매각허가결정이 확정된 뒤에도 취소할 수 있나요?", a: "중대한 사유(낙찰자 사기, 담합, 절차 무효 등)가 발견되면 취소신청이 가능해요. 단순 착오나 경미한 하자는 인정 안 되죠." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민사집행법 제121조: 매각허가 이의 사유", url: "https://www.law.go.kr/법령/민사집행법" },
    { label: "민사집행법 제130조: 즉시항고", url: "https://www.law.go.kr/법령/민사집행법" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령정보: 부동산 경매", url: "https://www.easylaw.go.kr" },
  ]},
];

// ─── 페이지 ───

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매 · 이의신청</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 매각허가결정 이의신청, 7일 놓치면 끝?<br />
        절차와 비용
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        경매 낙찰받았는데 권리관계가 잘못 명시돼 있거나, 절차에 하자가 있다면 이의를 제기할 수 있어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a>에 따라
        매각허가결정에 불복하려면 <strong>고지받은 날부터 7일 이내</strong>에 이의신청 또는 즉시항고를 해야 해요.
        이 기한은 불변기간이라 주말·공휴일도 포함되고, 1일만 넘겨도 끝이에요.
      </p>

      <Divider />

      {/* 섹션 1: 이의신청 vs 즉시항고 */}
      <H2>이의신청과 즉시항고, 뭐가 다른가요?</H2>
      <p style={body}>
        누가 매각허가결정을 내렸느냐에 따라 불복 방법이 달라져요.
        통지서에 &ldquo;사법보좌관 결정&rdquo;이라고 적혀 있으면 이의신청, &ldquo;판사 결정&rdquo;이면 즉시항고를 하세요.
      </p>

      <GreenBox title="핵심 비교">
        사법보좌관 결정 → 이의신청 (인지대 약 2,000원)<br />
        판사 결정 → 즉시항고 (보증금: 매각대금의 10%)<br />
        공통 기한: 고지받은 날부터 7일 이내 (불변기간)
      </GreenBox>

      <Divider />

      {/* 섹션 2: 이의신청 사유 */}
      <H2>어떤 사유로 이의신청할 수 있나요?</H2>
      <p style={body}>
        아무 이유로나 이의를 제기할 수 없어요.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법 제121조</a>에
        규정된 사유만 인정되죠.
      </p>

      <BorderBox>
        <p style={{ ...body, marginBottom: 6 }}><strong>최저입찰가 미달</strong> — 법원이 정한 최저가보다 낮게 낙찰된 경우</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>낙찰자 자격 미충족</strong> — 입찰 자격 없는 사람이 낙찰받은 경우</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>절차 위법</strong> — 공고 누락, 통지 미달 등 절차에 중대한 하자가 있는 경우</p>
        <p style={body}><strong>권리관계 중대 하자</strong> — 물건명세서 오류, 담보권 잘못 표시 등</p>
      </BorderBox>
      <p style={body}>
        &ldquo;비싸게 샀어요&rdquo;, &ldquo;마음이 바뀌었어요&rdquo;는 이의 사유가 아니에요. 법적 근거를 구체적으로 명시해야 받아들여지죠.
      </p>

      <Divider />

      {/* 섹션 3: 불복 절차 */}
      <H2>구체적으로 어떻게 진행하나요?</H2>
      <p style={body}>
        통지서를 받은 즉시 사유를 검토하고, 기한 내에 서류를 제출하세요.
      </p>
      <Steps steps={OBJECTION_STEPS} />

      <Divider />

      {/* 섹션 4: 체크리스트 */}
      <H2>이의신청 전에 꼭 확인할 것들</H2>
      <p style={body}>
        7일은 정말 짧아요. 통지받은 날부터 바로 움직여야 하죠.
      </p>
      <Checklist items={CHECKLIST_ITEMS} />
      <p style={body}>
        <a href="/w/경매-낙찰-후-등기-소유권이전" style={{ color: "#1D9E75", textDecoration: "underline" }}>경매 낙찰 후 등기 절차</a> 글에서
        정상 진행 시 소유권이전 과정도 함께 확인해두세요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민사집행법을 바탕으로 작성됐어요. 개별 사건에 따라 적용이 다를 수 있으니, 법원 담당 사무관이나 변호사와 상담하세요." />
    </div>
  );
}
