"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 불법 증축 있는 집을 샀거나, 직접 증축해서 구청에서 이행강제금 고지서를 받은 상황
// Q2. 이행강제금 금액 계산 → 감경 조건 확인 → 철거/불복 중 어떤 대응을 할지 결정
// Q3. 계산 공식(면적×공시지가×부과율), 부과율(무단증축 50%), 감경(소유권변경 75%), 철거하면 중단
// Q4. GreenBox(계산 예시) + BorderBox(감경 조건) + Steps(철거 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "이행강제금은 몇 번 나오나요?",
    a: "시정명령을 이행하지 않으면 연 2회까지 부과돼요. 시정할 때까지 계속 나올 수 있어요. 빨리 철거하는 게 장기적으로 유리해요.",
  },
  {
    q: "불법 증축 부분만 철거하면 이행강제금 안 내나요?",
    a: "위반 부분을 철거하고 구청에 시정 결과를 제출하면 불법건축물 지정이 해제돼요. 그 이후로는 추가 부과가 없어요. 이미 부과된 건 내야 해요.",
  },
  {
    q: "불법건축물인 줄 모르고 샀는데 이행강제금 감경되나요?",
    a: "네. 위반 발생 후 소유권이 변경된 경우 75% 감경받을 수 있어요. 등기부등본과 매매계약서로 내가 불법 증축한 게 아님을 증명하면 돼요.",
  },
  {
    q: "이행강제금 부과에 이의를 제기할 수 있나요?",
    a: "네. 부과 통지를 받은 날부터 90일 이내에 행정심판을 청구할 수 있어요. 계산 오류나 감경 미적용이 있으면 충분히 다툴 수 있어요.",
  },
  {
    q: "철거 비용과 이행강제금 중 어느 쪽이 더 나올까요?",
    a: "상황마다 달라요. 단순 증축은 철거 비용이 적을 수 있고, 이행강제금은 매년 나오니까 오래 방치하면 누적 금액이 훨씬 커져요. 공시지가가 높은 지역일수록 이행강제금이 빠르게 쌓여요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "건축법 제80조 (이행강제금)", url: "https://www.law.go.kr/법령/건축법/제80조" },
      { label: "찾기쉬운 생활법령정보 - 위반건축물", url: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1406&ccfNo=3&cciNo=2&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "임대차-건물-철거-임차인-보호", title: "임대차 건물 철거 임차인 보호", description: "세입자가 있을 때 철거 절차가 달라요." },
  { slug: "소유권이전등기-신청-절차", title: "소유권이전등기 신청 절차", description: "소유권 변경 증명에 필요한 등기 절차예요." },
  { slug: "부동산-중개수수료-요율-계산", title: "부동산 중개수수료 요율 계산", description: "집 살 때 복비 얼마 내는지 계산해요." },
];

const STEPS = [
  { title: "위반 부분 정확히 확인", desc: "구청 시정명령서에 위반 내용과 면적을 확인해요. 어디를 얼마나 철거해야 하는지 파악하세요." },
  { title: "철거 업체 선정 또는 직접 철거", desc: "증축 규모에 따라 직접 하거나 철거 업체를 불러요. 비용은 소유자가 부담해요." },
  { title: "시정 결과 구청 제출", desc: "철거 완료 후 사진, 측량 결과 등 증빙을 구청에 제출해요. 현장 확인을 요청할 수 있어요." },
  { title: "불법건축물 지정 해제 확인", desc: "구청 확인 후 불법건축물 지정이 해제되면 이행강제금 추가 부과가 중단돼요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축물 · 이행강제금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        불법건축물 이행강제금<br />
        부과 기준, 감경 조건, 철거로 중단하는 법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        구청에서 이행강제금 고지서가 왔죠? 계산 공식이 있고, 줄일 수 있는 감경 조건도 있어요.
        직접 불법 증축한 게 아니라면 75% 감경받을 수 있고, 철거하면 추가 부과가 멈춰요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>이행강제금 계산 방법</H2>
      <p style={body}>
        이행강제금은 <a href="https://www.law.go.kr/법령/건축법/제80조" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>건축법 제80조</a>에서 정해요.
        벌금이 아니라 행정상 제재예요. 시정할 때까지 계속 부과될 수 있어요.
      </p>
      <p style={body}>
        계산 공식은 이래요: <strong>위반 면적 × 제곱미터당 개별공시지가 × 부과율 × 감경율</strong>.
        부과율은 무단 증축, 건폐율 위반, 용적률 위반이 50%예요. 기타 위반은 대통령령으로 정한 10% 이내예요.
      </p>

      <GreenBox>
        <strong>계산 예시</strong><br />
        <br />
        조건: 개별공시지가 100만원/㎡ · 위반 면적 33㎡(10평) · 무단 증축(부과율 50%)<br />
        <br />
        기본 이행강제금: 33 × 100만원 × 0.5 = <strong>1,650만원</strong><br />
        소유권 변경 감경(75%): 1,650만원 × 0.25 = <strong>412만원</strong><br />
        <br />
        ★ 공시지가가 높은 서울·수도권은 이행강제금이 훨씬 커요
      </GreenBox>

      <H2>감경 받을 수 있는 조건</H2>
      <p style={body}>
        이행강제금을 줄일 수 있는 경우가 정해져 있어요. 내가 해당하는지 먼저 살펴봐요.
      </p>

      <BorderBox>
        <strong>감경 조건 3가지</strong><br />
        <br />
        ① <strong>소유권 변경 후 매입: 75% 감경</strong><br />
        위반이 발생한 뒤 소유권이 바뀐 경우예요. 등기부등본 + 매매계약서로 증명하면 돼요.<br />
        <br />
        ② <strong>농축산 시설: 20% 감경</strong><br />
        500㎡ 미만(수도권 외 1,000㎡ 미만) 축사, 농축산물 보관 창고가 대상이에요.<br />
        <br />
        ③ <strong>자진 시정</strong><br />
        시정명령 받기 전에 자진해서 고치면 지자체 조례에 따라 감경 또는 면제될 수 있어요.<br />
        <br />
        ★ 감경받으려면 증빙 서류를 구청에 제출해야 해요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <H2>철거하면 이행강제금이 멈춰요</H2>
      <p style={body}>
        이행강제금을 계속 내는 것보다 한 번에 철거하는 게 장기적으로 유리해요.
        이행강제금은 매년 나오고, 공시지가가 오르면 금액도 올라요.
      </p>

      <Steps steps={STEPS} />

      <H2>이의가 있으면 90일 내 행정심판</H2>
      <p style={body}>
        이행강제금 부과에 이의가 있으면 행정심판을 청구할 수 있어요.
        부과 통지를 받은 날부터 <strong>90일 이내</strong>에 관할 행정심판위원회에 신청하면 돼요.
      </p>
      <p style={body}>
        이의신청 근거로는 계산 오류(면적이 잘못 측정됐거나 부과율 잘못 적용), 감경 조건 미적용(75% 감경 대상인데 안 됐거나 농축산 시설 감경 누락), 시정 완료 후 부과(이미 철거했는데 고지서가 온 경우) 등이 돼요.
        증거로 측량 결과, 등기부등본, 매매계약서, 철거 사진, 시정 완료 확인서를 챙기세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 건축법 기준으로 작성됐어요. 이행강제금 부과 기준과 감경율은 지자체 조례에 따라 달라질 수 있으니 관할 구청에 살펴봐요." />
    </ArticleLayout>
  );
}
