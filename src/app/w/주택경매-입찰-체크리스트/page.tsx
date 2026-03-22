"use client";

// Q1. 처음 경매에 입찰하려는데 뭘 확인해야 하는지 몰라서 겁이 나는 상황이에요.
// Q2. 입찰 전 필수 확인 서류 3가지를 분석하고, 현장 점검까지 마친 뒤 입찰에 참여하는 행동.
// Q3. 등기부등본·매각물건명세서·현황조사서 분석법, 현장 체크포인트, 보증금 10%, 낙찰 후 절차.
// Q4. Checklist(입찰 전 체크) + Steps(입찰 절차) + GreenBox(핵심 서류 3종) + BorderBox(보증금) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  "등기부등본으로 소유권·근저당·가압류 확인했나요?",
  "매각물건명세서에서 인수할 권리(대항력 있는 임차인 등) 확인했나요?",
  "현황조사서에서 실제 점유자가 누구인지 확인했나요?",
  "현장을 직접 방문해서 건물 상태를 봤나요?",
  "입찰 보증금(최저가의 10%) 준비했나요?",
  "잔금 마련 계획(대출 또는 현금) 세웠나요?",
  "경매 당일 진행 여부(취하·연기 없는지) 확인했나요?",
];

const STEPS = [
  { title: "경매 물건 검색", desc: "대한민국 법원 경매정보(courtauction.go.kr)에서 지역·물건 종류별로 검색하세요.", tip: "관심 물건은 사건번호를 메모해두세요" },
  { title: "서류 3종 분석", desc: "등기부등본, 매각물건명세서, 현황조사서를 다운받아 권리관계를 꼼꼼히 분석하세요." },
  { title: "현장 방문", desc: "건물 상태, 점유자 확인, 주변 환경을 직접 눈으로 확인하세요. 등기부에 없는 세입자가 살고 있을 수 있어요." },
  { title: "입찰 보증금 준비", desc: "최저매각가격의 10%를 현금, 자기앞수표, 또는 보증서로 준비하세요." },
  { title: "입찰표 작성·제출", desc: "매각기일에 법원에 출석해서 입찰표에 가격을 적어 입찰함에 넣으세요. 제출 후엔 취소·변경 불가예요.", tip: "사건번호, 물건번호, 금액을 틀리면 무효 처리돼요" },
  { title: "낙찰 시 잔금 납부", desc: "낙찰되면 보통 1개월 내에 잔금을 납부하고, 소유권이전등기를 하면 내 명의가 돼요." },
];

const FAQS = [
  { q: "입찰 보증금은 얼마예요?", a: "최저매각가격의 10분의 1이에요. 최저가 2억이면 2천만원, 5억이면 5천만원을 미리 준비해야 해요." },
  { q: "낙찰 안 되면 보증금은 돌려받나요?", a: "네, 전액 돌려받아요. 낙찰됐는데 잔금을 안 내면 보증금이 몰수되니 주의하세요." },
  { q: "낙찰받으면 바로 입주할 수 있나요?", a: "잔금 납부 후 소유권이전등기를 해야 해요. 기존 점유자가 안 나가면 인도명령이나 명도소송이 필요해요." },
  { q: "대항력 있는 임차인이 뭔가요?", a: "전입신고와 확정일자를 갖춘 세입자예요. 이분의 보증금은 낙찰자가 인수해야 할 수 있어서, 매각물건명세서에서 반드시 확인해야 해요." },
  { q: "초보자는 법무사 상담이 필요한가요?", a: "권리분석이 복잡한 물건이라면 강력히 추천해요. 수수료가 들더라도 실수로 인한 수천만원 손해를 막을 수 있어요." },
  { q: "취득세는 언제 내나요?", a: "낙찰받은 날로부터 60일 이내에 신고·납부해야 해요. 기한을 넘기면 가산세가 붙어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "민사집행법 (법제처)", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "찾기쉬운 생활법령 - 부동산 경매", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=306&ccfNo=2&cciNo=2&cnpClsNo=1" },
      { label: "대한민국 법원 경매정보", url: "https://www.courtauction.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "등기부등본-보는법", title: "등기부등본 보는 법", description: "갑구·을구가 뭔지, 권리관계를 어떻게 읽는지 알려드려요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "낙찰받은 부동산의 취득세를 미리 계산해보세요." },
  { slug: "전세-보증금-반환-방법", title: "전세 보증금 반환 방법", description: "임차인 보증금 문제를 어떻게 처리하는지 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택 경매 입찰 전에 꼭 확인할 것들<br />
        서류 분석부터 보증금까지 체크리스트
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        시세보다 싸게 집을 살 수 있다는 말에 경매를 알아보기 시작했는데, 뭘 확인해야 하는지 막막하시죠?
        잘못하면 수천만원을 날릴 수 있어서 꼼꼼한 준비가 필수예요.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a>에 따른 입찰 절차와 확인사항을 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>입찰 전 필수 서류 3가지</H2>
      <p style={body}>
        주택 경매에 참가하기 전에 반드시 확인해야 할 서류가 세 가지 있어요.
        이 서류를 안 보고 입찰하는 건 지도 없이 산에 오르는 거나 마찬가지예요.
      </p>

      <GreenBox title="경매 필수 서류 3종">
        <strong>등기부등본</strong> — 소유권, 근저당, 가압류 등 모든 권리관계가 기재돼 있어요. 어떤 권리가 소멸하고 어떤 게 인수되는지 파악하는 게 핵심이에요.<br /><br />
        <strong>매각물건명세서</strong> — 법원이 작성한 서류로, 인수해야 할 권리·부담이 적혀 있어요. &quot;대항력 있는 임차인 보증금 5천만원&quot; 같은 내용이 나오면 그 금액은 낙찰자가 떠안아야 해요.<br /><br />
        <strong>현황조사서</strong> — 집행관이 현장 방문해서 실제 사용 상태, 점유자 정보를 기록한 보고서예요. 등기부에 없는 무등기 세입자가 살고 있는지 확인할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>현장 방문, 이건 꼭 직접 가세요</H2>
      <p style={body}>
        서류만 보고 입찰하면 큰일 나요. 건물 상태, 실제 거주자, 주변 환경을 직접 눈으로 확인해야 해요.
        벽에 균열은 없는지, 누수 흔적은 없는지, 보일러와 수도는 작동하는지 꼼꼼히 체크하세요.
      </p>

      <BorderBox>
        현장 방문 시 확인 포인트예요.<br /><br />
        · 실제 거주자가 등기부·현황조사서와 일치하는지<br />
        · 건물 하자(균열, 누수, 곰팡이)<br />
        · 주변 혐오시설이나 소음<br />
        · 토지이용계획 확인서(그린벨트·개발제한 여부)<br />
        · 교통·학교·편의시설 접근성
      </BorderBox>

      <Divider />

      <H2>입찰 보증금, 얼마를 준비해야 하나요?</H2>
      <p style={body}>
        민사집행법에 따라 입찰자는 <strong>최저매각가격의 10분의 1</strong>을 보증금으로 내야 해요.
        최저가 2억이면 2천만원, 5억이면 5천만원이에요. 현금이나 자기앞수표, 은행 보증서로 낼 수 있어요.
      </p>

      <p style={body}>
        낙찰되면 보증금은 잔금에 포함돼요. 낙찰 안 되면 전액 돌려받고요.
        다만 낙찰 후 잔금을 안 내면 보증금이 몰수되니, 잔금 마련 계획을 미리 세워두세요.
      </p>

      <Divider />

      <H2>입찰에서 잔금까지, 이 순서예요</H2>
      <p style={body}>
        경매 절차 전체를 한눈에 보여드릴게요.
        <a href="https://www.courtauction.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>법원 경매정보 사이트</a>에서 물건 검색부터 시작하세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>입찰 전 최종 체크리스트</H2>
      <p style={body}>
        입찰 당일 전에 아래 항목을 하나씩 확인해보세요. 빠진 게 있으면 큰 손해로 이어질 수 있어요.
      </p>

      <Checklist items={CHECK_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 민사집행법과 법원 경매정보를 바탕으로 작성됐어요. 권리분석이 복잡한 물건은 반드시 법무사나 경매 전문가 상담을 받으세요." />
    </ArticleLayout>
  );
}
