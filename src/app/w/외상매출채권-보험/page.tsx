"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 외상 거래가 많은 중소기업 사장님이 거래처 부도로 대금을 못 받을까 걱정하는 상황
// Q2. 외상매출채권 보험에 가입해서 거래처 부도 리스크를 줄인다
// Q3. 보험 구조(보상 최대 90%), 가입 대상(중소기업), 보험료(0.5~2%), 신청 방법, 한국무역보험공사/신보
// Q4. GreenBox(보험 구조 요약) + Steps(신청 절차) + BorderBox(보상 예시) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "한국무역보험공사 또는 신용보증기금에서 신청해요",
    desc: "외상매출채권 보험은 두 곳에서 취급해요. 수출 기업은 한국무역보험공사(K-SURE), 내수 기업은 신용보증기금(KODIT) 매출채권보험을 이용하면 돼요. 온라인 또는 가까운 지점 방문으로 신청 가능해요.",
    tip: "내수+수출 겸업이면 두 곳 모두 이용 가능",
    link: { label: "한국무역보험공사", href: "https://www.ksure.or.kr" },
  },
  {
    title: "사업자등록증과 거래처 정보를 준비하세요",
    desc: "신청 시 사업자등록증, 재무제표, 거래 계약서, 거래처 정보(상호, 사업자번호)가 필요해요. 거래처별 외상 매출 현황도 정리해두면 심사가 빨라져요.",
    tip: "거래처 신용등급에 따라 보험료율이 달라져요",
  },
  {
    title: "심사 후 보상한도와 보험료가 결정돼요",
    desc: "거래처 신용도를 조회해서 보상한도(거래처별 최대 보상 금액)와 보험료율이 정해져요. 심사 기간은 보통 1~2주 정도예요. 보험료는 연간 보상한도에 대해 0.5~2% 수준이에요.",
    tip: "보상한도는 거래처 신용등급에 비례",
  },
  {
    title: "거래처가 부도나면 보험금을 청구하세요",
    desc: "거래처가 부도나거나 대금을 지급하지 않으면 보험금 청구서를 제출해요. 심사 후 외상 대금의 최대 90%까지 보상받아요. 청구부터 지급까지 보통 1~2개월 걸려요.",
    tip: "부분 지급 지연도 보상 대상이 될 수 있어요",
  },
];

const FAQS = [
  {
    q: "외상매출채권 보험, 어떤 기업이 가입할 수 있나요?",
    a: "중소기업이면 대부분 가입할 수 있어요. 외상(신용) 거래를 하는 기업이 대상이에요. 한국무역보험공사는 수출 기업, 신용보증기금은 내수 기업 위주로 취급하지만 겸업 기업도 가능해요.",
  },
  {
    q: "보험료는 얼마나 되나요?",
    a: "거래 금액과 거래처 신용도에 따라 달라요. 보통 연간 보상한도의 0.5~2% 수준이에요. 3억원 보상한도에 1% 보험료라면 연 300만원 정도예요. 거래처 신용이 좋으면 보험료가 낮아져요.",
  },
  {
    q: "부도가 아니라 지급 지연이면 보상 안 되나요?",
    a: "약정 지급일로부터 일정 기간(보통 2~4개월) 경과해도 미지급이면 보상 대상이에요. 완전 부도뿐 아니라 지급 불능, 지급 지연도 포함돼요. 세부 조건은 보험약관에 따라 달라요.",
  },
  {
    q: "보상한도를 초과하는 외상 거래도 할 수 있나요?",
    a: "거래 자체는 가능해요. 다만 보상한도를 넘는 부분은 보험 보상을 못 받아요. 보상한도 5천만원인데 1억원 외상 거래했다면, 부도 시 5천만원의 90%인 4,500만원만 보상받아요.",
  },
  {
    q: "은행 대출에도 도움이 되나요?",
    a: "네, 매출채권보험에 가입하면 보험에 가입된 매출채권을 담보로 은행 대출을 받기 유리해요. 외상 매출이 보험으로 보호되니까 금융기관 입장에서 리스크가 줄어들거든요.",
  },
];

const SOURCES = [
  { name: "한국무역보험공사", href: "https://www.ksure.or.kr" },
  { name: "신용보증기금 매출채권보험", href: "https://www.kodit.co.kr" },
  { name: "중소벤처기업부", href: "https://www.mss.go.kr" },
];

const RELATED = [
  { slug: "소상공인-명절자금", title: "소상공인 명절자금", description: "설·추석 자금 지원 규모와 신청 방법." },
  { slug: "소상공인-전환보증", title: "소상공인 전환보증", description: "고금리 대출 저금리 전환 지원." },
  { slug: "신용보증기금-보증서-발급", title: "신용보증기금 보증서", description: "중소기업 대출 보증서 발급 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>정부지원 &middot; 중소기업 &middot; 매출채권</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        외상 대금 떼일까 걱정된다면?<br />
        외상매출채권 보험 가입과 보상 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "거래처가 갑자기 부도나면 외상 대금 3천만원은 어떻게 하죠?"
      </p>
      <p style={body}>
        외상매출채권 보험에 가입하면 거래처 부도 시 외상 대금의 <strong>최대 90%</strong>를 보상받아요. 3천만원 외상이면 <strong>2,700만원</strong>을 돌려받는 거예요. 보험료는 연간 보상한도의 0.5~2% 수준이라 부담이 크지 않아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>외상매출채권 보험이 뭐고, 어떻게 보상되나요?</H2>
      <p style={body}>
        외상(신용) 거래에서 거래처가 대금을 못 갚으면 보험사가 대신 보상해주는 제도예요.
        <a href="https://www.ksure.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}> 한국무역보험공사</a>(수출)와
        <a href="https://www.kodit.co.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}> 신용보증기금</a>(내수)에서 취급해요.
      </p>

      <SectionBadge>보험 구조</SectionBadge>
      <GreenBox>
        보상 범위: 외상 대금의 최대 90%{"\n"}
        보험료: 연간 보상한도의 0.5~2% (거래처 신용등급에 따라 차등){"\n"}
        보상 사유: 거래처 부도, 지급 불능, 장기 미지급{"\n"}
        가입 대상: 외상 거래하는 중소기업
      </GreenBox>

      <CategoryButton label="정부지원금" count={10} href="/category/정부지원금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>보험 없을 때와 있을 때, 차이가 얼마나 나나요?</H2>
      <p style={body}>
        구체적인 금액으로 비교하면 차이가 확 보여요.
      </p>

      <SectionBadge>보상 비교</SectionBadge>
      <BorderBox>
        <strong>외상 대금 3,000만원 + 거래처 부도 발생</strong>{"\n\n"}
        보험 없을 때: 3,000만원 전액 손실{"\n"}
        보험 있을 때: 2,700만원 보상(90%) → 실제 손실 300만원{"\n\n"}
        연간 보험료가 30~60만원(보상한도 3,000만원 × 1~2%)이니까,{"\n"}
        한 건만 터져도 보험료의 수십 배를 보상받는 셈이에요.
      </BorderBox>

      <p style={body}>
        중소기업은 외상 비중이 높은 경우가 많아서 거래처 한 곳만 부도나도 치명적이에요. 보험 가입하면 안심하고 거래 규모를 키울 수 있고, 은행 대출도 유리해져요.
      </p>

      <Divider />

      <H2>가입 신청은 어떻게 하나요?</H2>
      <p style={body}>
        온라인이나 지점 방문으로 신청해요. 준비 서류만 갖추면 1~2주면 가입 완료돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성했어요. 보험료율과 보상 조건은 가입 시점과 거래처 신용등급에 따라 달라질 수 있으니 한국무역보험공사(1588-3884) 또는 신용보증기금(1588-6565)에 확인하세요." />
    </ArticleLayout>
  );
}
