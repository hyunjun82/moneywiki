"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 다가구주택 경계벽을 변경하는 공사를 하려는데 허가가 필요한지 모르는 상황
// Q2. 경계벽 공사가 대수선에 해당하는지 판단하고 허가 또는 신고를 진행한다
// Q3. 대수선 정의(주요 구조부 변경), 경계벽 해당 여부, 허가/신고 구분, 위반 시 처벌
// Q4. GreenBox로 대수선 기준 + Steps로 허가 절차 + BorderBox로 위반 처벌

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const PERMIT_STEPS = [
  { title: "공사 범위 확인", desc: "경계벽 철거·이동·신설이 주요 구조부(내력벽)에 해당하는지 전문가에게 확인해요.", tip: "내력벽이면 대수선, 비내력벽이면 경미한 수선" },
  { title: "구청 건축과 사전 상담", desc: "관할 구청 건축과에 공사 내용을 설명하고 허가/신고 중 어떤 절차가 필요한지 확인해요." },
  { title: "허가 신청 또는 신고", desc: "대수선이면 건축허가 신청, 경미한 대수선이면 건축신고로 처리해요.", tip: "설계도서, 구조안전확인서 등 첨부" },
  { title: "공사 진행", desc: "허가 또는 신고 후 공사를 시작해요. 구조 변경은 반드시 구조기술사 감리 하에 진행해야 안전해요." },
  { title: "사용승인 신청", desc: "공사 완료 후 사용승인(준공검사)을 받아야 해요. 미신청 시 과태료 부과 가능해요." },
];

const FAQS = [
  { q: "비내력벽(칸막이벽) 철거도 허가가 필요한가요?", a: "비내력벽은 주요 구조부가 아니라서 대수선에 해당하지 않아요. 다만 방화구획 벽이면 소방법 관련 별도 검토가 필요해요." },
  { q: "대수선 허가 없이 공사하면 어떻게 되나요?", a: "건축법 위반으로 3년 이하 징역 또는 5억원 이하 벌금에 처할 수 있어요. 원상복구 명령도 받을 수 있고요." },
  { q: "내력벽인지 어떻게 구분하나요?", a: "건축 도면에서 확인할 수 있어요. 일반적으로 두께 15cm 이상이면 내력벽일 가능성이 높아요. 정확한 판단은 구조기술사에게 맡기세요." },
  { q: "다세대주택도 같은 기준인가요?", a: "네, 다세대주택도 건축법상 대수선 기준은 동일해요. 주요 구조부를 변경하면 대수선 허가가 필요해요." },
  { q: "허가 비용은 얼마나 드나요?", a: "허가 수수료는 수만원 수준이에요. 다만 설계도서 작성, 구조안전확인서 발급 등 전문가 비용이 수십만원~수백만원 들 수 있어요." },
];

const SOURCES = [
  { name: "건축법 제2조 (대수선)", href: "https://www.law.go.kr/법령/건축법" },
  { name: "건축법 시행령 제3조의2", href: "https://www.law.go.kr/법령/건축법시행령" },
];

const RELATED = [
  { slug: "건물-안전점검-C등급-조치", title: "건물 안전점검 C등급 조치", description: "안전등급 C 판정 시 해야 할 일." },
  { slug: "농지전용허가-처벌", title: "농지전용허가 위반 처벌", description: "허가 없이 농지 전용 시 벌칙." },
  { slug: "공공임대주택-하자보수-계약해지", title: "공공임대 하자보수 방법", description: "하자 발견 시 보수 요청 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축 · 대수선</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        다가구주택 경계벽 공사<br />
        대수선 허가가 필요한 경우와 절차
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        다가구주택 경계벽을 허물거나 옮기려는데 허가를 받아야 하는 건지 헷갈리죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/건축법" style={{ color: "#1D9E75", textDecoration: "underline" }}>건축법 제2조</a>에 따라 주요 구조부(내력벽)를 변경하면 대수선에 해당해서 건축허가가 필요해요. 경계벽이 내력벽이면 허가, 비내력벽(칸막이)이면 별도 허가 없이 가능해요. 구분이 중요한 이유는 무허가 공사 시 3년 이하 징역 또는 5억원 이하 벌금이 부과될 수 있기 때문이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>경계벽이 내력벽인지 먼저 확인해야 해요</H2>
      <p style={body}>
        대수선 여부는 벽의 종류에 달려 있어요. 건물 하중을 지탱하는 내력벽을 건드리면 대수선이고, 단순 공간 구획용 비내력벽이면 대수선이 아니에요.
      </p>
      <GreenBox>
        대수선에 해당하는 경우{"\n"}
        - 내력벽(주요 구조부)을 철거·이동·신설{"\n"}
        - 기둥, 보, 지붕틀, 바닥 등 주요 구조부 변경{"\n"}
        - 3개 이상 기둥의 위치 변경{"\n"}
        - 방화벽·방화구획 변경
      </GreenBox>
      <p style={body}>
        정확한 판단은 건축 도면을 확인하거나 구조기술사에게 맡기세요. 내력벽을 비내력벽으로 잘못 판단해서 허가 없이 공사하면 구조 안전 문제와 법적 처벌이 함께 올 수 있어요.
      </p>

      <CategoryButton label="부동산" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>허가 절차는 이렇게 진행돼요</H2>
      <p style={body}>
        대수선 허가가 필요하다면 관할 구청 건축과에 신청해요. 설계도서와 구조안전확인서가 핵심 서류예요.
      </p>
      <SectionBadge>대수선 허가 5단계</SectionBadge>
      <Steps steps={PERMIT_STEPS} />
      <p style={body}>
        사전 상담이 중요해요. 구청 건축과에서 공사 범위를 보고 허가인지 신고인지 안내해줘요. 불필요한 비용을 줄일 수 있어요.
      </p>

      <Divider />

      <H2>무허가 공사 시 처벌은 이렇게 돼요</H2>
      <p style={body}>
        대수선에 해당하는 공사를 허가 없이 진행하면 건축법 위반이에요.
      </p>
      <BorderBox>
        <strong>무허가 대수선 처벌</strong><br />
        - 3년 이하 징역 또는 5억원 이하 벌금<br />
        - 원상복구 명령<br />
        - 이행강제금 반복 부과 가능<br />
        - 건축물대장 용도 변경 불가
      </BorderBox>
      <p style={body}>
        원상복구 비용까지 생각하면 처음부터 적법하게 허가받고 공사하는 게 훨씬 경제적이에요.
      </p>

      <Divider />

      <H2>경계벽 대수선 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>비내력벽 구분, 허가 비용, 위반 처벌 등 실무에서 궁금한 내용이에요.</p>
      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 건축법을 바탕으로 작성했어요. 지역·건물별 세부 조건이 다를 수 있으니 관할 구청 건축과에 확인하세요." />
    </ArticleLayout>
  );
}
