"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났는데 임금이나 퇴직금을 못 받았어요" },
  { id: "c2", label: "재직 중 임금 지급일이 지났는데 월급을 못 받았어요" },
  { id: "c3", label: "미지급 금액과 지급 기한을 알고 있어요" },
  { id: "c4", label: "근로계약서나 급여명세서 등 증빙이 있어요" },
];

const FAQS = [
  {
    q: "임금 지연이자와 퇴직금 지연이자가 다른가요?",
    a: "이자율은 둘 다 연 20%로 같아요. 다만 기산점이 달라요. 임금은 약정 지급일 다음 날부터, 퇴직금은 퇴직 후 15일째부터 이자가 시작되죠.",
  },
  {
    q: "재직 중에도 지연이자를 청구할 수 있나요?",
    a: "재직 중이라면 연 20%가 아니라 연 6%(상법 기준) 또는 약정이율이 적용돼요. 퇴직 후에는 연 20%로 올라가죠.",
  },
  {
    q: "지연이자에 세금이 붙나요?",
    a: "지연이자는 이자소득이 아니라 손해배상 성격이에요. 소득세가 부과되지 않죠.",
  },
  {
    q: "회사가 일부만 줬을 때 이자는 어떻게 계산하나요?",
    a: "미지급 잔액에 대해서만 이자가 붙어요. 예를 들어 1,000만 원 중 600만 원을 받았다면 나머지 400만 원에 대해 연 20%를 적용하죠.",
  },
  {
    q: "5인 미만 사업장도 지연이자가 적용되나요?",
    a: "네, 적용돼요. 근로기준법 시행령 제17조는 사업장 규모에 관계없이 적용되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 (14일 이내 지급 의무)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제17조 — 미지급 임금에 대한 지연이자 (연 20%)", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 임금체불 신고 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당 — 온라인 진정 접수", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지연이자",
    title: "퇴직금 지연이자 연 20% 계산법",
    description: "14일이 지나도 퇴직금을 안 주면 연 20% 지연이자가 붙어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고, 어디에 어떻게 하나요?",
    description: "노동청 신고 장소, 준비 서류, 진행 절차를 한눈에 정리했어요.",
  },
  {
    slug: "퇴직금-지급-기한-14일-원칙-지연이자",
    title: "퇴직금 14일 원칙과 지연이자",
    description: "퇴직금은 퇴직 후 14일 안에 지급해야 하고, 넘기면 이자가 붙어요.",
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
          currentSlug="임금-퇴직금-미지급-이자"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 임금 · 미지급 이자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임금·퇴직금 미지급 이자<br />
        얼마나 받을 수 있나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;월급도 밀리고 퇴직금도 안 주는데, 이자라도 받을 수 있나요?&rdquo;<br />
        받을 수 있죠. <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제17조</a>에 따르면, 퇴직 후 14일이 지나도 임금·퇴직금을 안 주면 <strong>연 20%</strong> 지연이자가 붙어요.
        임금과 퇴직금의 이자 기산점 차이, 계산 방법, 청구 절차, 회사가 거부할 때 대응까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>임금과 퇴직금 미지급 이자가 다른가요?</H2>
      <p style={body}>
        이자율은 둘 다 <strong>연 20%</strong>로 같아요. 차이가 나는 건 <strong>기산점</strong>(이자 시작일)이에요. 퇴직금은 퇴직 후 14일이 지급 기한이니까, <strong>15일째</strong>부터 이자가 시작되죠. 밀린 임금은 원래 지급일이 기준이에요.
      </p>
      <p style={body}>
        예를 들어 3월 25일이 월급날인데 안 줬다면, 3월 26일부터 지연이자가 계산돼요. 퇴직금은 3월 1일에 퇴직했다면 3월 16일(15일째)부터 이자가 붙죠. 두 가지를 합산해서 청구할 수 있어요.
      </p>
      <p style={body}>
        한 가지 주의할 점이 있어요. <strong>재직 중</strong>에 임금이 밀린 경우에는 연 20%가 아니라 연 6%(상법상 법정이율)가 적용돼요. 연 20%는 &ldquo;퇴직 후&rdquo;에 지급하지 않는 경우에만 적용되거든요. 퇴직 시점을 기준으로 이자율이 바뀌는 거죠.
      </p>

      <GreenBox title="기산점 차이">
        <strong>밀린 임금</strong> — 원래 지급일 다음 날부터 연 20%<br />
        <strong>퇴직금</strong> — 퇴직 후 15일째(14일 기한 만료 다음 날)부터 연 20%<br />
        <strong>재직 중 체불</strong> — 연 6% (퇴직 후 연 20%로 전환)
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>미지급 이자 계산 방법은?</H2>
      <p style={body}>
        공식은 <strong>미지급 금액 x 20% x (지연 일수 / 365)</strong>이에요. 퇴직금 500만 원을 60일 동안 못 받았다면, 500만 x 20% x (60/365) = 약 16만 4,384원이죠. 임금 200만 원이 90일 밀렸다면, 200만 x 20% x (90/365) = 약 9만 8,630원이에요.
      </p>
      <p style={body}>
        임금과 퇴직금이 동시에 밀린 경우, 각각 따로 계산해서 합산하면 돼요. 기산점이 다르기 때문에 지연 일수가 다를 수 있거든요. 진정서에 항목별로 나눠서 적으면 근로감독관이 정확하게 검증해주죠.
      </p>
      <p style={body}>
        일부 지급된 경우에는 <strong>미지급 잔액</strong>에 대해서만 이자를 계산해요. 1,000만 원 중 600만 원을 30일째에 받았다면, 처음 30일은 1,000만 원에 대해, 그 이후는 400만 원에 대해 이자가 붙죠. 계산이 복잡하면 고용노동부(1350)에서 안내를 받을 수 있어요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>이자를 받으려면 어떤 절차가 필요한가요?</H2>
      <p style={body}>
        별도 절차가 필요 없어요. <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동청 진정서</a>에 퇴직금·임금 원금과 지연이자를 함께 기재하면 되죠. 진정서 양식에 &ldquo;청구 금액&rdquo;란이 있는데, 여기에 원금과 이자를 합산해서 적으면 돼요.
      </p>
      <p style={body}>
        민사 소송으로 청구할 때도 마찬가지예요. 소장에 &ldquo;미지급 임금·퇴직금 ○○원 및 근로기준법 시행령 제17조에 따른 연 20%의 지연이자&rdquo;라고 쓰면 되죠. 법원이 원금과 이자를 함께 판결해줘요.
      </p>
      <p style={body}>
        이자 금액을 정확히 모르겠으면 대략적인 금액만 적어도 괜찮아요. 근로감독관이나 법원이 기산점과 지연 일수를 확인해서 정확하게 재산정해주거든요. 중요한 건 &ldquo;지연이자도 청구한다&rdquo;는 의사 표시를 하는 거예요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>이자까지 포함해서 신고하는 방법은?</H2>
      <p style={body}>
        <a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서 온라인으로 접수하거나, 관할 노동청에 방문해서 진정서를 제출하면 돼요. 진정서에는 회사명, 근무 기간, 미지급 금액을 적고, 비고란에 &ldquo;지연이자 청구&rdquo;를 명시하세요.
      </p>
      <p style={body}>
        첨부 서류로 급여명세서, 통장 입금 내역, 근로계약서를 함께 제출하면 심사가 빨라져요. 이자 계산 내역을 별도로 작성해서 첨부하면 더 좋죠. &ldquo;퇴직금 ○○원 x 20% x ○일/365 = ○○원&rdquo; 형태로 정리하면 근로감독관이 바로 검증할 수 있어요.
      </p>
      <p style={body}>
        접수 후 근로감독관이 사업주에게 출석을 요구하고, 체불 사실이 확인되면 시정 지시를 내려요. 이때 원금뿐 아니라 지연이자까지 포함해서 시정 지시가 나가죠. 사업주가 불응하면 검찰에 송치돼요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>회사가 이자 지급을 거부하면?</H2>
      <p style={body}>
        지연이자는 법에 명시된 권리이기 때문에 거부할 수 없어요. &ldquo;원금은 줄 테니 이자는 빼달라&rdquo;는 건 법적 근거가 없는 요구죠. 합의 과정에서 이런 제안이 나오면 거절해도 돼요.
      </p>
      <p style={body}>
        노동청 시정 지시에도 이자 지급이 포함되기 때문에, 사업주가 원금만 주고 이자를 안 주면 시정 지시 불이행이에요. 이 경우 검찰 송치 사유가 추가되니까, 사업주 입장에서는 이자까지 주는 게 유리하죠.
      </p>
      <p style={body}>
        민사 소송에서는 더 확실해요. 법원 판결로 원금 + 이자가 확정되면 <strong>강제 집행</strong>이 가능하거든요. 사업주 통장이나 부동산을 압류해서 이자까지 전부 받아낼 수 있죠. 법적 권리이니 절대 포기하지 마세요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당돼요. 노동청에 임금·퇴직금 원금과 지연이자를 함께 청구하세요."
        partialMatchText="일부만 해당돼요. 고용노동부(1350)에 상담을 받아 방향을 잡아보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        임금·퇴직금 미지급 이자에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
