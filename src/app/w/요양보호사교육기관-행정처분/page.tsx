"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 요양보호사교육기관 행정처분에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 허위·과장 광고나 부정교육 시 1차 경고, 2차 업무정지 6개월, 3차 지정취소 처분, 지정취소 시 3년간 재지정 불가, 수강생은 다른 기관에서 잔여 교육 이수 가능
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "교육기관이 지정취소되면 수강생은 어떻게 되나요?", a: "다른 지정교육기관에서 잔여 교육과정을 계속 이수할 수 있어요. 이미 받은 교육시간은 모두 인정돼요." },
  { q: "행정처분에 불복하려면 어떻게 하나요?", a: "처분 통지를 받은 날부터 90일 이내에 중앙행정심판위원회에 행정심판을 청구하면 돼요." },
  { q: "업무정지 기간에도 교육비를 환불받을 수 있나요?", a: "네, 가능해요. 업무정지로 교육을 못 받게 되면 남은 기간에 해당하는 교육비를 환불받을 수 있어요." },
  { q: "요양보호사교육기관 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "요양보호사교육기관 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "노인복지법", href: "https://www.law.go.kr/법령/노인복지법" },
  { name: "요양보호사 자격 및 교육기관 지정 등에 관한 규칙", href: "https://www.law.go.kr/법령/요양보호사자격및교육기관지정등에관한규칙" },
];

const RELATED = [
  { slug: "요양보호사-자격증-취득", title: "요양보호사 자격증 취득 방법", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        요양보호사교육기관 행정처분 기준과 사유
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        허위·과장 광고나 부정교육 시 1차 경고, 2차 업무정지 6개월, 3차 지정취소 처분
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>요양보호사교육기관 행정처분, 어떤 종류가 있나요?</H2>
      <p style={body}>요양보호사교육기관이 받는 행정처분은 크게 네 가지예요. 노인복지법 제39조의2와 관련 규칙에서 정하고 있어요.</p>
      <GreenBox>
        허위·과장 광고나 부정교육 시 1차 경고, 2차 업무정지 6개월, 3차 지정취소 처분{"\n"}
        지정취소 시 3년간 재지정 불가, 수강생은 다른 기관에서 잔여 교육 이수 가능{"\n"}
        행정심판 청구는 처분 통지받은 날부터 90일 이내, 중앙행정심판위원회에 제출
      </GreenBox>
      <p style={body}>가장 가벼운 처분이에요. 경미한 위반사항이 있을 때 받아요. 구체적으로 보면 교육과정 일부를 빠뜨리거나 시설 기준을 조금 미달한 경우예요. 경고를 받아도 교육은 계속할 수 있어요.</p>

      <CategoryButton label="복지" count={10} href="/category/%EB%B3%B5%EC%A7%80" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>행정처분 받는 주요 사유는?</H2>
      <p style={body}>행정처분을 받는 이유는 크게 다섯 가지로 나뉘어요. 실제 사례를 보면 이해하기 쉬워요.</p>
      <BorderBox>
        <strong>행정처분 받는 주요 사유는?</strong><br />
        행정처분을 받는 이유는 크게 다섯 가지로 나뉘어요. 실제 사례를 보면 이해하기 쉬워요.<br />
        처음 교육기관 지정받을 때 서류를 조작했거나 거짓 정보를 제출한 거예요. 예를 들어 강사 자격이 없는 사람을 있다고 속이거나, 실제로는 없는 시설을 있다고 한 경우예요.
      </BorderBox>
      <p style={body}>처음 교육기관 지정받을 때 서류를 조작했거나 거짓 정보를 제출한 거예요. 예를 들어 강사 자격이 없는 사람을 있다고 속이거나, 실제로는 없는 시설을 있다고 한 경우예요.</p>

      <Divider />
      <H2>행정처분 절차는 어떻게 진행되나요?</H2>
      <p style={body}>행정처분은 정해진 절차에 따라 진행돼요. 갑자기 처분하는 게 아니라 기회를 줘요.</p>
      <p style={body}>처분하기 전에 미리 통지해줘요. "이런 위반사항이 있어서 이런 처분을 하려고 하는데, 할 말 있으면 하세요" 하는 거죠. 보통 10일에서 20일 정도 시간을 줘요.</p>
      <p style={body}>의견서를 제출하면 참작해줄 수 있어요. 예를 들어 "강사가 갑자기 그만둬서 일시적으로 기준 미달이 됐지만 이미 새 강사를 채용했어요"라고 소명하면 처분이 가볍게 나오거나 취소될 수 있어요.</p>

      <Divider />
      <H2>요양보호사교육기관 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
