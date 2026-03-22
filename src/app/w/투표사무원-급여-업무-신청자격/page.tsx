"use client";

// Q1. 선거 알바 중 투표사무원이 구체적으로 뭘 하는지, 일당이 정확히 얼마인지 궁금한 상황
// Q2. 투표사무원의 업무 내용과 급여를 파악한 뒤 본인에게 맞는지 판단하고 신청한다
// Q3. (1) 일당 13만원의 근거와 근무시간 (2) 구체적 업무 내용 (3) 신청 자격과 결격사유 (4) 근무 당일 흐름
// Q4. GreenBox(급여 요약) + Steps(당일 업무 흐름) + Checklist(준비물) + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
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
    q: "투표사무원은 식사가 제공되나요?",
    a: "네, 투표소에서 도시락이 제공되는 경우가 대부분이에요. 다만 지역에 따라 식비를 별도로 지급하는 곳도 있으니 사전 교육 때 확인하면 돼요.",
  },
  {
    q: "투표사무원 근무 중 화장실은 어떻게 가나요?",
    a: "교대로 자리를 비울 수 있어요. 투표소에 보통 4~6명이 배치되기 때문에 돌아가면서 휴식하죠. 장시간 자리를 비우는 건 안 되지만, 기본적인 휴식은 보장돼요.",
  },
  {
    q: "사전투표일에도 투표사무원이 필요한가요?",
    a: "네, 사전투표(선거일 5일 전~4일 전, 2일간)에도 별도로 사무원을 모집해요. 사전투표 사무원과 본투표 사무원은 따로 신청하는 경우가 많아요.",
  },
  {
    q: "투표사무원 경험이 없어도 할 수 있나요?",
    a: "가능해요. 선발 후 사전 교육(보통 2~3시간)을 받고 투입되기 때문에 처음이라도 큰 어려움은 없어요. 다만 하루 14시간 서서 근무해야 하니 체력은 필요하죠.",
  },
  {
    q: "13만원에서 세금을 빼면 실수령액은 얼마인가요?",
    a: "기타소득 8.8%가 원천징수돼요. 13만원 기준 약 11,440원이 빠져서 실수령액은 약 118,560원이에요.",
  },
];

const RELATED = [
  { slug: "개표사무원-급여-근무시간-야간수당", title: "개표사무원 급여와 야간 수당", description: "투표 마감 후 야간 근무 조건." },
  { slug: "투표사무원-개표사무원-급여-비교", title: "투표 vs 개표 비교", description: "시급 환산과 난이도 차이." },
  { slug: "선거알바-신청방법-선관위-공고찾기", title: "선관위 공고 찾는 법", description: "지역별 신청 경로 안내." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="지방선거 알바 가이드" items={SIDEBAR_ITEMS} currentSlug="투표사무원-급여-업무-신청자격" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/지방선거-알바-2026-직종별-급여-신청방법" style={{ color: "#6b7280" }}>지방선거 알바</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>투표사무원</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        투표사무원 일당 얼마일까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        업무 내용, 근무시간, 신청 자격 정리
      </p>

      <p style={body}>
        "선거 때 투표소에서 일하는 사람들은 얼마를 받는 걸까요?"
      </p>
      <p style={body}>
        투표사무원은 선거일 당일 투표소에서 유권자의 신분을 확인하고 투표용지를 나눠주는 역할이에요. 하루 약 14시간 근무하고 일당 <strong>13만원</strong>(2024년 국선 기준)을 받죠. 선거 알바 중 가장 보편적인 직종이고, 매 선거마다 수만 명이 투입돼요.
      </p>

      <GreenBox title="투표사무원 핵심 요약 (2024년 국선 기준)">
        일당: 13만원 (세전){"\n"}
        실수령액: 약 118,560원 (8.8% 원천징수 후){"\n"}
        근무시간: 약 14시간 (06:00 전후 ~ 20:00 전후){"\n"}
        업무: 신분 확인, 투표용지 교부, 투표 안내{"\n"}
        2026년 수당은 선관위 공고 확정 시 업데이트 예정
      </GreenBox>

      <ArticleAd position="intro" />
      <Divider />

      <H2>투표사무원의 업무 내용</H2>
      <SectionBadge>구체적으로 뭘 하나요</SectionBadge>

      <p style={body}>
        투표사무원은 투표소에 배치돼서 유권자가 투표할 수 있도록 돕는 역할이에요. 업무 자체는 단순하지만, 장시간 집중해야 하죠.
      </p>
      <p style={body}>
        주된 업무는 크게 3가지예요. 첫째, 유권자 신분증(주민등록증, 운전면허증 등)을 확인하고 본인 여부를 대조해요. 둘째, 선거인명부에서 해당 유권자를 체크한 뒤 투표용지를 교부하죠. 셋째, 투표 절차를 안내하고 질문에 응대해요.
      </p>
      <p style={body}>
        투표소에는 보통 투표관리관 1명, 투표사무원 4~6명이 배치돼요. 역할을 나눠서 신분 확인 담당, 투표용지 교부 담당, 안내 담당으로 운영하죠. 자리를 이탈하거나 특정 후보를 언급하는 건 절대 금지예요.
      </p>

      <BorderBox title="투표 안내 시 주의사항">
        유권자에게 특정 후보나 정당에 대한 의견을 말하면 선거법 위반이에요. '기표소에서 도장을 찍으시면 됩니다' 같은 절차 안내만 해야 해요.
      </BorderBox>

      <Divider />

      <H2>근무 당일 흐름</H2>
      <SectionBadge>아침부터 저녁까지</SectionBadge>

      <Steps
        steps={[
          { title: "06:00 전후 집합", desc: "투표소에 모여서 투표함, 기표대, 투표용지 등 설비를 점검하고 세팅해요." },
          { title: "06:00~06:30 최종 점검", desc: "투표관리관 지시에 따라 역할을 배분받고, 투표 절차를 최종 확인해요." },
          { title: "06:00~18:00(또는 20:00) 투표 진행", desc: "유권자 신분 확인 → 선거인명부 체크 → 투표용지 교부를 반복해요. 교대로 휴식해요." },
          { title: "투표 마감 후 정리", desc: "투표함 봉인, 잔여 투표용지 정리, 투표소 철거까지 마치면 퇴근이에요." },
        ]}
      />

      <p style={body}>
        총 근무시간은 약 14시간이에요. 오전은 투표 인원이 적어서 여유 있지만, 점심~저녁 시간대에 유권자가 몰리면 꽤 바빠지죠. 서서 근무하는 시간이 길어서 편한 신발이 필수예요.
      </p>

      <CategoryButton label="지방선거 알바" count={SIDEBAR_ITEMS.length} href="/w/지방선거-알바-2026-직종별-급여-신청방법" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>신청 자격과 결격사유</H2>
      <SectionBadge>누가 할 수 있나요</SectionBadge>

      <p style={body}>
        <strong>만 18세 이상</strong>의 선거권이 있는 대한민국 국민이면 누구나 지원할 수 있어요. 대학생, 프리랜서, 주부, 퇴직자 등 제한이 없죠.
      </p>
      <p style={body}>
        다만 <Link href="/w/선거알바-신청자격-나이-결격사유" style={{ color: "#1D9E75", textDecoration: "underline" }}>결격사유</Link>에 해당하면 안 돼요. 공무원, 정당 당원, 후보자의 배우자/직계존비속, 후보자의 선거사무관계자는 투표사무원으로 일할 수 없어요.
      </p>
      <p style={body}>
        선거 경험자를 우대하는 경우가 있지만, 처음 지원하는 분도 많이 선발돼요. 사전 교육(2~3시간)을 이수하면 바로 투입되기 때문에 경험이 없어도 크게 걱정할 필요는 없죠.
      </p>

      <Divider />

      <H2>준비물과 주의사항</H2>
      <SectionBadge>근무 전 챙길 것</SectionBadge>

      <Checklist
        items={[
          "신분증 (주민등록증 또는 운전면허증)",
          "편한 신발 (14시간 서서 근무)",
          "개인 물병 (투표소 내 음료 반입 가능)",
          "외투 또는 가디건 (냉방이 강한 투표소가 많음)",
          "사전 교육 이수 확인 (미이수 시 투입 불가)",
        ]}
      />

      <p style={body}>
        휴대폰은 소지할 수 있지만, 투표소 내에서 촬영하거나 SNS에 투표 관련 내용을 올리면 안 돼요. 근무 중 정치적 발언이나 특정 후보 관련 대화도 금지되죠.
      </p>

      <BorderBox title="2024년 기준 안내">
        이 글의 수당 정보는 2024년 제22대 국선 기준이에요. 2026년 지방선거 수당은 선관위 공고 확정 시 업데이트할게요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <References
        groups={[
          {
            category: "법령",
            items: [
              { label: "공직선거법", url: "https://www.law.go.kr/법령/공직선거법" },
            ],
          },
          {
            category: "기관",
            items: [
              { label: "중앙선거관리위원회", url: "https://www.nec.go.kr" },
            ],
          },
        ]}
      />

      <Disclaimer text="이 글은 공식 자료를 바탕으로 작성했지만, 실제 적용은 개인 상황에 따라 달라질 수 있어요. 정확한 내용은 관련 기관에 문의하세요." />
    </ArticleLayout>
  );
}
