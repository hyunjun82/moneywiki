"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 시골이나 외곽에 작은 단독주택을 짓고 싶은데, 건축허가가 필요한지 건축신고만 하면 되는지 모르겠는 상황
// Q2. 내 땅의 지역·규모를 확인하고, 허가/신고 중 어떤 절차를 밟아야 하는지 판단한 뒤 진행한다
// Q3. 허가 vs 신고 기준(지역+200㎡+3층), 증축 기준(85㎡), 위반 시 벌금, 필요 서류, 신청 방법
// Q4. 비교표(허가 vs 신고) + GreenBox(핵심 기준) + Steps(신고 절차) + BorderBox(위반 제재) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DATA = [
  {
    title: "내 땅의 용도지역부터 확인하세요",
    desc: "토지이음(eum.go.kr)이나 정부24에서 토지이용계획확인서를 발급받으면 돼요. 관리지역·농림지역·자연환경보전지역인지, 도시지역(주거·상업·공업)인지에 따라 허가/신고가 갈려요. 이 한 장이 모든 판단의 출발점이에요.",
    tip: "토지이용계획확인서 1통: 정부24에서 무료 발급",
    link: { label: "토지이음 바로가기", href: "https://www.eum.go.kr" },
  },
  {
    title: "건축신고서와 설계도서를 준비하세요",
    desc: "건축신고 대상이면 건축신고서, 설계도서(배치도·평면도·입면도 등), 토지이용계획확인서를 준비해요. 연면적 100㎡ 초과는 건축계획서·구조도까지 필요해요. 100㎡ 이하면 서류가 좀 더 간단해요.",
    tip: "100㎡ 초과 시 설계도서 추가 (건축계획서·구조도)",
  },
  {
    title: "시·군·구청 건축과에 제출하세요",
    desc: "관할 시·군·구청 건축과 민원실에 방문하거나, 정부24(gov.kr)에서 온라인으로 제출할 수 있어요. 건축신고는 접수 후 5일 이내에 수리 여부가 통보돼요. 건축허가는 더 오래 걸리고 심의 과정이 있어요.",
    link: { label: "정부24 바로가기", href: "https://www.gov.kr" },
  },
  {
    title: "착공 후 준공검사까지 받아야 완료예요",
    desc: "신고가 수리되면 착공할 수 있어요. 공사가 끝나면 준공검사(사용승인)를 받아야 해요. 준공검사를 통과해야 건축물대장에 등재되고, 소유권보존등기도 가능해요. 이걸 안 하면 불법건축물이 돼요.",
  },
];

const DOCS = [
  { name: "건축신고서 (또는 건축허가신청서)", required: true, where: "시·군·구청 건축과 또는 정부24" },
  { name: "설계도서 (배치도, 평면도, 입면도)", required: true, where: "건축사무소 의뢰" },
  { name: "토지이용계획확인서", required: true, where: "정부24 또는 토지이음" },
  { name: "건축계획서·구조도 (100㎡ 초과 시)", required: false, where: "건축사무소 의뢰" },
  { name: "토지등기부등본", required: true, where: "인터넷등기소" },
  { name: "지적도", required: true, where: "정부24" },
];

const FAQS = [
  {
    q: "도시지역에서도 건축신고만 하면 되나요?",
    a: "아니에요. 도시지역(주거·상업·공업지역)은 원칙적으로 건축허가 대상이에요. 건축신고로 가능한 건 관리지역·농림지역·자연환경보전지역뿐이에요.",
  },
  {
    q: "연면적 200㎡가 딱 맞으면 신고인가요 허가인가요?",
    a: "200㎡ '미만'이 신고 대상이에요. 딱 200㎡이면 허가를 받아야 해요. 199㎡까지가 신고 대상이니까 설계 단계에서 잘 맞추는 게 중요해요.",
  },
  {
    q: "허가 없이 지으면 어떻게 되나요?",
    a: "5천만 원 이하 벌금이에요. 불법건축물로 분류되면 이행강제금이 반복 부과되고, 준공검사를 못 받아서 등기도 안 돼요. 매매도 어렵고 담보대출도 불가능해요.",
  },
  {
    q: "기존 집을 증축할 때도 허가가 필요한가요?",
    a: "바닥면적 85㎡ 이내 증축·개축은 건축신고로 가능해요. 3층 이상 건축물은 증축 부분이 연면적의 10분의 1 이내여야 해요. 이 기준을 넘으면 건축허가를 받아야 해요.",
  },
  {
    q: "건축신고는 얼마나 걸려요?",
    a: "접수 후 5일 이내에 수리(승인) 여부가 나와요. 서류에 문제가 없으면 대부분 바로 통과돼요. 건축허가는 심의 과정이 있어서 보통 2~4주, 길면 한 달 이상 걸릴 수 있어요.",
  },
  {
    q: "농막도 건축신고 대상인가요?",
    a: "연면적 20㎡ 이하인 가설건축물(농막)은 축조 신고 대상이에요. 건축신고와는 별도 절차고, 설치 후 3년마다 갱신해야 해요. 20㎡를 넘으면 일반 건축 절차를 밟아야 해요.",
  },
];

const SOURCES = [
  { name: "건축법 시행령", href: "https://www.law.go.kr/법령/건축법시행령" },
  { name: "찾기쉬운 생활법령정보", href: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1406&ccfNo=2&cciNo=1&cnpClsNo=1" },
  { name: "정부24", href: "https://www.gov.kr" },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부", description: "건물 취득 시 취득세 세율과 기한." },
  { slug: "부동산-중개수수료-요율-계산", title: "부동산 중개수수료 계산", description: "거래금액별 복비 상한 요율표." },
  { slug: "주거용-오피스텔", title: "주거용 오피스텔 세금", description: "오피스텔 용도별 세금 차이 비교." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축 · 허가·신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        단독주택, 허가받아야 하나요 신고만 하면 되나요?<br />
        지역·규모별 기준과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "시골에 작은 집 하나 지으려는데, 허가를 받아야 해요 신고만 해도 돼요?"
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/건축법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>건축법 시행령</a>에 따르면 원칙은 건축허가예요.
        하지만 <strong>관리지역·농림지역·자연환경보전지역</strong>에서 <strong>연면적 200㎡ 미만, 3층 미만</strong>이면 건축신고만으로 집을 지을 수 있어요.
        도시지역이면 규모와 관계없이 허가가 필요하고요.
        내 땅이 어디에 해당하는지부터 확인해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 핵심 기준 비교 */}
      <H2>건축허가와 건축신고, 어떻게 다른가요?</H2>
      <p style={body}>
        건축허가는 시장·군수·구청장의 승인을 받는 거예요. 심의 과정이 있어서 시간이 오래 걸리죠.
        건축신고는 서류를 제출하면 허가받은 것으로 간주하는 간편 절차예요.
      </p>

      <SectionBadge>허가 vs 신고 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>건축허가</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>건축신고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["성격", "승인 절차", "신고 = 허가 간주"],
              ["처리 기간", "2~4주 이상", "5일 이내"],
              ["대상 지역", "모든 지역", "관리·농림·자연환경보전지역"],
              ["규모 기준", "200㎡ 이상 또는 3층 이상", "200㎡ 미만 + 3층 미만"],
              ["서류 난이도", "복잡 (건축사 의뢰 일반적)", "상대적으로 간단"],
              ["비용", "설계비 + 심의비 + 수수료", "설계비 + 수수료"],
            ].map(([item, permit, report], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{permit}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{report}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        건축신고로 가능한 조건 (3가지 모두 충족){"\n\n"}
        1. 관리지역, 농림지역, 자연환경보전지역{"\n"}
        2. 연면적 200㎡ 미만{"\n"}
        3. 3층 미만{"\n\n"}
        하나라도 안 맞으면 건축허가 대상이에요.
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 증축·개축 기준 */}
      <H2>기존 집을 늘리거나 고칠 때 기준이 따로 있어요</H2>
      <p style={body}>
        새로 짓는 게 아니라 기존 건물을 증축·개축하는 경우에도 기준이 있어요.
        일정 규모 이하면 건축신고만으로 가능해요.
      </p>

      <BorderBox>
        <strong>증축·개축 건축신고 기준</strong>{"\n\n"}
        · 바닥면적 합계 85㎡ 이내 증축·개축·재축 → 건축신고{"\n"}
        · 3층 이상 건축물: 증축 부분이 연면적의 1/10 이내여야 신고 가능{"\n"}
        · 85㎡ 초과하거나 1/10 초과 → 건축허가 필요{"\n\n"}
        예시) 기존 120㎡ 2층 단독주택에 50㎡ 증축 → 85㎡ 이내이므로 건축신고 OK
      </BorderBox>

      <p style={body}>
        증축 면적이 애매하면 설계 단계에서 건축사무소와 상의하는 게 좋아요.
        기준을 살짝 넘겨서 허가 절차를 밟게 되면 시간과 비용이 크게 늘어나니까요.
        기준을 확인했다면, 이제 실제 신고 절차를 알아야 하죠.
      </p>

      <Divider />

      {/* H2-3: 건축신고 절차 */}
      <H2>건축신고, 이 순서대로 진행하세요</H2>
      <p style={body}>
        건축신고 대상이 맞다면 절차는 생각보다 간단해요.
        핵심은 내 땅의 용도지역을 먼저 확인하고, 서류를 맞춰서 제출하는 거예요.
      </p>

      <Steps steps={STEPS_DATA} />

      <Divider />

      {/* H2-4: 서류 목록 */}
      <H2>제출해야 할 서류 목록</H2>
      <p style={body}>
        건축신고와 건축허가 모두 아래 서류가 기본이에요.
        100㎡ 초과 건물은 설계도서가 더 상세해야 하니까 건축사무소에 의뢰하는 게 일반적이에요.
      </p>

      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-5: 위반 시 제재 */}
      <H2>허가·신고 없이 지으면 어떻게 되나요?</H2>
      <p style={body}>
        "작은 집인데 신고 안 해도 되지 않나요?" 절대 안 돼요.
        무허가·무신고 건축은 규모와 관계없이 불법이에요.
      </p>

      <BorderBox>
        <strong>위반 시 제재</strong>{"\n\n"}
        · 벌금: 5천만 원 이하{"\n"}
        · 불법건축물 분류 → 이행강제금 반복 부과{"\n"}
        · 준공검사 불가 → 건축물대장 미등재{"\n"}
        · 소유권보존등기 불가 → 매매·담보대출 불가능{"\n\n"}
        불법건축물은 나중에 적법화 절차를 밟아도 시간·비용이 많이 들어요. 처음부터 제대로 하는 게 훨씬 빠르고 저렴해요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        건축허가·신고에서 실제로 헷갈리는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 건축법 시행령 기준으로 작성했어요. 지역별 조례에 따라 세부 기준이 다를 수 있으니 관할 시·군·구청 건축과에서 확인해 주세요." />
    </ArticleLayout>
  );
}
