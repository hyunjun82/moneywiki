"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 수도권 내 집 마련을 고민하는 무주택자가 정부 공급대책 소식 듣고 내 청약 기회가 되는지 알고 싶은 상황
// Q2. 129 대책 주요 지역·물량을 파악하고 청약 준비를 시작한다
// Q3. 지역별 공급 물량(용산 1만, 과천 9,800), 공급 일정(2027착공), 청약 준비 요건
// Q4. 지역별 물량 테이블 + Steps(청약 준비) + Checklist + GreenBox(핵심 요약) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "청약통장부터 만드세요",
    desc: "아직 청약통장이 없다면 시중은행 어디서든 개설할 수 있어요. 주택청약종합저축으로 만들면 공공·민영 모두 청약 가능하고, 매달 2만원~50만원 사이로 자유롭게 납입하면 돼요. 가입 기간이 길수록 가점이 올라가니까 하루라도 빨리 만드는 게 유리해요.",
    tip: "매달 10만원 이상 납입하면 소득공제 혜택도 받아요",
  },
  {
    title: "무주택 기간을 확보하세요",
    desc: "공공분양은 무주택 기간이 길수록 유리해요. 본인과 세대원 전원이 무주택이어야 하고, 배우자가 주택을 보유하면 유주택으로 판정돼요. 등본상 세대원도 확인 대상이니까 미리 주민등록등본을 떼서 점검하세요.",
    tip: "부모와 세대분리하면 무주택 기간 산정에 유리할 수 있어요",
  },
  {
    title: "소득·자산 기준을 미리 확인하세요",
    desc: "공공분양 특별공급은 소득 기준이 까다로워요. 생애최초 특별공급은 부부합산 연소득 1.3억원 이하, 자산 3.61억원 이하 등 요건을 충족해야 해요. 일반공급은 소득 기준이 없지만 가점 경쟁이 치열하죠.",
    tip: "국세청 홈택스에서 소득금액증명원 미리 발급해두세요",
  },
  {
    title: "2028년 청약 일정을 주시하세요",
    desc: "용산·과천 물량은 2027년 착공 후 2028년경 청약 접수가 예상돼요. 국토교통부 홈페이지와 청약홈에서 공급 공고가 나오면 바로 신청할 수 있도록 서류를 갖춰두는 게 좋아요.",
    tip: "청약홈(applyhome.co.kr) 알림 설정 추천",
  },
];

const CHECKLIST = [
  "청약통장 가입 여부 / 미가입이면 오늘 당장 개설",
  "무주택 세대구성원 여부 / 세대원 전원 확인",
  "소득·자산 기준 충족 여부 / 홈택스에서 소득금액증명원 발급",
  "부양가족 수 확인 / 청약 가점에 직접 영향",
  "해당 지역 거주 기간 확인 / 서울·경기 거주자 우선 배정 가능",
];

const FAQS = [
  {
    q: "129 대책으로 분양가가 저렴해지나요?",
    a: "분양가 상한제 적용 여부는 아직 확정되지 않았어요. 공공분양 물량은 시세 대비 저렴할 가능성이 높지만, 민간분양은 시세 수준일 수 있어요. 구체적인 분양가는 착공 후 사업계획 승인 단계에서 결정돼요.",
  },
  {
    q: "용산 IBD는 어디에 생기는 건가요?",
    a: "용산국제업무지구는 옛 용산역 일대 철도 유휴부지예요. 지하철 1호선·4호선 용산역, 경의중앙선이 있고 여의도·강남 접근성이 좋은 입지예요. 용적률 상향으로 기존 6,000가구에서 1만 가구로 늘었어요.",
  },
  {
    q: "과천 9,800가구는 어떤 부지인가요?",
    a: "경마장 이전 부지와 국군방첩사령부 이전 부지를 합친 거예요. 4호선 경마공원역 인근이고, 신분당선 연장도 예정돼 있어서 교통 개선이 기대되는 지역이에요.",
  },
  {
    q: "청약 통장 없으면 아예 못 넣나요?",
    a: "공공분양은 반드시 청약통장이 필요해요. 민간분양도 대부분 청약통장 가입이 요건이에요. 예외적으로 일부 민간임대는 통장 없이 가능하지만, 이번 대책의 핵심 물량은 공공분양이라 통장이 필수예요.",
  },
  {
    q: "실거주 의무가 있나요?",
    a: "공공분양은 5년 이상 실거주 의무가 붙을 가능성이 높아요. 전매 제한도 있고요. 투자 목적보다 실거주 목적으로 접근하는 게 맞아요.",
  },
  {
    q: "기존 9·7 대책이랑 뭐가 다른가요?",
    a: "9·7 대책은 신도시 위주 공급이었고, 129 대책은 도심 유휴부지 활용이 핵심이에요. 역세권 중심으로 빠르게 공급하겠다는 전략이 다르죠. 서울 비중이 53%로 더 높아요.",
  },
];

const SOURCES = [
  { name: "국토교통부", href: "https://www.molit.go.kr" },
  { name: "정책브리핑", href: "https://www.korea.kr" },
  { name: "주택임대차보호법", href: "https://www.law.go.kr/법령/주택임대차보호법" },
];

const RELATED = [
  { slug: "청약저축-청약예금-전환-방법-조건", title: "청약저축에서 청약예금 전환", description: "통장 전환 조건과 절차 정리." },
  { slug: "국민임대주택-전용면적-70제곱미터-입주자격", title: "국민임대주택 입주 자격", description: "전용면적 기준과 소득 요건." },
  { slug: "취득세-계산-세율-납부", title: "취득세 세율과 납부 방법", description: "집 살 때 내는 세금 계산법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 주택 공급 · 청약</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        129 주택 공급대책, 어디에 얼마나 짓나요?<br />
        수도권 6만 가구 공급 일정과 청약 준비법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "수도권에 집 사고 싶은데, 정부 대책 물량은 언제 나오는 거예요?"
      </p>
      <p style={body}>
        2026년 1월 29일, 국토교통부가 <strong>수도권 6만 가구 공급대책</strong>을 발표했어요.
        서울에 3.2만 가구, 경기에 2.8만 가구를 짓겠다는 내용이에요.
        용산 IBD 1만 가구, 과천 경마장·군부대 부지 9,800가구가 핵심이고, 2027년 착공 후 2029~2030년 입주 예정이에요.
        무주택자라면 지금부터 청약 준비를 시작해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>수도권 6만 가구, 어디에 얼마나 공급되나요?</H2>
      <p style={body}>
        <a href="https://www.molit.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국토교통부</a> 발표에 따르면 서울이 전체의 53%를 차지해요.
        도심 유휴부지를 활용해서 역세권 위주로 빠르게 공급하겠다는 전략이죠.
      </p>

      <SectionBadge>지역별 공급 물량</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>지역</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>물량</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>주요 부지</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["용산 IBD", "10,000가구", "용산역 일대 철도부지"],
              ["용산 캠프킴", "2,500가구", "미군기지 이전 부지"],
              ["과천", "9,800가구", "경마장 + 군부대 이전"],
              ["태릉·노원", "5,000가구", "공공부지 활용"],
              ["성남·하남", "4,700가구", "GTX 수혜 지역"],
              ["서울 기타", "10,000가구", "노후 임대·청사 재건축"],
            ].map(([area, qty, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{area}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{qty}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        서울 3.2만 + 경기 2.8만 = 총 6만 가구{"\n"}
        2027년 착공 → 2029~2030년 순차 입주 예정{"\n"}
        LH 직접 시행으로 공급 속도 높임
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>2030년까지 135만 호, 공급 일정은 어떻게 되나요?</H2>
      <p style={body}>
        129 대책은 단발성이 아니에요. 2030년까지 수도권에 연 27만 호씩, 총 135만 호를 공급하겠다는 장기 계획의 일부예요.
        과거 연평균 공급량 대비 1.7배 수준이에요. 공급 절벽을 해소하고 집값 안정을 노리는 거죠.
      </p>

      <SectionBadge>연도별 공급 로드맵</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>연도</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>연간 공급</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>누적</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2026년", "27만 호", "27만 호"],
              ["2027년", "27만 호", "54만 호"],
              ["2028년", "27만 호", "81만 호"],
              ["2029년", "27만 호", "108만 호"],
              ["2030년", "27만 호", "135만 호"],
            ].map(([year, annual, total], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{year}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{annual}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        LH가 직접 시행하는 공공택지 물량이 핵심이에요. 노후 임대주택, 공공청사, 학교용지까지 활용해서 빈 땅 없이 채워넣는 전략이죠.
        인허가 간소화와 용적률 상향으로 속도를 높이겠다는 계획도 포함돼 있어요.
      </p>

      <Divider />

      <H2>청약 준비, 지금 뭐부터 하면 될까요?</H2>
      <p style={body}>
        실제 청약 접수는 2028년경으로 예상되지만, 준비는 지금 시작해야 해요.
        청약 가점은 무주택 기간, 부양가족 수, 통장 가입 기간으로 결정되거든요.
        1년만 늦어져도 가점에서 밀릴 수 있어요.
      </p>

      <SectionBadge>청약 준비 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <p style={body}>
        <a href="/w/청약저축-청약예금-전환-방법-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>청약저축에서 청약예금으로 전환</a>하는 것도 검토해보세요.
        민영아파트 청약이 목표라면 예금형이 유리할 수 있어요.
      </p>

      <Divider />

      <H2>청약 전에 꼭 체크해야 할 것들</H2>
      <p style={body}>
        서류 하나 빠뜨리면 청약 자체가 무효가 돼요.
        특히 소득·자산 기준은 특별공급마다 다르니까 본인이 해당하는 유형부터 확인하세요.
      </p>

      <SectionBadge>사전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <BorderBox title="참고">
        부부 중 한 명만 청약 신청 가능해요. 부부가 같은 주택에 동시 청약하면 모두 무효 처리되니까 한 명만 넣으세요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 국토교통부 발표 기준으로 작성됐어요. 구체적인 분양가, 청약 일정은 추후 변경될 수 있어요." />
    </ArticleLayout>
  );
}
