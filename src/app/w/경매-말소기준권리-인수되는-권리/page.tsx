"use client";
// Q1. 경매 낙찰 받으려는데 어떤 권리를 떠안게 되는지 불안한 상황
// Q2. 말소기준권리 파악 → 인수/말소 권리 구분 → 낙찰 전 권리분석
// Q3. 말소기준권리 정의, 인수되는 권리 목록, 무조건 인수 권리(유치권 등), 실전 확인법
// Q4. GreenBox(말소기준권리 정의) + CompareTable(인수 vs 말소) + Steps(권리분석 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const FAQS = [
  { q: "말소기준권리가 뭔가요?", a: "경매에서 낙찰 후 사라질 권리와 남을 권리를 나누는 기준이에요. 가장 먼저 등기된 저당권·압류·경매개시결정이 말소기준권리가 돼요." },
  { q: "선순위 전세권은 무조건 인수인가요?", a: "배당요구를 안 했으면 인수돼요. 배당요구를 했으면 배당으로 소멸하고, 못 받은 금액만 낙찰자에게 청구할 수 있어요." },
  { q: "유치권이 있으면 낙찰 받으면 안 되나요?", a: "유치권 금액이 크면 낙찰가 이상의 부담이 생길 수 있어요. 유치권 신고 내역과 실제 점유 여부를 반드시 현장에서 확인해야 해요." },
  { q: "법정지상권은 어떤 건가요?", a: "토지와 건물 소유자가 달라질 때 건물 소유자가 토지를 사용할 수 있는 권리예요. 토지만 낙찰받으면 건물 철거를 요구할 수 없어요." },
  { q: "권리분석은 어디서 하나요?", a: "대법원 경매정보 사이트에서 등기부등본, 매각물건명세서, 현황조사보고서를 확인해요. 초보라면 경매 전문 법무사 상담을 추천해요." },
  { q: "후순위 임차인은 보증금을 못 받나요?", a: "말소기준권리보다 늦게 전입한 임차인은 배당에서 밀려요. 배당금이 부족하면 보증금 일부 또는 전부를 못 받을 수 있어요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민사집행법", url: "https://www.law.go.kr/법령/민사집행법" },
    { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
  ]},
  { category: "참고", items: [
    { label: "대법원 경매정보", url: "https://www.courtauction.go.kr" },
  ]},
];

const RELATED = [
  { slug: "부동산-경매-입찰", title: "부동산 경매 입찰 방법", description: "경매 입찰 절차와 보증금 기준이에요." },
  { slug: "전세금-경매-배당", title: "전세금 경매 배당 순위", description: "경매에서 전세금 돌려받는 순서예요." },
  { slug: "경매정보-조회-사이트", title: "경매 정보 조회 사이트", description: "무료로 경매 물건 조회하는 방법이에요." },
];

const COMPARE_ROWS = [
  { label: "저당권·근저당권", optionA: "인수 (선순위)", optionB: "말소 (후순위)" },
  { label: "전세권", optionA: "인수 (배당요구 안 한 경우)", optionB: "말소 (배당요구 시)" },
  { label: "가압류·압류", optionA: "인수 (선순위)", optionB: "말소 (후순위)" },
  { label: "지상권·지역권", optionA: "인수 (선순위)", optionB: "말소 (후순위)" },
  { label: "임차권(대항력)", optionA: "인수 (선순위 대항력)", optionB: "말소 (후순위)" },
  { label: "유치권", optionA: "무조건 인수", optionB: "—" },
  { label: "법정지상권", optionA: "무조건 인수", optionB: "—" },
];

const STEPS = [
  { title: "등기부등본 발급", desc: "대법원 인터넷등기소에서 해당 부동산 등기부등본을 발급받아요.", tip: "갑구(소유권)·을구(저당권) 모두 확인" },
  { title: "말소기준권리 찾기", desc: "을구에서 가장 먼저 설정된 저당권·근저당권·압류를 찾아요. 그게 말소기준권리예요." },
  { title: "선순위·후순위 구분", desc: "말소기준권리보다 접수일이 빠르면 선순위(인수), 늦으면 후순위(말소)예요." },
  { title: "특수 권리 확인", desc: "유치권·법정지상권·분묘기지권은 등기 없이도 인수돼요. 현황조사보고서에서 확인해요." },
  { title: "매각물건명세서 확인", desc: "법원이 작성한 매각물건명세서에 인수 권리가 정리돼 있어요. 최종 확인 자료로 활용해요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 낙찰받으면 떠안는 권리가 있다고?<br />
        말소기준권리와 인수되는 권리 구분법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        경매로 집을 싸게 사려는데, 낙찰 후 갑자기 전세금을 돌려줘야 하거나 유치권자가 나타나면 낭패예요.
        말소기준권리를 기준으로 어떤 권리가 사라지고 어떤 권리를 떠안는지 알면 위험을 피할 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>말소기준권리가 뭔지부터 알아야 해요</H2>
      <p style={body}>
        경매에서 낙찰되면 등기부에 있는 권리들이 정리돼요. 이때 &quot;어디까지 지우고 어디까지 남길까&quot;를 정하는 기준이 말소기준권리예요.
      </p>
      <GreenBox>
        <strong>말소기준권리 = 가장 먼저 등기된 담보권</strong><br /><br />
        저당권·근저당권·압류·가압류·경매개시결정등기 중 가장 빠른 접수일자가 기준이에요.<br />
        이 권리보다 먼저 등기된 건 살아남고(인수), 나중에 등기된 건 지워져요(말소).<br /><br />
        ★ 접수일자 기준이지 설정일자가 아니에요. 등기부등본 을구에서 접수번호 순서를 확인해요.
      </GreenBox>

      <H2>인수되는 권리 vs 말소되는 권리</H2>
      <p style={body}>
        선순위냐 후순위냐에 따라 결과가 완전히 달라져요. 유치권과 법정지상권은 순위와 무관하게 무조건 인수라는 점이 핵심이에요.
      </p>
      <CompareTable titleA="인수 (낙찰자 부담)" titleB="말소 (소멸)" rows={COMPARE_ROWS} />

      <H2>권리분석은 이 순서로 해요</H2>
      <p style={body}>
        경매 입찰 전에 반드시 권리분석을 해야 해요. 5단계만 따라 하면 인수 위험을 미리 파악할 수 있어요.
      </p>
      <Steps steps={STEPS} />

      <H2>유치권·법정지상권이 가장 무서워요</H2>
      <p style={body}>
        등기부에 나오지 않는데도 낙찰자가 떠안아야 하는 권리들이 있어요. 현장 확인 없이 입찰하면 큰 손해를 볼 수 있어요.
      </p>
      <BorderBox>
        <strong>유치권</strong> — 공사대금 등을 받지 못한 사람이 건물을 점유하면서 주장하는 권리. 등기 없이 성립하고 낙찰자에게 그대로 넘어가요. 허위 유치권도 많으니 실제 점유와 채권 증빙을 꼼꼼히 확인해야 해요.<br /><br />
        <strong>법정지상권</strong> — 토지와 건물이 원래 같은 소유자였는데 경매로 소유자가 달라지면 건물 소유자에게 자동으로 생기는 토지 사용권이에요. 토지만 낙찰받으면 건물 철거를 요구할 수 없어요.<br /><br />
        <strong>분묘기지권</strong> — 타인 토지에 합법적으로 설치된 묘지의 사용권이에요. 토지 낙찰받아도 묘지 이전을 강제하기 어려워요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 민사집행법 기준으로 작성됐어요. 개별 경매 물건의 권리관계는 등기부등본과 매각물건명세서를 직접 확인하거나 법무사·변호사에게 상담받으세요." />
    </ArticleLayout>
  );
}
