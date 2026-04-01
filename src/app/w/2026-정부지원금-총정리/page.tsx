"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

/*
Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
    내가 받을 수 있는 정부 혜택이 뭔지 몰라서 답답한 상황이거나, 기준 중위소득이 올랐다는 뉴스를 보고 본인이 해당하는지 찾는 상황이에요.

Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
    보조금24에 접속해서 본인이 받을 수 있는 혜택을 조회하거나, 주요 지원금별로 직접 신청까지 할 수 있어야 해요.

Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
    - 2026년 기준 중위소득 수치 (가구별)
    - 주요 지원금별 대상·금액·신청처
    - 보조금24 사용 방법
    - 중복 수령 가능 여부

Q4. 이 정보를 가장 잘 전달하는 형태는?
    비교표(주요 지원금) + Steps(보조금24 사용법) + GreenBox + FAQ
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const INCOME_TABLE = [
  { members: "1인", income: "2,392,013원", change: "+6.42%" },
  { members: "2인", income: "3,932,658원", change: "+6.51%" },
  { members: "3인", income: "5,025,353원", change: "+6.51%" },
  { members: "4인", income: "6,097,773원", change: "+6.51%" },
];

const SUPPORT_LIST = [
  { name: "생계급여", target: "중위소득 32% 이하", amount: "월 최대 71만원 (1인 기준)", apply: "복지로·주민센터" },
  { name: "청년미래적금", target: "만 19~34세, 소득 6천만원 이하", amount: "3년 만기 최대 2,200만원", apply: "은행 앱" },
  { name: "청년월세지원", target: "만 19~34세, 무주택 독립 청년", amount: "월 20만원 × 24개월", apply: "복지로" },
  { name: "국민취업지원제도", target: "미취업자, 중위소득 60% 이하", amount: "월 50만원 × 6개월", apply: "고용24" },
  { name: "소상공인 바우처", target: "매출 감소 소상공인", amount: "25만원 바우처", apply: "소상공인마당" },
];

const STEPS_SUBSIDY24 = [
  {
    title: "정부24 접속 후 로그인",
    desc: "gov.kr에 접속해서 공동인증서나 간편인증(카카오·네이버)으로 로그인해요. 비회원으로도 일부 조회는 가능하지만, 내 정보 기반 맞춤 조회는 로그인 후에만 돼요.",
    link: { label: "정부24 보조금24 바로가기", href: "https://www.gov.kr/portal/rcvfvrSvc/main/nonLogin" },
  },
  {
    title: "보조금24 메뉴 선택",
    desc: "로그인 후 '보조금24' 메뉴를 클릭해요. 내 나이·소득·가구원 수 정보를 바탕으로 받을 수 있는 혜택이 자동으로 나와요. 미신청 혜택만 따로 필터링도 할 수 있어요.",
    tip: "정부24 앱을 깔면 스마트폰에서도 조회하고 바로 신청까지 할 수 있어요",
  },
  {
    title: "혜택 선택 후 신청",
    desc: "나온 혜택 목록에서 원하는 항목을 클릭하면 신청 화면으로 바로 넘어가요. 지원금마다 신청 기간이 다르니 기간 안에 신청하세요. 일부는 복지로나 고용24 같은 별도 사이트로 연결돼요.",
  },
];

const CHECKLIST = [
  "보조금24(gov.kr) 로그인 → 맞춤 혜택 목록 조회",
  "2026년 기준 중위소득 인상으로 작년에 탈락했던 분들 재신청 가능",
  "청년 지원금(미래적금·월세지원)은 청년 나이 기준 만 19~34세",
  "청년월세지원과 주거급여는 중복 불가, 유리한 쪽 선택",
  "대부분의 지원금은 신청 기간 내에만 가능, 지나치면 다음 해까지 대기",
  "주민센터 방문으로도 신청 가능 (어르신·디지털 취약계층)",
];

const FAQS = [
  {
    q: "보조금24에서 조회하면 바로 신청도 되나요?",
    a: "대부분 돼요. 정부24에서 연결되는 지원금은 한 화면에서 신청까지 가능해요. 일부 지원금은 복지로, 고용24 등 별도 사이트로 연결돼요.",
  },
  {
    q: "정부지원금을 중복으로 받을 수 있나요?",
    a: "지원금마다 달라요. 청년미래적금과 국민취업지원제도는 중복 가능해요. 청년월세지원과 주거급여는 중복 불가예요. 보조금24 조회 시 중복 가능 여부가 표시돼요.",
  },
  {
    q: "기준 중위소득이 뭔가요?",
    a: "정부가 복지 혜택 대상자를 정할 때 기준으로 쓰는 소득 기준이에요. 2026년에 4인 가구 기준 609만원으로 전년 대비 6.51% 올랐어요. 이 기준이 올라갈수록 받을 수 있는 사람이 늘어요.",
  },
  {
    q: "신청 기한을 놓쳤으면 어떻게 하나요?",
    a: "대부분의 지원금은 신청 기간이 정해져 있어요. 기간이 지나면 다음 신청 기간을 기다려야 해요. 보조금24에서 '다음 신청 가능 시기'를 미리 확인해두는 게 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부 2026년 기준 중위소득 발표", url: "https://www.mohw.go.kr" },
      { label: "정부24 보조금24 맞춤 혜택 조회", url: "https://www.gov.kr/portal/rcvfvrSvc/main/nonLogin" },
      { label: "복지로 복지서비스 신청", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급조건", title: "실업급여 수급 조건과 신청 방법", description: "실업급여 받을 수 있는 조건과 신청 절차예요." },
  { slug: "국민취업지원제도-구직촉진수당", title: "국민취업지원제도 구직촉진수당 신청", description: "미취업자 월 50만원 지원하는 국민취업지원제도예요." },
  { slug: "미환급금-조회", title: "내 미환급금 조회 방법", description: "돌려받지 못한 돈이 있는지 조회하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 정부지원금 · 보조금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 정부지원금 종류와 신청방법,<br />
        보조금24로 한 번에 조회하기
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년에는 기준 중위소득이 전년 대비 6.51% 올랐어요. 작년에 소득 기준을 조금 넘어서 탈락했던 분들도
        올해는 혜택을 받을 수 있게 됐어요. 내가 받을 수 있는 혜택이 뭔지는 보조금24에서 한 번에 조회할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>2026년 기준 중위소득, 얼마나 올랐나요?</H2>
      <p style={body}>
        기준 중위소득은 정부가 복지 혜택 대상자를 정할 때 쓰는 소득 기준이에요. 생계급여, 의료급여, 주거급여 등
        80개가 넘는 사업에 이 기준이 쓰여요. 기준이 올라갈수록 받을 수 있는 사람이 늘어나요.
      </p>

      <SectionBadge>2026년 기준 중위소득</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>가구원 수</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>2026년 기준</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>전년 대비</th>
            </tr>
          </thead>
          <tbody>
            {INCOME_TABLE.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: "#1D9E75" }}>{row.members}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row.income}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        기준 중위소득 6.51% 인상 → 작년에 소득 기준 아슬아슬하게 초과했던 분들 올해 재신청 가능<br />
        생계급여·의료급여·주거급여·교육급여 등 80개 이상 사업에 영향
      </GreenBox>

      <Divider />

      <H2>주요 정부지원금 종류와 신청처</H2>
      <p style={body}>
        2026년 주요 지원금별 대상·금액·신청처를 정리했어요. 청년 지원금은 만 19~34세 나이 기준이에요.
        중복 수령 가능 여부는 지원금마다 달라서 보조금24 조회 시 확인해야 해요.
      </p>

      <SectionBadge>주요 지원금 목록</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>지원금</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>대상</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>지원 내용</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>신청처</th>
            </tr>
          </thead>
          <tbody>
            {SUPPORT_LIST.map((item, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: "#1D9E75" }}>{item.name}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{item.target}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{item.amount}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{item.apply}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        청년월세지원과 주거급여는 중복 불가예요. 두 가지 중 본인에게 유리한 쪽을 선택하세요.
        <a href="/w/국민취업지원제도-구직촉진수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민취업지원제도</a>와
        청년미래적금은 중복 신청이 가능해요.
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>보조금24, 이렇게 쓰세요</H2>
      <p style={body}>
        지원금마다 따로 찾아볼 필요 없이 보조금24 하나로 내가 받을 수 있는 혜택을 모두 조회할 수 있어요.
        미신청 혜택도 알림으로 알려줘서 놓치고 있던 혜택을 발견할 수 있어요.
      </p>

      <Steps steps={STEPS_SUBSIDY24} />

      <Divider />

      <H2>놓치기 쉬운 체크리스트</H2>
      <p style={body}>
        지원금 신청 전에 아래 항목들을 살펴보세요. 신청 기간을 놓치면 다음 기간까지 기다려야 해요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        정부지원금 조회·신청에서 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 보건복지부 발표를 바탕으로 작성됐어요. 지원금 세부 조건은 변경될 수 있으니 보조금24 또는 해당 부처에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
