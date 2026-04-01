"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 건물을 매입했거나 소유 중인데 안전관리 의무가 뭔지 모르겠는 상황
// Q2. 전기·승강기·가스 등 법정 안전관리 의무를 파악하고 기한 내에 이행한다
// Q3. 전기안전관리자 선임, 승강기 정기검사(1년/6개월), 가스안전관리, 과태료 수준
// Q4. Checklist(관리 항목) + Steps(이행 절차) + BorderBox(과태료) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "전기안전관리자 선임 여부 확인 / 자가용 전기설비 보유 건물 필수",
  "승강기 정기검사 기한 확인 / 25년 이하: 연 1회, 25년 초과: 6개월마다",
  "가스안전관리자 선임 여부 / 특정가스 사용시설 해당 시 필수",
  "보일러 정기검사 이행 여부 / 사용 중인 보일러 검사 기한 확인",
  "건물 화재보험 가입 여부 / 다중이용 건축물은 필수 가입",
  "소방시설 점검 여부 / 연 1회 이상 자체점검 + 종합정밀점검",
];

const STEPS = [
  {
    title: "내 건물에 해당하는 관리 항목을 파악하세요",
    desc: "건물 규모와 시설에 따라 의무가 달라요. 승강기가 있으면 승강기 검사, 자가용 전기설비가 있으면 전기안전관리자 선임이 필요해요. 건축물대장과 시설 현황을 먼저 확인하세요.",
    tip: "건축물대장은 정부24에서 발급",
  },
  {
    title: "안전관리자를 선임하거나 대행업체를 계약하세요",
    desc: "전기·가스 안전관리자를 직접 선임할 수도 있고, 안전관리 대행업체에 위탁할 수도 있어요. 소규모 건물은 대행이 비용면에서 유리해요. 선임 후 관할 기관에 신고해야 해요.",
    tip: "소규모 건물은 대행업체 위탁이 편리",
  },
  {
    title: "정기검사 일정을 관리하세요",
    desc: "승강기는 매년(25년 초과 건물은 6개월마다), 전기설비는 정기검사를 받아야 해요. 검사 기한을 놓치면 과태료가 부과돼요. 캘린더에 검사 기한을 등록해서 미리 준비하세요.",
    tip: "검사 기한 캘린더 등록 필수",
  },
  {
    title: "임대 건물이면 계약서에 관리 범위를 명시하세요",
    desc: "법적 의무는 소유자에게 있지만, 임대차 계약서로 일부 관리를 임차인에게 위임할 수 있어요. 다만 법정 검사 의무는 최종적으로 소유자 책임이니까, 임차인이 안 하면 소유자가 나서야 해요.",
    tip: "법정 의무 = 소유자 최종 책임",
  },
];

const FAQS = [
  {
    q: "건물 안전관리를 안 하면 어떤 처벌을 받나요?",
    a: "과태료부터 형사처벌까지 있어요. 승강기 정기검사 미이행은 과태료 300만원, 전기안전관리자 미선임은 300만원 이하 과태료예요. 사고가 나면 업무상과실치사상으로 형사처벌과 손해배상까지 질 수 있어요.",
  },
  {
    q: "안전관리자는 꼭 선임해야 하나요?",
    a: "일정 규모 이상 건물은 필수예요. 전기안전관리자는 자가용 전기설비를 보유한 건물, 가스안전관리자는 특정가스 사용시설에 해당하면 선임 의무가 있어요. 선임 기준은 시설별로 달라요.",
  },
  {
    q: "임대 줬는데 안전관리 책임이 내 거예요?",
    a: "법적으로는 소유자 책임이에요. 계약서로 임차인에게 관리를 위임할 수 있지만, 법정 검사 의무와 사고 시 최종 책임은 소유자에게 있어요. 계약서에 명확히 규정해두는 게 중요해요.",
  },
  {
    q: "승강기 검사는 얼마나 자주 받아야 하나요?",
    a: "설치 후 25년 이하 건물은 매년 1회, 25년 초과 건물은 6개월마다 정기검사를 받아야 해요. 한국승강기안전공단(keso.kr)에서 검사 신청할 수 있어요.",
  },
  {
    q: "안전관리 대행업체 비용은 얼마인가요?",
    a: "전기안전관리 대행은 월 5~15만원, 승강기 유지보수는 월 10~30만원 정도예요. 건물 규모와 시설 수에 따라 달라지니까 3곳 이상 견적을 받아보세요.",
  },
];

const RELATED = [
  { slug: "건물화재보험", title: "건물 화재보험", description: "건물 소유자 필수 보험 가입 기준." },
  { slug: "상가임대차", title: "상가 임대차", description: "상가건물 임대차 보호법 핵심." },
  { slug: "건축물-정기점검", title: "건축물 정기점검", description: "건축물 안전점검 주기와 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건물 관리 · 안전</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건물 소유하면 꼭 해야 하는 것들<br />
        전기·승강기·가스 안전관리 의무
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "건물 샀는데 승강기 검사 받으라고 연락이 왔어요. 꼭 해야 하나요?"
      </p>
      <p style={body}>
        건물을 소유하면 세금만 내는 게 아니에요.
        <strong>전기, 승강기, 가스, 소방</strong> 등 법정 안전관리 의무도 따라와요.
        <a href="https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=84&onhunqueSeq=5300" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에 따르면 정기검사를 빠뜨리면 과태료 300만원, 사고 나면 형사처벌까지 받을 수 있어요.
        뭘 해야 하고 언제까지 해야 하는지 정리해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 건물에서 관리해야 하는 항목이에요</H2>
      <p style={body}>
        건물 규모와 시설에 따라 관리 항목이 달라요. 승강기가 없는 소규모 건물이라도 전기안전관리는 필수인 경우가 많아요. 아래 체크리스트로 해당 항목을 확인하세요.
      </p>

      <SectionBadge>건물 안전관리 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <CategoryButton label="부동산 정보" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>시설별 검사 주기와 과태료가 다릅니다</H2>
      <p style={body}>
        시설마다 검사 주기가 다르고, 미이행 시 과태료 수준도 달라요. 승강기는 설치 연수에 따라 검사 주기가 달라지니까 내 건물의 승강기 설치 시점을 먼저 확인하세요.
      </p>

      <SectionBadge>시설별 관리 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>시설</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>검사 주기</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>미이행 시</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["승강기 (25년 이하)", "매년 1회", "과태료 300만원"],
              ["승강기 (25년 초과)", "6개월마다", "과태료 300만원"],
              ["전기설비", "정기검사 (규모별)", "과태료 300만원 이하"],
              ["가스시설", "정기검사 (연 1회)", "과태료 300만원 이하"],
              ["소방시설", "연 1회 자체점검", "과태료 200만원"],
            ].map(([facility, cycle, penalty], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{facility}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{cycle}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#dc2626", fontWeight: 600 }}>{penalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />
      <ArticleAd position="mid" />

      <H2>이 순서대로 관리 체계를 갖추세요</H2>
      <p style={body}>
        처음 건물을 매입했다면 시설 현황 파악부터 시작해요. 기존 건물이라면 검사 이력과 다음 검사 기한을 먼저 확인하세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 건축법, 승강기안전관리법, 전기사업법 등을 바탕으로 작성했어요. 건물별 세부 의무는 관할 지자체에 확인하세요." />
    </ArticleLayout>
  );
}
