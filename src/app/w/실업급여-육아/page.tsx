"use client";

// Q1. 임신·출산·육아로 퇴직했거나 구직활동을 못 해서, 실업급여를 받을 수 있는지 걱정되는 상황.
// Q2. 수급유예 또는 구직활동 면제를 신청해서 실업급여 권리를 보전하는 행동.
// Q3. 수급유예 vs 구직활동면제 차이, 신청 조건과 절차, 최대 4년 연장, 고용보험 180일 요건.
// Q4. GreenBox(핵심 차이) + 표(비교) + Steps(신청 절차) + BorderBox(계산 예시) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "수급유예 중에도 실업급여를 받나요?",
    a: "아니요. 수급유예 중에는 급여가 안 나와요. 대신 나중에 구직활동 재개할 때 받을 수 있는 기간이 연장돼요.",
  },
  {
    q: "임신 때문에 자발적으로 퇴직해도 실업급여 자격이 되나요?",
    a: "네, 고용보험법에서 임신·출산·육아는 정당한 퇴직 사유로 인정해요. 다만 고용보험 180일 이상 가입은 필수예요.",
  },
  {
    q: "구직활동 면제를 받으면 급여가 줄어드나요?",
    a: "아니요, 금액은 동일해요. 정기 신고(고용센터 방문) 의무만 면제되고 급여는 계속 나와요.",
  },
  {
    q: "육아휴직 후 복직하지 않고 퇴직하면 실업급여 받을 수 있나요?",
    a: "복직 후 비자발적으로 퇴직하면 받을 수 있어요. 육아휴직 중에는 고용보험이 유지되니까요.",
  },
  {
    q: "수급유예 기간 중에 아르바이트해도 괜찮나요?",
    a: "안 돼요. 구직이 어렵다는 상태를 인정받는 거라서, 일하다 적발되면 부정수급으로 급여 반환 + 페널티를 받아요.",
  },
  {
    q: "2026년 실업급여 상한액은 얼마예요?",
    a: "하루 68,100원이에요. 2025년 66,000원에서 3.2% 올랐어요. 하한액은 66,048원이에요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 (수급유예 조항)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 실업급여 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 수급자격 조건", description: "자격 요건·피보험기간·이직사유 기준을 정리했어요." },
  { slug: "실업급여-신청방법", title: "실업급여 신청 절차", description: "워크넷 등록부터 구직급여 수령까지 순서별로 안내해요." },
  { slug: "실업급여-금액", title: "실업급여 금액 계산법", description: "평균임금의 60%, 상한액·하한액 계산법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여 · 육아</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        육아 중 실업급여, 끊기지 않게 하려면?<br />
        수급유예·구직면제 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임신이나 육아 때문에 일을 그만뒀는데, 구직활동을 못 해서 실업급여가 날아갈까 걱정되시죠?
        다행히 수급유예 제도가 있어요. 받을 기간을 나중으로 미뤄서 최대 4년까지 보전할 수 있어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>수급유예와 구직활동 면제, 뭐가 다른가요?</H2>
      <p style={body}>
        둘 다 육아 중 실업급여를 지키는 제도인데, 방식이 달라요.
        상황에 맞게 골라야 손해를 안 봐요.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>수급유예</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구직활동 면제</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["급여 지급", "유예 기간 중 안 나옴", "계속 나옴"],
              ["정기 신고", "안 해도 됨", "안 해도 됨"],
              ["급여일수", "나중에 연장됨", "그대로 차감됨"],
              ["최대 기간", "4년", "4주 단위 반복"],
              ["적합한 상황", "당분간 일 못 함", "급여 받으면서 쉬고 싶음"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px" }}>{a}</td>
                <td style={{ padding: "9px 12px" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        <strong>쉽게 정리하면</strong><br />
        · 3년간 육아에 집중하고 나중에 받겠다 → 수급유예<br />
        · 지금 받으면서 고용센터 방문만 빼겠다 → 구직활동 면제
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>수급유예, 기간은 어떻게 연장되나요?</H2>
      <p style={body}>
        수급유예를 신청하면 그 기간만큼 나중에 받을 수 있는 날수가 늘어나요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서
        최대 4년(약 1,460일)까지 인정해요.
      </p>

      <BorderBox>
        <strong>계산 예시</strong><br /><br />
        A씨 원래 소정급여일수: 120일<br />
        출산·육아로 수급유예: 90일<br />
        → 연장 후 받을 수 있는 기간: <strong>120일 + 90일 = 210일</strong><br /><br />
        유예 기간 동안에는 급여가 안 나오지만, 나중에 구직활동 재개하면 연장된 기간만큼 받아요.
      </BorderBox>

      <Divider />

      <H2>수급유예 신청 절차</H2>
      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 온라인 신청이 가장 편해요.
        고용센터 방문도 가능하고, 처음이라도 담당자가 도와줘요.
      </p>

      <SectionBadge>온라인 신청 순서</SectionBadge>
      <Steps steps={[
        "고용24(ei.go.kr) 접속 → 간편인증 로그인",
        "개인서비스 → 수급유예신청 메뉴 선택",
        "신청 사유 '임신·출산·육아' 선택",
        "증빙서류 업로드 (진단서, 출생증명서, 등본 등)",
        "신청 완료 → 1~2주 내 승인 결과 통지",
      ]} />

      <p style={body}>
        의사 소견서("구직활동 곤란" 내용)가 있으면 승인이 더 빨라요.
        서류가 부족하면 고용센터에서 연락이 오니까, 빠르게 보완하면 돼요.
      </p>

      <Divider />

      <H2>실업급여 자격, 임신·육아 퇴직도 인정돼요</H2>
      <p style={body}>
        "자발적으로 퇴직했으면 실업급여 못 받는 거 아니야?" 걱정하시는 분이 많은데,
        고용보험법에서 임신·출산·육아는 정당한 퇴직 사유로 인정해요.
      </p>

      <GreenBox>
        단, 꼭 충족해야 하는 조건이 있어요.<br />
        · <strong>고용보험 180일 이상 가입</strong> (피보험기간)<br />
        · 증빙서류 제출 (진단서, 출생증명서 등)<br />
        → 180일 미만이면 자격 자체가 안 되니 주의해요.
      </GreenBox>

      <Divider />

      <H2>수급유예 중 주의사항</H2>
      <p style={body}>
        상황이 바뀌면 바로 고용센터에 알려야 해요.
        아이가 어린이집에 입소했다면 구직활동 재개를 신청해야 남은 급여일수를 온전히 받을 수 있어요.
      </p>
      <p style={body}>
        수급유예 중에 일하면 절대 안 돼요. 부정수급으로 급여 전액 반환 + 추가 페널티를 받을 수 있어요.
        수급유예는 최대 4년이고, 그 이후에도 일을 못 하면 <a href="/w/긴급복지-생계지원금-신청-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>긴급복지</a> 등 다른 지원을 알아봐야 해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 고용보험법과 고용24 자료를 바탕으로 작성했어요. 개인 상황에 따라 수급 조건이 다를 수 있으니, 관할 고용센터에 직접 확인해봐요." />
    </ArticleLayout>
  );
}
