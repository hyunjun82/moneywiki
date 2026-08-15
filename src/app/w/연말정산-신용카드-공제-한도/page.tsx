"use client";
// Q1. 카드를 많이 썼는데 연말정산 환급이 적어서 왜 그런지, 실제로 얼마 돌려받는지 확인하려는 직장인
// Q2. 카드 공제 구조를 이해하고, 25% 이후 체크카드로 전환해서 공제 효과를 극대화한다
// Q3. 25% 기준선, 카드별 공제율(신용15%·체크30%·전통시장40%), 기본한도(300만)·추가한도(300만), 제외 항목
// Q4. GreenBox(핵심 공식) + BorderBox(카드별 공제율) + Checklist(절세 전략) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "연봉 25%까지는 혜택 좋은 신용카드로 포인트·캐시백 챙기기",
  "25% 넘은 후에는 체크카드·현금영수증으로 전환 (30% 공제)",
  "전통시장·대중교통은 40% 공제율, 우선 사용",
  "문화비(도서·공연·영화) 30% 공제 활용 (총급여 7천만원 이하)",
  "맞벌이면 소득 높은 쪽에 카드 사용 몰아주기",
  "공제 안 되는 항목(세금·통신비·보험료) 제외하고 계산하기",
];

const FAQS = [
  {
    q: "신용카드랑 체크카드 중 뭐가 유리해요?",
    a: "25% 넘기 전까지는 신용카드로 포인트를 모으고, 넘은 후에는 체크카드(30%)로 바꾸는 게 가장 유리해요.",
  },
  {
    q: "25% 안 넘으면 아예 공제 못 받나요?",
    a: "네. 총급여 5천만원이면 1,250만원 넘게 써야 공제가 시작돼요. 그 전까지는 카드를 아무리 써도 공제 0원이에요.",
  },
  {
    q: "공제 안 되는 항목이 뭔가요?",
    a: "세금, 공과금(전기·수도), 통신비, 인터넷료, 신차 구매, 자동차 리스, 해외 결제, 면세점, 보험료, 학교 등록금은 안 돼요.",
  },
  {
    q: "맞벌이면 어떻게 하는 게 좋아요?",
    a: "소득 높은 쪽에 카드 사용을 몰아주세요. 25% 기준선을 빨리 넘기고 초과분부터 공제를 받는 게 유리해요.",
  },
  {
    q: "헬스장도 공제되나요?",
    a: "네, 2025년 7월부터 헬스장·수영장 이용료도 30% 공제돼요. 총급여 7천만원 이하만 해당이에요.",
  },
  {
    q: "카드 공제 신청은 따로 해야 하나요?",
    a: "아니에요. 홈택스 간소화서비스에서 카드사 데이터가 자동으로 집계돼요. 따로 영수증 챙길 필요 없어요.",
  },
];

const SOURCES = [
  { name: "조세특례제한법 제126조의2", href: "https://www.law.go.kr/법령/조세특례제한법" },
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "홈택스 간소화서비스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-문화비", title: "문화비 소득공제 30%", description: "도서·공연·영화·헬스장 30% 공제 조건." },
  { slug: "연말정산-근로소득-범위", title: "근로소득 범위와 비과세 항목", description: "뭐가 과세되고 뭐가 안 되는지 정리." },
  { slug: "연말정산-다자녀-추가공제", title: "다자녀 자녀세액공제", description: "자녀 수에 따라 25만~95만원 세액공제." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 신용카드 · 소득공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        카드 많이 써도 환급이 적은 이유?<br />
        신용카드 공제 한도와 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        1년 동안 카드값 수천만원 냈는데 환급은 고작 몇십만원이라 실망한 적 있죠.
      </p>
      <p style={body}>
        카드 공제는 쓴 만큼 돌려받는 구조가 아니에요.
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법</a> 기준으로
        총급여의 <strong>25%를 초과한 금액</strong>부터 공제가 시작되고,
        거기에 카드별 공제율을 곱하고, 다시 세율을 곱해야 실제 환급액이 나와요.
        그래서 구조를 알아야 전략적으로 쓸 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>카드 공제가 이렇게 계산돼요</H2>
      <p style={body}>
        많은 분이 "카드 공제율 15%면 쓴 금액의 15% 돌려받는 거 아니야?"라고 생각하는데, 아니에요.
      </p>

      <SectionBadge>계산 구조</SectionBadge>
      <GreenBox title="신용카드 공제 계산 공식">
        <p><strong>① 총급여의 25% 초과 사용분</strong>이 공제 대상</p>
        <p><strong>② 카드별 공제율</strong>을 곱해서 공제액 산출</p>
        <p><strong>③ 기본 한도</strong>(300만원) + 추가 한도(300만원) 내에서 적용</p>
        <p><strong>④ 공제액에 본인 세율</strong>을 곱한 게 실제 환급액</p>
      </GreenBox>
      <p style={body}>
        연봉 5천만원에 카드 3천만원 썼다면? 25% 기준선 1,250만원 초과분 1,750만원이 대상이에요.
        전부 신용카드(15%)면 공제액 262만원, 세율 15%를 곱하면 실제 환급은 약 <strong>39만원</strong>이에요.
        3천만원 쓰고 39만원 돌려받는 거예요.
      </p>

      <Divider />

      <H2>카드별 공제율이 이렇게 다릅니다</H2>
      <p style={body}>
        같은 금액이라도 뭘로 결제하느냐에 따라 공제율이 달라져요.
      </p>

      <SectionBadge>카드별 공제율</SectionBadge>
      <BorderBox>
        <p><strong>신용카드</strong> — 15% (가장 낮음)</p>
        <p><strong>체크카드·현금영수증</strong> — 30%</p>
        <p><strong>전통시장</strong> — 40%</p>
        <p><strong>대중교통</strong> — 40%</p>
        <p><strong>도서·공연·영화 (<a href="/w/연말정산-문화비" style={{ color: "#1D9E75" }}>문화비</a>)</strong> — 30% (총급여 7천만원 이하)</p>
        <p><strong>헬스장·수영장</strong> — 30% (2025년 7월~, 총급여 7천만원 이하)</p>
      </BorderBox>

      <Divider />

      <H2>공제 한도도 알아두세요</H2>
      <p style={body}>
        아무리 많이 써도 한도 이상은 공제가 안 돼요.
      </p>
      <BorderBox>
        <p><strong>기본 한도</strong></p>
        <p>총급여 7천만원 이하 → 300만원 / 7천만원 초과~1.2억원 → 250만원 / 1.2억원 초과 → 200만원</p>
        <p><strong>추가 한도</strong> (기본 한도와 별도)</p>
        <p>전통시장 100만원 + 대중교통 100만원 + 도서·공연·영화 100만원 = 최대 300만원</p>
        <p>총급여 7천만원 이하면 기본 300만원 + 추가 300만원 = <strong>최대 600만원</strong> 공제 가능</p>
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>공제를 최대로 받는 전략이에요</H2>
      <p style={body}>
        카드 공제 구조를 알면 같은 지출로도 환급을 늘릴 수 있어요.
      </p>

      <SectionBadge>절세 전략</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />
      <p style={body}>
        카드 공제 내역은 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스 간소화서비스</a>에서
        자동으로 조회돼요. 1월 15일부터 확인할 수 있어요.
      </p>

      <Divider />

      <CategoryButton label="연말정산" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준(조세특례제한법)으로 작성했어요. 총급여와 사용 내역에 따라 실제 환급액이 달라질 수 있어요." />
    </ArticleLayout>
  );
}
