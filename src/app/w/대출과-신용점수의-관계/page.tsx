"use client";

// Q1. 대출 한도 조회 누르면 신용점수 떨어질까 봐 무서운 상황, 또는 대출 갚았는데 점수가 안 오르는 상황
// Q2. 대출 조회·실행·상환 각 단계에서 신용점수가 어떻게 변하는지 파악하고 점수 관리 전략을 세우는 것
// Q3. 본인조회 vs 대출목적조회 차이, 30일 합산 룰, 대출 실행 시 5~15점 하락, 건수>금액, 연체 시 페널티, KCB·NICE 등급표
// Q4. 단계별 흐름(Steps) + KCB·NICE 등급표 + 점수 올리기 체크리스트(Checklist) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const IMPACT_STEPS = [
  { title: "한도 조회 (거의 영향 없음)", desc: "본인 조회(토스·카카오뱅크 앱에서 내 점수 확인)는 몇 번을 해도 점수에 영향이 전혀 없어요. 대출 목적 조회도 30일 이내에는 여러 은행을 알아봐도 1건으로만 잡혀요.", tip: "90일 이내 10곳 이상 조회하면 '과도한 조회'로 5~10점 떨어질 수 있어요" },
  { title: "대출 실행 (5~15점 하락)", desc: "신용대출을 받으면 보통 5~15점 정도 내려가요. 금액이 크거나 기존 대출이 많을수록 더 떨어져요. 주담대는 담보가 있어서 신용대출보다 하락 폭이 작아요." },
  { title: "성실 상환 (3~6개월 후 회복 시작)", desc: "연체 없이 꼬박꼬박 갚으면 3~6개월 후부터 점수가 올라가요. 만기까지 잘 갚으면 대출 전보다 10~20점 더 오를 수 있어요." },
  { title: "완납 (건수 감소로 추가 상승)", desc: "대출을 완전히 갚으면 건수가 줄어서 점수가 5~10점 추가로 올라요. 소액 대출 여러 개보다 한 건을 완납하는 게 점수에 훨씬 좋아요." },
];

const KCB_TABLE = [
  { grade: "1등급", range: "942~1,000점", note: "최저 금리 대출 가능" },
  { grade: "2등급", range: "891~941점", note: "우대 금리 적용 가능" },
  { grade: "3등급", range: "832~890점", note: "시중은행 대출 가능" },
  { grade: "4등급", range: "768~831점", note: "시중은행 조건부 가능" },
  { grade: "5등급", range: "698~767점", note: "2금융권 대출 권장" },
  { grade: "6등급", range: "630~697점", note: "2금융권 대출" },
];

const NICE_TABLE = [
  { grade: "1등급", range: "900~1,000점", note: "최저 금리 대출 가능" },
  { grade: "2등급", range: "870~899점", note: "우대 금리 적용 가능" },
  { grade: "3등급", range: "840~869점", note: "시중은행 대출 가능" },
  { grade: "4등급", range: "805~839점", note: "시중은행 조건부 가능" },
  { grade: "5등급", range: "750~804점", note: "2금융권 대출 권장" },
  { grade: "6등급", range: "665~749점", note: "2금융권 대출" },
];

const CHECKLIST = [
  "대출 자동이체 설정해서 연체 방지하기",
  "소액 대출 여러 건보다 한 건 완납으로 건수 줄이기",
  "신용카드 한도의 30% 이하로만 사용하기",
  "통신비·건강보험·국민연금 연체 없이 납부하기",
  "안 쓰는 마이너스통장·카드론 한도 해지하기",
  "대출 한도 조회는 한 달 안에 3~4곳까지만",
  "KCB·NICE 비금융 정보(통신비 납부) 제출하기",
];

const FAQS = [
  { q: "대출 한도 조회만 해도 점수가 떨어지나요?", a: "본인 조회(토스·카카오뱅크 등)는 영향 없어요. 은행 대출 목적 조회도 30일 이내에는 여러 곳을 알아봐도 1건으로만 반영돼요. 90일 이내 10곳 넘게 조회하면 문제가 될 수 있어요." },
  { q: "대출 다 갚으면 바로 점수가 올라요?", a: "바로는 아니에요. 완납 후 3~6개월 정도 지나야 성실 상환 이력이 반영돼서 올라요. 대출 건수가 줄어드는 효과는 비교적 빨리 나타나요." },
  { q: "신용대출 받으면 몇 점 떨어져요?", a: "보통 5~15점이에요. 기존 대출이 많거나, 소득 대비 대출 금액이 크거나, 2금융권에서 받으면 더 떨어질 수 있어요." },
  { q: "학자금대출은 신용점수에 영향을 주나요?", a: "ICL(취업 후 상환)은 연체만 안 하면 영향이 적어요. 일반 상환 학자금대출은 연체하면 30~50점 떨어질 수 있어요. 완납하면 5~10점 올라요." },
  { q: "대출 건수랑 금액 중 뭐가 더 중요해요?", a: "건수가 더 중요해요. 1억원 대출 1건보다 1천만원 대출 3건이 점수에 더 나빠요. 소액 대출이 여러 개면 대환대출로 1건으로 합치는 게 유리해요." },
  { q: "KCB랑 NICE 점수가 왜 달라요?", a: "두 기관의 평가 방식이 달라요. KCB는 부채 수준과 신용 거래 형태를 더 중시하고, NICE는 상환 이력에 더 높은 비중을 줘요. 같은 사람이라도 50~100점 차이 날 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "KCB: 올크레딧 신용점수 조회", url: "https://www.allcredit.co.kr" },
      { label: "NICE: 나이스지키미 신용점수 조회", url: "https://www.credit.co.kr" },
      { label: "KB의 생각: KCB, NICE 신용점수 차이", url: "https://kbthink.com/main/asset-management/wealth-manage-tip/kbthink-original/202410/kcb-nice.html" },
    ],
  },
];

const RELATED = [
  { slug: "신용등급-조회-방법", title: "신용등급 조회 방법", description: "KCB·NICE 무료 조회 방법을 정리했어요." },
  { slug: "DSR-계산-방법", title: "DSR 계산 방법", description: "대출 한도를 결정하는 DSR 계산법이에요." },
  { slug: "대출-상환-방식-비교", title: "원금균등 vs 원리금균등 비교", description: "상환 방식에 따라 총 이자가 달라져요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 신용점수 · 대출</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대출과 신용점수의 관계,<br />
        조회·실행·상환 단계별 영향
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        대출 한도 조회 버튼 누르기가 무서웠나요? &quot;조회만 해도 신용점수 떨어진다&quot;는 말 때문이죠.
        결론부터 말하면 한도 조회는 거의 영향 없어요.
        대출 실행하면 5~15점 빠지지만, 연체 없이 잘 갚으면 원래대로 돌아오고 오히려 더 올라요.
        조회·실행·상환 단계마다 점수가 어떻게 움직이는지 바로 볼게요.
      </p>

      <Divider />

      <H2>조회부터 완납까지, 점수가 이렇게 변해요</H2>
      <p style={body}>
        대출의 전체 과정을 네 단계로 나누면 각 단계에서 신용점수가 어떻게 움직이는지 보여요.
        조회 → 실행 → 상환 → 완납, 순서대로 알아볼게요.
      </p>

      <Steps steps={IMPACT_STEPS} />

      <p style={body}>
        핵심은 &quot;연체만 안 하면 시간이 약&quot;이라는 거예요.
        대출 받아서 점수가 떨어져도, 성실하게 갚아나가면 만기 때 대출 전보다 점수가 더 높아질 수 있어요.
      </p>

      <Divider />

      <H2>KCB·NICE 등급은 어떻게 나뉘어요?</H2>
      <p style={body}>
        한국에는 신용평가회사가 두 곳이에요.{" "}
        <a href="https://www.allcredit.co.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>KCB(올크레딧)</a>와{" "}
        <a href="https://www.credit.co.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>NICE(나이스지키미)</a>예요.
        1,000점 만점에 1~10등급으로 나뉘는데, 두 곳의 기준이 달라서 같은 사람이라도 점수가 다를 수 있어요.
      </p>

      <SectionBadge>KCB 등급 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>등급</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>점수 범위</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대출 가능성</th>
            </tr>
          </thead>
          <tbody>
            {KCB_TABLE.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontWeight: 600 }}>{row.grade}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{row.range}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280" }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionBadge>NICE 등급 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>등급</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>점수 범위</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대출 가능성</th>
            </tr>
          </thead>
          <tbody>
            {NICE_TABLE.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontWeight: 600 }}>{row.grade}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{row.range}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280" }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        KCB는 부채 수준과 거래 형태에 비중을 크게 두고, NICE는 상환 이력을 더 중시해요.
        대출이 많으면 KCB 점수가 더 많이 떨어지고, 연체 이력이 있으면 NICE 점수가 더 타격을 받아요.
      </p>

      <Divider />

      <H2>연체하면 어떻게 되나요?</H2>
      <p style={body}>
        대출 원리금을 제때 안 갚으면 연체예요. 연체 기간에 따라 페널티가 완전히 달라져요.
      </p>

      <GreenBox title="연체 기간별 영향">
        1일~30일: 연체이자 발생 (약정금리 + 3~5%p){"\n"}
        1개월 이상: 신용정보에 연체 기록, 점수 30~50점 하락{"\n"}
        2회 연속: 기한의 이익 상실 → 대출 전액 즉시 상환 요구{"\n"}
        3개월 이상: 채무불이행(신용불량) 등록, 기록 최대 5년 유지
      </GreenBox>

      <p style={body}>
        1번 연체해도 바로 신용불량자가 되는 건 아니에요.
        하지만 3개월을 넘기면 회복이 정말 어려워요. 연체 위기라면{" "}
        <a href="https://www.kinfa.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>서민금융진흥원</a>에서
        신속채무조정이나 상환 유예를 신청하세요. 버티다가 3개월 넘기면 안 돼요.
      </p>

      <Divider />

      <H2>신용점수 올리는 실전 체크리스트</H2>
      <p style={body}>
        점수를 올리는 방법은 별거 아니에요. 기본을 꾸준히 지키면 6개월~1년 안에 눈에 띄게 올라요.
        아래 항목을 하나씩 체크해보세요.
      </p>

      <Checklist items={CHECKLIST} />

      <p style={body}>
        특히 통신비·건강보험 납부 이력을 KCB와 NICE에 제출하는 건 많은 분들이 모르는 방법이에요.
        카카오뱅크나 토스 앱에서 &quot;비금융 정보 제출&quot; 메뉴로 간편하게 할 수 있어요.
        제출만 해도 5~20점 오르는 경우가 꽤 있어요.
      </p>

      <Divider />

      <RelatedArticles items={RELATED} />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        대출과 신용점수 관계에서 실제로 가장 많이 궁금해하는 것들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 KCB·NICE 신용평가 기준을 바탕으로 작성됐어요. 신용점수 산정 방식은 변경될 수 있으니 정확한 점수는 올크레딧(KCB) 또는 나이스지키미(NICE)에서 확인하세요." />
    </ArticleLayout>
  );
}
