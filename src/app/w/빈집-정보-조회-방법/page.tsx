"use client";

// Q1. 빈집을 사서 리모델링하거나 투자하고 싶은데 전국 빈집 정보를 어디서 찾는지 모르는 상황
// Q2. 빈집애·부동산원 빈집정보시스템에 접속해서 원하는 지역의 빈집 현황을 조회하는 행동
// Q3. 3개 플랫폼(빈집애, 부동산원, LX 공가랑) 차이, 조회 방법, 법적 근거, 매입 절차
// Q4. Steps(조회절차) + CompareTable(플랫폼 비교) + Checklist(매입 전 점검) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";
import { CompareTable } from "@/components/article-ui/CompareTable";
import { Checklist } from "@/components/article-ui/Checklist";

const PLATFORM_COMPARE = [
  { label: "운영기관", optionA: "행정안전부", optionB: "한국부동산원" },
  { label: "핵심 기능", optionA: "전국 빈집 지도 + 매입 원스톱", optionB: "격자 통계 + 공간분석 + 인구이동" },
  { label: "회원가입", optionA: "기본 조회 무료 / 상세는 가입 필요", optionB: "무료 이용" },
  { label: "주요 대상", optionA: "매입·리모델링 희망자", optionB: "분석·연구·정책 관계자" },
  { label: "URL", optionA: "binzibe.kr", optionB: "reb.or.kr" },
];

const SEARCH_STEPS = [
  { title: "빈집애(binzibe.kr) 접속", desc: "행정안전부가 운영하는 전국 빈집 통합 플랫폼이에요. 회원가입 없이 기본 조회가 가능해요." },
  { title: "지역·유형·등급 필터 선택", desc: "관심 지역을 선택하고 주택 유형(단독, 다가구 등), 빈집 등급별로 필터링해요." },
  { title: "지도에서 빈집 위치 확인", desc: "지도 위에 빈집 위치가 표시돼요. 클릭하면 건물 상태, 면적, 건축 연도 같은 기본 정보를 볼 수 있어요." },
  { title: "관심 매물 상세조회·문의", desc: "매입 의향이 있으면 상세조회 후 온라인으로 문의하거나 매입 신청을 시작해요." },
];

const PURCHASE_CHECKLIST = [
  "등기부등본으로 소유자·권리관계 확인",
  "현장 방문해서 구조 안전성·누수 여부 직접 체크",
  "관할 구청 주택과에 빈집 정비 지원 사업 문의",
  "리모델링 비용 보조·세금 감면 혜택 확인",
  "건축물대장에서 용도·면적·위반건축 여부 확인",
];

const FAQS = [
  { q: "빈집 정보는 누구나 무료로 조회할 수 있나요?", a: "네. 빈집애와 부동산원 빈집정보시스템 모두 무료 서비스예요. 기본 정보 열람에는 회원가입도 필요 없어요." },
  { q: "빈집 정보가 100% 정확한가요?", a: "전기 사용량 기반 추정 데이터가 포함돼 있어서 완벽하지 않아요. 장기 출타로 전기를 안 쓴 경우도 빈집으로 잡힐 수 있어요. 반드시 현장 확인이 필요해요." },
  { q: "빈집을 매입하면 어떤 혜택이 있나요?", a: "지자체마다 리모델링 비용 보조, 취득세 감면, 정비사업 참여 기회 등을 제공해요. 관할 구청에 문의하면 해당 지역 지원 사업을 안내받을 수 있어요." },
  { q: "농촌 빈집도 같은 시스템에서 조회되나요?", a: "도시지역은 빈집 및 소규모주택 정비에 관한 특례법, 농촌지역은 농어촌정비법에 따라 관리돼요. 빈집애에서 두 지역 정보를 모두 제공하고 있어요." },
  { q: "LX 공가랑 시스템은 뭐가 다른가요?", a: "LX 공가랑(gongga.lx.or.kr)은 최근 3년간 전기 사용 데이터를 분석해서 빈집을 추정하는 시스템이에요. 빅데이터 기반이라 참고자료로 활용하세요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "빈집애 통합 플랫폼", url: "https://binzibe.kr" },
      { label: "한국부동산원 빈집정보시스템", url: "https://www.reb.or.kr/reb/cm/cntnts/cntntsView.do?mi=9871&cntntsId=1238" },
      { label: "빈집 및 소규모주택 정비에 관한 특례법(법제처)", url: "https://www.law.go.kr/법령/빈집및소규모주택정비에관한특례법" },
    ],
  },
];

const RELATED = [
  { slug: "경매-입찰-방법", title: "부동산 경매 입찰 방법", description: "빈집 외에 경매를 통해 저렴한 부동산을 찾는 방법이에요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "빈집 매입 시 취득세가 얼마인지 미리 계산해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 빈집 · 정보조회</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        빈집 정보 조회, 어디서 하나요?<br />
        빈집애·부동산원 활용법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        빈집을 매입해서 리모델링하거나 정비사업에 참여하고 싶으시죠?
        전국 빈집 정보는 행정안전부 빈집애(binzibe.kr)에서 무료로 조회할 수 있어요.
        지역별 위치, 건물 상태, 매입 절차까지 한 번에 처리가 되고요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>빈집 조회는 이렇게 해요</H2>
      <p style={body}>
        <a href="https://binzibe.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>빈집애</a>가 가장 간편한 조회 방법이에요.
        행정안전부가 운영하는 통합 플랫폼으로, 빈집 확인부터 매입 신청까지 원스톱으로 할 수 있어요.
      </p>

      <SectionBadge>빈집 조회 절차</SectionBadge>
      <Steps steps={SEARCH_STEPS} />

      <Divider />

      <H2>빈집애 vs 부동산원 시스템, 뭘 써야 하나요?</H2>
      <p style={body}>
        목적에 따라 다른 플랫폼을 쓰면 돼요.
        매입이 목적이면 빈집애, 지역 분석·통계가 필요하면 <a href="https://www.reb.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국부동산원 빈집정보시스템</a>이 적합해요.
      </p>

      <SectionBadge>플랫폼 비교</SectionBadge>
      <CompareTable titleA="빈집애" titleB="부동산원 빈집정보시스템" rows={PLATFORM_COMPARE} />

      <BorderBox>
        LX 공가랑(gongga.lx.or.kr)은 전기 사용 데이터를 분석해서 빈집을 추정하는 보조 도구예요.
        빈집 가능성이 높은 건물을 찾을 때 참고하되, 현장 확인 없이 판단하면 안 돼요.
      </BorderBox>

      <Divider />

      <H2>빈집 매입 전에 꼭 점검하세요</H2>
      <p style={body}>
        빈집 정보를 확인한 뒤 매입을 결정하기 전에 아래 항목을 체크해야 해요.
        사진이나 데이터만 보고 결정하면 예상치 못한 비용이 생길 수 있어요.
      </p>

      <SectionBadge>매입 전 체크리스트</SectionBadge>
      <Checklist items={PURCHASE_CHECKLIST} />

      <GreenBox title="법적 근거">
        빈집정보시스템은 <a href="https://www.law.go.kr/법령/빈집및소규모주택정비에관한특례법" style={{ color: "#085041", textDecoration: "underline" }}>빈집 및 소규모주택 정비에 관한 특례법</a>에 근거해서 운영돼요.
        도시지역은 이 법, 농촌지역은 농어촌정비법이 각각 적용돼요.
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <RelatedArticles articles={RELATED} />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 행정안전부·한국부동산원 공개 자료를 바탕으로 작성했어요. 빈집 현황은 수시로 변동되니 최신 정보를 직접 확인하세요." />
    </ArticleLayout>
  );
}
