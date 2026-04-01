"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 회사가 안 망했는데 월급·퇴직금을 못 받은 상황. 민사소송 없이 빠르게 돈을 받을 방법을 찾는 중.
// Q2. 체불확인서를 발급받고, 근로복지공단에 간이대지급금을 신청해서 최대 700만원을 수령하는 행동.
// Q3. 체불확인서 발급(고용노동부), 근로복지공단 신청, 700만원 한도(1인당), 퇴직일 1년 이내 신청, 일반 체당금과 차이.
// Q4. Steps(신청 절차) + GreenBox(핵심 요약) + 표(간이대지급금 vs 일반 체당금) + EligibilityChecker + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, DocTable, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "resigned", label: "이미 퇴직한 상태예요 (재직 중이 아님)" },
  { id: "operating", label: "회사가 정상 운영 중이에요 (도산·폐업이 아님)" },
  { id: "unpaid", label: "임금, 퇴직금, 휴업수당 중 체불된 금액이 있어요" },
  { id: "within1yr", label: "퇴직일로부터 1년이 지나지 않았어요" },
];

const APPLY_STEPS = [
  { title: "임금체불 진정 접수", desc: "고용24(ei.go.kr) 온라인 또는 관할 고용센터를 방문해서 임금체불 진정을 접수해요.", tip: "체불 금액, 재직 기간, 근로계약서를 미리 준비하면 빨라요" },
  { title: "체불확인서 발급", desc: "근로감독관 조사 후 체불확인서가 발급돼요. 보통 2~4주 걸리고, 급한 경우 신속 처리를 요청할 수 있어요." },
  { title: "근로복지공단 신청", desc: "체불확인서를 들고 근로복지공단(comwel.or.kr) 지사에 간이대지급금 지급 청구서를 제출해요.", tip: "온라인 신청도 가능해요" },
  { title: "심사·지급", desc: "공단 심사 후 2~3주 이내에 계좌로 지급돼요. 이후 국가가 회사에 구상권을 행사해요." },
];

const DOCS = [
  { name: "간이대지급금 지급 청구서", required: true, where: "근로복지공단 양식" },
  { name: "체불확인서 또는 법원 확정 판결문", required: true, where: "고용노동부 또는 법원" },
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "통장 사본 (본인 명의)", required: true, where: "본인 준비" },
  { name: "근로계약서·급여명세서", required: false, where: "있으면 심사가 빨라져요" },
];

const FAQS = [
  { q: "간이대지급금 신청하면 회사에 알려지나요?", a: "네, 지급 후 국가가 회사에 구상권을 행사해요. 국가가 대신 지급한 금액을 회사에 청구하는 과정에서 신청 사실이 알려져요." },
  { q: "700만원 한도는 1인당인가요?", a: "네, 1인당이에요. 임금·퇴직금·휴업수당 합산 최대 700만원이고, 초과분은 민사소송으로 따로 청구해야 해요." },
  { q: "재직 중에도 신청할 수 있나요?", a: "간이대지급금은 퇴직 후 신청이 원칙이에요. 재직 중이라면 고용노동부(1350)에 임금체불 진정을 접수해서 회사에 지급 명령을 받는 방법을 먼저 시도해요." },
  { q: "회사가 도산했으면 어떻게 하나요?", a: "도산 시에는 간이대지급금보다 일반 체당금(도산 체당금)이 유리해요. 한도가 최대 3,900만원으로 더 높아요." },
  { q: "체불확인서 발급이 늦어지면요?", a: "생계가 어려운 경우 고용센터에 신속 처리를 요청할 수 있어요. 사업주에게 내용증명(지급 최고장)을 보내는 것도 시간 단축에 도움돼요." },
  { q: "신청 기한이 있나요?", a: "퇴직일로부터 1년 이내에 신청해야 해요. 기한을 놓치면 신청할 수 없으니 빨리 움직이세요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "임금채권보장법", url: "https://www.law.go.kr/법령/임금채권보장법" },
      { label: "근로복지공단 체당금 안내", url: "https://www.comwel.or.kr" },
      { label: "고용노동부 임금체불 신고", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "임금체불-신고", title: "임금체불 신고 방법", description: "고용노동부 진정 접수부터 증거 수집까지 단계별로 안내해요." },
  { slug: "퇴직급여-지급-지연이자-받기", title: "퇴직금 지연이자", description: "퇴직금이 14일 넘게 밀리면 연 20% 지연이자를 받을 수 있어요." },
  { slug: "실업급여-수급자격-인정", title: "실업급여 수급자격", description: "체불 퇴직 후 실업급여도 받을 수 있는지 확인해봐요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 임금체불 · 체당금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        간이대지급금 신청 방법<br />
        700만원 한도, 체불확인서부터 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직했는데 월급이랑 퇴직금을 못 받았다면, 간이대지급금을 신청할 수 있어요.
        회사가 도산하지 않아도 국가가 최대 700만원을 대신 지급해주는 제도예요.
        <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 근거한 공식 제도고, 민사소송보다 빠르게 받을 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>간이대지급금, 핵심 요약</H2>
      <p style={body}>
        <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>에서 운영하는 제도예요.
        체불확인서를 발급받아 신청하면 심사 후 2~3주 내에 지급돼요.
      </p>

      <GreenBox>
        · 대상: 회사 도산 없이 임금·퇴직금을 <strong>못 받은 퇴직자</strong><br />
        · 한도: 1인당 최대 <strong>700만원</strong> (임금+퇴직금+휴업수당 합산)<br />
        · 기한: 퇴직일로부터 <strong>1년 이내</strong> 신청<br />
        · 소요: 체불확인서 발급 2~4주 + 공단 심사 2~3주
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>내가 신청할 수 있는지 확인해보세요</H2>
      <p style={body}>
        아래 조건을 모두 충족하면 간이대지급금을 신청할 수 있어요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="간이대지급금 신청이 가능해요. 고용센터에 체불확인서 발급부터 시작하면 돼요."
        partialMatchText="일부 조건이 충족되지 않아요. 고용노동부(1350) 또는 근로복지공단에 상담해보세요."
      />

      <Divider />

      <H2>신청 절차는 이렇게 진행돼요</H2>
      <p style={body}>
        체불확인서 발급이 가장 중요한 첫 단계예요. 이 서류가 있어야 근로복지공단에 신청할 수 있어요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>일반 체당금과 뭐가 다른가요?</H2>
      <p style={body}>
        가장 큰 차이는 도산 여부와 한도예요. 체불 금액이 많다면 회사 도산 여부를 확인하는 게 중요해요.
      </p>

      <SectionBadge>간이대지급금 vs 일반 체당금</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>간이대지급금</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>일반 체당금</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["회사 상태", "정상 운영 중", "도산·폐업 (법원 확인)"],
              ["한도", "최대 700만원", "최대 3,900만원"],
              ["신청처", "근로복지공단", "근로복지공단"],
              ["필요 서류", "체불확인서", "도산 확인서"],
            ].map(([item, simple, general], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 500 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{simple}</td>
                <td style={{ padding: "9px 12px" }}>{general}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 임금채권보장법 및 근로복지공단 안내 자료를 바탕으로 작성됐어요. 개인 상황에 따라 지급 가능 여부와 금액이 달라질 수 있으니 근로복지공단에 확인해봐요." />
    </ArticleLayout>
  );
}
