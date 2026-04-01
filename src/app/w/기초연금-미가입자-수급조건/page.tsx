"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 국민연금을 한 번도 안 냈는데 기초연금을 받을 수 있는지 걱정하는 65세 전후 어르신
// Q2: 미가입자도 기초연금 대상인지 확인하고, 조건이 되면 신청까지 완료
// Q3: 국민연금 가입 여부와 기초연금의 관계, 소득인정액 기준, 연계감액 없는 장점
// Q4: GreenBox(결론) + BorderBox(비교) + Steps(신청) + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "국민연금을 한 번도 안 냈는데 기초연금 받을 수 있나요?",
    a: "받을 수 있어요. 기초연금은 국민연금 가입 여부와 관계없이 65세 이상이고 소득인정액이 기준 이하면 대상이 되죠.",
  },
  {
    q: "미가입자는 기초연금이 깎이나요?",
    a: "아니에요. 연계감액은 국민연금 수급자에게만 적용되기 때문에, 미가입자는 기준연금액 전액(2025년 기준 349,360원)을 받을 수 있어요.",
  },
  {
    q: "전업주부도 기초연금 대상이 되나요?",
    a: "되죠. 평생 전업주부여서 국민연금에 가입한 적이 없더라도 65세 이상이고 소득인정액 기준만 충족하면 기초연금을 받을 수 있어요.",
  },
  {
    q: "국민연금 임의가입을 지금이라도 하면 기초연금에 불리한가요?",
    a: "국민연금을 받게 되면 기초연금 연계감액 대상이 될 수 있어요. 국민연금 수령액이 기준연금액의 150%를 넘으면 감액이 시작되죠. 가입 전에 어느 쪽이 유리한지 비교해 보는 게 좋아요.",
  },
  {
    q: "배우자가 국민연금을 받고 있으면 내 기초연금에 영향이 있나요?",
    a: "배우자의 국민연금은 배우자 본인의 기초연금 연계감액에만 영향을 줘요. 미가입자인 본인의 기초연금에는 직접 영향이 없고, 다만 부부가구 소득인정액 합산에 반영되죠.",
  },
];

const STEPS = [
  { title: "나이 확인", desc: "만 65세 이상이면 기초연금 신청 자격이 돼요." },
  { title: "소득인정액 확인", desc: "단독가구 247만 원, 부부가구 395.2만 원 이하인지 따져보세요." },
  { title: "주민센터 또는 복지로 방문", desc: "가까운 주민센터, 국민연금공단 지사, 복지로(bokjiro.go.kr)에서 신청할 수 있어요." },
  { title: "구비서류 제출", desc: "신분증, 통장 사본, 금융정보제공동의서를 준비하면 되죠." },
  { title: "심사 후 수급 결정", desc: "신청 후 약 30일 이내에 결과가 나오고, 매월 25일에 입금돼요." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제3조: 수급권자 범위", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 제도 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 신청", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "기초연금-수급자격-선정기준액-소득조건",
    title: "기초연금 수급자격 선정기준액",
    description: "소득인정액 기준과 선정기준액이 어떻게 정해지는지 상세하게 정리했어요.",
  },
  {
    slug: "기초연금-연계감액-계산-A급여액",
    title: "기초연금 연계감액 A급여액 계산",
    description: "국민연금을 받으면 기초연금이 얼마나 깎이는지 계산 방법을 정리했어요.",
  },
  {
    slug: "기초연금-신청방법-절차",
    title: "기초연금 신청 방법",
    description: "온라인과 오프라인 신청 방법, 필요 서류까지 한 번에 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="기초연금 가이드"
          items={기초연금_SIDEBAR}
          highlightSlugs={기초연금_HIGHLIGHT}
          currentSlug="기초연금-미가입자-수급조건"
        />
      }
    >
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>미가입자 수급 조건</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        국민연금 한 번도 안 냈는데 기초연금 될까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        미가입자 수급 조건과 신청 방법
      </p>

      <p style={body}>
        평생 전업주부였거나, 자영업을 하면서 국민연금을 안 낸 분들이 많죠.
        &quot;나는 연금을 하나도 안 냈는데 기초연금이 되나?&quot; 걱정부터 앞서고요.
      </p>
      <p style={body}>
        결론부터 말하면, <strong>국민연금 미가입자도 기초연금을 받을 수 있어요.</strong>{" "}
        <a href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>기초연금법 제3조</a>는
        65세 이상이고 소득인정액이 선정기준 이하이면 수급 대상으로 규정하고 있죠. 국민연금 가입 이력은 조건이 아니에요.
      </p>
      <p style={body}>
        오히려 미가입자는 국민연금 수급자에게 적용되는 연계감액이 없어서, 기준연금액 전액을 받을 수 있다는 장점이 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>미가입자도 기초연금 대상이 되는 이유</H2>
      <SectionBadge>수급 조건 핵심</SectionBadge>

      <p style={body}>
        기초연금은 국민연금과 별개의 제도예요. 국민연금은 &quot;낸 만큼 받는&quot; 사회보험이고, 기초연금은 소득이 적은 어르신에게 국가가 지급하는 복지 급여이죠.
        그래서 국민연금을 한 번도 안 냈어도 기초연금 수급에는 아무 문제가 없어요.
      </p>
      <p style={body}>
        기초연금 수급 조건은 딱 두 가지예요. 만 65세 이상일 것, 그리고{" "}
        <Link href="/w/기초연금-소득인정액-계산-공제항목" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득인정액</Link>이
        선정기준액 이하일 것. 2025년 기준으로 단독가구 247만 원, 부부가구 395.2만 원이 기준이죠.
      </p>
      <p style={body}>
        국민연금 가입 여부는 기초연금 &quot;자격&quot;에 영향을 주지 않아요. 다만 국민연금을 받고 있으면 기초연금 &quot;금액&quot;에 영향을 줄 수 있는데, 이건 연계감액이라는 별도 규정이에요. 미가입자는 이 감액이 적용되지 않죠.
      </p>

      <GreenBox>
        기초연금 수급 조건 = 만 65세 이상 + 소득인정액 기준 이하<br />
        국민연금 가입 이력은 수급 조건이 아님<br />
        2025년 선정기준: 단독 247만 원 / 부부 395.2만 원
      </GreenBox>

      <Divider />

      <H2>미가입자가 오히려 유리한 점: 연계감액 없음</H2>
      <SectionBadge>감액 비교</SectionBadge>

      <p style={body}>
        국민연금을 받는 분은 기초연금이 깎일 수 있어요. 국민연금 월 수령액이 기준연금액(349,360원)의 150%, 즉 약 52만 원을 넘으면 기초연금 연계감액이 시작되죠.
        국민연금을 많이 받을수록 기초연금이 줄어드는 구조예요.
      </p>
      <p style={body}>
        반면 국민연금 미가입자는 이 연계감액 대상이 아니에요. 소득인정액 기준만 통과하면 기준연금액 전액인 349,360원을 받을 수 있죠.
        부부가 둘 다 받으면 각각 20% 감액(부부감액)이 적용되지만, 연계감액과는 별개의 문제예요.
      </p>
      <p style={body}>
        정리하면, 미가입자는 연계감액 걱정 없이 기준연금액 전액을 수령할 수 있다는 게 가장 큰 차이점이에요.
      </p>

      <BorderBox>
        <strong>국민연금 수급자</strong>: 연계감액 가능 (국민연금 월 52만 원 초과 시)<br />
        <strong>국민연금 미가입자</strong>: 연계감액 없음, 기준연금액 전액 수령 가능<br />
        <strong>부부감액</strong>: 가입 여부와 관계없이 부부 모두 수급 시 각 20% 감액
      </BorderBox>

      <CategoryButton label="기초연금 정보" count={기초연금_SIDEBAR.length} href="/category/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>미가입자 기초연금 신청 절차</H2>
      <SectionBadge>신청 방법</SectionBadge>

      <p style={body}>
        국민연금 미가입자도 신청 절차는 동일해요. 만 65세 생일이 속한 달의 한 달 전부터 신청할 수 있죠.
        주민센터, 국민연금공단 지사, 복지로 온라인 중 편한 곳에서 하면 돼요.
      </p>
      <p style={body}>
        준비물은 신분증, 본인 명의 통장 사본, 금융정보등제공동의서가 기본이에요.
        임대차계약서나 자동차등록증이 필요한 경우도 있는데, 이건{" "}
        <Link href="/w/기초연금-신청서류-준비물" style={{ color: "#1D9E75", textDecoration: "underline" }}>기초연금 신청 서류</Link> 글에서 자세히 다루고 있어요.
      </p>
      <p style={body}>
        신청 후 약 30일 이내에 심사 결과가 나오고, 수급이 결정되면 매월 25일에 지정 계좌로 입금되죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>주의할 점: 소득인정액은 연금 외 재산도 포함</H2>

      <p style={body}>
        국민연금을 안 냈으니 소득이 없다고 생각하기 쉽지만, 소득인정액은 연금소득만 보는 게 아니에요. 근로소득, 사업소득, 재산(부동산, 자동차, 금융재산)까지 전부 합산해서 계산하죠.
      </p>
      <p style={body}>
        예를 들어 시가 3억 원짜리 아파트를 소유하고 있으면, 기본재산액 공제 후 남은 금액이 소득으로 환산돼요. 국민연금은 없더라도 부동산 재산 때문에 기준을 넘길 수 있는 거죠.
      </p>
      <p style={body}>
        금융재산도 마찬가지예요. 예금, 적금, 보험 해약환급금, 주식 등을 모두 합산한 뒤 2,000만 원을 공제하고 나머지를 소득으로 환산하죠.
        &quot;연금이 없으니 당연히 되겠지&quot;가 아니라,{" "}
        <Link href="/w/기초연금-소득인정액-계산-공제항목" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득인정액 전체를 계산</Link>해 봐야 정확한 결과를 알 수 있어요.
      </p>

      <GreenBox>
        소득인정액 = 소득평가액 + 재산의 소득환산액<br />
        국민연금 미가입 = 연금소득 0원이지만 재산 환산액은 별도 계산<br />
        부동산, 금융재산, 자동차 가액이 기준 초과 시 탈락 가능
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        국민연금 미가입자의 기초연금 수급에 대해 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 기준 기초연금법을 바탕으로 작성됐어요. 개인별 소득인정액은 재산 상황에 따라 다르니, 국민연금공단(1355) 상담을 받아보세요." />
    </ArticleLayout>
  );
}
