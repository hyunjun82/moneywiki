"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "고용보험 가입 사업장에서 180일 이상 근무했어요" },
  { id: "c2", label: "비자발적 퇴사(또는 정당한 사유의 자발적 퇴사)예요" },
  { id: "c3", label: "퇴직 전 18개월간 고용보험 가입기간이 180일 이상이에요" },
  { id: "c4", label: "기초수급 유지 여부를 주민센터에서 확인했어요" },
];

const CHECKLIST = [
  "고용24에서 이직확인서 처리 상태 확인",
  "주민센터에 실업급여 수급 사실 사전 상담",
  "실업급여 수급 시작 후 30일 이내 소득 변동 신고",
  "실업급여 수급 종료 후 주민센터에 종료 신고",
  "생계급여 복원 여부 확인",
];

const FAQS = [
  {
    q: "기초수급자인데 실업급여 신청하면 생계급여가 바로 끊기나요?",
    a: "바로 끊기진 않죠. 실업급여가 소득으로 반영되면서 생계급여 금액이 조정돼요. 실업급여 액수에 따라 생계급여가 줄거나 0원이 될 수 있어요.",
  },
  {
    q: "실업급여를 안 받는 게 오히려 이득인 경우도 있나요?",
    a: "거의 없죠. 실업급여 + 줄어든 생계급여를 합치면 원래 생계급여보다 총 수입이 높은 경우가 대부분이에요. 본인이 낸 고용보험료를 돌려받는 거라고 생각하면 돼요.",
  },
  {
    q: "실업급여 받는 걸 주민센터에 신고 안 하면 어떻게 되나요?",
    a: "부정수급으로 처리돼요. 국민기초생활보장법 제46조에 따라 받은 금액 전액 환수에 최대 40% 가산금까지 부과될 수 있죠.",
  },
  {
    q: "실업급여 끝나면 생계급여가 자동으로 돌아오나요?",
    a: "자동은 아니에요. 실업급여 수급이 끝나면 주민센터에 다시 신고해야 생계급여가 원래 금액으로 복원되죠. 30일 이내에 신고하세요.",
  },
  {
    q: "의료급여도 같이 끊기나요?",
    a: "소득인정액이 올라가면 의료급여에도 영향이 있을 수 있어요. 1종에서 2종으로 바뀌거나 자격이 상실될 수도 있죠. 주민센터에서 사전 상담을 받아보는 게 가장 정확해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 실업급여 수급자격 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "국민기초생활보장법: 소득인정액 산정 및 신고의무", url: "https://www.law.go.kr/법령/국민기초생활보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 신청·수급 내역 확인", url: "https://www.ei.go.kr" },
      { label: "복지로: 기초생활보장 소득 변동 신고", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-연말정산",
    title: "실업급여 받으면 연말정산은 어떻게 하나요?",
    description: "실업급여의 세금 처리와 연말정산 반영 여부를 정리했어요.",
  },
  {
    slug: "실업급여-한달-얼마-받나요",
    title: "실업급여 한 달에 얼마 받나요?",
    description: "퇴직 전 임금 기준 실업급여 월 수령액 계산 방법을 정리했어요.",
  },
  {
    slug: "실업급여-최소금액",
    title: "실업급여 최소금액은 얼마인가요?",
    description: "2026년 기준 실업급여 하한액과 최소 수령액을 안내해요.",
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
          currentSlug="실업급여-기초수급자"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 기초수급자 · 생계급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기초수급자도 실업급여 받을까?<br />
        생계급여 중복과 수급 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;기초수급자인데 실업급여도 받을 수 있을까?&quot;<br />
        받을 수 있죠. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>과{" "}
        <a href="https://www.law.go.kr/법령/국민기초생활보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민기초생활보장법</a>은
        별개의 제도라서, 고용보험 가입 이력만 갖추면 기초수급자도 실업급여를 받을 수 있어요.<br /><br />
        다만 실업급여가 <strong>소득</strong>으로 잡히면서 생계급여가 줄어들 수 있으니,
        주민센터에 꼭 신고해야 하죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 두 제도는 별개 */}
      <H2>수급 기준이 기초수급자라서 달라지나요?</H2>
      <p style={body}>
        결론부터 말하면, <strong>달라지지 않아요</strong>. 기초생활보장제도는{" "}
        <a href="https://www.law.go.kr/법령/국민기초생활보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민기초생활보장법</a>에 근거한 제도이고,
        실업급여는 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 근거한 사회보험이에요.
        완전히 다른 법에서 운영하는 제도라서, 하나를 받는다고 다른 하나가 막히진 않죠.
      </p>
      <p style={body}>
        실업급여 수급 조건도 일반인과 똑같아요. 고용보험 가입 사업장에서 180일 이상 근무하고, 비자발적 퇴사(또는 정당한 사유의 자발적 퇴사)여야 하며, 적극적인 구직활동 의사가 필요하죠. 기초수급자라서 조건이 달라지거나 추가되는 건 없어요.
      </p>
      <p style={body}>
        <a href="/w/퇴사후-실업급여-신청-기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직 후 12개월 이내</a>에 신청해야 한다는 점도 동일하죠. 기초수급자라고 우대하거나 불이익을 주는 조항이 따로 없기 때문에, 고용보험 자격 조건만 맞으면 누구나 동일하게 신청할 수 있어요.
      </p>

      <GreenBox>
        1. 고용보험 가입 사업장 180일 이상 근무<br />
        2. 비자발적 퇴사 (또는 정당한 사유)<br />
        3. 적극적 구직활동 의사<br />
        4. 퇴직 후 12개월 이내 신청
      </GreenBox>

      <SectionBadge>내 자격 확인해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 수급 조건을 모두 충족해요. 고용센터에 신청하세요."
        partialMatchText="일부 조건이 맞지 않아요. 해당 항목을 다시 확인해보세요."
      />

      <Divider />

      {/* 섹션 2: 생계급여 중복 */}
      <H2>생계급여 중복 수급은 가능한가요?</H2>
      <p style={body}>
        <strong>동시에 받을 수 있지만, 생계급여가 조정돼요.</strong>{" "}
        <a href="https://www.law.go.kr/법령/국민기초생활보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민기초생활보장법</a>에서 정한 &quot;소득인정액&quot; 계산 때문이죠.
        기초생활보장 급여는 소득인정액이 기준 중위소득의 일정 비율 이하일 때 지급되는데, 실업급여를 받으면 그게 소득으로 잡혀요.
      </p>
      <p style={body}>
        소득인정액 = 소득평가액 + 재산의 소득환산액이에요. 실업급여는 <strong>실제 수령 금액 전액</strong>이 소득평가액에 반영되죠.
        예를 들어 실업급여로 월 150만 원을 받으면, 소득평가액에 150만 원이 더해지면서 생계급여가 줄거나 0원이 될 수 있어요.
      </p>
      <p style={body}>
        그래도 총 수입은 늘어나는 경우가 대부분이에요. 원래 생계급여 71만 원(2026년 1인 가구 기준)을 받던 분이 실업급여 150만 원을 받으면, 생계급여는 0원이 되지만 총 수입은 71만 원에서 150만 원으로 올라가죠. 실업급여를 안 받는 게 오히려 손해예요.
      </p>

      <BorderBox>
        <strong>실업급여 수급 전</strong><br />
        기준 중위소득(30%): 약 71만 원 / 소득인정액: 0원 → 생계급여 71만 원<br /><br />
        <strong>실업급여 수급 후 (월 150만 원)</strong><br />
        소득인정액: 150만 원 → 생계급여 0원 / 총 수입: 150만 원
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 신고 의무 */}
      <H2>생계급여 중복 시 주민센터 신고 의무</H2>
      <p style={body}>
        <strong>반드시 신고해야 해요.</strong>{" "}
        <a href="https://www.law.go.kr/법령/국민기초생활보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민기초생활보장법 제37조</a>가
        수급자의 소득·재산 변동 신고 의무를 정하고 있죠. 실업급여를 받기 시작하면 소득이 생긴 것이니까, 변동 사실을 알려야 해요.
      </p>
      <p style={body}>
        신고 기한은 변동 발생일로부터 <strong>30일 이내</strong>예요. 실업급여 수급자격을 인정받고 첫 급여가 나오면 바로 주민센터에 알리면 되죠. 미리 신고해도 괜찮아요.
        방법은 주민센터 직접 방문이나 <a href="https://www.bokjiro.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>복지로</a> 온라인 신고 두 가지예요.
      </p>
      <p style={body}>
        &quot;소득·재산 변동 신고서&quot;를 작성하고, 실업급여 수급 사실을 증명할 서류(수급자격 인정서 등)를 첨부하면 돼요.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급 내역을 출력할 수 있으니 미리 준비해 두세요.
      </p>

      <SectionBadge>신고 절차 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        소득이 생겼는데 신고 안 하고 생계급여를 그대로 받으면 <strong>부정수급</strong>이에요.<br />
        국민기초생활보장법 제46조에 따라 받은 금액 전액 환수 + 최대 40% 가산금이 부과되죠.
        향후 급여 지급이 제한될 수도 있어요. &quot;몰랐다&quot;는 건 구제 사유가 되기 어렵고요.
      </GreenBox>

      <Divider />

      {/* 섹션 4: 의료급여 등 다른 급여 영향 */}
      <H2>수급 기준 변화에 따른 의료급여 영향</H2>
      <p style={body}>
        <strong>영향이 생길 수 있어요.</strong> 실업급여로 소득인정액이 올라가면 생계급여뿐 아니라 의료급여, 주거급여 자격에도 변화가 생기죠.
        의료급여는 1종(근로능력 없는 가구)과 2종(근로능력 있는 가구)으로 나뉘는데, 소득인정액이 올라가면 1종에서 2종으로 바뀌거나 자격 자체가 상실될 수도 있어요.
      </p>
      <p style={body}>
        정확한 영향은 가구 구성, 다른 소득, 재산 등에 따라 달라지기 때문에 일률적으로 말하기 어려워요. 그래서 실업급여를 신청하기 전에 주민센터에서 <strong>사전 상담</strong>을 받는 게 가장 확실하죠. 실업급여가 들어오면 생계·의료·주거급여가 각각 어떻게 바뀌는지 한꺼번에 알려줘요.
      </p>
      <p style={body}>
        국민취업지원제도의 구직촉진수당(월 50만 원, 최대 6개월)과 실업급여는 동시에 못 받는다는 점도 알아두세요. 실업급여 자격이 되면 실업급여를 먼저 받는 편이 금액적으로 유리한 경우가 많아요. 실업급여 수급이 끝난 뒤에 국민취업지원제도를 신청하는 것도 방법이죠. <a href="/w/실업급여-한달-얼마-받나요" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 월 수령액</a>을 미리 계산해보면 판단이 쉬워요.
      </p>

      <BorderBox>
        <strong>생계급여</strong>: 소득인정액 증가 → 감액 또는 0원<br />
        <strong>의료급여</strong>: 1종→2종 변경 또는 자격 상실 가능<br />
        <strong>주거급여</strong>: 소득인정액 기준 초과 시 감액 가능<br />
        <strong>국민취업지원제도</strong>: 실업급여와 동시 수급 불가
      </BorderBox>

      <Divider />

      {/* 섹션 5: 실업급여 끝난 후 */}
      <H2>생계급여 복원을 위해 수급 종료 후 바로 신고하세요</H2>
      <p style={body}>
        실업급여 수급이 끝나면 소득이 줄어든 거니까, <strong>주민센터에 다시 신고</strong>해야 해요. 신고하면 생계급여가 원래 금액으로 복원되죠. 자동 복원이 아니라 본인이 직접 알려야 한다는 게 핵심이에요.
      </p>
      <p style={body}>
        신고 기한은 실업급여 수급 종료 후 30일 이내예요. &quot;실업급여 수급 종료 확인서&quot;를 첨부하면 처리가 빨라지죠.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급 내역을 출력할 수 있어요.
      </p>
      <p style={body}>
        재취업에 성공하면 근로소득이 새로 생기니까 또 신고해야 하죠. 소득에 변동이 생길 때마다 30일 이내에 신고하는 게 원칙이에요. 번거롭더라도 빠뜨리면 나중에 환수당할 수 있으니 꼭 챙기세요.
      </p>

      <SectionBadge>핵심 정리</SectionBadge>
      <BorderBox>
        1. 기초수급자도 고용보험 가입 이력 있으면 실업급여 수급 가능<br />
        2. 실업급여는 소득으로 잡혀 생계급여가 줄어들 수 있음<br />
        3. 그래도 총 수입은 늘어나는 경우가 대부분<br />
        4. 실업급여 시작·종료 시 주민센터 신고 필수 (30일 이내)<br />
        5. 신고 안 하면 부정수급 → 전액 환수 + 가산금
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기초수급자 실업급여에 대해 실제로 많이 물어보시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 국민기초생활보장법을 바탕으로 작성됐어요. 소득인정액 산정 결과는 가구 상황에 따라 달라지니, 주민센터에서 정확한 상담을 받아보세요." />
    </ArticleLayout>
  );
}
