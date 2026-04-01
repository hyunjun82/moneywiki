"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 귀농·주말농장 목적으로 농지를 샀는데, 농막을 지을 수 있는지 규제가 뭔지 모르는 상황
// Q2. 농업진흥지역에서 농막 설치 가능 여부와 크기 제한을 확인하고, 농촌체류형 쉼터 신청까지 완료한다
// Q3. 농막 20㎡ 제한, 농촌체류형 쉼터 33㎡, 주거 금지, 위반 시 철거, 신고 절차
// Q4. GreenBox(결론 요약) + Steps(설치 절차) + Checklist(위반 방지) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "농지 소재지 관할 시·군·구청에 가설건축물 축조 신고",
    desc: "농막은 건축허가가 아니라 가설건축물 축조 신고 대상이에요. 농지 소재지 시·군·구청 건축과에 신고서를 제출하면 되고, 도면과 농지 소유 확인 서류가 필요해요. 농촌체류형 쉼터도 같은 절차로 신고하되, 체류형 쉼터임을 명시해야 해요.",
    tip: "건축허가 X → 가설건축물 축조 신고 O",
  },
  {
    title: "연면적과 용도 제한을 꼭 지켜야 해요",
    desc: "일반 농막은 연면적 20㎡(약 6평) 이내, 농촌체류형 쉼터는 33㎡(약 10평) 이내예요. 정화조, 데크, 주차장 같은 부속시설은 면적에 포함되지 않지만, 콘크리트로 영구 고정하면 불법 건축물로 간주돼요. 이동 가능한 구조로 설치해야 해요.",
    tip: "데크·정화조는 면적 제외, 단 영구 고정 금지",
  },
  {
    title: "전기·수도 인입 신청은 한전·수도사업소에서",
    desc: "농막에도 전기와 수도를 연결할 수 있어요. 한국전력에 임시전력 신청을 하면 되고, 수도는 관할 수도사업소에 문의하세요. 단, 가스 배관 연결은 불가능해요. 농촌체류형 쉼터는 정화조 설치가 의무예요.",
    tip: "가스 배관 연결 불가 → LPG 가스통 사용",
  },
  {
    title: "3년마다 존치 기간 연장 신고를 하세요",
    desc: "가설건축물은 존치 기간이 정해져 있어요. 일반 농막은 3년, 농촌체류형 쉼터는 최초 3년 후 3년씩 3회 연장 가능해서 최장 12년이에요. 기간 만료 전에 연장 신고를 안 하면 철거 대상이 돼요.",
    tip: "농촌체류형 쉼터: 3년 + 3년×3회 = 최장 12년",
  },
];

const CHECKLIST_ITEMS = [
  "농업진흥지역 여부 확인 → 토지이용계획 열람 (정부24 또는 관할 시·군·구청)",
  "연면적: 농막 20㎡ 이하 / 농촌체류형 쉼터 33㎡ 이하",
  "주거 목적 사용 절대 금지 → 적발 시 철거 명령 + 원상복구 비용 부담",
  "콘크리트 기초 금지 → 이동 가능 구조만 허용",
  "존치 기간 만료 전 연장 신고 → 놓치면 철거 대상",
  "농촌체류형 쉼터 신청 시 정화조 설치 의무",
];

const FAQS = [
  {
    q: "농막에서 잠 자도 되나요?",
    a: "일반 농막에서는 숙박이 불법이에요. 농작업 중 일시 휴식용으로만 쓸 수 있어요. 적발되면 철거 명령을 받고 원상복구 비용도 본인이 부담해야 해요. 숙박이 필요하면 농촌체류형 쉼터(33㎡ 이내)로 신고해야 해요.",
  },
  {
    q: "농촌체류형 쉼터는 언제부터 가능해진 건가요?",
    a: "2024년 12월부터 농지법 시행규칙 개정으로 새로 도입됐어요. 본인 소유 농지에 농지전용 허가 없이 33㎡ 이내로 설치할 수 있고, 일시적 숙박이 허용돼요. 기존 농막과 달리 잠을 잘 수 있는 합법적 시설이에요.",
  },
  {
    q: "농막 크기 20㎡를 넘기면 어떻게 되나요?",
    a: "불법 건축물로 간주돼요. 이행강제금이 부과되고 철거 명령을 받아요. 20㎡가 넘는 공간이 필요하면 농촌체류형 쉼터(33㎡)로 전환 신고하거나, 농지전용 허가를 받아 정식 건축을 해야 해요.",
  },
  {
    q: "데크나 테라스도 면적에 포함되나요?",
    a: "원칙적으로 데크와 부속시설은 면적에서 제외돼요. 하지만 콘크리트를 타설해서 영구적으로 고정하면 건축물 면적에 포함될 수 있어요. 이동 가능한 조립식 데크로 설치하는 게 안전해요.",
  },
  {
    q: "농업보호구역이랑 농업진흥구역이랑 뭐가 다른가요?",
    a: "농업진흥구역은 농업 생산 목적으로 지정된 핵심 농지라서 규제가 가장 강해요. 농업보호구역은 진흥구역의 용수원 보호 등을 위한 완충지대로, 진흥구역보다 건축 규제가 조금 느슨한 편이에요.",
  },
  {
    q: "농막을 빌려주거나 에어비앤비로 운영할 수 있나요?",
    a: "불법이에요. 농막은 본인의 농작업용이고, 제3자에게 임대하거나 숙박업으로 운영하면 농지법 위반이에요. 적발 시 철거 명령과 함께 벌금이 부과돼요.",
  },
];

const RELATED = [
  { slug: "건축허가-신고", title: "건축허가·신고 절차", description: "건축할 때 허가와 신고, 어떤 차이가 있는지 정리." },
  { slug: "농지전용허가", title: "농지전용허가 신청 방법", description: "농지를 다른 용도로 쓰려면 필요한 절차." },
  { slug: "개발제한구역-건축-이행강제금", title: "개발제한구역 건축 제한", description: "그린벨트 내 건축 규제와 이행강제금." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 농지 · 건축 규제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        농업진흥지역에 농막 지을 수 있나요?<br />
        크기 제한부터 쉼터 전환까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주말농장 하려고 농지를 샀는데, 쉴 곳이 필요하잖아요. &quot;농막 하나 올리면 되겠지&quot; 싶어서 알아보면 규제가 생각보다 까다로워요.
      </p>
      <p style={body}>
        농업진흥지역 농막은 <strong>연면적 20㎡(약 6평) 이내</strong>, 주거 목적 사용은 불법이에요.
        2024년 12월부터는 <strong>농촌체류형 쉼터(33㎡)</strong>가 새로 도입돼서 합법적으로 숙박이 가능해졌어요.
        <a href="https://www.law.go.kr/법령/농지법" style={{ color: "#1D9E75", textDecoration: "underline" }}>농지법</a>이 정한 기준을 정리해 드릴게요.
      </p>

      <Divider />

      <H2>농막과 농촌체류형 쉼터, 뭐가 다른가요?</H2>
      <p style={body}>
        농막은 농작업 중 일시 휴식과 농기구 보관용 시설이에요. 잠을 자면 안 돼요.
        반면 농촌체류형 쉼터는 2024년 12월 농지법 시행규칙 개정으로 새로 만들어진 유형으로, 일시적 숙박이 허용돼요.
        가장 큰 차이를 한눈에 비교하면 이래요.
      </p>

      <SectionBadge>농막 vs 농촌체류형 쉼터 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>일반 농막</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>농촌체류형 쉼터</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["연면적 제한", "20㎡ (약 6평)", "33㎡ (약 10평)"],
              ["숙박 가능 여부", "불가 (일시 휴식만)", "가능 (일시적 숙박)"],
              ["사용 기간", "3년 (연장 가능)", "최장 12년 (3+3×3)"],
              ["정화조", "선택", "의무 설치"],
              ["주거 등록", "불가", "불가 (전입신고 안 됨)"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{a}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        핵심 정리: 잠을 자고 싶으면 농촌체류형 쉼터로 신고해야 해요. 일반 농막에서 숙박하면 불법이고, 적발 시 철거 명령을 받아요.
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>설치 신고부터 전기 연결까지 절차가 어떻게 되나요?</H2>
      <p style={body}>
        농막이든 쉼터든 건축허가가 아니라 <strong>가설건축물 축조 신고</strong>로 진행해요.
        절차가 복잡하지 않지만, 서류 하나 빠지면 반려되니까 순서대로 따라오세요.
        <a href="/w/농지전용허가" style={{ color: "#1D9E75", textDecoration: "underline" }}>농지전용 허가</a>와는 다른 절차예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>이것만 지키면 철거 걱정 없어요</H2>
      <p style={body}>
        농막 관련 민원의 대부분은 크기 초과와 주거 목적 사용이에요. 특히 콘크리트 기초를 깔거나 에어비앤비로 돌리다가 적발되는 사례가 많아요.
        아래 체크리스트를 하나씩 확인하면 철거 걱정 없이 합법적으로 농막을 운영할 수 있어요.
      </p>

      <Checklist items={CHECKLIST_ITEMS} />

      <BorderBox>
        <strong>위반 시 제재</strong>{"\n"}
        · 농지법 위반: 5년 이하 징역 또는 5천만원 이하 벌금{"\n"}
        · 불법 건축물: 이행강제금 부과 + 철거 명령{"\n"}
        · 원상복구 비용은 전액 본인 부담
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 농지법 및 시행규칙을 바탕으로 작성됐어요. 지자체별로 세부 기준이 다를 수 있으니, 실제 설치 전에 관할 시·군·구청 건축과에 문의해 보세요." />
    </ArticleLayout>
  );
}
