"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "계약직으로 1년 이상 동일 사업장에서 근무했어요" },
  { id: "c2", label: "주 평균 15시간 이상 일했어요" },
  { id: "c3", label: "계약이 갱신되면서 업무가 이어졌어요" },
  { id: "c4", label: "퇴직 후 3년 이내예요(소멸시효)" },
];

const CHECKLIST = [
  "근로계약서(원본 또는 사본) — 갱신 이력 포함",
  "급여명세서(최근 3개월) — 평균임금 산정용",
  "4대보험 가입 내역서 — 근로 기간 증빙",
  "출퇴근 기록, 업무 지시 문서 — 계속 근로 입증용",
  "내용증명 발송 기록 — 미지급 시 증거 확보",
];

const FAQS = [
  {
    q: "3개월 단기 계약을 반복해도 퇴직금 규정이 적용되나요?",
    a: "3개월 계약이라도 갱신이 반복되면 전체 기간이 합산돼요. 총 12개월 이상 이어졌다면 퇴직금 지급 의무가 생기죠.",
  },
  {
    q: "계약 갱신 시 퇴직금이 리셋(초기화)되나요?",
    a: "안 돼요. 갱신은 기존 근로관계의 연장이지 새 계약이 아니에요. 사업주가 퇴직 처리 후 재계약하더라도 실질적으로 업무가 이어졌다면 기간은 합산되죠.",
  },
  {
    q: "계약직 퇴직금 규정을 위반하면 사업주에게 어떤 벌칙이 있나요?",
    a: "3년 이하 징역 또는 3,000만 원 이하 벌금이에요. 근로자퇴직급여 보장법에 명시돼 있죠. 신고하면 근로감독관이 조사에 들어가요.",
  },
  {
    q: "계약 기간 중간에 퇴사해도 퇴직금이 나오나요?",
    a: "네, 나와요. 퇴직 사유와 관계없이 1년 이상 근무했다면 퇴직금은 발생해요. 자발적 퇴사든 계약 만료든 동일하죠.",
  },
  {
    q: "퇴직금을 매달 월급에 포함시켜 줬다고 하면 유효한가요?",
    a: "원칙적으로 무효예요. 퇴직금은 퇴직 시 일시에 지급하는 게 법적 원칙이죠. 월 분할 지급 약정은 근로자에게 불리한 조건이라 효력이 인정되지 않는 경우가 많아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — 퇴직금 지급 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제34조 — 퇴직급여 제도", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당 — 퇴직금 미지급 신고", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "계약직-퇴직금",
    title: "계약직 퇴직금 받을 수 있는 조건",
    description: "1년 이상 근무한 계약직이라면 정규직과 동일하게 퇴직금을 받을 수 있어요.",
  },
  {
    slug: "퇴직금-지급-기준",
    title: "퇴직금 지급 기준 전체 정리",
    description: "근무 기간, 근로시간, 사업장 규모별 퇴직금 지급 기준을 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법",
    description: "회사가 퇴직금을 안 주면 고용노동부에 신고하는 절차를 안내해요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="계약직-퇴직금-지급규정"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 계약직 · 지급규정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약직 퇴직금 지급 규정,<br />
        어떻게 적용되나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;계약직이라 퇴직금 규정이 다르다&rdquo;는 얘기를 들어본 적 있나요?
        사실이 아니에요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>은 정규직과 계약직에게 동일한 규정을 적용하죠.
        문제는 사업주가 규정을 몰라서, 혹은 알면서도 지키지 않는 경우예요.
        갱신 시 기간 합산 원칙, 리셋 불가 규정, 위반 시 제재까지 — 계약직 퇴직금 규정의 핵심을 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>계약직에게 퇴직금 지급 규정이 적용되나요?</H2>
      <p style={body}>
        적용돼요. 근로자퇴직급여 보장법은 &ldquo;계속근로기간 1년 이상인 근로자&rdquo;에게 퇴직금을 지급하도록 규정하고 있어요. 여기서 &ldquo;근로자&rdquo;란 고용 형태와 무관하게 근로계약을 맺고 일하는 모든 사람을 말하죠.
      </p>
      <p style={body}>
        계약직이라는 이유로 퇴직금 규정에서 제외되는 건 법적으로 불가능해요. 사업장 규모가 5인 미만이더라도 2012년 이후부터는 모든 사업장에 퇴직금 지급 의무가 적용됐기 때문이에요. 1인 사업장도 마찬가지죠.
      </p>
      <p style={body}>
        유일한 예외가 있다면 <strong>주 15시간 미만</strong> 근로자예요. 이 기준 미만이면 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 발생 조건</a>을 충족하지 못하죠. 하지만 주 15시간 이상 일하면서 1년을 넘겼다면, 계약직이어도 퇴직금은 당연한 권리예요.
      </p>

      <GreenBox title="계약직 퇴직금 규정 핵심">
        1. <strong>정규직과 동일한 규정</strong>이 적용돼요<br />
        2. <strong>사업장 규모</strong>와 관계없이 지급 의무<br />
        3. 예외: 주 15시간 미만 근로자만 해당 안 돼요
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당돼요. 퇴직금 지급 규정이 적용되는 상황이에요."
        partialMatchText="일부만 해당돼요. 나머지 조건을 확인하고 고용노동부(1350)에 상담해보세요."
      />

      <Divider />

      <H2>기간이 짧은 계약직도 해당되나요?</H2>
      <p style={body}>
        단일 계약 기간이 짧아도 갱신이 반복돼서 총 기간이 1년을 넘으면 해당돼요. 3개월 계약을 네 번, 6개월 계약을 두 번 — 이런 식으로 합산해서 12개월 이상이면 퇴직금 지급 의무가 발생하죠.
      </p>
      <p style={body}>
        판례가 이 부분을 확고하게 뒷받침해요. 대법원은 &ldquo;계약 형식이 아닌 근로 실태를 기준으로 판단해야 한다&rdquo;고 반복적으로 판시하고 있죠. 계약서를 매번 새로 작성했더라도 업무·장소·지휘관계가 동일하면 하나의 근로관계로 봐요.
      </p>
      <p style={body}>
        다만 계약과 계약 사이에 상당한 공백 기간이 있다면 별도 근로관계로 판단될 수 있어요. 통상 1~2일 공백은 문제없지만, 1개월 이상 비어 있으면 리스크가 커지죠. 갱신 시 공백이 생기지 않도록 주의해야 해요.
      </p>

      <BorderBox title="갱신 시 퇴직금 리셋은 불법">
        사업주가 계약 갱신 시점에 퇴직 처리를 하고 퇴직금을 정산한 뒤 재계약하는 경우가 있어요.<br />
        이건 근로자퇴직급여 보장법 위반으로, 전체 근무 기간에 대한 퇴직금 차액을 청구할 수 있죠.
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>계약 갱신 시 퇴직금 리셋이 되나요?</H2>
      <p style={body}>
        안 돼요. 계약 갱신은 기존 근로관계의 연장이지, 새로운 근로관계가 시작되는 게 아니에요. 따라서 퇴직금 산정 기간이 갱신 시점에서 리셋되지 않고 처음부터 계속 이어지죠.
      </p>
      <p style={body}>
        사업주가 중간에 &ldquo;퇴직금 중간정산&rdquo;을 제안할 수 있어요. 이건 법정 사유(주택 구입, 질병 치료 등)가 있을 때만 가능하고, 사유 없이 하면 법적으로 무효가 될 수 있죠. 중간정산에 동의하더라도 그 이후 기간에 대한 퇴직금은 별도로 발생해요.
      </p>
      <p style={body}>
        &ldquo;계약 종료 시마다 퇴직금을 정산했다&rdquo;고 주장하는 회사도 있어요. 실질적으로 근로가 이어졌다면 이 정산은 &ldquo;중간정산&rdquo;에 해당하고, 법정 사유 없는 중간정산은 효력이 없어요. 최종 퇴직 시 전체 기간에 대해 퇴직금을 다시 계산해야 하죠.
      </p>

      <Divider />

      <H2>회사가 규정을 어기면 어떻게 하나요?</H2>
      <p style={body}>
        가장 먼저 할 일은 회사에 서면으로 퇴직금 지급을 요청하는 거예요. 구두보다 내용증명이 효과적이에요. &ldquo;퇴직금 미지급 시 법적 조치를 하겠다&rdquo;는 의사를 명확히 전달하면, 상당수 사업주가 지급에 응하죠.
      </p>
      <p style={body}>
        내용증명 이후에도 지급하지 않으면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서 온라인으로 진정을 접수하세요. 접수 후 근로감독관이 사업장을 조사하고, 퇴직금 지급 시정 명령을 내려요. 사업주가 명령을 이행하지 않으면 형사 처벌(3년 이하 징역/3,000만 원 이하 벌금)까지 갈 수 있죠.
      </p>
      <p style={body}>
        소멸시효가 <strong>3년</strong>이라는 점을 꼭 기억하세요. 퇴직일부터 3년 안에 청구해야 해요. 시간이 지날수록 증빙 자료 확보도 어려워지니까, 퇴직 후 최대한 빨리 움직이는 게 좋죠.
      </p>

      <Divider />

      <H2>계약직 퇴직금 지급 기한은?</H2>
      <p style={body}>
        계약 종료일(퇴직일)로부터 <strong>14일 이내</strong>예요. 이건 <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>에 명시된 원칙이고, 계약직이라고 기한이 달라지지 않아요. 14일을 넘기면 연 20% 지연이자가 자동으로 붙기 시작하죠.
      </p>
      <p style={body}>
        당사자 간 합의로 기한을 연장할 수 있지만, 반드시 서면 동의가 있어야 해요. 구두 약속만으로는 효력이 없죠. 연장 동의서를 쓸 때는 연장 기한과 지연이자 부담 여부를 명확히 적어두세요.
      </p>
      <p style={body}>
        퇴직금이 14일 넘게 안 들어온다면 내용증명 → 고용노동부 진정 → 민사소송(지급명령 신청) 순으로 대응하면 돼요. 대부분 내용증명 단계에서 해결되지만, 끝까지 버티는 사업주도 있으니 증빙 자료를 미리 챙겨두는 게 핵심이에요.
      </p>

      <SectionBadge>준비 서류</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        계약직 퇴직금 지급 규정에 대해 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
