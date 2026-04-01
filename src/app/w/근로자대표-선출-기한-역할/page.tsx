"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 근로자대표에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 근로자대표는 근로자 과반수를 대표해서 회사와 협의·합의하는 사람이에요, 임기는 3년이고, 선출 방식은 투표나 합의로 정할 수 있어요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "근로자대표는 꼭 필요한가요?", a: "네, 필요해요. 회사가 경영상 이유로 해고하거나 중대한 변화가 있을 때 반드시 근로자대표와 협의해야 해요. 없으면 회사가 일방적으로 진행할 수 없어요." },
  { q: "근로자대표가 되면 회사에서 피해를 줄까봐 걱정돼요.", a: "그럴 걱정 마세요. 법으로 근로자대표에 대한 불이익 취급이 명시적으로 금지돼 있어요. 만약 해고나 감봉 같은 피해를 입으면 즉시 고용노동부에 진정하세요." },
  { q: "노조가 있으면 근로자대표가 필요 없나요?", a: "아니에요. 노조와 근로자대표는 다른 거예요. 근로자대표는 무조건 있어야 하고, 노조는 선택이에요. 노조가 있으면 노조가 근로자대표 역할을 할 수도 있고 별개로 선출할 수도 있어요." },
  { q: "근로자대표 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "근로자대표 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "근로기준법 제24조", href: "https://www.law.go.kr/lsLinkProc.do?lsNm=%EA%B7%BC%EB%A1%9C%EA%B8%B0%EC%A4%80%EB%B2%95" },
  { name: "노동부 행정해석", href: "https://labor.moel.go.kr/minwonApply/minwonFormat.do?searchVal=AG050" },
];

const RELATED = [
  { slug: "경영상-해고-기준-보험금-신청", title: "경영상 해고 기준 및 보험금 신청", description: "관련 내용 정리." },
  { slug: "노동조합-설립-운영-절차", title: "노동조합 설립·운영 절차", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로자대표 선출·기한·역할 완벽 가이드
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        근로자대표는 근로자 과반수를 대표해서 회사와 협의·합의하는 사람이에요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>근로자대표가 뭐 하는 사람인가요?</H2>
      <p style={body}>근로자대표는 근로기준법 제24조에서 정의하는 "근로자 과반수를 대표하는 자"를 말해요.</p>
      <GreenBox>
        근로자대표는 근로자 과반수를 대표해서 회사와 협의·합의하는 사람이에요{"\n"}
        임기는 3년이고, 선출 방식은 투표나 합의로 정할 수 있어요{"\n"}
        경영상 해고·휴가 대체·퇴직금 제도 변경 등에서 반드시 협의해야 해요
      </GreenBox>
      <p style={body}>쉽게 말하면, 직장 근로자들을 대신해서 회사와 협의·합의하는 사람이라고 보면 돼요. 개별 근로자들이 회사에 물어볼 수 없는 걸 대신 물어봐 주고, 합의해 주는 거죠.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>근로자대표는 누구인가요?</H2>
      <p style={body}>사실 많은 직장인이 "우리 회사의 근로자대표가 누구예요?"라고 물어봐도 모르는 경우가 많아요. 특별한 표시가 없기 때문이에요.</p>
      <BorderBox>
        <strong>근로자대표는 누구인가요?</strong><br />
        사실 많은 직장인이 "우리 회사의 근로자대표가 누구예요?"라고 물어봐도 모르는 경우가 많아요. 특별한 표시가 없기 때문이에요.<br />
        근로자대표는 누구나 될 수 있는 게 아니에요. 조건이 있어요:
      </BorderBox>
      <p style={body}>근로자대표는 누구나 될 수 있는 게 아니에요. 조건이 있어요:</p>

      <Divider />
      <H2>근로자대표 임기는 몇 년인가요?</H2>
      <p style={body}>근로자대표의 임기는 3년이에요. 정해진 법칙이에요.</p>
      <p style={body}>다만 예외가 있어요. 노사가 합의하면 3년 범위 내에서 1년, 2년 등으로 줄일 수 있어요. "우리 회사는 매년 선출하기로 합의했어요"라면 1년이 되는 거죠.</p>
      <p style={body}>만약 근로자대표가 퇴직하거나 이직하면? 그럼 새로운 근로자대표를 선출해야 해요. 회사가 마음대로 임명할 수 없어요.</p>

      <Divider />
      <H2>근로자대표 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
