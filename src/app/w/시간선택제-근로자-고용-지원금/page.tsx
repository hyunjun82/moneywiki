"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 시간선택제 근로자를 채용하거나 전환하려는 사업주인데, 정부 지원금이 얼마나 나오는지 모르는 상황이에요.
// Q2. 채용형/전환형 지원금 금액과 조건을 파악하고, 고용24에서 신청하는 행동.
// Q3. 채용형(임금 80%, 최대 연 1,920만원), 전환형(보전금+대체인력+간접노무비), 우선지원대상기업 조건, 분기별 신청.
// Q4. GreenBox(금액 요약) + BorderBox(채용형 vs 전환형) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "시간선택제 근로자 채용하면 얼마 받나요?", a: "신규 채용 시 임금의 80%를 1년간 지원받아요. 월 160만원 근로자라면 월 128만원, 연 1,536만원이에요." },
  { q: "전일제를 시간선택제로 전환해도 지원금 받나요?", a: "네. 전환형으로 임금감소 보전금, 대체인력 인건비(월 최대 80만원), 간접노무비(월 20만원)를 1년간 받을 수 있어요." },
  { q: "어떤 사업장이 지원 대상인가요?", a: "우선지원대상기업이에요. 제조업 500인 이하, 서비스업 300인 이하, 도소매업 200인 이하 사업장이에요." },
  { q: "근로자가 6개월 안에 그만두면 어떻게 되나요?", a: "지원금을 반환해야 해요. 최소 6개월은 근무해야 지원금을 계속 받을 수 있어요." },
  { q: "지원금은 어떻게 지급되나요?", a: "분기별로 신청해서 받아요. 3개월마다 신청하는 방식이고, 자동 지급이 아니라 매번 신청해야 해요." },
  { q: "주 15시간 미만도 되나요?", a: "안 돼요. 주 15시간 이상 35시간 이하여야 해요. 15시간 미만이면 고용보험도 안 되고 지원금도 못 받아요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용24 고용안정장려금", url: "https://www.work24.go.kr" },
      { label: "고용노동부 고용정책", url: "https://www.moel.go.kr" },
      { label: "찾기쉬운 생활법령정보 시간선택제", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=896&ccfNo=3&cciNo=1&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "기간제근로자-무기계약-전환-시기", title: "기간제 근로자 무기계약 전환", description: "기간제 근로자의 무기계약 전환 시기와 조건이에요." },
  { slug: "중소기업-취업자-소득세-감면-이직", title: "중소기업 취업자 소득세 감면", description: "중소기업 취업 시 소득세 감면 혜택이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 지원금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        시간선택제 근로자 고용 지원금<br />
        금액·조건·신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        시간선택제 근로자를 채용하고 싶은데 인건비가 부담되시죠.
        정부가 채용형은 임금의 80%를 1년간, 전환형은 보전금과 대체인력비까지 지원해줘요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>채용형 지원금, 임금의 80%를 받아요</H2>
      <p style={body}>
        새로 시간선택제 근로자를 무기계약직으로 채용하면 임금의 80%를 1년간 지원받아요.
        <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 신청할 수 있어요.
      </p>

      <GreenBox>
        채용형 지원금 핵심이에요.<br />
        · 지원 금액: 임금의 80%, 1년간 지원<br />
        · 예시: 월급 160만원 → 월 128만원 지원, 연 1,536만원<br />
        · 조건: 무기계약직 + 주 15~35시간 + 우선지원대상기업<br />
        · 사업주 실부담: 월 32만원(월급 160만원 기준)
      </GreenBox>

      <p style={body}>
        우선지원대상기업이어야 해요. 제조업 500인 이하, 서비스업 300인 이하, 도소매업 200인 이하 사업장이에요.
        고용보험 가입 + 임금체불 없음 + 최근 6개월 정리해고 없음도 조건이에요.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>전환형은 세 가지를 지원해요</H2>
      <p style={body}>
        기존 전일제 근로자를 시간선택제로 전환하면 임금감소 보전금, 대체인력 인건비, 간접노무비를 받아요.
      </p>

      <SectionBadge>전환형 지원금 3가지</SectionBadge>
      <BorderBox>
        <strong>임금감소 보전금</strong> — 줄어든 임금의 일부를 근로자 통장으로 1년간 보전해요.<br /><br />
        <strong>대체인력 인건비</strong> — 빈자리를 채울 대체인력 채용 시 월 최대 80만원, 1년간 지원해요.<br /><br />
        <strong>간접노무비</strong> — 업무 공백, 교육훈련비 명목으로 월 20만원씩 1년간 정액 지급해요. 전환 근로자 1명당이에요.
      </BorderBox>

      <Divider />

      <H2>고용24에서 이렇게 신청해요</H2>
      <p style={body}>
        온라인으로 간편하게 신청할 수 있어요. 분기별로 반복 신청해야 하니 일정을 챙기세요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={[
        { title: "고용24 사업주 로그인", desc: "고용24(work24.go.kr)에서 사업장 정보를 등록해요. 고용보험 가입 사업장이면 자동 연동돼요." },
        { title: "고용안정장려금 → 시간선택제 선택", desc: "채용형/전환형 선택 후 근로자 정보를 입력해요." },
        { title: "서류 첨부", desc: "근로계약서, 임금대장, 고용보험 취득신고 확인서를 스캔해서 첨부해요." },
        { title: "분기별 지급 신청", desc: "3개월마다 신청해서 받는 방식이에요. 분기 종료 후 2개월 이내에 신청해야 해요.", tip: "자동 지급이 아니에요. 매 분기 직접 신청하세요" },
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용노동부 정책을 바탕으로 작성됐어요. 지원 금액과 조건은 정책 변경 시 달라질 수 있으니 고용24에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
