"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     연말정산 시즌에 급여명세서를 보며 총급여가 뭔지, 비과세가 뭔지 헷갈리는 직장인
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     급여명세서에서 총급여·비과세 항목을 구분하고, 연말정산에서 자기 과세표준을 파악한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     급여 구성(기본급+수당+상여), 비과세 항목(식대 20만원, 자가운전 20만원, 연장수당 240만원), 총급여-비과세=과세대상 급여, 과세표준 계산 흐름
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     GreenBox로 핵심 공식 + DocTable로 비과세 항목 정리 + Steps로 확인 절차 + BorderBox로 주의사항

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const NONTAX_TABLE = {
  headers: ["항목", "월 한도", "연간 한도", "비고"],
  rows: [
    ["식대", "20만원", "240만원", "2023년부터 10→20만원 상향"],
    ["자가운전보조금", "20만원", "240만원", "본인 차량 업무 사용"],
    ["출산·보육수당", "20만원", "240만원", "6세 이하 자녀"],
    ["연장·야간·휴일수당", "240만원", "2,880만원", "생산직·월 210만원 이하"],
    ["학자금", "비과세", "-", "사내근로복지기금"],
    ["국외근로소득", "월 100~300만원", "-", "근무지역별 차등"],
  ],
};

const CHECK_STEPS = [
  { title: "급여명세서에서 '지급총액' 확인", desc: "기본급 + 각종 수당 + 상여금을 합친 세전 금액이에요. 매월 받는 급여명세서 상단에 나와요.", tip: "12월 급여명세서에 연간 누계가 표시되는 경우가 많아요" },
  { title: "비과세 항목 분리", desc: "식대, 자가운전보조금, 출산수당 등을 빼요. 급여명세서에 '비과세'로 구분 표시되어 있어요." },
  { title: "총급여액 계산", desc: "지급총액에서 비과세 소득을 빼면 총급여액이에요. 이게 연말정산의 출발점이죠." },
  { title: "원천징수영수증에서 최종 확인", desc: "1월에 회사에서 발급하는 근로소득 원천징수영수증에 총급여, 비과세, 과세표준이 정리돼 있어요." },
];

const FAQS = [
  { q: "총급여와 연봉이 같은 건가요?", a: "아니에요. 연봉에서 비과세 소득을 빼면 총급여예요. 연봉 4,000만원이라도 비과세가 많으면 총급여는 3,600만원일 수 있어요." },
  { q: "상여금도 총급여에 포함되나요?", a: "네. 성과급, 명절상여, 인센티브 전부 포함돼요. 비과세 요건을 충족하지 않는 한 과세 대상이에요." },
  { q: "식대 20만원은 꼭 밥 먹어야 비과세인가요?", a: "아니에요. 회사에서 급여로 식대를 지급하면 월 20만원까지 비과세예요. 실제 식사 여부와 무관해요." },
  { q: "4대보험료는 총급여에서 빼나요?", a: "아니에요. 4대보험료는 총급여 산정 시 빼지 않아요. 대신 소득공제 단계에서 국민연금을 빼죠." },
  { q: "퇴직금은 급여에 포함되나요?", a: "아니에요. 퇴직금은 퇴직소득으로 별도 과세돼요. 연말정산의 근로소득에는 포함되지 않아요." },
  { q: "프리랜서 소득이 있으면 어떻게 되나요?", a: "프리랜서 소득은 사업소득이라 연말정산 대상이 아니에요. 5월 종합소득세 때 합산 신고해야 해요." },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
  { name: "소득세법 제20조 (근로소득)", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "소득세법 제12조 (비과세소득)", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-세율표", title: "연말정산 세율표", description: "과세표준 구간별 세율 6~45% 확인." },
  { slug: "연말정산-식대-비과세", title: "연말정산 식대 비과세", description: "월 20만원 비과세 적용 조건." },
  { slug: "연말정산-세액공제", title: "연말정산 세액공제 항목", description: "의료비, 교육비, 기부금 등 세액공제 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 급여 · 총급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 급여, 내 총급여는 얼마일까?<br />
        비과세 항목부터 과세표준까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급여명세서에 적힌 숫자가 많은데, 연말정산에서 말하는 '총급여'가 정확히 뭔지 헷갈리죠.
      </p>
      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 연말정산 안내</a>에 따르면 총급여란 연간 급여 합계에서 비과세 소득을 뺀 금액이에요. 이 총급여가 세율 구간을 결정하고, 각종 공제 한도에도 영향을 미쳐요. 비과세 항목 하나 놓치면 수십만원 차이가 날 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>급여 구성, 뭐가 뭔지 정리해볼게요</H2>
      <p style={body}>
        급여는 기본급만 있는 게 아니에요. 기본급에 직책수당, 근속수당, 연장수당 같은 각종 수당이 붙고, 상여금과 성과급까지 더해져요. 이 전부를 합친 게 '연간 급여 합계'예요.
      </p>

      <GreenBox>
        연간 급여 합계 - 비과세 소득 = 총급여액{"\n"}
        총급여액 - 근로소득공제 = 근로소득금액{"\n"}
        근로소득금액 - 소득공제 = 과세표준{"\n"}
        과세표준 x 세율 - 세액공제 = 결정세액
      </GreenBox>

      <p style={body}>
        연말정산의 시작은 이 총급여를 정확히 아는 거예요. 총급여가 5,500만원인지 7,000만원인지에 따라 <a href="/w/연말정산-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>세액공제</a> 공제율이 달라지거든요.
      </p>

      <CategoryButton label="연말정산 정보" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>비과세 항목, 빠짐없이 챙기고 있나요?</H2>
      <p style={body}>
        비과세 소득은 세금을 안 매기는 급여예요. 이걸 제대로 적용해야 총급여가 낮아지고, 세금 부담이 줄어요. 대표적인 비과세 항목을 정리하면 이래요.
      </p>

      <SectionBadge>주요 비과세 항목 (2025년 귀속)</SectionBadge>
      <DocTable headers={NONTAX_TABLE.headers} rows={NONTAX_TABLE.rows} />

      <p style={body}>
        <a href="/w/연말정산-식대-비과세" style={{ color: "#1D9E75", textDecoration: "underline" }}>식대 비과세</a>는 2023년부터 월 10만원에서 20만원으로 올랐어요. 연간 240만원이 비과세되니 총급여가 그만큼 줄어드는 거죠.
      </p>

      <BorderBox>
        <strong>비과세 빠뜨리면 세금 더 내요</strong><br />
        회사에서 비과세 처리를 안 해줬다면 경정청구로 5년 이내 돌려받을 수 있어요. 급여명세서에 비과세 항목이 제대로 표시되어 있는지 꼭 확인하세요.
      </BorderBox>

      <Divider />

      <H2>내 총급여, 어떻게 확인하나요?</H2>
      <p style={body}>
        급여명세서만 봐서는 총급여를 바로 알기 어려워요. 비과세 항목을 정확히 빼야 하거든요. 아래 순서대로 확인하면 돼요.
      </p>

      <Steps steps={CHECK_STEPS} />

      <p style={body}>
        홈택스에서 <a href="/w/연말정산-간소화서비스-이용방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>간소화서비스</a>를 이용하면 회사가 신고한 급여 내역도 조회할 수 있어요.
      </p>

      <Divider />

      <H2>총급여 구간별로 뭐가 달라지나요?</H2>
      <p style={body}>
        총급여 금액에 따라 공제율과 한도가 크게 달라져요. 주요 기준점을 알아두면 절세 전략을 세우기 좋아요.
      </p>

      <GreenBox>
        총급여 5,500만원 이하 → 연금저축 공제율 16.5%, 월세 공제율 17%{"\n"}
        총급여 5,500만원 초과 → 연금저축 공제율 13.2%, 월세 공제율 15%{"\n"}
        총급여 7,000만원 초과 → 신용카드 공제 한도 축소, 월세 공제율 12%{"\n"}
        총급여 1억 2천만원 초과 → 근로소득공제 한도 적용
      </GreenBox>

      <p style={body}>
        5,500만원 경계에 있다면 <a href="/w/연말정산-연금저축" style={{ color: "#1D9E75", textDecoration: "underline" }}>연금저축</a> 공제율이 16.5%냐 13.2%냐에 따라 환급액이 달라져요. 비과세 항목을 꼼꼼히 챙겨서 총급여를 낮추는 게 첫 번째 절세 전략이에요.
      </p>

      <Divider />

      <H2>연말정산 급여, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 소득세법과 국세청 안내를 바탕으로 작성했어요. 비과세 한도와 공제율은 법 개정에 따라 달라질 수 있으니 최신 정보는 국세청(126)이나 홈택스에서 확인해보세요." />
    </ArticleLayout>
  );
}
