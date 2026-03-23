"use client";

// Q1. 부모님이 거동이 불편하거나 바빠서 자녀가 대신 기초연금을 신청하려는 상황
// Q2. 위임장을 작성해서 주민센터에서 부모님 대신 기초연금을 접수한다
// Q2-1. 주민센터 창구에서 위임장과 서류를 제출하는 곳
// Q3. 대리신청 가능 여부, 위임장 작성법, 필요 서류(위임장+양쪽 신분증+통장), 온라인 대리신청 불가
// Q4. BorderBox(위임장 양식) + Checklist(대리신청 서류) + GreenBox(핵심 요약)

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const PROXY_DOCS = [
  "위임장 (주민센터 비치 양식 또는 자유 양식)",
  "신청자(부모님) 신분증 원본 또는 사본",
  "대리인(자녀) 신분증 원본",
  "신청자(부모님) 명의 통장 사본",
  "금융정보 등 제공 동의서 (부모님 서명 필요)",
];

const FAQS = [
  {
    q: "위임장에 부모님 도장이 없으면 안 되나요?",
    a: "서명으로도 충분해요. 위임장에 부모님 이름, 주민등록번호, 위임 내용, 대리인 정보를 적고 부모님이 서명하면 돼요. 도장이 있으면 같이 찍어도 좋지만 필수는 아니에요.",
  },
  {
    q: "자녀가 아닌 며느리나 사위도 대리신청할 수 있나요?",
    a: "네, 가능해요. 대리인에 대한 자격 제한은 없어서 가족이 아닌 제3자도 위임장만 있으면 대리신청할 수 있어요. 다만 위임장에 대리인 정보가 정확히 기재돼야 하죠.",
  },
  {
    q: "복지로(온라인)에서 대리신청할 수 있나요?",
    a: "온라인 대리신청은 안 돼요. 복지로 온라인 신청은 본인 공동인증서가 필요하기 때문에, 대리신청은 주민센터 방문만 가능해요.",
  },
  {
    q: "부모님이 해외에 계시면 대리신청이 되나요?",
    a: "기초연금은 대한민국에 거주하는 65세 이상 국민이 대상이에요. 해외에 체류 중이면 신청 자체는 가능하지만, 60일 이상 해외 체류 시 지급이 정지돼요. 귀국 후 거주 사실이 확인되면 다시 지급이 재개되죠.",
  },
  {
    q: "금융정보 동의서도 대리인이 서명할 수 있나요?",
    a: "원칙적으로 금융정보 제공 동의서는 본인(부모님) 서명이 필요해요. 미리 집에서 서명을 받아 가거나, 성년후견인으로 지정된 경우에는 후견인이 서명할 수 있어요.",
  },
  {
    q: "위임장 양식이 정해져 있나요?",
    a: "정해진 양식은 없어요. 주민센터에 비치된 양식을 쓰거나, 자유 양식으로 작성해도 돼요. 위임인·대리인 인적사항, 위임 내용(기초연금 신청), 날짜, 서명만 있으면 충분하죠.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "복지로: 기초연금 신청 안내", url: "https://www.bokjiro.go.kr" },
      { label: "보건복지부: 기초연금 안내", url: "https://www.mohw.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 시행규칙 제3조 (신청)", url: "https://www.law.go.kr/법령/기초연금법시행규칙" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-신청방법-절차", title: "기초연금 신청 방법과 절차", description: "신청 단계를 5단계로 정리했어요." },
  { slug: "기초연금-신청서류-준비물", title: "기초연금 필수 서류와 준비물", description: "뭘 챙겨가야 하는지 체크리스트예요." },
  { slug: "기초연금-소급지급-여부-손해", title: "늦게 신청하면 얼마나 손해?", description: "소급 안 되는 이유와 손해 금액이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-대리신청-위임장-작성" />}>
      <nav style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none" }}>홈</Link>
        {" > "}
        <Link href="/w/기초연금" style={{ color: "#888", textDecoration: "none" }}>기초연금</Link>
        {" > "}
        <span style={{ color: "#333" }}>대리신청</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.45, marginBottom: 6 }}>
        부모님 대신 기초연금 신청 가능?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 18 }}>
        대리신청과 위임장 작성
      </p>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부모님이 거동이 불편하거나 주민센터에 가기 어려운 상황이죠.
        기초연금은 자녀가 대리로 신청할 수 있어요.
        위임장 한 장과 양쪽 신분증만 있으면 되는데, 금융정보 동의서에는 부모님 서명이 필요해요.
        대리신청에 필요한 서류와 위임장 쓰는 법을 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>대리신청, 누가 할 수 있을까</H2>
      <p style={body}>
        대리인 자격에 제한은 없어요.
        자녀, 배우자, 며느리, 사위, 손자녀, 심지어 이웃이나 지인도 위임장만 있으면 대리신청할 수 있어요.
        다만 온라인(복지로) 대리신청은 안 되고, 주민센터 방문만 가능하죠.
      </p>
      <GreenBox>
        <strong>대리신청 핵심 정리</strong><br />
        <br />
        대리인 자격: 제한 없음 (가족·지인 누구나)<br />
        신청 방법: 주민센터 방문만 가능 (온라인 불가)<br />
        핵심 서류: 위임장 + 양쪽 신분증 + 부모님 통장 사본<br />
        주의사항: 금융정보 동의서는 부모님 서명 필요 (미리 받아가기)<br />
      </GreenBox>

      <H2>대리신청 서류 체크리스트</H2>
      <p style={body}>
        대리로 신청할 때는 본인 신청보다 서류가 좀 더 필요해요.
        특히 위임장과 금융정보 동의서(부모님 서명본)를 빼먹으면 헛걸음하게 되니까 꼭 챙기세요.
      </p>
      <Checklist items={PROXY_DOCS} />
      <p style={body}>
        금융정보 제공 동의서는 주민센터에서 양식을 받아 집에서 부모님 서명을 받아오거나, 미리 출력해서 서명을 받아 가면 돼요.
        부모님 신분증은 사본도 괜찮지만, 원본이 있으면 더 원활하게 처리되죠.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>위임장 작성 방법</H2>
      <p style={body}>
        위임장은 정해진 공식 양식이 없어요.
        주민센터에 비치된 양식을 써도 되고, 자유 양식으로 직접 작성해도 돼요.
        아래 내용만 빠짐없이 적으면 문제없이 접수돼요.
      </p>
      <BorderBox>
        <strong>위임장에 꼭 들어가야 할 내용</strong><br />
        <br />
        1. 위임인(부모님) 정보: 성명, 주민등록번호, 주소, 연락처<br />
        2. 대리인(자녀 등) 정보: 성명, 주민등록번호, 주소, 연락처, 관계<br />
        3. 위임 내용: "기초연금 신청에 관한 일체의 권한을 위임합니다"<br />
        4. 작성 일자<br />
        5. 위임인(부모님) 서명 또는 날인<br />
        <br />
        A4 용지에 손으로 적어도 되고, 컴퓨터로 작성해서 출력해도 돼요.
      </BorderBox>
      <p style={body}>
        위임장은 한 번 제출하면 끝이에요. 이후 추가 서류 보완이 필요하면 대리인이 다시 방문할 수 있는데, 이때도 위임장을 한 번 더 가져가면 원활하게 처리돼요.
      </p>

      <H2>대리신청 시 주의할 점</H2>
      <p style={body}>
        가장 많이 실수하는 부분은 금융정보 동의서예요.
        이 서류는 부모님 본인 서명이 필요한데, 대리인이 대신 서명하면 접수가 안 돼요.
        미리 집에서 부모님 서명을 받아 가는 게 핵심이에요.
      </p>
      <p style={body}>
        부모님이 의사 표시가 어려운 상황이라면 <Link href="/w/기초연금-이의신청-심사청구-절차" style={{ color: "#1D9E75", textDecoration: "underline" }}>성년후견인 제도</Link>를 통해 신청할 수 있어요.
        법원에서 성년후견인으로 지정받으면 후견인이 모든 서류에 서명할 수 있죠.
        다만 후견인 지정 절차는 별도의 법적 절차가 필요해서 시간이 걸려요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        대리신청 관련 궁금한 점을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법 시행규칙 기준으로 작성됐어요. 주민센터마다 요구하는 서류가 약간 다를 수 있으니, 방문 전 전화(129)로 확인하면 확실해요." />
    </ArticleLayout>
  );
}
