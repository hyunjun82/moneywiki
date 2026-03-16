"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "resigned", label: "퇴직 사실이 확인된 상태 (퇴직일 확정)" },
  { id: "requested", label: "회사에 이직확인서 발급을 서면/문자로 요청 완료" },
  { id: "evidence", label: "발급 거부 증거 보관 (문자, 이메일, 녹음 등)" },
  { id: "report", label: "고용센터에 미발급 신고할 의사 있음" },
];

const CHECKLIST = [
  "퇴직 전 근로계약서, 급여명세서, 4대보험 가입내역 확보",
  "퇴직 관련 문자, 이메일, 녹음 등 증빙자료 보관",
  "퇴직 후 10일 넘도록 이직확인서 미발급 시 고용센터 신고",
  "고용24(ei.go.kr) '이직확인서 미발급 신고' 메뉴 이용",
  "퇴직 후 12개월 이내 실업급여 신청 기한 확인",
];

const FAQS = [
  {
    q: "회사가 이직확인서를 안 해주면 실업급여를 아예 못 받나요?",
    a: "아니에요. 고용센터에 신고하면 고용센터에서 사업주에게 직접 발급을 요청하죠. 사업주가 끝까지 거부하면 고용센터가 직권으로 이직확인서를 작성해서 처리해요.",
  },
  {
    q: "퇴사 사유를 회사가 다르게 적었는데 어떻게 하죠?",
    a: "고용센터에 이의를 제기할 수 있죠. 녹음, 문자, 이메일 등 증거가 있으면 고용센터에서 퇴직 사유를 다시 판단해요. 증빙자료가 핵심이에요.",
  },
  {
    q: "회사가 폐업했는데 이직확인서를 어떻게 받죠?",
    a: "고용센터에서 직권으로 처리해줘요. 폐업 사실을 확인한 뒤 4대보험 자료를 바탕으로 이직확인서를 대체하죠. 폐업했다고 실업급여를 못 받는 건 아니에요.",
  },
  {
    q: "이직확인서 없이도 수급자격 신청이 가능한가요?",
    a: "가능해요. 이직확인서가 아직 안 나왔어도 일단 수급자격 신청을 접수할 수 있죠. 나중에 이직확인서가 처리되면 합쳐서 진행돼요.",
  },
  {
    q: "신고하면 회사에 과태료가 바로 부과되나요?",
    a: "바로는 아니에요. 고용센터가 먼저 사업주에게 발급을 요청하고, 그래도 응하지 않으면 최대 30만원 과태료가 나가요. 대부분 고용센터 연락 한 번이면 해결되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제42조 — 이직확인서 발급 의무 및 과태료", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 이직확인서 미발급 신고", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 실업급여 상담 (1350)", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-고용보험-미가입",
    title: "고용보험 미가입 시 실업급여 받는 법",
    description: "회사가 고용보험을 안 들어줬어도 실업급여를 받을 수 있는 방법이에요.",
  },
  {
    slug: "실업급여-이의신청",
    title: "실업급여 이의신청 방법과 기한",
    description: "실업급여가 불인정됐을 때 60일 이내에 이의신청을 할 수 있죠.",
  },
  {
    slug: "사직서-제출해도-실업급여",
    title: "사직서 제출해도 실업급여 받을 수 있나",
    description: "사직서를 냈어도 정당한 사유면 실업급여 대상이에요.",
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
          currentSlug="실업급여-이직확인서-거부"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 이직확인서 · 발급거부</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이직확인서 안 준다고?<br />
        거부 신고 방법과 과태료 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "퇴사한 지 한 달이 넘었는데 이직확인서가 안 와요."<br />
        이런 상황에서도 실업급여를 받을 수 있죠. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제42조</a>에 따라
        사업주는 퇴직일로부터 <strong>10일 이내</strong>에 이직확인서를 발급할 의무가 있어요.
        거부하면 <strong>최대 30만원 과태료</strong>가 부과되고,
        끝까지 안 해주면 고용센터에서 직권으로 작성해줘요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 이직확인서가 필요한 이유 + 자격확인 */}
      <H2>거부당하면 과태료 기준이 어떻게 되나요?</H2>
      <p style={body}>
        실업급여를 신청하려면 <strong>이직확인서</strong>가 꼭 필요해요. 이직확인서에는 퇴사 사유, 근무 기간, 급여 정보가 모두 적혀 있죠.
        고용센터에서는 이 서류를 보고 실업급여 수급자격이 되는지 판단해요. 이직확인서 없이는 심사 자체가 시작이 안 되는 셈이에요.
      </p>
      <p style={body}>
        이직확인서는 회사(사업주)가 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 발급하는 서류예요.
        근로자가 직접 만들 수 없고, 반드시 사업주를 통해야 하죠. 그래서 사업주가 비협조적이면 곤란한 상황에 놓이게 돼요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서는
        사업주가 근로자의 퇴직일로부터 <strong>10일 이내</strong>에 이직확인서를 발급하도록 의무화하고 있죠.
        이걸 어기면 법적 제재를 받게 돼요. 사업주 의무라는 점, 기억해두세요.
      </p>

      <GreenBox title="이직확인서 핵심 정리">
        사업주가 퇴직 후 10일 이내 발급 의무 (고용보험법 제42조)<br />
        미발급 시 최대 30만원 과태료<br />
        근로자가 직접 작성 불가 → 사업주 또는 고용센터 직권
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="고용센터 신고 준비가 됐어요. 바로 진행하세요."
        partialMatchText="빠진 항목을 먼저 준비하면 신고 절차가 수월해져요."
      />

      <Divider />

      {/* 섹션 2 — 회사가 거부하는 유형과 대처법 */}
      <H2>거부 유형별 신고 방법이 다른가요?</H2>
      <p style={body}>
        가장 흔한 경우가 <strong>사장이 연락을 안 받는 경우</strong>예요. 퇴사 후 관계가 틀어져서 전화를 무시하는 거죠.
        이때는 혼자 계속 연락하는 것보다 고용센터에 신고하는 게 훨씬 빨라요. "고용센터에서 연락 왔다"면 대부분 바로 처리하죠.
      </p>
      <p style={body}>
        두 번째는 <strong>회사가 폐업한 경우</strong>예요. 사업주 자체가 없으니 이직확인서를 받을 방법이 없죠.
        이 경우에는 고용센터에서 <strong>직권으로 처리</strong>해요. 폐업 사실 확인 후 4대보험 가입내역 등을 바탕으로 이직확인서를 대체하죠.
      </p>
      <p style={body}>
        세 번째는 <strong>일부러 거부하는 경우</strong>예요. 실업급여를 받으면 회사에 불이익이 있다고 오해하거나, 감정적인 이유로 안 해주는 사업주가 있죠.
        이건 명백한 법 위반이에요. 고용센터 신고 후 과태료가 부과되면 결국 해줄 수밖에 없어요.
      </p>

      <BorderBox title="거부 유형별 핵심 대처">
        연락 두절 → 고용센터 신고 (가장 효과적)<br />
        회사 폐업 → 고용센터 직권 처리<br />
        고의 거부 → 과태료 부과 후 발급<br />
        방법 몰라서 → 고용센터가 사업주에게 절차 안내
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 고용센터 신고 절차 */}
      <H2>거부 신고 접수부터 과태료 부과까지 절차</H2>
      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>(ei.go.kr)에 접속하면
        <strong> "이직확인서 미발급 신고"</strong> 메뉴가 있죠. 회사명, 퇴직일, 연락처 등을 입력하면 돼요.
        온라인 신고가 어려우면 관할 고용센터에 직접 방문하거나 전화(1350)로도 신고할 수 있죠.
      </p>
      <p style={body}>
        신고가 접수되면 고용센터 담당자가 <strong>사업주에게 직접 연락</strong>해요.
        "고용센터에서 공식적으로 발급을 요청한다"는 연락을 받으면 대부분의 사업주가 응하죠.
        혼자 수십 번 전화해도 안 되던 게 고용센터 한 통이면 해결되는 경우가 많아요.
      </p>
      <p style={body}>
        그래도 사업주가 버티면 <strong>최대 30만원의 과태료</strong>가 부과돼요.
        과태료까지 부과됐는데도 발급하지 않으면, 고용센터에서 <strong>직권으로 이직확인서를 작성</strong>해요.
        본인이 제출한 증빙자료(급여명세서, 4대보험 내역 등)를 바탕으로 처리하죠.
      </p>

      <GreenBox title="신고 후 처리 흐름">
        1단계: 고용24 또는 고용센터에 미발급 신고<br />
        2단계: 고용센터가 사업주에게 발급 요청<br />
        3단계: 사업주 미이행 시 과태료 부과 (최대 30만원)<br />
        4단계: 끝까지 거부 시 고용센터 직권 발급
      </GreenBox>

      <SectionBadge>미리 준비해두세요</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 퇴사 사유가 잘못 기재된 경우 */}
      <H2>신고 후 퇴사 사유가 다르게 기재된 경우</H2>
      <p style={body}>
        이직확인서를 받았는데 <strong>퇴사 사유가 사실과 다른 경우</strong>도 있죠.
        권고사직인데 자발적 퇴사로 적거나, 해고인데 사직으로 기재하는 식이에요.
        이렇게 되면 실업급여 수급자격 심사에서 불이익을 받을 수 있죠.
      </p>
      <p style={body}>
        이때는 고용센터에 <strong>이의를 제기</strong>하면 돼요. 담당자가 퇴직 경위를 다시 조사하죠.
        녹음 파일, 문자 메시지, 이메일, 퇴직금 정산서 등 <strong>증거가 있으면</strong> 퇴사 사유를 정정할 수 있어요.
        말로만 주장하면 인정받기 어려우니 반드시 증빙을 준비해두세요.
      </p>
      <p style={body}>
        회사가 허위로 기재한 사실이 확인되면 사업주에게도 시정 명령이 내려져요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 고용보험법</a>에 따라
        허위 기재 역시 제재 대상이죠. 근로자가 손해를 감수할 이유가 전혀 없어요.
      </p>

      <Divider />

      {/* 섹션 5 — 이직확인서 없이 먼저 신청하기 */}
      <H2>거부 상태에서도 실업급여 신청부터 넣으세요</H2>
      <p style={body}>
        이직확인서가 아직 안 나왔다고 마냥 기다리면 안 돼요. <strong>수급자격 신청은 이직확인서 없이도 가능</strong>하죠.
        고용센터에 방문해서 "이직확인서 미발급 상태"라고 말하면, 신청 접수를 먼저 해줘요.
        나중에 이직확인서가 발급되면 합쳐서 심사를 진행하는 방식이에요.
      </p>
      <p style={body}>
        여기서 가장 중요한 건 <strong>퇴직 후 12개월</strong>이라는 신청 기한이에요.
        이직확인서 문제로 시간을 끌다가 이 기한을 넘기면 실업급여 자격 자체가 사라지죠.
        이직확인서가 늦어지고 있다면, 기다리지 말고 먼저 고용센터에 가서 상황을 알리는 게 최선이에요.
      </p>
      <p style={body}>
        신청할 때 가져갈 서류는 신분증, 퇴직 관련 증빙(급여명세서, 4대보험 가입확인서 등)이면 충분해요.
        온라인으로 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서도 접수할 수 있으니 편한 방법을 선택하세요.
        이직확인서가 없다는 이유로 실업급여를 포기하면 안 돼요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        이직확인서 발급 거부와 관련해서 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사안의 처리 결과는 고용센터 판단에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
