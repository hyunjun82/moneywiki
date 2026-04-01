"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 경제적으로 너무 어려운데 기초생활수급자가 될 수 있는지 모르는 상황
// Q2. 소득 기준 확인 후 주민센터에 신청하는 것
// Q3. 소득인정액 계산법, 2026년 기준액, 급여별 기준 차이, 신청 절차
// Q4. 표(급여별 기준) + Steps(신청 절차) + GreenBox(핵심 요약)

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const BENEFIT_TABLE = [
  { type: "생계급여", criterion: "기준 중위소득 32% 이하", content: "현금 지급 (월 20일 입금)", note: "소득인정액과 급여액 차액 지원" },
  { type: "의료급여", criterion: "기준 중위소득 40% 이하", content: "병원비 거의 무료", note: "1종·2종 구분, 본인부담금 일부" },
  { type: "주거급여", criterion: "기준 중위소득 48% 이하", content: "임차료 또는 수선유지비 지원", note: "지역별 기준 임대료 이하 실비 지원" },
  { type: "교육급여", criterion: "기준 중위소득 50% 이하", content: "교육활동지원비 지급", note: "초·중·고 자녀 1인당 연간 지급" },
];

const INCOME_2026 = [
  { size: "1인 가구", threshold: "820,556원", prev: "765,444원" },
  { size: "2인 가구", threshold: "1,346,270원", prev: "1,258,083원" },
  { size: "3인 가구", threshold: "1,735,891원", prev: "1,626,393원" },
  { size: "4인 가구", threshold: "2,078,316원", prev: "1,951,287원" },
];

const STEPS = [
  {
    title: "정부24에서 모의계산으로 미리 확인",
    desc: "정부24(gov.kr)에서 기초생활보장 모의계산을 해볼 수 있어요. 소득과 재산 정보를 입력하면 수급 가능 여부가 대략 나와요. 정확한 건 아니지만 신청 전 가능성을 판단하기 좋아요.",
    tip: "정부24 → 서비스 → 복지 → 기초생활보장 모의계산 순으로 찾으면 돼요",
    link: { label: "정부24 모의계산 바로가기", href: "https://www.gov.kr/portal/service/serviceInfo/WII000001410" },
  },
  {
    title: "거주지 주민센터 방문 신청",
    desc: "직접 방문이 가장 확실해요. 담당 공무원이 소득인정액 계산도 도와주고 서류도 안내해줘요. 필요한 서류는 신분증, 통장 사본, 소득·재산 관련 서류예요. 일하고 있다면 급여명세서나 사업소득 증명서도 챙기세요.",
    tip: "방문 전 주민센터에 전화해서 필요 서류를 미리 확인하면 헛걸음을 막을 수 있어요",
  },
  {
    title: "소득·재산 조사 (약 30일 소요)",
    desc: "신청 후 담당 공무원이 소득과 재산을 조사해요. 금융정보, 부동산 등을 공적으로 조회하기 때문에 숨기지 않는 게 중요해요. 조사 결과 기준을 충족하면 다음 달부터 급여가 들어와요.",
    tip: "조사 기간 중 연락이 오면 빠르게 응답해야 심사가 지연되지 않아요",
  },
  {
    title: "결과 통보 및 급여 수령",
    desc: "심사 통과 시 매달 20일 지정 계좌로 생계급여가 자동 입금돼요. 20일이 공휴일이면 그 직전 영업일에 들어와요. 의료급여·주거급여·교육급여는 각각 해당 기관에서 별도 처리돼요.",
    tip: "수급 중 소득이 생기면 반드시 주민센터에 신고해야 환수 처분을 막을 수 있어요",
  },
];

const FAQS = [
  {
    q: "소득인정액이 뭔가요? 월급이랑 다른 건가요?",
    a: "달라요. 소득인정액 = 소득평가액 + 재산의 소득환산액이에요. 실제 버는 돈만 보는 게 아니라 집이나 차 같은 재산도 환산해서 합쳐요. 그래서 월급이 없어도 재산이 많으면 기준을 초과할 수 있고, 반대로 재산이 거의 없으면 소득이 조금 있어도 해당될 수 있어요.",
  },
  {
    q: "생계급여 신청했는데 거절됐어요. 다른 급여는 받을 수 있나요?",
    a: "받을 수 있어요. 의료급여는 기준 중위소득 40% 이하, 주거급여는 48% 이하, 교육급여는 50% 이하예요. 생계급여 기준(32%)보다 완화돼 있어서 생계급여가 안 돼도 나머지 급여는 해당될 수 있어요. 복지로(bokjiro.go.kr)에서 한 번에 확인해보세요.",
  },
  {
    q: "차가 있으면 수급자가 될 수 없나요?",
    a: "차 가격이 재산으로 환산돼서 소득인정액에 포함돼요. 단, 장애인 보조 차량이나 생업용 차량은 예외가 있어요. 차량 가액이 높으면 기준을 초과할 수 있지만, 오래된 저가 차량은 영향이 작아요. 정확한 건 주민센터에서 계산해봐야 알 수 있어요.",
  },
  {
    q: "2026년 기준이 올라서 작년에 안 됐는데 올해는 될 수도 있나요?",
    a: "충분히 가능해요. 2026년 생계급여 기준이 6.51% 올랐어요. 작년에 소득인정액이 기준에서 조금 초과했다면 올해는 기준 내로 들어올 수 있어요. 한 번 다시 모의계산 해보고 가능성이 있으면 신청해보세요.",
  },
  {
    q: "수급자가 된 후 일을 시작하면 어떻게 되나요?",
    a: "일을 해도 돼요. 오히려 근로소득공제가 적용돼서 유리한 면이 있어요. 2026년부터 34세 이하 청년은 월 60만원을 공제해줘요. 소득이 늘면 급여액이 줄거나 수급이 중단될 수 있는데, 중요한 건 소득이 생기면 반드시 주민센터에 신고해야 한다는 거예요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초생활보장 수급자선정기준", url: "https://www.mohw.go.kr/menu.es?mid=a10708010300" },
      { label: "정부24: 생계급여 신청", url: "https://www.gov.kr/portal/service/serviceInfo/WII000001410" },
      { label: "찾기쉬운 생활법령정보: 기초생활보장", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1533" },
    ],
  },
];

const RELATED = [
  { slug: "에너지바우처-잔액-조회-및-하절기-동절기-사용-기간", title: "에너지바우처 잔액 조회 방법", description: "기초생활수급자에게 지급되는 에너지바우처 잔액과 사용 기간이에요." },
  { slug: "전세사기피해자-정의-지원대상", title: "전세사기피해자 인정 기준과 지원 내용", description: "보증금을 못 돌려받은 세입자를 위한 피해자 인정 조건과 지원이에요." },
  { slug: "청년도약계좌", title: "청년도약계좌 가입 조건", description: "청년층을 위한 정부 지원 저축 계좌예요. 소득 요건과 혜택을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 기초생활보장 · 생계급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기초생활수급자 소득 기준과<br />
        신청 방법 2026
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기초생활수급자가 되려면 소득인정액이 기준 중위소득의 32% 이하여야 해요.
        2026년 기준이 6.51% 올라 1인 가구는 82만 556원, 4인 가구는 207만 8,316원이에요.
        작년에 기준 초과로 안 됐다면 올해 다시 확인해볼 만해요.{" "}
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1533" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에서
        자세한 기준을 확인할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기초생활급여 4가지, 기준이 다 달라요</H2>
      <p style={body}>
        기초생활보장에는 생계급여만 있는 게 아니에요. 의료·주거·교육 급여도 있고, 각각 기준이 달라요.
        생계급여가 안 돼도 다른 급여는 받을 수 있는 경우가 많아요.
        복지로(bokjiro.go.kr)에서 한 번에 신청 가능해요.
      </p>

      <SectionBadge>2026년 급여별 기준 중위소득</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>급여 종류</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>기준</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>지원 내용</th>
            </tr>
          </thead>
          <tbody>
            {BENEFIT_TABLE.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: "#1D9E75" }}>{row.type}</td>
                <td style={{ padding: "10px 12px" }}>{row.criterion}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>2026년 생계급여 기준액 (가구원 수별)</H2>
      <p style={body}>
        소득인정액이 아래 금액 이하면 신청할 수 있어요.
        2025년보다 평균 6.51% 올랐기 때문에 이전에 기준을 간신히 초과했다면 올해는 달라질 수 있어요.
        약 4만 명이 새롭게 수급 대상이 될 것으로 보건복지부가 추정했어요.
      </p>

      <SectionBadge>생계급여 소득인정액 기준 (2026년)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>가구원 수</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>2026년 기준</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>2025년 기준</th>
            </tr>
          </thead>
          <tbody>
            {INCOME_2026.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{row.size}</td>
                <td style={{ padding: "10px 12px", color: "#1D9E75", fontWeight: 600 }}>{row.threshold}</td>
                <td style={{ padding: "10px 12px", color: "#6b7280" }}>{row.prev}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        소득인정액 = 소득평가액 + 재산의 소득환산액<br />
        월급뿐 아니라 집·차·금융재산도 환산돼요<br />
        정부24 모의계산기로 미리 확인해보세요
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청 절차 4단계</H2>
      <p style={body}>
        모의계산 → 주민센터 방문 → 조사 → 급여 수령 순으로 진행돼요.
        처음에 모의계산으로 가능성을 확인하고 방문하면 시간을 아낄 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox>
        2026년부터 34세 이하 청년의 근로소득공제가 월 40만원에서 60만원으로 늘었어요.
        일을 하면서 수급 중인 청년이라면 소득인정액이 줄어서 더 오래 수급을 유지할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기초생활수급자 조건 관련 실제로 많이 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 보건복지부 고시와 국민기초생활보장법을 바탕으로 작성됐어요. 급여 기준은 매년 변경되니 최신 기준은 보건복지부 또는 주민센터에 문의하세요." />
    </ArticleLayout>
  );
}
