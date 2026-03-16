"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직한 지 3년이 지나지 않았어요" },
  { id: "c2", label: "퇴직금을 아직 받지 못했거나 일부만 받았어요" },
  { id: "c3", label: "근로계약서, 급여명세서 등 증빙 서류가 있어요" },
  { id: "c4", label: "회사에 퇴직금을 요청했으나 지급받지 못했어요" },
];

const CHECKLIST = [
  "근로계약서 — 근무 기간, 임금 조건 확인용",
  "급여명세서(최근 3개월) — 평균임금 산정 근거",
  "퇴직 증빙 — 사직서 사본, 해고통지서, 이직확인서 등",
  "통장 입금 내역 — 실제 임금 수령 증빙",
  "내용증명 발송 기록 — 지급 요청 증거 (있으면 유리)",
];

const FAQS = [
  {
    q: "퇴직금 미지급 신고는 어디에 하나요?",
    a: "사업장 소재지 관할 지방고용노동청에 '임금체불 진정서'를 제출하면 돼요. 방문, 우편, 온라인(고용노동부 민원마당) 모두 가능하죠.",
  },
  {
    q: "신고하면 비용이 드나요?",
    a: "노동청 진정은 무료예요. 변호사를 따로 선임할 필요도 없죠. 다만 민사 소송으로 넘어가면 인지대·송달료 같은 소송 비용이 발생해요.",
  },
  {
    q: "신고하면 회사가 보복할 수 있나요?",
    a: "근로기준법 제104조가 '노동청 신고를 이유로 불이익을 주면 안 된다'고 명시하고 있어요. 보복이 있으면 별도 진정이 가능하죠.",
  },
  {
    q: "신고 후 결과가 나오기까지 얼마나 걸리나요?",
    a: "보통 1~3개월이에요. 사건이 복잡하거나 회사가 출석에 불응하면 더 걸릴 수 있죠. 그래도 민사 소송(6개월~1년)보다는 훨씬 빨라요.",
  },
  {
    q: "회사가 폐업했어도 신고할 수 있나요?",
    a: "가능해요. 대표이사 개인에 대한 진정이 가능하고, 체당금 제도를 통해 정부에서 일부를 대신 지급받을 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 (퇴직 후 14일 이내 지급 의무)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제109조 — 임금체불 처벌 규정 (3년 이하 징역 또는 3,000만 원 이하 벌금)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당 — 임금체불 진정 온라인 신청", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부 — 퇴직금 미지급 상담 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-미지급-지급받는-방법",
    title: "퇴직금 미지급, 지금 당장 받을 수 있는 방법",
    description: "내용증명부터 노동청 신고, 소액체당금까지 퇴직금을 받아내는 구체적인 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-지연이자",
    title: "퇴직금 지연이자 연 20% 계산법",
    description: "14일이 지나도 퇴직금을 안 주면 연 20% 지연이자가 붙어요. 계산법과 청구 방법을 알려드릴게요.",
  },
  {
    slug: "퇴직금-소멸시효",
    title: "퇴직금 소멸시효 3년, 지금 청구 가능한가요?",
    description: "퇴직금 청구권은 퇴직일로부터 3년이에요. 시효 중단 방법까지 정리했어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-미지급-신고"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 미지급 · 노동청 신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 미지급 신고<br />
        어디에 어떻게 하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직한 지 한 달이 넘었는데 퇴직금이 안 들어와요. 어디에 말해야 하죠?&rdquo;<br />
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>는 사용자가 퇴직일로부터 <strong>14일 이내</strong>에 퇴직금을 포함한 금품을 청산하도록 의무화하고 있어요.
        이걸 어기면 <strong>3년 이하 징역 또는 3,000만 원 이하 벌금</strong>에 해당하는 범죄이죠.
        관할 지방고용노동청에 진정서를 넣으면 되고, 비용은 무료예요.
        지금부터 신고 장소, 준비 서류, 진행 절차, 결과별 대응까지 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 미지급 신고는 어디에 하나요?</H2>
      <p style={body}>
        사업장 소재지를 관할하는 <strong>지방고용노동청</strong>(줄여서 노동청)에 &ldquo;임금체불 진정서&rdquo;를 제출하면 돼요. 전국에 48개 지청이 있고, <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 홈페이지</a>에서 관할 지청을 검색할 수 있죠. 본인 거주지가 아니라 <strong>회사 소재지</strong> 기준이라는 점을 꼭 기억하세요.
      </p>
      <p style={body}>
        신고 방법은 세 가지예요. 노동청에 직접 방문하거나, 우편으로 진정서를 보내거나, <a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서 온라인으로 접수할 수 있죠. 온라인 접수가 가장 간편하고, 접수 후 사건 번호를 바로 확인할 수 있어요.
      </p>
      <p style={body}>
        진정서 양식은 노동청에 비치되어 있고, 민원마당에서도 다운받을 수 있어요. 양식에 회사명, 대표자명, 미지급 금액, 근무 기간을 적으면 되죠. 특별한 법률 지식이 필요하지 않으니 직접 작성해도 충분해요.
      </p>

      <GreenBox title="신고 경로 3가지">
        1. <strong>방문</strong> — 사업장 소재지 관할 노동청 직접 방문<br />
        2. <strong>우편</strong> — 진정서를 작성해 관할 노동청에 우편 발송<br />
        3. <strong>온라인</strong> — 고용노동부 민원마당(minwon.moel.go.kr) 접수
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>신고 전에 준비할 것들은 뭔가요?</H2>
      <p style={body}>
        가장 중요한 건 <strong>근로관계를 증명하는 서류</strong>예요. 근로계약서가 있으면 가장 좋고, 없더라도 급여 입금 내역, 4대 보험 가입 확인서, 출퇴근 기록 등으로 대체할 수 있죠. 근로계약서 없이 일한 경우에도 실제 근무 사실만 입증되면 신고가 가능해요.
      </p>
      <p style={body}>
        퇴직금 금액을 산정할 근거도 필요하죠. <strong>최근 3개월 급여명세서</strong>가 핵심이에요. 평균임금을 계산하는 기초 자료이기 때문이에요. 급여명세서가 없으면 통장 입금 내역으로 갈음할 수 있고, 노동청에서도 이를 인정해주죠.
      </p>
      <p style={body}>
        회사에 퇴직금 지급을 요청한 기록이 있으면 심사가 빨라져요. <a href="/w/퇴직금-미지급-지급받는-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>내용증명</a>을 보낸 이력이나, 문자·이메일로 &ldquo;퇴직금을 달라&rdquo;고 요청한 기록이 대표적이죠. 이런 증거가 없어도 신고 자체는 가능하지만, 있으면 &ldquo;회사가 고의로 안 줬다&rdquo;는 걸 입증하기 쉬워요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>신고 후 절차는 어떻게 진행되나요?</H2>
      <p style={body}>
        진정서가 접수되면 노동청 근로감독관이 사건을 배정받아요. 보통 접수 후 <strong>1~2주 안에</strong> 사업주에게 출석 요구서가 발송되죠. 사업주가 출석하면 근로감독관이 양측 주장을 듣고 사실관계를 확인해요.
      </p>
      <p style={body}>
        조사 과정에서 <strong>합의</strong>가 이뤄지는 경우가 많아요. 사업주가 퇴직금 지급에 동의하면 합의서를 작성하고, 약속한 날짜까지 입금을 확인하면 사건이 종결되죠. 합의 시 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자</a>(연 20%)까지 포함해서 요구할 수 있으니 빠뜨리지 마세요.
      </p>
      <p style={body}>
        사업주가 출석하지 않거나 지급을 거부하면 근로감독관이 <strong>시정 지시</strong>를 내려요. 시정 지시에도 불응하면 검찰에 <strong>사건 송치</strong>(형사 고발)가 이뤄지죠. 여기까지 오면 사업주에게 벌금이나 징역형이 부과될 수 있어서, 대부분 시정 지시 단계에서 해결돼요.
      </p>

      <BorderBox title="처리 기간은 얼마나 걸리나요?">
        접수부터 종결까지 보통 <strong>1~3개월</strong>이에요.<br />
        사업주가 협조하면 한 달 안에 끝나기도 하고,<br />
        불응·도주하면 검찰 송치까지 3~6개월 소요될 수 있죠.
      </BorderBox>

      <Divider />

      {/* 섹션 4 */}
      <H2>신고하면 회사에 불이익이 생기나요?</H2>
      <p style={body}>
        네, 생기죠. 임금체불은 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제109조</a>에 따라 <strong>3년 이하 징역 또는 3,000만 원 이하 벌금</strong>에 해당하는 범죄예요. 시정 지시를 받고도 안 주면 검찰에 송치되고, 전과 기록이 남을 수 있죠.
      </p>
      <p style={body}>
        그래서 대부분의 사업주는 노동청 출석 통보를 받으면 빠르게 지급하려고 해요. &ldquo;몰랐다&rdquo;거나 &ldquo;자금 사정이 어렵다&rdquo;는 건 면책 사유가 되지 않거든요. 특히 반복 체불 사업주는 명단이 공개되고 정부 지원사업에서 배제돼요.
      </p>
      <p style={body}>
        반대로 근로자 쪽 불이익은 없어요. 근로기준법 제104조가 &ldquo;신고를 이유로 근로자에게 불이익을 줘선 안 된다&rdquo;고 보호하고 있죠. 이미 퇴직한 상태라면 회사가 줄 수 있는 불이익이 사실상 없으니 걱정할 필요가 없어요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>신고 결과 퇴직금을 못 받으면 어떻게 되나요?</H2>
      <p style={body}>
        노동청 진정으로 해결이 안 되면 <strong>민사 소송</strong>으로 넘어가야 해요. 퇴직금이 3,000만 원 이하라면 소액사건심판으로 진행할 수 있어서 절차가 비교적 간단하죠. 판결이 나면 강제 집행(압류)으로 회수할 수 있고요.
      </p>
      <p style={body}>
        회사가 도산(부도·폐업)해서 돈이 아예 없는 경우라면 <a href="/w/회사-폐업-퇴직금-체당금-신청-우선변제권" style={{ color: "#1D9E75", textDecoration: "underline" }}>체당금 제도</a>를 활용하세요. 근로복지공단이 사업주를 대신해 체불 임금·퇴직금의 일부를 지급해주는 제도예요. 최대 1,000만 원(퇴직금 기준)까지 받을 수 있죠.
      </p>
      <p style={body}>
        &ldquo;법원까지 가야 하나&rdquo; 싶겠지만, 실제로 노동청 진정 단계에서 80% 이상 해결돼요. 사업주 입장에서는 형사처벌 리스크가 부담이 크기 때문이에요. 일단 노동청 진정부터 시작하고, 결과를 보고 다음 단계를 판단해도 늦지 않아요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당돼요. 노동청에 임금체불 진정을 넣으면 퇴직금을 받아낼 수 있어요."
        partialMatchText="일부만 해당돼요. 증빙 서류를 더 확보한 뒤 노동청(1350)에 상담부터 받아보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 미지급 신고에 대해 실제로 많이 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
