"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     연말정산 앞두고 IRP에 얼마까지 넣어야 세금을 최대한 돌려받는지 계산하려는 직장인
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     내 총급여 구간에 맞춰 IRP·연금저축 납입 금액을 결정하고 실행한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     IRP 단독 900만원 한도, 연금저축 합산 구조, 총급여별 공제율 차이(16.5%/13.2%), 퇴직금 이체분 제외, 초과 납입 시 비공제
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     GreenBox로 핵심 한도 수치 + DocTable로 소득별 환급액 비교 + Steps로 연말정산 신청 절차

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const REFUND_TABLE = {
  headers: ["총급여", "공제율", "300만원 납입", "600만원 납입", "900만원 납입"],
  rows: [
    ["5,500만원 이하", "16.5%", "49만 5천원", "99만원", "148만 5천원"],
    ["5,500만원 초과", "13.2%", "39만 6천원", "79만 2천원", "118만 8천원"],
  ],
};

const COMBO_TABLE = {
  headers: ["조합", "연금저축", "IRP", "합계", "비고"],
  rows: [
    ["조합 1", "600만원", "300만원", "900만원", "가장 일반적"],
    ["조합 2", "400만원", "500만원", "900만원", "IRP 비중 높임"],
    ["조합 3", "0원", "900만원", "900만원", "IRP 단독"],
    ["조합 4", "600만원", "0원", "600만원", "연금저축 단독 (300만원 손해)"],
  ],
};

const APPLY_STEPS = [
  { title: "홈택스 간소화 서비스 접속", desc: "매년 1월 15일 이후 홈택스에서 연말정산 간소화 서비스가 열려요." },
  { title: "연금계좌 항목 확인", desc: "IRP 납입액이 자동으로 조회돼요. 금융회사에서 국세청에 이미 제출한 자료예요." },
  { title: "PDF 다운로드 후 회사 제출", desc: "간소화 자료 PDF를 다운받아서 회사에 제출하면 끝이에요." },
];

const FAQS = [
  { q: "IRP만 900만원 넣으면 전부 공제되나요?", a: "네. IRP 단독으로 900만원까지 세액공제 가능해요. 연금저축 없이 IRP만 써도 한도를 꽉 채울 수 있어요." },
  { q: "연금저축 600만원 + IRP 400만원 넣으면요?", a: "합산 한도가 900만원이라서 1,000만원 중 100만원은 공제 안 돼요. 연금저축 600만원 + IRP 300만원이 딱 맞는 조합이에요." },
  { q: "퇴직금을 IRP로 이체하면 공제되나요?", a: "안 돼요. 퇴직금 이체분은 이미 과세이연 혜택을 받고 있어서 세액공제 대상이 아니에요. 본인이 추가로 넣은 금액만 공제돼요." },
  { q: "900만원 넘게 넣으면 어떻게 되나요?", a: "넘는 금액은 세액공제가 안 될 뿐이에요. 적립은 되지만 세금 혜택은 없어요." },
  { q: "12월에 넣어도 그해 연말정산에 반영되나요?", a: "네. 12월 31일까지 납입한 금액은 해당 연도 연말정산에 포함돼요. 한도 안 채웠으면 연말 전에 추가 납입하는 게 유리해요." },
  { q: "세액공제 받고 55세 전에 해지하면요?", a: "기타소득세 16.5%를 내야 해요. 세액공제로 돌려받은 금액을 토해내는 셈이라 장기 운용할 각오가 아니면 넣지 않는 게 나아요." },
];

const SOURCES = [
  { name: "국세청 연금계좌 세액공제", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6439" },
  { name: "소득세법 제59조의3", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스 연말정산 간소화", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "IRP-중도인출-조건", title: "IRP 중도인출, 55세 전에 빼는 6가지 사유", description: "급하게 돈이 필요할 때 IRP에서 인출하는 조건." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "IRP와 조합하는 최적 납입 전략." },
  { slug: "연말정산-IRP-세액공제", title: "연말정산 IRP 세액공제 절차", description: "IRP로 연말정산 환급받는 전체 흐름." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · IRP · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        IRP 세액공제 한도, 얼마까지 공제받나?<br />
        연금저축 합산 구조와 환급액 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "IRP에 돈 넣으면 연말정산 때 돌려받는다는데, 정확히 얼마까지 넣어야 하죠?" 연말정산 준비하면서 가장 많이 하는 질문이에요.
      </p>
      <p style={body}>
        핵심은 이거예요. <strong>연금저축 + IRP 합산 연 900만원</strong>이 한도이고, 총급여 5,500만원 이하면 <strong>최대 148만 5천원</strong>을 돌려받아요.{" "}
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6439" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 연말정산 안내</a>에서 공식적으로 안내하는 수치예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 핵심 한도 구조 */}
      <H2>IRP 세액공제 한도, 핵심 구조</H2>
      <p style={body}>
        IRP(개인형 퇴직연금)에 납입하면 <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의3</a>에 따라 세액공제를 받아요. 한도는 연금저축과 합산해서 정해져요.
      </p>

      <GreenBox>
        IRP 단독: 최대 900만원까지 세액공제{"\n"}
        연금저축 단독: 최대 600만원까지 세액공제{"\n"}
        연금저축 + IRP 합산: 최대 900만원{"\n"}
        (연금저축 600만 + IRP 300만 = 900만원 최적 조합)
      </GreenBox>

      <p style={body}>
        연금저축만 900만원 넣으면 안 돼요. 연금저축은 600만원이 상한이라 300만원은 공제가 안 되거든요. 그 300만원을 IRP로 채워야 900만원 한도를 전부 쓸 수 있어요.
      </p>

      <CategoryButton label="세금 정보" count={12} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 소득별 환급액 */}
      <H2>내 연봉에서 실제로 얼마 돌아오나요?</H2>
      <p style={body}>
        총급여 5,500만원을 기준으로 공제율이 달라져요. 같은 금액을 넣어도 소득이 낮을수록 더 많이 돌려받아요.
      </p>

      <SectionBadge>총급여별 환급액 (2025년 귀속 기준)</SectionBadge>
      <DocTable headers={REFUND_TABLE.headers} rows={REFUND_TABLE.rows} />

      <p style={body}>
        여기서 &lsquo;총급여&rsquo;는 세전 연봉에서 비과세 소득을 뺀 금액이에요. 대략 연봉 6,000만원 정도가 총급여 5,500만원 기준이라고 보면 돼요. 소득이 낮을수록 공제율이 높으니까, 연봉 4,000만원대 직장인한테 IRP가 특히 유리해요.
      </p>

      <Divider />

      {/* H2-3: 연금저축과 조합 */}
      <H2>연금저축이랑 어떻게 나눠서 넣어야 하죠?</H2>
      <p style={body}>
        어떻게 조합하든 합계 900만원이 한도예요. 다만 투자 유연성과 중도인출 자유도가 다르기 때문에 본인 상황에 맞게 조합하는 게 좋아요.
      </p>

      <SectionBadge>연금저축 + IRP 조합표</SectionBadge>
      <DocTable headers={COMBO_TABLE.headers} rows={COMBO_TABLE.rows} />

      <p style={body}>
        연금저축은 ETF 직접 투자가 가능하고 중도인출이 상대적으로 자유로워요. IRP는 위험자산 70% 제한이 있지만 퇴직금 이체가 가능하죠. 가장 많이 쓰는 조합은 연금저축 600만원 + IRP 300만원이에요.
      </p>

      <Divider />

      {/* H2-4: 주의사항 */}
      <H2>이것만은 꼭 알아두세요</H2>

      <BorderBox>
        <strong>퇴직금 이체분은 세액공제 대상이 아니에요</strong><br />
        회사에서 퇴직금을 IRP로 이체해도 그 금액은 이미 과세이연 혜택을 받고 있어서 세액공제와 별개예요. 오직 본인이 추가로 넣는 금액만 공제 대상이에요.
      </BorderBox>

      <p style={body}>
        세액공제 받은 돈을 55세 전에 빼면 기타소득세 16.5%를 토해내야 해요. 노후 자금으로 묶어둘 각오 없이 넣으면 오히려 손해예요. 급한 돈이 필요하면{" "}
        <a href="/w/IRP-중도인출-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 중도인출 조건</a>을 먼저 확인해보세요.
      </p>

      <Divider />

      {/* H2-5: 연말정산 신청 절차 */}
      <H2>연말정산에서 IRP 공제 받는 절차</H2>
      <p style={body}>
        별도로 서류를 준비할 필요가 없어요. 금융회사에서 국세청에 납입 내역을 자동으로 제출하기 때문에{" "}
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 간소화 서비스에서 바로 확인할 수 있어요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        12월 31일까지 넣은 금액이 해당 연도에 반영돼요. 한도를 아직 안 채웠다면 연말 전에 추가 납입하는 게 유리해요.
      </p>

      <Divider />

      {/* FAQ */}
      <H2>IRP 세액공제, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 소득세법과 국세청 안내를 바탕으로 작성했어요. 공제율과 한도는 법 개정에 따라 달라질 수 있으니 최신 정보는 국세청(126)이나 홈택스에서 확인해보세요." />
    </ArticleLayout>
  );
}
