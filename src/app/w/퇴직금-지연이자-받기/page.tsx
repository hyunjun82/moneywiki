"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 14일 넘게 늦었거나 아직 못 받았어요" },
  { id: "c2", label: "기한 연장 합의를 한 적이 없어요" },
  { id: "c3", label: "퇴사한 지 아직 3년이 안 됐어요" },
  { id: "c4", label: "회사에 지연이자를 요청한 적이 없어요" },
];

const CHECKLIST = [
  "지연일수 확인 — 14일 기한 다음 날부터 실제 지급일(또는 오늘)까지",
  "지연이자 계산 — 미지급액 x 20% x (지연일수 / 365)",
  "내용증명 발송 — 퇴직금 원금 + 지연이자 금액 명시",
  "노동청 진정 접수 — 지연이자 항목 함께 기재",
  "민사소송 검토 — 노동청으로 안 되면 소액심판 활용",
];

const FAQS = [
  {
    q: "지연이자를 실제로 받은 사람이 있나요?",
    a: "많아요. 노동청 시정지시나 법원 판결을 통해 지연이자를 받는 사례가 꾸준히 나오고 있죠. 법원 판례에서도 연 20% 지연이자를 인정한 건이 다수 있어요.",
  },
  {
    q: "퇴직금은 받았는데 늦게 받아서 이자만 청구할 수 있나요?",
    a: "할 수 있어요. 퇴직금을 늦게 받았다면 지연 기간에 해당하는 이자를 별도로 청구할 수 있죠. 이미 원금을 받았더라도 이자 청구권은 따로 남아 있어요.",
  },
  {
    q: "지연이자 청구에 비용이 드나요?",
    a: "내용증명은 우체국에서 5,000원 안팎이에요. 노동청 진정은 무료이고, 소액심판은 인지대·송달료가 소액 수준이죠. 대한법률구조공단을 이용하면 법률 비용도 무료예요.",
  },
  {
    q: "회사가 이미 폐업했으면 지연이자는 어떻게 되나요?",
    a: "체당금 제도에서는 퇴직금 원금만 대상이에요. 지연이자는 체당금에 포함되지 않죠. 사업주 개인에게 민사소송으로 청구하는 방법이 남아 있어요.",
  },
  {
    q: "소송 없이 지연이자를 받을 수 있나요?",
    a: "내용증명만으로도 해결되는 경우가 있어요. 회사가 '이자까지 물어야 한다'는 걸 인식하면 빨리 지급하는 경우가 많거든요. 노동청 시정지시로도 받을 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 14일 이내", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제18조 — 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당 — 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
      { label: "대한법률구조공단 — 무료 법률 상담·소송 지원", url: "https://www.klac.or.kr" },
      { label: "대법원 전자소송 — 소액심판 접수", url: "https://ecfs.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지연이자",
    title: "퇴직금 지연이자 연 20% 계산법",
    description: "지연이자의 법적 근거와 정확한 계산 공식을 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고-절차-지연이자-청구",
    title: "미지급 신고와 지연이자 청구 절차",
    description: "노동청 신고부터 지연이자 청구까지 한 번에 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-지급받는-방법",
    title: "퇴직금 미지급 시 받는 방법",
    description: "내용증명부터 소송까지, 단계별 대응법을 안내해요.",
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
          currentSlug="퇴직금-지연이자-받기"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지연이자 받기,<br />
        실제로 가능한가요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;지연이자가 연 20%라는데, 정말 받을 수 있는 건가요?&rdquo;<br />
        가능해요, 실제로 받는 사람들이 있죠.
        <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제18조</a>가 보장하는 법적 권리이니까요.
        퇴직금이 <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>14일</a>을 넘겨서 지급됐거나 아직 안 들어왔다면, 지연 기간에 대해 <strong>연 20%</strong> 이자를 청구할 수 있어요.
        실제 청구 절차, 받을 수 있는 금액, 회사 거부 시 대응법을 단계별로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 지연이자를 실제로 받을 수 있나요?</H2>
      <p style={body}>
        네, 받을 수 있어요. <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제18조</a>가 &ldquo;지급 기일 후 지연 기간에 대해 연 20%의 지연이자를 지급하여야 한다&rdquo;고 명시하고 있거든요. 이건 회사의 &ldquo;선의&rdquo;가 아니라 <strong>법적 의무</strong>예요.
      </p>
      <p style={body}>
        법원 판례에서도 지연이자를 인정한 사례가 다수 있어요. 대법원은 퇴직금 지급 기한을 넘긴 사용자에게 연 20% 지연이자 지급을 명령해왔죠. 노동청 시정지시에서도 지연이자 지급을 포함시키는 경우가 있고요.
      </p>
      <p style={body}>
        다만 &ldquo;자동 입금&rdquo;은 아니에요. 법적으로 이자가 쌓이고 있더라도 근로자가 직접 청구하지 않으면 회사가 먼저 이자를 보내주지 않죠. 그래서 적극적으로 청구하는 게 중요해요. 청구 방법은 내용증명, 노동청 진정, 민사소송 — 이 세 가지가 있어요.
      </p>

      <GreenBox title="지연이자 받기 가능 여부">
        법적 근거 = 근로기준법 시행령 제18조 (연 20%)<br />
        실제 사례 = 대법원 판례, 노동청 시정지시에서 인정<br />
        핵심 = 근로자가 <strong>직접 청구</strong>해야 받을 수 있어요
      </GreenBox>

      <SectionBadge>내 상황을 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 지연이자를 청구할 수 있는 상태예요. 아래 절차를 따라 진행하세요."
        partialMatchText="일부만 해당돼요. 소멸시효와 기한 연장 합의 여부를 확인한 뒤 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>지연이자 청구 절차는 어떻게 되나요?</H2>
      <p style={body}>
        <strong>1단계: 지연이자 계산</strong>부터 시작하세요. 공식은 &ldquo;미지급 퇴직금 x 20% x (지연일수 / 365)&rdquo;예요. 지연일수는 14일 기한 다음 날부터 오늘(또는 실제 지급일)까지 세면 되죠. 금액을 원 단위까지 정확히 산출해두세요.
      </p>
      <p style={body}>
        <strong>2단계: 내용증명 발송</strong>이에요. 회사에 &ldquo;퇴직금 원금 ○○원과 지연이자 ○○원(연 20%, ○일분)을 ○일까지 지급해주세요&rdquo;라는 내용증명을 보내세요. 우체국에서 5,000원이면 돼요. 이 단계에서 해결되는 경우가 꽤 많죠. 회사 입장에서 &ldquo;이자까지 물어야 한다&rdquo;는 걸 인식하면 빨리 지급하려 하거든요.
      </p>
      <p style={body}>
        <strong>3단계: 노동청 진정</strong>이에요. 내용증명에 반응이 없으면 고용노동부 민원마당(minwon.moel.go.kr)에 &ldquo;임금체불 진정&rdquo;을 접수하세요. 진정서 &ldquo;청구 내용&rdquo;란에 퇴직금 원금과 지연이자를 각각 적으면 돼요. 비용은 무료이고, 접수부터 시정지시까지 보통 2~4주 걸리죠.
      </p>

      <BorderBox title="청구 절차 요약">
        1단계: 지연이자 금액 정확히 계산<br />
        2단계: 내용증명 발송 (회사에 공식 요청)<br />
        3단계: 노동청 진정 (시정지시 요청)<br />
        4단계: 민사소송 (소액심판 — 노동청으로 안 될 때)
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>얼마나 받을 수 있나요?</H2>
      <p style={body}>
        금액은 퇴직금 원금과 지연일수에 따라 달라져요. 실제 사례를 볼게요. 퇴직금 <strong>500만 원</strong>을 90일 늦게 받았다면 → 500만 원 x 0.2 x (90/365) = <strong>약 24만 6,575원</strong>이에요. 작은 금액이 아니죠.
      </p>
      <p style={body}>
        퇴직금이 큰 경우에는 이자도 상당해져요. 퇴직금 <strong>2,000만 원</strong>을 6개월(180일) 안 받았다면 → 2,000만 원 x 0.2 x (180/365) = <strong>약 197만 2,603원</strong>이에요. 이 정도면 월급 하나에 맞먹는 금액이죠.
      </p>
      <p style={body}>
        1년 이상 미지급이면 더 커져요. 퇴직금 <strong>1,000만 원</strong>을 1년(365일) 동안 안 줬다면 이자만 <strong>200만 원</strong>이에요. 2년이면 400만 원이죠. 이래서 회사도 &ldquo;빨리 주는 게 낫다&rdquo;는 결론에 도달하게 되는 거예요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>회사가 지연이자 지급을 거부하면?</H2>
      <p style={body}>
        노동청 시정지시에 지연이자가 포함되면 회사가 거부하기 어려워요. 시정지시를 이행하지 않으면 검찰 송치 대상이 되거든요. 대부분의 회사는 이 단계에서 이자를 포함해서 지급하죠.
      </p>
      <p style={body}>
        노동청에서 지연이자를 강제하지 않는 경우도 있어요. 이때는 <strong>민사소송</strong>이 확실한 방법이죠. 청구 금액이 3,000만 원 이하이면 소액심판으로 신속하게 처리할 수 있어요. 소액심판은 1회 변론으로 판결이 나오니까 시간이 오래 걸리지 않죠.
      </p>
      <p style={body}>
        법률 비용이 부담되면 <strong>대한법률구조공단</strong>(klac.or.kr)을 이용하세요. 월 소득이 일정 기준 이하이면 무료 법률 상담과 소송 대리까지 지원받을 수 있어요. 소송 비용(인지대·송달료)도 소액이고, 승소하면 상대방에게 비용을 청구할 수 있죠.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>지연이자 청구 성공 사례가 있나요?</H2>
      <p style={body}>
        법원 판결에서 지연이자를 인정한 사례가 꾸준히 나오고 있어요. 대법원은 사용자가 14일 기한을 넘겨 퇴직금을 지급한 경우 연 20% 지연이자를 지급하라는 판결을 반복적으로 내리고 있죠. 이 판례가 축적되면서 &ldquo;지연이자는 받을 수 있는 권리&rdquo;라는 인식이 자리 잡았어요.
      </p>
      <p style={body}>
        노동청을 통해 해결되는 경우도 많아요. 근로감독관이 시정지시를 내릴 때 &ldquo;지연이자를 포함하여 지급하라&rdquo;고 명시하면 회사가 이를 이행하죠. 시정지시 불이행 시 검찰 송치라는 압박이 있으니까요.
      </p>
      <p style={body}>
        내용증명만으로 해결된 사례도 있어요. 지연이자 금액을 구체적으로 계산해서 &ldquo;이 금액이 매일 불어나고 있다&rdquo;고 알려주면, 회사가 부담을 느끼고 서둘러 지급하는 경우가 있죠. 중요한 건 <strong>적극적으로 청구하는 것</strong>이에요. 가만히 기다리면 회사는 움직이지 않아요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지연이자 받기에 대해 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 같은 법 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 고용노동부 고객센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
