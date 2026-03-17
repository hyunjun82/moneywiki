"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직일 기준 만 55세 이상이에요" },
  { id: "c2", label: "퇴직금이 300만원 이하예요" },
  { id: "c3", label: "IRP 계좌가 없어요" },
  { id: "c4", label: "퇴직금을 아직 받지 못했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 150, max: 500, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 10, step: 1, defaultValue: 1, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => {
      const amount = Math.round(v / 10000);
      return `약 ${amount.toLocaleString()}만원`;
    },
    highlight: true,
  },
  {
    label: "IRP 의무 여부",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => v > 3000000 ? "IRP 계좌 필요 (300만원 초과)" : "일반 계좌 수령 가능 (300만원 이하)",
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "일반 계좌번호 (본인 명의)", required: true, where: "본인 명의 은행 계좌" },
  { name: "근로계약서 또는 퇴직확인서", required: false, where: "회사 인사팀" },
  { name: "나이 확인 서류 (55세 이상 예외 적용 시)", required: false, where: "주민등록증으로 갈음 가능" },
];

const STEPS = [
  {
    title: "예외 해당 여부 정확히 확인",
    desc: "퇴직일 기준 만 55세 이상이거나 퇴직금이 300만원 이하면 IRP 없이 일반 계좌로 받을 수 있어요. 55세 생일이 퇴직일 이전이어야 예외에 해당해요. 생일과 퇴직일이 같은 날이어도 의무 대상이에요.",
    tip: "하루 차이로 달라지니 정확히 확인하세요",
  },
  {
    title: "회사 인사팀에 예외 사유 전달",
    desc: "예외에 해당하면 회사 인사팀에 나이 또는 퇴직금 금액이 예외 조건임을 알리고, 일반 계좌번호를 전달해요. 별도 신청서 없이 문자나 이메일로도 처리되는 경우가 많아요.",
    tip: "문자나 이메일로 남겨두면 나중에 증거가 돼요",
  },
  {
    title: "퇴직소득세 원천징수 후 입금 확인",
    desc: "회사가 퇴직소득세를 원천징수한 후 나머지를 일반 계좌로 송금해요. 퇴직일로부터 14일 이내에 입금되지 않으면 연 20% 지연이자를 청구할 수 있어요.",
    tip: "원천징수영수증 발급 요청도 함께 하세요",
  },
  {
    title: "원천징수영수증 보관",
    desc: "퇴직소득 원천징수영수증은 종합소득세 신고나 퇴직금 분쟁 시 필요한 서류예요. 인사팀에서 발급받아 보관해두세요. 홈택스에서도 사후 조회가 가능해요.",
    tip: "최소 5년 이상 보관을 권해요",
  },
];

const CHECKLIST = [
  "예외 해당 여부 확인: 나이(55세) 또는 금액(300만원 이하)",
  "회사 인사팀에 일반 계좌 정보 전달 (문자·메일로)",
  "퇴직일로부터 14일 이내 입금 확인",
  "퇴직소득 원천징수영수증 발급 및 보관",
  "예외 해당 안 되면 IRP 개설로 전환",
];

const FAQS = [
  {
    q: "IRP 의무 예외 조건이 정확히 뭔가요?",
    a: "근로자퇴직급여보장법 시행령 기준으로 4가지예요. 만 55세 이상, 퇴직금 300만원 이하, 근로자 사망, 퇴직연금 담보대출 상계로 지급되는 경우예요. 이 중 하나라도 해당하면 일반 계좌로 받을 수 있어요.",
  },
  {
    q: "55세 생일이 퇴직일 당일이면 예외인가요?",
    a: "아니에요. 퇴직일 기준으로 만 55세 이상이어야 해요. 생일이 퇴직일 이전이어야 예외에 해당하고, 생일이 퇴직일과 같은 날이거나 이후라면 의무 대상이에요.",
  },
  {
    q: "소액 퇴직금이면 바로 일반 계좌로 받을 수 있나요?",
    a: "퇴직금이 300만원 이하면 예외예요. 300만원 기준은 세전 총액이에요. 이 경우 IRP 계좌 없이 본인 명의 일반 계좌로 바로 받을 수 있어요.",
  },
  {
    q: "예외인데도 IRP로 받고 싶으면?",
    a: "맞아요. 예외에 해당해도 IRP를 선택할 수 있어요. 55세 이후 연금으로 받으면 퇴직소득세를 30% 절감할 수 있어서 노후 자금으로 활용할 계획이라면 IRP를 고려해볼 수 있어요.",
  },
  {
    q: "예외 적용을 회사가 거부하면?",
    a: "예외 조건이 명확히 해당됨에도 회사가 거부하면 고용노동부(1350)에 신고할 수 있어요. 예외 조건을 문자나 메일로 남겨두면 분쟁 시 증거가 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 시행령: IRP 의무 예외 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: IRP 의무 예외 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-irp-의무", title: "IRP 의무 가입 대상", description: "누구에게 IRP가 의무인지 조건을 정리했어요." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 전체 정리", description: "일시금·연금 비교부터 절차까지." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "의무 대상이라면 IRP를 미리 만들어두세요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-irp-의무-예외" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 의무예외</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 의무 예외, 해당되는 경우는?<br />
        55세 이상·300만원 이하 일반 계좌 수령 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP 없이 퇴직금을 바로 받을 수 있는 경우가 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 시행령</a>에서 정한 4가지 예외 조건 중 하나라도 해당하면 일반 계좌로 직접 받을 수 있어요.
        만 55세 이상이거나 퇴직금이 300만원 이하라면 IRP 계좌 없이도 수령 가능해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 IRP 예외 대상인지 확인해보세요</H2>
      <p style={body}>
        예외 조건은 크게 네 가지예요. 만 55세 이상, 퇴직금 300만원 이하, 근로자 사망, 퇴직연금 담보대출 상계로 지급되는 경우예요.
        이 중 가장 많이 해당되는 건 55세 이상과 300만원 이하예요.
      </p>
      <p style={body}>
        55세 기준은 퇴직일 기준이에요. 생일이 퇴직일 이전이어야 예외에 해당해요.
        하루 차이로 의무 여부가 달라질 수 있으니 정확히 확인해야 해요.
        퇴직금 300만원 기준은 세전 총액이에요.
      </p>

      <GreenBox title="IRP 의무 예외 조건 4가지">
        1. 만 55세 이상 (퇴직일 기준, 생일이 퇴직일 이전이어야 함)<br />
        2. 퇴직금 300만원 이하 (세전 총액 기준)<br />
        3. 근로자 사망<br />
        4. 퇴직연금 담보대출 상계로 지급
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 의무 예외에 해당할 수 있어요. 아래 계산기로 퇴직금 금액을 확인하고 인사팀에 일반 계좌 정보를 전달하세요."
        partialMatchText="일부 조건만 해당돼요. 나이와 퇴직금 금액을 정확히 확인하고 인사팀과 협의하세요."
      />

      <Divider />

      <H2>퇴직금 금액으로 IRP 의무 여부 확인</H2>
      <p style={body}>
        300만원 기준은 세전 퇴직금 총액이에요.
        월 평균급여와 근속 기간을 입력하면 예상 퇴직금과 IRP 의무 여부를 바로 확인할 수 있어요.
        퇴직소득세 공제 전 금액으로 판단해요.
      </p>

      <SectionBadge>퇴직금 금액 확인 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직금이 300만원 이하면 일반 계좌로 수령 가능해요. 초과하면 IRP 계좌가 필요해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>예외 적용 시 필요한 서류</H2>
      <p style={body}>
        예외에 해당하면 회사 인사팀에 일반 계좌 정보만 전달하면 돼요.
        신분증과 본인 명의 계좌번호만 있으면 대부분 처리돼요.
        별도 신청서 없이 문자나 이메일로도 처리되는 경우가 많아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 예외 수령 절차 4단계</H2>
      <p style={body}>
        예외 해당 여부 확인부터 원천징수영수증 보관까지 4단계로 진행돼요.
        회사가 퇴직소득세를 원천징수한 뒤 14일 이내에 일반 계좌로 입금해요.
        14일을 넘기면 연 20% 지연이자를 청구할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>예외 수령 체크리스트</H2>
      <p style={body}>
        예외 조건 확인부터 원천징수영수증 보관까지 하나씩 체크하면 돼요.
        예외에 해당 안 되면 바로 IRP를 개설해야 지연이 없어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="예외라도 IRP가 유리할 수 있어요">
        만 55세 이상이라도 IRP를 선택할 수 있어요.<br />
        55세 이후 연금으로 받으면 퇴직소득세를 30% 절감할 수 있어서 노후 자금으로 활용할 계획이라면 IRP도 고려해보세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 의무 예외에 관해 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
