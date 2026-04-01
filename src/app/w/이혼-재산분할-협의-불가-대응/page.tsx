"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이혼 시 재산분할 협의가 안 돼서 법적 대응 방법을 알고 싶은 상황
// Q2. 협의 불가 시 법원 조정·심판·소송 절차를 파악하고, 적절한 대응을 선택한다
// Q3. 조정 신청, 재산분할 심판 청구, 소송 절차, 기여도 산정, 청구 기한(2년)
// Q4. Steps(대응 절차) + GreenBox(핵심 정리) + BorderBox(기여도 산정) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "가정법원에 재산분할 조정을 신청하세요", desc: "협의가 안 되면 가정법원에 조정을 신청할 수 있어요. 조정위원회가 양쪽 의견을 듣고 합의점을 찾아줘요. 비용이 적고 비공개로 진행돼요.", tip: "조정 불성립 시 자동으로 심판 절차로 넘어가요" },
  { title: "조정 불성립이면 재산분할 심판을 청구하세요", desc: "조정이 안 되면 법원이 직접 재산분할 금액과 방법을 결정해요. 양쪽의 기여도, 재산 형성 과정, 혼인 기간 등을 종합적으로 판단해요." },
  { title: "재산 목록과 증빙자료를 준비하세요", desc: "부동산 등기부등본, 예금 잔액증명, 급여명세서, 대출 내역 등을 모아야 해요. 상대방 명의 재산도 법원을 통해 조회할 수 있어요." },
  { title: "판결 후 강제집행으로 이행을 확보하세요", desc: "상대방이 판결대로 이행하지 않으면 강제집행을 신청할 수 있어요. 부동산 경매, 예금 압류 등의 방법이 있어요." },
];

const FAQS = [
  { q: "재산분할 청구 기한이 있나요?", a: "이혼한 날부터 2년 이내에 청구해야 해요. 2년이 지나면 청구권이 소멸돼요. 이혼 후 바로 하는 게 안전해요." },
  { q: "기여도는 어떻게 산정하나요?", a: "법원이 혼인 기간, 재산 형성 기여, 가사노동, 육아, 소득 등을 종합 판단해요. 보통 30~50% 수준이지만 구체적 사안에 따라 달라요." },
  { q: "상대방 재산을 어떻게 알 수 있나요?", a: "법원에 재산조회를 신청하면 금융자산, 부동산, 차량 등을 조회할 수 있어요. 개인이 직접 조회하는 건 안 되고 법원을 통해야 해요." },
  { q: "빚도 재산분할에 포함되나요?", a: "혼인 중 공동 생활을 위해 진 빚은 분할 대상이에요. 개인 도박 빚처럼 일방적인 채무는 제외될 수 있어요." },
  { q: "변호사 없이 혼자 할 수 있나요?", a: "조정은 혼자 할 수 있지만, 심판이나 소송은 변호사 조력을 받는 게 좋아요. 법률구조공단(132)에서 무료 법률 상담을 받을 수 있어요." },
  { q: "협의이혼인데 재산분할 협의가 안 됐어요", a: "협의이혼을 먼저 하고, 이혼 후 2년 이내에 재산분할 심판을 별도로 청구할 수 있어요. 이혼 자체와 재산분할은 분리해서 진행 가능해요." },
];

const SOURCES = [
  { name: "민법 제839조의2", href: "https://www.law.go.kr/법령/민법" },
  { name: "대한법률구조공단", href: "https://www.klac.or.kr" },
];

const RELATED = [
  { slug: "재산분할-대상-범위", title: "재산분할 대상 범위", description: "어디까지가 분할 대상인지." },
  { slug: "이혼-무료-법률상담-소송구조", title: "이혼 무료 법률상담", description: "법률구조공단 무료 상담." },
  { slug: "재산분할-혼인신고-전-재산-포함", title: "혼인 전 재산도 분할되나요?", description: "혼전 재산의 분할 여부." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>이혼 · 재산분할 · 법원 청구</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        재산분할 협의가 안 된다면?<br />
        법원 조정부터 심판 청구까지
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"이혼은 합의했는데, 재산 나누는 문제에서 계속 부딪혀요."</p>
      <p style={body}>
        협의가 안 되면 <strong>가정법원에 조정 또는 심판을 청구</strong>할 수 있어요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제839조의2</a>에 따라
        이혼 시 재산분할을 법원에 청구할 권리가 있어요.
        이혼한 날부터 <strong>2년 이내</strong>에 청구해야 하니 서두르세요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>협의 불가 시 대응 순서</H2>
      <Steps steps={STEPS} />
      <CategoryButton label="이혼·가족법" count={8} href="/category/이혼" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>재산분할 기여도란?</H2>
      <p style={body}>법원은 각자의 기여도를 판단해서 분할 비율을 정해요.</p>
      <GreenBox title="기여도 산정 기준">
        {"법원이 보는 요소:\n· 혼인 기간 (길수록 기여도↑)\n· 재산 형성에 대한 직접적 기여 (소득, 투자)\n· 가사노동·육아 기여\n· 재산 유지·관리 기여\n\n일반적 범위: 30~50%\n전업주부도 가사노동 기여 인정 (보통 30~40%)"}
      </GreenBox>
      <Divider />

      <H2>알아두면 좋은 것들</H2>
      <BorderBox>
        <strong>재산분할 핵심 포인트</strong>{"\n"}
        · 청구 기한: 이혼일로부터 2년{"\n"}
        · 분할 대상: 혼인 중 형성한 공동 재산{"\n"}
        · 제외: 상속·증여받은 특유재산 (원칙){"\n"}
        · 빚: 공동 목적 채무는 포함{"\n"}
        · 재산 은닉: 법원 재산조회로 확인 가능{"\n"}
        {"\n"}
        무료 법률상담: 대한법률구조공단 132
      </BorderBox>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 민법 기준으로 작성했어요. 구체적인 사안은 변호사 상담을 권해요. 무료 상담은 대한법률구조공단(132)에서 받을 수 있어요." />
    </ArticleLayout>
  );
}
