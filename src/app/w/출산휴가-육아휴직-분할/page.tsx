"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 출산 예정이거나 아이가 어린데, 육아휴직을 한 번에 다 쓰지 않고 나눠서 쓰고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 분할 횟수·기간을 확인하고 회사에 육아휴직 분할 사용 신청서를 제출하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 2025년부터 기간 1년6개월·분할 4회, 출산휴가는 분할 불가(예외: 조산 위험), 6+6 부모육아휴직제, 급여(월 최대 250만원), 신청 절차.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 변경사항) + 표(급여 구간) + Steps(신청 절차) + BorderBox(출산휴가 분할 불가) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "육아휴직을 6개월씩 3번 쓸 수 있나요?", a: "네, 2025년 2월부터 최대 4회(3회 분할)까지 나눠 쓸 수 있어요. 총 기간 1년 6개월 안에서 자유롭게 배분하면 돼요." },
  { q: "출산휴가를 나눠 쓸 수 있나요?", a: "원칙적으로 안 돼요. 90일(다태아 120일)을 연속으로 써야 해요. 조산·유산 위험이 있으면 의사 진단서를 받아 출산 전에 일부를 앞당겨 쓸 수 있어요." },
  { q: "분할 사용할 때 회사가 거부할 수 있나요?", a: "정당한 사유 없이 거부하면 불법이에요. 거부당하면 고용노동부(1350)에 진정을 제기할 수 있어요." },
  { q: "6+6 부모육아휴직제가 뭔가요?", a: "생후 18개월 이내 자녀를 둔 부모 둘 다 육아휴직 쓰면 첫 6개월간 급여가 올라가요. 2026년 기준 월 최대 450만원까지 지원돼요." },
  { q: "육아기 근로시간 단축이랑 같이 쓸 수 있나요?", a: "가능해요. 육아휴직 대신 근로시간 단축을 선택할 수도 있고, 휴직과 단축을 조합해서 쓸 수도 있어요." },
  { q: "아빠도 육아휴직 분할 사용이 되나요?", a: "당연해요. 성별 관계없이 만 8세 이하 자녀를 둔 근로자라면 동일한 조건으로 분할 사용 가능해요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "남녀고용평등법 (법제처)", url: "https://www.law.go.kr/법령/남녀고용평등과일가정양립지원에관한법률" },
      { label: "고용노동부 육아휴직 안내", url: "https://www.moel.go.kr/news/cardinfo/view.do?bbs_seq=20250100172" },
      { label: "고용24 육아휴직 제도", url: "https://m.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systClId=SC00000251&systId=SI00000402" },
    ],
  },
];

const APPLY_STEPS = [
  { title: "분할 계획 수립", desc: "총 1년 6개월 안에서 몇 번에 나눠 쓸지 정해요. 최대 4회까지 가능해요.", tip: "첫 번째 때 전체 계획을 밝힐 필요 없어요" },
  { title: "회사에 신청서 제출", desc: "육아휴직 시작 30일 전까지 서면으로 신청해요. 시작일과 종료일을 적어요.", tip: "긴급 상황이면 7일 전까지도 가능해요" },
  { title: "고용센터에 급여 신청", desc: "육아휴직 시작 후 1개월 뒤부터 고용24(work24.go.kr)에서 매월 급여를 신청해요." },
  { title: "복직 후 다음 분할 신청", desc: "복직해서 근무하다가 필요할 때 다시 신청서를 내면 돼요." },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 육아 · 휴직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        출산휴가·육아휴직 분할 사용<br />
        횟수·급여·신청 방법 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아이 낳고 6개월 쉬고, 나중에 초등학교 입학할 때 또 쉬고 싶으시죠?
        2025년 2월부터 육아휴직을 최대 4회까지 나눠 쓸 수 있고, 기간도 1년 6개월로 늘었어요.
        분할 조건, 급여, 신청 방법까지 알려드릴게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>육아휴직 분할, 뭐가 달라졌나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/남녀고용평등과일가정양립지원에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>남녀고용평등법</a> 개정으로
        2025년 2월 23일부터 분할 횟수와 기간이 모두 늘었어요.
      </p>

      <GreenBox title="2025년 개정 핵심">
        · 총 기간: 1년 → <strong>1년 6개월</strong>로 연장<br />
        · 분할 횟수: 최대 2회 → <strong>최대 4회</strong>(3회 분할)로 확대<br />
        · 대상: 만 8세 이하 또는 초등학교 2학년 이하 자녀<br />
        · 1~2주 단기 육아휴직도 연 1회 가능 (기존 기간에서 차감)
      </GreenBox>

      <p style={body}>
        예를 들면 이런 식이에요. 출산 직후 6개월 → 복직 → 아이 3살 때 4개월 → 복직 → 초등 입학 때 4개월 → 복직 → 학교 적응할 때 4개월.
        이렇게 4번에 걸쳐 총 18개월을 나눠 쓸 수 있어요.
      </p>

      <Divider />

      <H2>출산휴가는 분할할 수 있나요?</H2>
      <p style={body}>
        출산전후휴가는 <strong>원칙적으로 분할이 안 돼요</strong>.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>에서
        90일(다태아 120일)을 연속 사용하도록 정하고 있어요.
      </p>

      <BorderBox>
        출산휴가 예외 상황이에요.<br />
        · <strong>조산·유산 위험</strong>이 있으면 의사 진단서를 받아 출산 전 일부를 앞당겨 쓸 수 있어요<br />
        · 출산 후 휴가는 <strong>최소 45일</strong> 이상 반드시 보장돼요<br />
        · 유산·사산 시에는 임신 기간에 따라 5~90일 휴가가 별도로 부여돼요
      </BorderBox>

      <Divider />

      <H2>육아휴직 급여는 얼마 받나요?</H2>
      <p style={body}>
        2026년 기준 육아휴직 급여는 기간에 따라 달라져요.
        <a href="https://m.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systClId=SC00000251&systId=SI00000402" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 매월 신청하면 돼요.
      </p>

      <SectionBadge>2026년 육아휴직 급여</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>기간</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>월 최대 급여</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1~3개월", "월 250만원", "통상임금의 100%"],
              ["4~6개월", "월 200만원", "통상임금의 80%"],
              ["7개월 이후", "월 160만원", "통상임금의 50%"],
              ["6+6 부모육아휴직", "월 최대 450만원", "부모 모두 휴직 시 첫 6개월"],
            ].map(([period, amount, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee", background: i === 3 ? "#f0faf6" : undefined }}>
                <td style={{ padding: "9px 12px" }}>{period}</td>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#1D9E75" }}>{amount}</td>
                <td style={{ padding: "9px 12px", color: "#666" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        6+6 부모육아휴직제는 생후 18개월 이내 자녀를 둔 부모 둘 다 육아휴직을 쓸 때 적용돼요.
        첫 6개월간 급여가 일반 육아휴직보다 높게 나오니까, 가능하면 부모가 동시에 쓰는 게 경제적으로 유리해요.
      </p>

      <ArticleAd position="mid" />
      <Divider />

      <H2>어떻게 신청하나요?</H2>
      <p style={body}>
        회사에 서면 신청서를 내면 돼요. 회사가 정당한 사유 없이 거부하면
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 진정을 제기할 수 있어요.
      </p>

      <SectionBadge>분할 사용 신청 절차</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 법령과 고용노동부 자료를 바탕으로 작성했어요. 회사별 취업규칙에 따라 세부 절차가 다를 수 있어요." />
    </div>
  );
}
