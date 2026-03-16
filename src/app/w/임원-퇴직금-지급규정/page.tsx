"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [{ id: "c1", label: "법인의 등기임원(이사, 감사 등)으로 재직했어요" },{ id: "c2", label: "정관 또는 주주총회에서 퇴직금 규정이 있어요" },{ id: "c3", label: "실질적으로 근로자처럼 일했어요(사용종속관계)" },{ id: "c4", label: "퇴직 후 3년이 지나지 않았어요" }];
const CHECKLIST = ["정관 사본 — 임원 퇴직금 규정 확인","주주총회 의사록 — 퇴직금 지급 결의 확인","급여명세서(최근 3개월) — 보수 산정 근거","법인등기부등본 — 임원 등기 여부 확인","근로계약서(있다면) — 근로자성 증빙"];
const FAQS = [{ q: "등기임원은 퇴직금을 못 받나요?", a: "근로기준법상 퇴직금은 받기 어려워요. 다만 정관이나 주주총회 결의로 퇴직금 지급 규정이 있다면 받을 수 있죠." },{ q: "비등기임원은 일반 직원처럼 퇴직금을 받나요?", a: "비등기임원이라도 실질적으로 사용종속관계에 있었다면 근로자로 인정받을 수 있고, 이 경우 일반 퇴직금 규정이 적용돼요." },{ q: "임원 퇴직금 세금은 다른가요?", a: "임원 퇴직소득에 대한 퇴직소득세 한도가 있어요. 2012년 이후 정관에서 정한 금액이 기존 한도를 초과하면 초과분에 근로소득세가 부과되죠." },{ q: "정관에 퇴직금 규정이 없으면?", a: "규정이 없다면 주주총회에서 별도 결의가 필요해요. 결의 없이 지급하면 세법상 부인될 수 있죠." },{ q: "임원 퇴직금을 줄이려는 변경이 있었다면?", a: "정관 변경은 주주총회 특별결의가 필요해요. 소급 적용은 원칙적으로 안 되고, 기존 기대권을 침해하면 법적 분쟁이 될 수 있죠." }];
const REFERENCES = [{ category: "법령", items: [{ label: "상법 — 이사의 보수", url: "https://www.law.go.kr/법령/상법" },{ label: "소득세법 — 퇴직소득 과세 기준", url: "https://www.law.go.kr/법령/소득세법" }] },{ category: "공식 자료", items: [{ label: "국세청 — 임원 퇴직소득 과세 안내", url: "https://www.nts.go.kr" },{ label: "고용노동부 — 근로자성 판단 기준", url: "https://www.moel.go.kr" }] }];
const RELATED = [{ slug: "임원퇴직금-지급-기한", title: "임원 퇴직금 지급 기한", description: "임원 퇴직금 지급 기한이 일반 직원과 같은지 정리했어요." },{ slug: "퇴직금-세금", title: "퇴직금 세금", description: "퇴직소득세 계산 방법과 절세 방법을 안내해요." },{ slug: "퇴직금-지급-기준", title: "퇴직금 지급 기준", description: "퇴직금 지급 기준을 한눈에 정리했어요." }];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="임원-퇴직금-지급규정" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 임원 · 지급규정</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>임원 퇴직금 지급 규정,<br />일반 직원이랑 다른가요?</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>임원 퇴직금은 일반 직원과 완전히 다른 체계예요. 근로기준법이 아닌 <a href="https://www.law.go.kr/법령/상법" style={{ color: "#1D9E75", textDecoration: "underline" }}>상법</a>과 정관이 기준이 되죠. 등기임원이라면 정관 또는 주주총회 결의에 따라 퇴직금이 결정되고, 비등기임원이라면 근로자성 인정 여부에 따라 달라져요. 임원 퇴직금 규정의 핵심, 계산법, 세금 처리까지 정리해드릴게요.</p>
      <Divider /><ArticleAd position="intro" />

      <H2>임원도 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>받을 수 있지만, 방식이 달라요. 등기임원(이사, 감사 등)은 회사와 &ldquo;위임 관계&rdquo;에 있어서 근로기준법상 퇴직금이 아닌, 정관이나 주주총회 결의에 의한 퇴직금을 받죠.</p>
      <p style={body}>비등기임원이나 명칭만 임원인 경우는 다를 수 있어요. 실질적으로 사업주의 지시·감독을 받으며 일했다면 &ldquo;근로자&rdquo;로 인정받아 일반 퇴직금 규정이 적용될 수 있죠.</p>
      <p style={body}>핵심은 &ldquo;등기 여부&rdquo;와 &ldquo;실질적 근로관계&rdquo;예요. 법인등기부등본에 등기돼 있고 경영 의사결정에 참여했다면 임원 퇴직금 규정이 적용되고, 실제로는 직원처럼 일했다면 근로자 퇴직금이 적용될 수 있어요.</p>
      <GreenBox title="임원 퇴직금 핵심">1. <strong>등기임원</strong>: 정관/주주총회 결의에 따라 지급<br />2. <strong>비등기임원</strong>: 근로자성 인정 시 일반 퇴직금 적용<br />3. <strong>세법상 한도</strong>: 초과분은 근로소득세 부과</GreenBox>
      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="임원 퇴직금을 받을 수 있는 조건이에요." partialMatchText="일부만 해당돼요. 세무사나 노무사에게 상담받아보세요." />
      <Divider />

      <H2>임원 퇴직금 지급 규정이 따로 있나요?</H2>
      <p style={body}>법으로 정해진 &ldquo;임원 퇴직금법&rdquo; 같은 건 없어요. 각 회사가 정관에서 정하거나, 주주총회에서 별도로 결의하는 거죠. 그래서 회사마다 임원 퇴직금 규정이 천차만별이에요.</p>
      <p style={body}>보통 &ldquo;최종 보수월액 x 재직 연수 x 지급률&rdquo;로 계산하는데, 지급률이 1배인 곳도 있고 3배인 곳도 있죠. 이건 순전히 정관에서 어떻게 정했느냐에 달려 있어요.</p>
      <p style={body}>주의할 점은 세법상 한도예요. 2012년 이후 임원 퇴직소득에 대해 세법상 적정 한도가 생겼고, 한도를 초과하면 초과분에 근로소득세가 부과되죠. 정관에서 아무리 높게 정해도 세법 한도를 넘으면 세금이 추가로 붙는 거예요.</p>
      <BorderBox title="정관에 규정이 없다면">주주총회에서 별도 결의가 필요해요. 결의 없이 임의로 지급하면 세법상 부인되거나 배임 문제가 생길 수 있죠.</BorderBox>
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" />
      <Divider />

      <H2>임원 퇴직금 계산 방법은?</H2>
      <p style={body}>정관에서 정한 산식대로 계산해요. 가장 흔한 공식은 &ldquo;최종 보수월액 x 재직 연수 x 지급배수&rdquo;죠. 지급배수가 2배라면, 월 보수 500만 원에 10년 재직 시 퇴직금이 1억 원이 되는 거예요.</p>
      <p style={body}>세법상 적정 한도는 &ldquo;퇴직 전 3년간 평균 보수 x 1/10 x 근속연수 x 3배&rdquo;예요. 이 한도를 넘는 금액은 퇴직소득이 아닌 근로소득으로 과세되죠.</p>
      <p style={body}>세금 계산이 복잡하기 때문에 임원 퇴직금은 반드시 세무사와 상의하는 게 좋아요. 지급 시기, 지급 방법에 따라 세금이 크게 달라질 수 있거든요.</p>
      <Divider />

      <H2>임원 퇴직금 지급 거부 시 대처법은?</H2>
      <p style={body}>등기임원이라면 근로기준법이 적용되지 않기 때문에 고용노동부 진정이 아닌 <strong>민사소송</strong>으로 해결해야 해요. 정관이나 주주총회 결의를 근거로 퇴직금 지급 청구 소송을 제기하는 거죠.</p>
      <p style={body}>비등기임원으로서 근로자성이 인정되는 경우라면 고용노동부에 진정을 넣을 수 있어요. 이 경우 근로감독관이 조사해서 시정 명령을 내리죠.</p>
      <p style={body}>어떤 경로든 소멸시효는 <strong>3년</strong>이에요. 임원 퇴직금 분쟁은 금액이 큰 경우가 많으니, 가능한 한 빨리 법률 전문가와 상담하는 게 유리하죠.</p>
      <SectionBadge>준비 서류</SectionBadge><Checklist items={CHECKLIST} />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>임원 퇴직금 규정에 대해 자주 나오는 질문이에요.</p>
      <FAQ items={FAQS} /><Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 상법과 소득세법을 바탕으로 작성됐어요. 개별 사안은 세무사·노무사에게 상담받으세요." />
    </ArticleLayout>
  );
}
