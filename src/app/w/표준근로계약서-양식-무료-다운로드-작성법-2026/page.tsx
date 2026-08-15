"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 새로 알바나 계약직을 시작하거나 고용하게 돼서 근로계약서 양식이 당장 필요한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 고용노동부 표준 양식을 다운로드하고, 정규직·계약직·알바 중 맞는 것 골라 빈칸을 채워 서명까지 완료하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 어떤 양식이 내 상황에 맞는지, 필수 기재 항목 7가지, 2026 최저임금, 미작성 시 벌금, 2부 교부 의무.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → 양식 비교표 + Steps(작성 절차) + Checklist(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "양식 고르기 — 3종 중 하나 선택",
    desc: "정규직이면 '표준근로계약서', 기간을 정한 계약직이면 '기간제 근로계약서', 주 40시간 미만 알바라면 '단시간 근로계약서'를 골라요. 고용노동부 사이트에서 한글·워드·PDF 모두 무료로 받을 수 있어요.",
    tip: "고용노동부 → 정보공개 → 법령정보 → 표준근로계약서",
    link: { label: "고용노동부 양식 다운로드 페이지", href: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do" },
  },
  {
    title: "필수 7개 항목 빠짐없이 채우기",
    desc: "근로계약기간, 근무장소, 업무내용, 근로시간(시작·종료·휴게), 임금(금액·지급일·지급방법), 연차휴가, 사회보험 적용 여부예요. 이 중 하나라도 빠지면 근로기준법 위반이에요.",
    tip: "2026년 최저임금 시급 10,320원, 월 209시간 기준 월급 2,156,880원 이상이어야 해요",
  },
  {
    title: "2부 출력 후 양쪽 서명·날인",
    desc: "사업주와 근로자가 모두 서명하거나 도장을 찍어야 효력이 생겨요. 서명 또는 날인 중 하나만 해도 돼요. 전자서명도 법적으로 유효해요.",
    tip: "서명 없이 양식만 출력해두면 계약서로 인정 안 돼요",
  },
  {
    title: "근로자에게 1부 즉시 교부",
    desc: "계약서 2부를 만들어서 1부는 사업주가, 1부는 반드시 근로자에게 줘야 해요. 안 주면 500만원 이하 벌금이에요. 교부 시기는 근로 시작일 전이 원칙이에요.",
    tip: "교부했다는 증거를 카카오톡·이메일 등으로 남겨두면 나중에 분쟁 방지돼요",
  },
];

const CHECKLIST = [
  "임금이 2026년 최저임금(시급 10,320원) 이상인지 체크",
  "근로계약기간 — 정규직은 '기간 정함 없음', 계약직은 시작일~종료일 명시",
  "휴게시간 — 4시간 근무에 30분 이상, 8시간 근무에 1시간 이상",
  "단시간 알바 — 주 15시간 이상이면 주휴수당 지급 의무 존재",
  "수습기간 감액 — 1년 이상 계약 + 단순노무직 아닌 경우만 3개월 90% 적용 가능",
  "계약직 2년 초과 고용 시 자동 무기계약직 전환 (기간제법 제4조)",
  "계약서 2부 작성 → 근로자에게 1부 즉시 교부 (미교부 시 500만원 이하 벌금)",
];

const FAQS = [
  {
    q: "근로계약서 안 쓰면 벌금이 얼마예요?",
    a: "사업주에게 500만원 이하 벌금이에요. 하루 알바도 근로계약서 작성은 법적 의무예요. 근로자에게 교부 안 해도 똑같이 500만원 이하 벌금이에요.",
  },
  {
    q: "양식을 내 회사 방침대로 고쳐도 되나요?",
    a: "표준 양식보다 근로자에게 유리하게 고치는 건 괜찮아요. 반대로 최저임금 이하 임금 기재, 휴게시간 단축 같은 불리한 변경은 무효예요.",
  },
  {
    q: "알바 중간에 시급이 오르면 새로 써야 하나요?",
    a: "네, 임금이 바뀌면 변경 계약서를 다시 작성해야 해요. 구두로만 약속하면 나중에 분쟁 시 증명이 어려워요.",
  },
  {
    q: "계약직을 2년 넘게 고용하면 무조건 정규직이 되나요?",
    a: "기간제법 제4조에 따라 2년 초과 고용 시 무기계약직으로 전환돼요. 단, 55세 이상 고령자, 박사학위 취득자, 전문직은 예외예요.",
  },
  {
    q: "전자 근로계약서도 법적 효력이 있나요?",
    a: "네, 전자문서법에 따라 이메일이나 카카오 인증 방식의 전자서명도 법적 효력이 있어요. 단, 전자서명이 포함돼야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제17조: 근로조건의 명시", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "기간제법 제4조: 기간제 사용 제한", url: "https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" },
      { label: "최저임금법", url: "https://www.law.go.kr/법령/최저임금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 표준근로계약서 양식", url: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do" },
      { label: "최저임금위원회 — 2026년 최저임금", url: "https://www.minimumwage.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-계산기", title: "퇴직금 계산기", description: "평균임금 기준 퇴직금 자동 계산이에요." },
  { slug: "주휴수당-계산기", title: "주휴수당 계산기", description: "주 15시간 이상 알바라면 주휴수당이 붙어요." },
  { slug: "4대보험료-계산기", title: "4대보험료 계산기", description: "월급에서 빠지는 보험료를 미리 확인해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로계약 · 양식 · 노동법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        표준근로계약서 양식 무료 다운로드<br />
        정규직·계약직·알바 작성법 2026
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약서 없이 일하면 임금 분쟁 시 증거가 없어요.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제17조</a>에 따라
        하루짜리 알바도 반드시 서면 계약서를 작성해야 해요. 고용노동부 표준 양식을 무료로 받아서
        빈칸만 채우면 되니까 어렵지 않아요.
      </p>

      <Divider />

      <H2>3종 양식 중 내 상황에 맞는 것 고르기</H2>
      <p style={body}>
        양식이 틀리면 필수 항목이 빠질 수 있어요. 정규직·계약직·알바 세 가지 상황을 먼저 파악하고 골라요.
        고용노동부 사이트에서 한글·워드·PDF 모두 무료로 받을 수 있어요.
      </p>

      <SectionBadge>양식 종류 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", whiteSpace: "nowrap" }}>양식</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>적용 대상</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>특이사항</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["표준근로계약서", "정규직, 무기계약직", "기간 정함 없음 기재"],
              ["기간제 근로계약서", "계약직 (기간 정함)", "시작일·종료일 명시 필수, 2년 초과 시 자동 전환"],
              ["단시간 근로계약서", "알바, 파트타임 (주 40시간 미만)", "근무 요일·시간 명확히 기재"],
            ].map(([type, target, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#1D9E75", whiteSpace: "nowrap" }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{target}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "#555" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        고용노동부 공식 양식은 무료예요. 민간 사이트에서 유료로 파는 양식과 내용이 동일하니까 굳이 돈 낼 필요 없어요.
      </GreenBox>

      <Divider />

      <H2>작성 절차 4단계</H2>
      <p style={body}>
        양식을 받았으면 4단계 순서로 작성하면 돼요. 특히 2부 작성 후 근로자에게 1부 교부하는 마지막 단계를 빠뜨리는 경우가 많아요.
        교부 안 하면 사업주가 500만원 이하 벌금을 물어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>2026년 최저임금 반영 필수 항목</H2>
      <p style={body}>
        2026년 최저임금은 시급 10,320원이에요. 월 209시간 기준으로 환산하면 월급 2,156,880원이 최저선이에요.
        이보다 낮은 금액을 계약서에 적으면 그 부분은 무효고, 사업주는 3년 이하 징역 또는 2,000만원 이하 벌금을 받을 수 있어요.
      </p>

      <BorderBox>
        주 15시간 이상 알바라면 주휴수당도 줘야 해요. 시급 10,320원에 주 5일 4시간씩 일하면 주휴수당 포함 실제 시급은{" "}
        <strong>12,384원</strong>이에요.
      </BorderBox>

      <p style={body}>
        수습기간 급여를 깎으려면 조건이 있어요. 계약 기간 1년 이상이면서 단순노무직이 아니어야 수습 3개월간 90%까지 감액 가능해요.
        짧은 계약 알바는 수습 감액 자체가 안 돼요.
      </p>

      <Divider />

      <H2>서명 전 체크리스트</H2>
      <p style={body}>
        계약서 작성 후 서명 전에 아래 항목을 하나씩 짚어보세요. 나중에 분쟁이 생겼을 때 계약서가 근거가 돼요.
      </p>

      <SectionBadge>서명 전 확인</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 1월 기준 근로기준법과 최저임금법을 바탕으로 작성됐어요. 법령 개정 시 달라질 수 있으니 최신 정보는 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
