"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// Q1. 검색자 상황: 부동산 매매·전세 계약을 앞두고 등기부를 봐야 한다는 걸 알지만, 종류가 여러 가지라 어떤 걸 받아야 하는지 모르는 상황
// Q2. 읽고 나서 할 행동: 상황에 맞는 등기사항증명서 종류를 선택해서 인터넷등기소에서 발급
// Q3. 알아야 할 정보: 등기사항증명서 5가지 종류, 열람 vs 발급 차이, 표제부·갑구·을구 읽는 법, 수수료, 무인발급기 가능 여부
// Q4. 전달 형태: DocTable(증명서 종류) + DocTable(확인항목) + GreenBox(핵심요약)

// ─── 데이터 ──────────────────────────────────────────

const CERT_TYPES = [
  { name: "등기사항전부증명서 (말소사항 포함)", required: true, where: "모든 과거 이력 포함 — 매매·전세 계약 시 가장 많이 사용" },
  { name: "등기사항전부증명서 (현재 유효사항)", required: true, where: "말소된 내용 제외 — 현재 권리관계만 깔끔하게 확인" },
  { name: "등기사항일부증명서 (특정인 지분)", required: false, where: "공동소유 부동산에서 특정인 지분만 확인할 때" },
  { name: "등기사항일부증명서 (현재 소유현황)", required: false, where: "현재 소유자 정보만 빠르게 확인할 때" },
  { name: "등기사항일부증명서 (지분취득 이력)", required: false, where: "소유권 변동 이력을 추적할 때" },
];

const READ_POINTS = [
  { name: "표제부 — 소재지·면적", required: true, where: "계약서와 면적 일치 여부 — 전용면적과 대지권 면적 구분해서 확인" },
  { name: "갑구 — 현재 소유자", required: true, where: "계약 상대방과 이름이 동일한지 — 다르면 사기 위험" },
  { name: "갑구 — 압류·가압류·가처분", required: true, where: "이 중 하나라도 있으면 위험 — 계약 전 해소 여부 확인 필수" },
  { name: "을구 — 근저당권 채권최고액", required: true, where: "실제 대출액보다 크게 잡힘 — 매매가 대비 과도하지 않은지 확인" },
  { name: "을구 — 전세권 설정 여부", required: false, where: "다른 세입자가 있는지 — 이중계약 사기 예방" },
];

const CHECKLIST = [
  "발급 목적 확인 — 단순 확인이면 열람(700원), 법적 제출용이면 발급(1,000원)",
  "아파트·오피스텔 → 집합건물 선택 / 주택·빌라·토지 → 일반건물·토지 선택",
  "갑구에서 소유자 ↔ 계약 상대방 이름 일치 확인",
  "갑구에서 압류·가압류·경매개시결정 없음 확인",
  "을구에서 근저당권 채권최고액 확인 — 매매가 70% 초과 시 법무사 상담",
  "계약 당일 + 잔금 당일 총 2회 조회 권장",
];

const FAQS = [
  {
    q: "등기사항증명서랑 등기부등본이 다른 건가요?",
    a: "같은 문서예요. 2014년 전산화 이후 정식 명칭이 '등기사항증명서'로 바뀐 거예요. 예전 이름인 등기부등본도 여전히 통용돼요.",
  },
  {
    q: "말소사항 포함이랑 현재 유효사항 중 어떤 걸 받아야 하나요?",
    a: "일반적인 매매·전세 계약용이라면 '말소사항 포함'을 받으세요. 과거 권리 변동 이력까지 볼 수 있어서 더 많은 정보를 얻을 수 있어요.",
  },
  {
    q: "무인발급기에서도 받을 수 있나요?",
    a: "등기소·법원·주민센터에 있는 무인발급기에서도 가능해요. 다만 '등기사항전부증명서(말소사항 포함)' 1종류만 발급돼요. 다른 종류나 특정인 지분 등은 인터넷등기소를 이용해야 해요.",
  },
  {
    q: "채권최고액이 뭔가요? 실제 대출액이랑 같은 건가요?",
    a: "달라요. 채권최고액은 이자·연체료까지 포함한 최대 담보 금액이라서 실제 대출액보다 보통 120~130% 크게 잡혀요. 실제 대출액은 집주인에게 직접 확인하거나 대출 잔액증명서를 요청하세요.",
  },
  {
    q: "등기부에 소유자가 2명이에요. 계약을 어떻게 하나요?",
    a: "공동소유라면 모든 소유자의 동의가 필요해요. 한 명만 계약하면 나중에 문제가 생길 수 있어요. 두 명 모두 계약서에 서명하거나, 한 명이 다른 사람의 위임장을 받아야 해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 서비스",
    items: [
      { label: "대법원 인터넷등기소", url: "https://www.iros.go.kr" },
      { label: "찾기쉬운 생활법령정보 — 등기사항증명서 발급", url: "https://www.easylaw.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "부동산등기법", url: "https://www.law.go.kr/법령/부동산등기법" },
    ],
  },
];

const RELATED = [
  { slug: "부동산등기부-열람-발급-방법-인터넷등기소", title: "인터넷등기소 이용 방법 5단계", description: "접속부터 결제·다운로드까지 단계별로 안내해요." },
  { slug: "부동산-매매-절차-계약-등기-순서", title: "부동산 매매 절차 순서", description: "계약부터 소유권이전등기까지 단계별 체크리스트예요." },
  { slug: "전세보증금-반환보증-가입-방법", title: "전세보증금 반환보증 가입 방법", description: "HUG·SGI 전세보증보험으로 보증금 지키는 방법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 등기 · 권리분석</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부동산등기부 열람·발급 방법<br />
        등기사항증명서 종류별 선택 가이드
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        등기부를 떼려고 보니 종류가 5가지나 있어서 뭘 선택해야 할지 모르겠죠?
        매매나 전세 계약 전에는 '등기사항전부증명서(말소사항 포함)'를 받는 게 기본이에요.
        <a href="https://www.iros.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>인터넷등기소</a>에서 1,000원이면 바로 PDF로 받을 수 있고, 법적 효력도 방문 발급과 동일해요.
        어떤 종류를 선택해야 하는지, 받아서 어디를 봐야 하는지 정리했어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>등기사항증명서 5가지 종류, 어떤 걸 받나요?</H2>
      <p style={body}>
        5가지 종류 중 일반적인 계약 용도라면 '전부증명서(말소사항 포함)'가 가장 많이 쓰여요.
        과거 소유권 변동 이력과 현재 권리관계를 한 번에 볼 수 있기 때문이에요.
        공동소유나 특수한 상황에서만 나머지 종류를 선택하면 돼요.
      </p>

      <SectionBadge>증명서 종류 및 용도</SectionBadge>
      <DocTable docs={CERT_TYPES} />

      <GreenBox>
        매매·전세 계약 기본: 등기사항전부증명서 (말소사항 포함) — 1,000원<br />
        현재 권리만 빠르게 보기: 등기사항전부증명서 (현재 유효사항) — 1,000원<br />
        열람(700원)으로 먼저 확인 후 발급 여부 결정해도 돼요
      </GreenBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>받은 등기부, 어디를 어떻게 봐야 하나요?</H2>
      <p style={body}>
        등기부는 표제부·갑구·을구 세 영역으로 나뉘어요.
        계약 전에는 갑구의 소유자 이름과 압류 여부, 을구의 근저당권 금액을 중점적으로 확인해요.
        표제부는 면적 등 물리적 정보라서 계약서와 일치하는지만 체크하면 돼요.
      </p>

      <SectionBadge>영역별 확인 포인트</SectionBadge>
      <DocTable docs={READ_POINTS} />

      <BorderBox>
        소유자 이름이 계약 상대방과 다르다면 그 자리에서 계약을 중단하세요.
        위임장이나 대리인 계약이라도 반드시 소유자 본인 확인 절차가 필요해요.
      </BorderBox>

      <Divider />

      <H2>등기부 확인 체크리스트</H2>
      <p style={body}>
        계약 당일 한 번, 잔금 당일 한 번 — 총 2회 조회하는 게 안전해요.
        잔금 당일에 갑자기 압류나 근저당권이 추가되는 사례가 실제로 있기 때문이에요.
      </p>

      <SectionBadge>계약 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        등기부 발급에서 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />
      <H2>출처</H2>
      <References groups={REFERENCES} />

      <CategoryButton label="부동산 관련 글 더 보기" href="/w/부동산-매매-절차-계약-등기-순서" />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 부동산등기법을 바탕으로 작성됐어요. 수수료는 변경될 수 있으니 인터넷등기소에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
