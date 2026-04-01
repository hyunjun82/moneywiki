"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 무보험 교통사고 보험사 청구에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 무보험차상해 특약 가입 시 내 보험사에 청구 가능해요, 최대 2억원까지 보상받을 수 있어요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "무보험 교통사고 보험사 청구는 누가 할 수 있나요?", a: "본인 또는 가족(배우자, 부모, 자녀, 며느리, 사위)이 무보험차상해 특약에 가입되어 있으면 청구할 수 있어요." },
  { q: "무보험 사고 보험 청구 시 얼마나 받을 수 있나요?", a: "책임보험 한도를 초과하는 치료비와 장해에 대해 최대 2억원까지 보상받을 수 있어요." },
  { q: "무보험 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "무보험 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "무보험 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "자동차손해배상 보장법", href: "https://www.law.go.kr/법령/자동차손해배상보장법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr" },
];

const RELATED = [
  { slug: "무보험-교통사고-보상", title: "무보험 교통사고 보상", description: "관련 내용 정리." },
  { slug: "무보험차-상해-특약", title: "무보험차 상해 특약", description: "관련 내용 정리." },
  { slug: "무보험-교통사고-대처법", title: "무보험 교통사고 대처법", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        무보험 교통사고 보험사 청구: 특약 보험금 받는 법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        무보험차상해 특약 가입 시 내 보험사에 청구 가능해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>무보험 교통사고 보험사 청구는 어떻게 하나요?</H2>
      <p style={body}>내 보험사에 무보험차상해 특약으로 청구하면 돼요.</p>
      <GreenBox>
        무보험차상해 특약 가입 시 내 보험사에 청구 가능해요{"\n"}
        최대 2억원까지 보상받을 수 있어요{"\n"}
        가족이 가입한 보험사에도 청구할 수 있어요
      </GreenBox>
      <p style={body}>가해자가 무보험이거나 책임보험만 가입한 경우, 피해자 본인이나 가족이 가입한 자동차보험의 무보험차상해 특약으로 보상받을 수 있어요. 자동차손해배상보장법에서 이런 경우를 대비해 만든 제도예요. 먼저 내 보험증권을 확인해서 무보험차상해 특약이 있는지 체크하고, 보험사 사고접수 콜센터에 전화해서 "무보험차 사고"라고 말하면 담당자가 청구 절차를 안내해줘요. 무보험 교통사고 대처법도 함께 참고하세요.</p>

      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>무보험 사고 보험 청구는 누가 할 수 있나요?</H2>
      <p style={body}>본인뿐 아니라 배우자, 부모, 자녀, 며느리, 사위도 청구할 수 있어요.</p>
      <BorderBox>
        <strong>무보험 사고 보험 청구는 누가 할 수 있나요?</strong><br />
        본인뿐 아니라 배우자, 부모, 자녀, 며느리, 사위도 청구할 수 있어요.<br />
        무보험차상해 특약의 피보험자 범위는 기명피보험자(차 주인) 및 그의 배우자, 부모, 자녀, 며느리, 사위까지 포함돼요. 예를 들어 본인은 차가 없어도 배우자가 A보험사, 자녀가 B보험사, 며느리가 C보험사에 무보험차
      </BorderBox>
      <p style={body}>무보험차상해 특약의 피보험자 범위는 기명피보험자(차 주인) 및 그의 배우자, 부모, 자녀, 며느리, 사위까지 포함돼요. 예를 들어 본인은 차가 없어도 배우자가 A보험사, 자녀가 B보험사, 며느리가 C보험사에 무보험차상해 특약을 가입했다면 A, B, C 중 아무 보험사에나 청구할 수 있어요. 여러 곳에 청구해도 되지만 총 보상액은 실제 손해액까지만 받을 수 있으니 참고하세요. 무보험차 상해 특약에서 자세한 가입 조건을 확인하세요.</p>

      <Divider />
      <H2>무보험 교통사고 보험금은 얼마나 받을 수 있나요?</H2>
      <p style={body}>치료비와 장해보상금 합쳐서 최대 2억원까지 받을 수 있어요.</p>
      <p style={body}>무보험차상해 특약은 책임보험 한도를 초과하는 치료비 및 장해에 대해 최고 2억원까지 보상해줘요. 급수별 치료비 한도는 따로 정해져 있지 않고 전체 보상 한도가 치료비 포함 2억원이에요. 단, 가해자와 이루어진 형사합의금(개인합의금)은 전액 공제되니까 주의하세요. 만약 형사합의로 1천만원을 받았다면 보험사는 실제 손해액에서 1천만원을 뺀 금액만 지급해요. 무보험 교통사고 보상에서 구체적인 보상 사례를 확인하세요.</p>

      <Divider />
      <H2>무보험 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
