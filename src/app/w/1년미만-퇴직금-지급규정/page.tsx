"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const FAQS = [
  {
    q: "편의점 알바 1년 넘게 했는데 퇴직금 받을 수 있나요?",
    a: "주 15시간 이상 일했다면 받을 수 있어요. 1년 이상 + 주 15시간 이상 두 조건을 동시에 충족하면 고용 형태와 무관하게 퇴직금 대상이죠.",
  },
  {
    q: "퇴직금이 20만 원 정도인데, 신고할 가치가 있나요?",
    a: "금액과 관계없이 신고할 수 있어요. 고용노동부는 소액 사건도 처리하고, 사업주에게 시정명령을 내리죠. 사업주 입장에서는 형사처벌 리스크가 있기 때문에 소액이라도 지급하는 경우가 많아요.",
  },
  {
    q: "4대 보험에 가입하지 않았는데도 퇴직금을 받나요?",
    a: "4대 보험 가입 여부와 퇴직금은 별개예요. 사업주가 고용보험을 안 들었더라도 실제로 일하고 급여를 받았다면 퇴직금 청구가 가능하죠. 급여 이체 내역이나 근무 기록이 증거가 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조 — 퇴직급여제도의 설정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제18조 — 단시간근로자의 근로조건", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "알바-퇴직금",
    title: "알바도 퇴직금을 받을 수 있나요?",
    description: "아르바이트생의 퇴직금 지급 기준과 청구 방법을 설명해요.",
  },
  {
    slug: "퇴직금-1년미만",
    title: "1년 미만 근무, 퇴직금을 받을 수 있나요?",
    description: "1년 미만이라도 예외적으로 퇴직금을 받을 수 있는 경우를 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 절차와 방법",
    description: "사업주가 퇴직금을 안 줄 때 노동부 진정·고소 절차를 안내해요.",
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
          currentSlug="1년미만-퇴직금-지급규정"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 알바퇴직금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1년 미만 퇴직금 지급 규정,<br />
        알바도 해당될까?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;알바인데 퇴직금이라는 게 나올 수 있나요?&rdquo;<br />
        알바라도 <strong>1년 이상 근무 + 주 15시간 이상</strong>이면 퇴직금 대상이에요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은 고용 형태를 따지지 않고, 근로자이기만 하면 동일하게 적용되거든요.
        1년 미만 알바의 퇴직금 규정, 주 15시간 기준, 거부 시 대응법, 소액 퇴직금 신고까지 — 알바생이 꼭 알아야 할 내용을 정리할게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>알바도 1년 미만 퇴직금 규정이 적용되나요?</H2>
      <p style={body}>
        적용돼요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은 &ldquo;근로자&rdquo;라는 단어만 쓰고 있지, &ldquo;정규직&rdquo;이나 &ldquo;정식 직원&rdquo;이라는 구분을 두지 않아요. 알바라도 사업장에 소속돼서 일하고 급여를 받으면 근로자이고, 퇴직금 규정이 똑같이 적용되죠.
      </p>
      <p style={body}>
        1년 미만 알바는 법정 퇴직금 의무가 없다는 점은 정규직과 같아요. 계속근로기간 1년 이상이 되어야 사업주에게 지급 의무가 생기죠. 하지만 <a href="/w/알바-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>알바 퇴직금</a> 역시 취업규칙 특약이나 계약 갱신 합산으로 받을 수 있는 경우가 있어요.
      </p>
      <p style={body}>
        현실에서 문제가 되는 건 사업주가 &ldquo;알바한테는 퇴직금이 없다&rdquo;고 주장하는 경우예요. 법적으로 완전히 틀린 말이죠. 알바라서 퇴직금이 없는 게 아니라, 1년 미만이라서 또는 주 15시간 미만이라서 대상이 안 되는 거예요. 이 차이를 정확히 알아야 해요.
      </p>

      <GreenBox title="알바 퇴직금 지급 조건">
        1. 같은 사업장에서 <strong>1년(365일) 이상</strong> 근무<br />
        2. 4주 평균 <strong>주 15시간 이상</strong> 근로<br />
        알바든 정규직이든, 이 두 조건만 충족하면 퇴직금 대상이에요.
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>주 15시간 기준을 충족해야 하나요?</H2>
      <p style={body}>
        충족해야 해요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제18조</a>는 4주 평균 주 소정근로시간이 15시간 미만인 근로자를 &ldquo;초단시간 근로자&rdquo;로 분류하고, 퇴직금을 비롯한 일부 규정을 적용하지 않죠. 주 15시간이 퇴직금의 핵심 기준선인 거예요.
      </p>
      <p style={body}>
        알바는 근무 시간이 들쭉날쭉한 경우가 많아요. 어떤 주에는 20시간, 다른 주에는 10시간 일하는 식이죠. 이때는 <strong>4주 평균</strong>을 내서 15시간 이상인지를 봐요. 한 주만 적었다고 바로 탈락하는 건 아니에요.
      </p>
      <p style={body}>
        사업주가 의도적으로 주 14시간만 계약하는 경우가 있어요. &ldquo;쪼개기 고용&rdquo;이라 부르죠. 하지만 실제로는 15시간 이상 일하고 있다면, 계약서보다 실제 근무 시간이 우선해요. 출퇴근 기록이나 카카오톡 근무 지시 내역을 증거로 남겨두면 나중에 활용할 수 있어요.
      </p>

      <BorderBox title="실제 근무 시간 기록하는 법">
        매일 출퇴근 시간을 메모장이나 캘린더에 기록하세요.<br />
        사진(시간 표시 포함)을 찍어두면 더 확실하죠.<br />
        사업주가 보낸 근무 스케줄 문자나 카톡도 캡처해두세요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/근로" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>단기 계약과 장기 계약, 기준이 다른가요?</H2>
      <p style={body}>
        퇴직금 기준 자체는 같아요. 3개월 계약이든 1년 계약이든, 결국 계속근로기간이 1년 이상이고 주 15시간 이상이면 대상이 되죠. 차이가 나는 건 &ldquo;합산&rdquo; 여부예요.
      </p>
      <p style={body}>
        단기 계약이 반복 갱신됐다면 합산될 수 있어요. 3개월 계약 → 3개월 계약 → 3개월 계약 → 3개월 계약, 이렇게 4번 연속 갱신됐다면 총 12개월로 퇴직금 대상이 되죠. 계약 사이에 공백이 없고 업무 내용이 동일하면 합산 가능성이 높아요.
      </p>
      <p style={body}>
        반면 한 번의 단기 계약만 하고 끝났다면 합산할 대상이 없어요. 3개월 알바 한 번으로 퇴직금을 받기는 어렵죠. 다만 같은 사업장에서 나중에 다시 채용됐다면 이전 기간과 합산할 수 있는지를 따져봐야 해요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>퇴직금 지급 거부 시 어떻게 대응하나요?</H2>
      <p style={body}>
        &ldquo;알바한테 무슨 퇴직금이야&rdquo; — 이런 말을 듣는 알바생이 많아요. 하지만 조건을 충족했는데 안 주면 명백한 법 위반이죠. 대응 방법은 정해져 있어요.
      </p>
      <p style={body}>
        첫째, <strong>내용증명</strong>을 보내세요. &ldquo;퇴직금 ○○원을 14일 이내에 지급해달라&rdquo;는 내용을 우체국에서 보내면 돼요. 비용은 몇천 원이고, 사업주에게 법적 의지를 보여주는 효과가 있죠. 이것만으로 지급하는 경우도 꽤 있어요.
      </p>
      <p style={body}>
        둘째, <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 임금체불 진정</a>을 넣으세요. 관할 노동청에 방문하거나 온라인(고용노동부 민원마당)으로 할 수 있어요. 근로감독관이 사업주를 조사하고 시정명령을 내리죠. 형사처벌(<strong>3년 이하 징역 또는 3천만 원 이하 벌금</strong>)도 가능해요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>소액 퇴직금도 신고할 수 있나요?</H2>
      <p style={body}>
        금액과 관계없이 신고할 수 있어요. 퇴직금이 30만 원이든 300만 원이든, 지급 의무가 있는 금액을 안 줬다면 임금체불이에요. 고용노동부는 소액 사건도 처리하고 있죠.
      </p>
      <p style={body}>
        사실 소액이라서 포기하는 알바생이 많은데, 사업주 입장에서는 형사처벌 리스크 때문에 소액 퇴직금이라도 빨리 지급하는 경우가 많아요. 노동부에 진정이 들어가면 사업주에게 조사 통보가 가기 때문이죠. 신고 한 번으로 해결되는 경우가 적지 않아요.
      </p>
      <p style={body}>
        소멸시효 <strong>3년</strong>도 잊지 마세요. 퇴직 후 &ldquo;나중에 해야지&rdquo; 하다가 3년이 지나면 법적으로 청구할 수 없어요. 지급 기한은 퇴직일로부터 <strong>14일</strong>이고, 기한을 넘기면 <strong>연 20%</strong> 지연이자도 함께 청구할 수 있죠. 빠르게 움직이는 게 유리해요.
      </p>

      <GreenBox title="알바 퇴직금 핵심 정리">
        알바도 <strong>1년 이상 + 주 15시간 이상</strong>이면 퇴직금 대상<br />
        소액이라도 <strong>노동부 진정 가능</strong> — 형사처벌 리스크로 사업주가 빨리 지급하는 경우가 많아요<br />
        소멸시효 <strong>3년</strong> / 지급 기한 <strong>14일</strong> / 지연이자 <strong>연 20%</strong>
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        알바 퇴직금 규정에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
