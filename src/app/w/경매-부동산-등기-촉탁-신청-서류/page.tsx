"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 경매로 부동산을 낙찰받았는데 등기를 어떻게 하는지, 직접 등기소에 가야 하는지 궁금한 상황
// Q2. 등기 촉탁 절차를 이해하고, 필요한 서류를 갖춰 법원에 제출한다
// Q3. 등기 촉탁 개념(법원 대신 등기), 필요 서류 목록, 비용 부담(매수인), 소유권 취득 시점(대금납부 시)
// Q4. GreenBox(핵심 결론) + Steps(절차) + Checklist(서류 목록) + BorderBox(비용) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "매각대금을 납부하세요",
    desc: "법원이 지정한 기한 내에 매각대금을 납부해야 해요. 대금을 완납하면 소유권이 매수인에게 넘어오고, 법원이 등기 촉탁 절차를 시작해요.",
    tip: "대금 납부 시 소유권 취득 — 등기 전이라도 법적으로 소유자예요",
  },
  {
    title: "등기 촉탁에 필요한 서류를 법원에 제출하세요",
    desc: "촉탁신청서, 등기사항증명서, 토지대장(또는 건축물대장), 주민등록등본, 취득세 납부 영수증 등을 법원에 제출해야 해요. 서류가 미비하면 등기가 지연돼요.",
  },
  {
    title: "취득세를 납부하세요",
    desc: "매각대금 납부 후 60일 이내에 취득세를 관할 시·군·구청에 신고·납부해야 해요. 납부 영수증을 법원에 제출해야 등기 촉탁이 진행돼요.",
    tip: "경매 취득세율: 주택 1~3%, 토지 4%",
  },
  {
    title: "법원이 등기소에 등기를 촉탁해요",
    desc: "서류와 비용이 확인되면 법원이 등기소에 소유권이전등기를 촉탁해요. 동시에 기존 근저당, 가압류 등 말소할 등기도 함께 처리해요. 보통 1~2주면 등기가 완료돼요.",
  },
];

const DOC_CHECKLIST = [
  "촉탁신청서 / 법원 양식 사용",
  "등기사항증명서(등기부등본) / 인터넷등기소 발급",
  "토지대장 또는 건축물대장 / 정부24 또는 시·군·구청 발급",
  "주민등록등본 / 정부24 또는 주민센터 발급",
  "취득세 납부 영수증 / 시·군·구청 납부 후 발급",
  "매각대금 납부 영수증 / 법원에서 발급",
];

const FAQS = [
  {
    q: "경매로 집 샀는데 직접 등기소에 가야 하나요?",
    a: "아니요. 법원이 등기소에 등기를 촉탁해줘요. 매수인은 필요한 서류만 법원에 제출하면 돼요. 일반 매매와 달리 직접 등기소를 방문할 필요가 없어요.",
  },
  {
    q: "등기 촉탁 비용은 누가 내나요?",
    a: "매수인이 내요. 소유권이전등기와 말소등기에 드는 등록면허세, 지방교육세, 법원 수수료를 매수인이 부담해야 해요.",
  },
  {
    q: "소유권은 언제 넘어오나요?",
    a: "매각대금을 완납한 시점에 소유권이 넘어와요. 등기 전이라도 법적으로는 내 소유예요. 다만 등기를 해야 제3자에게 대항할 수 있어요.",
  },
  {
    q: "말소되는 등기는 뭔가요?",
    a: "법원이 매각으로 소멸하는 권리를 일괄 말소해줘요. 근저당, 가압류, 압류, 임차권 등이 해당돼요. 말소 비용도 매수인이 부담하지만 법원이 한 번에 처리해줘요.",
  },
  {
    q: "등기가 늦어지면 어떻게 되나요?",
    a: "서류 미비나 취득세 미납이면 등기가 지연돼요. 대금 납부 후 60일 이내에 취득세를 납부하지 않으면 가산세가 붙으니 주의하세요.",
  },
  {
    q: "법무사를 따로 선임해야 하나요?",
    a: "등기 촉탁은 법원이 직접 하기 때문에 법무사가 필수는 아니에요. 다만 서류 준비가 어렵거나 복잡한 물건이면 법무사에게 대행을 맡기는 게 안전해요.",
  },
];

const SOURCES = [
  { name: "찾기쉬운 생활법령정보", href: "https://www.easylaw.go.kr" },
  { name: "대법원 인터넷등기소", href: "https://www.iros.go.kr" },
  { name: "민사집행법", href: "https://www.law.go.kr/법령/민사집행법" },
];

const RELATED = [
  { slug: "경매로-집-샀는데-전-주인-안-나가요-인도명령", title: "경매 인도명령 신청", description: "전 소유자가 안 나갈 때 대응 방법." },
  { slug: "부동산-경매-권리분석-말소기준권리", title: "경매 권리분석 방법", description: "말소기준권리와 배당 순서 분석." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "부동산 취득 시 내야 할 세금." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매 · 등기 촉탁</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 낙찰 후 등기는 어떻게 하나요?<br />
        등기 촉탁 절차와 필요 서류
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "경매로 집을 샀는데, 등기소에 직접 가서 등기를 해야 하나요?"
      </p>
      <p style={body}>
        아니요, 안 가도 돼요. 매각대금을 내면 <strong>법원이 등기소에 등기를 촉탁</strong>해줘요.
        매수인은 필요한 서류만 법원에 제출하면 되죠.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a>에 근거한 절차예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>등기 촉탁이 뭔가요?</H2>
      <p style={body}>
        일반 매매에서는 매수인이 직접 등기소에 가서 소유권이전등기를 해야 해요.
        하지만 경매에서는 법원이 대신 등기소에 등기를 신청해줘요.
        이걸 '등기 촉탁'이라고 해요.
      </p>

      <GreenBox title="경매 등기 촉탁 핵심">
        {"법원이 등기소에 등기를 대신 신청하는 것\n\n매수인이 할 일:\n1. 매각대금 납부\n2. 필요 서류 법원에 제출\n3. 취득세 납부\n\n법원이 할 일:\n1. 소유권이전등기 촉탁\n2. 기존 근저당·가압류 등 말소등기 촉탁"}
      </GreenBox>

      <CategoryButton label="부동산 경매" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>등기 촉탁 절차, 순서대로 해봐요</H2>
      <p style={body}>
        매각대금 납부부터 등기 완료까지, 순서대로 진행하면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>제출해야 할 서류 목록</H2>
      <p style={body}>
        서류 하나라도 빠지면 등기가 지연돼요. 미리 챙겨두세요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={DOC_CHECKLIST} />

      <Divider />

      <H2>비용은 얼마나 드나요?</H2>
      <p style={body}>
        등기 촉탁에 드는 비용은 전부 매수인이 부담해요.
        취득세가 가장 큰 비중이에요.
      </p>

      <BorderBox>
        <strong>경매 등기 촉탁 비용</strong>{"\n"}
        · 취득세: 매각가액의 1~4% (주택 1~3%, 토지 4%){"\n"}
        · 등록면허세: 매각가액의 0.2~0.4%{"\n"}
        · 지방교육세: 등록면허세의 20%{"\n"}
        · 법원 수수료: 건당 약 3,000~15,000원{"\n"}
        · 국민주택채권 매입: 매각가액의 1~5% 상당{"\n"}
        {"\n"}
        ※ 말소등기 비용도 매수인 부담
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 민사집행법 기준으로 작성했어요. 취득세율, 수수료 등은 지역과 법 개정에 따라 달라질 수 있으니 관할 법원과 시·군·구청에서 확인해 주세요." />
    </ArticleLayout>
  );
}
