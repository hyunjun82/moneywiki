"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "background", label: "사직서 제출 배경(회사 압박, 근로조건 변경 등)을 증명할 수 있다" },
  { id: "evidence", label: "회사 압박·강요 증거(녹음, 문자, 급여명세서 등)를 보유하고 있다" },
  { id: "insured180", label: "고용보험 피보험기간이 180일 이상이다" },
  { id: "reemploy", label: "재취업 의사가 있고 구직활동이 가능하다" },
];

const CHECKLIST = [
  "사직서에 퇴사 사유를 구체적으로 기재 (권고사직, 임금체불 등)",
  "퇴직 전 증빙자료 확보 (급여명세서, 통장 내역, 녹취록, 문자)",
  "고용24에서 이직확인서 이직 사유 코드 확인",
  "사유 코드가 사실과 다르면 고용센터에 정정 요청",
  "퇴직 후 12개월 이내에 실업급여 신청",
];

const FAQS = [
  {
    q: "회사에서 자진퇴사로 처리하겠다고 하면 어떡하죠?",
    a: "권고사직인데 자진퇴사로 처리하겠다고 하면 거부하세요. 고용센터에 이직 사유 정정 신청을 할 수 있고, 권고사직 통보서나 녹취록 같은 증빙자료를 제출하면 조사 후 정정돼요.",
  },
  {
    q: "사직서를 이미 '일신상의 사유'로 썼는데 괜찮나요?",
    a: "사직서 문구만으로 판단하진 않아요. 실제 퇴사 원인이 권고사직이나 근로조건 위반이었다면, 증빙자료를 통해 비자발적 퇴사로 인정받을 수 있죠. 다만 처음부터 구체적으로 쓰는 게 훨씬 유리해요.",
  },
  {
    q: "임금 체불로 퇴사하면 실업급여를 받을 수 있나요?",
    a: "받을 수 있죠. 임금체불은 대표적인 정당한 이직 사유예요. 급여의 30% 이상을 안 줬거나 2개월 이상 밀렸으면 해당되고, 급여명세서와 통장 내역을 증빙으로 제출하면 돼요.",
  },
  {
    q: "계약직 만료인데 사직서를 쓰라고 해요",
    a: "계약 만료는 비자발적 퇴사예요. 본인이 연장을 원했는데 회사가 거부한 경우도 마찬가지죠. 사직서를 쓰더라도 이직확인서에 '계약만료(코드 22)'로 기재되면 실업급여 대상이에요.",
  },
  {
    q: "이직확인서가 잘못 신고됐으면 어떻게 하나요?",
    a: "고용센터에서 정정 신청을 할 수 있죠. 증빙자료를 제출하면 고용센터가 회사에 사실 확인을 하고, 잘못된 부분을 정정해줘요. 회사가 이직확인서를 아예 안 냈으면 고용센터가 제출을 요구하고, 불이행 시 과태료도 부과돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 수급자격 제한 및 정당한 이직 사유", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙 — 이직확인서 서식 및 이직 사유 코드", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 및 이직확인서 조회", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 실업급여 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "자발적-퇴사-실업급여",
    title: "자발적 퇴사해도 실업급여 받는 방법",
    description: "정당한 사유 7가지와 증빙자료 준비법을 정리했어요.",
  },
  {
    slug: "사업주-퇴직권유-실업급여",
    title: "사업주 퇴직 권유 시 실업급여",
    description: "사업주가 먼저 퇴사를 권유한 경우 실업급여 대상이에요.",
  },
  {
    slug: "실업급여-정당한-퇴사-사유",
    title: "실업급여 인정되는 정당한 퇴사 사유",
    description: "비자발적 퇴사로 인정받을 수 있는 사유를 전부 정리했어요.",
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
          currentSlug="사직서-제출해도-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 이직확인서 · 사직서</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        사직서 냈어도 실업급여 받을까?<br />
        조건 체크리스트
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;사직서 냈으니까 끝난 거 아닌가요?&quot;<br />
        아니에요. 사직서 양식은 형식일 뿐이죠.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은
        사직서를 썼더라도 실제 퇴사 배경이 비자발적이거나 정당한 이직 사유에 해당하면
        실업급여를 지급하도록 규정하고 있죠. 사직서 여부가 아니라 <strong>왜 퇴사할 수밖에 없었느냐</strong>가 판단 기준이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 사직서 내도 받을 수 있는 경우 + EligibilityChecker */}
      <H2>체크리스트 첫 번째, 어떤 조건이면 받을 수 있나요?</H2>
      <p style={body}>
        가장 많은 사례가 <strong><a href="/w/권고사직-실업급여-신청-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>권고사직</a></strong>이에요. 회사가 먼저 &quot;퇴사해주세요&quot;라고 말한 뒤 사직서 양식을 요구하는 경우죠. 구조조정, 희망퇴직, 명예퇴직, 실적 부진에 따른 퇴사 권유 — 전부 비자발적 퇴사에 해당해요. 사직서를 썼다는 형식은 결과에 영향을 주지 않죠.
      </p>
      <p style={body}>
        <strong>계약 만료</strong>도 조건에 부합해요. 계약직, 파견직, 촉탁직 등 계약 기간이 끝났는데 회사가 연장을 거부하면 비자발적 퇴사로 봐요. 본인이 연장을 원했는지 여부가 핵심이고, 회사 쪽에서 먼저 거부 의사를 밝혔다면 실업급여 대상이죠.
      </p>
      <p style={body}>
        <strong><a href="/w/근로조건-변경-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로조건이 악화</a></strong>돼서 퇴사한 경우에도 받을 수 있죠. <a href="/w/임금체불-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금을 30% 이상 안 줬거나 2개월 이상 밀린 경우</a>, 최저임금 미달, 주 52시간 초과 강요 등이 대표적이에요. 회사 잘못으로 정상적인 근무가 불가능했다면 정당한 이직 사유로 인정받을 수 있고요.
      </p>

      <GreenBox title="사직서 내도 실업급여 받을 수 있는 대표 사례">
        권고사직 (구조조정, 희망퇴직, 퇴사 권유)<br />
        계약 만료 (회사가 연장 거부)<br />
        임금체불 (30% 이상 또는 2개월 이상 밀림)<br />
        직장 내 괴롭힘·성희롱 피해<br />
        출퇴근 왕복 3시간 이상 (사업장 이전 등)<br />
        본인 건강 문제 또는 가족 간병 필요<br />
        배우자 전근으로 인한 불가피한 퇴사
      </GreenBox>

      <SectionBadge>내 상황 체크해 보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 수급 가능성이 높아요. 증빙자료를 챙겨서 고용센터에 신청하세요."
        partialMatchText="충족되지 않은 항목이 있어요. 고용센터(1350)에 상담받아 보세요."
      />

      <Divider />

      {/* 섹션 2 — 못 받는 경우 */}
      <H2>이 조건에 해당하면 실업급여를 못 받나요?</H2>
      <p style={body}>
        &quot;상사랑 안 맞아서&quot;, &quot;회사 분위기가 별로라서&quot; — 이런 이유로 퇴사하면 실업급여 대상이 아니에요. <strong>단순히 회사가 싫다는 건</strong> 정당한 이직 사유에 해당하지 않죠. 다만 직장 내 괴롭힘 수준까지 간 거라면 성격이 완전히 달라지니 구분을 잘 해야 해요.
      </p>
      <p style={body}>
        <strong>더 좋은 조건의 직장으로 이직하려고</strong> 나온 경우도 마찬가지예요. 연봉 인상을 위한 이직, 이미 다른 회사에 합격한 상태에서의 퇴사 — 전부 자발적 퇴사로 처리되죠. 새 직장이 있으니 실업 상태가 아니라는 논리예요.
      </p>
      <p style={body}>
        <strong>본인의 중대한 귀책사유</strong>로 해고된 경우에도 수급이 제한돼요. 횡령, 무단결근, 업무상 비위행위 같은 사유가 해당하죠. &quot;해고당할 것 같아서 사직서를 먼저 냈다&quot;고 해도, 근본 원인이 본인 잘못이면 동일한 기준이 적용돼요.
      </p>

      <BorderBox title="한눈에 비교">
        권고사직 + 사직서 → <strong>실업급여 가능</strong><br />
        임금체불 + 사직서 → <strong>실업급여 가능</strong><br />
        단순 이직 목적 + 사직서 → <strong>불가</strong><br />
        회사 싫어서 + 사직서 → <strong>불가</strong><br />
        본인 귀책 해고 + 사직서 → <strong>불가</strong>
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 이직확인서 사유 코드 */}
      <H2>이직확인서 사유 코드가 조건 충족 여부를 결정해요</H2>
      <p style={body}>
        사직서보다 더 중요한 서류가 바로 <strong>이직확인서</strong>예요. 회사가 고용보험에 신고하는 서류인데, 여기에 적힌 이직 사유 코드 한 줄이 실업급여 수급 여부를 좌우하죠. 같은 퇴사라도 코드가 다르면 결과가 완전히 달라져요.
      </p>
      <p style={body}>
        <strong>코드 11(폐업·도산)</strong>, <strong>코드 12(경영상 권고사직)</strong>, <strong>코드 22(계약만료)</strong>, <strong>코드 23(근로조건 변동)</strong>, <strong>코드 26(본인 귀책 없는 사유)</strong> — 이 코드들은 실업급여 수급이 가능해요. 반면 <strong>코드 31(단순 자진퇴사)</strong>이면 실업급여를 받을 수 없죠.
      </p>
      <p style={body}>
        여기서 핵심은 <strong>코드 32(자진퇴사-정당 사유)</strong>예요. 사직서를 냈더라도 임금체불이나 근로조건 위반 같은 정당한 배경이 있으면 이 코드가 적용되죠. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 본인 이직확인서를 조회할 수 있으니, 퇴직 후 가장 먼저 코드를 조회해보세요. 사실과 다르게 기재돼 있다면 고용센터에 즉시 정정 요청이 가능하고요.
      </p>

      <SectionBadge>사직서 제출 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 사직서 작성 시 주의사항 */}
      <H2>사직서 작성 체크리스트 4가지</H2>
      <p style={body}>
        첫째, <strong>퇴사 사유를 구체적으로 쓰세요</strong>. &quot;개인 사정&quot;이나 &quot;일신상의 사유&quot;라고 적으면 자발적 퇴사로 처리될 위험이 커져요. 권고사직이라면 &quot;회사의 권고사직에 동의하여 퇴사합니다&quot;, 임금체불이 원인이라면 &quot;임금 체불로 인해 부득이 퇴사합니다&quot;라고 명확하게 적는 게 유리하죠.
      </p>
      <p style={body}>
        둘째, <strong>사본을 반드시 보관</strong>하세요. 사진을 찍어두거나 복사본을 남기면 돼요. 회사가 나중에 사직서 내용을 다르게 주장하더라도 원본 사본이 증거가 되죠. 셋째, 사직서를 내기 전에 <strong>급여명세서, 통장 내역, 근로계약서</strong>를 미리 챙겨두세요. 퇴사 후에는 회사 시스템에 접근하기 어려우니까요.
      </p>
      <p style={body}>
        넷째, 사직서 제출 타이밍도 신경 써야 해요. 퇴직 권유 증거(녹음, 문자 등)를 <strong>먼저 확보한 뒤에</strong> 사직서를 내는 순서가 맞아요. 사직서를 먼저 내버리면 회사 쪽에서 &quot;자기가 알아서 나간 거다&quot;라고 주장할 여지를 주게 되죠. 증거 확보가 끝난 다음에 움직이세요.
      </p>

      <BorderBox title="사직서 사유별 인정 가능성">
        &quot;회사의 권고에 따라 퇴사&quot; → <strong>권고사직 인정 가능성 높음</strong><br />
        &quot;구조조정에 따른 퇴사&quot; → <strong>권고사직 인정 가능성 높음</strong><br />
        &quot;개인 사정&quot; / &quot;일신상의 사유&quot; → <strong>자진퇴사로 처리될 위험</strong><br />
        사유 미기재 → <strong>증거로 보완 가능</strong>
      </BorderBox>

      <Divider />

      {/* 섹션 5 — 회사가 잘못 처리했을 때 대처법 */}
      <H2>자진퇴사 처리됐다면 바로 정정 신청하세요</H2>
      <p style={body}>
        회사가 &quot;자진퇴사로 처리하겠다&quot;고 통보하면 일단 거부 의사를 밝히세요. 회사 입장에서는 권고사직으로 처리하면 고용보험료 할증이 붙을 수 있어서 자진퇴사로 돌리려는 경우가 많아요. 하지만 사실과 다른 신고는 근로자 권리를 침해하는 행위죠.
      </p>
      <p style={body}>
        이미 자진퇴사로 처리됐다면 <strong>고용센터에 이직 사유 정정 신청</strong>을 하세요. 녹취록, 문자, 이메일 등 증빙자료를 제출하면 고용센터가 회사에 사실 확인 조사를 진행해요. 이직확인서를 아예 내지 않는 회사라면 고용센터가 제출을 요구하고, 불이행 시 과태료(최대 300만원)까지 부과할 수 있죠.
      </p>
      <p style={body}>
        정정 결과에 불복하면 <strong>60일 이내 <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>이의신청</a></strong>으로 재심사를 받을 수 있죠. 추가 증거를 첨부하면 뒤집히는 경우도 있고요. 이의신청마저 안 되면 심사청구와 재심사청구 절차가 남아 있으니 끝까지 포기하지 마세요. 퇴직 전에 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 상담(1350)을 미리 받아두면 훨씬 수월하게 대응할 수 있죠.
      </p>

      <GreenBox title="핵심 정리">
        사직서를 냈다고 실업급여를 못 받는 게 아니에요.<br />
        이직확인서의 이직 사유 코드가 수급 여부를 결정하죠.<br />
        사유가 사실과 다르면 고용센터에서 정정이 가능해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        사직서를 냈을 때 실업급여 조건에 대해 실제로 많이 묻는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사유의 인정 여부는 고용센터 심사에 따라 달라지니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
