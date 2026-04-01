"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 기초연금 신청했다가 탈락했는데 결과가 억울한 어르신/보호자
// Q2: 이의신청과 심사청구 절차를 파악하고, 기한 내에 접수까지 완료
// Q3: 이의신청 기한(90일), 심사청구서 작성법, 증빙 서류, 재심사 절차
// Q4: GreenBox(핵심) + Steps(절차) + Checklist(서류) + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const STEPS = [
  { title: "탈락 통지서 확인", desc: "수급 불가 결정 통지서에 탈락 사유와 소득인정액 산정 내역이 적혀 있어요. 이 내용을 꼼꼼히 읽으세요." },
  { title: "이의신청서 작성", desc: "왜 결정이 부당한지, 어떤 부분이 잘못됐는지를 구체적으로 적어야 해요. 감정 호소만으로는 인용이 어렵죠." },
  { title: "증빙 서류 준비", desc: "재산 가액 이의 시 감정평가서, 소득 산정 이의 시 소득 증빙서류 등을 첨부하세요." },
  { title: "90일 이내 주민센터 제출", desc: "결정 통지를 받은 날부터 90일 이내에 주민센터, 국민연금공단 지사에 제출해야 해요." },
  { title: "심사 결과 대기", desc: "이의신청 접수 후 약 30~60일 이내에 결과가 나와요. 기각되면 행정심판이나 행정소송도 가능하죠." },
];

const CHECKLIST_ITEMS = [
  "수급 불가 결정 통지서 원본 보관",
  "탈락 사유 및 소득인정액 산정 내역 확인",
  "이의 사유를 구체적으로 정리 (어떤 항목이 잘못됐는지)",
  "증빙자료 준비 (재산 감정서, 소득 증빙, 임대차계약서 등)",
  "이의신청서 작성 (청구인 정보, 처분 내용, 청구 이유)",
  "90일 기한 내 제출 완료",
];

const FAQS = [
  {
    q: "이의신청은 언제까지 해야 하나요?",
    a: "결정 통지를 받은 날부터 90일 이내예요. 이 기한을 넘기면 이의신청 자체가 받아들여지지 않으니 빨리 움직이는 게 중요하죠.",
  },
  {
    q: "이의신청 비용이 드나요?",
    a: "안 들어요. 이의신청은 무료예요. 행정심판도 무료이고요. 행정소송 단계로 가면 법원 비용이 발생하지만, 이의신청과 행정심판까지는 부담 없이 진행할 수 있죠.",
  },
  {
    q: "소득인정액 계산이 잘못된 것 같은데 어떻게 따지나요?",
    a: "결정 통지서에 소득인정액 산정 내역이 나와 있어요. 여기서 재산 가액이나 소득 평가가 실제와 다르다고 판단되면 해당 항목을 지적하고 증거를 첨부해서 이의신청하면 되죠.",
  },
  {
    q: "이의신청이 기각되면 방법이 없나요?",
    a: "행정심판을 청구할 수 있어요. 행정심판위원회에 청구하면 되고, 이것도 무료예요. 행정심판에서도 기각되면 행정법원에 소송을 제기할 수 있죠.",
  },
  {
    q: "재산을 처분하면 재신청이 가능한가요?",
    a: "가능하죠. 재산을 처분해서 소득인정액이 선정기준 이하로 내려가면 다시 신청할 수 있어요. 다만 재산 처분 후 금융재산으로 전환되면 그것도 소득인정액에 반영되니 주의가 필요해요.",
  },
  {
    q: "이의신청 중에는 기초연금을 받을 수 있나요?",
    a: "아니에요. 이의신청 중에는 수급 결정이 나지 않은 상태라 기초연금이 지급되지 않아요. 이의신청이 인용되면 소급해서 지급받을 수 있는 경우도 있지만, 일반적으로는 결정 이후부터 지급이 시작되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제22조: 이의신청", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "행정심판법: 행정심판 절차", url: "https://www.law.go.kr/법령/행정심판법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 이의신청 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 민원", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "기초연금-탈락사유-재신청-방법",
    title: "기초연금 탈락 재신청",
    description: "탈락 사유별 대응 방법과 재신청 시기를 정리했어요.",
  },
  {
    slug: "기초연금-소득인정액-계산-공제항목",
    title: "기초연금 소득인정액 계산",
    description: "소득인정액이 어떻게 산정되는지 공제 항목까지 풀어놨어요.",
  },
  {
    slug: "기초연금-수급자격-선정기준액-소득조건",
    title: "기초연금 수급자격 선정기준액",
    description: "선정기준액과 소득인정액 기준을 자세히 정리했어요.",
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
          currentSlug="기초연금-이의신청-심사청구-절차"
        />
      }
    >
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>이의신청 심사청구</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 탈락, 억울하다면?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        이의신청 기한과 심사청구 절차
      </p>

      <p style={body}>
        기초연금 신청했는데 &quot;수급 불가&quot; 통보를 받으면 당혹스럽죠.
        &quot;내가 왜 안 되지? 소득이 그렇게 많지 않은데?&quot; 납득이 안 되는 경우가 꽤 있고요.
      </p>
      <p style={body}>
        이럴 때 그냥 포기하면 안 돼요.{" "}
        <a href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>기초연금법 제22조</a>에 따라
        <strong>결정 통지를 받은 날부터 90일 이내</strong>에 이의신청을 할 수 있거든요.
        이의신청은 무료이고, 소득인정액 산정이 잘못됐다면 바로잡을 수 있는 기회예요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>90일 이내에 이의신청부터 하세요</H2>
      <SectionBadge>이의신청 기한</SectionBadge>

      <p style={body}>
        기초연금 이의신청에서 가장 중요한 건 <strong>90일 기한</strong>이에요.
        결정 통지서를 받은 날부터 90일이 지나면 이의신청 자체가 받아들여지지 않죠.
        증거가 아무리 확실해도 기한을 넘기면 기회가 사라져요.
      </p>
      <p style={body}>
        이의신청은 시·군·구청(주민센터)에 서면으로 제출해요.
        이의신청서에는 본인 정보, 원래 처분 내용, 이의 사유를 적고 증빙자료를 첨부하면 되죠.
        구두로 &quot;억울해요&quot;만 하면 안 되고, 어떤 항목이 왜 잘못됐는지를 구체적으로 써야 해요.
      </p>
      <p style={body}>
        예를 들어 재산 가액이 실제보다 높게 산정됐다면, 부동산 감정평가서나 실거래가 자료를 첨부하세요.
        소득이 과다 계상됐다면 소득금액증명원이나 사업 폐업 증명서 등을 붙이면 되죠.
        증거가 구체적일수록 인용 가능성이 올라가요.
      </p>

      <GreenBox>
        이의신청 기한: 결정 통지를 받은 날부터 90일 이내<br />
        제출처: 시·군·구청(주민센터) 또는 국민연금공단 지사<br />
        비용: 무료 / 증빙 서류 첨부 필수
      </GreenBox>

      <Divider />

      <H2>이의신청에서 심사청구까지의 절차</H2>
      <SectionBadge>단계별 진행</SectionBadge>

      <p style={body}>
        이의신청을 접수하면 시·군·구에서 소득인정액을 재산정해요.
        재산정 결과 원래 결정이 맞다고 판단되면 기각 통보를 하고, 산정 오류가 확인되면 결정을 변경하죠.
        보통 30~60일 이내에 결과가 나와요.
      </p>
      <p style={body}>
        이의신청에서 기각되면 <strong>행정심판</strong>을 청구할 수 있어요.
        행정심판은 중앙행정심판위원회나 시·도 행정심판위원회에 청구하면 되고, 이것도 무료예요.
        처분을 안 날부터 90일 이내에 청구해야 하죠.
      </p>
      <p style={body}>
        행정심판에서도 기각되면 행정법원에 <strong>행정소송</strong>을 제기할 수 있어요.
        이 단계부터는 법원 비용이 발생하고, 사안이 복잡하면 변호사 도움이 필요할 수 있죠.
        대한법률구조공단(132)에서 무료 법률 상담을 받을 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="기초연금 정보" count={기초연금_SIDEBAR.length} href="/category/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>이의신청 시 준비할 서류</H2>
      <SectionBadge>증빙자료</SectionBadge>

      <p style={body}>
        이의신청의 성패는 증빙자료에 달려 있어요. &quot;억울하다&quot;는 호소만으로는 결정을 뒤집기 어렵죠.
        탈락 사유에 맞는 반박 증거를 구체적으로 준비해야 해요.
      </p>
      <p style={body}>
        재산 가액 이의라면 부동산 감정평가서, 자동차 시세 확인서, 금융재산 잔액 증명서 등이 필요하죠.
        소득 산정 이의라면 소득금액증명원, 폐업 증명서, 근로소득 원천징수영수증 등을 준비하세요.
      </p>
      <p style={body}>
        가장 흔한 사례가 부동산 공시가격과 실제 가치의 차이예요.
        공시가격이 실거래가보다 높게 잡혀서 소득인정액이 과다 산정된 경우,
        실거래가 자료나 감정평가서를 제출하면 재산정의 근거가 되죠.
      </p>

      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기초연금 이의신청에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 기준 기초연금법을 바탕으로 작성됐어요. 이의신청 결과는 개별 사안에 따라 다르니, 국민연금공단(1355)이나 주민센터에서 상담을 받아보세요." />
    </ArticleLayout>
  );
}
