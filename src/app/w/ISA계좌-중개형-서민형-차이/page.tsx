"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. ISA 계좌를 개설하려는데 중개형/신탁형, 서민형/일반형 뭐가 다른지 모르는 상황
// Q2. 자기 상황에 맞는 ISA 유형 조합(운용방식+소득기준)을 선택하고 개설 신청한다
// Q3. 중개형(직접거래)/신탁형(은행위임) 차이, 서민형 400만 비과세/일반형 200만 비과세, 선택 기준
// Q4. 비교표(운용방식·소득기준) + EligibilityChecker(서민형 자격) + Steps(개설 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "income", label: "근로소득 연 5,000만원 이하 (또는 종합소득 3,800만원 이하)" },
  { id: "age", label: "만 19세 이상 (또는 만 15세 이상 근로소득자)" },
  { id: "resident", label: "국내 거주자" },
  { id: "no-isa", label: "현재 ISA 계좌 보유하지 않음 (1인 1계좌)" },
];

const STEPS = [
  {
    title: "홈택스에서 소득금액증명원 발급받으세요",
    desc: "서민형 자격 확인에 필요해요. 홈택스 로그인 후 '소득금액증명' 발급 신청하면 바로 나와요. 직전 과세기간 기준이라 2025년 소득으로 판단해요.",
    tip: "근로소득만 있으면 근로소득원천징수영수증도 가능",
  },
  {
    title: "증권사 앱에서 ISA 개설 신청하세요",
    desc: "중개형은 증권사(미래에셋, 삼성, 한투 등)에서만 개설돼요. 앱 설치 후 ISA 개설 메뉴에서 운용방식(중개형)과 소득유형(서민형/일반형)을 선택하면 돼요. 소득확인증명서 제출까지 앱에서 한 번에 처리 가능해요.",
    tip: "신탁형은 은행에서, 일임형은 증권사에서 개설",
  },
  {
    title: "의무가입 기간 3년을 채우세요",
    desc: "ISA는 최소 3년을 유지해야 비과세 혜택을 받아요. 중도해지하면 비과세 혜택이 사라지고 일반 과세로 정산돼요. 3년이 지나도 계속 유지할 수 있어요.",
    tip: "3년 채우면 해지 후 재가입도 가능",
  },
];

const FAQS = [
  {
    q: "중개형과 신탁형 둘 다 만들 수 있나요?",
    a: "안 돼요. ISA는 1인 1계좌예요. 중개형이냐 신탁형이냐 하나만 선택해야 해요. 바꾸려면 기존 계좌를 해지하고 새로 개설해야 하는데, 의무가입 기간 3년이 리셋돼요.",
  },
  {
    q: "서민형 조건이 안 되면 어떻게 하나요?",
    a: "자동으로 일반형이 돼요. 소득 5,000만원을 초과하면 일반형으로 개설되고 비과세 한도가 200만원이에요. 나중에 소득이 줄어도 서민형으로 자동 전환되지 않아요.",
  },
  {
    q: "주식 잘 모르는데 중개형 괜찮을까요?",
    a: "괜찮아요. 중개형으로 개설하고 ETF(KODEX 200, TIGER 미국S&P500 등)만 사도 돼요. 개별 주식을 안 해도 되고, ETF는 분산투자 효과가 있어서 초보자한테도 적합해요.",
  },
  {
    q: "3년 안에 해지하면 세금을 다 토해내나요?",
    a: "비과세 혜택만 사라져요. 수익에 대해 15.4% 일반 과세로 정산돼요. 원금 손실은 없지만 세금 혜택을 못 받으니까 손해예요.",
  },
  {
    q: "연금저축펀드랑 ISA 뭐가 다른 건가요?",
    a: "연금저축은 세액공제(납입액의 13.2~16.5%) 혜택이 핵심이고 55세 이후에 인출해요. ISA는 수익에 대한 비과세(200~400만원)가 핵심이고 3년 후 자유롭게 인출 가능해요. 둘 다 하는 게 가장 유리해요.",
  },
  {
    q: "ISA 계좌에서 손실 나면 세금은 어떻게 되나요?",
    a: "손익통산이 돼요. A 종목에서 100만원 수익, B 종목에서 50만원 손실이면 순수익 50만원에 대해서만 과세해요. 일반 계좌에서는 이게 안 돼서 ISA가 유리해요.",
  },
];

const SOURCES = [
  { name: "금융위원회", href: "https://www.fsc.go.kr" },
  { name: "금융감독원", href: "https://www.fss.or.kr" },
  { name: "국세청 홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "납입 한도와 공제율 정리." },
  { slug: "ETF-투자-초보자", title: "ETF 투자 초보자 가이드", description: "처음 시작하는 ETF 투자법." },
  { slug: "CMA계좌-금리-혜택", title: "CMA 계좌 금리 혜택", description: "파킹통장 대안 CMA 비교." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>ISA · 절세 · 투자계좌</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        ISA 계좌 중개형 vs 신탁형, 서민형 vs 일반형<br />
        내 상황에 맞는 유형 선택법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "ISA 만들라는데 종류가 너무 많아요. 뭘 골라야 해요?"
      </p>
      <p style={body}>
        ISA 계좌는 두 가지를 동시에 선택해야 해요. <strong>운용 방식</strong>(중개형/신탁형/일임형)과 <strong>소득 기준</strong>(일반형/서민형)이에요.
        대부분은 <strong>중개형 + 서민형</strong> 조합이 가장 유리해요.
        서민형은 비과세 한도가 400만원으로 일반형(200만원)보다 2배 많거든요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중개형·신탁형·일임형, 뭐가 다른 건가요?</H2>
      <p style={body}>
        핵심은 "누가 투자를 결정하느냐"예요. 내가 직접 하면 중개형, 은행이 하면 신탁형, 전문가가 하면 일임형이에요.
      </p>

      <SectionBadge>운용 방식 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>중개형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>신탁형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>일임형</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["운용 주체", "본인 직접", "은행", "증권사 전문가"],
              ["투자 대상", "주식, ETF, 펀드", "펀드, 예금", "전문가 포트폴리오"],
              ["수수료", "0.1~0.3%", "0.3~0.5%", "0.5~1.0%"],
              ["개설 기관", "증권사", "은행", "증권사"],
              ["추천 대상", "주식 경험자", "투자 초보", "바쁜 직장인"],
            ].map(([label, a, b, c], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{a}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{b}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        주식을 직접 사고 싶다면 → 중개형{"\n"}
        잘 모르겠고 안전하게 하고 싶다면 → 신탁형{"\n"}
        ETF만 살 거라도 중개형이 수수료 면에서 유리해요
      </GreenBox>

      <CategoryButton label="금융 정보" count={8} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>서민형과 일반형, 비과세 한도가 2배 차이예요</H2>
      <p style={body}>
        소득 기준에 따라 비과세 한도가 달라져요. 서민형은 수익 400만원까지 세금 0원, 일반형은 200만원까지만 비과세예요.
        같은 수익이라도 서민형이면 세금을 절반 이하로 줄일 수 있죠.
      </p>

      <SectionBadge>소득 기준별 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>일반형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>서민형</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["소득 조건", "제한 없음", "근로 5,000만원 이하"],
              ["비과세 한도", "200만원", "400만원"],
              ["초과분 세율", "9.9%", "9.9%"],
              ["납입 한도", "연 2,000만원", "연 2,000만원"],
            ].map(([label, general, special], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{general}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{special}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        수익 500만원이 났다고 가정할게요. 서민형이면 400만원 비과세 + 100만원에 9.9% = 세금 9.9만원이에요.
        일반형이면 200만원 비과세 + 300만원에 9.9% = 세금 29.7만원이에요. <strong>19.8만원 차이</strong>가 나죠.
      </p>

      <Divider />

      <H2>서민형 자격이 되나요?</H2>
      <p style={body}>
        아래 항목을 모두 충족하면 서민형으로 개설할 수 있어요.
        소득 기준은 직전 과세기간(2025년) 기준이에요.
      </p>

      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="서민형(비과세 400만원)으로 개설할 수 있어요!"
        partialMatchText="일부 조건이 맞지 않으면 일반형(비과세 200만원)으로 개설돼요."
      />

      <Divider />

      <H2>ISA 개설은 어떤 순서로 하나요?</H2>
      <p style={body}>
        중개형 기준으로 증권사 앱에서 10분이면 끝나요. 서민형 신청 시 소득확인증명서가 필요하니까 홈택스에서 먼저 발급받으세요.
      </p>

      <SectionBadge>개설 3단계</SectionBadge>
      <Steps steps={STEPS} />

      <BorderBox title="주의">
        한 번 선택한 운용방식(중개형→신탁형)은 변경이 안 돼요.
        해지 후 재개설해야 하고, 의무가입 기간 3년이 처음부터 다시 시작돼요.
        처음 선택을 신중하게 하세요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 ISA 제도로 작성됐어요. 비과세 한도나 납입 한도는 정책 변경에 따라 달라질 수 있어요." />
    </ArticleLayout>
  );
}
