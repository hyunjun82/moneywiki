"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 장기전세임대 입주자선정에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 무주택 세대구성원이면서 소득과 자산 기준 충족해야 해요, 동일순위는 가점, 미성년자녀 수, 추첨 순으로 선정돼요
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "장기전세임대 소득 기준이 어떻게 되나요?", a: "일반 가구는 도시근로자 월평균 소득 100% 이하예요. 청년이나 신혼부부는 120% 이하로 조금 높아요." },
  { q: "입주 신청했는데 떨어졌어요. 다시 신청 가능한가요?", a: "네, 다음 모집 공고 때 다시 신청하실 수 있어요. 자격요건 충족하면 몇 번이든 신청 가능해요." },
  { q: "가점은 어떻게 계산하나요?", a: "무주택 기간, 부양가족 수, 청약통장 가입 기간 등으로 계산해요. 자세한 배점은 모집공고문 확인하세요." },
  { q: "장기전세임대주택 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "장기전세임대주택 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "LH청약플러스", href: "https://apply.lh.or.kr" },
  { name: "서울주거포털", href: "https://housing.seoul.go.kr/site/main/content/sh01_030600" },
];

const RELATED = [
  { slug: "공공임대주택-종류", title: "공공임대주택 종류", description: "관련 내용 정리." },
  { slug: "청년-주거지원", title: "청년 주거지원", description: "관련 내용 정리." },
  { slug: "소득-자산-조사", title: "소득 자산 조사", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        장기전세임대주택 입주자 선정 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        무주택 세대구성원이면서 소득과 자산 기준 충족해야 해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>장기전세임대주택 기본 자격요건</H2>
      <p style={body}>입주하려면 먼저 기본 자격을 충족해야 해요. 모집 공고일 기준으로 무주택 세대구성원이어야 하고, 소득과 자산 기준을 만족해야 해요.</p>
      <GreenBox>
        무주택 세대구성원이면서 소득과 자산 기준 충족해야 해요{"\n"}
        동일순위는 가점, 미성년자녀 수, 추첨 순으로 선정돼요{"\n"}
        자산 기준은 부동산 2억 1,550만 원, 자동차 4,563만 원 이하예요
      </GreenBox>
      <p style={body}>무주택 세대구성원은 본인뿐 아니라 배우자, 직계존비속, 배우자의 직계존속 모두 집이 없어야 한다는 거예요. 한 명이라도 집 있으면 탈락이에요. 별도 세대여도 배우자가 있으면 배우자 세대까지 다 봐요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>입주자 선정 순서, 어떻게 되나요</H2>
      <p style={body}>기본 자격 충족한 사람이 모집 호수보다 많으면 경쟁이 생겨요. 이때 순위를 정해서 선정해요.</p>
      <BorderBox>
        <strong>입주자 선정 순서, 어떻게 되나요</strong><br />
        기본 자격 충족한 사람이 모집 호수보다 많으면 경쟁이 생겨요. 이때 순위를 정해서 선정해요.<br />
        먼저 순위별로 구분해요. 1순위는 생계급여나 의료급여 수급자, 한부모가족, 북한이탈주민 같은 특별공급 대상이에요. 2순위는 일반 공급 대상이고요.
      </BorderBox>
      <p style={body}>먼저 순위별로 구분해요. 1순위는 생계급여나 의료급여 수급자, 한부모가족, 북한이탈주민 같은 특별공급 대상이에요. 2순위는 일반 공급 대상이고요.</p>

      <Divider />
      <H2>장기전세 소득 자산 기준, 어떻게 확인하나요</H2>
      <p style={body}>소득과 자산은 공고일 기준 직전 연도 것으로 봐요. 2026년 공고면 2025년 소득과 자산이에요. 국세청, 건강보험공단, 국토교통부 자료로 확인해요.</p>
      <p style={body}>소득은 근로소득, 사업소득, 재산소득, 기타소득 다 합쳐요. 비과세 소득은 빼고요. 맞벌이 부부면 둘 다 합산해요. 부모님이 세대원이면 부모님 소득도 포함이고요.</p>
      <p style={body}>자산은 부동산 공시가격 기준이에요. 아파트는 공동주택공시가격, 단독주택은 개별주택공시가격, 토지는 개별공시지가로 계산해요. 전세보증금 같은 건 자산에 안 들어가요.</p>

      <Divider />
      <H2>장기전세임대주택 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
