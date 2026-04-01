"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 가압류 신청이 각하돼서 미리 낸 등록면허세를 돌려받고 싶은 상황이에요.
// Q2. 미사용증명원을 발급받아 구청에 등록면허세 환급을 신청하는 행동.
// Q3. 환급 대상(등록면허세+지방교육세+인지대), 미사용증명원 발급 절차, 구청 세무과 신청, 필요 서류, 기한 5년.
// Q4. Steps(환급 절차) + DocTable(필요 서류) + GreenBox(환급 대상 정리) + FAQ

import {
  H2, SectionBadge, GreenBox, Steps, DocTable, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "가압류 각하되면 등록면허세 자동 환급되나요?", a: "아니에요. 법원에서 미사용증명원을 발급받아 구청에 직접 신청해야 해요. 자동으로 안 줘요." },
  { q: "인지대도 환급되나요?", a: "네. 인지대는 법원에 따로 신청해요. 등록면허세는 구청, 인지대는 법원에서 각각 환급받아요." },
  { q: "송달료도 돌려받나요?", a: "이미 사용한 만큼은 안 되고, 남은 금액만 환급돼요. 법원이 계산해서 알려줘요." },
  { q: "환급받는 데 얼마나 걸려요?", a: "신청 후 2~4주 정도 걸려요. 구청에서 검토 후 계좌로 입금해줘요." },
  { q: "영수증을 잃어버렸으면 어떡해요?", a: "법원에 제출한 영수증이면 법원에서 찾아올 수 있어요. 원본이 없으면 환급이 어려울 수 있으니 빨리 확인하세요." },
  { q: "환급 청구에 기한이 있나요?", a: "5년이에요. 각하 결정 받고 5년이 지나면 소멸시효로 환급 못 받아요." },
  { q: "각하와 기각 모두 환급 대상인가요?", a: "네. 각하든 기각이든 등기가 안 됐으면 환급받을 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "지방세법 제35조", url: "https://www.law.go.kr/법령/지방세법" },
      { label: "찾기쉬운 생활법령정보 가압류", url: "https://www.easylaw.go.kr" },
      { label: "대법원 전자소송", url: "https://ecfs.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "가압류-신청-인지대-금액", title: "가압류 신청 인지대 금액", description: "가압류 신청할 때 내는 인지대가 얼마인지 알려드려요." },
  { slug: "가압류-신청-송달료-금액", title: "가압류 신청 송달료 금액", description: "가압류 송달료 계산과 납부 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률 · 가압류 · 환급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        가압류 각하 시 등록면허세 환급<br />
        미사용증명원 발급부터 신청까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가압류 신청했는데 각하됐어요. 미리 낸 등록면허세를 돌려받을 수 있나요?
        네, 가능해요. 법원에서 미사용증명원을 받아서 구청에 환급 신청하면 2~4주 안에 돌려받을 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>환급받을 수 있는 항목이에요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/지방세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>지방세법 제35조</a>에서
        등기하지 않은 경우 납부한 등록면허세를 환급하도록 정하고 있어요.
        각하든 기각이든 등기가 안 됐으면 환급 대상이에요.
      </p>

      <GreenBox>
        환급 대상 항목이에요.<br />
        · <strong>등록면허세</strong> — 가압류 등기용으로 미리 낸 세금 (구청에서 환급)<br />
        · <strong>지방교육세</strong> — 등록면허세의 20%, 함께 환급돼요<br />
        · <strong>인지대</strong> — 10,000원, 법원에 따로 신청해야 해요<br />
        · <strong>송달료</strong> — 사용한 만큼 빼고 남은 금액만 법원에서 환급
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>환급 신청, 이 순서대로 해요</H2>
      <p style={body}>
        등록면허세는 구청, 인지대·송달료는 법원에서 각각 환급받아요. 창구가 달라요.
      </p>

      <SectionBadge>등록면허세 환급 절차</SectionBadge>
      <Steps steps={[
        { title: "법원에서 미사용증명원 발급", desc: "가압류 신청했던 법원 민원실에서 '등록면허세 미사용증명원'을 발급받아요. 각하 결정문, 납부 영수증, 신분증이 필요해요." },
        { title: "등록면허세 영수증 원본 회수", desc: "가압류 신청 시 법원에 제출한 영수증 원본도 함께 돌려받으세요." },
        { title: "구청 세무과 방문 → 환급 신청", desc: "부동산 소재지 관할 구청 세무과에서 환급 신청서를 작성해요. 서류를 제출하고 환급 계좌를 적어요." },
        { title: "2~4주 내 계좌 입금", desc: "구청에서 서류 검토 후 계좌로 입금해줘요. 환급 완료 통지서가 우편으로 와요." },
      ]} />

      <Divider />

      <H2>환급 신청에 필요한 서류예요</H2>
      <p style={body}>
        미리 준비해두면 한 번 방문으로 끝낼 수 있어요.
      </p>

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={[
        { name: "미사용증명원 (법원 확인·날인)", required: true, where: "법원 민원실" },
        { name: "등록면허세 납부 영수증 원본", required: true, where: "법원에서 회수" },
        { name: "각하 결정문 사본", required: true, where: "법원 민원실" },
        { name: "신분증", required: true, where: "본인 지참" },
        { name: "환급 계좌 통장 사본", required: true, where: "본인 지참" },
        { name: "환급 신청서", required: true, where: "구청 세무과 현장 작성" },
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 지방세법과 법원 실무를 바탕으로 작성됐어요. 환급 절차는 관할 법원·지자체에 따라 다를 수 있으니 직접 확인하세요." />
    </ArticleLayout>
  );
}
