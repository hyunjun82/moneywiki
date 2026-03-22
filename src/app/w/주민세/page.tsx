"use client";

// Q1. 주민세가 뭔지, 내가 얼마를 내야 하는지 궁금한 상황이에요.
// Q2. 내가 내야 할 주민세 종류와 금액을 확인하고 위택스에서 납부하는 행동.
// Q3. 균등분·사업소분·종업원분 구분, 세액 기준, 납부 시기, 미납 시 가산세.
// Q4. GreenBox(세액 요약) + DocTable(종류별 세액) + Steps(납부 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { DocTable } from "@/components/article-ui/DocTable";

const TAX_DOCS = [
  { name: "개인 균등분", required: true, where: "1만원 이하 (지자체별 상이)" },
  { name: "개인사업자 균등분", required: true, where: "5만원 이하" },
  { name: "법인 균등분", required: true, where: "5만~50만원 (자본금·종업원 수 기준)" },
  { name: "사업소분 (기본세)", required: true, where: "사업장 면적 330㎡ 초과 시 1㎡당 250원" },
  { name: "종업원분", required: true, where: "월평균 급여총액의 0.5%" },
];

const STEPS = [
  { title: "위택스 접속", desc: "위택스(wetax.go.kr)에 로그인해요.", tip: "공동인증서 또는 간편인증으로 로그인 가능" },
  { title: "주민세 조회", desc: "납부할 세금 → 주민세 메뉴에서 고지 내역을 확인해요." },
  { title: "납부", desc: "카드·계좌이체·가상계좌로 납부하면 끝이에요.", tip: "8월 31일까지 미납 시 3% 가산세 부과" },
];

const FAQS = [
  { q: "주민세 균등분은 누가 내나요?", a: "7월 1일 기준으로 해당 지자체에 주소를 둔 세대주가 내요. 세대원은 안 내고요. 사업장이 있으면 개인사업자·법인도 별도로 내야 해요." },
  { q: "8월에 안 내면 가산세가 얼마나 붙나요?", a: "납부기한 다음 날부터 3%의 가산세가 붙어요. 체납 기간이 길어지면 매달 0.75%씩 중가산세도 추가되고, 최대 60개월까지 누적돼요." },
  { q: "사업소분은 모든 사업장이 내나요?", a: "기본세는 모든 사업장이 내요. 면적분은 330㎡(약 100평) 초과 사업장만 추가로 내고요. 종업원분은 월평균 급여총액이 1억 5천만원 넘는 사업장만 해당돼요." },
  { q: "세입자도 주민세를 내나요?", a: "전입신고를 한 세대주라면 내야 해요. 임차인이든 자가 소유자든 세대주 기준이에요. 세대원이면 안 내고요." },
  { q: "주민세를 자동이체로 낼 수 있나요?", a: "위택스에서 자동납부를 신청하면 매년 8월에 자동으로 빠져나가요. 자동납부 신청하면 세액 공제 혜택도 있어요." },
  { q: "법인 주민세 금액은 어떻게 정해지나요?", a: "자본금과 종업원 수에 따라 5만원에서 50만원까지 차등이에요. 자본금 100억 이상이고 종업원 100명 넘으면 최고 구간이에요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "지방세법(법제처)", url: "https://www.law.go.kr/법령/지방세법" },
  ]},
  { category: "신고·납부", items: [
    { label: "위택스", url: "https://www.wetax.go.kr" },
  ]},
];

const RELATED = [
  { slug: "등록면허세", title: "등록면허세 세율과 납부 방법", description: "면허·등록할 때 내는 지방세, 세율이 궁금하다면 확인해보세요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "부동산 취득할 때 내는 세금, 세율 구간별로 정리했어요." },
  { slug: "연말정산-세액계산-방법", title: "연말정산 세액계산 방법", description: "소득세와 지방소득세를 함께 계산하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 지방세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주민세, 나는 얼마를 내야 할까?<br />
        종류별 세액과 납부 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매년 8월이면 주민세 고지서가 날아오죠. 금액이 작다 보니 뭔지도 모르고 내는 분이 많아요.
        주민세는 크게 세 가지로 나뉘고, 개인이면 1만원 이하, 사업자면 면적·종업원에 따라 달라져요.
        미납하면 가산세가 붙으니 8월 안에 처리하는 게 좋아요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>주민세 3가지, 뭐가 다른가요?</H2>
      <p style={body}>
        주민세는 <a href="https://www.law.go.kr/법령/지방세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>지방세법</a>에서
        정한 지방세예요. 균등분·사업소분·종업원분으로 나뉘는데, 대부분의 개인은 균등분만 내면 돼요.
        사업장을 운영하고 있다면 사업소분이 추가되고, 직원이 많은 사업장은 종업원분까지 내야 하고요.
      </p>

      <SectionBadge>종류별 세액 기준</SectionBadge>
      <DocTable docs={TAX_DOCS} />

      <p style={body}>
        개인 균등분은 세대주만 내요. 세대원이라면 부과 대상이 아니에요.
        사업소분 면적세는 사업장이 330㎡(약 100평)를 넘을 때만 추가되니, 소규모 사업장이라면 기본세만 내면 돼요.
      </p>

      <Divider />

      <H2>납부는 위택스에서 3분이면 끝나요</H2>
      <p style={body}>
        주민세 납부 기한은 매년 8월 16일~31일이에요. 위택스에서 온라인으로 납부하는 게 가장 빠르고요.
        자동납부를 설정해두면 매년 신경 쓸 필요도 없어요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        위택스가 어렵다면 가까운 은행 CD/ATM기에서도 납부할 수 있어요. 고지서에 적힌 가상계좌로 이체해도 되고요.
        미납하면 3% 가산세가 즉시 붙으니 기한 내 처리하세요.
      </p>

      <Divider />

      <H2>미납하면 가산세가 얼마나 붙나요?</H2>
      <p style={body}>
        8월 31일 기한을 넘기면 바로 3% 가산세가 붙어요. 여기서 끝이 아니에요.
        체납이 계속되면 매달 0.75%씩 중가산세가 추가되고, 최대 60개월(45%)까지 누적돼요.
      </p>

      <GreenBox title="가산세 구조">
        납부기한 다음 날: 3% 가산세 즉시 부과<br />
        체납 1개월 후부터: 매달 0.75% 중가산세 추가<br />
        최대 60개월간 누적: 원래 세액의 45%까지 가산
      </GreenBox>

      <p style={body}>
        균등분 1만원짜리라도 5년 넘게 체납하면 1만 4,500원이 돼요. 금액이 작다고 방치하면 재산 압류까지 갈 수 있으니 빠르게 정리하는 게 좋아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 지방세법을 기준으로 작성됐어요. 지자체별로 세액이 다를 수 있으니 위택스에서 본인 고지 내역을 확인하세요." />
    </ArticleLayout>
  );
}
