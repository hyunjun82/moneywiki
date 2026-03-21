"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     아이를 키우면서 근로시간을 줄이려는데 생활비가 걱정돼서 지원금이 얼마인지 확인하려는 부모
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     고용보험 홈페이지에서 육아기 근로시간 단축 급여를 신청한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     2026년 상한액 250만원, 첫 10시간 100%·나머지 80%, 신청 기한 단축 종료 후 12개월, 10시 출근제 사업주 30만원
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     급여 계산표 → 신청 절차 Steps → 10시 출근제 BorderBox → FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const PAY_TABLE = [
  { hours: "첫 10시간 단축", rate: "통상임금 100%", cap: "월 250만원", note: "2026년 인상" },
  { hours: "11~20시간 단축", rate: "통상임금 80%", cap: "월 200만원", note: "기존 유지" },
];

const STEPS = [
  {
    title: "회사에 육아기 근로시간 단축 신청",
    desc: "만 8세 이하(초등학교 2학년 이하) 자녀를 양육 중이면 신청할 수 있어요. 회사는 허용해야 하는 의무가 있어요. 단축 기간은 최소 3개월, 육아휴직 미사용 기간에 따라 최대 2년까지 가능해요.",
    tip: "거부당하면 고용노동부에 신고할 수 있어요",
  },
  {
    title: "단축 시작 1개월 후부터 급여 신청 가능",
    desc: "단축이 시작된 후 1개월이 지나면 고용보험 홈페이지(ei.go.kr) 또는 가까운 고용센터에서 신청해요. 매월 신청하면 다음 달에 급여를 받아요. 한꺼번에 신청하려면 단축 종료 후 12개월 이내에 해야 해요.",
    tip: "12개월 넘어가면 신청 불가예요. 종료일 꼭 확인하세요",
  },
  {
    title: "서류 준비 후 제출",
    desc: "육아기 근로시간 단축 확인서(회사 발급), 통상임금 확인 서류, 근로계약서가 필요해요. 고용보험 홈페이지에서 온라인으로 제출할 수 있어요.",
    link: { label: "고용보험 육아기 근로시간 단축 급여 신청", href: "https://www.ei.go.kr" },
  },
  {
    title: "신청 후 약 2주 내 지급",
    desc: "서류 심사 후 약 2주 이내에 지정 계좌로 입금돼요. 매월 신청하면 매달 생활비를 보전받으며 일할 수 있어요.",
  },
];

const DOCS = [
  { name: "육아기 근로시간 단축 확인서", required: true, where: "회사(사업주)에서 발급" },
  { name: "통상임금 확인 서류", required: true, where: "회사 급여담당 부서 요청" },
  { name: "근로계약서 (단축 후)", required: true, where: "회사에서 새로 작성·제공" },
  { name: "가족관계증명서", required: false, where: "정부24 또는 주민센터 발급" },
];

const CHECKLIST = [
  "대상: 만 8세 이하(초2 이하) 자녀 양육 중인 근로자",
  "고용보험 가입 기간 180일 이상 필수",
  "단축 시간: 주 15~35시간 (최소 5시간 단축)",
  "첫 10시간 단축: 통상임금 100%, 월 상한 250만원",
  "11~20시간 단축: 통상임금 80%, 월 상한 200만원",
  "신청 기한: 단축 종료 후 12개월 이내 (초과 시 불가)",
  "10시 출근제: 사업주에게 근로자 1명당 월 30만원 지원",
];

const FAQS = [
  {
    q: "육아휴직 대신 근로시간 단축을 선택해도 되나요?",
    a: "돼요. 육아휴직과 육아기 근로시간 단축을 나눠서 쓸 수 있어요. 육아휴직을 안 쓴 기간만큼 근로시간 단축으로 전환할 수 있어서, 예를 들어 육아휴직 6개월 사용 시 나머지 6개월을 단축 근로로 쓸 수 있어요.",
  },
  {
    q: "단축 기간에 다른 회사에서 일하면 안 되나요?",
    a: "안 돼요. 단축 기간 중 다른 사업장에서 근로하면 급여가 감액되거나 반환 명령이 날 수 있어요. 부업은 미리 확인하세요.",
  },
  {
    q: "육아기 10시 출근제는 뭔가요?",
    a: "2026년 새로 생긴 제도예요. 만 12세 이하 자녀를 둔 근로자가 오전 10시 출근을 허용한 중소·중견기업 사업주에게 근로자 1명당 월 30만원을 지원해요. 근로자는 임금 감소 없이 1시간 늦게 출근할 수 있어요.",
  },
  {
    q: "통상임금이 상한액보다 낮으면요?",
    a: "실제 통상임금 기준으로 계산해서 받아요. 상한액은 최대 한도라서, 통상임금이 낮으면 그대로 계산된 금액을 받아요. 월급이 낮을수록 실수령과 급여 지원액의 차이가 줄어요.",
  },
  {
    q: "단축 기간을 연장할 수 있나요?",
    a: "할 수 있어요. 최초 신청 기간이 끝나기 30일 전에 연장 신청하면 돼요. 총 허용 기간(최대 2년) 안에서 연장 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "남녀고용평등과 일·가정 양립 지원에 관한 법률 제19조의2", url: "https://www.law.go.kr/법령/남녀고용평등과일가정양립지원에관한법률" },
      { label: "고용보험법: 육아기 근로시간 단축 급여", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용보험: 육아기 근로시간 단축 급여 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부 정책뉴스: 2026년 변경 사항", url: "https://www.korea.kr" },
      { label: "찾기쉬운 생활법령: 육아기 근로시간 단축", url: "https://easylaw.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "육아기-근로시간-단축", title: "육아기 근로시간 단축 조건", description: "신청 조건·기간·회사 거부 시 대처법이에요." },
  { slug: "육아휴직-급여", title: "육아휴직 급여 계산법", description: "2026년 통상임금 80% 기준 급여 계산이에요." },
  { slug: "육아기-근로시간-단축-정규직-대우", title: "단축 기간 정규직 대우 보장", description: "근로시간 줄여도 정규직 지위·승급이 유지돼요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>육아기 근로시간 단축 · 고용보험 급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        육아기 근로시간 단축 지원금<br />
        2026년 상한액 250만원 신청법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아이 키우면서 근로시간을 줄이면 생활비가 걱정되죠?
        고용보험에서 줄어든 소득을 보전해줘요.
        2026년부터 급여 상한액이 250만원으로 올랐고,
        <a href="https://www.law.go.kr/법령/남녀고용평등과일가정양립지원에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>남녀고용평등법</a>에 따라 회사는 허용 의무가 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지원금이 얼마나 나오나요?</H2>
      <p style={body}>
        단축한 시간에 따라 통상임금의 100% 또는 80%를 지원해요.
        첫 10시간 단축은 100% 지원이라 소득 손실이 거의 없어요.
        2026년부터 상한액이 기존 220만원에서 250만원으로 올랐어요.
      </p>

      <SectionBadge>단축 시간별 급여 기준 (2026년)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf8" }}>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>단축 시간</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>급여율</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>월 상한액</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {PAY_TABLE.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", fontWeight: 600 }}>{row.hours}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>{row.rate}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb" }}>{row.cap}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", color: "#6b7280" }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        예시: 월 통상임금 300만원, 주 10시간 단축<br />
        지원 = 300만원 × 100% = 300만원 → 상한 250만원 적용<br />
        실지급 = 회사 급여(줄어든 만큼) + 고용보험 급여 250만원
      </GreenBox>

      <Divider />

      <H2>신청 절차 4단계</H2>
      <p style={body}>
        회사에 신청 후 단축이 시작돼야 고용보험 급여를 받을 수 있어요.
        급여 신청은 단축 시작 1개월 후부터 가능하고, 종료 후 12개월 이내에 하면 돼요.
        기한을 넘기면 신청 자체가 안 되니 날짜 관리가 중요해요.
      </p>

      <Steps steps={STEPS} />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>필요 서류</H2>
      <p style={body}>
        회사에서 발급해주는 서류가 핵심이에요.
        단축 전에 회사 인사팀에 서류 준비를 요청해두면 신청이 원활해요.
        고용보험 홈페이지에서 온라인 제출이 가능해요.
      </p>

      <SectionBadge>서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        2026년 새 제도 "10시 출근제": 만 12세 이하 자녀를 둔 근로자가 10시에 출근할 수 있도록 허용한 중소·중견기업 사업주에게 근로자 1명당 월 30만원을 지원해요. 근로자는 임금 삭감 없이 혜택을 받아요.
      </BorderBox>

      <Divider />

      <H2>신청 전 체크리스트</H2>
      <p style={body}>
        조건과 기한을 미리 확인해두세요.
        특히 고용보험 가입 180일 기준과 신청 기한 12개월은 놓치기 쉬워요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 고용보험법·남녀고용평등법을 바탕으로 작성됐어요. 지원금 상한액·기준은 변경될 수 있으니 최신 기준은 고용노동부(1350) 또는 고용보험 홈페이지에서 확인하세요." />
    </ArticleLayout>
  );
}
