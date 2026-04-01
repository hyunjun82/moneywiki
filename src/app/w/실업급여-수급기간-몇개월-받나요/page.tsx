"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "고용보험에 가입돼 있어요" },
  { id: "c2", label: "비자발적 퇴사예요 (권고사직, 계약만료 등)" },
  { id: "c3", label: "고용보험 가입기간 180일 이상이에요" },
  { id: "c4", label: "퇴직일부터 12개월 이내예요" },
];

function getDays(age: number, years: number): number {
  if (age >= 50) {
    if (years < 1) return 120;
    if (years < 3) return 180;
    if (years < 5) return 210;
    if (years < 10) return 240;
    return 270;
  }
  if (years < 1) return 120;
  if (years < 3) return 150;
  if (years < 5) return 180;
  if (years < 10) return 210;
  return 240;
}

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 68, step: 1, defaultValue: 45, format: (v: number) => `${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "수급기간 (소정급여일수)",
    getValue: (v: Record<string, number>) => getDays(v.age, v.years),
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
    highlight: true,
  },
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.round((v.salary * 10000 * 0.6) / 30);
      return Math.max(66048, Math.min(68100, daily));
    },
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.max(66048, Math.min(68100, Math.round((v.salary * 10000 * 0.6) / 30)));
      return daily * getDays(v.age, v.years);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const CHECKLIST = [
  "퇴직일 다음 날부터 12개월 = 수급기간 (달력 기준)",
  "소정급여일수(120~270일)를 이 12개월 안에 소진해야 함",
  "신청 시점과 관계없이 수급기간 카운트다운은 퇴직일부터 시작",
  "소정급여일수가 길수록(240~270일) 빨리 신청해야 전액 수급 가능",
  "수급기간 만료 후에는 남은 소정급여일수 소멸 (구제 방법 없음)",
];

const FAQS = [
  {
    q: "수급기간 12개월을 연장할 수 있나요?",
    a: "단순히 늦게 신청한 이유로는 안 돼요. 다만 훈련연장급여, 개별연장급여, 특별연장급여 등 별도 제도를 통해 추가 수급이 가능한 경우가 있죠.",
  },
  {
    q: "수급기간 중 취업했다가 다시 퇴직하면 어떻게 되나요?",
    a: "12개월 수급기간이 아직 남아 있고 소정급여일수도 남아 있으면, 다시 실업인정을 받아 남은 일수를 받을 수 있어요. 고용센터에 바로 연락하세요.",
  },
  {
    q: "소정급여일수와 수급기간이 헷갈려요. 뭐가 다른가요?",
    a: "소정급여일수는 '받을 수 있는 총 일수'이고, 수급기간은 '받을 수 있는 기한'이에요. 돈의 양과 마감일이라고 생각하면 쉽죠.",
  },
  {
    q: "퇴직 후 9개월 지났는데 지금 신청하면 다 받을 수 있나요?",
    a: "소정급여일수에 따라 달라요. 120일(4개월)이면 가능하지만, 240일(8개월)이면 남은 3개월 안에 다 받기 어렵죠. 고용센터(1350)에 빨리 상담받으세요.",
  },
  {
    q: "실업인정은 4주마다 한 번인데, 소정급여일수 소진에 얼마나 걸려요?",
    a: "실업인정 주기(28일)에 따라 소정급여일수 180일이면 약 7개월, 270일이면 약 10개월이 걸려요. 신청이 늦을수록 수급기간 안에 다 못 받을 위험이 커지죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제48조: 구직급여의 수급기간", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령: 소정급여일수 산정표", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 수급자격 조회", url: "https://www.ei.go.kr" },
      { label: "고용노동부 고객상담센터 (1350)", url: "https://1350.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-모의계산",
    title: "실업급여 모의계산 월급별 예상 금액",
    description: "월급, 나이, 가입기간을 넣으면 바로 예상 수령액이 나와요. 2026년 상한·하한액 적용 계산기를 제공해요.",
  },
  {
    slug: "실업급여-나이제한",
    title: "실업급여 나이제한 65세 기준과 수급기간",
    description: "65세가 넘으면 못 받을까? 퇴직 나이가 아니라 고용보험 가입 시점이 기준이에요.",
  },
  {
    slug: "실업급여-피보험기간",
    title: "피보험기간 180일 기준과 합산 방법",
    description: "피보험기간이 길수록 소정급여일수가 늘어나요. 여러 직장 합산 가능하죠.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-수급기간-몇개월-받나요"
        />
      }
    >
      {/* breadcrumb */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 수급기간 · 소정급여일수</p>

      {/* h1: 2줄 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 몇 개월 받을까?<br />
        나이·가입기간별 수급 기간표
      </h1>

      {/* intro */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;실업급여가 몇 개월짜리인지 모르겠어요.&quot;
      </p>
      <p style={body}>
        짧으면 4개월, 길면 9개월이에요. 사람마다 다르죠.
        <a href="https://www.law.go.kr/법령/고용보험법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행령</a>이 정한 소정급여일수가 120일에서 270일 사이예요.
        나이랑 고용보험 가입기간, 딱 이 두 가지로 결정되죠.
        50세 이상이면 같은 가입기간이라도 30일을 더 받아요: 한 달치 급여가 통째로 늘어나는 셈이에요.
      </p>
      <p style={body}>
        아래에 나이별·가입기간별 수급 기간표를 정리해뒀어요.
        계산기도 있으니까 본인 상황을 직접 넣어보세요.
        수급기간 12개월 기한이 왜 중요한지까지 읽으면, 언제까지 신청해야 손해가 없는지 감이 잡힐 거예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 연령·가입기간별 기간표 ── */}
      <H2>나이와 가입기간에 따라 수급 기간이 얼마나 달라지나요?</H2>
      <p style={body}>
        수급 기간을 정하는 변수는 딱 두 개예요. <strong>퇴직할 때 나이</strong>랑 <strong>고용보험 가입기간</strong>이죠.
        <a href="https://www.law.go.kr/법령/고용보험법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행령</a> 별표1에 산정표가 나와 있는데, 50세를 기준으로 수급기간이 확 갈려요.
        49세에 퇴직하면 210일인데 50세에 퇴직하면 240일: 나이 한 살 차이로 한 달치 급여가 왔다 갔다 하는 거예요.
      </p>

      <div style={{ overflowX: "auto", margin: "18px 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.7 }}>
          <thead>
            <tr style={{ background: "#F0FDF4" }}>
              <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #D1FAE5", fontWeight: 600 }}>가입기간</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #D1FAE5", fontWeight: 600 }}>50세 미만</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #D1FAE5", fontWeight: 600 }}>50세 이상·장애인</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1년 미만", "120일 (4개월)", "120일 (4개월)"],
              ["1년~3년 미만", "150일 (5개월)", "180일 (6개월)"],
              ["3년~5년 미만", "180일 (6개월)", "210일 (7개월)"],
              ["5년~10년 미만", "210일 (7개월)", "240일 (8개월)"],
              ["10년 이상", "240일 (8개월)", "270일 (9개월)"],
            ].map(([period, under50, over50], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #E5E7EB" }}>
                <td style={{ padding: "10px 14px", fontWeight: 500 }}>{period}</td>
                <td style={{ padding: "10px 14px", textAlign: "center" }}>{under50}</td>
                <td style={{ padding: "10px 14px", textAlign: "center" }}>{over50}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        1년 미만이면 나이에 상관없이 120일로 동일해요. 하지만 1년을 넘기는 순간부터 50세 이상이 30일씩 더 받기 시작하죠.
        10년 이상 가입하고 50세가 넘었다면 최대 270일(9개월)까지 받을 수 있죠.
        장애인은 나이와 무관하게 50세 이상 기준이 적용되니까, 장애인 등록이 돼 있다면 반드시 고용센터에 알려야 해요.
      </p>
      <p style={body}>
        <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>가입기간</a>은 한 직장에서만 채우는 게 아니에요.
        이전 직장에서 실업급여를 수급하지 않았다면 여러 회사 기간을 합산할 수 있죠.
        A회사 3년 + B회사 2년이면 총 5년으로 잡혀서 소정급여일수가 180일(50세 미만 기준)이 돼요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>최소 120일(4개월) ~ 최대 270일(9개월)이에요.</p>
        <p style={{ margin: "0 0 4px" }}>50세 이상이면 같은 가입기간이라도 30일이 더 붙어요.</p>
        <p style={{ margin: "0 0 4px" }}>장애인은 나이 상관없이 50세 이상 기준을 적용받아요.</p>
        <p style={{ margin: 0 }}>여러 직장 가입기간을 합산할 수 있죠.</p>
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 실업급여 수급 자격을 갖췄어요. 아래 계산기로 내 수급기간을 확인해보세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인해보고 고용센터(1350)에 상담해보세요."
      />

      <Divider />

      {/* ── 섹션 2: 계산기 + 금액 비교 ── */}
      <H2>내 수급 기간과 예상 금액은 얼마나 되나요?</H2>
      <p style={body}>
        표에서 대략적인 수급기간을 봤다면, 이번엔 계산기로 정확한 수급기간과 예상 수령액을 한 번에 뽑아보세요.
        나이 슬라이더를 49세에서 50세로 한 칸만 올려보면 수급기간이 확 바뀌는 게 보일 거예요.
      </p>
      <p style={body}>
        수급기간이 30일 차이 나면 돈으로 약 204만원이에요. 2026년 <a href="/w/실업급여-한달-얼마-받나요" style={{ color: "#1D9E75", textDecoration: "underline" }}>1일 상한액</a> 68,100원을 기준으로 계산한 금액이죠.
        가장 오래 받는 경우(10년 이상 + 50세 이상)는 270일 x 68,100원 = 약 1,839만원이에요.
        가장 짧은 경우(1년 미만)는 120일 x 66,048원 = 약 793만원이고요. 최소와 최대 사이에 1,000만원 넘게 벌어지죠.
      </p>
      <p style={body}>
        본인 월 평균임금이 낮으면 하한액(66,048원)이 적용돼서 의외로 차이가 작을 수 있고요.
        반대로 월급이 높으면 상한액(68,100원)에 걸려서 더 못 받는 구조예요.
        어느 쪽이든 수급기간이 길수록 총액이 커지니까, 가입기간을 길게 가져가는 게 유리하죠.
      </p>

      <SectionBadge>나이와 가입기간을 조절해보세요</SectionBadge>
      <Calculator
        title="실업급여 수급기간 및 예상 수령액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 수급기간(소정급여일수)은 나이와 가입기간으로 결정돼요."
      />

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3: 12개월 기한과의 관계 ── */}
      <H2>수급 기간 12개월 기한이 중요한 이유</H2>

      <SectionBadge>수급기간 관리 체크리스트</SectionBadge>

      <p style={body}>
        소정급여일수랑은 별개로 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제48조</a>가 정한 <strong>수급기간 12개월</strong>이라는 마감 기한이 따로 있죠.
        퇴직일 다음 날부터 시계가 돌아가기 시작해서, 12개월이 지나면 소정급여일수가 남아 있어도 수급권 자체가 사라지죠.
        연장도 안 되고, 구제 방법도 없어요. 말 그대로 절대 기한이에요.
      </p>
      <p style={body}>
        소정급여일수가 120일(4개월)이라면 퇴직 후 8개월째에 신청해도 12개월 안에 다 소화할 수 있죠.
        그런데 270일(9개월)이라면? 퇴직 후 3개월 이내에 움직여야 12개월 안에 전부 받을 수 있죠.
        소정급여일수가 길수록 오히려 더 빨리 신청해야 하는 역설적인 구조예요.
      </p>
      <p style={body}>
        숫자로 따져보면 이래요. 270일 수급자가 7월에 퇴직하고 12월에야 신청했다고 해볼게요.
        남은 수급기간이 7개월(약 210일)이니까, 270일 중 60일치를 받지 못해요.
        68,100원 x 60일 = 약 408만원이 허공으로 날아가는 거예요. 신청 한 달 늦출 때마다 200만원씩 잃는 셈이죠.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4: 소정급여일수 vs 수급기간 차이 ── */}
      <H2>소정급여일수와 수급 기간의 차이</H2>
      <p style={body}>
        이 두 개념을 헷갈려하는 분이 정말 많아요.
        <strong>소정급여일수</strong>는 &quot;총 몇 일치를 받을 수 있느냐&quot;이고, <strong>수급기간</strong>은 &quot;언제까지 받을 수 있느냐&quot;예요.
        비유하자면 소정급여일수가 통장 잔고라면, 수급기간은 그 통장의 해지일이죠.
        해지일이 지나면 잔고가 남아 있어도 인출이 안 되는 구조예요.
      </p>

      <div style={{ overflowX: "auto", margin: "18px 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.7 }}>
          <thead>
            <tr style={{ background: "#F0FDF4" }}>
              <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #D1FAE5", fontWeight: 600 }}>구분</th>
              <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #D1FAE5", fontWeight: 600 }}>소정급여일수</th>
              <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #D1FAE5", fontWeight: 600 }}>수급기간</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["의미", "실업급여 받는 총 일수", "실업급여 청구 가능한 기한"],
              ["결정 기준", "나이 + 피보험기간", "퇴직일 다음 날부터 12개월 고정"],
              ["범위", "120~270일", "12개월 고정"],
              ["초과 시", "해당 없음", "남은 소정급여일수 소멸"],
            ].map(([label, col1, col2], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #E5E7EB" }}>
                <td style={{ padding: "10px 14px", fontWeight: 500 }}>{label}</td>
                <td style={{ padding: "10px 14px" }}>{col1}</td>
                <td style={{ padding: "10px 14px" }}>{col2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        소정급여일수가 180일(약 6개월)이라고 해서 딱 6개월만 수급 가능한 게 아니에요.
        12개월이라는 시간 틀 안에서 180일치를 찾아가는 구조예요.
        실업인정이 4주(28일)마다 한 번이니까, 180일을 전부 소화하려면 실질적으로 약 7개월이 걸리죠.
        그래서 퇴직 후 5개월쯤 지나서 신청하면 12개월 안에 다 받기가 빠듯해져요.
      </p>

      <Divider />

      {/* ── 섹션 5: 지금 당장 해야 할 것 ── */}
      <H2>수급 기간 내 전액 받으려면 지금 움직이세요</H2>
      <p style={body}>
        퇴직했다면 가만히 있을 시간이 없어요.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 접속해서 이직확인서 처리 여부를 먼저 조회하세요.
        이직확인서가 나왔으면 워크넷에 구직등록을 하고, 수급자격 교육(온라인으로 가능)을 이수한 뒤 관할 <a href="/w/실업급여-고용센터" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용센터</a>에 실업급여를 신청하면 돼요.
      </p>
      <p style={body}>
        이직확인서가 아직 안 나왔다고 마냥 기다리면 안 돼요. <strong>12개월 시계는 퇴직 다음 날부터 이미 돌아가고 있으니까요</strong>.
        퇴직 후 10일이 지났는데도 이직확인서가 안 나오면 회사에 독촉하세요.
        그래도 안 주면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 신고하면 직권으로 처리해줘요.
      </p>
      <p style={body}>
        정리하면 이래요. 소정급여일수가 길수록 빨리 신청해야 전액을 받을 수 있죠.
        120일이면 퇴직 후 8개월까지 여유가 있지만, 270일이면 3개월 안에 움직여야 안전하죠.
        12개월이라는 기한은 어떤 사유로도 연장되지 않으니까, 하루라도 빨리 첫 걸음을 떼세요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>120일</strong> → 퇴직 후 8개월까지 여유
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>180일</strong> → 퇴직 후 5개월까지 안전
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>240일</strong> → 퇴직 후 3개월까지 안전
        </p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>
          <strong>270일</strong> → 퇴직 후 2개월 이내 신청 권장
        </p>
      </BorderBox>

      <Divider />

      {/* ── FAQ 5개 ── */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        수급기간이랑 소정급여일수를 놓고 가장 많이 들어오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법 제48조 및 시행령을 바탕으로 작성됐어요. 수급기간 및 연장급여 적용 여부는 개별 사안에 따라 다르니, 고용센터(1350)에 상담받아보세요." />
    </ArticleLayout>
  );
}
