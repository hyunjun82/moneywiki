"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "1년 이상 계속 근로하고 퇴직한 상태예요" },
  { id: "c2", label: "퇴사일로부터 14일이 지났는데 퇴직금이 안 들어왔어요" },
  { id: "c3", label: "퇴직금 소멸시효(3년) 안에 있어요" },
  { id: "c4", label: "근로계약서, 급여명세서 등 근무 증빙자료가 있어요" },
];

const CHECKLIST = [
  "근로계약서 — 근로 조건과 임금 확인용",
  "급여명세서(최근 3개월) — 평균임금 산정 기준",
  "퇴직원 또는 퇴사 확인서 — 퇴직 사실 증명",
  "내용증명 우편 — 회사에 공식 청구 기록 남기기",
  "4대 보험 가입 이력 확인서 — 근속기간 증빙 보조자료",
];

const FAQS = [
  {
    q: "퇴직금을 직접 청구할 수 있나요?",
    a: "가능해요. 퇴사 후 14일이 지나도 지급되지 않으면 회사에 서면으로 청구할 수 있죠. 내용증명을 보내면 법적 기록이 남아요.",
  },
  {
    q: "구두로 청구해도 되나요?",
    a: "구두 청구도 법적으로는 유효하지만, 증거가 남지 않아서 분쟁 시 불리할 수 있어요. 반드시 서면(내용증명, 이메일 등)으로 남기세요.",
  },
  {
    q: "내용증명을 보내면 바로 효과가 있나요?",
    a: "법적 강제력은 없지만, 회사 입장에서는 노동청 신고 전 단계라는 신호로 받아들이죠. 실무적으로 내용증명 발송 후 지급되는 경우가 꽤 많아요.",
  },
  {
    q: "퇴직금 청구에 비용이 드나요?",
    a: "내용증명 발송 비용(우체국 기준 약 5,000~10,000원)만 들어요. 노동청 신고는 무료이고, 소액사건 소송도 인지대가 저렴하죠.",
  },
  {
    q: "3년이 지나면 정말 못 받나요?",
    a: "퇴직금 청구권의 소멸시효가 3년이에요. 다만 내용증명 발송이나 노동청 신고를 하면 시효가 중단되니, 기한 전에 조치를 취해두세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여 보장법 — 퇴직금 청구권", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 임금체불 신고 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법",
    description: "회사가 퇴직금을 안 주면 노동청에 신고하는 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-지급-절차",
    title: "퇴직금 지급 절차 단계별 안내",
    description: "퇴사 후 퇴직금이 지급되는 전체 절차를 정리했어요.",
  },
  {
    slug: "퇴직금-소멸시효",
    title: "퇴직금 소멸시효 3년, 지금 청구 가능한가요?",
    description: "소멸시효 기산점과 시효 중단 방법을 안내해요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-지급-청구-방법"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 청구방법 · 미지급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 청구 방법,<br />
        직접 요청할 수 있나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금이 안 들어오는데, 내가 직접 달라고 해도 되나요?&rdquo; 당연히 되죠.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>는 퇴직 시 금품을 14일 이내에 청산하도록 정하고 있어요.
        기한이 지났는데 입금이 없다면 근로자가 직접 청구할 수 있고, 회사가 거부하면 노동청 신고까지 이어질 수 있죠.
        청구 방법과 필요한 서류, 거부 시 대처법을 순서대로 알려드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금을 직접 청구할 수 있나요?</H2>
      <p style={body}>
        네, 퇴직금은 근로자의 <strong>법적 권리</strong>이니까 직접 청구할 수 있어요. 퇴사 후 14일이 지나도 지급되지 않으면 회사에 서면으로 지급을 요청하는 게 첫 번째 단계죠. 전화나 구두보다는 기록이 남는 방식이 훨씬 효과적이에요.
      </p>
      <p style={body}>
        가장 확실한 방법은 <strong>내용증명 우편</strong>이에요. 우체국에서 보내면 &ldquo;언제, 누가, 어떤 내용을 보냈는지&rdquo;가 공식 기록으로 남죠. 회사 입장에서는 노동청 신고 전 단계라는 압박이 되기 때문에, 내용증명만으로 지급되는 경우가 적지 않아요.
      </p>
      <p style={body}>
        이메일이나 카카오톡 메시지도 증거로 인정되지만, 내용증명보다는 법적 효력이 약하죠. 가능하면 내용증명을 먼저 보내고, 회사 반응을 기다린 뒤 다음 단계를 결정하세요.
      </p>

      <GreenBox title="청구 단계">
        1단계: 내용증명으로 서면 청구<br />
        2단계: 회사 반응 대기 (보통 1~2주)<br />
        3단계: 미지급 시 고용노동부 진정<br />
        4단계: 그래도 안 되면 법원 지급명령 신청
      </GreenBox>

      <Divider />

      <H2>청구 시 필요한 서류는 뭔가요?</H2>
      <p style={body}>
        <strong>근로계약서</strong>가 가장 중요한 서류예요. 입사일, 임금, 근로 조건이 모두 담겨 있으니까요. 근로계약서가 없더라도 4대 보험 가입 이력 확인서로 근무 사실을 증명할 수 있죠.
      </p>
      <p style={body}>
        <strong>급여명세서</strong>도 챙겨야 해요. 퇴직 전 3개월 급여 내역이 있으면 평균임금을 산정할 수 있고, 퇴직금 계산이 맞는지 검증할 수 있죠. 급여명세서가 없으면 통장 거래내역으로 대체할 수 있어요.
      </p>
      <p style={body}>
        내용증명에는 &ldquo;퇴직일, 청구 금액, 지급 요청 기한&rdquo;을 명시하세요. 인터넷에 퇴직금 청구 내용증명 양식이 많으니 참고하면 되고, 어려우면 노무사 상담(보통 3~5만 원)을 받아도 좋죠.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>회사가 청구를 거부하면 어떻게 하나요?</H2>
      <p style={body}>
        내용증명을 보냈는데도 지급하지 않으면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 관할 지방관서에 <strong>임금체불 진정</strong>을 넣으세요. 접수는 온라인(민원마당)이나 방문 모두 가능하고, 비용은 무료예요.
      </p>
      <p style={body}>
        진정이 접수되면 근로감독관이 사실 조사를 해요. 회사에 시정 지시를 내리고, 그래도 안 지키면 사업주가 형사 처벌(3년 이하 징역 또는 3천만 원 이하 벌금)까지 받을 수 있죠.
      </p>
      <p style={body}>
        노동청 절차와 별개로 <strong>법원 지급명령 신청</strong>을 동시에 진행할 수 있어요. 지급명령은 소송보다 빠르고 간단하죠. 인지대도 소액이고, 상대방이 이의를 제기하지 않으면 확정 판결과 같은 효력이 생겨요.
      </p>

      <Divider />

      <H2>내용증명으로 청구하는 방법은?</H2>
      <p style={body}>
        내용증명은 우체국에서 보내요. A4 용지에 &ldquo;수신인(회사), 발신인(본인), 청구 내용&rdquo;을 적고 3통을 준비하면 돼요. 1통은 회사에 발송, 1통은 우체국 보관, 1통은 본인 보관이죠.
      </p>
      <p style={body}>
        청구 내용에는 입사일, 퇴직일, 청구 금액, 지급 요청 기한(보통 수령 후 7일 이내)을 적어요. &ldquo;기한 내 미지급 시 고용노동부 진정 및 법적 조치를 취하겠다&rdquo;는 문구를 넣으면 효과가 커지죠.
      </p>
      <p style={body}>
        온라인 내용증명도 가능해요. 우체국 인터넷우체국 사이트에서 전자 내용증명을 발송할 수 있고, 비용은 약 5,000~10,000원이에요. 방문이 어려운 경우 이 방법이 편리하죠.
      </p>

      <BorderBox title="소멸시효 3년을 잊지 마세요">
        퇴직금 청구권은 퇴직일로부터 <strong>3년</strong>이 지나면 소멸해요.<br />
        내용증명 발송이나 노동청 신고를 하면 시효가 중단되니,<br />
        기한 전에 반드시 조치를 취해두세요.
      </BorderBox>

      <Divider />

      <H2>노동청 신고와 청구를 동시에 할 수 있나요?</H2>
      <p style={body}>
        가능해요. 내용증명 발송과 노동청 진정을 동시에 진행해도 되고, 법원 지급명령까지 병행할 수 있죠. 각각 별개의 절차이기 때문에 서로 영향을 주지 않아요.
      </p>
      <p style={body}>
        실무적으로는 내용증명을 먼저 보내고 1~2주 기다려본 뒤, 반응이 없으면 노동청에 진정하는 순서가 효율적이에요. 노동청 진정 시 내용증명 발송 기록을 첨부하면 &ldquo;이미 서면 청구를 했는데 무시당했다&rdquo;는 근거가 되죠.
      </p>
      <p style={body}>
        금액이 3,000만 원 이하라면 소액사건 심판을 활용하는 것도 방법이에요. 변호사 없이 본인이 직접 진행할 수 있고, 판결까지 보통 2~3개월이면 끝나죠. <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>미지급 신고 방법</a>은 별도 글에서 더 자세히 다뤘어요.
      </p>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 청구 조건을 모두 갖췄네요. 내용증명 발송부터 시작하세요."
        partialMatchText="일부 조건이 미충족이에요. 해당 항목을 확인한 뒤 청구를 진행하세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 청구 방법에 관해 자주 나오는 질문을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
