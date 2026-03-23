"use client";

// Q1. 기초연금을 받고 있거나 곧 받을 예정인데 매달 며칠에 입금되는지 궁금한 상황
// Q2. 지급일(매월 25일)과 예외 상황(주말·공휴일)을 파악하고 입금을 확인한다
// Q2-1. 본인 통장(은행 앱)에서 입금 확인
// Q3. 정기 지급일(25일), 주말·공휴일 앞당김, 첫 지급 시기, 지급 금액 기준, 미입금 시 대처
// Q4. GreenBox(지급일 요약) + BorderBox(월별 실제 지급일 예시) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "25일인데 입금이 안 됐어요. 왜 그런가요?",
    a: "은행별로 입금 처리 시간이 조금 달라요. 보통 25일 오전 중에 입금되지만, 늦으면 오후까지 걸릴 수 있어요. 다음 날까지도 안 들어오면 주민센터(129)에 문의하세요.",
  },
  {
    q: "첫 달은 언제 입금되나요?",
    a: "신청 후 수급 자격이 확정되면 가장 가까운 25일에 첫 입금이 돼요. 심사가 25일 이후에 끝나면 다음 달 25일에 밀린 금액까지 합산돼서 들어오죠.",
  },
  {
    q: "매달 같은 금액이 들어오나요?",
    a: "대부분 같은 금액이에요. 다만 소득·재산 변동이 생기면 금액이 바뀔 수 있고, 매년 1월에 물가 상승분이 반영돼 소폭 오를 수 있어요.",
  },
  {
    q: "계좌를 바꾸면 다음 달부터 바로 적용되나요?",
    a: "계좌 변경 신청 시기에 따라 달라요. 25일 전에 변경하면 그달부터, 25일 이후면 다음 달부터 적용돼요. 자세한 건 계좌 변경 방법 글을 참고하세요.",
  },
  {
    q: "입금이 갑자기 안 되면 어떻게 하나요?",
    a: "지급 정지 사유가 생겼을 수 있어요. 해외 체류 60일 초과, 거주지 미신고, 소득 변동 등이 주요 원인이에요. 주민센터에 전화해서 사유를 확인하고 해제 절차를 밟으면 돼요.",
  },
  {
    q: "기초연금이 통장에 뭐라고 표시되나요?",
    a: "은행마다 다르지만, 보통 '기초연금', '보건복지부', '기초노령' 등으로 표시돼요. 모바일 뱅킹에서 거래 내역을 검색하면 쉽게 찾을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 지급 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 제도", url: "https://www.bokjiro.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제8조 (지급 시기)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-계좌변경-방법-절차", title: "기초연금 계좌 변경 방법", description: "입금 계좌를 바꾸는 절차예요." },
  { slug: "기초연금-지급정지-사유-해제방법", title: "지급정지 사유와 해제 방법", description: "갑자기 입금이 안 될 때 대처법이에요." },
  { slug: "기초연금-수령액-단독-부부-계산법", title: "기초연금 수령액 계산법", description: "매달 얼마를 받는지 계산하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-지급일-입금기준" />}>
      <nav style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none" }}>홈</Link>
        {" > "}
        <Link href="/w/기초연금" style={{ color: "#888", textDecoration: "none" }}>기초연금</Link>
        {" > "}
        <span style={{ color: "#333" }}>지급일</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.45, marginBottom: 6 }}>
        기초연금, 매달 며칠에 들어올까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 18 }}>
        지급일과 입금 기준
      </p>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기초연금을 받기 시작했는데 정확히 며칠에 입금되는지 궁금하죠.
        매월 25일이 기본 지급일이에요.
        25일이 주말이나 공휴일이면 그 직전 영업일에 앞당겨서 입금돼요.
        첫 지급 시기와 예외 상황까지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>기초연금 지급일은 매월 25일</H2>
      <p style={body}>
        기초연금법 시행령에 따라 매월 25일이 정기 지급일이에요.
        전국 모든 수급자에게 동일하게 적용되죠.
        은행 영업 시간 내에 처리되기 때문에 보통 25일 오전~오후에 입금돼요.
      </p>
      <GreenBox>
        <strong>기초연금 지급일 핵심</strong><br />
        <br />
        정기 지급일: 매월 25일<br />
        25일이 토요일 → 24일(금요일) 입금<br />
        25일이 일요일 → 23일(금요일) 입금<br />
        25일이 공휴일 → 직전 영업일 입금<br />
        <br />
        2026년 기준 단독가구 최대 월 349,360원
      </GreenBox>

      <H2>2026년 월별 실제 지급일</H2>
      <p style={body}>
        25일이 주말이나 공휴일에 걸리는 달이 있으니 미리 확인해두면 편해요.
      </p>
      <BorderBox>
        <strong>2026년 기초연금 지급일</strong><br />
        <br />
        1월: 23일 (금) — 25일이 일요일<br />
        2월: 25일 (수)<br />
        3월: 25일 (수)<br />
        4월: 24일 (금) — 25일이 토요일<br />
        5월: 25일 (월)<br />
        6월: 25일 (목)<br />
        7월: 24일 (금) — 25일이 토요일<br />
        8월: 25일 (화)<br />
        9월: 25일 (금)<br />
        10월: 23일 (금) — 25일이 일요일<br />
        11월: 25일 (수)<br />
        12월: 25일 (목) — 성탄절이지만 공휴일 여부에 따라 조정 가능
      </BorderBox>
      <p style={body}>
        위 일정은 공휴일 기준으로 예상한 거예요.
        임시공휴일이 추가되면 일정이 바뀔 수 있으니, 해당 월에 주민센터(129)로 확인하면 정확해요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>첫 지급은 언제 들어올까</H2>
      <p style={body}>
        기초연금을 처음 신청하면 심사 기간(약 30일)이 지나야 지급이 시작돼요.
        심사가 끝나는 시점에 따라 첫 입금일이 달라지죠.
      </p>
      <p style={body}>
        예를 들어 3월 10일에 신청하고 4월 5일에 수급 확정이 되면, 4월 25일에 3월분+4월분이 한꺼번에 입금돼요.
        신청한 달(3월)부터 소급해서 지급하기 때문에 심사 기간 동안 손해 보는 건 없어요.
      </p>
      <p style={body}>
        다만 <Link href="/w/기초연금-소급지급-여부-손해" style={{ color: "#1D9E75", textDecoration: "underline" }}>신청 전 기간은 소급이 안 되니까</Link>, 자격이 되는 분은 최대한 빨리 신청하는 게 유리해요.
      </p>

      <H2>입금이 안 될 때 대처법</H2>
      <p style={body}>
        25일이 지났는데 입금이 안 됐다면 아래 순서로 확인해보세요.
      </p>
      <p style={body}>
        첫째, 통장 거래내역을 다시 한번 조회해보세요. '기초연금' 또는 '보건복지부'로 검색하면 찾기 쉬워요.
        둘째, 계좌 정보가 바뀌지 않았는지 확인하세요. 통장을 해지하거나 정지된 계좌로는 입금이 안 돼요.
        셋째, <Link href="/w/기초연금-지급정지-사유-해제방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>지급 정지 사유</Link>가 생겼을 수 있으니 주민센터에 전화(129)하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        지급일 관련 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법 시행령 기준으로 작성됐어요. 월별 지급일은 공휴일 변동에 따라 달라질 수 있으니 정확한 날짜는 주민센터(129)에서 확인하세요." />
    </ArticleLayout>
  );
}
