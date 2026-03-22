"use client";

// Q1. 신입사원이나 알바생이 근로계약서를 받았는데 어떤 항목을 확인해야 하는지 모르는 상황
// Q2. 근로계약서에서 반드시 확인해야 할 4가지 필수 항목을 파악하고, 누락 시 회사에 요구하거나 신고한다
// Q3. 4가지 필수 항목(임금·소정근로시간·휴일·연차), 미교부 시 과태료 500만원, 양식 다운로드처
// Q4. GreenBox(4가지 요약) + Checklist(계약서 체크리스트) + Steps(미교부 시 대응) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "임금: 기본급, 수당, 상여금 등 구성항목과 계산 방법, 지급일",
  "소정근로시간: 주 몇 시간, 하루 몇 시간, 시작·종료 시각",
  "휴일: 주휴일이 언제인지 (보통 일요일)",
  "연차 유급휴가: 발생 기준과 사용 방법",
  "근무 장소와 업무 내용이 적혀 있는지",
  "계약 기간 (기간제라면 시작일·종료일)",
  "퇴직급여: 적용 여부와 지급 기준",
];

const STEPS_DATA = [
  {
    title: "회사에 서면 교부를 요청하세요",
    desc: "구두로라도 '근로계약서 서면으로 주세요'라고 요청하세요. 문자나 이메일로 요청하면 증거가 남아요. 근로기준법 제17조 2항에 따라 회사는 반드시 서면으로 교부해야 해요.",
    tip: "요청은 문자·이메일로 → 증거 남기기",
  },
  {
    title: "안 주면 고용노동부에 신고하세요",
    desc: "회사가 거부하면 관할 고용노동부 지청에 진정을 넣을 수 있어요. 온라인(고용노동부 민원마당)이나 전화(1350)로도 신고 가능해요. 회사에 과태료 500만원 이하가 부과돼요.",
    tip: "신고: 고용노동부 민원마당 또는 1350",
    link: { label: "고용노동부 민원마당", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "양식은 고용노동부 공식 사이트에서 다운로드하세요",
    desc: "고용노동부에서 정규직·기간제·단시간·일용직 등 7가지 유형별 표준근로계약서 양식을 무료로 제공해요. 이 양식을 출력해서 회사에 '이걸로 작성해 달라'고 요청하면 돼요.",
    tip: "7가지 유형별 양식 무료 제공",
    link: { label: "고용노동부 양식", href: "https://www.moel.go.kr/mainpop2.do" },
  },
];

const FAQS = [
  {
    q: "근로계약서 없이 일하면 계약이 무효인가요?",
    a: "아니에요. 구두 약속도 법적으로 유효한 근로계약이에요. 계약서가 없다고 해서 일한 대가를 못 받는 건 아니에요. 다만 분쟁이 생겼을 때 증거가 없어서 불리해지는 거예요.",
  },
  {
    q: "알바도 근로계약서를 받아야 하나요?",
    a: "당연히 받아야 해요. 단시간 근로자(알바)도 근로기준법이 동일하게 적용돼요. 오히려 단시간 근로자는 근로일, 근로시간대까지 추가로 서면 명시해야 해요.",
  },
  {
    q: "계약서에 서명했는데 내용이 불리한 것 같으면 어떡하나요?",
    a: "서명 후에도 근로기준법에 미달하는 조건은 자동으로 무효가 돼요. 예를 들어 최저임금보다 낮은 임금으로 계약했으면 그 부분만 무효이고, 최저임금이 적용돼요.",
  },
  {
    q: "근로계약서를 안 줬는데 과태료는 정확히 얼마예요?",
    a: "근로기준법 제114조에 따라 500만원 이하의 벌금이에요. 과태료가 아니라 벌금이라서 형사처벌 대상이에요. 1차 위반이어도 벌금이 부과될 수 있어요.",
  },
  {
    q: "전자 근로계약서도 유효한가요?",
    a: "네, 유효해요. 2021년부터 전자문서 형태의 근로계약서도 서면 교부와 동일한 효력이 있어요. 카카오톡 전자계약 같은 서비스를 이용해도 법적으로 인정돼요.",
  },
  {
    q: "수습 기간에도 근로계약서가 필요한가요?",
    a: "필요해요. 수습이든 정규직이든 근로를 시작하기 전에 근로계약서를 체결하고 교부받아야 해요. 수습 기간, 수습 종료 후 처우 변경 사항도 계약서에 명시돼야 해요.",
  },
];

const RELATED = [
  { slug: "임금-미지급-회사-고소", title: "임금 미지급 시 회사 고소 방법", description: "계약서에 적힌 임금을 안 주면 신고할 수 있어요." },
  { slug: "2026년-최저임금", title: "2026년 최저임금과 월급", description: "올해 최저시급과 월급 환산액 확인." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산법", description: "1년 이상 근무했다면 퇴직금 받을 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 계약서 · 필수 사항</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로계약서, 꼭 들어가야 할 4가지는?<br />
        필수 기재 사항과 표준 양식
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        새 직장에 출근했는데 계약서를 안 준다고요? 아니면 받긴 했는데 뭘 확인해야 할지 모르겠다고요?
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제17조</a>는 <strong>임금, 소정근로시간, 휴일, 연차 유급휴가</strong> 4가지를 반드시 서면으로 명시하라고 해요.
        이걸 안 주면 회사에 <strong>500만원 이하 벌금</strong>이 부과돼요.
        나중에 급여 분쟁이 생기면 계약서가 가장 강력한 증거니까, 지금 당장 확인해 보세요.
      </p>

      <Divider />

      <H2>반드시 들어가야 하는 4가지 항목이에요</H2>
      <p style={body}>
        근로기준법이 강제하는 4가지예요. 이 중 하나라도 빠져 있으면 불완전한 계약서이고, 회사가 위법이에요.
        특히 임금의 구성항목(기본급, 수당, 상여금 구분)과 계산 방법은 나중에 퇴직금 산정에도 직접 영향을 줘요.
      </p>

      <SectionBadge>4대 필수 기재 사항</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>기재 내용</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>주의할 점</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["임금", "기본급, 수당, 상여금 구성 + 계산법 + 지급일", "포괄임금 계약이면 초과근무 수당 확인"],
              ["소정근로시간", "주 몇 시간, 일 시작·종료 시각", "주 40시간 초과 시 연장근로수당 발생"],
              ["휴일", "주휴일 요일 (법정 주 1회 이상)", "주휴수당 지급 여부 확인"],
              ["연차 유급휴가", "발생 기준, 사용 방법, 미사용 수당", "1년 미만은 월 1일씩 최대 11일"],
            ].map(([item, content, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 700, color: "#1D9E75" }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{content}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280", fontSize: 13 }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        이 4가지 외에 근무 장소, 업무 내용, 계약 기간, 퇴직급여도 함께 적혀 있어야 완벽한 계약서예요. <a href="/w/퇴직금-계산-방법" style={{ color: "#085041", textDecoration: "underline" }}>퇴직금</a> 산정 시 임금 구성항목이 가장 중요해요.
      </GreenBox>

      <CategoryButton label="근로·노동 정보" count={12} href="/category/근로-노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>서명하기 전에 이것만 체크하세요</H2>
      <p style={body}>
        계약서를 받았으면 서명 전에 아래 항목을 하나씩 체크해 보세요. 서명한 뒤에 &quot;몰랐다&quot;고 해도 법적으로 효력이 있어요.
        빠진 항목이 있으면 수정을 요청하거나, 별도 확인서를 받아두세요.
      </p>

      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <H2>계약서를 안 줬다면 이렇게 대응하세요</H2>
      <p style={body}>
        &quot;우리 회사는 원래 계약서 안 써&quot;라고 하는 곳이 아직도 많아요. 하지만 이건 명백한 위법이에요.
        구두로 요청해도 안 주면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 신고할 수 있어요.
      </p>

      <Steps steps={STEPS_DATA} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 개별 사업장의 취업규칙이나 단체협약에 따라 세부 사항이 다를 수 있어요." />
    </ArticleLayout>
  );
}
