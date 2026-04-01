"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 개인사업자인데 퇴직연금 가입이 되는지, 세금 혜택은 뭔지 궁금한 상황
// Q2. IRP 가입 여부를 판단하고, 세액공제 한도를 확인해서 가입 신청한다
// Q3. IRP 가입 자격, 세액공제 한도(900만원), 공제율(16.5%/13.2%), 가입 방법, 수령 조건
// Q4. GreenBox(세액공제 핵심) + Steps(가입 절차) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DATA = [
  { title: "IRP 계좌 개설", desc: "은행·증권사·보험사에서 IRP 계좌를 개설해요. 비대면으로도 가능하고, 수수료와 운용 상품을 비교해서 선택하세요." },
  { title: "연간 납입 계획 수립", desc: "연금저축과 IRP를 합쳐 연 900만원까지 세액공제를 받을 수 있어요. 한꺼번에 넣어도 되고 분할 납입도 가능해요." },
  { title: "운용 상품 선택", desc: "예·적금, 펀드, ETF 등으로 운용해요. IRP는 위험자산(주식형 등) 비중이 70%까지 제한돼요." },
  { title: "55세 이후 연금 수령", desc: "가입 후 5년 이상, 만 55세 이후부터 연금으로 수령하면 퇴직소득세 30~40% 감면 혜택을 받아요." },
];

const FAQS = [
  { q: "개인사업자도 IRP에 가입할 수 있나요?", a: "네. 소득이 있는 사람이면 누구나 가입 가능해요. 직장인, 자영업자, 프리랜서 모두 돼요." },
  { q: "세액공제 한도가 900만원인가요?", a: "연금저축(600만원 한도)과 IRP를 합쳐서 연 900만원까지 세액공제를 받아요. 연금저축에 600만원 넣고 IRP에 300만원 넣으면 합계 900만원이에요." },
  { q: "세액공제율은 어떻게 되나요?", a: "종합소득 5,500만원 이하면 16.5%, 초과하면 13.2%예요. 900만원 납입 시 최대 148.5만원(16.5%) 또는 118.8만원(13.2%)을 돌려받아요." },
  { q: "중도에 꺼내면 어떻게 되나요?", a: "중도 해지하면 세액공제 받은 금액에 대해 기타소득세 16.5%를 내야 해요. 운용 수익도 과세돼요. 가능하면 55세까지 유지하는 게 좋아요." },
  { q: "연금저축과 IRP 중 뭐가 나은가요?", a: "세액공제만 보면 둘 다 같아요. IRP는 운용 상품이 더 다양하지만 위험자산 70% 제한이 있어요. 연금저축은 100% 주식형 펀드도 가능해요. 둘 다 활용하는 게 가장 유리해요." },
  { q: "사업이 어려워지면 납입을 중단해도 되나요?", a: "네. IRP는 의무 납입이 아니에요. 여유가 있을 때 넣고, 어려울 때는 안 넣어도 돼요. 계좌 유지비도 없는 곳이 대부분이에요." },
];

const SOURCES = [
  { name: "소득세법 제59조의3", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "금융감독원 퇴직연금 안내", href: "https://www.fss.or.kr" },
];

const RELATED = [
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "연금저축 세액공제 한도와 활용법." },
  { slug: "중개형-IRP-장점-수수료-투자-상품", title: "중개형 IRP 장점과 수수료", description: "IRP 종류별 수수료와 운용 상품 비교." },
  { slug: "퇴직연금-ETF-운용", title: "퇴직연금 ETF 운용", description: "IRP에서 ETF 투자하는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연금 · 퇴직연금 · 세액공제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        개인사업자도 퇴직연금 가입되나?<br />
        IRP 세액공제 한도와 가입 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직장인만 퇴직연금 가입하는 거 아니냐고요? 개인사업자도 IRP에 가입해서 연 최대 148만원 세금을 돌려받을 수 있어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라 소득이 있는 사람이면 누구나 IRP(개인형퇴직연금)에 가입할 수 있어요. 연금저축과 합쳐 연 900만원까지 세액공제를 받을 수 있고요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>세액공제 혜택부터 확인하세요</H2>
      <p style={body}>개인사업자 IRP의 핵심은 세액공제예요.</p>
      <GreenBox title="IRP 세액공제 핵심">
        납입 한도: 연금저축 + IRP 합계 연 900만원{"\n"}
        공제율: 종합소득 5,500만원 이하 16.5% / 초과 13.2%{"\n"}
        최대 환급: 148.5만원 (900만원 × 16.5%){"\n"}
        수령 조건: 만 55세 이후 + 가입 5년 이상 → 연금소득세 3.3~5.5%
      </GreenBox>
      <p style={body}>직장인과 달리 개인사업자는 종합소득세 신고 시 세액공제를 적용해요. 5월 종소세 신고에서 반영되니 연말이 아니라 5월에 혜택을 받죠.</p>

      <CategoryButton label="연금 정보" count={8} href="/category/연금" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>가입부터 수령까지 절차</H2>
      <p style={body}>IRP 가입은 간단해요.</p>
      <SectionBadge>IRP 가입 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <Divider />

      <H2>가입 전 알아둘 주의사항</H2>
      <p style={body}>세액공제가 좋지만, 몇 가지 제약이 있어요.</p>
      <BorderBox>
        <strong>IRP 주의사항</strong><br />
        중도 해지 시 세액공제 받은 금액 + 운용수익에 16.5% 기타소득세{"\n"}<br />
        위험자산(주식형 펀드·ETF) 비중 70% 제한{"\n"}<br />
        55세 이전 인출은 원칙적 불가 (예외: 무주택자 주택구입 등){"\n"}<br />
        연금 수령 한도 초과분은 기타소득세 16.5% 과세
      </BorderBox>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>개인사업자 퇴직연금에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성했어요. 세액공제 한도와 공제율은 세법 개정에 따라 달라질 수 있으니, 국세청(nts.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
