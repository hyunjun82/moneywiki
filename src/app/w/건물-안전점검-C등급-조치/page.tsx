"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 건물 안전점검 C등급에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. C등급은 보통등급으로 주요부재 경미한 결함, 보수 및 보강 필요한 단계, 정기안전점검 반기 1회, 정밀안전진단 5년 1회 실시 의무, 미이행 시 과태료 1천만 원
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "C등급 받으면 즉시 보강 공사 해야 하나요?", a: "네, 보수 및 보강이 필요한 단계예요. 방치하면 D등급으로 떨어질 수 있고, 과태료도 나올 수 있어요." },
  { q: "안전점검 안 하면 어떻게 되나요?", a: "1천만 원 이하 과태료가 부과되고, 안전사고 발생 시 소유자가 책임을 져요." },
  { q: "C등급에서 A등급으로 올릴 수 있나요?", a: "보수 보강 공사를 하고 재점검을 받으면 등급이 상향될 수 있어요. 하지만 건물 노후도에 따라 한계가 있어요." },
  { q: "건물 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "건물 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "시설물의 안전 및 유지관리에 관한 특별법", href: "https://www.law.go.kr/법령/시설물의안전및유지관리에관한특별법" },
  { name: "시설물의 안전점검 및 정밀안전진단 실시 등에 관한 지침", href: "https://www.law.go.kr/행정규칙/시설물의안전점검및정밀안전진단실시등에관한지침" },
];

const RELATED = [
  { slug: "건물-정밀안전진단", title: "건물 정밀안전진단 절차", description: "관련 내용 정리." },
  { slug: "건축물-안전관리", title: "건축물 안전관리", description: "관련 내용 정리." },
  { slug: "시설물-유지관리", title: "시설물 유지관리", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건물 안전점검 C등급 조치 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        C등급은 보통등급으로 주요부재 경미한 결함, 보수 및 보강 필요한 단계
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>건물 안전점검 등급, 정확히 뭐예요?</H2>
      <p style={body}>건물 안전점검 등급은 건축물의 안전 상태를 A부터 E까지 5단계로 나눈 거예요. 정기안전점검이나 정밀안전진단을 실시한 후 전문가가 판정해요.</p>
      <GreenBox>
        C등급은 보통등급으로 주요부재 경미한 결함, 보수 및 보강 필요한 단계{"\n"}
        정기안전점검 반기 1회, 정밀안전진단 5년 1회 실시 의무, 미이행 시 과태료 1천만 원{"\n"}
        보수 보강 공사 후 재점검, D등급 이하 방치 시 사용중지·철거 명령 가능
      </GreenBox>
      <p style={body}>구조적으로 안전하고, 내구성에 문제가 없는 상태예요. 정기적인 유지관리만 하면 돼요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>C등급, 어떤 조치를 해야 하나요?</H2>
      <p style={body}>C등급을 받으면 보수 및 보강 공사를 해야 해요. 방치하면 등급이 떨어지고, 법적 책임도 생겨요.</p>
      <BorderBox>
        <strong>C등급, 어떤 조치를 해야 하나요?</strong><br />
        C등급을 받으면 보수 및 보강 공사를 해야 해요. 방치하면 등급이 떨어지고, 법적 책임도 생겨요.<br />
        안전점검 보고서에 나온 결함 부위를 보수하거나 보강해야 해요. 예를 들어, 균열이 생긴 벽을 보강하거나, 녹슨 철근을 교체하거나, 누수 부위를 방수 처리하는 거예요.
      </BorderBox>
      <p style={body}>안전점검 보고서에 나온 결함 부위를 보수하거나 보강해야 해요. 예를 들어, 균열이 생긴 벽을 보강하거나, 녹슨 철근을 교체하거나, 누수 부위를 방수 처리하는 거예요.</p>

      <Divider />
      <H2>안전점검 안 하면 어떻게 되나요?</H2>
      <p style={body}>시설물의 안전 및 유지관리에 관한 특별법에 따르면, 안전점검을 실시하지 않으면 과태료가 부과돼요.</p>
      <p style={body}>안전점검을 실시하지 않은 건물 소유자에게는 1천만 원 이하의 과태료가 부과돼요. 점검 비용보다 과태료가 더 클 수도 있으니까 제때 점검받는 게 훨씬 이득이에요.</p>
      <p style={body}>안전점검을 안 했다가 사고가 나면 건물 소유자가 민·형사상 책임을 져요. 건물이 무너지거나 사람이 다치면 배상 책임은 물론이고, 업무상 과실치사상죄로 형사처벌을 받을 수도 있어요.</p>

      <Divider />
      <H2>건물 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
