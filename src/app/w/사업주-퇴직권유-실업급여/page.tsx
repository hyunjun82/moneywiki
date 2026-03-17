"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "recommend", label: "사업주가 먼저 퇴직을 권유했다" },
  { id: "evidence", label: "퇴직 권유 증거(녹음, 문자, 이메일)를 보유하고 있다" },
  { id: "insured180", label: "고용보험 피보험기간이 180일 이상이다" },
  { id: "reemploy", label: "재취업 의사가 있고 구직활동이 가능하다" },
];

const CHECKLIST = [
  "퇴직 권유 대화를 녹음하거나 문자·이메일을 캡처",
  "사직서에 '회사의 권고에 따라 퇴사합니다'로 기재",
  "이직확인서의 퇴직 사유가 '권고사직'인지 확인",
  "회사가 자진퇴사로 신고했다면 고용센터에 이직사유 정정 신청",
  "퇴직 후 12개월 이내에 실업급여 신청",
];

const FAQS = [
  {
    q: "사장이 그만두라고 하면 바로 실업급여 받을 수 있나요?",
    a: "구체적인 퇴직 권유가 있어야 해요. 단순히 화가 나서 한 말은 해고 의사로 인정 안 될 수 있죠. 녹음이나 문자 같은 증거를 확보해두는 게 핵심이에요.",
  },
  {
    q: "사직서를 쓰면 자진퇴사로 처리되나요?",
    a: "회사가 먼저 권유했다면 사직서를 써도 권고사직으로 인정될 수 있죠. 다만 사직서에 '개인 사정'이라고 쓰면 불리해요. '회사의 권고에 따라 퇴사합니다'로 적는 게 좋아요.",
  },
  {
    q: "회사가 이직확인서에 자진퇴사로 기재하면 어떡하죠?",
    a: "고용센터에 이직사유 정정 신청을 하면 돼요. 녹음, 문자, 이메일 등 증거를 제출하면 고용센터에서 조사 후 정정해주죠. 허위 기재한 회사에는 과태료가 부과될 수 있어요.",
  },
  {
    q: "해고와 권고사직은 뭐가 다른가요?",
    a: "해고는 회사가 일방적으로 계약을 끊는 거고, 권고사직은 회사가 퇴직을 권유해서 본인이 동의하는 거예요. 둘 다 실업급여 대상이지만, 해고는 부당해고 여부를 따져야 하는 경우가 있죠.",
  },
  {
    q: "증거가 하나도 없으면 방법이 없나요?",
    a: "어렵지만 불가능하지는 않아요. 동료의 목격자 진술서를 받아두거나, 퇴직 전후 정황을 정리해서 고용센터에 제출할 수 있죠. 사전에 고용센터(1350)에 상담부터 받아보세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 수급자격 및 이직 사유 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙: 비자발적 이직 인정 기준", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 권고사직 관련 상담", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "권고사직-실업급여-신청-방법",
    title: "권고사직 실업급여 신청 방법",
    description: "권고사직은 비자발적 퇴사로 실업급여 수급이 가장 수월한 경우예요.",
  },
  {
    slug: "사직서-제출해도-실업급여",
    title: "사직서 제출해도 실업급여 받을 수 있을까",
    description: "사직서를 썼어도 상황에 따라 실업급여 대상이 될 수 있어요.",
  },
  {
    slug: "희망퇴직-실업급여",
    title: "희망퇴직하면 실업급여 받는 법",
    description: "희망퇴직도 회사가 먼저 제안한 거라면 비자발적 퇴사로 인정돼요.",
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
          currentSlug="사업주-퇴직권유-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 권고사직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사가 나가라고 했을 때?<br />
        실업급여 조건과 대처법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;사장님이 그만두라는데, 이게 실업급여 대상이 맞나요?&quot;<br />
        회사가 먼저 나가라고 했으면 <strong><a href="/w/권고사직-실업급여-신청-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>권고사직</a></strong>이에요.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은
        권고사직을 비자발적 이직으로 분류하고 있죠.
        고용보험 피보험기간 180일 이상이고, 재취업 의사만 있으면 실업급여 수급자격이 생겨요.
        문제는 회사가 &quot;자진퇴사&quot;로 처리하려는 경우인데, 이때 증거가 승패를 가르죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 퇴직 권유의 유형 + EligibilityChecker */}
      <H2>실업급여 조건에 맞는 퇴직 권유란 뭔가요?</H2>
      <p style={body}>
        &quot;이번 달 말까지 그만두세요&quot;, &quot;다른 직장 알아보는 게 좋겠어요&quot;: 사업주가 이렇게 분명하게 퇴직을 요구하면 <strong>구체적 퇴직 권유</strong>예요. 고용센터에서도 가장 명확한 권고사직으로 인정하죠. 이 경우 실업급여 조건 충족이 가장 수월해요.
      </p>
      <p style={body}>
        &quot;당장 나가!&quot;처럼 화를 내면서 한 말은 다르게 봐요. 진심으로 해고 의사를 밝힌 건지, 감정이 격해져서 내뱉은 건지에 따라 결과가 갈리죠. 고용센터는 발언 전후 맥락과 이후 근무 여부를 종합적으로 판단해요. 그래서 해당 대화를 녹음해두는 게 중요하죠.
      </p>
      <p style={body}>
        직접 &quot;나가&quot;라고 하진 않았지만, 업무를 안 주거나 한직으로 보내는 식의 <strong>암묵적 압박</strong>도 퇴직 권유에 해당할 수 있죠. <a href="/w/직장내-괴롭힘-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>직장 내 괴롭힘</a> 수준이라면 별도의 정당한 이직 사유로도 인정되고요. 승진에서 계속 빼거나, 동료들과 격리시키는 행위도 마찬가지예요. 이런 상황에서는 문자, 이메일, 동료 진술 같은 정황 증거가 많을수록 인정 가능성이 높아져요.
      </p>

      <GreenBox title="퇴직 권유의 3가지 유형">
        1. 구체적 권유: &quot;그만두세요&quot;, &quot;다른 곳 알아보세요&quot; (가장 명확)<br />
        2. 화내며 한 말: 진심 여부에 따라 해고 또는 불인정<br />
        3. 암묵적 압박: 업무 배제, 따돌림 등 (증거가 핵심)
      </GreenBox>

      <SectionBadge>실업급여 수급 자격 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 수급 가능성이 높아요. 증거를 챙겨서 고용센터에 신청하세요."
        partialMatchText="충족되지 않은 항목이 있어요. 고용센터(1350)에 상담받아 보세요."
      />

      <Divider />

      {/* 섹션 2: 증거 확보 */}
      <H2>대처법의 핵심, 어떤 증거를 모아야 하나요?</H2>
      <p style={body}>
        &quot;사장이 그만두라고 했어요&quot;라고 말만 해서는 고용센터에서 인정해주기 어려워요. 사업주 퇴직 권유를 증명하는 건 전적으로 본인 몫이죠. 가장 확실한 대처법은 <strong>녹음</strong>이에요. 대화 당사자가 직접 녹음하는 건 대한민국에서 합법이니까, 퇴직 권유 대화가 예상되면 녹음부터 켜세요.
      </p>
      <p style={body}>
        <strong>카카오톡이나 문자</strong>로 &quot;그만둬&quot;, &quot;내일부터 나오지 마&quot; 같은 메시지가 온 적이 있다면 바로 캡처하세요. 날짜와 발신자가 함께 보이도록 전체 화면을 저장해야 해요. <strong>이메일</strong>에 퇴직 권유 내용이 담겨 있다면 PDF로 저장해두는 게 안전하죠.
      </p>
      <p style={body}>
        녹음이나 메시지가 없다면 <strong>동료 목격자 진술서</strong>를 받아두세요. 퇴직 권유 현장을 본 동료가 &quot;언제, 어디서, 어떤 말을 들었는지&quot; 써주면 보조 증거가 되죠. 증거는 여러 개일수록 유리하고, <strong>퇴직하기 전에 모아둬야</strong> 해요. 회사를 나온 뒤에는 접근 자체가 어려워지니까요.
      </p>

      <BorderBox title="증거 확보 우선순위">
        1순위: 녹음 (대화 당사자 녹음은 합법)<br />
        2순위: 문자·카카오톡·이메일 캡처<br />
        3순위: 동료 목격자 진술서<br />
        4순위: 퇴직 전후 정황 정리 메모
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 사직서 작성 시 주의점 */}
      <H2>사직서를 써도 실업급여 조건을 충족할 수 있어요</H2>
      <p style={body}>
        회사에서 &quot;사직서 써와&quot;라고 해서 쓴 거라면 걱정하지 마세요. <strong>누가 먼저 퇴직을 제안했느냐</strong>가 핵심이지, 사직서라는 형식 자체가 실업급여를 가로막진 않아요. 고용센터도 서류 양식보다 퇴직의 실질적 경위를 우선으로 보죠.
      </p>
      <p style={body}>
        다만 사직서에 적는 문구는 신경 쓸 필요가 있죠. &quot;개인 사정&quot;이나 &quot;일신상의 사유&quot;라고 쓰면 자발적 퇴사로 처리될 위험이 커져요. <strong>&quot;회사의 권고에 따라 퇴사합니다&quot;</strong>나 <strong>&quot;구조조정으로 인해 퇴사합니다&quot;</strong>처럼 실제 경위를 반영해서 적는 게 훨씬 안전하죠.
      </p>
      <p style={body}>
        이미 &quot;개인 사정&quot;으로 제출해버렸다면요? 그래도 방법은 남아 있죠. 퇴직 권유 녹음이나 문자 같은 증거를 갖고 고용센터에 가서 실제 경위를 설명하면 돼요. 증거가 충분하면 사직서 문구보다 실제 사실관계를 기준으로 판단해주거든요.
      </p>

      <SectionBadge>퇴직 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 회사가 협조 안 할 때 */}
      <H2>회사가 협조 안 할 때 대처법 3단계</H2>
      <p style={body}>
        1단계는 <strong>이직사유 정정 신청</strong>이에요. 회사가 이직확인서에 &quot;자진퇴사&quot;로 신고하면 실업급여가 바로 안 나오죠. 이때 고용센터에 방문해서 정정 신청서를 내고, 퇴직 권유 증거(녹음, 문자 등)를 함께 제출하세요. 고용센터 담당자가 회사에 확인 조사를 진행해요.
      </p>
      <p style={body}>
        2단계는 조사 결과를 기다리는 거예요. 회사가 퇴직 사유를 허위로 기재한 게 확인되면 이직 사유가 정정되고 실업급여를 받을 수 있게 되죠. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 허위 기재한 회사에는 <strong>과태료</strong>까지 부과될 수 있고요.
      </p>
      <p style={body}>
        3단계는 <strong><a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>이의신청</a></strong>이에요. 정정 신청이 받아들여지지 않더라도 <strong>60일 이내</strong>에 추가 증거를 첨부해서 재심사를 요청할 수 있죠. 이의신청마저 안 되면 심사청구, 재심사청구 절차가 남아 있으니 끝까지 포기하지 마세요.
      </p>

      <GreenBox title="이직사유 정정 절차">
        1. 고용센터 방문 → 이직사유 정정 신청서 제출<br />
        2. 증거(녹음, 문자, 이메일 등) 함께 제출<br />
        3. 고용센터가 회사에 확인 조사 진행<br />
        4. 허위 기재 확인 시 사유 정정 + 회사에 과태료
      </GreenBox>

      <Divider />

      {/* 섹션 5: 실업급여 금액과 신청 */}
      <H2>실업급여 신청부터 수급까지 바로 따라하세요</H2>
      <p style={body}>
        권고사직으로 인정되면 퇴직 전 평균임금의 <strong>60%</strong>를 실업급여로 받아요. 2026년 기준 1일 상한액 <strong>68,100원</strong>, 하한액 <strong>66,048원</strong>이죠. 월로 환산하면 최대 약 <strong>204만 원</strong>이고, 수급 기간은 나이와 근속 기간에 따라 120일에서 270일까지 정해져요.
      </p>
      <p style={body}>
        신청은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 온라인 또는 가까운 고용센터 방문으로 가능해요. 처음에는 구직등록과 수급자격 인정 신청을 동시에 진행하죠. 이후 1~4주 간격으로 실업인정을 받아야 급여가 계좌에 들어와요.
      </p>
      <p style={body}>
        퇴직 후 <strong>12개월</strong>이 지나면 수급자격 자체가 소멸해요. 미루면 미룰수록 손해이니 퇴직 즉시 움직이세요. 아직 퇴직 전이라면 고용센터(1350)에 무료 사전 상담부터 받는 게 가장 좋죠. 어떤 증거를 더 모아야 하는지, 사직서를 어떻게 써야 하는지 구체적으로 안내받을 수 있고요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        사업주 퇴직 권유와 실업급여 조건에 대해 실제로 많이 묻는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 상황의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
