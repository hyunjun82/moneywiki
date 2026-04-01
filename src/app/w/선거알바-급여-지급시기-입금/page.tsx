"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 선거 알바를 했는데 급여가 언제 들어오는지, 안 들어오면 어떻게 해야 하는지 궁금한 상황
// Q2. 급여 지급 시기를 파악하고, 미지급 시 대처 방법을 알고 행동한다
// Q3. (1) 선거 후 1~2주 내 입금 (2) 계좌 등록 방법 (3) 미지급 시 문의처 (4) 지급 확인 방법
// Q4. GreenBox(핵심 요약) + Steps(급여 수령 절차) + BorderBox(미지급 대처) + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const SIDEBAR_ITEMS = [
  { slug: "지방선거-알바-2026-직종별-급여-신청방법", title: "지방선거 알바 허브" },
  { slug: "투표사무원-급여-업무-신청자격", title: "투표사무원 급여/업무" },
  { slug: "개표사무원-급여-근무시간-야간수당", title: "개표사무원 급여/시간" },
  { slug: "선거사무보조원-급여-업무-모집시기", title: "선거사무보조원" },
  { slug: "공정선거지원단-신청조건-활동내용", title: "공정선거지원단" },
  { slug: "선거알바-신청자격-나이-결격사유", title: "신청 자격/결격사유" },
  { slug: "선거알바-신청방법-선관위-공고찾기", title: "신청 방법/공고 찾기" },
  { slug: "선거알바-4대보험-세금-원천징수", title: "4대보험/세금 처리" },
  { slug: "투표사무원-개표사무원-급여-비교", title: "투표 vs 개표 비교" },
  { slug: "선거알바-급여-지급시기-입금", title: "급여 지급 시기" },
  { slug: "선거알바-일정-공고-마감-타임라인", title: "알바 일정 타임라인" },
];

const FAQS = [
  {
    q: "급여는 일하고 바로 당일에 받을 수 있나요?",
    a: "아니에요, 당일 지급은 안 돼요. 선관위에서 전체 근무 확인과 행정 처리를 거친 뒤 일괄 지급하기 때문에 선거 후 1~2주 정도 걸리죠.",
  },
  {
    q: "계좌를 잘못 기재했으면 어떻게 하나요?",
    a: "입금이 안 되면 관할 선관위에 연락해서 계좌 정보를 수정하면 돼요. 빨리 연락할수록 재입금도 빨리 처리되죠.",
  },
  {
    q: "타인 명의 계좌로 받을 수 있나요?",
    a: "원칙적으로 본인 명의 계좌만 가능해요. 가족 계좌를 기재하면 입금이 거부될 수 있으니, 반드시 본인 이름으로 된 계좌를 등록하세요.",
  },
  {
    q: "투표사무원과 개표사무원 겸직 시 따로 입금되나요?",
    a: "선관위마다 다르지만, 보통 합산해서 한 번에 입금하는 경우가 많아요. 원천징수도 각각 적용된 뒤 합산 금액이 들어오죠.",
  },
  {
    q: "2주가 지났는데 아직 입금이 안 됐어요",
    a: "관할 선관위(1390 또는 해당 구/시 선관위 전화번호)에 바로 문의하세요. 행정 처리가 지연되는 경우도 있지만, 미지급 사례는 거의 없어요.",
  },
];

const RELATED = [
  { slug: "선거알바-4대보험-세금-원천징수", title: "세금과 원천징수", description: "실수령액 계산과 세금 체계." },
  { slug: "투표사무원-개표사무원-급여-비교", title: "투표 vs 개표 비교", description: "직종별 세후 실수령액 차이." },
  { slug: "선거알바-일정-공고-마감-타임라인", title: "알바 일정 타임라인", description: "급여 지급까지 전체 일정." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="지방선거 알바 가이드" items={SIDEBAR_ITEMS} currentSlug="선거알바-급여-지급시기-입금" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/지방선거-알바-2026-직종별-급여-신청방법" style={{ color: "#6b7280" }}>지방선거 알바</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>급여 지급 시기</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        선거 알바 급여 언제 들어올까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        지급 시기, 입금 방법, 미지급 시 대처법
      </p>

      <p style={body}>
        "선거 알바 끝났는데, 돈은 언제 통장에 들어오나요?"
      </p>
      <p style={body}>
        선거 알바 급여는 선거 당일에 바로 받는 게 아니에요. 선관위에서 근무 확인과 행정 처리를 거친 뒤 <strong>선거 후 1~2주 내</strong>에 접수 시 등록한 계좌로 입금되죠. 직종에 관계없이 지급 절차는 동일해요.
      </p>

      <GreenBox title="급여 지급 핵심 요약">
        지급 시기: 선거일 후 1~2주 이내{"\n"}
        입금 방법: 접수 시 등록한 본인 명의 계좌{"\n"}
        원천징수: 8.8% 공제 후 입금{"\n"}
        문의처: 관할 선관위 (1390)
      </GreenBox>

      <ArticleAd position="intro" />
      <Divider />

      <H2>급여 수령까지의 절차</H2>
      <SectionBadge>입금되기까지 흐름</SectionBadge>

      <Steps
        steps={[
          { title: "선거 당일 근무 완료", desc: "투표사무원은 투표 종료 후, 개표사무원은 개표 종료 후 근무가 끝나요." },
          { title: "선관위 내부 확인 (1~3일)", desc: "근무 이력, 인원, 계좌 정보를 확인하고 지급 목록을 정리해요." },
          { title: "원천징수 처리", desc: "8.8% 세금을 공제하고 실지급액을 확정해요." },
          { title: "계좌 입금 (선거 후 1~2주)", desc: "확정된 금액이 본인 계좌로 입금돼요. 입금일은 선관위 사정에 따라 약간 차이가 날 수 있어요." },
        ]}
      />

      <p style={body}>
        지급 절차가 빠른 선관위는 선거 후 1주일 이내에 입금하기도 해요. 다만 행정 처리가 밀리는 경우 2주 정도 걸릴 수 있으니 여유를 두고 기다리는 게 좋아요.
      </p>

      <Divider />

      <H2>계좌 등록과 주의사항</H2>
      <SectionBadge>계좌 정보를 정확히</SectionBadge>

      <p style={body}>
        급여는 접수 시 등록한 <strong>본인 명의 계좌</strong>로만 입금돼요. 가족이나 타인 명의 계좌는 입금이 거부되죠.
      </p>
      <p style={body}>
        계좌번호를 잘못 기재하면 입금이 반송돼요. 이 경우 관할 선관위에 연락해서 정확한 계좌 정보를 다시 제출하면 되지만, 재처리에 추가 시간이 걸리죠.
      </p>
      <p style={body}>
        접수할 때 계좌 정보를 여러 번 확인하고, 가능하면 주거래 은행 계좌를 사용하는 게 안전해요. 휴면 계좌나 해지된 계좌를 기재하면 당연히 입금이 안 되죠.
      </p>

      <CategoryButton label="지방선거 알바" count={SIDEBAR_ITEMS.length} href="/w/지방선거-알바-2026-직종별-급여-신청방법" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>입금이 안 되면 어떻게 하나요</H2>
      <SectionBadge>미지급 시 대처 방법</SectionBadge>

      <p style={body}>
        선거 후 2주가 지났는데도 입금이 안 됐다면, <strong>관할 선관위</strong>에 바로 문의하세요. 전국 공통 번호 1390으로 전화하면 해당 지역 선관위로 연결해 줘요.
      </p>
      <p style={body}>
        미지급 사유로 가장 흔한 건 계좌 정보 오류예요. 계좌번호 오기재, 은행명 불일치, 타인 명의 계좌 등이 원인이죠. 이 경우 정확한 계좌 정보를 재제출하면 1주일 내에 재입금돼요.
      </p>
      <p style={body}>
        드물지만 행정 처리 지연으로 3주까지 걸리는 경우도 있어요. 다만 선거 알바 급여가 아예 미지급되는 사례는 거의 없으니 너무 걱정할 필요는 없어요.
      </p>

      <BorderBox title="급여 지급 확인은 통장 내역으로">
        입금 시 보통 '선거관리위원회' 또는 '○○구선관위' 명의로 입금돼요. 통장 내역에서 이 명의를 확인하면 되죠.
      </BorderBox>

      <Divider />

      <H2>겸직 시 급여 지급 방식</H2>
      <SectionBadge>투표+개표 수당은 따로 들어오나요</SectionBadge>

      <p style={body}>
        투표사무원과 개표사무원을 겸직한 경우, 선관위마다 지급 방식이 달라요. 합산해서 한 번에 입금하는 곳도 있고, 투표 수당과 개표 수당을 따로 입금하는 곳도 있죠.
      </p>
      <p style={body}>
        어떤 방식이든 원천징수(8.8%)는 각각 적용돼요. 투표사무원 13만원에서 11,440원, 개표사무원 7.5만원에서 6,600원이 빠져서 합산 실수령액은 약 186,960원이에요.
      </p>
      <p style={body}>
        원천징수 영수증도 각각 발급받을 수 있어요. <Link href="/w/선거알바-4대보험-세금-원천징수" style={{ color: "#1D9E75", textDecoration: "underline" }}>세금 처리 상세 안내</Link>에서 더 자세한 내용을 볼 수 있죠.
      </p>

      <BorderBox title="2024년 기준 안내">
        이 글의 수당 정보는 2024년 제22대 국선 기준이에요. 2026년 지방선거 수당은 선관위 공고 확정 시 업데이트할게요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <References
        groups={[
          {
            category: "기관",
            items: [
              { label: "중앙선거관리위원회", url: "https://www.nec.go.kr" },
            ],
          },
          {
            category: "법령",
            items: [
              { label: "공직선거법", url: "https://www.law.go.kr/법령/공직선거법" },
            ],
          },
        ]}
      />

      <Disclaimer text="이 글은 공식 자료를 바탕으로 작성했지만, 실제 적용은 개인 상황에 따라 달라질 수 있어요. 정확한 내용은 관련 기관에 문의하세요." />
    </ArticleLayout>
  );
}
