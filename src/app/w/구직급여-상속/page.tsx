"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 가족(부모, 배우자 등)이 돌아가셨는데, 고인이 받지 못한 실업급여가 남아 있다는 걸 알게 된 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인이 유족 수령 대상인지 확인하고, 필요 서류를 준비해서 고용센터에 미지급 구직급여를 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 미지급 구직급여 개념, 유족 수령 순위(배우자→자녀→부모→손자녀→조부모), 사망 당시까지만 지급, 필요 서류, 신청 방법.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 요약) + Steps(신청 절차) + DocTable(필요 서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";
import { DocTable } from "@/components/article-ui/DocTable";

const DOC_ITEMS = [
  { name: "사망진단서 (또는 사망확인서)", required: true, where: "병원 또는 주민센터" },
  { name: "가족관계증명서", required: true, where: "주민센터, 정부24, 대법원 전자가족관계등록시스템" },
  { name: "유족 본인 신분증", required: true, where: "주민등록증, 운전면허증 등" },
  { name: "유족 명의 통장 사본", required: true, where: "급여를 받을 계좌" },
  { name: "혼인관계증명서 (배우자인 경우)", required: false, where: "주민센터, 정부24" },
];

const STEPS = [
  { title: "미지급 구직급여 확인", desc: "고인이 구직급여 수급자격을 인정받았는지 고용센터에 전화(1577-0011)로 확인해요." },
  { title: "서류 준비", desc: "사망진단서, 가족관계증명서, 신분증, 통장사본을 준비해요.", tip: "온라인 신청은 안 되고 고용센터 방문만 가능해요" },
  { title: "관할 고용센터 방문", desc: "고인이 마지막으로 실업인정을 받던 고용센터에 방문해서 미지급 구직급여 청구서를 제출해요." },
  { title: "심사 및 입금", desc: "서류 심사 후 유족 계좌로 미지급 급여가 입금돼요. 보통 2~4주 소요돼요." },
];

const FAQS = [
  { q: "구직급여를 한 번도 못 받고 돌아가셨는데 유족이 받을 수 있나요?", a: "네, 수급자격 인정을 받은 상태였다면 가능해요. 첫 실업인정일 전에 사망해도 유족이 받을 수 있어요." },
  { q: "유족이 여러 명이면 누가 받나요?", a: "법에서 정한 순위를 따라요. 배우자 → 자녀 → 부모 → 손자녀 → 조부모 순이에요. 같은 순위에 여러 명이면 균등하게 나눠 받아요." },
  { q: "사망 이후 남은 급여일수도 전부 받을 수 있나요?", a: "아니요. 사망일까지 실업인정을 받은 기간만 지급돼요. 사망 이후의 급여일수는 지급되지 않아요." },
  { q: "상속 포기를 했는데도 미지급 구직급여를 받을 수 있나요?", a: "미지급 구직급여는 일반 상속 재산과 별개예요. 고용보험법에서 정한 유족 수령 순서를 따르기 때문에, 민법상 상속 포기와 관계없이 청구할 수 있어요." },
  { q: "신청 기한이 있나요?", a: "구직급여 청구권의 소멸시효는 3년이에요. 사망일로부터 3년 이내에 청구해야 해요. 늦으면 권리가 소멸돼요." },
  { q: "고인이 실업급여를 부정수급 받은 게 있으면 어떻게 되나요?", a: "부정수급 반환 채무가 있으면 미지급 급여에서 차감될 수 있어요. 고용센터에서 상계 처리를 해요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용보험법 (법제처)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 실업급여 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 고객센터", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "구직급여 수급자격 조건", description: "고인이 수급자격을 인정받았는지 확인하는 기준이에요." },
  { slug: "실업급여-신청방법", title: "실업급여 신청 방법·절차", description: "일반적인 실업급여 신청 절차를 정리했어요." },
  { slug: "퇴직금-미지급", title: "퇴직금 미지급 시 대처법", description: "퇴직금도 미지급 상태라면 함께 청구할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 고용보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고인이 못 받은 구직급여, 유족이 받을까?<br />
        미지급 구직급여 수령 순서와 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가족이 돌아가셨는데, 받지 못한 실업급여가 남아 있다는 걸 알게 됐나요?
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따르면 미지급 구직급여는 유족이 받을 수 있어요.
        일반 상속과 달리 고용보험법이 정한 순서를 따르고, 신청 절차도 별도로 있어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>미지급 구직급여, 유족이 받을 수 있나요?</H2>
      <p style={body}>
        구직급여를 받을 권리가 있는 사람이 사망하면, 법에서 정한 유족이 대신 받을 수 있어요.
        일반 재산 상속과는 다른 별도 제도예요.
      </p>

      <GreenBox>
        · 수급자격 인정을 받았지만 급여를 다 받지 못하고 사망한 경우, 유족이 수령 가능해요<br />
        · 사망일까지 실업인정을 받은 기간만 지급돼요 (사망 이후 기간은 불가)<br />
        · 청구 기한: 사망일로부터 <strong>3년 이내</strong><br />
        · 민법상 상속 포기와 무관하게 고용보험법 순서를 따라요
      </GreenBox>

      <p style={body}>
        고인이 수급자격 인정을 받았지만 한 번도 실업인정을 받지 못한 상태라면 어떨까요?
        이 경우에도 유족이 청구할 수 있어요. 수급자격만 인정받은 상태면 권리가 발생한 거예요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>유족 수령 순위는 어떻게 되나요?</H2>
      <p style={body}>
        누가 먼저 받을 수 있는지는 고용보험법이 정해두고 있어요.
        민법의 상속 순위와는 조금 달라요.
      </p>

      <SectionBadge>미지급 구직급여 수령 순위</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", width: "80px" }}>순위</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>유족</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1순위", "배우자", "법률혼 배우자 (사실혼 포함 여부는 고용센터 판단)"],
              ["2순위", "자녀", "성인·미성년 무관"],
              ["3순위", "부모", "양부모 포함"],
              ["4순위", "손자녀", ""],
              ["5순위", "조부모", ""],
            ].map(([rank, who, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{rank}</td>
                <td style={{ padding: "10px 12px", color: "#374151", fontWeight: 600 }}>{who}</td>
                <td style={{ padding: "10px 12px", color: "#6b7280", fontSize: 13 }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        같은 순위에 여러 명이 있으면 균등하게 나눠 받아요.
        예를 들어 자녀가 3명이면 미지급 급여를 3등분해요.
        상위 순위 유족이 없을 때만 다음 순위가 받을 수 있어요.
      </p>

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        온라인 신청은 안 되고, 고용센터에 직접 방문해야 해요.
        고인이 마지막으로 실업인정을 받던 고용센터가 관할이에요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        어느 고용센터인지 모르겠다면, 1577-0011로 전화해서 고인의 이름과 주민번호로 확인할 수 있어요.
      </p>

      <Divider />

      <H2>필요 서류는 뭐가 있나요?</H2>
      <p style={body}>
        서류가 복잡해 보이지만, 대부분 주민센터나 정부24에서 바로 발급받을 수 있어요.
      </p>

      <DocTable docs={DOC_ITEMS} />

      <p style={body}>
        가족관계증명서는 <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서 온라인으로도 발급 가능해요.
        고용센터 방문 전에 서류를 미리 출력해 가면 당일 접수할 수 있어요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사례는 관할 고용센터(1577-0011)에서 확인하세요." />
    </ArticleLayout>
  );
}
