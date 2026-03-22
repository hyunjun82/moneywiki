"use client";

// Q1: 집을 사는데 취득세가 얼마인지, 언제까지 내야 하는지 모르는 상황
// Q2: 잔금일부터 60일 이내에 위택스에서 취득세 신고·납부 완료
// Q3: 세율(주택 수·가격별), 신고 기한 60일, 감면(생애최초 200만원), 신고 절차, 가산세
// Q4: TaxRateTable(세율) + Steps(신고절차) + GreenBox(감면) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { DocTable } from "@/components/article-ui/DocTable";

const TAX_RATE_HEADERS = ["구분", "세율", "비고"];
const TAX_RATE_ROWS = [
  ["6억원 이하 (1주택)", "1%", "-"],
  ["6~9억원 (1주택)", "2%", "-"],
  ["9억원 초과 (1주택)", "3%", "-"],
  ["조정지역 2주택", "8%", "-"],
  ["조정지역 3주택 이상", "12%", "-"],
  ["토지·상가·오피스텔", "4%", "-"],
  ["상속 취득", "2.8%", "-"],
  ["증여 취득", "3.5%", "-"],
];

const STEPS = [
  {
    title: "취득일(잔금일) 확인",
    desc: "매매는 잔금 치른 날, 상속은 사망일, 신축은 사용승인일이 취득일이에요. 이 날부터 60일(상속은 6개월)을 계산해요.",
  },
  {
    title: "위택스 접속 또는 세무과 방문",
    desc: "위택스(wetax.go.kr)에서 온라인 신고하거나, 시·군·구청 세무과에 직접 방문해서 신고해요. 매매계약서와 신분증을 준비하세요.",
    link: { label: "위택스에서 신고하기", href: "https://www.wetax.go.kr" },
  },
  {
    title: "세액 확인 및 납부",
    desc: "신고하면 세액이 산출돼요. 계좌이체, 카드, 가상계좌 중 편한 방법으로 납부하면 돼요. 위택스에서 바로 납부 가능해요.",
  },
  {
    title: "납부 확인서 수령 후 등기",
    desc: "취득세 납부 확인서를 받아서 법무사에게 전달하면 등기를 진행해요. 취득세 안 내면 등기가 안 돼요.",
  },
];

const CHECKLIST = [
  "잔금일부터 60일 이내 신고·납부 (상속은 6개월)",
  "실제 거래가격 그대로 신고 (저가 신고 시 추징)",
  "생애최초 감면 해당 여부 확인 (12억원 이하, 무주택자)",
  "일시적 2주택이면 2년 내 기존 주택 처분 계획 확인",
  "조정대상지역 여부 확인 (다주택 중과 적용)",
  "농어촌특별세 + 지방교육세 합산 금액 확인",
];

const FAQS = [
  {
    q: "취득세 60일 기한을 하루라도 넘기면 어떻게 되나요?",
    a: "무신고 가산세 20%가 붙어요. 거기에 납부 지연 시 하루 0.025%씩 추가 이자가 생겨요. 한 달 늦으면 약 0.75% 가산세가 더해지는 거예요.",
  },
  {
    q: "생애최초 취득세 감면은 부부 중 한 명만 무주택이어도 되나요?",
    a: "아니에요. 부부 모두 생애 처음으로 주택을 취득해야 해요. 부부합산 연 소득 7,000만원 이하 조건도 함께 충족해야 하고요.",
  },
  {
    q: "계약금 낸 날부터 60일인가요?",
    a: "아니에요. 잔금 치른 날이 취득일이에요. 계약금이나 중도금 낸 날이 아니라 최종 잔금 지급일부터 60일을 계산해요.",
  },
  {
    q: "일시적 2주택으로 신고하면 나중에 불이익이 있나요?",
    a: "2년 내에 기존 주택을 팔면 문제없어요. 못 팔면 중과세율로 재계산해서 차액과 가산세를 추가 납부해야 해요.",
  },
  {
    q: "오피스텔 취득세는 주택과 같나요?",
    a: "업무용 오피스텔은 4% 고정이에요. 주거용으로 사용해도 등기부상 용도가 업무시설이면 4%가 적용돼요.",
  },
  {
    q: "부가세(농특세, 지방교육세)는 별도로 신고해야 하나요?",
    a: "아니에요. 취득세 신고할 때 자동으로 함께 계산돼요. 농어촌특별세 0.2%와 지방교육세(취득세의 10%)가 추가로 붙어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "지방세법", url: "https://www.law.go.kr/법령/지방세법" },
      { label: "지방세특례제한법", url: "https://www.law.go.kr/법령/지방세특례제한법" },
    ],
  },
  {
    category: "공식 서비스",
    items: [
      { label: "위택스 (지방세 신고·납부)", url: "https://www.wetax.go.kr" },
      { label: "찾기쉬운 생활법령정보 - 취득세", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=666&ccfNo=2&cciNo=2&cnpClsNo=4" },
    ],
  },
];

const RELATED = [
  { slug: "양도소득세", title: "양도소득세 계산과 신고", description: "집 팔 때 내는 양도세 기준과 비과세 조건이에요." },
  { slug: "종합부동산세", title: "종합부동산세 과세 기준", description: "공시가격 기준 종부세 대상과 세율이에요." },
  { slug: "취득세-계산기", title: "취득세 계산기", description: "주택 가격과 주택 수를 입력하면 취득세를 바로 계산해줘요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부동산 취득세, 얼마나 내야 할까?<br />
        세율부터 감면·신고 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집을 사면 잔금 치른 날부터 60일 안에 취득세를 신고하고 내야 해요.
        하루만 늦어도 가산세가 붙으니까 기한이 가장 중요하죠.
        <a href="https://www.law.go.kr/법령/지방세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>지방세법</a>에서
        정한 세율은 주택 가격과 보유 주택 수에 따라 1%에서 최대 12%까지 차이가 커요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>취득세 세율, 주택 수에 따라 크게 달라져요</H2>
      <p style={body}>
        1주택은 1~3%인데, 조정대상지역에서 2주택 되면 8%, 3주택이면 12%로 뛰어요.
        같은 7억원짜리 아파트를 사도 1주택이면 1,680만원, 2주택(조정지역)이면 7,200만원이에요. 4배 넘게 차이가 나죠.
      </p>

      <SectionBadge>2026년 부동산 취득세 세율표</SectionBadge>
      <DocTable headers={TAX_RATE_HEADERS} rows={TAX_RATE_ROWS} />
      <p style={{ ...body, fontSize: 13, color: "#666", marginTop: 4 }}>농어촌특별세 0.2% + 지방교육세(취득세의 10%) 별도 부과</p>

      <p style={body}>
        여기에 농어촌특별세와 지방교육세가 추가로 붙어요. 예를 들어 7억원 아파트 1채(2% 구간)를 사면
        취득세 1,400만원 + 농특세 140만원 + 지방교육세 140만원 = 총 1,680만원이에요.
      </p>

      <CategoryButton label="부동산·세금 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>취득세 신고 절차는 어떻게 되나요?</H2>
      <p style={body}>
        <a href="https://www.wetax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>위택스</a>에서 온라인으로 신고하는 게 가장 편해요.
        시·군·구청 세무과에 직접 방문할 수도 있지만, 대부분 온라인으로 처리하죠.
        잔금 치르자마자 바로 신고 준비하는 게 안전해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>생애최초 취득세 감면, 최대 200만원</H2>
      <p style={body}>
        생애 처음으로 집 사는 무주택자라면 놓치면 안 돼요.
        12억원 이하 주택을 취득할 때 최대 200만원까지 감면받을 수 있거든요.
      </p>

      <GreenBox>
        <strong>생애최초 취득세 감면 조건</strong><br />
        주택 가격: 12억원 이하<br />
        신청자: 부부 모두 생애 최초 주택 취득<br />
        소득: 부부합산 연 소득 7,000만원 이하<br />
        감면 한도: 최대 200만원<br /><br />
        취득세 신고할 때 가족관계증명서와 소득 증빙 서류를 함께 제출하면 돼요.
      </GreenBox>

      <p style={body}>
        7억원 아파트 기준으로 원래 1,680만원 내야 하는데, 감면받으면 1,480만원으로 줄어요.
        신혼부부 감면, 다자녀 가구 감면도 따로 있으니 위택스에서 꼭 해당 여부를 확인해보세요.
      </p>

      <Divider />

      <H2>놓치면 손해 보는 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        60일 기한, 감면 신청, 조정지역 확인까지 빠뜨리면 돈으로 돌아와요. 잔금 치르기 전에 한 번 훑어보세요.
      </p>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 지방세법과 지방세특례제한법을 바탕으로 작성됐어요. 세율과 감면 조건은 변경될 수 있으니 위택스에서 최신 정보를 직접 확인해봐요." />
    </ArticleLayout>
  );
}
