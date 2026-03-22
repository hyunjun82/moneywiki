"use client";

// Q1. 이혼하면 친권자·양육자가 자동으로 정해지는지 궁금한 상황이에요.
// Q2. 친권과 양육권 차이를 이해하고, 협의 또는 법원 결정으로 지정하는 행동.
// Q3. 자동 지정 없음, 친권 vs 양육권 차이, 협의이혼 vs 재판이혼 절차, 변경 가능 여부.
// Q4. GreenBox(핵심 결론) + BorderBox(친권 vs 양육권) + Steps(결정 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const DECISION_STEPS = [
  { title: "부부 간 협의", desc: "친권자와 양육자를 누구로 할지 합의해요.", tip: "합의가 안 되면 가정법원에 청구" },
  { title: "협의서 작성", desc: "친권자·양육자 지정, 양육비, 면접교섭권을 서면으로 작성해요." },
  { title: "법원 확인 또는 판결", desc: "협의이혼은 법원 확인, 재판이혼은 판결로 확정돼요." },
  { title: "가족관계등록부 반영", desc: "확정되면 가족관계등록부에 친권자·양육자가 기재돼요." },
];

const FAQS = [
  { q: "친권자와 양육자를 다른 사람으로 지정할 수 있나요?", a: "가능해요. 친권은 아버지, 양육권은 어머니처럼 분리할 수 있어요. 다만 실무적으로는 같은 사람에게 주는 경우가 많아요." },
  { q: "이혼 후에 친권자를 바꿀 수 있나요?", a: "가능해요. 자녀의 복리를 위해 필요하면 가정법원에 친권자 변경을 청구할 수 있어요. 양육 환경 변화가 입증돼야 해요." },
  { q: "합의가 안 되면 법원은 어떤 기준으로 정하나요?", a: "자녀의 나이, 의사, 부모의 양육 능력, 경제력, 양육 환경 등을 종합적으로 판단해요. 자녀의 복리가 최우선이에요." },
  { q: "미성년 자녀가 여러 명이면 다 같은 부모에게 가나요?", a: "반드시 그런 건 아니에요. 형제자매를 분리하지 않는 게 원칙이지만, 자녀의 나이·의사에 따라 나눌 수도 있어요." },
  { q: "친권 포기가 가능한가요?", a: "친권은 의무이기도 해서 일방적 포기는 안 돼요. 상대방에게 친권을 넘기는 형태로 변경이 가능하고, 법원 허가가 필요해요." },
  { q: "양육권 없는 부모의 면접교섭권은 어떻게 되나요?", a: "양육권이 없어도 면접교섭권(만남 권리)은 보장돼요. 상대방이 방해하면 법원에 이행명령을 신청할 수 있어요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민법 제909조(법제처)", url: "https://www.law.go.kr/법령/민법" },
    { label: "대한법률구조공단", url: "https://www.klac.or.kr" },
  ]},
];

const RELATED = [
  { slug: "이혼소송-중-면접교섭권-방해-대응", title: "면접교섭권 방해 시 대응 방법", description: "상대방이 아이를 안 만나게 할 때 법적 대응을 정리했어요." },
  { slug: "이혼-재산명의-일방-분할청구", title: "이혼 재산분할 청구", description: "재산 명의가 한쪽에 있어도 분할청구가 가능해요." },
  { slug: "이혼-청구-배우자-동의-불필요", title: "이혼 청구 시 배우자 동의 필요 여부", description: "재판이혼은 상대방 동의 없이도 가능해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 이혼</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이혼하면 친권자·양육자가 자동으로 정해지나요?<br />
        결정 방법과 변경 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이혼하면 아이 친권이 자동으로 엄마에게 가는 걸로 아는 분이 많아요. 아니에요. 자동 지정은 없어요.
        부부가 합의하거나, 합의가 안 되면 가정법원이 결정해요. 민법 제909조에서 이 절차를 정하고 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>자동 지정은 없어요, 반드시 정해야 해요</H2>
      <p style={body}>
        협의이혼이든 재판이혼이든, 미성년 자녀가 있으면 친권자와 양육자를 반드시 지정해야 해요. 지정 없이는 이혼 자체가 성립하지 않아요.
      </p>

      <GreenBox title="핵심 결론">
        · 이혼 시 친권자·양육자 자동 지정 없음<br />
        · 부부 합의 또는 법원 결정으로 지정<br />
        · 미성년 자녀가 있으면 지정 없이 이혼 불가
      </GreenBox>

      <Divider />

      <H2>친권과 양육권, 뭐가 다른가요?</H2>
      <p style={body}>
        헷갈리기 쉬운데, 이 둘은 다른 개념이에요. 분리해서 지정할 수도 있어요.
      </p>

      <BorderBox>
        <strong>친권</strong>: 자녀의 법률 행위를 대리하는 권리 (재산 관리, 동의권 등)<br /><br />
        <strong>양육권</strong>: 자녀와 함께 살면서 실제로 키우는 권리<br /><br />
        예시: 아빠가 친권자, 엄마가 양육자 → 아이는 엄마와 살지만, 법적 결정은 아빠가 해요
      </BorderBox>

      <Divider />

      <H2>어떤 절차로 결정되나요?</H2>
      <p style={body}>
        협의이혼은 부부가 합의해서 정하고, 합의가 안 되면 가정법원에 청구해요.
      </p>

      <Steps steps={DECISION_STEPS} />

      <p style={body}>
        이혼 후에도 사정이 바뀌면 변경 청구가 가능해요. 자녀의 복리를 위해 필요하다는 걸 입증하면 돼요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 민법을 기준으로 작성됐어요. 구체적 사건은 변호사 상담을 받으세요. 법률구조공단(132)에서 무료 상담이 가능해요." />
    </ArticleLayout>
  );
}
