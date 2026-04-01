"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 배우자와 별거 중인데 양육비를 전혀 안 줘서 법적으로 받을 수 있는 방법을 찾는 양육자
// Q2. 가정법원에 부양료 심판 청구서를 제출해서 법적으로 양육비를 확보하는 행동
// Q3. 부양료 심판 청구 개념, 절차(신청서→조정→심판), 산정 기준(소득·재산·자녀수), 청구 시점 이후만 소급, 강제집행
// Q4. Steps(절차) + GreenBox(핵심) + BorderBox(산정기준) + DocTable(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";
import { DocTable } from "@/components/article-ui/DocTable";

const CLAIM_STEPS = [
  { title: "부양료 심판 청구서 작성", desc: "가정법원 전자민원센터 또는 방문해서 신청서를 받아요. 별거 기간, 자녀 정보, 요청 금액을 적어요." },
  { title: "관할 가정법원에 제출", desc: "상대방 주소지 관할 가정법원에 신청서와 증빙서류를 제출해요." },
  { title: "조정 기일 (1~2개월)", desc: "법원에서 양측을 불러 합의를 시도해요. 합의되면 조정조서가 나오고 바로 효력이 생겨요." },
  { title: "심판 결정 (조정 불성립 시)", desc: "합의가 안 되면 법원이 소득·재산을 조사해서 양육비 금액을 결정해요. 결정문은 강제집행 가능해요.", tip: "신청부터 결정까지 보통 3~6개월" },
];

const DOCS = [
  { name: "부양료 심판 청구 신청서", required: true, where: "가정법원 전자민원센터" },
  { name: "혼인관계증명서", required: true, where: "정부24 또는 주민센터" },
  { name: "가족관계증명서", required: true, where: "정부24 또는 주민센터" },
  { name: "주민등록등본", required: true, where: "주민센터" },
  { name: "소득·재산 증빙", required: false, where: "급여명세서, 세금신고서 등" },
  { name: "양육비 지출 증빙", required: false, where: "교육비, 의료비 영수증 등" },
];

const FAQS = [
  { q: "별거 중 양육비를 과거분도 받을 수 있나요?", a: "안 돼요. 대법원 판례에 따르면 청구한 시점 이후부터만 받을 수 있어요. 미루지 말고 빨리 청구하는 게 중요해요." },
  { q: "양육비 청구하면 이혼소송에 불리한가요?", a: "관계없어요. 부양료 심판과 이혼소송은 별개 절차예요. 오히려 별거 중 경제적 안정을 확보하는 데 도움이 돼요." },
  { q: "상대방이 결정을 안 따르면요?", a: "심판 결정문은 집행권원이에요. 급여압류, 재산압류 등 강제집행이 가능해요. 양육비이행관리원에서 이행 지원도 해줘요." },
  { q: "양육비는 보통 얼마로 정해지나요?", a: "양측 소득, 재산, 자녀 나이·수를 종합해서 법원이 정해요. 상대방 월소득 300만원, 자녀 2명 기준으로 월 50~80만원 정도인 경우가 많아요." },
  { q: "혼자 하기 어려우면 무료 상담 받을 수 있나요?", a: "양육비이행관리원에서 무료 법률 지원을 해줘요. 대한법률구조공단에서도 무료 소송 대리를 받을 수 있어요." },
  { q: "별거가 아니라 이혼 소송 중이면요?", a: "이혼 소송 중에도 양육비 가처분 신청이 가능해요. 이혼 확정 전까지 임시로 양육비를 받을 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "양육비 산정기준(생활법령)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=5&cciNo=3&cnpClsNo=1" },
      { label: "가사소송법(법제처)", url: "https://www.law.go.kr/법령/가사소송법" },
      { label: "양육비이행확보 지원(생활법령)", url: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1659&ccfNo=2&cciNo=2&cnpClsNo=4" },
    ],
  },
];

const RELATED = [
  { slug: "이혼-소송-진행중-양육비-청구", title: "이혼 소송 중 양육비 청구", description: "이혼이 확정되기 전에 양육비를 받는 방법이에요." },
  { slug: "이혼-사유-별거-2년", title: "별거 2년이면 이혼 사유가 되나요?", description: "별거 기간이 이혼 사유로 인정되는 조건을 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 양육비 · 별거</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        별거 중 양육비 청구, 이혼 전에도 되나요?<br />
        부양료 심판 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        배우자와 별거 중인데 아이 양육비를 전혀 안 주시죠?
        이혼 전이라도 부양의무는 유지돼요.
        <a href="https://www.law.go.kr/법령/가사소송법" style={{ color: "#1D9E75", textDecoration: "underline" }}>가사소송법</a>에 따라 가정법원에 부양료 심판을 청구하면 법적으로 양육비를 받을 수 있어요.
        다만 청구한 시점 이후부터만 받을 수 있으니 미루지 마세요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>핵심부터 짚으면요</H2>
      <p style={body}>
        혼인관계가 유지되는 한 부부간 부양의무가 계속돼요.
        별거 중이든 이혼 소송 중이든 마찬가지예요.
      </p>

      <GreenBox title="별거 중 양육비 청구 핵심">
        · 법적 근거: 부부 부양의무 + 미성년 자녀 양육의무<br />
        · 청구 방법: 가정법원 부양료 심판 청구<br />
        · 소급 불가: 청구 시점 이후부터만 받을 수 있어요<br />
        · 강제집행: 심판 결정문으로 급여·재산 압류 가능<br />
        · 무료 지원: 양육비이행관리원, 대한법률구조공단
      </GreenBox>

      <Divider />

      <H2>청구 절차가 어떻게 되나요?</H2>
      <p style={body}>
        가정법원에 신청서를 내면 조정을 먼저 시도하고, 합의가 안 되면 법원이 직접 금액을 정해요.
        결정문은 집행권원이라 안 주면 강제집행도 돼요.
      </p>

      <SectionBadge>부양료 심판 청구 절차</SectionBadge>
      <Steps steps={CLAIM_STEPS} />

      <Divider />

      <H2>양육비는 어떤 기준으로 정해지나요?</H2>
      <p style={body}>
        법으로 정해진 고정 금액은 없어요. 법원이 개별 사정을 보고 판단해요.
      </p>

      <BorderBox>
        양육비 산정 시 고려하는 요소예요.<br />
        · 양쪽 부모의 직업, 월소득, 재산<br />
        · 자녀 나이, 수, 교육비, 의료비<br />
        · 동거했을 때 예상되는 생활비와 비교<br />
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=5&cciNo=3&cnpClsNo=1" style={{ color: "#1D9E75", textDecoration: "underline" }}>대법원 양육비 산정기준표</a>를 참고하되,
        개별 사정에 따라 조정돼요.
      </BorderBox>

      <Divider />

      <H2>어떤 서류를 준비해야 하나요?</H2>
      <p style={body}>
        기본 신분 서류와 함께 소득·양육비 관련 증빙을 준비하면 유리해요.
      </p>

      <SectionBadge>제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <RelatedArticles items={RELATED} />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 가사소송법 및 찾기쉬운 생활법령정보를 바탕으로 작성했어요. 개별 사건의 양육비 금액은 법원 판단에 따라 달라지니 법률 전문가 상담을 권장해요." />
    </ArticleLayout>
  );
}
