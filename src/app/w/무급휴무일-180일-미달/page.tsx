"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "무급휴무일이 발생하는 근무 형태예요" },
  { id: "c2", label: "유급휴일과 무급휴일 구분이 된 상태예요" },
  { id: "c3", label: "실제 근무일 + 유급일 합산이 180일 미달이에요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동이 가능해요" },
];

const CHECKLIST = [
  "고용24(www.ei.go.kr)에서 총 피보험기간 조회하기",
  "급여명세서에서 유급/무급 일수 구분 확인하기",
  "이전 직장 고용보험 가입기간 합산 가능 여부 확인하기",
  "부족하면 퇴직 시점을 조율해 180일 채우기",
  "고용센터(1350)에 전화해서 내 피보험기간 정확히 확인하기",
];

const FAQS = [
  {
    q: "무급휴무일이 정확히 뭐예요?",
    a: "일을 안 하고 급여도 안 받는 날이에요. 무급휴일, 무급휴가, 무급휴업일이 전부 해당되죠. 유급이면 피보험기간에 포함되고, 무급이면 빠져요.",
  },
  {
    q: "주 5일 근무인데 180일 채우려면 얼마나 다녀야 하나요?",
    a: "주 5일 근무에 주휴일 1일이면 주 6일이 피보험기간이에요. 180일 나누기 6일이면 30주, 약 7.5개월이 걸리죠. 무급휴무일이 끼어 있으면 더 오래 걸리고요.",
  },
  {
    q: "이전 직장 기간을 합산할 수 있다고요?",
    a: "이전 직장에서 실업급여를 안 받고 이직했다면 고용보험 가입기간이 합쳐져요. A직장 100일에 B직장 80일이면 합계 180일로 수급자격을 충족하죠.",
  },
  {
    q: "격주로 쉬는 날이 무급인데, 180일 계산은 어떻게 되나요?",
    a: "격주 휴무일이 무급이면 그 날은 피보험기간에서 빠져요. 유급이면 포함되고요. 급여명세서에서 유급인지 무급인지 꼭 확인해 보세요.",
  },
  {
    q: "일용직 기간도 합산할 수 있나요?",
    a: "일용직으로 일한 기간도 고용보험에 가입돼 있었다면 합산 대상이에요. 고용24에서 직장별 피보험기간 내역을 조회하면 일용직 포함 여부를 바로 알 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 피보험기간 산정 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령: 피보험단위기간 세부 규정", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 피보험기간 조회 및 실업급여 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 고용보험 상담(1350)", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-피보험단위기간",
    title: "피보험단위기간이란",
    description: "피보험단위기간과 피보험기간의 차이를 쉽게 풀어냈어요.",
  },
  {
    slug: "피보험기간-근무일수-계산-방법",
    title: "피보험기간 근무일수 계산법",
    description: "근무일수와 유급휴일을 더해 피보험기간을 직접 계산하는 방법이에요.",
  },
  {
    slug: "단시간-근로자-실업급여",
    title: "단시간 근로자도 실업급여 받을 수 있을까?",
    description: "주 15시간 미만 단시간 근로자의 실업급여 수급 조건이에요.",
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
          currentSlug="무급휴무일-180일-미달"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 피보험기간</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        무급휴무일 때문에 180일 미달?<br />
        피보험기간 계산 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;분명히 6개월 넘게 다녔는데 180일이 안 된다고요?&quot;
      </p>
      <p style={body}>
        이런 상황, 무급휴무일이 많은 직장에서 자주 생겨요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따르면 실업급여를 받으려면 퇴직 전 18개월 중 <strong>피보험기간 180일 이상</strong>이 필요한데, 무급휴무일은 이 180일에 포함되지 않거든요.
        달력상 7개월을 다녀도 무급일이 많으면 실제 <a href="/w/피보험기간-근무일수-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험기간</a>은 160일밖에 안 될 수 있죠.
      </p>
      <p style={body}>
        왜 이런 일이 생기는지, 내 피보험기간이 지금 얼마인지, 부족하면 어떻게 채우는지: 아래에서 순서대로 정리해뒀어요.
        퇴직을 앞두고 있다면 끝까지 읽어보세요. 지금 점검하면 돈을 지킬 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 피보험기간 180일이 뭔지 + EligibilityChecker */}
      <H2>피보험기간 180일, 계산 기준이 정확히 뭔가요?</H2>
      <p style={body}>
        피보험기간은 단순히 &quot;회사에 다닌 기간&quot;이 아니에요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 말하는 피보험기간은 <strong>실제로 일한 날 + 유급휴일</strong>을 더한 <a href="/w/실업급여-피보험단위기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험단위기간</a>이에요.
        달력상 6개월이 지났어도 무급으로 빠진 날이 많으면 180일에 못 미치죠.
      </p>
      <p style={body}>
        <strong>포함되는 날</strong>부터 짚어볼게요.
        실제 근무일, 주휴일(유급), 유급휴가, 유급 공휴일이 전부 들어가요.
        주 5일 근무라면 월~금 5일에 주휴일(일요일) 1일이 붙어서 <strong>주 6일</strong>이 피보험기간이 되죠.
        연차를 사용한 날도 유급이니까 빠지지 않아요.
      </p>
      <p style={body}>
        반대로 <strong>빠지는 날</strong>은 무급휴무일, 무급휴가, 결근일이에요.
        이 날들은 고용보험료가 납부되지 않으니까 피보험기간에서 제외돼요.
        무급휴무일이 한 달에 4~8일씩 쌓이면, 6개월을 성실히 다녀도 피보험기간은 150~160일에 그치는 거예요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>포함: 근무일, 주휴일(유급), 유급휴가, 유급 공휴일</p>
        <p style={{ margin: 0 }}>제외: 무급휴무일, 무급휴가, 결근일, 무급휴업일</p>
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="피보험기간 부족 문제를 해결할 수 있는 조건이에요. 아래 방법을 확인해 보세요."
        partialMatchText="충족되지 않은 항목이 있어요. 해당 부분을 먼저 점검해 보세요."
      />

      <Divider />

      {/* 섹션 2: 무급휴무일이 만드는 문제 */}
      <H2>무급휴무일이 많으면 피보험기간에 어떤 문제가 생기나요?</H2>
      <p style={body}>
        구체적인 예시를 하나 볼게요.
        A씨는 주 4일제 회사에서 7개월(약 210일)을 근무했어요. 매주 금요일이 무급휴무일이라 실제 피보험기간은 주 4일 근무 + 주휴일 1일 = <strong>주 5일</strong>이에요.
        7개월이면 약 28주니까, 28주 x 5일 = <strong>140일</strong>이죠. 180일에 40일이나 모자라요.
      </p>
      <p style={body}>
        이런 문제가 주 4일제 회사에서만 생기는 건 아니에요.
        격주 무급휴무가 있는 회사, 비수기에 무급휴업을 실시하는 제조업체, 개인 사유로 무급휴가를 자주 쓴 경우에도 같은 일이 벌어지죠.
        본인이 모르는 사이에 피보험기간이 부족해지는 거예요.
      </p>
      <p style={body}>
        그래서 퇴직 전에 반드시 본인의 피보험기간을 확인해야 해요.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 로그인하면 총 피보험기간을 바로 조회할 수 있죠.
        급여명세서에서 근무일수와 유급휴일을 하나씩 확인하는 것도 좋은 방법이에요.
        퇴직하고 나서 &quot;몇 일 모자라요&quot; 하면 돌이킬 수 없으니까요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>주 5일 근무 (주 6일 산정) → 약 <strong>7.5개월</strong></p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>주 4일 근무 (주 5일 산정) → 약 <strong>9개월</strong></p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>주 3일 근무 (주 4일 산정) → 약 <strong>11개월</strong></p>
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 180일 안 되면 해결법 + Checklist */}
      <H2>180일 미달 시 피보험기간 합산으로 해결하는 방법</H2>
      <p style={body}>
        가장 현실적인 방법은 <strong>이전 직장 고용보험 가입기간을 합산</strong>하는 거예요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따르면, 이전 직장에서 실업급여를 받지 않고 이직했다면 그때 쌓인 기간이 지금 직장과 합쳐지거든요.
        A직장 100일 + B직장 80일 = 180일로 수급자격을 충족하는 식이에요.
      </p>
      <p style={body}>
        다만 합산이 안 되는 케이스도 있죠.
        이전 직장 퇴사 때 <strong>실업급여를 이미 받았다면</strong> 그 이전 기간은 전부 리셋돼요. 새 직장에서 0일부터 다시 쌓아야 하죠.
        실업급여를 받을지 말지 결정할 때 이 부분을 꼭 따져봐야 하는 이유예요.
      </p>
      <p style={body}>
        일용직으로 일한 기간도 합산 대상이에요.
        일용직은 건별로 고용보험이 적용되니까, 일용직 기간과 정규직 기간을 합쳐서 180일을 넘기면 돼요.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 본인의 전체 피보험기간(직장별 내역 포함)을 조회할 수 있으니 퇴직하기 전에 미리 살펴보세요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>이전 직장에서 실업급여 안 받고 이직 → 합산 <strong>가능</strong></p>
        <p style={{ margin: "0 0 4px" }}>이전 직장에서 실업급여를 받음 → 합산 <strong>불가</strong> (리셋)</p>
        <p style={{ margin: 0 }}>일용직 기간 → 고용보험 가입됐다면 합산 <strong>가능</strong></p>
      </GreenBox>

      <SectionBadge>피보험기간 확인 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 피보험기간 확인하는 방법 */}
      <H2>내 피보험기간 계산 기준 확인하는 곳</H2>
      <p style={body}>
        가장 간편한 방법은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24(www.ei.go.kr)</a>에 공인인증서나 간편인증으로 로그인하는 거예요.
        &quot;피보험기간 조회&quot; 메뉴에서 본인의 총 피보험기간, 직장별 가입기간을 한눈에 볼 수 있죠.
        이전 직장 기간까지 전부 나오니까 합산 여부를 바로 판단할 수 있죠.
      </p>
      <p style={body}>
        급여명세서로도 직접 확인이 가능해요.
        매달 급여명세서에 근무일수와 유급휴일이 표시돼 있으니까요.
        무급휴무일이 별도로 기재된 경우도 있고, 빠져 있으면 총 일수에서 근무일과 유급일을 빼면 무급일수가 나오죠.
        6개월치를 모아서 더하면 본인의 실제 피보험기간을 추정할 수 있죠.
      </p>
      <p style={body}>
        직접 계산하기 번거롭다면 <a href="/w/실업급여-고용센터" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용센터</a>(1350)에 전화하는 게 가장 정확해요.
        담당자가 시스템에서 바로 조회해주니까 실수할 일이 없죠.
        퇴직 전에 한 번 전화해서 &quot;제 피보험기간이 180일 넘는지&quot; 물어보면 끝이에요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>1단계: 고용24(www.ei.go.kr) 로그인 → 피보험기간 조회</p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>2단계: 급여명세서에서 근무일수 + 유급휴일 직접 합산</p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>3단계: 확실하지 않으면 고용센터(1350) 전화 문의</p>
      </BorderBox>

      <Divider />

      {/* 섹션 5: 실전 정리 */}
      <H2>퇴직 전에 피보험기간 계산 기준부터 챙기세요</H2>
      <p style={body}>
        실업급여 수급자격의 첫 번째 관문이 피보험기간 180일이에요.
        무급휴무일이 많은 직장이라면 달력상 6개월을 채워도 이 기준에 미달할 수 있죠.
        퇴직을 결심했다면 가장 먼저 본인의 피보험기간부터 점검하세요. 180일이 됐는지 안 됐는지, 이게 모든 것의 시작이에요.
      </p>
      <p style={body}>
        부족하다면 이전 직장 합산이 가능한지 살펴보세요.
        실업급여를 받지 않고 이직한 경력이 있다면 그 기간이 합쳐지거든요. 일용직 경력도 마찬가지예요.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 전체 이력을 조회하면 바로 알 수 있죠.
      </p>
      <p style={body}>
        지금 직장에서 조금 더 일해서 180일을 채울 수 있다면, 그게 가장 확실한 방법이에요.
        주 5일 근무 기준 30주(약 7.5개월)면 되니까, 부족한 일수를 계산해서 퇴직 시점을 조율하는 것도 전략이죠.
        애매하면 고용센터(1350)에 전화 한 통이면 정확한 답을 받을 수 있죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        무급휴무일이랑 피보험기간 180일을 놓고 가장 자주 들어오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 피보험기간 산정은 고용센터 판단에 따라 달라질 수 있으니, 퇴직 전 고용센터(1350) 상담을 권해요." />
    </ArticleLayout>
  );
}
