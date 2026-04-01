"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 대출받으려는데 DSR 때문에 한도가 안 나온다고 해서, DSR이 뭔지·내 한도가 얼마인지 궁금
// Q2. DSR 계산법을 이해하고 내 대출 가능 한도를 파악한다
// Q3. DSR 공식, 은행40%/비은행50% 한도, 스트레스DSR 3단계, 예외항목, 낮추는 방법
// Q4. GreenBox로 한도 요약 + BorderBox로 스트레스DSR + Checklist로 한도 늘리는 팁

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "기존 신용대출·마이너스통장 먼저 상환",
  "대출 기간 늘리기 (30년 → 40년이면 월 상환액 감소)",
  "맞벌이면 배우자 소득 합산으로 연소득 높이기",
  "프리랜서·사업자는 소득 증빙 철저히 (성실 세금 신고)",
  "고정금리 선택 → 스트레스 금리 가산 줄이기",
  "전세자금대출(무주택자)은 DSR 제외 → 전세 먼저 활용",
];

const FAQS = [
  { q: "연봉 5,000만원에 DSR 40%면 대출 한도가 얼마예요?", a: "연간 원리금 상환액이 2,000만원까지 가능해요. 30년 만기 고정금리 4% 기준이면 약 4억 2천만원 정도 나오는데, 스트레스DSR 적용하면 3억 5천만원 수준으로 줄어요." },
  { q: "신용대출 2,000만원 있으면 주담대 한도가 줄어드나요?", a: "네. 신용대출 원리금 상환액이 DSR에 포함돼요. 신용대출 먼저 갚으면 주담대 한도가 그만큼 늘어나요." },
  { q: "전세대출은 DSR에 안 들어간다면서요?", a: "무주택자의 전세자금대출만 빠져요. 1주택자가 추가로 받는 전세대출은 DSR에 포함돼요." },
  { q: "스트레스DSR이 뭔가요?", a: "실제 금리보다 높은 가상 금리로 원리금을 계산하는 거예요. 3단계는 스트레스 금리 3.0%를 100% 반영해서, 대출금리 4%면 7%로 계산하는 셈이에요." },
  { q: "지방 주택은 스트레스DSR이 덜 적용된다고요?", a: "네. 지방 주담대는 2026년 6월 30일까지 2단계(스트레스 금리 1.5%의 50%만 반영)가 유예 적용돼요. 수도권보다 한도가 더 나올 수 있어요." },
  { q: "카드론, 학자금대출도 DSR에 포함되나요?", a: "네. 카드론, 학자금대출, 자동차 할부 전부 포함돼요. 작은 대출들이 쌓이면 나중에 주담대 한도가 확 줄어들어요." },
];

const SOURCES = [
  { name: "금융위원회 DSR 규제 안내", href: "https://www.fsc.go.kr" },
  { name: "스트레스 DSR 3단계 시행방안", href: "https://www.fsc.go.kr/no010101/84617" },
  { name: "뱅크샐러드 DSR 안내", href: "https://www.banksalad.com/articles/스트레스-DSR-규제-전세대출-단계" },
];

const RELATED = [
  { slug: "주담대-금리-계산", title: "주택담보대출 금리 계산", description: "금리 유형별 이자 비교와 상환액 계산." },
  { slug: "신혼부부-전세대출-한도-금리", title: "신혼부부 전세대출 조건", description: "전세대출 자격 조건과 금리 혜택." },
  { slug: "대출상환-계산기", title: "대출상환 계산기", description: "월 상환액과 총 이자를 미리 계산해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · DSR · 대출 한도</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DSR 때문에 대출이 안 된다면?<br />
        계산법부터 한도 늘리는 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        은행에서 "DSR 초과"라며 대출을 거절당했다면, 먼저 내 DSR이 얼마인지 알아야 해요.
      </p>
      <p style={body}>
        DSR(총부채원리금상환비율)은 연소득 대비 모든 대출 원리금의 비율이에요.
        은행은 40%, 비은행은 50%가 한도고, 2026년에는 <a href="https://www.fsc.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>스트레스DSR 3단계</a>까지 시행되면서 실질 한도가 더 줄었어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>DSR은 이렇게 계산해요</H2>
      <p style={body}>
        공식은 단순해요. 모든 대출의 연간 원리금 상환액을 연소득으로 나누면 돼요.
      </p>

      <GreenBox>
        DSR = (모든 대출의 연간 원리금 상환액 / 연소득) x 100{"\n\n"}
        은행: DSR 40% 한도{"\n"}
        비은행(저축은행·캐피탈): DSR 50% 한도{"\n"}
        적용 기준: 총 대출액 1억원 초과 시
      </GreenBox>

      <p style={body}>
        여기서 '모든 대출'이 핵심이에요. <a href="/w/주담대-금리-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>주담대</a>뿐 아니라 신용대출, 카드론, 자동차 할부, 학자금대출까지 전부 합산돼요.
        마이너스통장도 한도 전액이 원리금으로 잡혀요.
      </p>

      <CategoryButton label="금융 정보" count={14} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>스트레스DSR 3단계, 한도가 얼마나 줄었나요?</H2>
      <p style={body}>
        2025년 7월부터 시행된 스트레스DSR 3단계는 금리 인상 리스크를 미리 반영하는 제도예요.
      </p>

      <BorderBox>
        <strong>스트레스DSR 단계별 적용</strong><br />
        1단계 (2024.2~): 스트레스 금리 0.38% 가산{"\n"}
        2단계 (2024.9~): 스트레스 금리 1.5% x 50% = 0.75% 가산{"\n"}
        3단계 (2025.7~): 스트레스 금리 3.0% x 100% = 3.0% 가산{"\n\n"}
        예: 실제 대출금리 4% → 3단계 적용 시 7%로 원리금 계산{"\n"}
        연소득 1억원 기준: 대출한도 6.58억 → 5.56억 (약 1.02억 감소)
      </BorderBox>

      <p style={body}>
        지방 주담대는 2026년 6월 30일까지 2단계를 유예 적용해요.
        고정금리를 선택하면 스트레스 금리 가산이 줄어들어서 한도가 더 나올 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>DSR에서 빠지는 항목이 있어요</H2>
      <p style={body}>
        모든 대출이 DSR에 포함되는 건 아니에요.
      </p>

      <GreenBox>
        DSR 제외: 무주택자 전세자금대출{"\n"}
        DSR 제외: 아파트 중도금 대출 (완공 후 주담대 전환 시 포함){"\n"}
        DSR 포함: 1주택자 추가 전세대출{"\n"}
        DSR 포함: 월세보증금 목적 대출
      </GreenBox>

      <Divider />

      <H2>DSR 한도를 늘리고 싶다면</H2>
      <p style={body}>
        한도를 높이는 현실적인 방법이에요.
      </p>

      <SectionBadge>한도 높이는 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>DSR 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>대출 전 꼭 알아둬야 할 것만 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 금융위원회 DSR 규제를 바탕으로 작성했어요. 스트레스DSR 가산율·유예 기간은 정책 변경에 따라 달라질 수 있으니 금융위원회 또는 거래 은행에서 확인하세요." />
    </ArticleLayout>
  );
}
