"use client";

// Q1. 정직·출근정지 받았는데 연차휴가 계산에 어떻게 반영되는지 궁금
// Q2. 징계 유형별 출근율 산정 방식 확인 → 연차 발생 여부 판단
// Q3. 정직=결근 처리, 근로일수에서 제외 방식, 80% 출근율 기준, 판례
// Q4. GreenBox(핵심 원칙) + CompareTable(징계 유형별 처리) + BorderBox(판례) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "정직(직위해제)", optionA: "결근으로 처리", optionB: "출근율 하락" },
  { label: "출근정지", optionA: "결근으로 처리", optionB: "출근율 하락" },
  { label: "감봉", optionA: "정상 출근 인정", optionB: "출근율 영향 없음" },
  { label: "견책(경고)", optionA: "정상 출근 인정", optionB: "출근율 영향 없음" },
  { label: "대기발령", optionA: "사안별 다름", optionB: "근로 제공 여부로 판단" },
];

const FAQS = [
  { q: "정직 1개월이면 연차가 안 생기나요?", a: "정직 기간이 결근 처리되면 출근율이 낮아져요. 80% 미만이 되면 연차가 발생하지 않아요. 다만 총 근로일수 대비 계산해야 해요." },
  { q: "감봉은 출근율에 영향 없다고요?", a: "네, 감봉은 급여만 줄이는 징계라 실제 출근을 했으니 정상 출근으로 인정돼요." },
  { q: "부당 징계로 판명되면 연차도 돌아오나요?", a: "부당 징계가 취소되면 해당 기간은 출근한 것으로 봐요. 연차도 다시 계산돼요." },
  { q: "대기발령 기간은 출근인가요 결근인가요?", a: "대기발령 중 근로를 제공했으면 출근, 안 했으면 결근으로 봐요. 회사의 대기발령 조건에 따라 다르니 취업규칙을 확인하세요." },
  { q: "1년 미만 근무자는 어떻게 되나요?", a: "1년 미만은 매월 1일씩 연차가 발생해요. 해당 월에 결근(정직)이 있으면 그 달 연차가 안 생길 수 있어요." },
];

const REFERENCES = [
  { category: "법령", items: [{ label: "근로기준법 제60조 (연차유급휴가)", url: "https://www.law.go.kr/법령/근로기준법" }] },
  { category: "판례", items: [{ label: "대법원 판례 검색", url: "https://glaw.scourt.go.kr" }] },
];

const RELATED = [
  { slug: "군복무기간-연차휴가-처리방법-출근율", title: "군복무 기간 연차 처리", description: "군복무 기간 출근율 산정 방법이에요." },
  { slug: "작업량-없는날-연차휴가-강제사용", title: "연차 강제사용 가능 여부", description: "작업량 없을 때 연차 강제사용이에요." },
  { slug: "소명기회-없는-해고-효력", title: "소명 기회 없는 해고", description: "절차 없는 해고 효력 판단이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 연차휴가</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        징계 받으면 연차휴가가 줄어들까?<br />
        징계 유형별 출근율 산정 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        정직이나 출근정지를 받았는데 연차 계산은 어떻게 되는지 궁금하죠.
        출근하지 못한 징계(정직·출근정지)는 결근으로 처리돼서 출근율이 떨어져요. 감봉·견책은 영향 없어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>징계 유형에 따라 출근율이 달라져요</H2>
      <p style={body}>핵심은 &quot;실제로 출근했느냐&quot;예요. 출근을 못 하는 징계만 출근율에 영향을 줘요.</p>
      <GreenBox>
        <strong>출근율 하락 징계</strong>: 정직, 출근정지 → 해당 기간 결근 처리<br />
        <strong>출근율 무관 징계</strong>: 감봉, 견책(경고) → 정상 출근 인정<br />
        <strong>연차 발생 기준</strong>: 1년간 80% 이상 출근해야 15일 연차 발생<br /><br />
        ★ 80% 미만이면 연차가 1일도 안 생기는 건 아니에요. 월 1일씩은 발생해요.
      </GreenBox>

      <H2>징계 유형별 출근 처리 비교</H2>
      <p style={body}>어떤 징계를 받았느냐에 따라 결과가 완전히 달라요.</p>
      <CompareTable titleA="출근 처리" titleB="출근율 영향" rows={COMPARE_ROWS} />

      <H2>부당 징계면 연차도 돌아와요</H2>
      <p style={body}>징계가 부당하다고 판정되면 그 기간은 출근한 것으로 보고 연차를 다시 계산해요.</p>
      <BorderBox>
        <strong>부당 징계 취소 시</strong><br />
        해당 기간 → 출근 처리 → 출근율 재산정 → 연차 재계산<br />
        미사용 연차수당도 추가 청구 가능<br /><br />
        <strong>부당 징계 구제 방법</strong><br />
        노동위원회 부당해고구제 신청 (3개월 이내)<br />
        고용노동부 진정·신고 (고용노동부 1350)
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 근로기준법 기준으로 작성됐어요. 개별 사안은 취업규칙과 판례에 따라 다를 수 있으니 노무사에게 상담받으세요." />
    </ArticleLayout>
  );
}
