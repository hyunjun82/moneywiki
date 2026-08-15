"use client";
// Q1. 올해 출산(또는 입양)했는데 세액공제가 얼마인지, 자녀 세액공제와 별도인지 확인하려는 직장인
// Q2. 출산·입양 세액공제 금액(30/50/70만원)을 확인하고 자녀 세액공제와 함께 정확히 반영한다
// Q3. 첫째30만/둘째50만/셋째70만, 출산 연도 일회성, 자녀 세액공제와 중복 적용, 쌍둥이 계산법
// Q4. GreenBox(금액 요약) + BorderBox(시나리오별 계산) + Steps(신청 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "출생(입양)신고를 먼저 완료하세요",
    desc: "출생신고를 하면 주민등록번호가 부여돼요. 이게 있어야 연말정산 시 자녀 등록이 가능해요. 입양의 경우 입양신고 확인서가 필요해요. 출생신고는 14일 이내에 해야 하니까 미루지 마세요.",
    tip: "정부24에서 온라인 출생신고도 가능해요",
  },
  {
    title: "간소화서비스에서 자녀가 등록됐는지 확인하세요",
    desc: "홈택스 간소화서비스에 접속하면 부양가족 탭에서 신생아가 자동 등록돼 있는 경우가 많아요. 안 나와 있으면 부양가족 자료 제공 동의를 해야 해요. 미성년 자녀는 부모가 대리 신청할 수 있어요.",
    tip: "1월 15일 이후 간소화서비스에서 확인",
    link: { label: "홈택스 간소화서비스", href: "https://www.hometax.go.kr" },
  },
  {
    title: "회사에 출산·입양 사실을 알리세요",
    desc: "연말정산 서류 제출 시 출생증명서 또는 입양확인서를 회사에 제출하면 돼요. 기본공제 + 출산·입양 세액공제 + 자녀 세액공제가 함께 반영돼요. 간소화 PDF에 자동 포함되는 경우도 많지만, 확인은 필수예요.",
    tip: "기본공제 등록은 부부 중 한 명만 가능",
  },
];

const FAQS = [
  {
    q: "쌍둥이를 출산하면 세액공제가 어떻게 되나요?",
    a: "각각 출생 순서에 따라 계산해요. 첫째·둘째 출산이면 30만+50만=80만원, 이미 자녀가 있는 상태에서 쌍둥이(둘째·셋째)면 50만+70만=120만원이에요.",
  },
  {
    q: "입양도 출산과 같은 금액인가요?",
    a: "네. 입양한 자녀도 출산과 동일한 금액이에요. 입양 순서도 기존 자녀를 포함해서 세는 거라 입양이 첫째면 30만원, 셋째면 70만원이에요.",
  },
  {
    q: "출산 세액공제와 자녀 세액공제를 동시에 받을 수 있나요?",
    a: "네. 출산·입양 세액공제는 출산한 해에만 받는 일회성이고, 자녀 세액공제는 매년 받는 정기 공제예요. 별도 항목이라 중복 적용돼요.",
  },
  {
    q: "출산 세액공제는 출산한 해에만 받을 수 있나요?",
    a: "맞아요. 출산(입양)한 과세연도에만 적용되는 일회성 공제예요. 다음 해부터는 자녀 세액공제만 매년 받아요.",
  },
  {
    q: "자녀 세액공제는 얼마예요?",
    a: "기본공제 대상 자녀 중 8세 이상(2025년 기준)이면 1명 15만원, 2명 35만원, 3명 이상이면 35만원 + 1명당 30만원이에요. 출산한 해에는 출산 세액공제와 함께 받아요.",
  },
  {
    q: "맞벌이 부부 중 누가 받는 게 유리해요?",
    a: "기본공제를 등록한 쪽이 출산·입양 세액공제도 받아요. 세액공제는 세율과 무관하게 고정 금액이니까 기본공제를 총급여 높은 쪽에 등록하고 세액공제도 그쪽에서 받는 게 유리해요.",
  },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr" },
  { name: "소득세법 제59조의2", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-출산", title: "출산 연말정산 혜택 전체 정리", description: "출산지원금 비과세부터 의료비 공제까지." },
  { slug: "연말정산-자녀-세액공제", title: "자녀 세액공제 금액과 조건", description: "자녀 수별 세액공제 금액 안내." },
  { slug: "연말정산", title: "연말정산 가이드", description: "소득공제와 세액공제 전체 구조 이해하기." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 출산·입양 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아이 낳으면 세금에서 얼마 빼주나요?<br />
        출산·입양 세액공제 금액과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "첫째 낳았는데 연말정산에서 얼마나 돌려받아요?" "쌍둥이면 두 배인가요?"
      </p>
      <p style={body}>
        출산·입양 세액공제는 <strong>출산한 해에 한 번</strong> 받는 특별 혜택이에요.
        첫째 <strong>30만원</strong>, 둘째 <strong>50만원</strong>, 셋째 이상 <strong>70만원</strong>이에요.
        <a href="/w/연말정산-자녀-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>자녀 세액공제</a>와 <strong>별도로 중복 적용</strong>되니까
        첫째 출산하면 출산 30만원 + 자녀 15만원 = <strong>총 45만원</strong>을 세금에서 빼줘요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>출생 순서별 세액공제 금액이에요</H2>
      <p style={body}>
        공제 금액은 기존 자녀를 포함한 <strong>출생 순서</strong>에 따라 달라져요. 이미 자녀가 1명 있는 상태에서 출산하면 둘째 기준이에요.
      </p>

      <SectionBadge>출산·입양 세액공제 금액</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>출생 순서</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>출산 세액공제</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>자녀 세액공제</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>합계</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["첫째", "30만원", "15만원", "45만원"],
              ["둘째", "50만원", "20만원", "70만원"],
              ["셋째", "70만원", "30만원", "100만원"],
            ].map(([order, birth, child, total], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{order}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{birth}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{child}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700 }}>{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        핵심 포인트{"\n"}
        · 출산·입양 세액공제 = 출산한 해 1회만{"\n"}
        · 자녀 세액공제 = 매년 계속 적용{"\n"}
        · 두 공제는 별도 항목 → 중복 적용{"\n"}
        · 입양도 출산과 동일한 금액
      </GreenBox>

      <p style={body}>
        세액공제라서 세율과 관계없이 공제 금액 그대로 세금에서 빼줘요. 소득공제와 달리 저소득·고소득 상관없이 동일한 효과예요.
        쌍둥이나 다태아는 어떻게 계산하는지 볼게요.
      </p>

      <CategoryButton label="연말정산 가이드" count={30} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>쌍둥이·세쌍둥이는 이렇게 계산해요</H2>
      <p style={body}>
        쌍둥이를 낳으면 각각 출생 순서에 맞춰서 합산해요. 기존 자녀가 있는지에 따라 금액이 달라져요.
      </p>

      <SectionBadge>다태아 시나리오</SectionBadge>
      <BorderBox>
        <strong>시나리오 1: 기존 자녀 없이 쌍둥이 출산</strong>{"\n"}
        · 첫째 30만원 + 둘째 50만원 = <strong>80만원</strong>{"\n"}
        · 자녀 세액공제: 35만원 (2명){"\n"}
        · 합계: <strong>115만원</strong>{"\n\n"}
        <strong>시나리오 2: 자녀 1명 있는 상태에서 쌍둥이 출산</strong>{"\n"}
        · 둘째 50만원 + 셋째 70만원 = <strong>120만원</strong>{"\n"}
        · 자녀 세액공제: 65만원 (3명, 35만+30만){"\n"}
        · 합계: <strong>185만원</strong>{"\n\n"}
        <strong>시나리오 3: 세쌍둥이 출산 (첫 출산)</strong>{"\n"}
        · 첫째 30만 + 둘째 50만 + 셋째 70만 = <strong>150만원</strong>{"\n"}
        · 자녀 세액공제: 65만원 (3명){"\n"}
        · 합계: <strong>215만원</strong>
      </BorderBox>

      <p style={body}>
        셋째부터 금액이 크게 뛰어요. 다자녀일수록 세금 혜택이 커지는 구조예요.
        그럼 이 공제를 어떻게 신청하는지 알려드릴게요.
      </p>

      <Divider />

      <H2>신청은 이렇게 하세요</H2>
      <p style={body}>
        별도 신청서를 내는 건 아니에요. 연말정산 시 자녀를 기본공제 대상으로 등록하면 자동으로 출산·입양 세액공제도 반영돼요.
        다만 몇 가지 확인할 게 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자녀 세액공제까지 합치면 이렇게 돼요</H2>
      <p style={body}>
        출산한 해에는 출산 세액공제 + 자녀 세액공제를 동시에 받아요.
        다음 해부터는 자녀 세액공제만 매년 계속 적용되고요.
        <a href="/w/연말정산-출산" style={{ color: "#1D9E75", textDecoration: "underline" }}>출산 연말정산</a> 전체 혜택(출산지원금 비과세, 산후조리비, 의료비 등)까지 합치면 환급이 더 커져요.
      </p>

      <BorderBox>
        <strong>자녀 세액공제 (매년)</strong>{"\n"}
        · 1명: 15만원{"\n"}
        · 2명: 35만원{"\n"}
        · 3명 이상: 35만원 + 추가 1명당 30만원{"\n\n"}
        <strong>출산한 해 총 세액공제 (첫째 기준)</strong>{"\n"}
        · 출산 세액공제 30만원 + 자녀 세액공제 15만원 = <strong>45만원</strong>{"\n"}
        + 인적공제 150만원 소득공제 + 산후조리비 + 의료비 공제
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        출산·입양 세액공제에서 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 출산·입양 세액공제 금액과 자녀 세액공제 요건은 세법 개정에 따라 달라질 수 있으니 최신 기준은 국세청에서 확인해 주세요." />
    </ArticleLayout>
  );
}
