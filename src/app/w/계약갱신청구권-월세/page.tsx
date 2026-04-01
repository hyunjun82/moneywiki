"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

/*
Q1. 월세로 살고 있는데 계약갱신청구권이 전세에만 적용되는 줄 알고, 본인도 쓸 수 있는지 궁금한 상황이에요.
Q2. 월세에도 갱신청구권이 적용된다는 걸 확인하고, 인상 한도 5% 기준과 행사 방법을 파악할 수 있어야 해요.
Q3. 갱신청구권 월세 적용 여부, 보증금·월세 각 5% 한도, 전세→월세 전환 거부 가능, 월세 연체 2기 이상 시 거절 사유, 행사 기간(만료 6개월~1개월 전).
Q4. GreenBox(핵심 요약) + BorderBox(인상 한도 계산 예시) + Steps(행사 절차) + FAQ.
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// ─── 데이터 ───

const EXERCISE_STEPS = [
  { title: "행사 시기 확인", desc: "계약 만료 6개월 전부터 1개월 전 사이에 행사해야 해요. 이 기간을 놓치면 갱신청구권을 쓸 수 없죠." },
  { title: "갱신 의사 통지", desc: "집주인에게 '2년 더 살겠다'고 통지해요. 문자, 카톡, 내용증명 뭐든 괜찮지만 증거가 남는 방법이 좋아요." },
  { title: "인상 조건 협의", desc: "집주인이 인상을 요구하면 보증금·월세 각각 5% 초과 여부를 확인하세요. 5% 넘으면 거부할 수 있어요." },
  { title: "갱신 계약서 작성", desc: "새 계약서를 쓰거나, 기존 계약서에 갱신 내용을 추가하면 돼요. 임대차 신고도 잊지 마세요." },
];

const CHECKLIST_ITEMS = [
  "월세 연체 내역 확인 — 2기(2개월) 이상 연체 시 갱신 거절 사유",
  "행사 기간 확인 — 만료 6개월 전~1개월 전",
  "인상 한도 계산 — 보증금 5%, 월세 5% 각각 확인",
  "통지 방법 — 증거가 남는 방식(문자, 카톡, 내용증명)",
  "관리비는 5% 상한 대상 아님 — 별도 협의 필요",
];

const FAQS = [
  { q: "월세도 정말 계약갱신청구권을 쓸 수 있나요?", a: "네. 주택임대차보호법은 전세·월세·반전세·사글세를 구분하지 않아요. 주택 임대차 계약이면 전부 적용되죠." },
  { q: "월세 인상 한도는 어떻게 계산하나요?", a: "월세 50만원이면 5%인 2.5만원까지만 올릴 수 있어요. 보증금 1,000만원이면 50만원까지 인상 가능하고요. 각각 별도로 5% 적용돼요." },
  { q: "집주인이 전세에서 월세로 바꾸자고 하면 거부할 수 있나요?", a: "네, 거부할 수 있어요. 갱신은 기존 계약 조건 그대로 연장하는 거라서, 전세였으면 전세로 갱신해야 해요." },
  { q: "월세를 2개월 이상 밀렸으면 갱신 못 하나요?", a: "2기(2개월분) 이상 연체하면 집주인이 갱신 거절할 수 있어요. 갱신 행사 전에 연체 월세를 전부 갚아두는 게 안전하죠." },
  { q: "보증금 없는 순수 월세도 갱신청구권이 되나요?", a: "네, 보증금 없이 월세만 있는 계약도 적용돼요. 월세 인상 한도 5%만 확인하면 되죠." },
  { q: "관리비도 5% 한도에 포함되나요?", a: "관리비는 임대료가 아니라서 5% 상한제 대상이 아니에요. 다만 과도한 인상은 분쟁 소지가 있으니 협의가 필요하죠." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "주택임대차보호법 제6조의3: 계약갱신청구권", url: "https://www.law.go.kr/법령/주택임대차보호법" },
  ]},
  { category: "공식 자료", items: [
    { label: "정부24: 임대차계약 신고", url: "https://www.gov.kr/portal/service/serviceInfo/PTR000050545" },
  ]},
];

// ─── 페이지 ───

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 갱신청구권</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약갱신청구권 월세도 되나?<br />
        인상 한도와 거절 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;월세는 갱신청구권 안 되는 거 아니에요?&rdquo; 아니에요, 돼요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법</a>은
        전세와 월세를 구분하지 않아요.
        월세도, 반전세도, 보증금 없는 순수 월세도 전부 갱신청구권 대상이에요.
        보증금과 월세 각각 5%까지만 올릴 수 있고, 5% 넘게 올리겠다고 하면 거부할 수 있죠.
      </p>

      <Divider />

      {/* 섹션 1: 핵심 요약 */}
      <H2>월세 갱신에서 핵심은 뭔가요?</H2>
      <p style={body}>
        <a href="/w/계약갱신청구권-행사방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>계약갱신청구권</a>은
        모든 주택 임대차에 적용돼요. 전세든 월세든 반전세든 상관없죠.
        집주인은 법정 사유가 없으면 갱신을 거절할 수 없어요.
      </p>

      <GreenBox title="월세 갱신 핵심">
        전세·월세·반전세·사글세 모두 갱신청구권 적용<br />
        인상 한도: 보증금 5%, 월세 5% (각각 별도)<br />
        행사 기간: 만료 6개월 전 ~ 1개월 전<br />
        월세 연체 2기 이상이면 거절 사유 될 수 있음
      </GreenBox>

      <Divider />

      {/* 섹션 2: 인상 한도 */}
      <H2>월세는 얼마까지 올릴 수 있나요?</H2>
      <p style={body}>
        <a href="/w/전월세상한제" style={{ color: "#1D9E75", textDecoration: "underline" }}>전월세상한제</a>에 따라
        보증금 5%, 월세 5%가 각각 상한이에요. 시세가 올랐다고 5% 넘게 올리는 건 불법이에요.
      </p>

      <SectionBadge>계산 예시</SectionBadge>
      <BorderBox>
        <p style={{ ...body, marginBottom: 6 }}><strong>예시 1</strong> — 보증금 1,000만원 + 월세 50만원 → 보증금 1,050만원, 월세 52.5만원까지 인상 가능</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>예시 2</strong> — 보증금 2,000만원 + 월세 80만원(반전세) → 보증금 2,100만원, 월세 84만원까지 인상 가능</p>
        <p style={body}><strong>예시 3</strong> — 보증금 0원 + 월세 60만원(순수 월세) → 월세 63만원까지 인상 가능</p>
      </BorderBox>
      <p style={body}>
        더 정확한 계산은 <a href="/w/전월세상한제-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>전월세상한제 계산</a> 글에서 해보세요.
      </p>

      <Divider />

      {/* 섹션 3: 행사 방법 */}
      <H2>갱신청구권은 어떻게 행사하나요?</H2>
      <p style={body}>
        전세랑 절차가 똑같아요. 기간만 정확히 지키면 돼요.
      </p>
      <Steps steps={EXERCISE_STEPS} />

      <Divider />

      {/* 섹션 4: 주의사항 체크리스트 */}
      <H2>갱신 전에 꼭 체크할 것들</H2>
      <p style={body}>
        월세 계약에서 특히 주의해야 할 건 연체 내역이에요.
        2개월 이상 밀리면 갱신이 거절될 수 있거든요.
      </p>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 바탕으로 작성됐어요. 개별 상황에 따라 다를 수 있으니, 대한법률구조공단(132)이나 전문가와 상담하세요." />
    </div>
  );
}
