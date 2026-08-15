"use client";
// Q1. 일하다 본인 실수로 다쳤는데, 내 잘못이라 산재가 안 될까 걱정하는 상황
// Q2. 본인 과실 사고도 산재 인정되는지 확인하고, 산재 신청을 한다
// Q3. 근로자 과실과 산재 인정의 관계, 고의·범죄만 제외, 인과관계 기준, 신청 방법
// Q4. GreenBox(핵심 기준) + BorderBox(제외 사유) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DATA = [
  { title: "사고 사실 기록", desc: "사고 경위, 시간, 장소, 목격자를 기록해요. 사진이나 CCTV 영상이 있으면 확보해두세요." },
  { title: "사업주에게 알리기", desc: "사고 사실을 사업주에게 알려요. 사업주가 산재 신청에 협조하지 않아도 본인이 직접 신청할 수 있어요." },
  { title: "산재지정 병원 방문", desc: "근로복지공단 산재지정 의료기관에서 치료받으면 치료비를 공단이 직접 부담해요." },
  { title: "요양급여 신청", desc: "근로복지공단에 산재보험 요양급여 신청서, 의사 소견서, 사고경위서를 제출해요." },
  { title: "승인 후 보상 수령", desc: "산재로 승인되면 치료비(요양급여), 휴업급여(평균임금 70%), 장해급여 등을 받아요." },
];

const FAQS = [
  { q: "안전수칙 안 지켜서 다쳤는데 산재 되나요?", a: "네. 안전수칙 위반이 근로자 과실이긴 하지만, 업무 중 발생한 사고라면 산재로 인정돼요. 산업재해보상보험법은 과실 여부가 아니라 업무와의 인과관계를 봐요." },
  { q: "회사에서 '네 잘못'이라며 산재 안 해준다면요?", a: "사업주 동의 없이 본인이 직접 근로복지공단에 신청할 수 있어요. 회사가 거부하거나 방해하면 과태료 대상이에요." },
  { q: "어떤 경우에 산재가 안 되나요?", a: "고의로 자해한 경우, 범죄 행위 중 사고, 정당한 사유 없는 무단이탈 중 사고만 제외돼요. 일반적인 실수·부주의는 산재 대상이에요." },
  { q: "술 마시고 일하다 다치면요?", a: "음주 자체만으로 산재가 거부되진 않아요. 다만 만취 상태에서 정상적인 업무 수행이 불가능한 상태였다면 불승인될 수 있어요. 혈중알코올농도와 사고 경위를 종합 판단해요." },
  { q: "산재 인정되면 치료비 전액 나오나요?", a: "네. 산재로 승인되면 치료비(요양급여)는 전액 공단 부담이에요. 건강보험이 아닌 산재보험으로 처리돼요." },
  { q: "산재 신청하면 불이익이 있나요?", a: "산재 신청을 이유로 불이익을 주면 근로기준법 위반이에요. 해고·전보·감봉 등 불이익을 당하면 고용노동부에 신고할 수 있어요." },
];

const SOURCES = [
  { name: "산업재해보상보험법 제37조", href: "https://www.law.go.kr/법령/산업재해보상보험법" },
  { name: "근로복지공단 산재보험 안내", href: "https://www.comwel.or.kr" },
];

const RELATED = [
  { slug: "산재보험-편의점-아르바이트-적용", title: "편의점 알바 산재보험", description: "아르바이트도 산재보험 적용돼요." },
  { slug: "산재보상-회사-주최-야유회-사고", title: "회사 야유회 사고 산재", description: "회사 행사 중 사고의 산재 인정." },
  { slug: "고객-폭언-우울증-산재인정", title: "고객 폭언 우울증 산재", description: "정신질환의 산재 인정 기준." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 산재보험 · 보상</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        내 실수로 다쳤는데 산재 되나?<br />
        근로자 과실 사고의 산재 인정 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>일하다가 내 실수로 다쳤는데, 산재가 안 될까 봐 걱정되죠.</p>
      <p style={body}>결론부터 말하면, 본인 과실이어도 산재가 돼요. <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법 제37조</a>는 업무와 재해 사이에 인과관계가 있으면 근로자 과실 여부와 관계없이 산재로 인정하고 있어요.</p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>본인 과실이어도 산재가 되는 이유</H2>
      <p style={body}>산재보험은 과실 책임이 아니라 무과실 책임 원칙이에요.</p>
      <GreenBox title="산재 인정 핵심 기준">
        핵심: 업무와 재해 사이의 인과관계{"\n"}
        근로자 과실(실수·부주의·안전수칙 위반) → 산재 인정{"\n"}
        사업주 과실 여부도 무관 → 산재 인정{"\n"}
        제외: 고의 자해, 범죄 행위, 정당 사유 없는 무단이탈만 제외
      </GreenBox>

      <CategoryButton label="고용 정보" count={10} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>산재가 안 되는 경우는 이것뿐이에요</H2>
      <p style={body}>산재 불승인 사유는 매우 제한적이에요.</p>
      <BorderBox>
        <strong>산재 제외 사유 (3가지만)</strong><br />
        1. 고의로 자해한 경우{"\n"}<br />
        2. 범죄 행위 중 발생한 사고{"\n"}<br />
        3. 정당한 사유 없이 업무를 이탈한 중 발생한 사고{"\n"}<br />
        일반적인 실수·부주의·안전수칙 위반은 여기에 해당하지 않아요
      </BorderBox>
      <Divider />

      <H2>산재 신청 절차</H2>
      <p style={body}>다치면 바로 아래 순서대로 진행하세요.</p>
      <SectionBadge>산재 신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <p style={body}>신청은 <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>(1588-0075)에서 할 수 있어요.</p>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>근로자 과실 산재에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 산업재해보상보험법을 바탕으로 작성했어요. 개별 사고의 산재 인정 여부는 사안에 따라 다르니, 근로복지공단(1588-0075)에서 상담받으세요." />
    </ArticleLayout>
  );
}
