"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     연말정산 준비 중인 직장인이 IRP로 세액공제를 받으려는데 구체적인 절차와 주의사항을 알고 싶어 하는 상황
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     연말정산 전에 IRP 추가 납입 여부를 결정하고, 홈택스에서 세액공제 신청을 완료한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     공제율 16.5%/13.2%, 연금저축 합산 900만원 한도, 퇴직금 이체분 제외, 12월 납입도 반영, 중도해지 페널티, 연금 수령 시 낮은 세율
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     GreenBox로 핵심 환급액 + Steps로 연말정산 절차 + DocTable로 IRP vs 연금저축 비교 + BorderBox로 주의사항

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const REFUND_TABLE = {
  headers: ["총급여", "공제율", "IRP 300만원", "IRP 600만원", "IRP 900만원"],
  rows: [
    ["5,500만원 이하", "16.5%", "49만 5천원", "99만원", "148만 5천원"],
    ["5,500만원 초과", "13.2%", "39만 6천원", "79만 2천원", "118만 8천원"],
  ],
};

const COMPARE_TABLE = {
  headers: ["항목", "연금저축", "IRP"],
  rows: [
    ["단독 세액공제 한도", "600만원", "900만원"],
    ["합산 한도", "900만원 (연금저축 + IRP)", "900만원 (연금저축 + IRP)"],
    ["위험자산 투자 한도", "제한 없음 (100%)", "70%까지"],
    ["중도인출", "비교적 자유", "법정 사유만 가능"],
    ["퇴직금 이체", "불가", "가능"],
    ["공제율", "동일 (16.5% / 13.2%)", "동일 (16.5% / 13.2%)"],
  ],
};

const APPLY_STEPS = [
  { title: "IRP 납입 완료 (12월 31일까지)", desc: "세액공제 한도 900만원 중 남은 금액이 있으면 12월 안에 추가 납입해요. 연금저축과 합산이에요.", tip: "12월 31일 납입분도 해당 연도에 반영돼요" },
  { title: "홈택스 간소화 서비스 확인 (1월 15일~)", desc: "금융회사가 국세청에 납입 내역을 자동 제출해서 간소화 서비스에서 바로 조회돼요." },
  { title: "연금계좌 세액공제 항목 확인", desc: "홈택스에서 '연금계좌' 항목을 열면 IRP와 연금저축 납입액이 나와요. 금액이 맞는지 확인하세요." },
  { title: "PDF 다운로드 후 회사 제출", desc: "간소화 자료 PDF를 다운받아 회사에 제출하면 끝이에요. 별도 서류 준비 필요 없어요." },
];

const FAQS = [
  { q: "IRP만으로 900만원 공제 가능한가요?", a: "네. IRP 단독으로 900만원까지 세액공제 가능해요. 연금저축 없이 IRP만 써도 한도를 전부 채울 수 있어요." },
  { q: "연금저축이랑 IRP 둘 다 넣고 있는데요?", a: "합산 900만원이 한도예요. 연금저축 600만원 + IRP 300만원 조합이 가장 일반적이에요. 연금저축은 ETF 투자가 자유롭고, IRP는 퇴직금 이체가 가능하거든요." },
  { q: "퇴직금을 IRP로 이체하면 공제되나요?", a: "안 돼요. 퇴직금 이체분은 이미 과세이연 혜택을 받고 있어서 세액공제 대상이 아니에요. 본인이 추가로 넣은 금액만 돼요." },
  { q: "중도에 빼면 어떻게 되나요?", a: "기타소득세 16.5%가 붙어요. 연금으로 받으면 3.3~5.5%인데, 중도 인출은 3배 이상 세금을 내는 셈이에요. 장기 운용 각오가 아니면 넣지 마세요." },
  { q: "55세 이후 연금으로 받을 때 세율이 어떻게 되나요?", a: "55~69세는 5.5%, 70~79세는 4.4%, 80세 이상은 3.3%예요. 10년 이상 나눠 받으면 이 낮은 세율이 적용돼요." },
  { q: "연말에 급하게 넣어도 되나요?", a: "네. 12월 31일까지 납입하면 해당 연도 연말정산에 반영돼요. 공제 한도를 아직 안 채웠다면 연말 전에 추가 납입하는 게 유리해요." },
];

const SOURCES = [
  { name: "국세청 연말정산 연금계좌 세액공제", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6439" },
  { name: "소득세법 제59조의3", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스 연말정산 간소화", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "IRP-세액공제-한도", title: "IRP 세액공제 한도 구조", description: "연금저축과 합산 900만원 한도의 최적 조합." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "연금저축 단독 600만원 한도와 IRP 조합 전략." },
  { slug: "IRP-중도인출-조건", title: "IRP 중도인출 6가지 조건", description: "급할 때 55세 전에 IRP에서 돈 빼는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · IRP · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 IRP 세액공제, 얼마 돌려받나?<br />
        공제율부터 신청 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP에 돈을 넣으면 연말정산 때 세금을 돌려받는다는 건 알겠는데, 구체적으로 얼마를 넣어야 하고 어떻게 신청하는 건지 헷갈리죠.
      </p>
      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6439" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 연말정산 안내</a>에 따르면 IRP에 <strong>900만원 넣으면 최대 148만 5천원</strong>을 돌려받아요. 연이자 16.5%짜리 적금이라고 생각하면 돼요. 어떤 금융상품보다 확실한 수익률이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 환급액 */}
      <H2>IRP로 실제 얼마를 돌려받나요?</H2>
      <p style={body}>
        세액공제라서 계산이 간단해요. 납입 금액에 공제율을 곱하면 환급액이 나와요. 총급여 5,500만원을 기준으로 공제율이 달라져요.
      </p>

      <SectionBadge>IRP 납입금별 환급액 (2025년 귀속 기준)</SectionBadge>
      <DocTable headers={REFUND_TABLE.headers} rows={REFUND_TABLE.rows} />

      <p style={body}>
        900만원 x 16.5% = 148만 5천원이에요. 월 75만원씩 저축하면 연말정산 때 148만원이 돌아오는 셈이죠. 실질 부담은 월 약 63만원이에요.
      </p>

      <GreenBox>
        총급여 5,500만원 이하: 900만원 납입 → 148만 5천원 환급{"\n"}
        총급여 5,500만원 초과: 900만원 납입 → 118만 8천원 환급{"\n"}
        (연금저축과 합산 900만원 한도)
      </GreenBox>

      <CategoryButton label="연말정산 정보" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 연금저축과 비교 */}
      <H2>IRP랑 연금저축이랑 뭐가 다른가요?</H2>
      <p style={body}>
        세액공제 효과는 똑같아요. 공제율도 같고, 합산 한도 900만원도 같아요. 차이는 투자 방식과 중도인출에 있어요.
      </p>

      <SectionBadge>IRP vs 연금저축 비교</SectionBadge>
      <DocTable headers={COMPARE_TABLE.headers} rows={COMPARE_TABLE.rows} />

      <p style={body}>
        연금저축 600만원을 먼저 채우고 IRP로 300만원을 추가하는 조합이 가장 효율적이에요. 연금저축이 ETF 직접 투자 등 운용이 자유롭기 때문이에요. 반대로 IRP는 퇴직금 수령 통로로 쓸 수 있다는 장점이 있어요.
      </p>

      <Divider />

      {/* H2-3: 주의사항 */}
      <H2>이것만은 꼭 알아두세요</H2>

      <BorderBox>
        <strong>퇴직금 이체분은 세액공제 대상이 아니에요</strong><br />
        회사에서 IRP로 보낸 퇴직금은 이미 과세이연 혜택을 받고 있어요. 세액공제는 본인이 추가로 넣은 금액에만 적용돼요.
      </BorderBox>

      <p style={body}>
        55세 전에 해지하면 기타소득세 16.5%가 붙어요. 연금으로 받으면 3.3~5.5%인데 3배 이상 차이 나는 거예요. 급한 돈이 필요하면{" "}
        <a href="/w/IRP-중도인출-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 중도인출 조건</a>을 먼저 확인해보세요. 무주택 주택구입, 장기요양 등 법정 사유면 불이익 없이 인출 가능하거든요.
      </p>

      <GreenBox>
        연금 수령 시 세율 (10년 이상 분할 수령):{"\n"}
        55~69세: 5.5% / 70~79세: 4.4% / 80세 이상: 3.3%{"\n"}
        중도 인출 시: 기타소득세 16.5% (3배 이상 차이)
      </GreenBox>

      <Divider />

      {/* H2-4: 연말정산 절차 */}
      <H2>연말정산에서 IRP 세액공제 받는 절차</H2>
      <p style={body}>
        별도 서류 필요 없어요. 금융회사가 국세청에 자동으로 제출하기 때문에{" "}
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 간소화 서비스에서 바로 확인할 수 있어요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <Divider />

      {/* FAQ */}
      <H2>연말정산 IRP, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 소득세법과 국세청 안내를 바탕으로 작성했어요. 공제율과 한도는 법 개정에 따라 달라질 수 있으니 최신 정보는 국세청(126)이나 홈택스에서 확인해보세요." />
    </ArticleLayout>
  );
}
