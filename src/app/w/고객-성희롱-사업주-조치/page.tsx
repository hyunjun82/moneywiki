"use client";
// Q1. 고객 성희롱 사업주 조치에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 근무 장소 변경, 유급휴가 부여 등 즉각 조치 필수, 고객에게 재발 방지 요청, 필요 시 형사 고소 지원
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "회사가 조치를 안 하면 어떻게 하나요?", a: "고용노동부에 신고하면 조사 후 시정 명령과 과태료가 부과돼요." },
  { q: "근무지 변경을 거부할 수 있나요?", a: "근로자가 원하지 않으면 다른 조치를 요청할 수 있어요. 강제는 안 돼요." },
  { q: "유급휴가는 며칠까지 가능한가요?", a: "법에 명시된 기한은 없지만, 회복에 필요한 기간만큼 부여해야 해요." },
  { q: "고객 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "고객 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "남녀고용평등과 일·가정 양립 지원에 관한 법률", href: "https://www.law.go.kr/법령/남녀고용평등과일가정양립지원에관한법률" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "고객응대근로자-정의-범위", title: "고객응대근로자 정의 범위", description: "관련 내용 정리." },
  { slug: "고객-폭언-건강장해-예방", title: "고객 폭언 건강장해 예방", description: "관련 내용 정리." },
  { slug: "고객-폭언-근로자-조치", title: "고객 폭언 근로자 조치", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고객 성희롱 사업주 조치·보호의무·신고 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        근무 장소 변경, 유급휴가 부여 등 즉각 조치 필수
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>고객 성희롱 발생 시 사업주 의무</H2>
      <p style={body}>남녀고용평등법에 따르면 사업주는 고객 등에 의한 성희롱 피해를 인지하면 즉시 조치해야 해요. 다시 말해 알고도 방치하면 법 위반이라는 거죠.</p>
      <GreenBox>
        근무 장소 변경, 유급휴가 부여 등 즉각 조치 필수{"\n"}
        고객에게 재발 방지 요청, 필요 시 형사 고소 지원{"\n"}
        미조치 시 500만원 이하 과태료 처분
      </GreenBox>
      <p style={body}>조치는 크게 두 가지예요. 첫째, 피해 근로자 보호 조치. 둘째, 가해 고객에 대한 대응 조치. 두 가지 모두 해야 법적 의무를 다하는 거예요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>피해 근로자 보호 조치 내용</H2>
      <p style={body}>가장 우선은 근무 장소 변경이에요. 가해 고객과 접촉하지 않도록 다른 부서나 다른 매장으로 배치해줘야 해요. 근로자가 원하지 않으면 강제할 수는 없어요.</p>
      <BorderBox>
        <strong>피해 근로자 보호 조치 내용</strong><br />
        가장 우선은 근무 장소 변경이에요. 가해 고객과 접촉하지 않도록 다른 부서나 다른 매장으로 배치해줘야 해요. 근로자가 원하지 않으면 강제할 수는 없어요.<br />
        유급휴가도 부여해야 해요. 심리적 충격을 회복할 시간이 필요하니까요. 법에 명시된 일수 제한은 없지만, 회복에 필요한 기간만큼 주는 게 원칙이에요.
      </BorderBox>
      <p style={body}>유급휴가도 부여해야 해요. 심리적 충격을 회복할 시간이 필요하니까요. 법에 명시된 일수 제한은 없지만, 회복에 필요한 기간만큼 주는 게 원칙이에요.</p>

      <Divider />
      <H2>가해 고객 대응 조치</H2>
      <p style={body}>회사는 가해 고객에게 재발 방지를 요청해야 해요. 서면이나 구두로 "성희롱 행위를 중단하라"고 명확히 전달하는 거예요. 고객이라도 근로자를 괴롭히면 안 된다는 걸 알려야 해요.</p>
      <p style={body}>필요하면 해당 고객의 출입을 제한하거나 서비스 제공을 거부할 수 있어요. 피해 근로자가 요청하면 형사 고소를 지원해야 해요. 증거 확보와 법률 상담을 도와주는 거죠.</p>
      <p style={body}>실제로 많은 기업이 "블랙리스트"를 운영해서 성희롱 가해 고객의 재방문을 차단하고 있어요. 고객이라는 이유로 무조건 참는 시대는 지났어요.</p>

      <Divider />
      <H2>고객 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
