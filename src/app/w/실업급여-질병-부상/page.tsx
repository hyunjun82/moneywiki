"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "현재 실업급여(구직급여)를 수급 중이에요" },
  { id: "c2", label: "7일 이상 취업이 어려운 질병이나 부상이에요" },
  { id: "c3", label: "병원에서 발급한 의사 진단서를 갖고 있어요" },
  { id: "c4", label: "고용센터에 질병·부상 사실을 신고했어요 (또는 할 예정)" },
];

const CHECKLIST = [
  "7일 이상 취업이 어려운 질병·부상인지 확인",
  "병원에서 진단서 발급 (취업 곤란 기간 명시 필수)",
  "고용센터에 상병급여 신청서 + 진단서 제출",
  "온라인 신청은 고용24(ei.go.kr)에서 가능",
  "회복 후 고용센터에 알리고 실업급여로 복귀",
];

const FAQS = [
  {
    q: "감기로 3일 누웠는데 상병급여 받을 수 있나요?",
    a: "받을 수 없어요. 상병급여는 7일 이상 취업이 어려운 경우에만 해당되죠. 3일 정도면 실업인정일 변경으로 처리하는 게 맞아요.",
  },
  {
    q: "상병급여 받는 동안 수급기간이 줄어드나요?",
    a: "줄어들죠. 상병급여 기간도 수급기간에 포함돼요. 수급기간 210일 중 상병급여 30일을 받으면 남은 실업급여는 180일이에요.",
  },
  {
    q: "진단서 없이 상병급여 신청할 수 있나요?",
    a: "불가능해요. 의사 진단서가 필수이고, 진단서에 '취업이 어려운 기간'이 명시되어야 해요. 진단서 없이는 고용센터에서 접수 자체가 안 돼요.",
  },
  {
    q: "상병급여 금액이 실업급여보다 적나요?",
    a: "똑같아요. 상병급여는 1일 구직급여와 동일한 금액이에요. 급여 수준에서 손해 보는 건 전혀 없죠.",
  },
  {
    q: "치료가 길어져서 수급기간을 넘기면 어떻게 되나요?",
    a: "수급기간이 연장될 수 있어요. 질병이 수급기간을 초과하면 그 초과분만큼 늘어나죠. 최대 4년까지 연장이 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제63조 — 상병급여 지급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제50조 — 수급기간 연장 규정", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 상병급여 안내 및 온라인 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 실업급여 관련 상담", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-상병급여",
    title: "상병급여 조건과 신청 방법",
    description: "상병급여의 자격 요건, 금액, 기간을 한 번에 정리했어요.",
  },
  {
    slug: "상병급여-신청-조건-및-수급-방법",
    title: "상병급여 신청 조건 및 수급 방법",
    description: "상병급여 신청 절차와 수급 요건을 단계별로 정리했어요.",
  },
  {
    slug: "실업급여-중단",
    title: "실업급여 중단 사유와 대처법",
    description: "실업급여가 중단되는 이유와 복구 방법을 확인하세요.",
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
          currentSlug="실업급여-질병-부상"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 상병급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받다가 다쳤다면?<br />
        상병급여 전환 조건과 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;실업급여 받는 중인데 교통사고가 났어요. 실업인정일에 못 나가면 끊기나요?&quot;
      </p>
      <p style={body}>
        끊기지 않아요. <strong>상병급여</strong>로 전환하면 돼요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제63조</a>가 이 상황을 딱 대비해뒀거든요.
        질병이나 부상으로 취업이 어려운 기간에는 구직급여 대신 상병급여를 지급하도록 정해놨어요.
      </p>
      <p style={body}>
        금액은 실업급여와 완전히 같고, 구직활동 의무도 빠져요.
        아파서 못 움직이는데 구직활동까지 해야 하면 말이 안 되잖아요.
        어떤 조건에서 전환이 되는지, 신청은 어떻게 하는지 순서대로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 상병급여란 + 자격 체크 */}
      <H2>상병급여 전환 조건은 무엇인가요?</H2>
      <p style={body}>
        상병급여는 실업급여의 &quot;병가 버전&quot;이라고 보면 돼요. 실업급여를 받는 사람이 질병이나 부상 때문에 일자리를 구할 수 없을 때, 구직급여 대신 나오는 돈이에요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제63조</a>에서 이 제도를 보장하고 있죠.
      </p>
      <p style={body}>
        가장 많이 궁금해하는 부분이 &quot;금액이 줄어드나요?&quot;인데, <strong>1원도 줄지 않아요</strong>. 1일 구직급여와 동일한 금액을 받게 돼요. 상병급여 기간에는 구직활동 의무가 면제되고, 실업인정 출석도 빠질 수 있고요.
      </p>
      <p style={body}>
        다만 아프기만 하면 무조건 전환이 되는 건 아니에요. <strong>7일 이상</strong> 취업이 어려운 상태여야 하고, <strong>의사 진단서</strong>가 반드시 필요하죠. 감기로 이틀 쉰 건 해당이 안 돼요. 입원, 수술, 골절처럼 최소 1주일 이상 일을 못 하는 상황이어야 해요.
      </p>
      <p style={body}>
        조건을 다 갖추면 고용센터에 상병급여 신청서와 진단서를 제출하면 끝이에요. 복잡한 절차가 아니니까 겁먹지 말고 아래 체크부터 해보세요.
      </p>

      <GreenBox title="상병급여 핵심 요약">
        대상: 실업급여 수급 중 질병이나 부상으로 취업이 어려운 사람<br />
        기간 기준: 7일 이상 취업 곤란<br />
        금액: 구직급여와 1원 차이 없이 동일<br />
        구직활동: 전액 면제<br />
        필수 서류: 의사 진단서 (취업 곤란 기간 명시)
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 상병급여로 전환할 수 있어요. 고용센터(1350)에 바로 연락하세요."
        partialMatchText="일부 조건이 빠져 있어요. 충족되지 않은 항목을 먼저 준비하세요."
      />

      <Divider />

      {/* 섹션 2 — 7일 기준과 신청 조건 */}
      <H2>전환 조건 중 7일 기준은 어떻게 적용되나요?</H2>
      <p style={body}>
        상병급여를 가르는 핵심 숫자가 <strong>7일</strong>이에요. 질병이나 부상으로 7일 이상 취업이 어려운 상태여야 신청 자격이 생기죠. 3~4일 아프고 나은 건 해당이 안 돼요.
      </p>
      <p style={body}>
        그러면 7일 미만으로 아플 땐 어떻게 할까요? 이땐 <strong>실업인정일 변경</strong>으로 처리하면 돼요. 고용센터에 미리 전화해서 &quot;아파서 출석이 어렵다&quot;고 말하면, 실업인정일을 뒤로 옮겨줘요. 상병급여와는 별개의 절차이고, 간단한 전화 한 통으로 해결되죠.
      </p>
      <p style={body}>
        진단서도 아무거나 내면 안 돼요. 반드시 <strong>&quot;취업이 어려운 기간&quot;이 명시</strong>되어 있어야 하죠. &quot;향후 2주간 안정 가료를 요함&quot;처럼 구체적인 기간이 적혀야 해요. &quot;감기입니다&quot;만 적힌 진단서로는 접수 자체가 안 돼요.
      </p>
      <p style={body}>
        병원에 갈 때 &quot;상병급여 신청용 진단서가 필요하다&quot;고 미리 말하세요. 의사가 어떤 내용을 써야 하는지 알고 있으니까 한 번에 제대로 나올 거예요. 발급비는 보통 무료~5천원 수준이에요.
      </p>

      <BorderBox title="7일 기준, 한눈에 정리">
        7일 이상 취업 곤란 → <strong>상병급여 신청</strong> (진단서 필수)<br />
        7일 미만 → <strong>실업인정일 변경</strong>으로 처리 (전화 한 통)<br />
        진단서 조건 → &quot;취업 곤란 기간&quot;이 반드시 명시되어야 함
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 신청 방법 + 체크리스트 */}
      <H2>상병급여 신청 절차와 제출 서류</H2>
      <p style={body}>
        절차가 복잡할 거라고 생각하실 수 있는데, 세 단계면 끝나요. 병원에서 진단서 발급 → 고용센터에 신청서 + 진단서 제출 → 승인 후 지급. 앞에서 말씀드린 대로 진단서에 취업 곤란 기간이 명시되어 있어야 접수가 돼요.
      </p>
      <p style={body}>
        직접 방문이 어려운 상황이라면 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24(ei.go.kr)</a>에서 온라인 신청이 가능해요. 진단서를 스캔하거나 사진 찍어서 첨부하면 되죠. 입원 중이라 바깥에 나갈 수 없을 때 특히 유용한 방법이에요.
      </p>
      <p style={body}>
        한 가지 빠뜨리면 안 되는 게, 갑자기 아파서 실업인정일에 못 가는 상황이라면 <strong>고용센터에 먼저 연락</strong>부터 해야 해요. 아무 말 없이 불참하면 그 기간 실업급여를 못 받을 수 있으니까요. 전화(1350) 한 통이면 상병급여 전환이든 실업인정일 변경이든 방향을 잡아줘요.
      </p>

      <SectionBadge>상병급여 신청 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 수급기간과 연장 */}
      <H2>전환 후 수급기간 포함과 연장 규정</H2>
      <p style={body}>
        많은 분이 오해하는 부분인데, 상병급여를 받는 기간은 <strong>수급기간에 포함</strong>돼요. 수급기간이 210일인데 상병급여를 30일 받았다면, 남은 실업급여 일수는 180일로 줄어드는 거죠. 상병급여를 받았다고 수급기간이 별도로 늘어나는 건 아니에요.
      </p>
      <p style={body}>
        그런데 질병이 오래 가면 사정이 달라져요. 상병급여 기간이 수급기간을 넘어버리면, 그 <strong>초과한 기간만큼 수급기간이 연장</strong>돼요. 예를 들어 수급기간 210일짜리인데 질병으로 300일 동안 일을 못 했다면, 90일이 추가로 붙는 구조예요.
      </p>
      <p style={body}>
        연장의 최대 한도는 <strong>4년</strong>이에요. <a href="/w/실업급여-수급기간-몇개월-받나요" style={{ color: "#1D9E75", textDecoration: "underline" }}>수급기간 기본 산정법</a>도 같이 참고하면 좋아요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제50조</a>에 이 규정이 명시되어 있죠. 장기 입원이나 중증 질환을 치료하고 있더라도 수급기간이 끊길 걱정은 안 해도 돼요.
      </p>
      <p style={body}>
        정리하면 이래요. 단기 질병이면 수급기간 안에서 차감되고, 장기 질병이면 초과분만큼 연장돼요. 어느 쪽이든 아파서 급여가 아예 끊기는 일은 없다는 뜻이에요.
      </p>

      <GreenBox title="수급기간 연장, 이렇게 계산돼요">
        수급기간 210일 + 상병 300일 → 초과 90일 → 수급기간 90일 연장<br />
        연장 최대 한도: 4년<br />
        근거: 고용보험법 제50조
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 회복 후 복귀 + 부정수급 경고 */}
      <H2>회복 후 신청 절차에 맞춰 바로 복귀하세요</H2>
      <p style={body}>
        치료가 끝나서 일할 수 있는 상태가 되면, 고용센터에 바로 알려야 해요. 그러면 상병급여가 종료되고 다시 실업급여(구직급여)로 전환돼요. 이때부터 구직활동과 실업인정을 재개하면 되죠.
      </p>
      <p style={body}>
        &quot;좀 더 쉬고 복귀해야지&quot; 하면서 회복 시점을 늦게 알리면 큰 문제가 돼요. 이미 일할 수 있는데 상병급여를 계속 받으면 <strong><a href="/w/실업급여-부정수급" style={{ color: "#1D9E75", textDecoration: "underline" }}>부정수급</a></strong>이에요. 적발되면 받은 금액의 최대 5배를 반환해야 할 수 있죠. 완치 사실은 즉시 신고하는 게 안전해요.
      </p>
      <p style={body}>
        남은 수급기간이 없으면 실업급여로 복귀할 수 없다는 점도 알아두세요. 상병급여 기간이 수급기간에 포함되니까, 오래 아팠다면 남은 일수를 먼저 확인하고 구직 계획을 세우는 게 좋아요.
      </p>
      <p style={body}>
        전체 흐름을 정리하면 이래요. 아프면 상병급여로 전환하고, 나으면 바로 신고해서 실업급여로 복귀해요. 금액은 같고, 구직활동 의무는 면제되고, 장기 질병이면 수급기간 연장까지 가능하죠. 지금 아파서 고민 중이라면 고용센터(1350)에 전화 한 통부터 하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 수급 중 질병·부상에 대해 자주 나오는 질문만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 상병급여 인정 여부는 고용센터 심사에 따라 달라질 수 있으니, 구체적인 상황은 고용센터(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
