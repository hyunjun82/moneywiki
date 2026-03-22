"use client";

// Q1. 경매 낙찰받은 뒤 취소 가능한지 궁금하거나, 채무자로서 경매를 막고 싶은 상황
// Q2. 취소 사유에 해당하는지 확인하고 법원에 취소 신청서를 제출하는 행동
// Q3. 취소 사유 3가지(남을가망X, 집행불가, 권리변동), 취소vs취하 차이, 보증금 몰수, 신청 시점
// Q4. CompareTable(취소vs취하) + Steps(절차) + GreenBox(취소사유) + BorderBox(보증금 주의) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";
import { Steps } from "@/components/article-ui/Steps";

const COMPARE_ROWS = [
  { label: "주체", optionA: "채무자 또는 법원 직권", optionB: "채권자" },
  { label: "목적", optionA: "경매 절차를 무효로 돌림", optionB: "채권자가 스스로 경매를 포기" },
  { label: "효과", optionA: "처음부터 없었던 것으로 간주", optionB: "신청 시점부터 종료" },
  { label: "낙찰자 동의", optionA: "필요 없음", optionB: "강제경매는 낙찰자 동의 필요" },
  { label: "보증금", optionA: "매수인 취소 시 몰수", optionB: "반환" },
];

const CANCEL_STEPS = [
  { title: "취소 사유 해당 여부 확인", desc: "남을 가망 없음, 집행 불가, 중대한 권리 변동 중 어디에 해당하는지 파악해요." },
  { title: "법원에 취소 신청서 제출", desc: "취소 사유를 명확히 적고 증빙 자료를 함께 제출해요. 매수인은 대금 납부 전까지만 신청 가능해요." },
  { title: "법원 심리·결정", desc: "법원이 사유를 검토한 후 취소 여부를 결정해요. 필요하면 양측 의견을 들어요." },
  { title: "취소 결정 통지", desc: "취소가 인정되면 경매가 중단되고 부동산은 원래 소유자에게 남아요." },
];

const FAQS = [
  { q: "경매 낙찰 후 마음이 바뀌면 취소할 수 있나요?", a: "단순한 마음 변경으로는 안 돼요. 천재지변이나 중대한 권리 변동 같은 정당한 사유가 있어야 해요. 취소하면 보증금(최저매각가의 10%)은 몰수돼요." },
  { q: "법원이 알아서 취소하는 경우도 있나요?", a: "네. 최저매각가격으로 채권과 절차비용을 다 갚아도 남을 게 없다고 판단하면 법원이 직권으로 취소할 수 있어요." },
  { q: "채무자가 빚을 갚으면 경매가 취소되나요?", a: "채권자가 취하하는 형태예요. 채무자가 전액 변제하면 채권자가 경매를 취하하고 절차가 종료돼요." },
  { q: "취소 신청은 언제까지 가능한가요?", a: "매수인 취소는 매각허가결정 확정 후부터 대금 납부일 전까지예요. 대금을 내면 소유권이 넘어가서 취소가 안 돼요." },
  { q: "경매 취소와 매각불허가는 같은 건가요?", a: "달라요. 매각불허가는 매각허가 결정 전에 절차상 하자가 있을 때 법원이 매각을 허가하지 않는 거예요. 취소는 이미 진행된 절차를 무효로 돌리는 거고요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "민사집행법(법제처)", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "매각허가 결정(생활법령)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=306&ccfNo=4&cciNo=2&cnpClsNo=2" },
    ],
  },
];

const RELATED = [
  { slug: "경매-입찰-방법", title: "부동산 경매 입찰 방법", description: "경매 참여 전 입찰 절차와 주의사항을 확인하세요." },
  { slug: "경매-권리분석", title: "경매 권리분석 방법", description: "낙찰 전 권리관계를 분석해서 취소 리스크를 줄이세요." },
  { slug: "경매-낙찰-절차", title: "경매 낙찰 후 절차", description: "낙찰부터 등기까지 단계별 절차를 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매 · 법률</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 취소 사유, 언제 가능한가요?<br />
        취하와의 차이·절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        경매에 낙찰받았는데 갑자기 취소될 수도 있다고요?
        보증금까지 낸 상태라 불안하시죠.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a>에 따르면 경매 취소는 특정 사유가 있어야 가능해요.
        취소와 취하는 완전히 다른 개념이고, 보증금 처리도 달라요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>경매 취소 사유가 뭔가요?</H2>
      <p style={body}>
        경매 취소는 유효하게 진행되던 경매를 법적으로 무효로 돌리는 거예요.
        민사집행법에서 정한 취소 사유는 크게 세 가지예요.
      </p>

      <GreenBox title="경매 취소가 되는 3가지 사유">
        · <strong>남을 가망 없음</strong>: 최저매각가로 채권·비용을 갚아도 남을 게 없을 때 (법원 직권)<br />
        · <strong>집행 불가</strong>: 압류 자체가 잘못됐거나 채권이 소멸한 경우<br />
        · <strong>중대한 권리 변동</strong>: 매수인 책임 없는 사유(천재지변, 건물 전소, 예상 못한 선순위 권리 발견)
      </GreenBox>

      <Divider />

      <H2>취소와 취하, 뭐가 다른가요?</H2>
      <p style={body}>
        한 글자 차이지만 주체, 목적, 보증금 처리가 전부 달라요.
        취하는 채권자가 포기하는 것, 취소는 절차를 무효로 만드는 거예요.
      </p>

      <SectionBadge>취소 vs 취하 비교</SectionBadge>
      <CompareTable titleA="경매 취소" titleB="경매 취하" rows={COMPARE_ROWS} />

      <Divider />

      <H2>매수인이 취소 신청하면 보증금은요?</H2>
      <p style={body}>
        매수인이 매각허가결정 취소를 신청하면 보증금(최저매각가의 10%)은 <strong>몰수</strong>돼요.
        민사집행법 제113조에 따라 돌려받을 수 없어요.
      </p>

      <BorderBox>
        예를 들어 최저매각가 1억원인 부동산에 낙찰받았다면 보증금 1천만원을 냈을 거예요.
        취소하면 이 1천만원을 잃게 돼요. 취소 신청은 매각허가결정 확정 후부터 대금 납부 전까지만 가능하고,
        정당한 사유가 필요해요. 신중하게 결정하세요.
      </BorderBox>

      <Divider />

      <H2>경매 취소 절차는 이래요</H2>
      <p style={body}>
        취소 사유와 신청 주체에 따라 절차가 달라져요.
        채무자 또는 매수인이 직접 신청하는 경우 아래 순서로 진행돼요.
      </p>

      <SectionBadge>취소 신청 절차</SectionBadge>
      <Steps steps={CANCEL_STEPS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <RelatedArticles articles={RELATED} />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민사집행법 공개 자료를 바탕으로 작성했어요. 경매 취소는 법적으로 복잡한 절차이니 변호사·법무사 상담을 권장해요." />
    </ArticleLayout>
  );
}
