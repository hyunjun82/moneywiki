"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 농지를 팔려는데 8년 자경하면 양도세 감면된다고 들었고, 증명 방법이 궁금한 상황이에요.
// Q2. 자경 증명 서류를 준비해서 양도소득세 100% 감면을 신청하는 행동.
// Q3. 8년 자경+재촌 요건, 감면 한도(연 1억/5년 2억), 소득 제한(3,700만원), 증명 서류 목록, 상속 농지 특례.
// Q4. GreenBox(감면 핵심 요건) + DocTable(증명 서류) + BorderBox(감면 한도) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, DocTable, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "8년 자경하면 양도세가 얼마나 감면되나요?", a: "100% 전액 감면돼요. 다만 연간 1억원, 5년간 2억원 한도가 있어요. 초과분은 일반 양도소득세를 내야 해요." },
  { q: "농지에서 30km 떨어진 곳에 살아도 되나요?", a: "네. 농지 소재지·연접 시군구, 또는 농지로부터 직선거리 30km 이내에 거주하면서 경작하면 자경으로 인정돼요." },
  { q: "다른 소득이 있으면 자경 인정이 안 되나요?", a: "총급여+사업소득 합계가 연 3,700만원 이상인 해는 자경 기간에서 빠져요. 8년 중 그런 해를 제외하고 8년 이상이어야 해요." },
  { q: "상속받은 농지도 감면받을 수 있나요?", a: "부모님이 8년 이상 자경한 농지를 상속받으면, 상속일로부터 3년 내 양도 시 감면받을 수 있어요." },
  { q: "증빙 서류가 부족하면 어떻게 되나요?", a: "국세청에서 자경으로 인정 안 할 수 있어요. 농지원부, 농약 영수증, 직불금 내역 등 최대한 많이 모아서 제출하세요." },
  { q: "중간에 대지로 바뀌었다가 다시 농지가 되면?", a: "양도일 현재 농지로 분류돼 있어야 해요. 중간에 대지로 바뀌었다면 그 기간은 자경 기간에서 제외될 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "조세특례제한법 제69조 (자경농지 감면)", url: "https://www.law.go.kr/법령/조세특례제한법" },
      { label: "소득세법", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청 농지 양도세 감면 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산·세율·납부", description: "부동산 취득 시 세금 계산 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 양도소득세 · 농지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        농지 양도소득세 감면<br />
        8년 자경 증명 방법과 요건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        농지를 팔려는데 세금이 걱정되시죠.
        직접 농사지은 땅이라면 양도소득세를 100% 감면받을 수 있어요.
        8년 자경 요건과 증명 서류를 정확히 알아야 혜택을 놓치지 않아요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>8년 자경 감면, 핵심 요건 3가지</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법 제69조</a>에서
        자경농지 양도소득세 감면을 규정하고 있어요. 세 가지 요건을 모두 충족해야 해요.
      </p>

      <GreenBox>
        감면 핵심 요건이에요.<br />
        · <strong>재촌</strong>: 농지 소재지·연접 시군구 또는 직선거리 30km 이내 거주<br />
        · <strong>자경</strong>: 8년 이상 직접 경작 (농작업 상시 종사 또는 노동력 1/2 이상 투입)<br />
        · <strong>농지</strong>: 양도일 현재 농지로 분류돼 있어야 해요<br />
        · <strong>소득 제한</strong>: 총급여+사업소득 연 3,700만원 이상인 해는 자경 기간에서 제외
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>자경 증명에 필요한 서류예요</H2>
      <p style={body}>
        자경 여부 입증 책임은 납세자(농지 소유자)에게 있어요.
        여러 증빙을 함께 제출할수록 인정받을 가능성이 높아져요.
      </p>

      <SectionBadge>자경 증명 서류</SectionBadge>
      <DocTable docs={[
        { name: "농지원부", required: true, where: "시·구·읍면사무소" },
        { name: "농약·비료 구입 영수증", required: true, where: "농협·농자재 판매점" },
        { name: "농협 조합원 증명원", required: false, where: "관할 농협" },
        { name: "직불금 수령 내역", required: false, where: "농림축산식품부" },
        { name: "농작물 판매 내역", required: false, where: "농협·도매시장" },
        { name: "자경농지사실확인서", required: false, where: "농지위원장 발급" },
        { name: "농기계 구입·임차 내역", required: false, where: "구입처·임대업체" },
        { name: "이장 확인서·인우보증서", required: false, where: "이장·인근 주민" },
      ]} />

      <Divider />

      <H2>감면 한도와 상속 농지 특례</H2>
      <p style={body}>
        감면에는 한도가 있고, 상속받은 농지에 대한 특례도 있어요.
      </p>

      <SectionBadge>감면 한도</SectionBadge>
      <BorderBox>
        <strong>연간 한도</strong>: 1억원 (자경+대토감면 합산)<br />
        <strong>5년간 한도</strong>: 2억원<br /><br />
        양도차익이 3억원이라면 2억원까지만 감면, 나머지 1억원은 일반 양도소득세를 내요.<br /><br />
        <strong>상속 농지 특례</strong><br />
        부모님이 8년 이상 자경한 농지를 상속받으면, 상속일로부터 3년 내 양도 시 본인이 직접 경작하지 않아도 감면받을 수 있어요. 단, 피상속인의 자경이 입증돼야 해요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 조세특례제한법과 국세청 안내를 바탕으로 작성됐어요. 세법 개정 시 요건과 한도가 달라질 수 있으니 세무 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
