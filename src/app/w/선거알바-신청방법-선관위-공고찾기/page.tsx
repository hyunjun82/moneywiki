"use client";
// Q1. 선거 알바를 하고 싶은데 어디서 어떻게 신청하는지, 공고는 어디서 보는지 모르는 상황
// Q2. 본인 지역 선관위 공고를 찾아서 선거 알바를 신청한다
// Q3. (1) 선관위 홈페이지 접속 경로 (2) 공고 검색 방법 (3) 접수 절차 (4) 선착순 여부와 마감 시점
// Q4. Steps(신청 절차) + GreenBox(핵심 요약) + BorderBox(팁) + FAQ

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
    q: "공고는 보통 선거 며칠 전에 올라오나요?",
    a: "직종에 따라 달라요. 선거사무보조원은 2~3개월 전, 투표사무원과 개표사무원은 1~2개월 전에 공고가 나오는 경우가 많아요. 지역마다 차이가 있으니 수시로 확인하는 게 좋죠.",
  },
  {
    q: "선관위 말고 다른 곳에서도 모집하나요?",
    a: "공식 모집은 선관위를 통해서만 진행돼요. 간혹 지역 커뮤니티나 대학 게시판에 선관위 공고 링크가 공유되기도 하지만, 모집 자체는 선관위가 직접 담당하죠.",
  },
  {
    q: "온라인으로만 접수할 수 있나요?",
    a: "대부분 온라인 접수를 받지만, 일부 지역에서는 관할 선관위 사무실 방문 접수를 병행해요. 공고에 접수 방법이 명시되니 확인하면 돼요.",
  },
  {
    q: "접수하면 무조건 선발되나요?",
    a: "아니에요. 지원자가 많으면 추첨이나 선착순으로 선발해요. 특히 대학가 인근은 경쟁이 치열한 편이고, 이전 선거 경험자를 우대하는 곳도 있죠.",
  },
  {
    q: "거주지가 아닌 다른 지역 선관위에 신청할 수 있나요?",
    a: "원칙적으로 주민등록상 거주지 관할 선관위에 신청해야 해요. 다른 지역 선관위에 신청하면 접수 자체가 안 되거나 우선순위에서 밀릴 수 있어요.",
  },
];

const RELATED = [
  { slug: "선거알바-신청자격-나이-결격사유", title: "신청 자격과 결격사유", description: "신청 전에 자격부터 확인하세요." },
  { slug: "선거알바-일정-공고-마감-타임라인", title: "알바 일정 타임라인", description: "공고부터 급여까지 전체 일정." },
  { slug: "지방선거-알바-2026-직종별-급여-신청방법", title: "직종별 급여 비교", description: "어떤 직종을 선택할지 비교." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="지방선거 알바 가이드" items={SIDEBAR_ITEMS} currentSlug="선거알바-신청방법-선관위-공고찾기" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/선거알바-신청방법-선관위-공고찾기" style={{ color: "#6b7280" }}>지방선거 알바</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>신청 방법</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        선거 알바 어디서 신청할까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        선관위 공고 찾기, 접수 절차, 선발 과정
      </p>

      <p style={body}>
        "선거 알바 하고 싶은데, 어디서 공고를 보고 어떻게 접수하는 건지 모르겠어요."
      </p>
      <p style={body}>
        선거 알바(투표사무원, 개표사무원 등)는 전부 <strong>선거관리위원회</strong>에서 모집해요. 사설 구인 사이트가 아니라 각 시/도/구 선관위 홈페이지에서 공고를 올리고, 거기서 직접 접수를 받죠. 공고를 찾는 방법부터 접수 완료까지 단계별로 안내할게요.
      </p>

      <GreenBox title="신청 방법 핵심 요약">
        모집 주체: 각 시/도/구 선거관리위원회{"\n"}
        공고 확인: nec.go.kr 또는 관할 선관위 홈페이지{"\n"}
        접수 방법: 온라인 접수 (일부 지역 방문 접수 병행){"\n"}
        선발 방식: 선착순 또는 추첨 (지역마다 다름){"\n"}
        공고 시기: 선거일 1~3개월 전부터
      </GreenBox>

      <ArticleAd position="intro" />
      <Divider />

      <H2>선관위 공고 찾는 방법</H2>
      <SectionBadge>어디서 확인하나요</SectionBadge>

      <Steps
        steps={[
          { title: "중앙선거관리위원회(nec.go.kr) 접속", desc: "포털에서 '선거관리위원회'를 검색하거나 nec.go.kr에 직접 접속해요. 메인 화면에 '선거사무원 모집' 배너가 뜨는 경우가 많아요." },
          { title: "관할 지역 선관위 찾기", desc: "본인 주민등록상 주소지의 구/시/군 선관위를 찾아요. 중앙선관위 사이트에서 지역별 선관위 링크를 제공하죠." },
          { title: "채용/모집 공고 확인", desc: "해당 선관위 홈페이지의 '공지사항' 또는 '채용 공고' 게시판에서 '투표사무원 모집', '개표사무원 모집' 등의 공고를 찾아요." },
          { title: "공고 내용 확인", desc: "모집 직종, 급여, 근무시간, 접수 기간, 접수 방법이 모두 적혀 있어요. 꼼꼼히 읽고 접수 마감일을 놓치지 마세요." },
        ]}
      />

      <p style={body}>
        중앙선관위 사이트 외에도 각 시/도 선관위가 별도 홈페이지를 운영해요. 예를 들어 서울시선거관리위원회, 경기도선거관리위원회 등이 따로 있죠. 본인 거주지 선관위를 즐겨찾기 해두면 편해요.
      </p>

      <Divider />

      <H2>접수 절차와 필요 서류</H2>
      <SectionBadge>어떻게 접수하나요</SectionBadge>

      <p style={body}>
        대부분의 선관위에서 <strong>온라인 접수</strong>를 받아요. 공고 페이지에 접수 링크나 신청서 양식이 포함되어 있죠.
      </p>
      <p style={body}>
        접수 시 필요한 정보는 이름, 주민등록번호(또는 생년월일), 연락처, 주소, 계좌 정보 등이에요. 신분증 사본을 첨부해야 하는 경우도 있어요.
      </p>
      <p style={body}>
        일부 지역에서는 관할 선관위 사무실에 직접 방문해서 접수하는 방식을 병행해요. 공고에 '방문 접수 가능'이라고 적혀 있으면 서류를 들고 가서 현장 접수하면 돼요.
      </p>

      <BorderBox title="접수 시 계좌 정보 정확히 기재하세요">
        급여가 접수 시 등록한 계좌로 입금되기 때문에, 계좌번호를 잘못 기재하면 급여 지급이 지연될 수 있어요. 본인 명의 계좌만 가능하죠.
      </BorderBox>

      <CategoryButton label="지방선거 알바" count={SIDEBAR_ITEMS.length} href="/w/선거알바-신청방법-선관위-공고찾기" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>선발 방식과 경쟁률</H2>
      <SectionBadge>접수하면 무조건 되나요</SectionBadge>

      <p style={body}>
        선발 방식은 지역마다 달라요. 크게 <strong>선착순</strong>과 <strong>추첨</strong> 두 가지로 나뉘죠.
      </p>
      <p style={body}>
        선착순인 경우 공고가 올라오자마자 빠르게 접수해야 해요. 인구 밀집 지역(서울 강남, 서초 등)이나 대학가 인근은 하루 만에 마감되기도 해요. 농어촌 지역은 비교적 여유 있는 편이죠.
      </p>
      <p style={body}>
        추첨인 경우 접수 기간 내에만 신청하면 되고, 기간 종료 후 무작위로 선발해요. 이전 선거 참여 경험자를 우대하는 곳도 있으니 공고를 꼼꼼히 읽어보세요.
      </p>

      <Divider />

      <H2>선발 후 사전 교육</H2>
      <SectionBadge>교육도 받아야 하나요</SectionBadge>

      <p style={body}>
        선발되면 선관위에서 개별 연락(전화 또는 문자)을 줘요. 그리고 선거일 전에 <strong>사전 교육</strong>에 참석해야 하죠.
      </p>
      <p style={body}>
        사전 교육은 보통 2~3시간이에요. 투표 절차, 유의사항, 돌발 상황 대응법 등을 배우죠. 교육에 참석하지 않으면 당일 투입이 안 될 수 있으니 반드시 참석해야 해요.
      </p>
      <p style={body}>
        교육 장소는 선관위 사무실이나 인근 시설이에요. 교육 일정은 선발 통보 때 함께 안내받죠. 교육에 대한 별도 수당은 없는 경우가 대부분이에요.
      </p>

      <BorderBox title="2024년 기준 안내">
        이 글의 정보는 2024년 제22대 국선 기준이에요. 2026년 지방선거 모집 절차는 선관위 공고 확정 시 업데이트할게요.
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
