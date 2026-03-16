"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사에서 먼저 희망퇴직 공고를 냈어요" },
  { id: "c2", label: "이직확인서에 '권고사직' 또는 '경영상 사유'로 기재될 예정이에요" },
  { id: "c3", label: "퇴직 전 18개월 내 고용보험 180일 이상 가입돼 있어요" },
  { id: "c4", label: "재취업할 의사가 있고 구직활동을 할 수 있어요" },
];

const CHECKLIST = [
  "희망퇴직 공고문 사본 확보 (게시판 캡처, 사내 메일 등)",
  "이직확인서 퇴직 사유가 '권고사직'인지 반드시 확인",
  "퇴직 전 18개월 내 고용보험 180일 이상 가입 여부 체크",
  "수급자격 신청자 온라인 교육 이수",
  "관할 고용센터 방문 또는 고용24 온라인 신청",
];

const FAQS = [
  {
    q: "희망퇴직 신청하면 자발적 퇴사 아닌가요?",
    a: "회사가 먼저 공고를 내고 신청을 유도한 거라면 권고사직으로 봐요. 회사 주도여야 하죠. 이직확인서에 '권고사직'으로 기재되면 실업급여 대상이에요.",
  },
  {
    q: "위로금 받았는데 실업급여도 받을 수 있나요?",
    a: "받을 수 있죠. 위로금은 회사가 퇴직 유도 대가로 주는 돈이고, 실업급여는 고용보험에서 나오는 돈이에요. 완전히 별개라서 둘 다 수령할 수 있어요.",
  },
  {
    q: "이직확인서에 '자발적 퇴사'로 적혀 있으면 어떡하죠?",
    a: "희망퇴직 공고문, 사내 메일 등 회사 주도임을 증명할 수 있는 자료를 고용센터에 제출하세요. 정정을 요청할 수 있고, 증빙이 충분하면 수급자격을 인정받을 수 있어요.",
  },
  {
    q: "희망퇴직 거부하면 불이익 있나요?",
    a: "거부해도 돼요. 희망퇴직은 강제가 아니에요. 회사가 거부를 이유로 불이익을 주면 부당해고에 해당할 수 있고, 노동청에 진정할 수 있죠.",
  },
  {
    q: "퇴직금도 따로 받을 수 있나요?",
    a: "당연하죠. 법정 퇴직금은 1년 이상 근무한 모든 근로자의 권리예요. 위로금, 퇴직금, 실업급여 세 가지 전부 별개의 돈이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 수급자격 및 이직 사유 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "근로기준법 — 퇴직금 지급 기준", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 인터넷 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 퇴직 관련 상담", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "권고사직-실업급여-신청-방법",
    title: "권고사직 실업급여 신청 방법",
    description: "권고사직은 비자발적 퇴사로 실업급여 수급이 가장 쉬운 경우예요.",
  },
  {
    slug: "명예퇴직-실업급여",
    title: "명예퇴직 실업급여 수급 가능 여부",
    description: "명예퇴직과 희망퇴직은 비슷하지만 세부 조건이 달라요.",
  },
  {
    slug: "정리해고-실업급여",
    title: "정리해고 실업급여 조건과 절차",
    description: "경영상 이유로 정리해고되면 실업급여를 받을 수 있어요.",
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
          currentSlug="희망퇴직-실업급여"
        />
      }
    >
      {/* breadcrumb */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 희망퇴직</p>

      {/* h1 (2줄) */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        희망퇴직도 실업급여 받을까?<br />
        수급 조건과 금액
      </h1>

      {/* intro — 숫자 + 법령 */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;회사에서 희망퇴직 공고가 났어요. 위로금도 준다는데, 실업급여까지 받을 수 있나요?&quot;<br />
        받을 수 있죠. 회사가 먼저 공고를 내고 퇴직을 유도한 거라면 <strong>권고사직</strong>으로 봐요.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서는
        회사의 경영상 필요에 의한 퇴직을 비자발적 이직으로 인정하고 있어요.
        핵심은 <strong>이직확인서에 어떻게 기재되느냐</strong>예요.
        2026년 기준 실업급여 1일 상한액은 <strong>68,100원</strong>, 하한액은 <strong>66,048원</strong>이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 희망퇴직이 권고사직인 이유 + GreenBox + SectionBadge + EligibilityChecker */}
      <H2>희망퇴직이 수급 조건에 해당하나요?</H2>
      <p style={body}>
        희망퇴직이라는 이름 때문에 &quot;내가 신청한 거니까 자발적 퇴사 아니야?&quot;라고 생각하기 쉬워요. 하지만 본질을 보면 달라요. 회사가 구조조정이나 경영 악화를 이유로 인원을 줄이면서, 위로금을 제시하고 일정 기간 내 퇴직 신청을 유도하는 거잖아요.
      </p>
      <p style={body}>
        이건 회사가 먼저 &quot;나가주세요&quot;라고 한 거예요. 신청서를 본인이 썼다고 해서 자발적 퇴사가 되는 게 아니에요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서는 사용자(회사)의 권유에 의한 퇴직을 비자발적 이직으로 분류하고 있죠.
      </p>
      <p style={body}>
        그래서 희망퇴직 공고 → 본인 신청 → 회사 승인 순서로 진행된 경우라면 <strong>권고사직</strong>에 해당돼요. 이직확인서에 &quot;권고사직&quot; 또는 &quot;경영상 필요에 의한 퇴직&quot;으로 기재되면 실업급여 수급자격이 생기죠.
      </p>

      <GreenBox title="희망퇴직 = 권고사직이 되는 조건">
        회사가 먼저 공고를 냈을 것<br />
        구조조정 또는 경영상 이유가 있을 것<br />
        이직확인서에 &apos;권고사직&apos;으로 기재될 것
      </GreenBox>

      <SectionBadge>내 상황 확인해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여를 받을 수 있는 조건을 갖추고 있네요. 이직확인서 기재 내용을 꼭 확인하고 신청하세요."
        partialMatchText="일부 조건이 충족돼요. 고용센터(1350)에 사전 상담을 받아보세요."
      />

      <Divider />

      {/* 섹션 2 — 본인 주도 vs 회사 주도 + BorderBox + Calculator */}
      <H2>본인 주도 희망퇴직은 조건이 달라지나요?</H2>
      <p style={body}>
        여기서 중요한 구분이 하나 있어요. 회사 공고 없이 <strong>본인이 먼저</strong> &quot;퇴직하고 싶다&quot;고 요청한 경우예요. 이때는 자발적 퇴사로 볼 수 있어서 실업급여가 어려워질 수 있죠.
      </p>
      <p style={body}>
        핵심은 <strong>누가 먼저 퇴직을 유도했느냐</strong>예요. 회사 공고가 먼저 나오고 내가 신청한 거면 권고사직이에요. 내가 먼저 &quot;나가겠다&quot;고 하고 회사가 &quot;그래, 위로금 줄게&quot;라고 한 거면 자발적 퇴사에 가깝죠.
      </p>
      <p style={body}>
        애매한 경우도 있어요. 회사가 비공식적으로 퇴직을 종용한 경우, 면담에서 퇴직을 압박한 경우 등이죠. 이런 상황이라면 면담 녹음, 이메일, 문자 등 <strong>회사가 먼저 유도했다는 증거</strong>를 확보해두는 게 좋아요.
      </p>

      <BorderBox title="회사 주도 vs 본인 주도">
        회사 공고 → 본인 신청 → <strong>권고사직 (실업급여 O)</strong><br />
        본인 요청 → 회사 수락 → <strong>자발적 퇴사 (실업급여 어려움)</strong><br />
        회사 비공식 종용 → <strong>증빙 확보 시 인정 가능</strong>
      </BorderBox>

      <Calculator
        title="내 실업급여 예상 금액 계산기"
        sliders={[
          {
            id: "salary",
            label: "월급 (세전)",
            min: 200,
            max: 800,
            step: 10,
            defaultValue: 350,
            format: (v: number) => `${v}만 원`,
          },
          {
            id: "insuranceYears",
            label: "고용보험 가입기간",
            min: 1,
            max: 20,
            step: 1,
            defaultValue: 10,
            format: (v: number) => `${v}년`,
          },
          {
            id: "age",
            label: "나이",
            min: 25,
            max: 65,
            step: 1,
            defaultValue: 45,
            format: (v: number) => `${v}세`,
          },
        ]}
        results={[
          {
            label: "1일 수급액 (상한 68,100원)",
            getValue: (inp: Record<string, number>) => {
              const daily = Math.round((inp.salary * 10000 / 30) * 0.6);
              return Math.min(Math.max(daily, 66048), 68100);
            },
            format: (v: number) => `${v.toLocaleString()}원`,
          },
          {
            label: "예상 소정급여일수",
            getValue: (inp: Record<string, number>) => {
              const y = inp.insuranceYears;
              const over50 = inp.age >= 50;
              if (y < 1) return 120;
              if (y < 3) return over50 ? 180 : 150;
              if (y < 5) return over50 ? 210 : 180;
              if (y < 10) return over50 ? 240 : 210;
              return over50 ? 270 : 240;
            },
            format: (v: number) => `${v}일`,
          },
          {
            label: "예상 총 수급액",
            getValue: (inp: Record<string, number>) => {
              const daily = Math.min(Math.max(Math.round((inp.salary * 10000 / 30) * 0.6), 66048), 68100);
              const y = inp.insuranceYears;
              const over50 = inp.age >= 50;
              let days: number;
              if (y < 1) days = 120;
              else if (y < 3) days = over50 ? 180 : 150;
              else if (y < 5) days = over50 ? 210 : 180;
              else if (y < 10) days = over50 ? 240 : 210;
              else days = over50 ? 270 : 240;
              return daily * days;
            },
            format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만 원`,
            highlight: true,
          },
        ]}
        note="2026년 기준 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 평균임금에 따라 달라질 수 있어요."
      />

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 위로금·퇴직금·실업급여 관계 + SectionBadge + Checklist */}
      <H2>위로금과 수급 금액은 별개예요</H2>
      <p style={body}>
        희망퇴직하면 보통 위로금을 받아요. &quot;위로금 받았는데 실업급여도 되나요?&quot;라는 질문이 정말 많죠. 결론부터 말하면, <strong>셋 다 받을 수 있어요</strong>. 서로 다른 돈이니까요.
      </p>
      <p style={body}>
        <strong>위로금</strong>은 회사가 퇴직 유도 대가로 자체적으로 지급하는 돈이에요. <strong>퇴직금</strong>은 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>에 따라 1년 이상 근무한 근로자에게 의무적으로 지급하는 돈이죠. <strong>실업급여</strong>는 고용보험에서 나오는 돈이에요. 출처가 전부 달라요.
      </p>
      <p style={body}>
        그러니까 10년 근무하고 희망퇴직한다면 위로금 + 법정 퇴직금 + 실업급여를 전부 받을 수 있어요. 위로금을 받았다고 실업급여가 깎이거나 하지 않아요. 다만 퇴직금과 위로금에 대한 세금(퇴직소득세)은 별도로 발생할 수 있죠.
      </p>

      <GreenBox title="받을 수 있는 돈 3가지">
        위로금 — 회사가 자체 지급 (퇴직 유도 대가)<br />
        퇴직금 — 근로기준법에 따른 법정 지급<br />
        실업급여 — 고용보험에서 지급 (전부 별개)
      </GreenBox>

      <SectionBadge>신청 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 수급 금액과 기간 */}
      <H2>수급 금액과 지급 기간 계산법</H2>
      <p style={body}>
        희망퇴직자도 일반 근로자와 동일한 기준으로 실업급여를 받아요. 퇴직 전 평균임금의 <strong>60%</strong>를 소정급여일수만큼 지급받죠. 2026년 기준 1일 상한액은 68,100원, 하한액은 66,048원이에요.
      </p>
      <p style={body}>
        소정급여일수는 나이와 고용보험 가입기간에 따라 달라져요. 희망퇴직자는 대부분 오래 근무한 분들이니까 가입기간이 긴 편이죠. 50세 미만이고 10년 이상 가입했다면 240일, 50세 이상이면 270일을 받을 수 있어요.
      </p>
      <p style={body}>
        월로 환산하면 <strong>최대 약 204만 원</strong> 수준이에요. 10년 다닌 50세 이상 근로자라면 270일 x 68,100원 = 약 1,838만 원을 받을 수 있죠. 위에 있는 계산기에서 본인 예상 금액을 확인해보세요.
      </p>

      <BorderBox title="소정급여일수 기준 (2026년)">
        50세 미만 / 가입 10년 이상 → <strong>240일</strong><br />
        50세 이상 / 가입 10년 이상 → <strong>270일</strong><br />
        1일 상한 68,100원 / 하한 66,048원
      </BorderBox>

      <Divider />

      {/* 섹션 5 — 신청 절차와 주의사항 */}
      <H2>조건 충족 여부를 먼저 확인하세요</H2>
      <p style={body}>
        가장 먼저 할 일은 <strong>이직확인서 확인</strong>이에요. 회사에서 이직확인서를 작성할 때 퇴직 사유가 &quot;권고사직&quot; 또는 &quot;경영상 필요에 의한 퇴직&quot;으로 기재되어야 해요. &quot;자진퇴사&quot;로 적혀 있으면 실업급여가 어려워지니까 퇴직 전에 반드시 확인하세요.
      </p>
      <p style={body}>
        그다음은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급자격 신청자 온라인 교육을 이수해야 해요. 교육 이수 후 관할 고용센터에 방문하거나 온라인으로 실업급여를 신청하면 되죠. 퇴직일 다음 날부터 <strong>12개월 이내</strong>에 신청해야 하니까 미루지 마세요.
      </p>
      <p style={body}>
        희망퇴직 공고문, 사내 메일, 위로금 합의서 등은 사본을 꼭 보관하세요. 나중에 고용센터에서 추가 증빙을 요구할 수 있어요. 특히 이직확인서에 퇴직 사유가 잘못 기재된 경우, 이런 자료가 있으면 정정을 요청할 수 있죠.
      </p>

      <Divider />

      {/* FAQ (5개) */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        희망퇴직과 실업급여에 대해 가장 많이 물어보시는 내용이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      {/* References + Disclaimer */}
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 상황에 따라 수급자격 인정 여부가 달라질 수 있으니, 고용센터(1350)에 사전 상담을 받아보세요." />
    </ArticleLayout>
  );
}
