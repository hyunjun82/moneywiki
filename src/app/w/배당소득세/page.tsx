"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 주식 배당금에 세금이 얼마나 붙는지, 2026년 분리과세가 뭔지 궁금한 상황
// Q2. 배당소득세 구조를 이해하고 분리과세 vs 종합과세 중 유리한 쪽을 선택한다
// Q3. 15.4% 원천징수, 2천만원 기준, 2026 분리과세 세율(14/20/25/30%), 대상 기업 조건, 절세법
// Q4. GreenBox로 세율 구간 + BorderBox로 분리과세 조건 + Checklist로 절세 방법

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_SAVE = [
  "ISA 계좌 활용 → 200만원(서민형 400만원) 비과세, 초과분 9.9%",
  "금융소득 2천만원 이하로 관리 → 15.4%로 끝",
  "부부 명의 분산 → 각각 2천만원 기준 적용 (합산 4천만원까지)",
  "2026 분리과세 선택 → 종합과세(최대 49.5%)보다 유리할 수 있음",
  "배당 수령 시기 분산 → 한 해에 몰리지 않게 조절",
  "연금저축·IRP 내 배당 ETF → 과세 이연 효과",
];

const FAQS = [
  { q: "배당금 100만원 받으면 실수령은 얼마예요?", a: "15.4% 원천징수돼서 84만 6천원이 입금돼요. 금융소득 합계가 2천만원 이하면 추가 세금 없이 끝이에요." },
  { q: "2026년 분리과세가 뭔가요?", a: "국내 상장사 배당을 종합과세 대신 분리과세로 낼 수 있는 제도예요. 2026~2028년 3년 한시 시행이고, 배당성향 40% 이상 등 조건을 충족한 상장사 배당만 해당돼요." },
  { q: "ETF 분배금도 분리과세 대상인가요?", a: "아니요. 상장지수펀드(ETF)와 리츠(REITs) 분배금은 2026년 분리과세 대상에서 제외돼요." },
  { q: "미국주식 배당도 분리과세 되나요?", a: "안 돼요. 국내 상장사 배당만 대상이에요. 미국주식 배당은 미국 15% 원천징수 후 한국에서 종합과세 대상이에요." },
  { q: "금융소득종합과세 되면 건강보험료도 오르나요?", a: "네. 금융소득 2천만원 초과하면 건강보험 피부양자 탈락 가능성이 있고, 지역가입자는 보험료가 올라요." },
  { q: "분리과세와 종합과세 중 어떤 게 유리한지 어떻게 알아요?", a: "종합과세 세율이 분리과세 세율보다 높으면 분리과세가 유리해요. 근로소득이 높아서 세율이 35% 이상이면 분리과세(20~30%)가 절세돼요. 홈택스에서 비교 계산 가능하고요." },
];

const SOURCES = [
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "조세특례제한법 개정안", href: "https://www.law.go.kr/법령/조세특례제한법" },
  { name: "국세청", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "종합소득세", title: "종합소득세", description: "금융소득 합산 시 종합과세 구조." },
  { slug: "ISA계좌", title: "ISA 계좌", description: "비과세·분리과세 혜택 받는 방법." },
  { slug: "금융소득-원천징수-이자-배당", title: "금융소득 원천징수", description: "이자·배당 원천징수 구조 안내." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 배당소득 · 분리과세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        배당금에 세금이 얼마나 붙을까?<br />
        2026 분리과세 세율과 절세 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주식 배당금 받으면 자동으로 15.4%가 빠져요. 많이 받으면 더 내야 하고요.
      </p>
      <p style={body}>
        2026년부터 <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법 개정</a>으로 국내 상장사 배당에 분리과세가 신설됐어요.
        종합과세 최고세율 49.5% 대신 20~30%로 낼 수 있는 기회예요.
        다만 모든 상장사가 해당되는 건 아니고, 배당성향 조건을 충족해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>배당소득세 구조, 기본부터 봐요</H2>
      <p style={body}>
        배당금을 받으면 증권사가 알아서 15.4%를 떼고 입금해요.
      </p>

      <GreenBox>
        배당소득세 14% + 지방소득세 1.4% = 15.4% 원천징수{"\n"}
        금융소득(이자+배당) 연 2천만원 이하 → 15.4%로 종결{"\n"}
        금융소득 2천만원 초과 → 종합과세 (6.6~49.5%){"\n"}
        종합과세 시 건강보험료 인상 가능성
      </GreenBox>

      <p style={body}>
        금융소득이 2천만원 이하면 원천징수된 15.4%가 최종 세금이에요.
        5월 종합소득세 신고도 필요 없고요.
      </p>

      <CategoryButton label="세금 정보" count={15} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>2026 분리과세 세율, 어떻게 적용되나요?</H2>
      <p style={body}>
        2026년 1월 1일 이후 지급되는 상장사 배당부터 분리과세를 선택할 수 있어요.
      </p>

      <GreenBox>
        2천만원 이하: 14% (지방소득세 포함 15.4%){"\n"}
        2천만원~3억원: 20% (지방소득세 포함 22%){"\n"}
        3억원~50억원: 25% (지방소득세 포함 27.5%){"\n"}
        50억원 초과: 30% (지방소득세 포함 33%){"\n\n"}
        적용 기간: 2026~2028년 (3년 한시)
      </GreenBox>

      <p style={body}>
        종합과세(최대 49.5%)로 내던 사람이 분리과세(22~33%)로 전환하면 상당한 절세가 돼요.
        예를 들어 배당 5억원이면 종합과세 약 2.5억 vs 분리과세 약 1.2억으로, 1.3억원 차이가 나요.
      </p>

      <Divider />

      <H2>분리과세 대상 기업 조건</H2>
      <p style={body}>
        모든 상장사 배당이 해당되는 건 아니에요.
      </p>

      <BorderBox>
        <strong>분리과세 대상 기업 조건 (둘 중 하나)</strong><br />
        배당성향 40% 이상인 상장법인{"\n"}
        배당성향 25% 이상이면서 전년 대비 배당 10% 이상 증가{"\n\n"}
        <strong>제외 대상</strong><br />
        비상장 법인 배당: 종합과세만 가능{"\n"}
        ETF·리츠 분배금: 분리과세 제외{"\n"}
        해외주식 배당: 분리과세 제외 (미국주식 등){"\n\n"}
        해당 상장사 비율: 전체의 약 12%로 추정
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>배당소득세 줄이는 방법</H2>
      <p style={body}>
        합법적으로 세금을 줄이는 방법이에요.
      </p>

      <SectionBadge>절세 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_SAVE} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>배당소득세에 대해 많이 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법·조세특례제한법을 바탕으로 작성했어요. 분리과세 세율·대상 기업 조건은 법 개정에 따라 변경될 수 있으니 국세청(126)이나 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
