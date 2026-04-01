"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 경매 입찰일에 본인이 직접 가지 못해서 대리인을 세워야 하는 상황
// Q2. 위임장·인감증명서 등 서류를 준비해서 대리인이 법원에서 입찰을 완료한다
// Q3. 대리인 자격(성인이면 누구나), 위임장 작성법(인감도장 필수), 필요 서류 5종, 보증금 본인 명의
// Q4. DocTable(필요 서류) + Steps(준비~입찰 절차) + GreenBox(핵심) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const DOCS = [
  { name: "위임장 (본인 인감도장 날인)", required: true, where: "법원 홈페이지 양식 또는 자유 양식" },
  { name: "본인 인감증명서 (3개월 이내)", required: true, where: "주민센터 또는 정부24" },
  { name: "본인 신분증 사본", required: true, where: "주민등록증 또는 운전면허증" },
  { name: "대리인 신분증 원본", required: true, where: "주민등록증 또는 운전면허증" },
  { name: "대리인 도장", required: true, where: "입찰표 날인용" },
  { name: "매수신청보증금 (본인 명의)", required: true, where: "자기앞수표 또는 법원 계좌 송금" },
];

const STEPS = [
  {
    title: "법원 홈페이지에서 위임장 양식을 받으세요",
    desc: "대법원 경매 홈페이지(auction.courtauction.go.kr)에서 '위임장' 양식을 다운받을 수 있어요. 법원 민원실에서 직접 받아도 돼요. 양식 없이 자유 형식으로 작성해도 되는데, 필수 항목(위임인·수임인 인적사항, 위임 범위, 물건 표시)을 빠뜨리면 안 돼요.",
    tip: "위임 범위에 '입찰 및 낙찰에 관한 모든 권한' 명시",
  },
  {
    title: "본인 인감도장으로 위임장에 날인하세요",
    desc: "일반 도장은 안 돼요. 주민센터에 등록된 인감도장만 효력이 있어요. 도장 안 가지고 있으면 주민센터에서 인감 등록부터 해야 해요. 위임장 작성 후 인감증명서도 발급받으세요. 발급일로부터 3개월 이내 것만 유효해요.",
    tip: "인감증명서는 입찰 1~2주 전에 발급하세요",
  },
  {
    title: "보증금을 본인 명의로 준비하세요",
    desc: "매수신청보증금은 반드시 본인 명의여야 해요. 대리인 명의로 내면 안 돼요. 본인 계좌에서 자기앞수표를 끊거나 법원 계좌로 송금해서 대리인한테 전달하세요. 보증금 금액은 보통 감정가의 10%예요.",
    tip: "금액이 정확해야 해요. 부족하면 입찰 무효",
  },
  {
    title: "대리인이 법원에서 서류 제출 후 입찰하세요",
    desc: "입찰일 당일 대리인이 법원에 가서 위임장, 인감증명서, 신분증 등 서류를 제출하고 입찰표를 작성해요. 입찰표에는 대리인 이름과 도장을 찍고, 본인 이름도 함께 기재해요.",
    tip: "서류 하나라도 빠지면 입찰 불가",
  },
];

const CHECKLIST = [
  "위임장 작성 + 인감도장 날인 / 일반 도장 절대 안 됨",
  "인감증명서 발급 (3개월 이내) / 너무 일찍 떼면 기한 만료",
  "보증금 본인 명의 준비 / 자기앞수표 또는 법원 계좌 송금",
  "대리인 신분증 원본 + 도장 / 사본 안 됨",
  "최고 입찰가 한도 지시 / 문자로 증거 남기기",
];

const FAQS = [
  {
    q: "가족이 대리인이 되어도 괜찮나요?",
    a: "네. 배우자, 부모, 자녀 등 가족 누구나 대리인이 될 수 있어요. 특별한 자격은 필요 없고 성인이면 돼요.",
  },
  {
    q: "위임장에 최고 입찰가를 적어야 하나요?",
    a: "법적 의무는 아니지만, 적어두는 게 안전해요. 대리인이 예상보다 높은 가격으로 입찰하면 본인 책임이거든요. '최고 입찰가 5억원까지'처럼 한도를 명시하세요.",
  },
  {
    q: "대리인이 실수하면 누구 책임인가요?",
    a: "법적으로는 본인 책임이에요. 대리인한테 손해배상을 청구할 수는 있지만 입증이 어려워요. 경매 경험 있고 신뢰할 수 있는 사람한테 맡기세요.",
  },
  {
    q: "낙찰 후에도 대리인이 계속 처리할 수 있나요?",
    a: "위임장에 '낙찰 후 절차 포함'이라고 적으면 가능해요. 다만 잔금 납부, 소유권 이전 같은 중요한 절차는 본인이 직접 하는 게 안전해요.",
  },
  {
    q: "공인중개사한테 대리를 맡기면 비용이 드나요?",
    a: "네. 공인중개사 대리는 보통 낙찰가의 1~2% 수수료가 들어요. 법원에 매수신청대리인으로 등록된 중개사만 가능하고, 전문적으로 처리해주는 장점이 있죠.",
  },
  {
    q: "기간입찰이면 우편으로도 서류 보낼 수 있나요?",
    a: "네. 등기우편으로 보내면 돼요. 다만 마감일까지 법원에 도착해야 해요. 도착 안 하면 무효니까 여유 있게 발송하세요.",
  },
];

const SOURCES = [
  { name: "대법원 경매", href: "https://auction.courtauction.go.kr" },
  { name: "생활법령정보", href: "https://www.easylaw.go.kr" },
  { name: "정부24", href: "https://www.gov.kr" },
];

const RELATED = [
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "공인중개사 거래 신고 절차." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부", description: "부동산 취득세 세율 정리." },
  { slug: "공인중개사-업무범위", title: "공인중개사 업무범위", description: "중개사가 할 수 있는 일." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매 · 입찰 대리</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 당일 못 가면 어떡하나요?<br />
        대리인 입찰 서류와 위임장 작성법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "출장 잡혔는데 경매 날짜를 바꿀 수도 없고, 포기해야 하나요?"
      </p>
      <p style={body}>
        아니에요. 대리인을 세워서 입찰할 수 있어요. 가족, 친구, <a href="/w/공인중개사-업무범위" style={{ color: "#1D9E75", textDecoration: "underline" }}>공인중개사</a> 누구든 가능해요.
        핵심은 <strong>위임장에 인감도장</strong>을 찍고, <strong>인감증명서</strong>를 첨부하는 거예요.
        보증금은 반드시 <strong>본인 명의</strong>로 준비해야 하고, 서류 하나라도 빠지면 입찰 자체가 안 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어떤 서류를 준비해야 하나요?</H2>
      <p style={body}>
        대리인 입찰에 필요한 서류는 6가지예요. 전부 원본이어야 하고, 하나라도 빠지면 법원에서 입찰을 받아주지 않아요.
      </p>

      <SectionBadge>필요 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <GreenBox>
        핵심 3가지만 기억하세요{"\n"}
        1. 위임장에 인감도장 (일반 도장 X){"\n"}
        2. 인감증명서 3개월 이내{"\n"}
        3. 보증금 본인 명의 (대리인 명의 X)
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>서류 준비부터 입찰까지 순서</H2>
      <p style={body}>
        입찰일 최소 1~2주 전에 준비를 시작하세요. 인감증명서 발급, 위임장 작성, 보증금 준비를 한꺼번에 처리하면 빠르게 끝나요.
      </p>

      <SectionBadge>준비~입찰 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>대리인한테 맡기기 전에 체크하세요</H2>
      <p style={body}>
        대리인이 입찰에서 실수하면 본인 책임이에요. 맡기기 전에 아래 사항을 반드시 정리하고 문자로 증거를 남기세요.
      </p>

      <Checklist items={CHECKLIST} />

      <BorderBox title="주의">
        보증금 분실·도난 위험이 있어요. 자기앞수표를 대리인한테 맡길 때는 믿을 수 있는 사람만 선택하세요.
        고액 물건일수록 보증금도 크니까 가족이나 아주 가까운 지인이 좋아요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 법원마다 요구 서류가 다를 수 있으니 입찰 전에 해당 법원에 확인하세요." />
    </ArticleLayout>
  );
}
