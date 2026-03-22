"use client";

// Q1. LH 직접시행 분양이 뭔지, 기존 공공분양과 뭐가 다른지 궁금한 예비 청약자
// Q2. 직접시행 방식을 이해하고, 2026년 착공·청약 일정을 파악해서 청약 준비를 한다
// Q3. 직접시행 방식(LH가 시행+민간 시공), 기존 방식과 차이, 대상 지역, 일정, 청약 자격
// Q4. GreenBox(결론) + BorderBox(기존 vs 직접시행 비교) + Steps(청약 준비) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "청약통장부터 준비하세요",
    desc: "LH 직접시행 분양도 일반 공공분양과 청약 자격이 같아요. 청약저축 또는 주택청약종합저축이 필요하고, 무주택 요건을 갖춰야 해요. 지금 통장이 없다면 바로 가입하세요.",
    tip: "가입 후 6개월 이상, 6회 이상 납입 필요 (지역별 상이)",
  },
  {
    title: "LH 청약플러스에서 공고를 살펴보세요",
    desc: "LH 청약플러스(apply.lh.or.kr)에서 분양 공고가 올라와요. 2026년 착공이 시작되면 2027~2028년에 청약 접수가 진행될 전망이에요. 알림 설정을 해두면 공고 시 바로 알 수 있어요.",
    link: { label: "LH 청약플러스", href: "https://apply.lh.or.kr" },
  },
  {
    title: "특별공급 자격에 해당하는지 보세요",
    desc: "생애최초, 신혼부부, 다자녀, 노부모부양 등 특별공급에 해당하는지 따져보세요. 특별공급은 경쟁률이 낮아서 당첨 확률이 훨씬 높아요. 소득 기준은 도시근로자 월평균 소득의 100~130%예요.",
    tip: "생애최초: 부부합산 소득 130% 이하 + 5년 이상 소득세 납부",
  },
  {
    title: "분양가와 자금 계획을 세우세요",
    desc: "분양가상한제가 적용될 가능성이 높아서 주변 시세보다 저렴할 거예요. 중도금 대출, 잔금 마련 계획을 미리 세워두세요. 공공분양은 보통 분양가의 10%를 계약금으로 내요.",
  },
];

const FAQS = [
  {
    q: "LH 직접시행이면 집 품질이 떨어지나요?",
    a: "아니에요. 설계와 시공은 민간 건설사가 맡아요. LH는 사업 관리만 하고, 실제 건축은 전문 건설사가 하니까 민간 분양 수준의 품질을 기대할 수 있어요.",
  },
  {
    q: "분양가는 어느 정도 될까요?",
    a: "아직 미정이지만 공공분양이라 분양가상한제가 적용될 가능성이 높아요. 주변 시세의 60~80% 수준으로 예상돼요. 정확한 금액은 분양 공고 시 확정돼요.",
  },
  {
    q: "2026년에 바로 청약 가능한가요?",
    a: "2026년은 착공 시작 시점이에요. 청약은 보통 착공 후 1~2년 뒤에 진행돼요. 2027~2028년에 청약 접수가 시작될 전망이에요. 청약통장 가입은 지금부터 준비하는 게 좋아요.",
  },
  {
    q: "기존 공공분양과 청약 자격이 다른가요?",
    a: "같아요. 무주택자 우선이고, 생애최초·신혼부부·다자녀 등 특별공급 자격도 동일해요. 일반공급은 청약통장 가입 기간과 납입 횟수, 부양가족 수로 가점을 매겨요.",
  },
  {
    q: "수도권 외 지역에서도 직접시행 분양이 나오나요?",
    a: "현재는 수도권 공공택지 중심이에요. 경기 남부, 서울 외곽이 유력하고, 3기 신도시(남양주왕숙, 파주운정3, 수원당수 등)도 포함될 전망이에요. 지방 확대 여부는 추후 발표 예정이에요.",
  },
  {
    q: "LH 직접시행 분양의 가장 큰 장점이 뭔가요?",
    a: "공급 속도예요. 기존에는 택지 매각부터 착공까지 2년 이상 걸렸는데, 직접시행은 이 과정을 생략해서 바로 착공해요. 입주자 입장에서는 공공 분양가에 민간 건설사 품질을 누릴 수 있다는 점이 핵심이에요.",
  },
];

const SOURCES = [
  { name: "국토교통부", href: "https://www.molit.go.kr" },
  { name: "한국토지주택공사(LH)", href: "https://www.lh.or.kr" },
  { name: "LH 청약플러스", href: "https://apply.lh.or.kr" },
];

const RELATED = [
  { slug: "1월-29일-주택-공급대책", title: "129 주택 공급대책", description: "정부 주택 공급 확대 방안 핵심." },
  { slug: "분양가상한제-적용-기준", title: "분양가상한제 적용 기준", description: "공공분양 가격이 정해지는 원리." },
  { slug: "주택청약", title: "주택청약 기본", description: "청약통장부터 당첨까지 전체 흐름." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 공공분양</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        LH 직접시행 분양이 뭔가요?<br />
        기존 공공분양과의 차이와 청약 일정
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;LH가 직접 시행한다는데 기존이랑 뭐가 다른 거예요?&rdquo;
      </p>
      <p style={body}>
        쉽게 말하면 <strong>LH가 땅을 안 팔고 직접 아파트를 짓는 방식</strong>이에요.
        기존에는 LH가 공공택지를 민간 건설사에 매각하고, 건설사가 짓고 분양했어요. 이 과정에 2년 이상 걸렸죠.
        직접시행은 LH가 사업 주체가 되고 민간은 설계·시공만 맡아서 <strong>공급 속도가 2년 단축</strong>돼요.
        <a href="https://www.molit.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국토교통부</a>가 2025년 9월 발표한 주택 공급 확대 방안의 핵심이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기존 방식 vs 직접시행, 뭐가 달라졌나요</H2>
      <p style={body}>
        가장 큰 차이는 택지 매각 절차가 사라졌다는 거예요. 기존에는 LH가 땅을 만들어서 건설사에 팔고, 건설사가 사업 승인받고 착공하는 데 2년 이상 걸렸어요. 직접시행은 LH가 바로 착공해요.
      </p>

      <SectionBadge>방식 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>기존 방식</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>LH 직접시행</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["사업 주체", "민간 건설사", "LH"],
              ["택지 매각", "O (매각 후 착공)", "X (직접 개발)"],
              ["착공까지 기간", "택지 매각 후 2년+", "즉시 착공"],
              ["민간 역할", "사업 전체", "설계·시공만"],
              ["미분양 리스크", "민간 부담", "LH(공공) 부담"],
              ["분양가", "민간 결정", "분양가상한제 적용 가능"],
            ].map(([label, old, newW], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{old}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{newW}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        입주자 입장에서 가장 좋은 점은 공공 분양가에 민간 건설사 품질을 누릴 수 있다는 거예요. <a href="/w/분양가상한제-적용-기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>분양가상한제</a>가 적용되면 시세 대비 20~40% 저렴할 수 있어요.
      </p>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>2026년 수도권 3,000가구부터 시작돼요</H2>
      <p style={body}>
        2024년 12월에 첫 민간사업자 공모가 진행됐어요. 수도권 공공택지에서 약 3,000가구 규모였고, 2026년 착공을 목표로 하고 있어요. 3기 신도시(남양주왕숙, 파주운정3, 수원당수)를 포함한 대규모 택지가 대상이에요.
      </p>

      <GreenBox title="공급 일정 전망">
        2026년: 수도권 3,000가구 착공 시작{"\n"}
        2027~2028년: 청약 접수 예상{"\n"}
        2029~2030년: 입주 시작 전망{"\n"}
        전체 목표: 2030년까지 수도권 135만호 공급
      </GreenBox>

      <p style={body}>
        정부는 2026년 수도권에서 5만가구 이상 착공, 2만 9천가구 분양을 추진할 계획이에요. 직접시행 물량이 이 중 상당 부분을 차지할 거예요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>지금부터 이렇게 준비하세요</H2>
      <p style={body}>
        청약은 준비가 반이에요. 착공이 시작되면 1~2년 후에 청약 접수가 열리니까 지금부터 움직이는 게 유리해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 부동산 정보를 제공하며 투자 권유가 아니에요. 정확한 분양 일정은 LH 공식 발표를 참고하세요." />
    </ArticleLayout>
  );
}
