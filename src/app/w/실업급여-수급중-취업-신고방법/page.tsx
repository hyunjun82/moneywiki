"use client";
// Q1. 실업급여 받는 중에 취업했는데, 신고를 안 하면 부정수급이 될까 봐 불안한 상황이에요.
// Q2. 고용24에서 온라인 취업신고를 완료하고, 조기재취업수당 신청 자격을 확인할 수 있어요.
// Q3. 신고 기한(취업일 다음 날), 고용24 온라인 절차 4단계, 미신고 시 환수+5배 추가 징수, 조기재취업수당 조건.
// Q4. GreenBox(핵심 기한) + Steps(온라인 신고 절차) + BorderBox(미신고 처벌) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "취업신고 기한을 하루 넘겼어요. 어떻게 하나요?",
    a: "지금이라도 바로 신고하세요. 자진신고하면 추가 징수가 감면될 수 있어요. 고용센터(1350)에 먼저 전화해서 상황을 설명하세요.",
  },
  {
    q: "수습 기간인데도 취업신고 해야 하나요?",
    a: "네, 해야 해요. 수습이든 시용이든 실제로 일을 시작한 날이 취업일이에요. 그 다음 날까지 신고해야 해요.",
  },
  {
    q: "취업신고 후 바로 퇴사하면 실업급여 다시 받나요?",
    a: "취업신고 시점에서 잔여 수급기간이 종료돼요. 다시 받으려면 새로운 피보험기간(180일)을 충족해야 해요.",
  },
  {
    q: "전화(1350)로 취업신고가 되나요?",
    a: "안 돼요. 전화 상담만 가능하고, 정식 신고는 고용24 온라인이나 고용센터 방문으로만 처리돼요.",
  },
  {
    q: "조기재취업수당은 어떤 조건에서 받나요?",
    a: "소정급여일수의 절반 이상 남기고 재취업한 뒤 12개월 이상 근무하면 남은 급여의 50%를 한꺼번에 받을 수 있어요.",
  },
  {
    q: "프리랜서로 일하기 시작해도 신고해야 하나요?",
    a: "네. 근로 형태와 관계없이 소득이 발생하는 활동을 시작하면 취업으로 간주돼요. 자영업 개시도 마찬가지예요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 제62조 (법제처)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 취업신고 안내", url: "https://www.work24.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "구직급여-지급-제한-해제", title: "구직급여 지급 제한 해제", description: "구직급여 제한 걸려도 해제받을 수 있어요." },
  { slug: "중소기업-취업자-소득세-감면-이직", title: "중소기업 취업자 소득세 감면", description: "재취업 후 소득세 감면 혜택도 챙기세요." },
];

const STEPS = [
  { title: "고용24 로그인", desc: "work24.go.kr에 접속해서 공동인증서 또는 간편인증으로 로그인해요." },
  { title: "취업신고 메뉴 이동", desc: "수급자격자 서비스 → 취업·훈련 신고 → 취업신고 메뉴로 들어가요." },
  { title: "취업 정보 입력", desc: "취업일, 사업장명, 취업 형태(상용직·계약직·자영업 등)를 입력해요." },
  { title: "신고 완료 확인", desc: "제출하면 접수 번호가 표시돼요. 화면 캡처해서 보관하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 취업신고 · 고용24</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 수급 중 취업했다면?<br />
        고용24 온라인 신고 절차와 기한
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        취업했는데 실업급여 취업신고를 안 하면 부정수급이에요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제62조</a>에 따라
        받은 금액 전액 반환에 최대 5배 추가 징수까지 받을 수 있어요.
        취업한 날 다음 날까지 신고하면 문제없어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>취업신고, 언제까지 해야 하나요?</H2>

      <GreenBox>
        실업급여 취업신고 핵심<br />
        · 기한: 취업한 날의 <strong>다음 날까지</strong><br />
        · 기준: 합격 통보일이 아닌 <strong>실제 근무 시작일</strong><br />
        · 방법: <strong>고용24 온라인</strong> 또는 고용센터 방문<br />
        · 전화(1350) 신고는 불가
      </GreenBox>

      <p style={body}>
        3월 5일에 출근했다면 3월 6일까지 신고해야 해요.
        수습 기간도 근무 시작이에요. 프리랜서 활동이나 자영업 개시도 마찬가지고요.
        하루만 늦어도 그날치 실업급여부터 반환 대상이 돼요.
      </p>

      <Divider />

      <H2>고용24 온라인 취업신고 절차</H2>
      <p style={body}>
        <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 5분이면 신고가 끝나요.
        방문보다 온라인이 훨씬 빠르고 편해요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        신고 후에는 잔여 수급기간이 자동 종료돼요.
        소정급여일수의 절반 이상 남기고 취업했다면 조기재취업수당 안내가 고용24 알림으로 올 수 있어요.
        12개월 근무 후 별도 신청하면 남은 급여의 50%를 한꺼번에 받아요.
      </p>

      <Divider />

      <H2>신고 안 하면 어떻게 되나요?</H2>
      <p style={body}>
        취업 후 신고 없이 실업급여를 받으면 부정수급이에요.
        4대보험 취득 신고, 국세청 소득 자료 등으로 자동 적발돼요.
      </p>

      <BorderBox title="부정수급 처벌 수위">
        · 취업일 이후 받은 실업급여 <strong>전액 반환</strong><br />
        · 받은 금액의 최대 <strong>5배 추가 징수</strong><br />
        · 금액이 크거나 기간이 길면 <strong>1년 이하 징역 또는 300만원 이하 벌금</strong><br />
        · 자진신고하면 추가 징수 감면 가능
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 법률 자문이 아니며, 개별 상황에 따라 다를 수 있어요. 정확한 판단은 고용센터(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
