"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "심사청구 기각 결정 통지서를 받았어요" },
  { id: "c2", label: "기각 결정을 받은 날로부터 90일이 지나지 않았어요" },
  { id: "c3", label: "기각 사유를 분석하고 반박 논리를 준비했어요" },
  { id: "c4", label: "1차에서 부족했던 추가 증빙자료를 확보했어요" },
];

const CHECKLIST = [
  "심사청구 기각 결정서 사본: 재심사청구서에 반드시 첨부",
  "결정 통지서 받은 날짜 확인: 이 날부터 90일이 기한",
  "기각 사유별 반박 논리 정리: 구체적으로 어떤 점이 잘못됐는지 기재",
  "추가 증빙자료 목록 작성: 새로 확보한 서류(진단서, 급여내역, 녹음 등)",
  "행정소송 대비 법률구조공단(132) 무료 상담 활용",
];

const FAQS = [
  {
    q: "심사청구 안 하고 바로 재심사청구를 넣을 수 있나요?",
    a: "안 돼요. 심사청구가 1차, 재심사청구가 2차예요. 순서대로 밟아야 하죠. 심사청구 결정이 나온 뒤에야 재심사청구를 할 수 있어요.",
  },
  {
    q: "90일 기한을 하루라도 넘기면 어떻게 되나요?",
    a: "접수 자체가 거부돼요. 결정 통지서를 받은 날부터 딱 90일이니까, 자료가 부족해도 기한 안에 일단 접수부터 해두세요. 증빙자료는 이후에 보충할 수 있어요.",
  },
  {
    q: "재심사청구도 기각되면 정말 끝인가요?",
    a: "아니에요. 행정소송이 남아 있죠. 재심사청구 결정을 통지받은 날부터 90일 이내에 행정법원에 소송을 제기할 수 있어요. 법률구조공단(132)에서 무료 법률 상담도 가능하고요.",
  },
  {
    q: "심사청구나 재심사청구에 비용이 드나요?",
    a: "둘 다 무료예요. 별도 수수료도 없죠. 행정소송 단계부터는 법원 비용과 변호사 비용이 들 수 있는데, 소득 기준을 충족하면 법률구조공단에서 비용 지원을 받을 수 있어요.",
  },
  {
    q: "재심사청구 결정이 나올 때까지 얼마나 걸리나요?",
    a: "고용보험법상 60일 이내에 결정이 나와요. 사안이 복잡하면 연장될 수 있지만, 대부분 2개월 안에 결과를 통지받게 되죠. 서면 심리가 원칙이고, 필요하면 구술 심리를 요청할 수도 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 심사청구·재심사청구 규정 (제87조~제105조)", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 심사·재심사청구 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 고용보험심사위원회", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-이의신청",
    title: "실업급여 이의신청 방법",
    description: "수급자격 불인정 통보를 받았을 때 가장 먼저 할 수 있는 불복 절차예요.",
  },
  {
    slug: "부당해고-구제신청-실업급여",
    title: "부당해고 구제신청과 실업급여",
    description: "부당해고를 당했다면 구제신청과 실업급여를 동시에 진행할 수 있어요.",
  },
  {
    slug: "자발적-퇴사-실업급여",
    title: "자발적 퇴사해도 실업급여 받는 법",
    description: "정당한 사유가 있으면 자발적 퇴사여도 실업급여를 받을 수 있어요.",
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
          currentSlug="실업급여-재심사청구"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 불복절차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 기각됐다면?<br />
        재심사청구 절차와 90일 기한
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;심사청구가 기각됐다고요?&quot;
      </p>
      <p style={body}>
        여기서 포기하면 손해예요. <strong>재심사청구</strong>라는 2차 불복 절차가 남아 있으니까요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제87조~제105조</a>가
        심사청구 결정에 불복할 수 있는 길을 열어놨어요.
        기각 결정을 통지받은 날부터 <strong>90일 이내</strong>에 고용보험심사위원회에 접수하면 돼요.
      </p>
      <p style={body}>
        비용도 무료이고, 새 증거를 추가할 수도 있죠.
        1차에서 부족했던 부분을 보완해서 뒤집은 사례가 실제로 있죠.
        절차와 준비 방법을 순서대로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 불복 3단계 전체 흐름 + GreenBox + EligibilityChecker */}
      <H2>재심사청구까지 포함한 절차가 몇 단계인가요?</H2>
      <p style={body}>
        고용센터의 실업급여 결정에 이의가 있으면 최대 3단계까지 다툴 수 있죠.
        1차 <strong>심사청구</strong>, 2차 <strong>재심사청구</strong>, 마지막 <strong>행정소송</strong>이죠.
        각 단계마다 결정 통지를 받은 날부터 90일 이내에 접수해야 해요. 기한을 넘기면 그 단계의 불복 권리가 완전히 없어져요.
      </p>
      <p style={body}>
        순서를 건너뛸 수는 없어요.
        심사청구를 안 하고 곧바로 재심사청구를 넣으면 접수 자체가 거부되죠.
        반대로 심사청구에서 인용(원 결정 취소)되면 재심사까지 갈 필요가 없고요.
        단계별로 심사 기관이 다르니까, 각 기관의 역할을 미리 파악해두면 준비가 수월해져요.
      </p>
      <p style={body}>
        심사청구는 해당 지방고용노동관서에서, 재심사청구는 고용노동부 산하 <strong>고용보험심사위원회</strong>에서 심리해요.
        행정소송은 행정법원이 맡죠.
        심사청구와 재심사청구는 무료인데, 행정소송부터는 법원 비용이 들어요. 가능하면 2차까지 승부를 보는 게 경제적이에요.
      </p>

      <GreenBox>
        1단계 심사청구 → 지방고용노동관서 (결정 후 90일 이내 / 무료)<br />
        2단계 재심사청구 → 고용보험심사위원회 (결정 후 90일 이내 / 무료)<br />
        3단계 행정소송 → 행정법원 (결정 후 90일 이내 / 비용 발생)
      </GreenBox>

      <SectionBadge>재심사청구를 할 수 있는 상황인지 체크해 보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 조건을 모두 갖추셨네요. 재심사청구를 진행할 준비가 돼 있어요. 기한 내에 고용보험심사위원회에 접수하세요."
        partialMatchText="아직 준비가 덜 된 항목이 있어요. 90일 기한이 중요하니까, 준비가 부족해도 일단 접수부터 해두세요."
      />

      <Divider />

      {/* 섹션 2: 심사청구 (1차 불복) + BorderBox */}
      <H2>90일 기한 안에 심사청구를 먼저 해야 하나요?</H2>
      <p style={body}>
        재심사청구를 하려면 먼저 심사청구(1차)를 거쳐야 해요.
        수급자격 불인정, 급여 감액, <a href="/w/실업급여-부정수급" style={{ color: "#1D9E75", textDecoration: "underline" }}>부정수급</a> 판정 같은 결정을 받았을 때 가장 먼저 할 수 있는 게 <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>심사청구</a>죠.
        결정 통지서를 받은 날부터 <strong>90일 이내</strong>에 관할 고용센터에 심사청구서를 내면 돼요.
        온라인(<a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>), 우편, 방문 접수 전부 가능해요.
      </p>
      <p style={body}>
        심사청구서에는 <strong>원래 결정 내용</strong>, <strong>불복 이유</strong>, <strong>원하는 결정</strong>을 구체적으로 써야 해요.
        &quot;수급자격을 인정해달라&quot;처럼 결론을 딱 정해서 적어야 하죠.
        증빙자료도 빠짐없이 첨부하세요. 이직확인서, 급여명세서, 통장 내역, 의사 진단서 등 사유에 맞는 서류가 필요해요.
      </p>
      <p style={body}>
        접수하면 <strong>50일 이내</strong>에 결정이 나오죠.
        사안이 복잡하면 연장될 수 있지만, 결과는 서면으로 통지돼요.
        여기서 인용되면 원 결정이 취소되고 실업급여를 받게 돼요.
        기각되면 그때 재심사청구를 준비하면 되니까, 1차에서 최대한 증빙을 갖춰두는 게 유리해요.
      </p>

      <BorderBox>
        수급자격 불인정 / 급여 지급 거부 / 급여 금액 결정<br />
        부정수급 판정 / 급여 환수 결정 / 수급기간 단축 결정
      </BorderBox>

      {/* ── 관련 글 + 광고 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 재심사청구 (2차 불복) + SectionBadge + Checklist */}
      <H2>재심사청구 절차와 접수 방법</H2>
      <p style={body}>
        심사청구가 기각됐다면 <strong>고용보험심사위원회</strong>에 재심사청구를 넣을 수 있죠.
        기각 결정을 통지받은 날부터 90일 이내가 기한이죠.
        고용센터를 경유해서 제출해도 되고, 위원회에 직접 내도 돼요.
        서식은{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 내려받을 수 있죠.
      </p>
      <p style={body}>
        재심사청구서에는 심사청구 기각 결정서 사본을 반드시 붙여야 해요.
        핵심은 1차에서 왜 기각됐는지 정확히 파악한 뒤, 부족했던 부분을 보완하는 거예요.
        새로운 증빙자료(진단서, 급여내역, 녹음 등)를 확보했다면 이 단계에서 추가 제출하세요.
        기각 사유를 정면으로 반박하는 논리가 없으면 결과가 바뀌기 어렵거든요.
      </p>
      <p style={body}>
        재심사청구 결정은 <strong>60일 이내</strong>에 나와요.
        위원회에서 서면 심리 또는 구술 심리를 진행하죠.
        구술 심리에서는 본인이 직접 출석해서 의견을 진술할 수 있고요.
        인용되면 고용센터의 원 결정이 취소되고 실업급여가 지급돼요.
      </p>

      <SectionBadge>재심사청구 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 행정소송 */}
      <H2>재심사청구 기각 후 행정소송 절차</H2>
      <p style={body}>
        재심사에서도 기각됐는데 여전히 납득이 안 된다면 <strong>행정법원에 행정소송</strong>을 제기할 수 있죠.
        재심사 결정을 통지받은 날부터 90일 이내에 소장을 접수해야 하죠.
        이 단계부터는 법원 절차라 소송비용이 발생해요.
      </p>
      <p style={body}>
        변호사 없이 본인이 직접 소송을 진행하는 것도 가능하지만, 전문 법률 지식이 필요한 영역이에요.
        경제적 여건이 안 되면 <strong>대한법률구조공단(132)</strong>에서 무료 법률 상담과 소송 대리를 받을 수 있죠.
        소득 기준을 충족하면 소송비용까지 지원돼요.
      </p>
      <p style={body}>
        행정소송에서 이기면 재심사 결정이 취소되고, 고용센터가 새 결정을 내려야 해요.
        지면 항소할 수 있지만 시간과 비용이 많이 들죠.
        그래서 심사청구와 재심사청구 단계에서 증빙을 철저히 준비하는 게 무엇보다 중요해요. 이 두 단계는 무료니까요.
      </p>

      <GreenBox>
        심사청구: 무료 (접수 수수료 없음)<br />
        재심사청구: 무료 (접수 수수료 없음)<br />
        행정소송: 법원 비용 + 변호사 비용 발생 (법률구조공단 무료 지원 가능)
      </GreenBox>

      <Divider />

      {/* 섹션 5: 실전 팁 */}
      <H2>90일 기한 놓치지 말고 접수부터 하세요</H2>
      <p style={body}>
        가장 많이 하는 실수가 &quot;증빙자료를 좀 더 모으고 넣어야지&quot; 하다가 <strong>90일 기한</strong>을 넘기는 거예요.
        자료가 부족해도 일단 접수부터 해두세요.
        증빙은 나중에 보충 제출이 가능하지만, 기한은 되돌릴 수 없거든요.
      </p>
      <p style={body}>
        불복 이유를 쓸 때는 &quot;왜 원 결정이 잘못됐는지&quot;를 논리적으로 풀어야 해요.
        기각 결정서에 나온 사유를 하나하나 짚으면서 &quot;이 부분은 사실과 다르다&quot;, &quot;이 증거를 보면 제 주장이 맞다&quot;는 식으로 구체적으로 반박하세요.
        단순히 &quot;억울하다&quot;만 적으면 설득력이 떨어지죠.
      </p>
      <p style={body}>
        결정 통지서는 반드시 보관해두세요.
        통지서에 적힌 <strong>결정일자</strong>가 90일 기한의 시작점이에요.
        통지서를 잃어버리면 기한 계산이 불분명해져서 불이익을 받을 수 있죠.
        고용24에서 온라인으로 조회가 된다면 캡처해두는 것도 좋은 방법이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 심사청구와 재심사청구에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사안의 인정 여부는 심사 기관의 판단에 따라 달라지니, 고용센터(1350)에 사전 상담을 받아보세요." />
    </ArticleLayout>
  );
}
