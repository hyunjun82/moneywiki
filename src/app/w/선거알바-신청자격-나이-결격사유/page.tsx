"use client";
// Q1. 선거 알바를 해보고 싶은데 본인이 할 수 있는 자격이 되는지, 결격사유에 해당하는지 확인하고 싶은 상황
// Q2. 자신이 신청 자격에 해당하는지 결격사유를 대조해서 확인하고, 가능하면 바로 신청한다
// Q3. (1) 나이 제한 (만 18세 이상) (2) 결격사유 전체 목록 (3) 공무원/정당원 제한 (4) 외국인 가능 여부
// Q4. EligibilityChecker(자격 체크) + GreenBox(핵심 요약) + BorderBox(결격사유 상세) + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer,
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

const ELIGIBILITY = [
  { id: "age", label: "만 18세 이상이다" },
  { id: "citizen", label: "대한민국 국민이다" },
  { id: "notcivil", label: "공무원이 아니다" },
  { id: "notparty", label: "정당 당원이 아니다" },
  { id: "notfamily", label: "후보자의 배우자, 직계존비속이 아니다" },
  { id: "notstaff", label: "후보자의 선거사무관계자가 아니다" },
];

const FAQS = [
  {
    q: "만 18세는 생년월일 기준인가요, 선거일 기준인가요?",
    a: "선거일 기준이에요. 2026년 6월 3일(선거일) 기준으로 만 18세가 돼야 해요. 2008년 6월 4일 이후 출생자는 신청할 수 없죠.",
  },
  {
    q: "정당 당원이었다가 탈당하면 신청할 수 있나요?",
    a: "탈당 후에는 신청 가능해요. 다만 선관위에서 당원 이력을 확인할 수 있으니 탈당 증명이 필요할 수 있어요. 선거 전에 미리 탈당 처리를 해두는 게 안전하죠.",
  },
  {
    q: "공무원 배우자도 결격사유에 해당하나요?",
    a: "아니에요. 결격사유는 본인이 공무원인 경우이지, 배우자가 공무원이라고 제한되지는 않아요. 다만 후보자의 배우자는 결격사유에 해당하죠.",
  },
  {
    q: "프리랜서나 자영업자도 가능한가요?",
    a: "네, 직업에 관계없이 신청할 수 있어요. 공무원과 교원 등 특수 신분만 제한되고, 일반 직장인, 자영업자, 프리랜서 모두 가능해요.",
  },
  {
    q: "선거법 위반 전과가 있으면 안 되나요?",
    a: "공직선거법 위반으로 벌금 100만원 이상 선고받고 5년이 지나지 않은 경우에는 제한될 수 있어요. 일반적인 전과와는 다른 기준이니, 해당되면 관할 선관위에 직접 문의하는 게 정확해요.",
  },
  {
    q: "영주권을 가진 외국인은 선거 알바를 할 수 있나요?",
    a: "외국인은 선거권이 없기 때문에 투표사무원이나 개표사무원으로 일할 수 없어요. 다만 영주권자(F-5)는 지방선거 투표권이 있어서, 지방선거 한정으로 가능할 수 있지만 실제 모집에서는 제한되는 경우가 많아요.",
  },
];

const RELATED = [
  { slug: "선거알바-신청방법-선관위-공고찾기", title: "선관위 공고 찾는 법", description: "자격 확인 후 신청하는 방법." },
  { slug: "지방선거-알바-2026-직종별-급여-신청방법", title: "직종별 급여 비교", description: "어떤 직종이 나에게 맞는지." },
  { slug: "선거알바-4대보험-세금-원천징수", title: "세금 처리 방법", description: "원천징수와 4대보험 적용 여부." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="지방선거 알바 가이드" items={SIDEBAR_ITEMS} currentSlug="선거알바-신청자격-나이-결격사유" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/선거알바-신청방법-선관위-공고찾기" style={{ color: "#6b7280" }}>지방선거 알바</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>신청 자격</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        선거 알바 누가 할 수 있을까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        나이 제한, 결격 사유, 자격 요건 정리
      </p>

      <p style={body}>
        "선거 알바 해보고 싶은데, 나이 제한이나 못하는 경우가 있나요?"
      </p>
      <p style={body}>
        선거 알바(투표사무원, 개표사무원 등)는 <strong>만 18세 이상의 선거권을 가진 대한민국 국민</strong>이면 누구나 신청할 수 있어요. 대학생, 주부, 직장인, 프리랜서 모두 가능하죠. 다만 공무원, 정당 당원, 후보자 관계자 등은 결격사유에 해당돼서 신청이 안 돼요.
      </p>

      <GreenBox title="신청 자격 핵심 요약">
        나이: 만 18세 이상 (선거일 기준){"\n"}
        국적: 대한민국 국민 (선거권 보유자){"\n"}
        직업 제한 없음: 학생, 직장인, 자영업자 모두 가능{"\n"}
        결격사유: 공무원, 정당 당원, 후보자 가족 등 제외
      </GreenBox>

      <ArticleAd position="intro" />
      <Divider />

      <H2>나이 제한과 기본 자격</H2>
      <SectionBadge>몇 살부터 가능한가요</SectionBadge>

      <p style={body}>
        선거 알바의 나이 하한은 <strong>만 18세</strong>예요. 선거일(2026년 6월 3일) 기준으로 만 18세가 돼야 신청할 수 있죠. 나이 상한은 없어서 60대, 70대도 체력이 된다면 얼마든지 지원 가능해요.
      </p>
      <p style={body}>
        대한민국 국민이면서 선거권이 있어야 해요. 선거권은 만 18세 이상의 국민에게 주어지는데, 금치산자(피성년후견인)로 선거권이 정지된 경우는 예외이죠.
      </p>
      <p style={body}>
        외국 국적자는 원칙적으로 불가하지만, 영주권(F-5)을 가진 외국인은 지방선거 투표권이 있어서 지방선거에 한해 예외적으로 검토될 수 있어요. 하지만 실제 모집에서는 대한민국 국적자로 제한하는 경우가 대부분이에요.
      </p>

      <Divider />

      <H2>결격사유 전체 목록</H2>
      <SectionBadge>이 경우에 해당하면 안 돼요</SectionBadge>

      <p style={body}>
        아래에 하나라도 해당하면 선거 알바 신청이 불가능해요. 공직선거법에서 선거사무 종사를 제한하는 사유들이죠.
      </p>

      <div style={{ margin: "1rem 0", padding: "1rem 1.2rem", backgroundColor: "#fef2f2", borderRadius: 10, border: "1px solid #fecaca" }}>
        <p style={{ fontWeight: 700, fontSize: 15, color: "#991b1b", marginBottom: 8 }}>결격사유 목록</p>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 2, color: "#7f1d1d" }}>
          <li><strong>공무원</strong> (국가공무원, 지방공무원 모두 포함)</li>
          <li><strong>교원</strong> (사립학교 교원 포함)</li>
          <li><strong>정당 당원</strong> (탈당 전까지 제한)</li>
          <li><strong>후보자의 배우자</strong></li>
          <li><strong>후보자의 직계존비속</strong> (부모, 자녀, 조부모, 손자녀)</li>
          <li><strong>후보자의 선거사무관계자</strong> (선거사무장, 선거연락소장 등)</li>
          <li><strong>선거범죄로 형 확정 후 5년 미경과자</strong></li>
        </ul>
      </div>

      <p style={body}>
        위 목록에서 가장 많이 헷갈리는 게 '정당 당원'이에요. 과거에 가입만 하고 활동을 안 해도 탈당 처리를 하지 않았다면 여전히 당원 신분이라 결격사유에 해당하죠. 신청 전에 정당 가입 여부를 확인해 보세요.
      </p>

      <CategoryButton label="지방선거 알바" count={SIDEBAR_ITEMS.length} href="/w/선거알바-신청방법-선관위-공고찾기" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>내 자격 간편 체크</H2>
      <SectionBadge>체크리스트로 확인하기</SectionBadge>

      <p style={body}>
        아래 항목을 모두 체크할 수 있으면 선거 알바 신청 자격이 있는 거예요.
      </p>

      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="모든 조건을 충족해요. 선거 알바에 신청할 수 있어요!"
        partialMatchText="일부 조건이 충족되지 않아요. 해당 항목을 확인해 보세요."
      />

      <Divider />

      <H2>자주 묻는 특수한 경우</H2>
      <SectionBadge>이런 경우는 어떻게 되나요</SectionBadge>

      <p style={body}>
        직장인이 연차를 쓰고 선거 알바를 하는 건 전혀 문제없어요. 회사에서 공식적으로 금지하지 않는 한, 휴무일에 어떤 활동을 하든 개인의 자유이죠.
      </p>
      <p style={body}>
        퇴직한 공무원은 퇴직 후에는 공무원 신분이 아니니까 결격사유에 해당하지 않아요. 다만 현직 공무원이 휴직 중인 경우는 여전히 공무원 신분이라 신청할 수 없죠.
      </p>
      <p style={body}>
        군 복무 중인 현역 군인도 공무원에 준하는 신분이라 선거 알바를 할 수 없어요. 전역 후에는 당연히 가능하고요.
      </p>

      <BorderBox title="확실하지 않으면 선관위에 문의하세요">
        본인이 결격사유에 해당하는지 확실하지 않으면 관할 선관위(1390)에 직접 문의하는 게 가장 정확해요. 자격이 안 되는 상태에서 선발되면 나중에 취소될 수 있어요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <References
        groups={[
          {
            category: "법령",
            items: [
              { label: "공직선거법 제135조, 제146조", url: "https://www.law.go.kr/법령/공직선거법" },
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
