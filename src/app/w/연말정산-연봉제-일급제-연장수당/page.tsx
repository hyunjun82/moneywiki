"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     연봉제 또는 일급제 근로자가 연장수당의 비과세 처리 방법과 조건이 궁금한 상황
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     급여명세서에서 연장수당 비과세 반영 여부를 확인하고, 미반영 시 회사에 수정 요청한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     비과세 대상(생산직+월 210만원 이하+직전 총급여 3,000만원 이하), 월 240만원 한도, 연봉제 포괄임금제 문제, 일급제 연장수당 계산, 급여명세서 확인 방법
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     DocTable로 연봉제vs일급제 비교 + GreenBox로 비과세 조건 + Checklist로 확인사항 + BorderBox로 주의사항

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARE_TABLE = {
  headers: ["구분", "연봉제", "일급제"],
  rows: [
    ["급여 기준", "연간 총액 ÷ 12개월", "일당 x 근무일수"],
    ["연장수당 계산", "시급 x 1.5 x 연장시간", "일급 ÷ 8 x 1.5 x 연장시간"],
    ["포괄임금 포함 여부", "포함 가능 (별도 확인 필요)", "보통 별도 지급"],
    ["비과세 적용", "별도 지급 시만 가능", "동일 조건 적용"],
    ["급여명세서 표시", "연장수당 항목 별도 확인", "기본급과 분리 표시"],
  ],
};

const NONTAX_TABLE = {
  headers: ["조건", "기준", "비고"],
  rows: [
    ["대상 근로자", "생산직 및 관련직", "공장, 광업, 어업, 운전 등"],
    ["월정액 급여", "210만원 이하", "비과세 수당 제외"],
    ["직전 과세기간 총급여", "3,000만원 이하", "비과세 제외 총급여 기준"],
    ["비과세 한도", "월 240만원", "연장+야간+휴일수당 합산"],
  ],
};

const VERIFY_CHECKLIST = [
  "급여명세서에 '연장근로수당'이 별도 항목으로 있나요?",
  "비과세 처리가 되어 있나요? (비과세란에 표시)",
  "연장+야간+휴일수당 합계가 월 240만원 이내인가요?",
  "본인이 생산직 등 비과세 대상 업종인가요?",
  "월정액 급여가 210만원 이하인가요?",
  "원천징수영수증 비과세 소득란에 반영되어 있나요?",
];

const FAQS = [
  { q: "포괄임금제인데 연장수당 비과세 가능해요?", a: "연봉에 연장수당이 포함된 포괄임금제라면 비과세 적용이 어려워요. 연장수당이 별도 항목으로 분리돼야 비과세를 받을 수 있어요." },
  { q: "사무직도 연장수당 비과세 받을 수 있나요?", a: "아니에요. 비과세는 생산직 및 관련직 근로자만 대상이에요. 사무직은 연장수당을 받더라도 전액 과세 대상이에요." },
  { q: "월 240만원을 넘으면 어떻게 되나요?", a: "240만원까지만 비과세, 초과분은 전액 과세예요. 연장수당 200만원 + 야간수당 100만원 = 300만원이면 240만원 비과세, 60만원은 과세돼요." },
  { q: "일급제 아르바이트도 해당되나요?", a: "조건을 충족하면 가능해요. 생산직 등 해당 업종이고, 월정액 210만원 이하, 직전 총급여 3,000만원 이하면 비과세 적용돼요." },
  { q: "연장수당 비과세가 안 되어 있으면 어떻게 하나요?", a: "회사 급여 담당자에게 비과세 요건을 확인하고 수정 요청하세요. 이미 지나간 연도는 경정청구로 5년 이내 돌려받을 수 있어요." },
];

const SOURCES = [
  { name: "소득세법 제12조 (비과세소득)", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "근로기준법 제56조 (연장근로 가산수당)", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "국세청 비과세 근로소득 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "연말정산-급여", title: "연말정산 급여와 총급여", description: "급여 구성과 비과세 항목 정리." },
  { slug: "연말정산-식대-비과세", title: "연말정산 식대 비과세", description: "월 20만원 비과세 적용 조건." },
  { slug: "연말정산-세율표", title: "연말정산 세율표", description: "과세표준별 세율 6~45%." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 연장수당 · 비과세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연봉제·일급제 연장수당, 비과세 받을 수 있을까?<br />
        조건과 확인 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연장수당을 받고 있는데, 이게 비과세인지 과세인지 급여명세서만 봐서는 모르겠죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제12조</a>에 따르면 연장·야간·휴일수당은 <strong>생산직 근로자이면서 월 급여 210만원 이하</strong>일 때 월 240만원까지 비과세예요. 연봉제든 일급제든 이 조건을 충족하면 적용돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>비과세 조건, 내가 해당되나요?</H2>
      <p style={body}>
        연장수당 비과세는 누구나 받을 수 있는 게 아니에요. 아래 조건을 모두 충족해야 해요.
      </p>

      <SectionBadge>연장수당 비과세 조건 (2025년 기준)</SectionBadge>
      <DocTable headers={NONTAX_TABLE.headers} rows={NONTAX_TABLE.rows} />

      <GreenBox>
        비과세 3가지 조건:{"\n"}
        1. 생산직 및 관련직 근로자{"\n"}
        2. 월정액 급여 210만원 이하{"\n"}
        3. 직전 과세기간 총급여 3,000만원 이하{"\n\n"}
        → 연장+야간+휴일수당 합산 월 240만원까지 비과세
      </GreenBox>

      <CategoryButton label="연말정산 정보" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>연봉제와 일급제, 연장수당 처리가 다르나요?</H2>
      <p style={body}>
        급여 형태에 따라 연장수당 계산과 비과세 적용 방식이 조금 달라요.
      </p>

      <SectionBadge>연봉제 vs 일급제 연장수당 비교</SectionBadge>
      <DocTable headers={COMPARE_TABLE.headers} rows={COMPARE_TABLE.rows} />

      <BorderBox>
        <strong>포괄임금제 주의</strong><br />
        연봉에 연장수당이 포함된 포괄임금제라면 비과세 적용이 안 돼요. 연장수당이 급여명세서에 별도 항목으로 분리되어 있어야 비과세를 받을 수 있어요. 분리 안 되어 있으면 회사에 요청하세요.
      </BorderBox>

      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제56조</a>에 따르면 연장근로(1일 8시간, 주 40시간 초과)에 대해 통상임금의 50%를 가산한 수당을 받을 권리가 있어요. 이건 연봉제, 일급제 모두 동일해요.
      </p>

      <Divider />

      <H2>급여명세서에서 이것만 확인하세요</H2>
      <p style={body}>
        비과세가 제대로 적용됐는지 급여명세서와 원천징수영수증에서 확인할 수 있어요.
      </p>

      <Checklist items={VERIFY_CHECKLIST} />

      <p style={body}>
        비과세가 안 되어 있다면 <a href="/w/연말정산-급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>총급여</a>가 높아져서 세금을 더 내고 있는 거예요. 회사 담당자에게 수정을 요청하세요.
      </p>

      <Divider />

      <H2>연장수당 비과세, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 소득세법과 근로기준법을 바탕으로 작성했어요. 비과세 기준은 법 개정에 따라 달라질 수 있으니 최신 정보는 국세청(126)에서 확인해보세요." />
    </ArticleLayout>
  );
}
