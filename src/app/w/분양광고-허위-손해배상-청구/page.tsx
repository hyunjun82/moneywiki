"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 분양광고를 믿고 계약했는데 광고 내용이 거짓이어서 손해배상을 받고 싶은 상황
// Q2. 허위광고 증거를 모아서 내용증명 발송 → 협의 안 되면 소송으로 손해배상을 받아낸다
// Q3. 입주자모집공고의 법적 구속력, 손해배상 청구 근거, 소멸시효 3년, 증거 확보법
// Q4. Steps 청구 절차 + GreenBox 핵심 요약 + BorderBox 증거 목록 + Checklist 예방법

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "허위광고 증거부터 확보해요",
    desc: "입주자모집공고, 분양 카탈로그, 홍보 자료, 모델하우스 안내문 등을 모아요. 전철역 신설, 학교 개교 같은 호재성 정보가 거짓이라는 걸 증명할 수 있는 공식 자료(국토부 도시계획 등)도 함께 준비하세요.",
    tip: "모집공고는 청약홈(applyhome.co.kr)에서 조회 가능",
  },
  {
    title: "사업주체에게 내용증명을 보내요",
    desc: "허위광고 사실을 구체적으로 적고, 손해배상이나 계약 해제를 요구하는 내용증명을 보내요. 우체국에서 발송하면 법적 증거력이 있어요.",
    tip: "내용증명 3통 작성 (본인 1, 상대방 1, 우체국 보관 1)",
  },
  {
    title: "협의가 안 되면 법원에 소송을 제기해요",
    desc: "손해배상 소송에서는 허위광고 내용, 실제 손해액(감정평가 또는 시세 비교), 인과관계를 입증해야 해요. 변호사 비용과 소송 기간(1~2년)을 고려해서 실익이 있는지 먼저 따져보세요.",
    tip: "법률구조공단 132 무료 상담으로 소송 가치 판단 가능",
  },
  {
    title: "승소하면 판결금을 받아요",
    desc: "법원이 인정한 손해액만큼 배상받을 수 있어요. 전철역 미개통으로 주택 가격이 떨어졌다면 그 차액이 손해예요. 계약 해제를 선택했다면 계약금과 중도금을 돌려받아요.",
  },
];

const PREVENTION = [
  "입주자모집공고에서 '예정'과 '확정' 구분해서 읽기",
  "전철역·학교 등 호재 정보는 국토부·지자체에 직접 확인",
  "분양 현장 상담사 말만 믿지 않기 (서면 확인 필수)",
  "계약 전 주변 시세와 개발 계획 독립적으로 조사",
  "입주 후에도 주변 개발 계획 변경 여부 모니터링",
];

const FAQS = [
  { q: "분양 카탈로그 내용도 법적 책임이 있나요?", a: "입주자모집공고에 포함된 내용이면 법적 구속력이 있어요. 단순 홍보 카탈로그는 구속력이 약하지만, 공고에 명시됐다면 손해배상 대상이에요." },
  { q: "손해배상 청구 시한이 있나요?", a: "입주일로부터 3년 이내에 소송을 제기해야 해요. 3년이 지나면 소멸시효가 완성돼서 청구권을 잃어요." },
  { q: "계약 해제와 손해배상 중 뭐가 나을까요?", a: "집값이 올랐다면 계약 유지하면서 손해배상만 받는 게 나을 수 있어요. 집값이 떨어졌다면 계약 해제하고 계약금을 돌려받는 게 유리할 수 있고요." },
  { q: "'예정'이라고 써 있으면 책임이 없나요?", a: "그 시점에 실제로 계획이 있었다면 책임을 묻기 어려울 수 있어요. 처음부터 계획이 없었는데 '예정'이라고 썼으면 허위광고예요." },
  { q: "단체 소송도 가능한가요?", a: "같은 단지 입주자들이 공동으로 소송할 수 있어요. 변호사 비용을 나눌 수 있어서 개인 소송보다 부담이 적어요." },
];

const SOURCES = [
  { name: "주택법", href: "https://www.law.go.kr/법령/주택법" },
  { name: "표시광고의 공정화에 관한 법률", href: "https://www.law.go.kr/법령/표시광고의공정화에관한법률" },
  { name: "민법 제109조·제110조 (착오·사기)", href: "https://www.law.go.kr/법령/민법" },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "분양 아파트 취득 시 세금 계산법." },
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "매매·분양 후 거래신고 절차." },
  { slug: "공인중개사-업무범위", title: "공인중개사 업무범위", description: "중개사가 해줘야 하는 것과 아닌 것." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 분양 · 손해배상</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        분양광고가 거짓이면 배상받을 수 있을까?<br />
        허위광고 손해배상 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전철역이 생긴다고 해서 분양받았는데, 입주하고 보니 계획조차 없었다면 정말 억울하시죠?
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택법</a>에 따라 입주자모집공고는 법적 구속력이 있는 공식 문서예요. 여기에 거짓 정보가 있었다면 사업주체에게 손해배상을 청구할 수 있어요. 입주일로부터 3년 이내에 움직여야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>허위 분양광고, 법적 책임 근거가 뭔가요?</H2>
      <p style={body}>
        분양광고가 단순 홍보인지, 법적 책임이 있는 문서인지가 핵심이에요.
      </p>

      <GreenBox>
        입주자모집공고: 주택법에 따라 작성되는 공식 문서 → 분양계약의 일부로 간주{"\n"}
        허위 기재 시: 사업주체가 손해배상 책임{"\n"}
        청구 근거: 표시광고법(허위·과장 광고), 민법(착오·사기로 인한 취소){"\n"}
        소멸시효: 입주일로부터 3년
      </GreenBox>

      <p style={body}>
        상품 광고에 약간의 과장이 섞이는 건 상거래 관행으로 봐요. 하지만 전철역 개통, 학교 신설 같은 구체적 사실이 거짓이면 기망(속임)에 해당할 수 있어요.
      </p>

      <CategoryButton label="부동산" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>손해배상 청구, 이 순서로 진행해요</H2>
      <p style={body}>
        증거 확보부터 소송까지 단계별로 정리했어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>피해 예방, 계약 전에 이것만 확인해요</H2>
      <p style={body}>
        분양 계약 전에 미리 확인하면 피해를 막을 수 있어요.
      </p>

      <SectionBadge>예방 체크리스트</SectionBadge>
      <Checklist items={PREVENTION} />

      <Divider />

      <H2>분양광고 손해배상, 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실제 분쟁에서 자주 나오는 쟁점이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택법, 표시광고법, 민법을 바탕으로 작성했어요. 개별 사안에 따라 결과가 다를 수 있으니 구체적인 법률 상담은 법률구조공단(132) 또는 변호사에게 문의하세요." />
    </ArticleLayout>
  );
}
