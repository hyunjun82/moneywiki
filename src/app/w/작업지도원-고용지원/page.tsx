"use client";

// Q1. 중증장애인을 고용했는데 업무 지도를 위한 작업지도원 배치 비용이 부담되는 사업주 상황이에요.
// Q2. 작업지도원 자격 요건 확인하고 한국장애인고용공단에 지원금을 신청하는 행동.
// Q3. 중증장애인 1~5명 대상, 1명당 월 14만원, 월 12시간 이상 지도, 자격 요건, 신청 방법.
// Q4. EligibilityChecker(대상 확인) + GreenBox(지원 금액) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, EligibilityChecker,
  ArticleLayout,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "중증장애인을 1~5명 신규 고용했어요 (90일 이내)" },
  { id: "c2", label: "작업지도원이 월 12시간 이상 업무 지도를 해요" },
  { id: "c3", label: "작업지도원이 자격 요건을 갖추고 있어요" },
  { id: "c4", label: "장애인 근로자가 고용보험에 가입돼 있어요" },
];

const APPLY_STEPS = [
  { title: "작업지도원 자격 확인", desc: "직업생활상담사, 사회복지사, 재활·교육·심리 전공 전문학사 이상, 또는 고졸+장애인 기관 2년 경력 중 하나에 해당하는지 확인해요." },
  { title: "중증장애인 고용 증빙 준비", desc: "고용계약서, 고용보험 가입 증명서, 장애인등록증 사본을 준비해요." },
  { title: "e신고서비스 온라인 신청", desc: "한국장애인고용공단 e신고서비스(esingo.or.kr)에서 지원금을 신청해요.", tip: "매월 지도 실시 다음 달에 신청하거나, 분기·반기 단위로 모아서 신청할 수 있어요." },
  { title: "작업지도 일지 제출", desc: "작업지도 내용을 기록한 일지를 함께 제출해요. 지도 날짜, 시간, 내용이 포함돼야 해요." },
];

const FAQS = [
  { q: "지원금은 기간 제한이 있나요?", a: "기간 제한 없이 중증장애인을 고용하고 작업지도를 제공하는 동안 계속 받을 수 있어요. 매월 12시간 이상 지도 조건만 유지하면 돼요." },
  { q: "사업주 본인이 작업지도원이 될 수 있나요?", a: "네, 자격 요건만 갖추면 사업주 본인이 직접 작업지도원이 될 수 있어요." },
  { q: "최저임금 미만이면 지원금이 줄어드나요?", a: "네, 장애인 근로자가 최저임금보다 적게 받으면 지원금이 절반인 7만원으로 줄어요." },
  { q: "근로지원인과 뭐가 다른가요?", a: "작업지도원은 업무 교육과 상담을 담당하고, 근로지원인은 업무 보조를 담당해요. 별도 제도라서 중복 지원도 가능해요." },
  { q: "6명 이상이면 추가 지원이 안 되나요?", a: "최대 5명까지만 지원금을 받아요. 6명째부터는 지원금 없이 자체 비용으로 작업지도원을 배치해야 해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "한국장애인고용공단 고용관리비용지원", url: "https://www.kead.or.kr" },
    { label: "장애인고용촉진 및 직업재활법", url: "https://www.law.go.kr/법령/장애인고용촉진및직업재활법" },
    { label: "e신고서비스(지원금 신청)", url: "https://www.esingo.or.kr" },
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 장애인 고용</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        장애인 작업지도원 배치하면 얼마 지원?<br />
        자격 요건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        중증장애인을 고용했는데 업무 지도가 걱정되시죠?
        작업지도원을 배치하면 정부에서 장애인 1명당 월 14만원을 지원해줘요.
        어떤 자격이 필요하고 어떻게 신청하는지 정리했어요.
      </p>

      <Divider />

      <H2>우리 회사가 대상인지 확인해보세요</H2>
      <p style={body}>
        아래 항목에 모두 해당하면 작업지도원 배치 지원금을 받을 수 있어요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="작업지도원 지원금 신청 대상이에요. e신고서비스에서 온라인 신청하세요."
        partialMatchText="일부 조건이 맞지 않아요. 작업지도원 자격 요건과 고용 기간을 확인해보세요."
      />

      <Divider />

      <H2>지원 금액은 얼마인가요?</H2>
      <p style={body}>
        <a href="https://www.kead.or.kr" style={{ color: "#1D9E75" }}>한국장애인고용공단</a>에서 운영하는 고용관리비용 지원 제도예요.
      </p>

      <GreenBox title="지원 금액">
        중증장애인 1명당 월 <strong>14만원</strong> (최저임금 미만 시 7만원)<br />
        최대 <strong>5명</strong>까지 지원<br />
        5명 전원 지원 시 월 <strong>70만원</strong>, 연 <strong>840만원</strong>
      </GreenBox>

      <p style={body}>
        <a href="/w/장애인-의무고용률-기업-기준-부족-대응" style={{ color: "#1D9E75" }}>장애인 의무고용률</a>을 맞춰야 하는 기업이라면 더욱 활용하기 좋은 제도예요.
        <a href="/w/장애인고용부담금-감면-계산" style={{ color: "#1D9E75" }}> 장애인고용부담금 감면</a>도 함께 받을 수 있어요.
      </p>

      <Divider />

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>
        <a href="https://www.esingo.or.kr" style={{ color: "#1D9E75" }}>한국장애인고용공단 e신고서비스</a>에서 온라인으로 신청해요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <BorderBox>
        작업지도원 자격 요건 정리예요.<br />
        · 직업생활상담사, 사회복지사 자격증 보유자<br />
        · 재활·교육·심리 전공 전문학사 이상<br />
        · 고졸 이상 + 장애인 관련 기관 2년 이상 근무 경력
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 장애인고용촉진법과 한국장애인고용공단 안내를 바탕으로 작성됐어요. 지원 금액은 변경될 수 있으니 공단(1588-1519)에 확인하세요." />
    </ArticleLayout>
  );
}
