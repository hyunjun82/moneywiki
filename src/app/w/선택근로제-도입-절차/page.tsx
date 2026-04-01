"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 선택근로제를 도입하려는 사업주나 인사담당자가 법적 절차와 서면 합의 방법을 모르는 상황
// Q2. 근로자대표와 서면 합의서를 작성하고 취업규칙을 변경해서 선택근로제를 합법적으로 도입한다
// Q3. 근로기준법 제52조 근거, 근로자대표 서면 합의(필수 기재사항 4가지), 정산기간(1개월 이내), 연장근로 수당 계산법
// Q4. Steps(도입 절차) + BorderBox(서면 합의 기재사항) + GreenBox(수당 계산) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "근로자대표를 선출해요",
    desc: "근로자 과반수로 조직된 노동조합이 있으면 그 노조가 대표예요. 없으면 근로자 과반수를 대표하는 자를 선거 등 민주적 방법으로 선출해야 해요. 사용자가 지정하면 위법이에요.",
  },
  {
    title: "서면 합의서를 작성해요",
    desc: "근로자대표와 4가지 필수 사항을 포함한 서면 합의서를 작성하고, 양측이 서명·날인해요. 대상 근로자, 정산 기간, 총 근로시간, 근무일별 근로시간을 구체적으로 적어야 해요.",
  },
  {
    title: "취업규칙을 변경해요",
    desc: "'업무의 시작·종료 시각을 근로자 결정에 맡긴다'는 내용을 취업규칙에 추가해요. 근로자 의견 청취 절차를 거치고, 상시 10인 이상 사업장은 관할 지방고용노동청에 신고해요.",
    link: { label: "고용노동부 유연근무 안내", href: "https://www.moel.go.kr/policy/policybbs/workinghour/detailList.do?tpi_seq=15" },
  },
  {
    title: "시행 후 합의서를 3년간 보관해요",
    desc: "서면 합의서는 3년간 보관 의무가 있어요. 근로감독관이 요청하면 즉시 제출할 수 있어야 해요. 정산 기간 변경 시에도 새로 합의서를 작성해야 하고요.",
  },
];

const CHECKLIST = [
  "근로자대표 선출 절차 완료 / 민주적 방법(선거, 비밀투표) 기록 보관",
  "서면 합의서 4가지 필수 기재사항 / 대상 근로자·정산기간·총시간·일별시간",
  "취업규칙 변경 완료 / 근로자 의견 청취 + 노동청 신고",
  "의무적 근로시간대(코어타임) 설정 여부 / 합의서에 명시",
  "연장·야간·휴일근로 수당 정산 방식 확정 / 정산기간 평균 기준 계산",
];

const FAQS = [
  {
    q: "선택근로제와 탄력근로제는 뭐가 다른가요?",
    a: "선택근로제는 근로자가 출퇴근 시간을 자율 결정해요. 탄력근로제는 사용자가 특정 주에 많이 일하고 다른 주에 적게 일하도록 정해요. 자율성 여부가 핵심 차이죠.",
  },
  {
    q: "정산 기간은 최대 얼마까지 가능한가요?",
    a: "원칙적으로 1개월 이내예요. 신상품·신기술 연구개발 업무는 3개월 이내도 가능해요. 정산 기간이 길수록 근로시간 조정의 유연성이 커져요.",
  },
  {
    q: "코어타임(의무 근무시간)을 꼭 정해야 하나요?",
    a: "법적 의무는 아니에요. 하지만 회의·협업이 필요한 시간대를 코어타임으로 정해두면 업무 효율이 좋아요. 합의서에 명시하면 돼요.",
  },
  {
    q: "연장근로 수당은 어떻게 계산하나요?",
    a: "정산 기간 내 총 근로시간에서 법정 근로시간(주 40시간 x 주 수)을 뺀 초과분에 1.5배 수당을 지급해요. 4주 정산인데 170시간 일했으면 10시간분 × 시급 × 1.5배예요.",
  },
  {
    q: "야간·휴일근로 수당은 선택근로제에서도 줘야 하나요?",
    a: "네. 야간근로(22시~06시) 50% 가산, 휴일근로 50~100% 가산은 선택근로제를 적용해도 별도로 지급해야 해요. 정산 기간 평균과 무관해요.",
  },
  {
    q: "근로자 개인이 동의 안 하면 어떻게 되나요?",
    a: "서면 합의는 근로자대표와 하는 거라 개인 동의가 아니에요. 다만 대상 근로자 범위를 합의서에 명시하고, 해당 근로자에게 제도를 충분히 설명하는 게 좋아요.",
  },
];

const SOURCES = [
  { name: "근로기준법 제52조", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부 유연근무", href: "https://www.moel.go.kr/policy/policybbs/workinghour/detailList.do?tpi_seq=15" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1326&ccfNo=3&cciNo=2&cnpClsNo=2" },
];

const RELATED = [
  { slug: "기간제근로자-무기계약-전환-시기", title: "기간제 근로자 무기계약 전환", description: "2년 초과 시 무기계약 전환 시기." },
  { slug: "중소기업-취업자-소득세-감면-이직", title: "중소기업 소득세 감면", description: "이직해도 감면 유지되는 조건." },
  { slug: "청년-중소기업-소득세-감면-신청", title: "청년 소득세 감면 신청", description: "만 15~34세 중소기업 취업자 혜택." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 선택근로제 · 유연근무</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        선택근로제, 어떻게 도입하나요?<br />
        서면 합의부터 수당 계산까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직원들 출퇴근 시간을 유연하게 바꾸고 싶은데 절차가 복잡해 보이죠.
      </p>
      <p style={body}>
        선택근로제는 정산 기간(1개월 이내) 평균이 주 40시간만 넘지 않으면
        특정 주에 많이 일하고 다른 주에 적게 일해도 되는 제도예요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제52조</a>가 근거이고,
        핵심은 <strong>근로자대표와의 서면 합의</strong>예요. 사용자가 일방적으로 도입할 수 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>도입 절차는 이 순서로 해요</H2>
      <p style={body}>
        서면 합의 없이 시행하면 위법이에요. 단계별로 빠뜨리지 않고 진행하세요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="근로/노동 정보" count={6} href="/category/근로-노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>서면 합의서에 반드시 들어갈 4가지</H2>
      <p style={body}>
        합의서에 기재사항이 빠지면 무효가 될 수 있어요. 아래 4가지를 구체적으로 적어야 해요.
      </p>

      <BorderBox>
        <strong>서면 합의서 필수 기재사항</strong>{"\n"}
        · 대상 근로자 범위: "영업부 전체 직원 20명" (포괄 기재 불가){"\n"}
        · 정산 기간: "매월 1일~말일" 또는 "매주 월~일"{"\n"}
        · 정산 기간 내 총 근로시간: "4주 기준 160시간"{"\n"}
        · 근무일별 근로시간: "월 10시간, 화 8시간" 등 구체적 명시
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>연장근로 수당은 이렇게 계산해요</H2>
      <p style={body}>
        정산 기간 평균이 주 40시간을 초과하면 그 초과분에 대해 1.5배 수당을 줘야 해요.
      </p>

      <GreenBox>
        수당 계산 예시 (시급 1만원, 4주 정산){"\n"}
        · 1주차 50시간 + 2주차 45시간 + 3주차 40시간 + 4주차 35시간 = 170시간{"\n"}
        · 법정 근로시간: 40시간 x 4주 = 160시간{"\n"}
        · 초과: 10시간{"\n"}
        · 연장수당: 10시간 x 10,000원 x 1.5 = 150,000원
      </GreenBox>

      <p style={body}>
        특정 주에 50시간 일해도 평균이 40시간 이하면 연장수당이 안 나와요.
        대신 <strong>하루 12시간 초과</strong>나 <strong>주 52시간 초과</strong>는 선택근로제를 적용해도 위법이에요.
      </p>

      <Divider />

      <H2>도입 전 체크리스트</H2>
      <p style={body}>
        근로감독관 점검에 대비해서 아래 항목을 모두 갖춰 두세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        선택근로제 도입할 때 실무에서 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 근로기준법 기준으로 작성했어요. 업종이나 사업장 규모에 따라 적용이 달라질 수 있으니 고용노동부 상담(1350)을 권장해요." />
    </ArticleLayout>
  );
}
