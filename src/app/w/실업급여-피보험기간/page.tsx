"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 계산 로직 ──────────────────────────────────────────

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

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "고용24(ei.go.kr)에서 피보험자격 이력을 조회했어요" },
  { id: "c2", label: "이전 직장 피보험기간 합산 가능 여부를 확인했어요" },
  { id: "c3", label: "퇴직 전 18개월 내 피보험단위기간이 180일 이상이에요" },
  { id: "c4", label: "피보험기간별 소정급여일수(수급기간) 표를 확인했어요" },
];

const CALC_SLIDERS = [
  { id: "years", label: "총 피보험기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 68, step: 1, defaultValue: 40, format: (v: number) => `만 ${v}세` },
];

const CALC_RESULTS = [
  {
    label: "소정급여일수",
    getValue: (v: Record<string, number>) => getDays(v.age, v.years),
    format: (v: number) => `${v}일`,
    highlight: true,
  },
  {
    label: "수급기간 (월 환산)",
    getValue: (v: Record<string, number>) => Math.round(getDays(v.age, v.years) / 30),
    format: (v: number) => `약 ${v}개월`,
  },
];

const CHECKLIST = [
  "고용24(ei.go.kr) → 개인서비스 → 피보험자격 이력 조회",
  "직장별 취득일·상실일 확인해서 합산 가능 여부 체크",
  "이전 직장에서 실업급여를 받았는지 여부 확인 (받았으면 해당 기간 리셋)",
  "퇴직 전 18개월 내 피보험단위기간이 180일 이상인지 확인",
  "합산 조건: 이전 직장 퇴사 후 1년 이내 재취업 여부 확인",
];

const FAQS = [
  {
    q: "피보험기간 180일은 달력 기준인가요, 근무일 기준인가요?",
    a: "달력 기준이 아니라 피보험단위기간 기준이에요. 유급일(실제 일한 날 + 유급휴일)을 세서 180일 이상이어야 하죠.",
  },
  {
    q: "이전 직장 피보험기간을 합산하려면 어떤 조건이 필요한가요?",
    a: "두 가지 조건이 필요해요. 이전 직장에서 실업급여를 받지 않았어야 하고, 퇴사 후 1년 이내에 재취업했어야 하죠.",
  },
  {
    q: "실업급여를 받으면 피보험기간이 리셋되나요?",
    a: "맞아요. 실업급여를 수급하면 그 이전 피보험기간은 소진된 걸로 처리되죠. 새 직장에서 다시 쌓아야 해요.",
  },
  {
    q: "육아휴직 기간도 피보험기간에 포함되나요?",
    a: "포함돼요. 육아휴직 중에도 고용보험 가입 상태가 유지되니까요. 산재 휴업 기간도 마찬가지예요.",
  },
  {
    q: "프리랜서 기간은 피보험기간에 들어가나요?",
    a: "고용보험에 가입되지 않은 프리랜서·자영업 기간은 피보험기간에 포함되지 않아요. 고용보험 임의가입을 한 자영업자는 예외적으로 가능하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 피보험기간 산정 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령 — 소정급여일수 산정표", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 피보험자격 이력 조회", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 실업급여 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-피보험단위기간",
    title: "피보험단위기간 180일 계산법",
    description: "실제 근무일과 유급휴일을 더해 180일을 채우는 방법이에요.",
  },
  {
    slug: "피보험기간-근무일수-계산-방법",
    title: "피보험기간 근무일수 계산 방법",
    description: "피보험기간과 근무일수가 어떻게 연결되는지 정리했어요.",
  },
  {
    slug: "실업급여-수급기간-몇개월-받나요",
    title: "실업급여 수급기간 12개월 기한",
    description: "퇴직 후 12개월 안에 소정급여일수를 다 받아야 하는 이유예요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR}
          currentSlug="실업급여-피보험기간"
        />
      }
    >
      {/* breadcrumb */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 피보험기간</p>

      {/* h1 — 2줄 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        피보험기간 180일, 어떻게 채울까?<br />
        직장 합산과 계산 방법
      </h1>

      {/* intro — 숫자 + 법령 */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "피보험기간이 뭐예요? 실업급여 신청하는데 자꾸 피보험기간 얘기가 나와서 헷갈려요."<br /><br />
        <strong>고용보험에 가입되어 일한 기간</strong>이에요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 고용보험법</a>에서
        이 기간이 180일 이상이어야 실업급여를 받을 수 있다고 정하고 있죠.
        그리고 피보험기간이 길수록 소정급여일수가 늘어나요. <strong>1년 미만이면 120일, 10년 이상이면 최대 270일</strong>까지 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 피보험기간이란 + GreenBox + EligibilityChecker */}
      <H2>피보험기간이 뭐고, 계산 방법이 왜 중요한가요?</H2>
      <p style={body}>
        피보험기간은 고용보험 피보험자격을 가진 기간이에요. 쉽게 말해 회사에 다니면서 고용보험에 가입되어 있던 기간이죠. 입사하면 고용보험에 자동 가입되고, 퇴사하면 자격을 잃어요. 그 사이가 피보험기간이에요.
      </p>
      <p style={body}>
        중요한 이유는 두 가지예요. 첫째, <strong>수급자격 조건</strong>이에요. 퇴직 전 18개월 내 피보험단위기간이 180일 이상이어야 실업급여를 받을 수 있죠. 180일이 안 되면 아예 수급 자격이 없어요. 여기서 180일은 피보험단위기간(실제 근무일 + 유급휴일)을 말하는 거예요.
      </p>
      <p style={body}>
        둘째, <strong>소정급여일수</strong>(받을 수 있는 총 일수)를 결정해요. 피보험기간이 길수록 실업급여를 오래 받죠. <a href="https://www.law.go.kr/법령/고용보험법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행령</a>에 따르면 1년 미만이면 120일, 10년 이상이면 최대 270일이에요. 같은 나이라도 피보험기간 차이 하나로 수급일수가 120일 벌어질 수 있어요.
      </p>

      <GreenBox title="피보험기간이 결정하는 것">
        1. <strong>수급자격</strong> — 피보험단위기간 180일 이상이어야 실업급여 신청 가능<br />
        2. <strong>소정급여일수</strong> — 기간이 길수록 오래 받음 (120~270일)<br />
        3. <strong>합산 가능</strong> — 여러 직장 피보험기간을 합칠 수 있음
      </GreenBox>

      <SectionBadge>내 수급자격 체크해 보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="수급자격 조건을 충족했을 가능성이 높아요!"
        partialMatchText="일부 조건이 미충족이에요. 해당 항목을 확인해 보세요."
      />

      <Divider />

      {/* 섹션 2 — 계산 방법 + 합산 조건 + Calculator */}
      <H2>직장 합산 조건은 어떻게 되나요?</H2>
      <p style={body}>
        기본 계산은 간단해요. <strong>피보험자격 취득일(입사일)부터 상실일(퇴사일)</strong>까지예요. A회사에서 2년, B회사에서 3년 일했으면 피보험기간은 총 5년이죠.
      </p>
      <p style={body}>
        그런데 여러 직장을 합산하려면 조건이 있어요. <strong>이전 직장에서 실업급여를 받지 않았어야</strong> 해요. 실업급여를 수급하면 그 이전 피보험기간은 "이미 사용한 것"으로 처리되죠. 리셋이 되는 거예요. 이 규정은 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제50조</a>에서 정하고 있어요.
      </p>
      <p style={body}>
        또 하나 중요한 건 <strong>이전 직장 퇴사 후 1년 이내에 재취업</strong>했어야 해요. 1년 넘게 쉬었으면 그 이전 기간은 합산이 안 되죠. 이직을 자주 해도 이 두 조건만 충족하면 전부 합산할 수 있어요.
      </p>

      <BorderBox title="합산 조건 정리">
        ✓ 이전 직장에서 실업급여를 <strong>받지 않았을 것</strong><br />
        ✓ 이전 직장 퇴사 후 <strong>1년 이내 재취업</strong>했을 것<br />
        ✗ 실업급여 수급 완료 → 이전 기간 <strong>리셋</strong><br />
        ✗ 퇴사 후 1년 넘게 공백 → 이전 기간 <strong>합산 불가</strong>
      </BorderBox>

      <Calculator
        title="피보험기간별 수급기간 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="50세 기준으로 소정급여일수가 달라져요. 정확한 기간은 고용24(ei.go.kr)에서 확인하세요."
      />

      {/* 섹션 2 끝 → 버튼 + 관련 글 */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 소정급여일수표 + SectionBadge + Checklist */}
      <H2>피보험기간별 소정급여일수 계산 방법</H2>
      <p style={body}>
        피보험기간과 나이(50세 기준)에 따라 소정급여일수가 달라져요. <a href="https://www.law.go.kr/법령/고용보험법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행령</a>에서 정한 기준표예요. 50세 이상이거나 장애인이면 같은 피보험기간이라도 수급일수가 더 많아요.
      </p>

      <div style={{ overflowX: "auto", margin: "18px 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.7 }}>
          <thead>
            <tr style={{ background: "#F0FDF4" }}>
              <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #D1FAE5", fontWeight: 600 }}>피보험기간</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #D1FAE5", fontWeight: 600 }}>50세 미만</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #D1FAE5", fontWeight: 600 }}>50세 이상·장애인</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1년 미만", "120일", "120일"],
              ["1~3년", "150일", "180일"],
              ["3~5년", "180일", "210일"],
              ["5~10년", "210일", "240일"],
              ["10년 이상", "240일", "270일"],
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
        10년 이상 일한 50세 이상 근로자가 가장 오래 받아요. 270일이면 약 9개월이죠. 반면 1년 미만이면 나이와 관계없이 120일(약 4개월)이에요. 피보험기간 차이가 수급일수에 직접 영향을 주니까, 가능하면 180일 이상은 확보한 상태에서 퇴직하는 게 유리해요.
      </p>

      <SectionBadge>피보험기간 확인 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 포함/제외 항목 */}
      <H2>피보험기간 계산에 포함되는 것과 제외되는 것</H2>
      <p style={body}>
        모든 기간이 피보험기간에 포함되는 건 아니에요. <strong>유급휴일</strong>(주휴일, 공휴일, 유급연차)은 포함되죠. <strong>육아휴직</strong>과 <strong>산재 휴업</strong> 기간도 고용보험 가입 상태가 유지되니까 피보험기간으로 인정돼요.
      </p>
      <p style={body}>
        반면 <strong>무급휴직</strong>은 제외돼요. 무급으로 쉬는 기간은 고용보험료를 내지 않으니까요. <strong>이직 후 구직 기간</strong>(어느 회사에도 소속되지 않은 기간)도 당연히 제외되죠.
      </p>
      <p style={body}>
        <strong>고용보험 미가입 기간</strong>도 빠져요. 프리랜서나 자영업으로 일한 기간은 고용보험에 가입되어 있지 않으면 피보험기간으로 인정받을 수 없어요. 다만 사업주가 의무를 안 지켜서 미가입 상태였다면 <a href="/w/실업급여-고용보험-미가입" style={{ color: "#1D9E75", textDecoration: "underline" }}>소급가입</a>으로 해결할 수 있죠.
      </p>

      <Divider />

      {/* 섹션 5 — 실전 팁 */}
      <H2>직장 합산으로 피보험기간을 유리하게 관리하세요</H2>
      <p style={body}>
        가장 확실한 방법은 <strong>오래 일하는 것</strong>이에요. 단순하지만 사실이죠. 이직을 자주 해도 괜찮아요. 합산 조건(1년 이내 재취업, 미수급)만 충족하면 전부 이어지니까요.
      </p>
      <p style={body}>
        주의할 점은 <strong>직장 사이 공백 기간</strong>이에요. 1년 넘게 쉬면 이전 피보험기간이 합산에서 빠져요. 이직할 때 공백이 길어질 것 같으면 실업급여를 받을지, 합산을 위해 빠르게 재취업할지 전략적으로 판단해야 하죠.
      </p>
      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 피보험자격 이력을 조회하면 지금까지의 모든 직장 가입 이력을 한눈에 볼 수 있어요. 퇴직 전에 한 번 확인해두면 수급자격 여부를 미리 파악할 수 있죠. 특히 50세 전후라면 소정급여일수가 크게 달라지니 나이 기준도 함께 체크해보세요.
      </p>

      <Divider />

      {/* FAQ — 5개 */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        피보험기간 계산과 합산에 대해 가장 많이 물어보시는 내용이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      {/* References + Disclaimer */}
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 피보험기간 합산 여부는 개별 사안에 따라 다르니, 고용24(ei.go.kr)에서 직접 조회하거나 고용센터(1350)에 상담받아보세요." />
    </ArticleLayout>
  );
}
