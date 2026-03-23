"use client";

// Q1. 세금 고지서를 받았는데 금액이 잘못됐거나 납득이 안 돼서 이의를 제기하고 싶은 상황
// Q2. 90일 이내에 이의신청서를 세무서 또는 홈택스에 제출한다
// Q3. 이의신청 기한 90일(불변기한), 신청 방법(홈택스/세무서), 이의신청 중에도 납부의무, 불복 절차 흐름
// Q4. Steps로 이의신청 절차 + GreenBox로 기한·핵심 정리 + BorderBox로 불복 경로

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "고지서 내용 확인", desc: "세목, 과세기간, 세액 산출 근거를 꼼꼼히 확인해요. 어떤 부분이 잘못됐는지 파악하는 게 먼저예요." },
  { title: "이의신청서 작성", desc: "이의신청 이유와 증빙자료를 첨부해서 작성해요. 국세청 서식을 사용하면 돼요.", tip: "구체적 사실관계와 법적 근거를 명시하면 인용률 올라감" },
  { title: "세무서 또는 홈택스 제출", desc: "관할 세무서에 방문 제출하거나 홈택스에서 온라인 제출해요.", tip: "홈택스 > 신청/제출 > 이의신청" },
  { title: "세무서 검토 (30일)", desc: "접수일로부터 30일 이내에 결정이 나와요. 복잡하면 20일 연장 가능해요." },
  { title: "결과 통지 확인", desc: "인용(세금 조정)이면 감액 고지서를 받아요. 기각이면 심사·심판청구로 넘어갈 수 있어요." },
];

const DOCS = [
  { name: "이의신청서", required: true, where: "국세청 홈택스 또는 세무서" },
  { name: "세금 고지서 사본", required: true, where: "본인 보관분" },
  { name: "증빙서류 (영수증, 계약서 등)", required: true, where: "본인 준비" },
  { name: "위임장 (대리인 신청 시)", required: false, where: "본인 작성" },
];

const FAQS = [
  { q: "이의신청하면 세금을 안 내도 되나요?", a: "아니에요. 이의신청과 납부의무는 별개예요. 기한 내에 세금을 내야 가산세를 피할 수 있어요. 다만 징수유예를 함께 신청하면 납부를 미룰 수 있어요." },
  { q: "90일 기한을 하루라도 넘기면 어떻게 되나요?", a: "불변기한이라 하루라도 지나면 각하돼요. 이의신청 자체를 받아주지 않아요. 기한 엄수가 핵심이에요." },
  { q: "이의신청이 기각되면 다른 방법이 있나요?", a: "심사청구(국세청)나 심판청구(조세심판원)를 할 수 있어요. 그래도 안 되면 행정소송을 제기할 수 있고요. 단계별로 기한이 있으니 놓치지 마세요." },
  { q: "세무사 없이 혼자 이의신청할 수 있나요?", a: "네, 본인이 직접 할 수 있어요. 다만 세액이 크거나 쟁점이 복잡하면 세무사 도움을 받는 게 인용률을 높이는 데 유리해요." },
  { q: "지방세(재산세, 자동차세 등)도 같은 절차인가요?", a: "지방세는 지방자치단체에 이의신청해요. 기한은 동일하게 90일이고, 이후 조세심판원에 심판청구할 수 있어요. 홈택스가 아닌 위택스를 이용해요." },
  { q: "징수유예는 어떻게 신청하나요?", a: "이의신청서와 함께 징수유예 신청서를 제출하면 돼요. 납세 담보(부동산, 보증보험 등)를 제공해야 하는 경우가 있어요." },
];

const SOURCES = [
  { name: "국세기본법 제66조 (이의신청)", href: "https://www.law.go.kr/법령/국세기본법" },
  { name: "국세청 이의신청 안내", href: "https://www.nts.go.kr/taxpayer_advocate/cm/cntnts/cntntsView.do?mi=11811&cntntsId=8347" },
];

const RELATED = [
  { slug: "부가가치세-신고-기한-대상", title: "부가가치세 신고 기한·대상", description: "부가세 신고 시기와 대상 정리." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "매달 원천징수 신고하는 절차." },
  { slug: "법인세율-2026-과세표준-구간", title: "2026 법인세율 과세표준 구간", description: "법인세 세율과 구간별 세액." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 이의신청 · 불복</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        세금 이의신청 방법<br />
        90일 기한과 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        세금 고지서 금액이 이상한데 그냥 내야 하나 고민되죠. 잘못된 세금은 돌려받을 수 있어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/국세기본법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세기본법 제66조</a>에 따라 세금 고지서에 이의가 있으면 이의신청을 할 수 있어요. 기한은 고지서를 받은 날로부터 90일. 불변기한이라 하루라도 넘기면 각하돼요. 관할 세무서에 방문하거나 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 온라인으로 제출할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>이의신청 절차는 5단계로 끝나요</H2>
      <p style={body}>
        이의신청이라고 하면 복잡해 보이지만, 고지서 확인 → 신청서 작성 → 제출 → 결과 대기 순서예요. 홈택스에서 온라인으로도 가능해요.
      </p>

      <SectionBadge>세금 이의신청 5단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        접수 후 30일(연장 시 50일) 안에 결과가 나와요. 인용률은 약 20~30% 수준인데, 증빙자료가 확실하면 인용 가능성이 올라가요.
      </p>

      <CategoryButton label="세금" count={10} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>90일 불변기한, 반드시 지켜야 해요</H2>
      <p style={body}>
        이의신청 기한은 세금 고지서를 받은 날로부터 90일이에요. "불변기한"이라는 말은 어떤 사유로도 연장이 안 된다는 뜻이에요. 천재지변 같은 극단적 경우를 제외하면 하루라도 늦으면 각하돼요.
      </p>

      <GreenBox>
        이의신청 핵심 정리{"\n"}
        - 기한: 고지서 수령일로부터 90일 (불변기한){"\n"}
        - 제출처: 관할 세무서 또는 홈택스 온라인{"\n"}
        - 처리 기간: 접수일로부터 30일 (최대 50일){"\n"}
        - 납부의무: 이의신청과 무관하게 기한 내 납부 필요{"\n"}
        - 징수유예: 별도 신청 시 납부 연기 가능
      </GreenBox>

      <p style={body}>
        이의신청 중에도 세금 납부의무는 사라지지 않아요. 안 내면 가산세가 붙어요. 당장 내기 어려우면 징수유예 신청을 함께 하세요.
      </p>

      <Divider />

      <H2>필요한 서류는 이것만 챙기면 돼요</H2>
      <p style={body}>
        서류가 많지 않아요. 핵심은 이의신청서와 증빙자료예요. 왜 잘못됐다고 생각하는지 구체적으로 적는 게 중요해요.
      </p>

      <SectionBadge>이의신청 필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        증빙서류가 강력할수록 인용될 확률이 높아요. 거래 내역, 계약서, 영수증 등 세액 산출이 잘못됐다는 걸 보여줄 수 있는 자료를 모아두세요.
      </p>

      <Divider />

      <H2>기각됐다면? 다음 단계가 있어요</H2>
      <p style={body}>
        이의신청이 기각됐다고 끝이 아니에요. 불복 절차가 단계별로 마련돼 있어요.
      </p>

      <BorderBox>
        <strong>세금 불복 절차 흐름</strong><br />
        1단계: 이의신청 (세무서) → 90일 이내<br />
        2단계: 심사청구 (국세청) 또는 심판청구 (조세심판원) → 90일 이내<br />
        3단계: 행정소송 (법원) → 심판 결정 통지 후 90일 이내<br />
        * 각 단계 기한을 넘기면 다음 단계 진행 불가
      </BorderBox>

      <p style={body}>
        심사청구와 심판청구 중 하나만 선택할 수 있어요. 조세심판원이 상대적으로 납세자 인용률이 높다고 알려져 있어요. 세액이 크다면 세무사나 변호사 도움을 받는 걸 권해요.
      </p>

      <Divider />

      <H2>이의신청 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기한, 납부의무, 기각 후 절차에서 자주 헷갈리는 부분이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 국세기본법과 국세청 안내를 바탕으로 작성했어요. 세액과 상황에 따라 전문가 상담이 필요할 수 있어요." />
    </ArticleLayout>
  );
}
