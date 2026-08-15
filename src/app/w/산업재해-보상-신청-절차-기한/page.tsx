"use client";
// Q1. 직장에서 다쳤거나 질병이 생겨서 산재 신청하려는데 절차를 모르는 상황
// Q2. 산재보험 신청서를 근로복지공단에 제출하고 보상을 받는다
// Q3. 신청기한 3년, 필요 서류, 보상 종류(요양·휴업·장해), 회사 거부 시 직접 신청 방법
// Q4. Steps로 신청 절차 + DocTable로 서류 + GreenBox로 보상 종류 요약

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "산재 발생 즉시 병원 방문", desc: "산재지정 의료기관에서 치료받으세요. 일반 병원도 가능하지만 산재지정 병원이면 본인 부담 없이 치료돼요.", tip: "응급이면 아무 병원이나 먼저 가세요" },
  { title: "요양급여 신청서 작성", desc: "근로복지공단 홈페이지나 지사에서 요양급여 신청서를 받아 작성해요." },
  { title: "회사에 사업주 날인 요청", desc: "신청서에 사업주 확인(날인)을 받아요. 회사가 거부하면 사업주 날인 없이도 제출 가능해요.", tip: "사업주 거부 시 '사업주 미확인 사유서' 첨부" },
  { title: "근로복지공단에 서류 제출", desc: "신청서, 진단서, 재해경위서를 관할 근로복지공단 지사에 제출해요." },
  { title: "재해조사 및 승인 결정", desc: "공단에서 재해 경위를 조사하고 약 1개월 내 승인 여부를 통지해요.", tip: "불승인 시 90일 이내 심사청구 가능" },
];

const DOCS = [
  { name: "요양급여 신청서", required: true, where: "근로복지공단 홈페이지 또는 지사" },
  { name: "초진 소견서 또는 진단서", required: true, where: "치료받은 병원" },
  { name: "재해경위서", required: true, where: "본인 직접 작성" },
  { name: "사업주 확인 날인", required: false, where: "회사 인사팀 (거부 시 미확인 사유서로 대체)" },
  { name: "목격자 진술서", required: false, where: "사고 목격자 (있는 경우)" },
];

const FAQS = [
  { q: "회사가 산재 처리를 안 해주면 어떻게 하나요?", a: "사업주 확인 없이도 본인이 직접 근로복지공단에 신청할 수 있어요. 사업주 미확인 사유서를 첨부하면 돼요. 공단이 독립적으로 조사해서 승인 여부를 결정해요." },
  { q: "산재 신청 기한 3년이 지나면 방법이 없나요?", a: "원칙적으로 재해 발생일(또는 질병 확진일)로부터 3년이 지나면 청구권이 소멸해요. 다만 질병의 경우 확진일 기준이라 뒤늦게 발견된 직업병은 확진일부터 3년이에요." },
  { q: "산재보험 보험료는 누가 내나요?", a: "사업주가 전액 부담해요. 근로자가 보험료를 내는 건 아니에요. 그래서 산재 신청이 근로자에게 금전적 불이익이 되지 않아요." },
  { q: "출퇴근 중 다친 것도 산재 되나요?", a: "2018년부터 출퇴근 재해도 산재로 인정돼요. 통상적인 경로와 방법으로 출퇴근하다 다쳤으면 해당해요. 중간에 사적 용무로 경로를 벗어나면 인정이 안 될 수 있어요." },
  { q: "산재 승인이 안 되면 어떻게 하나요?", a: "불승인 통지를 받은 날부터 90일 이내에 심사청구를 할 수 있어요. 심사청구도 기각되면 재심사청구, 그래도 안 되면 행정소송까지 가능해요." },
  { q: "일용직이나 아르바이트도 산재 신청 가능한가요?", a: "네, 근로자라면 고용 형태와 관계없이 산재보험 적용 대상이에요. 일용직, 파트타임, 계약직 모두 가능해요." },
];

const SOURCES = [
  { name: "산업재해보상보험법", href: "https://www.law.go.kr/법령/산업재해보상보험법" },
  { name: "근로복지공단 산재보상 절차", href: "https://www.comwel.or.kr/comwel/comp/proc.jsp" },
];

const RELATED = [
  { slug: "업무상-재해-인정-요건", title: "업무상 재해 인정 요건", description: "어떤 경우에 산재로 인정받을 수 있는지 기준 정리." },
  { slug: "산재보상-자신-실수-사고-가능", title: "내 실수로 다쳐도 산재 가능한가요?", description: "본인 과실 산재 인정 여부와 조건." },
  { slug: "산재보험-사업주-보험료-전액부담", title: "산재보험료 사업주 전액 부담", description: "산재보험 보험료 부담 구조 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 산재 · 보상</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        산업재해 보상 신청<br />
        절차·서류·기한 한번에 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일하다 다쳤는데 회사에서는 산재 처리가 어렵다고 하죠. 직접 신청할 수 있어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법</a>에 따라 업무 중 발생한 사고나 질병은 산재보험으로 보상받을 수 있어요. 의료비(요양급여), 못 번 임금(휴업급여), 장해가 남으면 장해급여까지 받을 수 있고요. 신청 기한은 재해 발생일로부터 3년이에요. 회사가 협조하지 않아도 본인이 직접 <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>에 신청할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>산재 신청은 이 순서로 진행해요</H2>
      <p style={body}>
        다치면 일단 병원부터 가야 해요. 산재지정 병원이면 본인 부담 없이 치료받을 수 있고, 일반 병원에서 치료받았더라도 나중에 비용을 돌려받을 수 있어요.
      </p>

      <SectionBadge>산재 신청 5단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        전체 과정이 약 1~2개월 걸려요. 승인되면 치료비는 공단에서 직접 병원에 지급하고, 휴업급여는 본인 계좌로 입금돼요.
      </p>

      <CategoryButton label="근로/노동" count={12} href="/category/근로" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>준비할 서류는 이것만 챙기면 돼요</H2>
      <p style={body}>
        서류가 복잡해 보이지만 핵심은 3가지예요. 신청서, 진단서, 재해경위서. 사업주 날인은 받으면 좋지만 없어도 접수 가능해요.
      </p>

      <SectionBadge>산재 신청 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        재해경위서는 사고가 어떻게 일어났는지 구체적으로 적어야 해요. 일시, 장소, 작업 내용, 사고 경위를 시간순으로 쓰면 돼요. 이 서류가 승인 심사에서 가장 중요해요.
      </p>

      <Divider />

      <H2>어떤 보상을 받을 수 있나요?</H2>
      <p style={body}>
        산재로 승인되면 치료비만 나오는 게 아니에요. 일하지 못한 기간의 임금, 장해가 남은 경우의 보상금까지 종류가 다양해요.
      </p>

      <GreenBox>
        산재보험 급여 종류{"\n"}
        - 요양급여: 치료비 전액 (본인 부담 없음){"\n"}
        - 휴업급여: 평균임금의 70% (일할 수 없는 기간){"\n"}
        - 장해급여: 장해등급(1~14급)에 따라 일시금 또는 연금{"\n"}
        - 유족급여: 사망 시 유족에게 평균임금의 52~67%{"\n"}
        - 간병급여: 상시 간병이 필요한 경우 지급
      </GreenBox>

      <p style={body}>
        휴업급여는 4일 이상 쉬어야 받을 수 있어요. 처음 3일은 사업주가 보상해야 해요. 장해등급은 치료가 끝난 후 공단에서 판정하는데, 등급에 따라 금액 차이가 커요.
      </p>

      <Divider />

      <H2>산재 신청 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        회사 거부, 본인 과실, 신청 기한 등 실무에서 자주 부딪히는 상황이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 산업재해보상보험법과 근로복지공단 안내를 바탕으로 작성했어요. 개별 사안에 따라 승인 여부가 달라질 수 있으니 공단 상담(1588-0075)을 권해요." />
    </ArticleLayout>
  );
}
