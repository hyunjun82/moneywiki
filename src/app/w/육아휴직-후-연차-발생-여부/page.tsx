// Q1. 육아휴직 1년 쓰고 복직했는데 올해 연차가 있는지 없는지 불안한 상황
// Q2. 육아휴직 기간이 출근으로 인정돼서 연차가 정상 발생한다는 걸 확인하고 안심
// Q3. 근로기준법 제60조 6항, 출근율 80% 간주, 복직 즉시 사용 가능, 1년 이내 소멸
// Q4. GreenBox(결론) + BorderBox(구체 예시) + Steps(회사가 거부할 때 대응) + FAQ

"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const STEPS_DATA = [
  {
    title: "근로기준법 제60조 제6항 안내",
    desc: "회사 담당자에게 '육아휴직 기간은 출근으로 간주되어 연차가 발생한다'는 점을 근로기준법 조문을 근거로 알려주세요.",
  },
  {
    title: "서면으로 연차 사용 신청",
    desc: "구두 요청만으로는 증거가 안 남아요. 이메일이나 사내 시스템으로 연차 사용을 신청하고 기록을 남기세요.",
  },
  {
    title: "고용노동부에 진정 제기",
    desc: "회사가 계속 거부하면 관할 고용노동부 지방관서에 진정을 넣을 수 있어요. 온라인(고용노동부 민원마당)으로도 가능해요.",
    link: { label: "고용노동부 민원마당", href: "https://minwon.moel.go.kr" },
  },
];

const FAQS = [
  { q: "육아휴직 1년 했으면 연차가 15개 생기나요?", a: "네, 맞아요. 1년간 출근한 것으로 간주되기 때문에 80% 출근율을 충족하고, 다음 해에 15개 연차가 정상 발생해요." },
  { q: "복직하자마자 연차를 쓸 수 있나요?", a: "네, 바로 쓸 수 있어요. 육아휴직 기간에 발생한 연차는 복직 즉시 사용 가능해요." },
  { q: "회사에서 '육아휴직 쓴 해는 연차 없다'고 하면?", a: "명백한 근로기준법 위반이에요. 근로기준법 제60조 제6항에 육아휴직 기간을 출근으로 본다고 명시돼 있어요. 고용노동부에 신고할 수 있어요." },
  { q: "육아휴직 중 발생한 연차는 언제까지 써야 하나요?", a: "발생한 해로부터 1년 이내에 써야 해요. 예를 들어 2025년에 발생한 연차는 2026년 말까지 사용해야 하고, 못 쓰면 소멸하거나 연차수당으로 지급돼요." },
  { q: "육아휴직 기간 중에도 연차가 쌓이나요?", a: "네, 쌓여요. 육아휴직 기간 전체가 출근으로 인정되기 때문에 다음 해 연차 산정에 그대로 반영돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로기준법 제60조 (연차유급휴가)", url: "https://www.law.go.kr/법령/근로기준법/제60조" },
      { label: "남녀고용평등법 (육아휴직)", url: "https://www.law.go.kr/법령/남녀고용평등과일ㆍ가정양립지원에관한법률" },
      { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "육아휴직급여", title: "육아휴직급여 금액과 조건", description: "육아휴직 시 받을 수 있는 급여를 정리했어요." },
  { slug: "육아기-근로시간-단축-연차-사용", title: "육아기 단축근무와 연차", description: "단축근무 시 연차 변동 여부를 확인하세요." },
  { slug: "연차유급휴가", title: "연차유급휴가 계산법", description: "연차 발생 기준과 계산 방법을 안내해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 육아 · 연차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        육아휴직 후 연차, 정말 생기나요?<br />
        복직 후 연차 발생 기준과 사용법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        1년간 육아휴직을 쓰고 복귀했는데 "쉬었으니까 연차 없지 않아?"라고 하는 동료가 있죠. 틀린 말이에요.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법/제60조" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제60조 제6항</a>에서{" "}
        육아휴직 기간을 <strong>출근한 것으로 간주</strong>하기 때문에, 복직 후 연차는 정상적으로 발생해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>육아휴직 기간도 출근으로 인정돼요</H2>
      <p style={body}>
        연차유급휴가는 1년간 80% 이상 출근한 근로자에게 주어지는 휴가예요. 육아휴직 기간은 출근율 계산 시 출근한 것으로 봐요.
        1년 내내 육아휴직을 했어도 출근율 100%로 계산되는 거예요.
      </p>

      <GreenBox title="결론">
        육아휴직 1년 → 출근율 100% 인정 → 다음 해 연차 15개 정상 발생<br />
        복직 즉시 사용 가능, 회사가 거부하면 근로기준법 위반
      </GreenBox>

      <Divider />

      <H2>구체적으로 어떻게 적용되나요?</H2>
      <p style={body}>
        2025년 1월~12월 육아휴직을 사용하고 2026년 1월에 복직한 경우를 예로 들어볼게요.
      </p>

      <BorderBox>
        2025년 근무: 육아휴직 12개월 → 출근율 100% 인정<br />
        2026년 사용 가능 연차: 15개 (정상 발생)<br />
        2026년 80% 이상 출근 → 2027년 연차도 새로 발생<br />
        <strong>연차 소멸 기한: 발생 연도로부터 1년 이내</strong>
      </BorderBox>

      <p style={body}>
        육아휴직 중에 발생한 연차는 복직 후 바로 쓸 수 있어요. 2025년 발생 연차는 2026년 말까지 써야 하니, 복직 후 일정 계획을 미리 세워두면 좋아요.
        못 쓴 연차에 대해서는 회사에 따라 <a href="/w/연차수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>연차수당</a>을 지급하기도 해요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>회사가 연차를 안 준다면 이렇게 하세요</H2>
      <p style={body}>
        간혹 회사에서 "육아휴직 쓴 해는 연차 없어"라고 하는 경우가 있어요. 명백한 법 위반이에요. 아래 순서로 대응하세요.
      </p>

      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 육아휴직 후 연차 발생 관련 안내예요. 법령 개정에 따라 기준이 변경될 수 있으니 고용노동부에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
