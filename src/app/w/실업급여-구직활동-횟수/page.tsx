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
  { id: "c1", label: "실업인정 일정을 고용24에서 확인했어요" },
  { id: "c2", label: "해당 기간 내 구직활동을 2회 이상 했어요" },
  { id: "c3", label: "구직활동 증빙(캡처, 확인서 등)을 보관하고 있어요" },
  { id: "c4", label: "고용24에 구직활동 내역을 입력 완료했어요" },
];

const CHECKLIST = [
  "고용24에서 다음 실업인정일과 필요한 구직활동 횟수 확인하기",
  "워크넷(work.go.kr)에서 본인 분야에 맞는 채용공고에 입사지원하기",
  "민간 채용사이트(사람인, 잡코리아 등) 지원 시 완료 화면 캡처하기",
  "면접을 본 경우 면접 확인서 또는 면접 일시가 적힌 이메일 보관하기",
  "실업인정 신청일에 고용24에서 구직활동 내역 입력 및 증빙 첨부하기",
];

const FAQS = [
  {
    q: "구직활동은 정확히 몇 회 해야 하나요?",
    a: "1~3차 실업인정까지는 1회면 충분하고, 4차부터는 매번 2회 이상 해야 해요. 고용보험법 시행규칙에 명시된 기준이죠.",
  },
  {
    q: "워크넷 말고 사람인이나 잡코리아 지원도 인정되나요?",
    a: "인정돼요. 다만 워크넷과 달리 자동 연동이 안 되니까, 입사지원 완료 화면을 캡처해서 고용24에 직접 올려야 하죠.",
  },
  {
    q: "직업훈련 받고 있으면 구직활동을 따로 안 해도 되나요?",
    a: "맞아요. 직업훈련 자체가 구직활동으로 인정되니까 별도로 입사지원할 필요가 없죠. 훈련 참여 기록이 고용센터에서 자동 확인돼요.",
  },
  {
    q: "실업인정 기간이 지난 후에 한 구직활동도 인정받을 수 있나요?",
    a: "안 돼요. 구직활동은 반드시 해당 실업인정 기간 안에 해야 해요. 이전 기간이나 다음 기간의 활동은 인정이 안 되죠.",
  },
  {
    q: "구직활동 횟수를 못 채우면 실업급여가 영구적으로 끊기나요?",
    a: "영구적으로 끊기진 않아요. 해당 차수의 급여만 지급되지 않고, 다음 실업인정 때 횟수를 채우면 이후분부터 다시 받을 수 있죠. 다만 못 받은 기간의 급여는 소급되지 않으니 빠뜨리지 않는 게 중요해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 실업인정 및 구직활동 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙: 구직활동 인정 횟수 세부 기준", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업인정 신청 및 구직활동 입력", url: "https://www.ei.go.kr" },
      { label: "워크넷: 구인구직 매칭 및 입사지원", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업인정일-변경",
    title: "실업인정일 변경하는 방법",
    description: "실업인정일에 출석이 어려우면 사전에 변경 신청이 가능해요.",
  },
  {
    slug: "실업급여-온라인-교육",
    title: "실업급여 온라인 교육 수강 방법",
    description: "고용센터 방문 없이 온라인으로 취업지원 교육을 받을 수 있죠.",
  },
  {
    slug: "실업급여-직업훈련",
    title: "실업급여 받으면서 직업훈련 받기",
    description: "직업훈련 중에는 구직활동이 면제되고 훈련수당도 나와요.",
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
          currentSlug="실업급여-구직활동-횟수"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 &middot; 고용보험 &middot; 구직활동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        구직활동 몇 번 해야 할까?<br />
        차수별 인정 기준과 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;구직활동을 몇 번이나 해야 하는 거죠?&quot;
      </p>
      <p style={body}>
        생각보다 단순해요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙</a>에 따라
        <strong> 1~3차 실업인정은 1회, 4차부터는 2회 이상</strong>이면 돼요.{" "}
        <a href="https://www.work.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>워크넷</a>에서 온라인 입사지원 한 건만 해도 인정되고, 10분이면 끝나죠.
        <a href="/w/실업급여-직업훈련" style={{ color: "#1D9E75", textDecoration: "underline" }}>직업훈련</a>을 받고 있다면 별도 구직활동 없이 자동 인정되고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 차수별 구직활동 횟수 */}
      <H2>차수별 인정 기준이 다른가요?</H2>
      <SectionBadge>수급 자격 체크</SectionBadge>

      <p style={body}>
        실업급여를 받으려면 1~4주마다 실업인정을 받아야 하죠.
        이때 &quot;나는 이 기간에 구직활동을 했다&quot;는 걸 증명해야 해요.
        그런데 처음부터 끝까지 같은 횟수가 아니에요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙</a>이 차수별로 기준을 다르게 잡아놨죠.
      </p>
      <p style={body}>
        <strong>1차~3차 실업인정</strong>까지는 구직활동 <strong>1회</strong>면 충분해요.
        퇴직 직후에는 이력서를 정비하고 어떤 분야로 갈지 방향을 잡는 시간이 필요하니까, 초반 기준을 낮춰둔 거예요.
        워크넷에서 입사지원 한 건만 해도 넘어가는 수준이죠.
      </p>
      <p style={body}>
        <strong>4차부터는 2회 이상</strong>으로 기준이 올라가요.
        준비 기간은 충분히 가졌으니, 본격적으로 일자리를 찾으라는 의미예요.
        4주에 2회니까 2주에 한 번꼴이죠.
        크게 부담스러운 횟수는 아니에요.
      </p>

      <GreenBox>
        1차 실업인정: 1회<br />
        2차 실업인정: 1회<br />
        3차 실업인정: 1회<br />
        4차 이후: 매 실업인정마다 2회 이상
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="구직활동 요건을 모두 갖췄어요. 실업인정일에 고용24에서 신청하세요."
        partialMatchText="아직 준비가 덜 됐어요. 체크 안 된 항목부터 처리하세요."
      />

      <Divider />

      {/* 섹션 2: 인정되는 구직활동 종류 */}
      <H2>어떤 방법이 구직활동으로 인정되나요?</H2>

      <p style={body}>
        가장 많이 쓰는 방법은 <strong>온라인 입사지원</strong>이에요.{" "}
        <a href="https://www.work.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>워크넷</a>에서 채용공고를 찾아 지원 버튼을 누르면 끝이죠.
        워크넷 입사지원 기록은{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 자동 연동되니까 별도 증빙을 올릴 필요가 없어요.
        집에서 10분이면 되는, 가장 간편한 방법이에요.
      </p>
      <p style={body}>
        사람인, 잡코리아, 인크루트 같은 <strong>민간 채용사이트</strong> 지원도 인정돼요.
        다만 워크넷과 달리 자동 연동이 안 되니까, 입사지원 완료 화면을 캡처해서 고용24에 직접 올려야 하죠.
        한 단계 번거롭지만, 본인 분야의 공고가 더 다양한 사이트라면 충분히 활용할 만해요.
        캡처할 때 지원 일자와 회사명이 보이도록 찍는 게 핵심이에요.
      </p>
      <p style={body}>
        입사지원 말고도 인정되는 활동이 꽤 많아요.
        <strong>면접</strong>을 봤다면 당연히 해당되고, <strong>채용박람회</strong> 참가도 되죠.
        고용센터에서 <strong>직업상담</strong>을 받거나, 고용24에서 온라인 취업특강을 수강한 것도 구직활동이에요.
        &quot;취업을 위해 적극적으로 노력하고 있다&quot;는 걸 보여주면 된다고 생각하면 돼요.
      </p>

      <BorderBox>
        온라인 입사지원: 워크넷 자동 연동, 사람인/잡코리아는 캡처 필요<br />
        면접 참석: 면접 확인서 또는 안내 이메일 증빙<br />
        직업훈련 수강: 별도 구직활동 면제<br />
        채용박람회 참가: 참가 확인 증빙<br />
        고용센터 직업상담 / 온라인 취업특강
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 직업훈련 면제와 워크넷 활용 */}
      <H2>직업훈련 중 인정 기준과 면제 방법</H2>
      <SectionBadge>구직활동 전 체크리스트</SectionBadge>

      <p style={body}>
        국민취업지원제도나 내일배움카드로 <strong>직업훈련</strong>을 받고 있다면 별도의 구직활동을 안 해도 돼요.
        훈련 참여 자체가 구직활동으로 인정되니까요.
        출석 기록이 고용센터 시스템에 자동으로 잡혀서 따로 증빙할 것도 없죠.
      </p>
      <p style={body}>
        많은 수급자가 직업훈련을 선택하는 이유가 여기에 있어요.
        새로운 기술을 배울 수 있으니 재취업에 유리하고, 구직활동 횟수를 채워야 하는 부담이 아예 사라지죠.
        훈련 기간에도 실업급여는 정상 지급되고요.
        과정에 따라 훈련수당이 별도로 나오기도 하니까 고용센터에서 안내를 받아보세요.
      </p>
      <p style={body}>
        직업훈련을 받지 않는다면 <strong>워크넷 입사지원</strong>이 가장 편한 방법이에요.
        자동 연동이라 증빙 걱정이 없고, 집에서 10분이면 되죠.
        4차 이후에는 2회가 필요하니까 2주에 한 번꼴로 워크넷에서 지원하면 무리 없이 채울 수 있어요.
        단, 본인 경력에 맞는 공고에 지원해야 인정된다는 점을 기억하세요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 주의사항 */}
      <H2>차수별 인정에서 주의할 점</H2>

      <p style={body}>
        가장 많이 실수하는 부분이 <strong>기간</strong>이에요.
        구직활동은 반드시 해당 실업인정 기간 안에 해야 하죠.
        1월 1일~28일이 실업인정 기간이라면, 12월에 한 활동은 인정이 안 돼요.
        1월 29일 이후에 한 활동도 이번 차수에 해당하지 않고요.
      </p>
      <p style={body}>
        <strong>질 낮은 지원</strong>도 걸러져요.
        본인 경력이나 자격과 전혀 상관없는 곳에 무작위로 지원하면 구직활동으로 인정이 안 될 수 있죠.
        같은 회사에 반복 지원하는 것도 마찬가지예요.
        고용센터에서 &quot;성실한 구직 노력&quot;인지를 판단하기 때문에, 본인 분야에 맞는 곳에 지원하는 게 안전해요.
      </p>
      <p style={body}>
        횟수를 채우지 못하면 그 차수의 <strong>실업급여가 지급되지 않아요</strong>. <a href="/w/실업인정일-변경" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업인정일 변경</a>이 필요하면 미리 신청하세요.
        영구적으로 끊기는 건 아니고, 다음 실업인정 때 횟수를 채우면 이후분부터 다시 받을 수 있죠.
        다만 못 받은 기간의 급여는 소급되지 않으니, 실업인정 기간이 시작되면 초반에 미리 활동을 해두는 게 안전해요.
      </p>

      <GreenBox>
        기간 내 활동만 인정: 해당 실업인정 기간 안에서 해야 해요<br />
        성실한 지원만 인정: 무작위/반복 지원은 불인정 가능<br />
        횟수 미달 시 해당 차수 미지급: 소급 지급 안 되니 빠뜨리지 마세요
      </GreenBox>

      <Divider />

      {/* 섹션 5: 실전 정리 */}
      <H2>실업인정 때 구직활동 입력하는 방법</H2>

      <p style={body}>
        구직활동 내역은 <strong>실업인정 신청할 때</strong>{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 입력해요.
        온라인으로 실업인정을 신청하면 &quot;구직활동 내역&quot; 항목이 뜨는데, 활동 종류와 날짜를 적고 증빙자료를 올리면 되죠.
        워크넷으로 입사지원했다면 자동으로 목록에 뜨니까 선택만 하면 끝이에요.
      </p>
      <p style={body}>
        민간 사이트에서 지원했다면 완료 화면 캡처를 첨부하세요.
        면접을 본 경우에는 면접 확인서나 안내 이메일을 올리면 되고요.
        증빙이 부족하면 인정이 안 될 수 있으니까, 지원할 때마다 바로 캡처하는 습관을 들이는 게 좋아요.
        고용24 앱에서도 파일 첨부가 되니 스마트폰으로도 처리가 가능하죠.
      </p>
      <p style={body}>
        활동한 내역은 <strong>그때그때 기록으로 남겨두세요</strong>. <a href="/w/실업급여-부정수급" style={{ color: "#1D9E75", textDecoration: "underline" }}>부정수급</a>으로 의심받지 않으려면 증빙 관리가 중요해요.
        입사지원 완료 화면, 면접 일시 메모, 훈련 수료증 등을 폴더 하나에 모아두면 실업인정 때 한꺼번에 올리기 편하죠.
        실업인정일에 허둥대지 않으려면 평소에 정리해두는 게 핵심이에요.
        고용24 앱에서 알림을 설정해두면 일정을 놓칠 일도 없고요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 구직활동 횟수에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 시행규칙을 바탕으로 작성됐어요. 구직활동 인정 여부는 고용센터 판단에 따라 다를 수 있으니, 자세한 사항은 고용센터(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
