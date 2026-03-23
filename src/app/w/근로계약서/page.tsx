"use client";

// Q1. 근로계약서를 처음 쓰거나, 회사가 안 줘서 어떻게 해야 하는지 모르는 근로자/사업주
// Q2. 필수 기재사항을 빠짐없이 작성하고, 근로자에게 교부해서 과태료를 피한다
// Q3. 필수 기재 6가지(임금·근로시간·휴일·연차·업무·계약기간), 미작성 시 500만원 과태료, 교부 의무
// Q4. GreenBox 필수사항 요약 + Checklist 체크리스트 + Steps 작성 절차 + BorderBox 과태료

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "표준 근로계약서 양식을 준비해요",
    desc: "고용노동부 홈페이지에서 정규직용, 기간제용, 단시간용 표준 양식을 무료로 받을 수 있어요. 양식을 쓰면 필수 사항을 빠뜨릴 위험이 적어요.",
    tip: "고용노동부 moel.go.kr → 정보공개 → 서식자료실",
    link: { label: "고용노동부 양식", href: "https://www.moel.go.kr" },
  },
  {
    title: "필수 기재사항 6가지를 빠짐없이 써요",
    desc: "임금(기본급·수당·지급일·지급방법), 근로시간(주 40시간 기준, 시작·종료 시간), 휴일, 연차휴가, 업무 내용, 기간제라면 계약기간까지 반드시 명시해요.",
  },
  {
    title: "양쪽이 서명하고 각 1부씩 보관해요",
    desc: "회사 1부, 근로자 1부. 근로자가 동의하면 이메일이나 문자로 교부해도 돼요. 회사는 근로관계 종료 후 3년간 보관 의무가 있어요.",
    tip: "근로자가 요구하면 반드시 교부해야 해요 (미교부 시 과태료)",
  },
  {
    title: "근로조건 변경 시 새로 작성해요",
    desc: "임금이나 근로시간을 바꾸려면 근로자 동의를 받고, 변경된 내용으로 계약서를 다시 써서 교부해야 해요. 구두 합의만으로는 나중에 분쟁이 생겨요.",
  },
];

const CHECKLIST_ITEMS = [
  "임금: 기본급, 수당, 지급일, 지급방법 명시",
  "근로시간: 주 40시간 기준, 시작·종료·점심시간 명시",
  "휴일: 주휴일, 공휴일 여부 명시",
  "연차휴가: 1년 미만 월 1일, 1년 이상 15일 기준",
  "업무 내용: 영업, 생산직, 사무 등 구체적 기재",
  "기간제: 계약 시작일과 종료일 정확히 명시",
  "시급제: 시급 금액, 주휴수당 포함 여부 명시",
  "서명 후 근로자에게 1부 반드시 교부",
];

const FAQS = [
  { q: "근로계약서 안 쓰면 처벌이 어떻게 되나요?", a: "정규직은 근로기준법 위반으로 500만원 이하 벌금, 기간제·단시간 근로자는 기간제법 위반으로 500만원 이하 과태료가 나와요. 알바도 예외 아니에요." },
  { q: "구두로만 약속해도 효력이 있나요?", a: "구두 계약도 법적 효력은 있어요. 하지만 나중에 분쟁이 생기면 근로자가 입증하기 어렵고, 서면 미교부 자체가 과태료 사유예요." },
  { q: "포괄임금제로 계약서를 써도 되나요?", a: "가능하긴 한데, 기본급과 각 수당(연장·야간·휴일)을 분리해서 명시해야 해요. '포괄 300만원'만 적으면 분쟁 시 불리해요." },
  { q: "최저임금보다 낮게 쓰면 무효인가요?", a: "네. 2026년 최저시급 10,320원보다 낮은 임금으로 계약하면 그 부분은 무효이고, 최저임금으로 자동 보정돼요." },
  { q: "기간제는 최대 몇 년까지 가능한가요?", a: "2년까지예요. 갱신해서 2년을 넘기면 무기계약직(정규직)으로 자동 전환돼요. 기간제법 제4조에서 규정하고 있어요." },
  { q: "입사 후에 써도 되나요?", a: "늦어도 입사일에는 써야 해요. 가장 좋은 건 입사 전에 미리 작성해서 근로조건을 확인하는 거예요." },
  { q: "불리한 조건에 서명했는데 무효로 할 수 있나요?", a: "최저임금 미달, 퇴직금 포기, 법정 수당 미지급 같은 조건은 근로자가 서명해도 법적으로 무효예요. 법으로 정한 기준 아래는 강제로 보호돼요." },
];

const SOURCES = [
  { name: "근로기준법 제17조 (근로조건의 명시)", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부 표준근로계약서", href: "https://www.moel.go.kr" },
  { name: "기간제 및 단시간근로자 보호 등에 관한 법률", href: "https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" },
];

const RELATED = [
  { slug: "최저임금", title: "2026년 최저임금", description: "시급 10,320원, 월급 환산 2,157,960원." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산법", description: "1년 이상 근무 시 퇴직금 얼마 받는지." },
  { slug: "기간제근로자-무기계약-전환-시기", title: "기간제 무기계약 전환", description: "2년 넘으면 정규직 전환 의무." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 근로계약서</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로계약서 필수 기재사항 6가지<br />
        미작성 시 과태료와 작성 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        근로계약서를 제대로 안 쓰면 500만원 과태료가 나올 수 있다는 거 아시나요?
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제17조</a>에 따라 임금, 근로시간, 휴일, 연차, 업무 내용을 반드시 서면으로 명시하고 근로자에게 교부해야 해요. 정규직이든 알바든 일용직이든 예외 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>필수 기재사항 6가지, 이것만 넣으면 돼요</H2>
      <p style={body}>
        근로기준법에서 정한 필수 사항이에요. 하나라도 빠지면 과태료 사유가 돼요.
      </p>

      <GreenBox>
        1. 임금: 기본급, 수당, 지급일, 지급방법{"\n"}
        2. 근로시간: 주 40시간 기준, 시작·종료·점심시간{"\n"}
        3. 휴일: 주휴일, 공휴일 여부{"\n"}
        4. 연차휴가: 발생 기준과 일수{"\n"}
        5. 업무 내용: 구체적인 담당 업무{"\n"}
        6. 계약기간: 기간제인 경우 시작일·종료일
      </GreenBox>

      <p style={body}>
        시급제 알바라면 시급 금액, <a href="/w/최저임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>최저임금</a> 이상인지, 주휴수당 포함 여부를 따로 명시해야 해요. 월급제 정규직은 기본급과 각 수당을 분리해서 적는 게 분쟁 예방에 좋아요.
      </p>

      <CategoryButton label="근로/노동" count={15} href="/category/근로-노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>작성부터 교부까지, 이 순서로 해요</H2>
      <p style={body}>
        양식 준비부터 교부까지 4단계예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>미작성 시 과태료, 얼마나 나오나요?</H2>
      <p style={body}>
        안 쓰거나 안 주면 벌금이에요.
      </p>

      <BorderBox>
        <strong>정규직</strong>: 근로기준법 위반 → 500만원 이하 벌금{"\n"}
        <strong>기간제·단시간 근로자</strong>: 기간제법 위반 → 500만원 이하 과태료{"\n"}
        <strong>미교부</strong>: 작성하고도 근로자에게 안 주면 → 동일한 과태료{"\n"}
        <strong>구두 계약</strong>: 효력은 있지만, 서면 미작성 자체가 위반 사유
      </BorderBox>

      <p style={body}>
        "알바니까 안 써도 돼"는 틀린 말이에요. 하루만 일하는 일용직도 근로계약서 작성 의무가 있어요.
      </p>

      <Divider />

      <H2>작성 전 체크리스트</H2>
      <p style={body}>
        빠진 항목 없는지 마지막으로 점검하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <H2>근로계약서, 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실무에서 자주 나오는 질문만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 기간제법을 바탕으로 작성했어요. 법 개정에 따라 내용이 달라질 수 있으니 최신 정보는 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
