"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     올해 연차를 다 못 썼는데 내년으로 넘길 수 있는지 급하게 확인하려는 직장인
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     회사 취업규칙에서 이월 규정을 확인하고, 없으면 연차수당 청구 준비를 한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     법적으로 이월 의무 없음, 회사 규정으로만 가능, 미사용시 수당 정산, 사용촉진 시 수당 없음
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     GreenBox(결론 요약) + Steps(확인 절차) + Checklist(점검) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "취업규칙 또는 단체협약 확인",
    desc: "회사 인사팀에 이월 규정이 있는지 물어보세요. '미사용 연차는 다음 연도로 이월한다'는 조항이 있으면 이월 가능해요. 규정이 없으면 이월은 안 돼요.",
  },
  {
    title: "이월 한도와 사용 기한 체크",
    desc: "이월 규정이 있더라도 보통 한도가 정해져 있어요. '최대 5일' 또는 '전년도 연차의 50%'처럼요. 이월된 연차의 사용 기한도 따로 정해놓는 경우가 많아요.",
  },
  {
    title: "이월 안 되면 연차수당 정산 여부 확인",
    desc: "이월이 안 되는 회사라면 미사용 연차를 수당으로 받을 수 있어요. 단, 회사가 사용촉진 절차를 밟았다면 수당 지급 의무가 없으니 촉진 여부를 꼭 확인하세요.",
  },
];

const CHECKLIST = [
  "취업규칙에 연차 이월 조항이 있는지 확인",
  "이월 한도(일수 또는 비율) 파악",
  "이월된 연차의 사용 기한 확인",
  "사용촉진 통보를 받았는지 여부 확인",
  "미사용분 연차수당 청구 가능 여부 확인",
];

const FAQS = [
  {
    q: "법적으로 연차 이월이 의무인가요?",
    a: "아니에요. 근로기준법 제60조 제7항에 따르면 연차유급휴가는 1년간 행사하지 않으면 소멸돼요. 이월 의무는 법에 없고, 회사가 자율적으로 허용하는 거예요.",
  },
  {
    q: "이월 안 되면 남은 연차는 그냥 없어지나요?",
    a: "소멸은 되지만 연차수당으로 보상받을 수 있어요. 다만 회사가 사용촉진 절차(6개월 전, 2개월 전 서면 통보)를 적법하게 밟았다면 수당 지급 의무가 사라져요.",
  },
  {
    q: "연차 적립제(연차 저축)는 뭔가요?",
    a: "일부 회사에서 운영하는 제도예요. 매년 남은 연차를 적립해뒀다가 안식휴가나 장기여행에 한꺼번에 쓸 수 있게 해주는 건데, 법정 제도는 아니에요.",
  },
  {
    q: "이월된 연차와 올해 연차 중 어느 걸 먼저 써야 하나요?",
    a: "보통 선발생 연차(이월된 연차)부터 사용해요. 이월된 연차가 먼저 소멸되니까 그걸 먼저 쓰는 게 유리하죠. 회사 규정에서 순서를 따로 정한 경우도 있어요.",
  },
  {
    q: "이월 규정이 있는데 회사가 안 해주면 어떻게 하나요?",
    a: "취업규칙이나 단체협약에 이월 조항이 있으면 회사는 지켜야 해요. 안 지키면 고용노동부(1350)에 진정할 수 있어요.",
  },
];

const SOURCES = [
  { name: "근로기준법 제60조", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부 연차휴가 안내", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "연차휴가-사용촉진제도", title: "연차휴가 사용촉진제도", description: "촉진 절차를 밟으면 수당 지급 의무가 없어져요." },
  { slug: "연차수당-계산", title: "연차수당 계산법", description: "1일 통상임금 기준 연차수당 산정 방법." },
  { slug: "연차휴가-소멸시효", title: "연차휴가 소멸시효", description: "연차 청구권은 3년 이내에 행사해야 해요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 연차휴가</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연차휴가 이월, 다음 해로 넘길 수 있을까?<br />
        회사 규정 확인부터 수당 청구까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        올해 연차를 다 못 썼는데, 내년으로 넘길 수 있는지 궁금하시죠?
      </p>
      <p style={body}>
        결론부터 말하면, <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>에는 연차 이월 의무가 없어요. 연차유급휴가는 발생 후 1년 내 사용이 원칙이고, 1년이 지나면 소멸돼요. 다만 회사 취업규칙이나 단체협약으로 이월을 허용하는 경우가 있고, 이월이 안 되면 연차수당으로 정산받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연차 이월이 되는지, 이렇게 확인해요</H2>
      <p style={body}>
        이월 가능 여부는 전적으로 회사 규정에 달려 있어요. 법에서 이월을 보장하지 않기 때문에, 먼저 내 회사 규정부터 봐야 해요.
      </p>

      <GreenBox>
        법적 의무: 연차 이월 의무 없음 (근로기준법 제60조 제7항){"\n"}
        이월 가능: 취업규칙·단체협약에 이월 조항이 있는 경우만{"\n"}
        이월 한도: 회사마다 다름 (5일, 10일, 50% 등){"\n"}
        이월 불가 시: 미사용 연차 → 연차수당으로 정산
      </GreenBox>

      <p style={body}>
        근로자에게 유리한 조건이라서 법적으로 문제가 없어요. 회사가 규정을 만들어 이월을 허용하면 그대로 적용돼요.
      </p>

      <CategoryButton label="연차휴가 정보" count={8} href="/category/연차휴가" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>이월 규정 확인하는 절차</H2>
      <p style={body}>
        인사팀에 전화 한 통이면 바로 알 수 있어요. 확인해야 할 포인트를 순서대로 정리했어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>이월 안 될 때, 연차수당은 받을 수 있을까?</H2>
      <p style={body}>
        이월이 안 되면 남은 연차는 소멸돼요. 하지만 그냥 사라지는 건 아니에요.
      </p>

      <BorderBox>
        <strong>사용촉진을 안 했으면</strong> → 미사용 연차수당 지급 의무가 있어요<br />
        <strong>사용촉진을 했으면</strong> → 근로자가 안 쓴 책임이라 수당 의무 없어요<br /><br />
        사용촉진이란? 회사가 연차 만료 6개월 전·2개월 전에 서면으로 &quot;연차 쓰세요&quot;라고 통보하는 절차예요.
      </BorderBox>

      <p style={body}>
        촉진 통보를 받지 않았는데 연차가 소멸됐다면, 1일 통상임금 기준으로 수당을 청구할 수 있어요. <a href="/w/연차수당-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>연차수당 계산법</a>에서 구체적인 금액을 확인해보세요.
      </p>

      <Divider />

      <H2>놓치면 손해 보는 체크리스트</H2>
      <p style={body}>
        연말이 다가오면 꼭 점검해보세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>연차 이월, 이런 점이 헷갈리죠</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실무에서 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법 제60조를 바탕으로 작성했어요. 회사별 취업규칙에 따라 이월 기준이 다를 수 있으니 인사팀에 직접 확인하세요." />
    </ArticleLayout>
  );
}
