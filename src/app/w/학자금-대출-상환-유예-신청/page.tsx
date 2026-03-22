"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 학자금 대출을 갚아야 하는데 취업이 안 됐거나 소득이 적어서 상환을 미루고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인 대출 유형(ICL/일반상환)에 맞는 유예 방법을 확인하고 한국장학재단이나 국세청에 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → ICL은 상환기준소득(연 3,037만원) 미달 시 자동유예, 실직·육아휴직 2년·재학 4년 유예, 일반상환은 특별상환유예대출(3년 유예+4년 무이자), 신청처.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(유예 종류 요약) + 표(유예 사유·기간) + Steps(신청 절차) + BorderBox(특별상환유예대출) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "상환유예 신청 어디서 하나요?", a: "ICL 의무상환액 유예는 홈택스(국세청), 특별상환유예대출·프리워크아웃은 한국장학재단 홈페이지(kosaf.go.kr)나 앱에서 해요." },
  { q: "유예하면 이자가 계속 붙나요?", a: "ICL 일반 유예는 이자가 붙어요. 특별상환유예대출은 무이자로 전환돼서 이자 부담이 없어요." },
  { q: "상환기준소득이 뭔가요?", a: "2026년 기준 연 3,037만원(총급여 기준)이에요. 이 소득 이하면 ICL 의무상환이 발생하지 않아요." },
  { q: "유예 기간이 끝나면 어떻게 되나요?", a: "유예받은 금액을 내야 해요. 기한 내 미납 시 연체로 처리돼요. 여유가 생기면 조금씩이라도 갚는 게 좋아요." },
  { q: "이자 면제 대상이 누구예요?", a: "2026년 7월부터 소득 6구간(가구 소득 월 약 844만원) 이하까지 이자가 면제돼요. 기존 5구간에서 확대됐어요." },
  { q: "프리워크아웃은 뭔가요?", a: "이미 연체가 시작된 경우 이용하는 제도예요. 최대 20년 분할상환이 가능하고, 지연배상금이 감면돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "한국장학재단", url: "https://www.kosaf.go.kr" },
      { label: "ICL 취업후상환 학자금대출", url: "https://www.icl.go.kr" },
      { label: "국세청 학자금상환", url: "https://www.nts.go.kr" },
    ],
  },
];

const ICL_STEPS = [
  { title: "홈택스 로그인", desc: "hometax.go.kr에 접속해서 공동인증서나 간편인증으로 로그인해요." },
  { title: "학자금상환 메뉴 진입", desc: "'학자금상환' → '상환유예 신청'을 선택해요." },
  { title: "유예 사유 선택·서류 제출", desc: "실직·육아휴직·재학 등 사유를 선택하고 증빙서류를 첨부해요." },
  { title: "신청 완료", desc: "신청 후 심사를 거쳐 승인돼요. 문의는 국세청 126번(내선 1+4)이에요." },
];

const SPECIAL_STEPS = [
  { title: "한국장학재단 로그인", desc: "kosaf.go.kr 또는 앱에서 간편인증으로 로그인해요." },
  { title: "특별상환유예대출 메뉴 선택", desc: "'학자금대출' → '특별상환유예대출'을 선택해요." },
  { title: "증빙서류 업로드", desc: "미취업·실직·폐업 등 경제적 곤란 증빙을 첨부해요." },
  { title: "신청 완료", desc: "승인되면 기존 대출이 무이자로 전환돼요. 문의는 1599-2000이에요." },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 대출 · 학자금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        학자금 대출, 당장 못 갚겠다면?<br />
        상환유예 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        학자금 대출 받았는데 아직 취업이 안 됐거나 소득이 적어서 갚기 어려우시죠?
        상환유예를 신청하면 2~4년간 갚는 걸 미룰 수 있어요.
        대출 유형에 따라 유예 방법이 다르니까 본인에 맞는 걸 찾아보세요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>내 대출은 어떤 유형인가요?</H2>
      <p style={body}>
        학자금 대출은 크게 취업후상환(ICL)과 일반상환 두 가지예요.
        유형에 따라 유예 방법이 달라요.
      </p>

      <GreenBox title="대출 유형별 유예 방법">
        · <strong>취업후상환(ICL)</strong>: 소득이 연 3,037만원 이하면 자동 유예. 초과해도 사유가 있으면 별도 유예 신청 가능<br />
        · <strong>일반상환</strong>: 매달 갚아야 하지만, 경제적 곤란 시 특별상환유예대출 신청 가능 (3년 유예 + 4년 무이자)<br />
        · 신청처: ICL은 <strong>국세청(홈택스)</strong>, 일반상환은 <strong>한국장학재단</strong>
      </GreenBox>

      <Divider />

      <H2>ICL 상환유예 조건과 신청</H2>
      <p style={body}>
        <a href="https://www.icl.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>취업후상환 학자금대출(ICL)</a>은
        소득이 상환기준소득(2026년 연 3,037만원) 이하면 의무상환이 발생하지 않아요.
        소득이 초과해도 아래 사유가 있으면 별도로 유예 신청할 수 있어요.
      </p>

      <SectionBadge>ICL 유예 사유와 기간</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>사유</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>유예 기간</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>필요 서류</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["실직·퇴직", "2년", "퇴직증명서"],
              ["육아휴직", "2년", "인사발령서 + 가족관계증명서"],
              ["폐업", "2년", "폐업사실증명"],
              ["대학(원) 재학 중", "4년", "재학증명서"],
            ].map(([reason, period, docs], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{reason}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75" }}>{period}</td>
                <td style={{ padding: "9px 12px", color: "#666" }}>{docs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionBadge>ICL 유예 신청 절차</SectionBadge>
      <Steps steps={ICL_STEPS} />

      <ArticleAd position="mid" />
      <Divider />

      <H2>일반상환은 특별상환유예대출을 신청하세요</H2>
      <p style={body}>
        일반상환 학자금대출은 매달 원리금을 갚아야 하는데, 경제적으로 어려우면
        <a href="https://www.kosaf.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장학재단</a>에서
        특별상환유예대출을 신청할 수 있어요.
      </p>

      <BorderBox>
        <strong>특별상환유예대출 조건</strong><br />
        · 만 35세 이하, 학부 또는 대학원 졸업(자퇴·제적 포함)<br />
        · 아래 중 1개 이상 해당: 군복무, 부모/본인 실직·폐업, 기초생활수급자, 중증질병, 부모 사망<br /><br />
        <strong>혜택</strong><br />
        · 원리금 납부유예: <strong>최대 3년</strong><br />
        · 이후 <strong>4년간 무이자</strong> 분할상환 또는 만기 일시상환<br />
        → 기존 대출이 무이자로 전환되는 거예요
      </BorderBox>

      <SectionBadge>특별상환유예대출 신청 절차</SectionBadge>
      <Steps steps={SPECIAL_STEPS} />

      <Divider />

      <H2>2026년 달라진 점이 있나요?</H2>
      <p style={body}>
        2026년부터 학자금대출 제도가 개선됐어요.
      </p>

      <GreenBox title="2026년 변경사항">
        · 상환기준소득: 연 2,851만원 → <strong>연 3,037만원</strong>으로 인상<br />
        · 이자 면제: 5구간 이하 → <strong>6구간 이하</strong>로 확대 (2026년 7월~)<br />
        · ICL 등록금 대출: 소득 제한 없이 대학생·대학원생 <strong>모두 신청 가능</strong><br />
        · 금리: 연 1.7% 동결
      </GreenBox>

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 한국장학재단·국세청 자료를 바탕으로 작성했어요. 문의: 한국장학재단 1599-2000, 국세청 126(내선 1+4)." />
    </div>
  );
}
