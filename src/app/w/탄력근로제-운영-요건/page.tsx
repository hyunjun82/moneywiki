"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 인사담당자나 사업주인데 탄력근로제를 도입하려는데 법적 요건이 뭔지, 수당은 어떻게 계산하는지 알고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 단위기간별 요건을 확인하고 근로자대표와 서면 합의 후 탄력근로제를 도입하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 2주/3개월/6개월 단위별 요건, 서면 합의 필수 내용, 주 52시간·일 12시간 한도, 가산수당(50%), 11시간 연속 휴식(6개월), 중도 퇴사 시 정산.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → 비교표(단위기간별 요건) + Steps(도입 절차) + GreenBox(핵심 한도) + BorderBox(수당 계산) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "탄력근로제 도입할 때 근로자 전원 동의가 필요한가요?", a: "2주 단위는 근로자 과반수 동의면 돼요. 3개월 단위는 근로자대표와 서면 합의, 6개월 단위는 서면 합의 + 개별 근로자 동의까지 필요해요." },
  { q: "탄력근로제 중에도 연장근로수당 받을 수 있나요?", a: "주 52시간을 초과하면 연장근로수당 50% 가산해서 지급해야 해요. 야간(밤 10시~새벽 6시) 근무는 별도 50% 가산이에요." },
  { q: "중도 퇴사하면 수당을 어떻게 계산하나요?", a: "실제 근무한 주수로 평균을 다시 계산해요. 평균 주 40시간을 초과한 시간은 연장근로로 보고 가산수당을 지급해야 해요." },
  { q: "6개월 단위에서 근로자가 동의를 거부하면요?", a: "거부한 근로자는 탄력근로제에서 제외해야 해요. 강제로 적용하면 불법이에요." },
  { q: "특정 주에 60시간 일하게 할 수 있나요?", a: "안 돼요. 어떤 단위든 특정 주 최대 52시간, 특정 일 최대 12시간이 한도예요." },
  { q: "탄력근로제와 선택적 근로시간제는 뭐가 다른가요?", a: "탄력근로제는 회사가 근로시간 배분을 정하고, 선택적 근로시간제는 근로자가 출퇴근 시간을 자유롭게 정해요. 도입 요건이 달라요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로기준법 제51조 (법제처)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 탄력근로제 가이드", url: "https://www.moel.go.kr" },
    ],
  },
];

const INTRO_STEPS = [
  { title: "취업규칙에 근거 조항 마련", desc: "탄력근로제 실시 가능 조항을 취업규칙에 넣어요. 불리한 변경이면 근로자 과반수 동의 필요해요." },
  { title: "근로자대표와 서면 합의", desc: "대상 근로자 범위, 단위 기간, 시작일, 주별·일별 근로시간을 명시해요.", tip: "3개월·6개월 단위에서 필수예요" },
  { title: "개별 동의 확보 (6개월 단위만)", desc: "대상 근로자 전원에게 동의서를 받아요. 거부 시 해당 근로자는 제외해요.", tip: "동의서는 3년간 보관 의무" },
  { title: "관할 노동청 신고", desc: "변경된 취업규칙을 관할 노동청에 신고해요." },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 근무제도</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        탄력근로제 운영 요건<br />
        단위기간별 조건·수당 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        성수기엔 일이 몰리고 비수기엔 한가한 업종이시죠?
        탄력근로제를 쓰면 성수기에 52시간까지 일하고 비수기에 쉴 수 있어요.
        다만 법에서 정한 요건을 정확히 지켜야 해요. 단위기간별 조건과 수당 계산법을 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>단위기간별 요건은 뭐가 다른가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제51조</a>에서
        2주·3개월·6개월 단위로 각각 다른 요건을 정하고 있어요.
        단위기간이 길어질수록 요건이 까다로워져요.
      </p>

      <SectionBadge>단위기간별 핵심 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2주 이내</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>3개월 이내</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>6개월 이내</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["도입 방법", "취업규칙", "서면 합의", "서면 합의 + 개별 동의"],
              ["특정 주 한도", "48시간", "52시간", "52시간"],
              ["특정 일 한도", "12시간", "12시간", "12시간"],
              ["연속 2주 평균", "-", "-", "48시간 이내"],
              ["연속 휴식", "-", "-", "11시간 이상"],
              ["평균", "주 40시간", "주 40시간", "주 40시간"],
            ].map(([label, w2, m3, m6], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px" }}>{w2}</td>
                <td style={{ padding: "9px 12px" }}>{m3}</td>
                <td style={{ padding: "9px 12px" }}>{m6}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox title="핵심 한도">
        어떤 단위든 평균 주 40시간은 반드시 지켜야 해요.
        성수기에 52시간 일했으면 비수기에 그만큼 줄여야 하는 구조예요.
        6개월 단위는 건강 보호를 위해 연속 2주 평균 48시간 제한과 11시간 연속 휴식 의무가 추가돼요.
      </GreenBox>

      <Divider />

      <H2>도입 절차는 어떻게 되나요?</H2>
      <p style={body}>
        2주 단위는 취업규칙만 변경하면 되지만, 3개월·6개월 단위는 근로자대표와 서면 합의가 필수예요.
        서면 합의에는 대상 근로자 범위, 단위기간, 시작일, 주별·일별 근로시간을 구체적으로 적어야 해요.
      </p>

      <SectionBadge>탄력근로제 도입 절차</SectionBadge>
      <Steps steps={INTRO_STEPS} />

      <ArticleAd position="mid" />
      <Divider />

      <H2>가산수당은 어떻게 계산하나요?</H2>
      <p style={body}>
        탄력근로제를 적용해도 법정 한도를 초과하면 가산수당을 줘야 해요.
        연장·야간·휴일 근로수당은 각각 통상임금의 50% 가산이에요.
      </p>

      <SectionBadge>수당 발생 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>수당 종류</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>발생 기준</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>가산율</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["연장근로수당", "주 52시간 초과", "50%"],
              ["야간근로수당", "밤 10시~새벽 6시", "50%"],
              ["휴일근로수당", "주휴일·법정공휴일", "50%"],
              ["연장 + 야간 중복", "야간에 연장근로", "100%"],
              ["휴일 + 연장 중복", "휴일에 연장근로", "100%"],
            ].map(([type, trigger, rate], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{trigger}</td>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#1D9E75" }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        수당 계산 예시예요.<br />
        통상시급 1만원인 근로자가 주 60시간 일했다면:<br />
        · 52시간까지: 정상 지급<br />
        · 초과 8시간: 1만원 × 1.5 × 8시간 = <strong>12만원 추가</strong><br />
        야간(밤 10시~새벽 2시, 4시간) 근무까지 했다면:<br />
        · 연장 + 야간 중복 4시간: 1만원 × 2.0 × 4시간 = <strong>8만원 추가</strong>
      </BorderBox>

      <Divider />

      <H2>중도 퇴사하면 어떻게 정산하나요?</H2>
      <p style={body}>
        단위기간이 끝나기 전에 퇴사하면 실제 근무한 주수로 평균을 다시 계산해요.
        평균 주 40시간을 초과한 시간은 연장근로로 보고 가산수당을 지급해야 해요.
      </p>

      <GreenBox title="정산 예시">
        3개월(13주) 단위 중 6주차에 퇴사했다면, 실제 6주간 총 근로시간 ÷ 6 = 평균 주 근로시간.
        이 평균이 40시간을 넘으면 초과분 × 통상시급 × 1.5를 추가 지급해야 해요.
      </GreenBox>

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 고용노동부 자료를 바탕으로 작성했어요. 사업장 규모와 업종에 따라 세부 적용이 다를 수 있어요." />
    </div>
  );
}
