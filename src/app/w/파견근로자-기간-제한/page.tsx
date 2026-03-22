"use client";

// Q1. 파견직으로 2년 가까이 같은 회사에서 일하고 있는데, 정규직 전환이 되는 건지 불안한 상황
// Q2. 2년 초과 여부 확인하고 사용사업주에게 직접고용을 요구하기
// Q3. 파견법 제6조의2 (2년 초과=직접고용 의무), 전문 업무 예외, 기간 합산 규정, 거부 시 과태료 3천만원
// Q4. GreenBox(기간 제한 요약표) + EligibilityChecker(직접고용 대상인지) + Steps(직접고용 요구 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, EligibilityChecker,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "2년 되기 전에 끊고 다시 파견하면 리셋되나요?", a: "안 돼요. 3개월 이내 같은 사업장에 재파견되면 이전 기간과 합산해요. 꼼수는 통하지 않아요." },
  { q: "직접고용 시 기간제로 채용할 수 있나요?", a: "원칙적으로 기간의 정함이 없는 고용(무기계약)이어야 해요. 대법원 판례에서 기간제 채용은 위법이라고 봤어요." },
  { q: "직접고용되면 임금이 바뀌나요?", a: "파견 당시와 동일하거나 그 이상이어야 해요. 직접고용을 이유로 임금을 깎거나 직급을 낮출 수 없어요." },
  { q: "IT 개발자는 2년 제한이 없나요?", a: "파견법 시행령에 명시된 전문 업무(소프트웨어 개발, 시스템 엔지니어 등)는 예외로 2년을 초과할 수 있어요." },
  { q: "회사가 직접고용을 거부하면 어떻게 하나요?", a: "고용노동부(1350)에 신고하세요. 직접고용 의무 위반으로 3천만원 이하 과태료가 부과되고, 고용 명령이 나와요." },
  { q: "출산 대체 파견도 2년 제한인가요?", a: "출산·질병·부상 등으로 결원이 생긴 경우의 대체 파견은 2년 제한 예외예요. 대체 사유가 소멸하면 파견도 종료돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "파견근로자보호 등에 관한 법률 제6조의2", url: "https://www.law.go.kr/법령/파견근로자보호등에관한법률" },
      { label: "고용노동부 파견근로자 안내", url: "https://www.moel.go.kr" },
      { label: "찾기쉬운 생활법령정보 - 파견근로자", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1390" },
    ],
  },
];

const RELATED = [
  { slug: "고객응대근로자-정의-범위", title: "고객응대근로자 보호", description: "감정노동자 법적 보호 범위를 다뤄요." },
  { slug: "휴업수당-지급-기준-계산", title: "휴업수당 지급 기준", description: "회사 귀책사유로 쉴 때 받는 수당이에요." },
  { slug: "연차촉진-제도-절차", title: "연차촉진 제도 절차", description: "연차 미사용수당 청구 조건을 다뤄요." },
];

const CHECK_ITEMS = [
  { id: "c1", label: "파견 회사(A)에 소속되어 다른 회사(B)에서 일하고 있어요" },
  { id: "c2", label: "같은 사용사업주(B) 사업장에서 2년 넘게 근무하고 있어요" },
  { id: "c3", label: "내 업무가 전문 업무(IT·엔지니어링 등) 예외에 해당하지 않아요" },
  { id: "c4", label: "출산·질병 대체 파견이 아닌 일반 파견이에요" },
];

const STEPS_DATA = [
  { title: "파견 기간 2년 초과 확인", desc: "파견 시작일부터 현재까지 기간을 세세요. 중간에 끊겼다가 3개월 내 재파견됐으면 합산해요. 2년(730일) 초과 여부가 핵심이에요." },
  { title: "사용사업주에게 직접고용 요구", desc: "서면(이메일 가능)으로 '파견법 제6조의2에 따라 직접고용을 요구합니다'라고 통보하세요. 증거를 남기는 게 중요해요." },
  { title: "거부 시 고용노동부 신고", desc: "사용사업주가 직접고용을 거부하면 고용노동부(1350) 또는 관할 고용센터에 신고하세요. 3천만원 이하 과태료 + 고용 명령이 나와요." },
  { title: "노동위원회 구제신청 (필요 시)", desc: "직접고용 후 부당한 근로조건이 제시되면 노동위원회에 구제신청할 수 있어요. 임금·직급이 파견 당시보다 낮으면 위법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 파견근로 · 직접고용</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        파견근로 2년 넘으면 정규직?<br />
        직접고용 요구 조건과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        파견 회사 소속으로 같은 사업장에 2년 가까이 나가고 있는데, 앞으로 어떻게 되는 건지 걱정되시죠?
        파견법 제6조의2에 따라 2년을 초과하면 사용사업주가 직접고용할 의무가 생겨요.
        거부하면 3천만원 이하 과태료예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>파견근로 기간 제한 핵심</H2>
      <p style={body}>
        복잡한 법 조문을 간단하게 정리하면 이래요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>항목</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "최대 파견 기간", rule: "2년 (1년 + 1년 연장)" },
              { item: "2년 초과 시", rule: "사용사업주 직접고용 의무 발생" },
              { item: "고용 형태", rule: "기간의 정함이 없는 고용 (무기계약)" },
              { item: "거부 시 과태료", rule: "3천만원 이하" },
              { item: "기간 합산", rule: "3개월 내 재파견 시 이전 기간 합산" },
              { item: "전문 업무 예외", rule: "IT·엔지니어링 등 시행령 지정 업무" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.item}</td>
                <td style={{ padding: "5px 8px" }}>{row.rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 파견근로자보호 등에 관한 법률 제6조의2 기준
        </p>
      </GreenBox>

      <H2>직접고용 대상인지 확인하세요</H2>
      <p style={body}>
        아래 항목을 체크해 보세요. 전부 해당하면 직접고용을 요구할 수 있어요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="직접고용 요구 대상이에요. 사용사업주에게 서면으로 직접고용을 요구하세요. 거부하면 고용노동부 신고로 3천만원 과태료가 부과돼요."
        partialMatchText="일부 조건이 충족돼요. 파견 기간 합산 여부와 전문 업무 예외 해당 여부를 정확히 확인하세요."
      />

      <H2>직접고용 요구 절차</H2>
      <p style={body}>
        2년이 지났다면 바로 행동하세요. 시간이 지날수록 불리해질 수 있어요.
      </p>

      <Steps steps={STEPS_DATA} />

      <H2>전문 업무 예외 대상</H2>
      <p style={body}>
        일부 고도 전문 업무는 2년 제한이 없어요. 내 업무가 여기 해당하는지 확인하세요.
      </p>

      <BorderBox>
        <strong>2년 제한 예외 전문 업무 (파견법 시행령)</strong><br /><br />
        ▶ 컴퓨터 관련 전문가 (시스템 엔지니어, 소프트웨어 개발자)<br />
        ▶ 기계·전기·전자·화학 엔지니어<br />
        ▶ 특허 전문가, 통번역사<br />
        ▶ 출산·질병·부상 결원 대체 파견<br /><br />
        ★ 정확한 업무 해당 여부는 고용노동부(1350)에 확인하세요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 파견근로자보호법 기준으로 작성됐어요. 전문 업무 예외 목록은 시행령 개정에 따라 변경될 수 있으니 고용노동부에 확인하세요." />
    </ArticleLayout>
  );
}
