"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "부모님(또는 동거 친족)이 질병·부상으로 간병이 필요해요" },
  { id: "c2", label: "의사 진단서에 30일 이상 간병 필요가 명시되어 있어요" },
  { id: "c3", label: "회사에 휴직을 요청했지만 거절당했어요" },
  { id: "c4", label: "본인 외에 간병할 수 있는 가족이 없어요" },
];

const CHECKLIST = [
  "이직확인서: 퇴직 사유가 '가족 간병'으로 기재되었는지 확인",
  "진단서: '30일 이상 간병 필요' 명시 (퇴직 직후 발급 추천)",
  "가족관계증명서: 환자와의 관계 입증용",
  "휴직 거절 증빙: 이메일, 문자, 대화 캡처 등",
  "병원 입원·통원 기록, 처방약 명세: 추가 증빙용",
];

const FAQS = [
  {
    q: "부모님 간병으로 자진퇴사해도 실업급여를 받을 수 있나요?",
    a: "받을 수 있죠. 30일 이상 간병이 필요하다는 진단서가 있고, 회사가 휴직을 허락하지 않았다면 정당한 이직 사유로 인정돼요.",
  },
  {
    q: "간병이 아닌 일반 자진퇴사는 실업급여를 못 받나요?",
    a: "단순 이직 목적의 자진퇴사는 안 돼요. 하지만 임금체불, 직장 내 괴롭힘, 건강 문제 등 정당한 사유가 있으면 받을 수 있죠.",
  },
  {
    q: "간병 퇴직 실업급여는 얼마나 받나요?",
    a: "다른 실업급여와 같아요. 평균임금의 60%를 받고, 2026년 기준 1일 최소 66,048원, 최대 68,100원이에요. 수급기간은 나이와 가입기간에 따라 120~270일이죠.",
  },
  {
    q: "간병 중에도 구직활동을 해야 하나요?",
    a: "원칙적으로 4주마다 1회 이상 구직활동이 필요해요. 다만 간병 중이라는 사유를 고용센터에 제출하면 일정 기간 유예받을 수 있죠.",
  },
  {
    q: "형제자매가 있는데 내가 퇴직해야 하나요?",
    a: "다른 가족이 간병할 수 있으면 인정이 어려울 수 있어요. 고용센터에서 '본인만 간병할 수 있는 상황인가'를 판단하죠. 형제자매가 직장에 다니고 있어서 간병이 불가능하다는 증빙이 있으면 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 수급자격의 제한 (정당한 이직 사유)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙: 정당한 이직 사유 세부 기준", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 신청 및 수급자격 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 정당한 이직 사유 상담 사례", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "자발적-퇴사-실업급여",
    title: "자발적 퇴사 실업급여 정당한 사유 기준",
    description: "임금체불, 괴롭힘, 통근 곤란 등 정당한 사유가 있으면 자진퇴사도 실업급여 대상이에요.",
  },
  {
    slug: "실업급여-정당한-퇴사-사유",
    title: "실업급여 인정 퇴사 사유 전체 목록",
    description: "고용보험법이 인정하는 정당한 이직 사유를 한눈에 정리했어요.",
  },
  {
    slug: "실업급여-질병-부상",
    title: "질병·부상으로 퇴직 시 실업급여",
    description: "본인 건강 문제로 퇴직한 경우에도 정당한 사유로 인정받을 수 있어요.",
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
          currentSlug="간병-사유-퇴직-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 간병퇴직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        간병으로 퇴직해도 실업급여 될까?<br />
        자격 기준과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;부모님이 쓰러지셨는데 회사에서 휴직을 안 해줘요. 그만두면 실업급여는 포기해야 하나요?&rdquo;<br />
        아니에요, 받을 수 있죠.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은 가족 간병 때문에 어쩔 수 없이 퇴직한 경우를 <a href="/w/실업급여-정당한-퇴사-사유" style={{ color: "#1D9E75", textDecoration: "underline" }}>정당한 이직 사유</a>로 인정하죠.
        진단서 하나, 휴직 거절 증빙 하나: 이 두 가지만 갖추면 자진퇴사여도 실업급여 대상이 되죠.
        지금부터 자격 기준, 인정·불인정 사례, 서류 준비, 신청 절차까지 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 정당한 이직 사유 인정 기준 */}
      <H2>간병 퇴직 실업급여, 자격 기준이 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙</a>이 기준을 딱 정해놨어요. 부모님이나 동거 중인 친족이 질병·부상으로 <strong>30일 이상</strong> 간병이 필요한데, 회사에 휴직을 요청했으나 <strong>거절</strong>당해서 퇴직하는 경우가 해당되죠.
      </p>
      <p style={body}>
        여기서 핵심 포인트가 &ldquo;휴직 거절&rdquo;이에요. 회사가 휴직을 허락했다면 굳이 퇴직할 이유가 없으니까요. 그래서 고용센터에서도 &ldquo;회사가 정말 거절했나?&rdquo;를 먼저 살펴보죠. 병원 진단서에 &ldquo;30일 이상 간병 필요&rdquo;라는 문구가 있어야 하고, 휴직 거절을 증명할 이메일이나 문자 기록이 있으면 훨씬 유리해요.
      </p>
      <p style={body}>
        판단 기준이 하나 더 남았어요. <strong>&ldquo;본인만 간병할 수 있는 상황인가&rdquo;</strong>예요. 배우자나 형제자매가 대신 돌볼 수 있다면 수급자격이 제한될 수 있죠. 다른 가족이 직장에 다니거나 건강상 간병이 불가능하다는 걸 소명하면 인정받기 수월해요.
      </p>

      <GreenBox title="인정 조건 3가지">
        1. 환자의 진단서에 <strong>30일 이상 간병 필요</strong>가 명시<br />
        2. 회사에 휴직을 요청했으나 <strong>거절</strong>당함<br />
        3. <strong>본인 외에 간병할 수 있는 가족</strong>이 없음
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 정당한 이직 사유로 인정될 가능성이 높아요. 서류를 준비해서 고용센터에 신청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인하고 고용센터(1350)에 사전 상담을 받아보세요."
      />

      <Divider />

      {/* 섹션 2: 인정되는 경우 vs 안 되는 경우 */}
      <H2>어떤 간병이 인정되고 어떤 건 안 되나요?</H2>
      <p style={body}>
        <strong>인정되는 사례</strong>부터 볼게요. 부모님이 중풍이나 치매로 장기 요양이 필요한 경우가 제일 많아요. 배우자나 자녀가 중병으로 입원해 곁에서 돌봐야 하는 상황도 해당되죠. 공통점은 &ldquo;의료적으로 간병이 필수&rdquo;라는 것, 그리고 &ldquo;회사가 휴직을 거절했다&rdquo;는 거예요.
      </p>
      <p style={body}>
        반대로 <strong>인정이 어려운 경우</strong>도 있죠. 형제자매가 이미 간병하고 있는데 본인도 함께 돌보겠다며 퇴직하면 고용센터에서 &ldquo;꼭 퇴직까지 해야 했나?&rdquo;라고 판단하죠. &ldquo;부모님이 외로워하셔서&rdquo; 같은 정서적 이유만으로는 안 돼요. 반드시 의사 진단서가 뒷받침돼야 하고요.
      </p>
      <p style={body}>
        간병 기간도 중요해요. 며칠 정도 짧은 간병은 연차휴가로 처리할 수 있다고 보기 때문에 인정이 안 되죠. &ldquo;30일 이상&rdquo;이라는 기준이 있는 이유가 바로 이거예요. 수술 후 3~4일 간병이 필요한 수준이라면 실업급여 사유로는 부족해요.
      </p>

      <BorderBox title="회사가 퇴직을 강요한다면?">
        간병이 필요한 근로자에게 퇴직을 강요하면 부당해고에 해당할 수 있어요.<br />
        이 경우 노동청(1350)에 부당해고 구제신청이 가능하죠.<br />
        간병 사유 자진퇴사 대신 <a href="/w/권고사직-실업급여-신청-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>권고사직</a>으로 처리하면 실업급여 수급이 더 수월해요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 필요 서류 */}
      <H2>신청에 필요한 서류</H2>
      <p style={body}>
        필수 서류가 딱 세 가지예요. <strong>이직확인서</strong>(회사가 고용센터에 제출), <strong>진단서</strong>(30일 이상 간병 필요 명시), <strong>가족관계증명서</strong>(환자와의 관계 증명)죠. 이직확인서는 퇴직 후 10일 이내에 회사가 제출하는 건데, 퇴직 사유란에 &ldquo;가족 간병&rdquo;이 정확히 적혀야 해요.
      </p>
      <p style={body}>
        진단서는 퇴직 직후에 발급받으세요. 유효 기간이 있기 때문이에요. &ldquo;입원했음&rdquo; 정도로는 부족하고, 의사가 &ldquo;30일 이상 간병이 필요하다&rdquo;고 판단한 내용이 담겨야 하죠. 병원에 요청할 때 이 문구를 꼭 넣어달라고 말씀하세요.
      </p>
      <p style={body}>
        추가 증빙이 있으면 심사가 훨씬 수월해져요. 입원·통원 기록, 처방약 명세, 휴직 거절 증거(이메일, 카톡, 문자)가 대표적이죠. 특히 회사에 휴직을 요청했다가 거절당한 기록은 &ldquo;불가피한 퇴직이었다&rdquo;는 걸 직접 증명해주니까 꼭 챙겨두세요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 신청 절차 */}
      <H2>신청 방법과 절차</H2>
      <p style={body}>
        퇴직 후 <strong>12개월 이내</strong>에 신청해야 해요. 이 기간이 지나면 수급자격 자체가 소멸되죠. 관할 고용센터에 직접 방문하거나 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 신청할 수 있고, 위에서 정리한 필수 서류 3가지를 챙겨가면 돼요.
      </p>
      <p style={body}>
        고용센터 담당자가 면담을 통해 정당한 사유 해당 여부를 심사해요. 간병이 왜 불가피했는지, 회사에 휴직을 요청했는데 왜 거절당했는지를 차분하게 설명하면 되죠. 온라인 신청 시에는 서류를 스캔본이나 사진으로 첨부할 수 있는데, 원본은 따로 보관해두세요.
      </p>
      <p style={body}>
        심사 결과는 보통 1~2주면 나와요. 승인되면 약 2주 내에 첫 실업급여가 통장에 입금되죠. 만약 불인정 결정이 나오더라도 <strong>60일 이내에 <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>이의신청</a></strong>이 가능해요. 추가 증빙을 첨부해서 재심사를 받으면 되니, 서류를 미리 넉넉하게 확보해두는 게 유리하죠.
      </p>

      <GreenBox title="애매하면 사전 상담부터">
        본인 상황이 정당한 사유에 해당하는지 확실하지 않다면<br />
        고용센터(1350)에 사전 상담을 먼저 받으세요.<br />
        무료이고, 심사 결과에 영향을 주지 않아요.
      </GreenBox>

      <Divider />

      {/* 섹션 5: 금액과 구직활동 */}
      <H2>수급 금액과 구직활동 기준</H2>
      <p style={body}>
        금액 체계는 일반 실업급여와 똑같아요. 퇴직 전 3개월 평균임금의 60%를 받고, 2026년 기준 1일 최소 <strong>66,048원</strong>, 최대 <strong>68,100원</strong>이에요. 월로 환산하면 약 198~204만 원 수준이죠. 나이와 고용보험 가입 기간에 따라 수급기간이 120~270일까지 달라요.
      </p>
      <p style={body}>
        구직활동 의무가 빠질 수 없어요. 원칙적으로 4주마다 최소 1회 이상 구직활동을 증명해야 하죠. 워크넷에서 입사지원하면 자동으로 기록되니까 가장 간편하고요. 다만 간병 중이라면 사유서를 제출해서 일정 기간 유예를 받을 수 있고요.
      </p>
      <p style={body}>
        유예를 받더라도 수급 기간 내내 구직활동을 안 할 순 없어요. 간병이 안정되면 다시 시작해야 하죠. 실업급여로 생활비 부담을 덜 수 있는 기간이니, 간병과 구직을 어떻게 병행할지 미리 계획을 세워두면 훨씬 여유로워요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        간병 사유 퇴직과 실업급여에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용24(ei.go.kr)나 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
