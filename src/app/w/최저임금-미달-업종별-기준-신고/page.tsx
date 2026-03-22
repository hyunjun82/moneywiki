"use client";

// Q1. 내 월급이 최저임금보다 적은 것 같아서 확인하려는 근로자(알바, 직장인)
// Q2. 급여명세서를 확인해서 최저임금 미달 여부를 판단하고 고용노동부에 신고하는 행동
// Q3. 2026년 시급 10,320원/월급 216만원, 산입범위(포함·미포함 항목), 신고 절차, 처벌(3년 이하 징역/3천만원 벌금)
// Q4. GreenBox(최저임금 핵심) + EligibilityChecker(미달 확인) + Steps(신고절차) + BorderBox(처벌) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";
import { Checklist } from "@/components/article-ui/Checklist";

const REPORT_STEPS = [
  { title: "급여명세서로 미달 여부 확인", desc: "기본급 + 정기 수당(식대·교통비)을 합산하세요. 성과급·보너스는 빼고 계산해요.", tip: "월급 2,156,880원 이상이어야 해요" },
  { title: "고용노동부 민원포털 접속", desc: "minwon.moel.go.kr에 접속해서 '임금체불 진정'을 선택해요." },
  { title: "신고서 작성·제출", desc: "회사명, 체불 금액, 기간을 입력하고 제출해요. 급여명세서나 통장 입금 기록을 첨부하면 좋아요." },
  { title: "근로감독관 배정·조사", desc: "신고 후 2주 내로 담당 감독관이 배정되고 회사에 조사를 시작해요." },
];

const INCLUDE_ITEMS = [
  "기본급 (가장 중요)",
  "식대, 교통비, 가족수당, 직급수당 (정기적·일률적 수당)",
  "정기상여금 (설날, 추석 등)",
];

const EXCLUDE_ITEMS = [
  "성과급·판매 실적 보너스",
  "경영성과급 (회사 실적 기반)",
  "건강검진비, 휴양지 이용료 등 복리후생",
  "현물 식사 제공",
];

const FAQS = [
  { q: "사업장 규모가 작으면 최저임금 예외가 있나요?", a: "없어요. 근로자 수나 사업장 규모에 관계없이 모든 사업장에 동일하게 적용돼요." },
  { q: "신고하면 회사에서 보복하지 않나요?", a: "근로기준법에서 신고를 이유로 해고·감봉 등 불이익을 주는 걸 명확히 금지하고 있어요. 보복이 있으면 부당처우로 다시 신고할 수 있어요." },
  { q: "서류가 없어도 신고할 수 있나요?", a: "돼요. 급여명세서가 없어도 통장 입금 기록이나 국민연금 가입 이력으로 확인 가능해요." },
  { q: "업종별로 최저임금이 다른가요?", a: "아니에요. 2026년은 모든 업종에 동일한 시급 10,320원이 적용돼요. 과거엔 업종별 차등이 있었지만 지금은 없어요." },
  { q: "최저임금 미달 시 사업주 처벌은?", a: "3년 이하 징역 또는 3천만원 이하 벌금이에요. 처음이면 시정명령으로 끝나기도 하지만, 반복되면 검찰 송치돼요." },
  { q: "수습 기간에도 최저임금을 받아야 하나요?", a: "1년 이상 근로계약을 체결한 경우 최초 3개월간은 최저임금의 90%(시급 9,288원)까지 감액할 수 있어요. 단순노무직은 감액 불가예요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "2026년 최저임금 고시(고용노동부)", url: "https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=18144" },
      { label: "최저임금위원회", url: "https://www.minimumwage.go.kr" },
      { label: "근로기준법(법제처)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
];

const RELATED = [
  { slug: "임금체불-신고-처벌", title: "임금체불 신고 방법과 처벌", description: "최저임금 미달 외에 임금을 아예 안 주는 경우 대처법이에요." },
  { slug: "통상임금-계산-수당-포함-기준", title: "통상임금 계산과 수당 포함 기준", description: "연장수당·야간수당 계산에 필요한 통상임금 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 임금 · 최저임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 최저임금 미달이면?<br />
        신고 방법과 처벌 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        내 월급이 법적 최저선보다 적을 수 있어요.
        2026년 최저임금은 시급 10,320원, 주 40시간 기준 월급 약 216만원(2,156,880원)이에요.
        모든 업종에 동일하게 적용되고, 미달이면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 신고할 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>2026년 최저임금은 얼마예요?</H2>
      <p style={body}>
        <a href="https://www.minimumwage.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>최저임금위원회</a> 결정에 따라 2026년 최저임금은 시급 10,320원이에요.
        2025년(10,030원)보다 290원(2.9%) 올랐고, 17년 만에 노사가 합의한 금액이에요.
      </p>

      <GreenBox title="2026년 최저임금 핵심">
        · 시급: 10,320원<br />
        · 일급(8시간): 82,560원<br />
        · 월급(주 40시간, 209시간): 2,156,880원<br />
        · 업종별 차등: 없음 (전 업종 동일)
      </GreenBox>

      <Divider />

      <H2>최저임금에 뭐가 포함되나요?</H2>
      <p style={body}>
        월급이 216만원 넘는 것처럼 보여도, 최저임금 산입범위에 포함되지 않는 항목이 있으면 미달일 수 있어요.
        포함되는 항목과 안 되는 항목을 정확히 구분해야 해요.
      </p>

      <SectionBadge>포함되는 항목</SectionBadge>
      <Checklist items={INCLUDE_ITEMS} />

      <SectionBadge>포함되지 않는 항목</SectionBadge>
      <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "14px 18px", marginBottom: 18 }}>
        {EXCLUDE_ITEMS.map((item, i) => (
          <p key={i} style={{ ...body, marginBottom: i < EXCLUDE_ITEMS.length - 1 ? 6 : 0, fontSize: 14 }}>· {item}</p>
        ))}
      </div>

      <Divider />

      <H2>미달이면 이렇게 신고하세요</H2>
      <p style={body}>
        온라인 신고가 가장 간편해요. 급여명세서가 없어도 통장 입금 기록으로 신고 가능해요.
      </p>

      <SectionBadge>신고 절차</SectionBadge>
      <Steps steps={REPORT_STEPS} />

      <BorderBox>
        최저임금 미달 시 사업주 처벌은 <strong>3년 이하 징역 또는 3천만원 이하 벌금</strong>이에요.
        처음 적발되면 시정명령으로 끝나기도 하지만, 반복되거나 금액이 크면 검찰에 송치돼요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>에서 신고를 이유로 한 불이익도 명확히 금지하고 있어요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <RelatedArticles items={RELATED} />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용노동부·최저임금위원회 공개 자료를 바탕으로 작성했어요. 개별 사업장의 임금 구성은 다를 수 있으니 급여명세서를 직접 확인하세요." />
    </ArticleLayout>
  );
}
