"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     공인중개사 자격증을 준비하거나 취득한 후, 실제로 어떤 일을 할 수 있는지 알고 싶은 사람.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     공인중개사가 할 수 있는 업무 범위를 파악하고, 사무소 개설 등록을 준비할 수 있다.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     기본 중개업무, 겸업 가능 업무(임대관리/분양대행/경공매), 2026년 신고 의무 강화 내용.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     DocTable(업무 범위 목록) + BorderBox(종별 차이) + GreenBox(2026년 변화) + FAQ.

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const BUSINESS_TABLE = {
  headers: ["업무 구분", "구체적 내용"],
  rows: [
    ["중개업무 (기본)", "토지·건물·아파트·오피스텔 매매·교환·임대차 알선"],
    ["임대관리", "건물주 대신 세입자 관리, 임대료 수납, 건물 유지보수"],
    ["분양대행", "신축 아파트·오피스텔 분양 계약 업무 대행"],
    ["경공매", "법원 경매·공매 물건 소개 및 입찰 대행"],
    ["부동산 상담", "세금·법률 관련 상담 및 수수료 수령 (법률자문 제외)"],
  ],
};

const TYPE_TABLE = {
  headers: ["구분", "중개업무", "임대관리·분양대행", "경공매"],
  rows: [
    ["법인 개업공인중개사", "가능", "가능", "가능"],
    ["개인 개업공인중개사", "가능", "가능", "가능"],
    ["중개보조원", "가능 (보조)", "가능", "불가"],
  ],
};

const FAQS = [
  {
    q: "공인중개사가 직접 집을 사고팔 수 있나요?",
    a: "본인 소유 부동산은 가능해요. 하지만 중개 대상 물건을 직접 사고파는 건 이해상충 문제가 있어서 제한돼요.",
  },
  {
    q: "중개사무소 없이 중개할 수 있나요?",
    a: "안 돼요. 개업공인중개사는 사무소를 개설하고 등록해야 중개업무를 할 수 있어요. 등록 없이 중개하면 불법이에요.",
  },
  {
    q: "공인중개사 자격증만 있으면 바로 일할 수 있나요?",
    a: "자격증을 따고 시·군·구청에 사무소 개설 등록을 해야 해요. 등록 없이 중개하면 3년 이하 징역 또는 3천만원 이하 벌금이 부과돼요.",
  },
  {
    q: "경공매 대행은 변호사만 할 수 있는 거 아닌가요?",
    a: "아니에요. 공인중개사법 제3조에서 공인중개사도 경공매 대행을 할 수 있다고 명시하고 있어요. 다만 법률적 판단이 필요한 권리분석은 변호사 영역이에요.",
  },
  {
    q: "분양대행을 하려면 별도 등록이 필요한가요?",
    a: "개업공인중개사 등록으로 분양대행이 가능해요. 별도 등록은 필요 없어요. 다만 분양대행 계약서 작성 등 관련 서류를 잘 갖춰야 해요.",
  },
  {
    q: "2026년부터 달라진 게 뭔가요?",
    a: "주택 매매계약 신고 시 계약금 지급 증빙 자료 첨부가 의무화됐어요. 신탁원부와 건축물대장 등본 확인·설명 의무도 생겼어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "공인중개사법 제2조·제3조 (중개업무 정의 및 겸업)", url: "https://www.law.go.kr/법령/공인중개사법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "한국공인중개사협회", url: "https://www.kar.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "중개보수-요율",
    title: "공인중개사 중개보수 요율 기준",
    description: "부동산 거래 금액별로 중개수수료가 어떻게 계산되는지 정리했어요.",
  },
  {
    slug: "부동산-거래신고",
    title: "부동산 거래신고 방법과 기한",
    description: "부동산 매매계약 후 30일 이내에 거래신고를 해야 해요. 신고 방법을 정리했어요.",
  },
  {
    slug: "공인중개사-시험",
    title: "공인중개사 시험 일정과 합격 기준",
    description: "공인중개사 1차·2차 시험 과목, 합격 기준, 접수 방법이에요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 공인중개사 · 업무 범위</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        공인중개사 자격증으로 뭘 할 수 있나요?<br />
        업무 범위 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;집 소개만 하는 거 아닌가요?&rdquo;
      </p>
      <p style={body}>
        중개업무는 기본이고, 임대관리·분양대행·경공매까지 할 수 있어요.
        <a href="https://www.law.go.kr/법령/공인중개사법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공인중개사법</a> 제2조·제3조에서
        정한 업무 범위를 정리했어요. 2026년부터 신고 의무가 강화된 내용도 함께 담았어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 기본 중개업무 */}
      <H2>공인중개사의 기본 업무는 뭔가요?</H2>
      <SectionBadge>기본 업무</SectionBadge>

      <p style={body}>
        <a href="https://www.law.go.kr/법령/공인중개사법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공인중개사법 제2조</a>에서
        &lsquo;중개&rsquo;를 정의하고 있어요. 중개대상물에 대해 거래 당사자 간 매매·교환·임대차 같은 권리 변동 행위를 알선하는 거예요.
        쉽게 말하면 집 팔 사람과 살 사람을 연결해 주는 거죠. 전세나 월세 거래도 마찬가지예요.
      </p>
      <p style={body}>
        중개 대상은 토지, 건물, 아파트, 오피스텔, 상가, 분양권 등 다양해요. 중개할 때는 중개대상물 확인·설명서를 작성해야 해요.
        부동산 권리관계, 이용 제한 사항, 시설 상태 같은 걸 확인해서 거래 당사자에게 설명하는 게 의무예요.
      </p>
      <p style={body}>
        중개업무를 하려면 반드시 시·군·구청에 사무소를 개설하고 등록해야 해요.
        자격증만 있고 등록을 안 한 상태에서 중개하면 3년 이하 징역 또는 3천만원 이하 벌금이 부과될 수 있어요.
      </p>

      <Divider />

      {/* 섹션 2: 겸업 가능 업무 */}
      <H2>중개 외에 어떤 일을 더 할 수 있나요?</H2>

      <p style={body}>
        <a href="https://www.law.go.kr/법령/공인중개사법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공인중개사법 제3조</a>에서
        중개 외에 할 수 있는 업무를 정하고 있어요. 임대관리, 분양대행, 경공매, 부동산 관련 상담이 대표적이에요.
      </p>

      <DocTable headers={BUSINESS_TABLE.headers} rows={BUSINESS_TABLE.rows} />

      <p style={body}>
        부동산 관련 상담은 수수료를 받고 할 수 있지만 주의할 점이 있어요.
        세금이나 계약 조건 같은 상담은 가능하지만, 법률적 판단이 필요한 법률자문은 변호사 영역이에요.
        선을 넘으면 변호사법 위반이 될 수 있으니 조심해야 해요.
      </p>

      <CategoryButton label="부동산 정보" count={15} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* 섹션 3: 종별 업무 차이 */}
      <H2>법인이냐 개인이냐에 따라 다른가요?</H2>
      <SectionBadge>종별 업무 비교</SectionBadge>

      <p style={body}>
        개업공인중개사는 법인과 개인으로 나뉘고, 중개보조원은 개업공인중개사 밑에서 보조 업무를 하는 형태예요.
        법인과 개인 개업공인중개사는 업무 범위가 거의 같아요. 중개보조원은 경공매 대행이 불가해요.
      </p>

      <DocTable headers={TYPE_TABLE.headers} rows={TYPE_TABLE.rows} />

      <p style={body}>
        중개보조원이 개업공인중개사 명의를 빌려 영업하는 건 불법이에요.
        중개보조원은 개업공인중개사의 지휘·감독 아래에서만 업무를 할 수 있어요.
      </p>

      <Divider />

      {/* 섹션 4: 2026년 변화 */}
      <H2>2026년부터 달라진 것들이에요</H2>

      <p style={body}>
        2026년부터 공인중개사 업무에 변화가 생겼어요. 실수요자 보호와 시장 교란 방지를 위한 규정 강화예요.
      </p>

      <GreenBox>
        1. 주택 매매계약 신고 시 계약금 지급 증빙 자료 첨부 의무화<br />
        2. 중개대상물 설명 시 신탁원부·건축물대장 등본 확인·설명 의무화<br />
        3. 중개 과정 확인 정보 더 상세히 기록·보관 의무 강화
      </GreenBox>

      <p style={body}>
        계약금 증빙 자료 없이 신고하면 과태료가 부과될 수 있어요.
        신탁 부동산 사기나 불법 점유 사례가 늘면서 생긴 규정이에요. 설계 단계부터 체계적으로 확인하고 서류를 갖춰야 해요.
      </p>

      <BorderBox>
        허위 신고·자전거래 방지 목적으로 도입된 규정이에요.<br />
        공인중개사가 확인 없이 신고하면 과태료 대상이 될 수 있으니 꼼꼼히 챙겨야 해요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        공인중개사 업무 범위에 대해 많이 묻는 내용이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 공인중개사법을 바탕으로 작성됐어요. 개별 사안은 관할 시·군·구청이나 한국공인중개사협회에 문의해 주세요." />
    </ArticleLayout>
  );
}
