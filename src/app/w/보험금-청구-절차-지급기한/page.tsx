"use client";
// Q1. 보험사고가 발생해서 보험금을 청구해야 하는데 절차를 모르고, 빨리 받고 싶은 상황이에요.
// Q2. 보험회사에 청구 서류를 제출하고, 3영업일 이내에 보험금을 받는 행동.
// Q3. 청구 절차 5단계, 지급기한(3영업일/10영업일), 필요 서류, 청구권 소멸시효(3년), 거절 시 대응(금감원 민원).
// Q4. Steps(청구 절차) + DocTable(필요 서류) + BorderBox(지급기한 정리) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, DocTable,
  ArticleLayout,
} from "@/components/article-ui";

const STEPS = [
  { title: "보험회사에 사고 접수", desc: "전화·앱·홈페이지로 사고 사실을 알려요. 계약자 이름, 증권번호, 사고 내용을 말하면 돼요.", tip: "담당자가 필요 서류를 안내해줘요. 메모해두세요." },
  { title: "청구 서류 준비", desc: "보험금 청구서, 신분증 사본, 통장 사본은 기본이에요. 진단서·영수증 같은 증빙은 사고 유형에 따라 달라요." },
  { title: "서류 제출", desc: "앱·카카오톡·이메일·우편으로 제출해요. 요즘은 사진 찍어서 앱으로 보내면 끝이에요." },
  { title: "보험회사 심사", desc: "제출 서류를 검토하고 보장 대상인지, 금액은 얼마인지 계산해요. 간단하면 1~2일이면 끝나요." },
  { title: "보험금 지급", desc: "심사 완료 후 계좌로 입금돼요. 문자나 카카오톡으로 지급 알림이 와요." },
];

const DOCS = [
  { name: "보험금 청구서", required: true, where: "보험회사 앱 또는 홈페이지에서 작성" },
  { name: "신분증 사본", required: true, where: "주민등록증·운전면허증" },
  { name: "통장 사본", required: true, where: "본인 명의 계좌" },
  { name: "진단서 또는 소견서", required: false, where: "병원 발급 (입원·수술 시 필수)" },
  { name: "치료비 영수증 + 세부내역서", required: false, where: "병원 수납 창구 (실손보험 청구 시 필수)" },
  { name: "사고 증빙 서류", required: false, where: "교통사고 확인서, 진단서 등 사고 유형별 상이" },
];

const FAQS = [
  { q: "보험금 청구는 사고 후 언제까지 해야 하나요?", a: "청구권 소멸시효가 3년이에요. 사고 발생일로부터 3년 안에 청구해야 해요. 3년 넘으면 보험금을 못 받아요." },
  { q: "보험회사가 보험금을 안 주면 어떻게 하나요?", a: "금융감독원 콜센터(1332) 또는 홈페이지에서 민원을 넣을 수 있어요. 금액이 크면 금융분쟁조정위원회에 분쟁조정을 신청하면 돼요." },
  { q: "실손보험 여러 개 들었으면 중복 청구 되나요?", a: "실손보험은 실제 낸 병원비까지만 보상해요. A보험사에서 100만원 받았으면 B보험사에서는 추가로 못 받아요." },
  { q: "지급기한 넘기면 어떻게 되나요?", a: "지연이자가 자동으로 붙어요. 약관대출 이율(보통 연 5~6%) 기준으로 계산돼요. 보험회사도 빨리 처리하려고 해요." },
  { q: "카카오톡으로 청구할 수 있나요?", a: "대부분 보험회사가 카카오톡이나 자사 앱으로 간편 청구를 지원해요. 서류 사진 찍어서 보내면 접수돼요." },
  { q: "허위 청구하면 어떻게 되나요?", a: "보험사기로 형사처벌 대상이에요. 보험금도 못 받고 기존 계약까지 해지될 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령정보 — 보험금 지급", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=526" },
      { label: "손해보험협회 소비자포털", url: "https://consumer.knia.or.kr/disclosure/item/08.do" },
      { label: "금융감독원 보험 민원", url: "https://www.fss.or.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보험 · 청구</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보험금 청구, 어떻게 하나요?<br />
        절차 5단계와 지급기한 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        병원비 수백만원 나왔는데, 보험 들어놓은 건 있는데 청구를 어떻게 해야 할지 모르겠죠?
        요즘은 앱으로 사진만 찍어 보내면 3영업일 안에 입금돼요.
        절차가 생각보다 간단하니까 차근차근 따라 해보세요.
      </p>

      <Divider />

      <H2>청구 절차, 5단계면 끝나요</H2>
      <p style={body}>
        보험금 청구는 사고 접수 → 서류 준비 → 제출 → 심사 → 입금 순서예요.
        간단한 실손보험은 접수부터 입금까지 2~3일이면 끝나요.
      </p>

      <SectionBadge>보험금 청구 5단계</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>지급기한, 언제까지 줘야 하나요?</H2>
      <p style={body}>
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=526" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에 따르면
        보험회사는 정해진 기한 안에 보험금을 지급해야 해요.
      </p>

      <BorderBox>
        보험금 지급기한 정리예요.<br /><br />
        <strong>원칙: 서류 접수 후 3영업일 이내</strong><br />
        간단한 실손보험, 입원비 등은 보통 이 안에 처리돼요.<br /><br />
        <strong>조사 필요 시: 최대 10영업일</strong><br />
        사고 원인이나 보장 대상 여부를 확인해야 하는 경우예요.<br /><br />
        <strong>지연이자 발생</strong><br />
        기한 넘기면 약관대출 이율(보통 연 5~6%)로 지연이자가 자동 발생해요.
      </BorderBox>

      <Divider />

      <H2>필요 서류, 뭘 챙겨야 하나요?</H2>
      <p style={body}>
        기본 3가지(청구서·신분증·통장사본)는 공통이고, 나머지는 사고 유형에 따라 달라져요.
        보험회사에 전화하면 필요 서류를 정확히 안내해줘요.
      </p>

      <SectionBadge>서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>거절됐을 때, 어떻게 대응하나요?</H2>
      <p style={body}>
        보험회사가 보험금을 안 준다고 하면 먼저 거절 사유를 정확히 확인하세요.
        서류 부족이면 보충 제출하면 되고, 보장 범위 다툼이면 민원이나 분쟁조정으로 해결할 수 있어요.
      </p>

      <GreenBox>
        거절 시 대응 순서예요.<br />
        · 1단계: 보험회사에 거절 사유 서면 요청<br />
        · 2단계: 부족 서류 보충 제출 또는 재심사 요청<br />
        · 3단계: <a href="https://www.fss.or.kr" style={{ color: "#085041", textDecoration: "underline" }}>금융감독원</a> 민원 신청 (1332)<br />
        · 4단계: 금액이 크면 금융분쟁조정위원회 분쟁조정 신청
      </GreenBox>

      <p style={body}>
        청구권 소멸시효는 사고일로부터 3년이에요. "나중에 해도 되겠지" 하다가 놓치면 못 받아요.
        사고 나면 바로 청구하는 게 가장 좋아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 보험업법·찾기쉬운 생활법령정보를 바탕으로 작성했어요. 보험금 청구 절차와 지급기한은 보험사·상품에 따라 다를 수 있으니 가입 보험회사에 직접 문의하세요." />
    </ArticleLayout>
  );
}
