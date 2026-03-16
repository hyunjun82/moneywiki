"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "소송이 진행 중이고 퇴직금에 가압류가 걸렸어요" },
  { id: "c2", label: "채권자가 퇴직금 가압류를 신청했다는 통보를 받았어요" },
  { id: "c3", label: "가압류 해제 방법이 궁금해요" },
  { id: "c4", label: "가압류 상태에서 퇴직하면 어떻게 되는지 알고 싶어요" },
];

const CHECKLIST = [
  "가압류 결정문 확인 — 법원에서 보낸 결정문 내용 검토",
  "가압류 금액 확인 — 퇴직금 중 얼마가 보류되는지 확인",
  "담보 제공 여부 확인 — 채무자가 담보를 제공하면 해제 가능",
  "이의 신청 검토 — 가압류에 대한 이의 신청 가능 여부",
  "법률 상담 — 대한법률구조공단(132) 무료 상담 활용",
];

const FAQS = [
  {
    q: "가압류와 압류, 어떤 차이가 있나요?",
    a: "가압류는 소송 전 또는 소송 중에 재산을 보전하는 조치예요. '아직 판결이 안 났지만 재산이 없어질 수 있으니 미리 묶어두는' 거죠. 압류는 판결 확정 후 강제집행이에요.",
  },
  {
    q: "가압류가 걸리면 퇴직금을 아예 못 받나요?",
    a: "전부는 아니에요. 가압류도 압류와 마찬가지로 퇴직금의 1/2에 대해서는 금지돼요. 나머지 1/2은 받을 수 있죠.",
  },
  {
    q: "가압류 상태에서 퇴직하면 어떻게 되나요?",
    a: "회사가 가압류된 금액만큼 지급을 보류하고, 나머지를 근로자에게 지급해요. 보류된 금액은 소송 결과에 따라 처리되죠.",
  },
  {
    q: "가압류를 풀려면 어떻게 해야 하나요?",
    a: "법원에 담보를 제공하면 해제할 수 있어요. 가압류 금액에 해당하는 보증금을 법원에 공탁하면 가압류가 취소되죠. 이의 신청을 통해서도 다툴 수 있어요.",
  },
  {
    q: "가압류가 있으면 IRP 인출이 안 되나요?",
    a: "가압류 대상 금액만큼은 인출이 제한될 수 있어요. 금융기관에서 법원 결정을 확인하고 인출을 보류하죠. 가압류 범위 밖의 금액은 인출 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "민사집행법 제276조 — 가압류", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "민사집행법 제246조 — 압류 금지 채권", url: "https://www.law.go.kr/법령/민사집행법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "대한법률구조공단 — 무료 법률 상담(132)", url: "https://www.klac.or.kr" },
      { label: "법원 전자소송 — 가압류 관련 신청", url: "https://ecfs.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-압류",
    title: "퇴직금 압류",
    description: "퇴직금 압류 한도와 보호 방법을 안내해요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌",
    description: "IRP 계좌의 보호 기능과 활용법을 안내해요.",
  },
  {
    slug: "퇴직금-지급-기한",
    title: "퇴직금 지급 기한",
    description: "퇴직금 14일 지급 원칙을 안내해요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-가압류" />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 가압류 · 소송 보전</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 가압류,<br />
        소송 중에 퇴직금을 지킬 수 있나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;소송이 진행 중인데, 퇴직금에 가압류가 걸렸어요. 퇴직금을 못 받게 되는 건가요?&rdquo;<br />
        전부는 아니에요. 가압류도 <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a>에 따라 퇴직금의 <strong>1/2은 보호</strong>돼요.
        가압류가 뭔지, 압류와 어떻게 다른지, 해제하는 방법은 뭔지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 가압류가 뭔가요?</H2>
      <p style={body}>
        가압류는 소송 전 또는 소송 중에 <strong>채무자의 재산을 미리 보전</strong>하는 법원의 조치예요. 채권자가 &ldquo;소송이 끝나기 전에 채무자가 재산을 빼돌릴 수 있으니 미리 묶어달라&rdquo;고 법원에 신청하면 결정이 나오죠.
      </p>
      <p style={body}>
        퇴직금에 가압류가 걸리면 회사가 해당 금액만큼 지급을 <strong>보류</strong>해요. 아직 채권자에게 넘어간 건 아니고, &ldquo;묶여 있는 상태&rdquo;예요. 소송 결과에 따라 채권자에게 가거나, 가압류가 풀려서 근로자에게 돌아오거나 하죠.
      </p>
      <p style={body}>
        가압류 결정은 법원이 하고, 결정문이 회사와 근로자 양쪽에 통보돼요. 통보를 받으면 가압류 금액, 채권자 정보, 이의 신청 방법 등을 확인할 수 있어요.
      </p>

      <GreenBox title="가압류 핵심 정리">
        <strong>목적</strong>: 소송 전·중 재산 보전 (재산 유출 방지)<br />
        <strong>효과</strong>: 퇴직금 지급 보류 (채권자에게 넘어간 건 아님)<br />
        <strong>보호</strong>: 퇴직금의 1/2은 가압류 금지
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="가압류 결정문을 확인하고, 해제 방법을 검토하세요. 법률 상담(132)을 받으세요."
        partialMatchText="가압류 우려가 있다면 미리 법률 상담을 받아두는 게 좋아요."
      />

      <Divider />

      <H2>가압류와 압류, 어떻게 다른가요?</H2>
      <p style={body}>
        <strong>가압류</strong>는 &ldquo;임시 조치&rdquo;예요. 판결이 확정되기 전에 재산을 묶어두는 거죠. 소송에서 이기면 이 가압류가 &ldquo;본압류&rdquo;로 전환되고, 지면 가압류가 풀려요.
      </p>
      <p style={body}>
        <strong>압류</strong>는 판결이 확정된 후의 &ldquo;강제집행&rdquo;이에요. 이미 법원 판결로 채무가 확정된 상태에서 채권자가 돈을 가져가는 절차죠. 가압류보다 강력하고 최종적인 조치예요.
      </p>
      <p style={body}>
        두 가지 모두 퇴직금의 <strong>1/2은 보호</strong>돼요. <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법 제246조</a>가 퇴직금 채권의 1/2에 대한 압류(가압류 포함)를 금지하고 있거든요. 이 보호는 가압류든 압류든 동일하게 적용돼요.
      </p>

      <BorderBox title="가압류 vs 압류 한눈에 비교">
        <strong>가압류</strong>: 소송 전·중 임시 보전 → 판결 전 → 해제 가능<br />
        <strong>압류</strong>: 판결 후 강제집행 → 판결 확정 → 해제 어려움<br />
        <strong>공통</strong>: 퇴직금의 1/2 보호 (민사집행법 제246조)
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금 가압류 한도는 있나요?</H2>
      <p style={body}>
        <a href="/w/퇴직금-압류" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 압류</a>와 마찬가지로 <strong>1/2 초과 가압류는 금지</strong>돼요. 퇴직금이 4,000만 원이면 최대 2,000만 원까지만 가압류할 수 있고, 나머지 2,000만 원은 근로자가 받을 수 있죠.
      </p>
      <p style={body}>
        가압류 결정문에 금액이 명시돼 있어요. 이 금액이 퇴직금의 1/2을 초과하면 법원에 이의를 제기할 수 있죠. 실제로 법원에서 초과 부분을 취소하는 결정을 내리기도 해요.
      </p>
      <p style={body}>
        가압류가 여러 건 걸린 경우에도 합산 한도가 1/2이에요. 채권자 A가 500만 원, 채권자 B가 700만 원을 가압류했다면 합산 1,200만 원이 한도 이내인지 확인하세요.
      </p>

      <Divider />

      <H2>가압류를 막기 위해 할 수 있는 것들은?</H2>
      <p style={body}>
        가압류 자체를 사전에 막기는 어려워요. 채권자가 법원에 신청하면 법원이 심사해서 결정하니까요. 대신 <strong>가압류 결정에 대한 이의 신청</strong>으로 다툴 수 있어요. 가압류 사유가 부당하거나 금액이 과다하다는 걸 소명하면 되죠.
      </p>
      <p style={body}>
        <strong>담보 제공</strong>으로 가압류를 풀 수도 있어요. 가압류 금액에 해당하는 보증금을 법원에 공탁하면 가압류가 취소돼요. &ldquo;돈은 여기 있으니 재산을 풀어달라&rdquo;는 논리죠.
      </p>
      <p style={body}>
        퇴직금을 IRP에 유지하는 것도 보호에 도움이 돼요. 퇴직연금 수급권은 일반 예금보다 법적 보호가 강하니까요. 일반 통장으로 빼는 것보다 IRP에 두는 게 안전하죠.
      </p>

      <Divider />

      <H2>가압류된 퇴직금 해제 방법은?</H2>
      <p style={body}>
        가장 확실한 방법은 <strong>소송에서 이기는 것</strong>이에요. 판결에서 채권자 주장이 기각되면 가압류도 자동으로 풀리죠. 소송 결과가 유리하다면 끝까지 다투는 게 최선이에요.
      </p>
      <p style={body}>
        소송 전이나 소송 중에도 해제 방법이 있어요. 법원에 <strong>담보를 제공</strong>(공탁)하면 가압류를 취소해달라고 신청할 수 있죠. 공탁금은 소송 종료 후 돌려받을 수 있어요.
      </p>
      <p style={body}>
        가압류 결정 자체에 대한 <strong>이의 신청</strong>도 가능해요. 가압류 사유가 부당하거나, 보전의 필요성이 없다는 걸 소명하면 법원이 가압류를 취소할 수 있죠. 복잡한 절차이니 <a href="https://www.klac.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대한법률구조공단</a>(132)에서 무료 법률 상담을 받으세요.
      </p>

      <SectionBadge>대응 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 가압류에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민사집행법을 바탕으로 작성됐어요. 개인 상황에 따라 법률 적용이 달라질 수 있으니, 법률 전문가 상담을 받으세요." />
    </ArticleLayout>
  );
}
