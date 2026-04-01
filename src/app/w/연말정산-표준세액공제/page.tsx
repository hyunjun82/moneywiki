"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 간소화 자료를 제출 안 했거나, 표준세액공제가 뭔지 몰라서 13만원만 공제받을까 걱정하는 직장인
// Q2. 표준세액공제(13만원)와 특별공제를 비교해서 유리한 쪽을 선택한다
// Q3. 표준세액공제 13만원 구조, 포기하는 항목, 특별공제와 비교 금액, 경정청구 방법
// Q4. GreenBox(결론: 특별공제가 거의 항상 유리) + BorderBox(비교표) + Steps(확인 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스 간소화 서비스에서 자료를 조회하세요",
    desc: "1월 15일부터 홈택스 간소화 서비스가 열려요. 의료비, 보험료, 교육비, 기부금 등 특별세액공제 항목이 자동으로 조회돼요. 이 금액 합계가 13만원 넘으면 특별공제가 유리해요.",
    tip: "대부분 근로자는 보험료 하나만 있어도 12만원",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "특별공제 합계와 13만원을 비교하세요",
    desc: "보장성보험료 12%, 의료비 15%, 교육비 15%, 기부금 15~30%를 각각 계산해서 합산하세요. 합계가 13만원 넘으면 특별공제 선택, 미만이면 표준세액공제 선택이 유리해요. 보험료 100만원만 내도 12만원이니까 거의 대부분 특별공제가 이겨요.",
    tip: "홈택스 모의계산기에서 자동 비교 가능",
  },
  {
    title: "간소화 자료 PDF를 회사에 제출하세요",
    desc: "특별공제가 유리하다면 간소화 자료를 PDF로 다운로드해서 회사에 제출하면 끝이에요. 이걸 안 하면 회사에서 자동으로 표준세액공제 13만원만 적용해요. 제출 기한을 놓치지 마세요.",
    tip: "미제출 = 자동으로 표준세액공제 13만원 적용",
  },
  {
    title: "잘못 선택했으면 경정청구로 바꿀 수 있어요",
    desc: "표준세액공제로 처리됐는데 특별공제가 더 유리했다면, 법정신고기한 5년 이내에 경정청구를 하면 돼요. 홈택스에서 직접 신청 가능하고, 차액을 환급받을 수 있어요.",
    tip: "경정청구는 5년 이내 홈택스에서 신청",
  },
];

const FAQS = [
  {
    q: "표준세액공제 선택하면 모든 공제를 포기하나요?",
    a: "아니에요. 특별소득공제(보험료, 주택자금)와 특별세액공제(의료비, 교육비, 기부금, 월세)만 포기하는 거예요. 인적공제, 연금보험료(국민연금), 근로소득공제, 연금저축 세액공제, 자녀 세액공제, 신용카드 소득공제는 그대로 받아요.",
  },
  {
    q: "간소화 자료 안 내면 자동으로 표준세액공제 되나요?",
    a: "네, 소득공제신고서를 제출하지 않으면 회사에서 자동으로 표준세액공제 13만원만 적용해요. 특별공제 항목이 하나라도 있다면 꼭 제출하세요.",
  },
  {
    q: "보험료만 있고 의료비·교육비는 없어요. 그래도 특별공제?",
    a: "보장성보험료 100만원 납입하면 세액공제 12만원이에요. 여기에 건강보험료·고용보험료 소득공제까지 합하면 특별공제 합계가 13만원을 넘을 가능성이 높아요. 비교해보고 결정하세요.",
  },
  {
    q: "일용근로자도 표준세액공제 받나요?",
    a: "네, 일용근로자는 자동으로 표준세액공제가 적용돼요. 별도로 신청할 필요 없이 원천징수 시 자동 반영돼요.",
  },
  {
    q: "표준세액공제를 선택하면 증빙 서류가 필요 없나요?",
    a: "맞아요. 특별공제를 포기하는 거니까 의료비·교육비 영수증 같은 증빙 서류를 제출할 필요가 없어요. 대신 공제 금액이 13만원으로 고정돼요.",
  },
  {
    q: "경정청구하면 환급금을 언제 받나요?",
    a: "홈택스에서 경정청구를 신청하면 보통 2~3개월 내에 심사 후 환급돼요. 등록된 계좌로 직접 입금되거든요. 5년 이내라면 언제든 신청 가능해요.",
  },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "소득세법 제59조", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-세액공제-소득공제-차이", title: "세액공제와 소득공제 차이", description: "두 가지 공제 방식의 차이와 유불리." },
  { slug: "연말정산-보장성보험료-공제", title: "보장성보험료 공제", description: "보험료 세액공제 12%, 100만원 한도." },
  { slug: "연말정산-의료비-세액공제", title: "의료비 세액공제", description: "총급여 3% 초과분의 15% 공제 기준." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 &middot; 표준세액공제 &middot; 특별공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        표준세액공제 13만원, 특별공제보다 나을까?<br />
        비교 기준과 선택 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "간소화 자료 안 내면 어떻게 돼요? 표준세액공제가 유리한 경우도 있나요?"
      </p>
      <p style={body}>
        거의 없어요. 표준세액공제는 <strong>딱 13만원</strong>이에요. 보장성보험 하나만 있어도 12만원인데, 여기에 <a href="/w/연말정산-의료비-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>의료비</a>나 교육비까지 있으면 수십만원이죠. 13만원만 받으면 확실히 손해예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>표준세액공제가 뭔지부터 정리해요</H2>
      <p style={body}>
        특별공제를 안 하겠다고 하면, 대신 받는 <strong>13만원짜리 세액공제</strong>예요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 소득세법 제59조</a>에 따라 특별소득공제와 특별세액공제를 신청하지 않으면 자동으로 13만원이 적용돼요. 간소화 자료를 아예 안 내도 자동 적용돼요.
      </p>

      <SectionBadge>표준세액공제 핵심</SectionBadge>
      <GreenBox>
        표준세액공제 = 13만원 고정{"\n"}
        특별공제 항목(보험료·의료비·교육비·기부금·월세)을 전부 포기하는 대신 13만원만 받는 거예요.{"\n\n"}
        결론: 보험료 하나만 내도 12만원이니까, 대부분 특별공제가 훨씬 유리해요.
      </GreenBox>

      <CategoryButton label="연말정산 정보" count={15} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>특별공제 선택하면 뭘 받고, 표준세액공제면 뭘 포기하나요?</H2>
      <p style={body}>
        표준세액공제를 선택하면 아래 항목을 전부 포기해요. 부분 선택은 안 돼요. 전체를 받거나, 전체를 포기하거나 둘 중 하나예요.
      </p>

      <SectionBadge>포기 vs 유지 항목</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>특별공제 선택</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>표준세액공제 선택</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["보장성보험료 (12%, 최대 12만원)", "O 받음", "X 포기"],
              ["의료비 (15%)", "O 받음", "X 포기"],
              ["교육비 (15%)", "O 받음", "X 포기"],
              ["기부금 (15~30%)", "O 받음", "X 포기"],
              ["월세 (15~17%)", "O 받음", "X 포기"],
              ["건강·고용보험료 소득공제", "O 받음", "X 포기"],
              ["인적공제, 국민연금", "O 유지", "O 유지"],
              ["신용카드 소득공제", "O 유지", "O 유지"],
              ["연금저축 세액공제", "O 유지", "O 유지"],
            ].map(([item, special, standard], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{special}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: i < 6 ? "#dc2626" : "#1D9E75", fontWeight: 600 }}>{standard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>실제로 얼마 차이나는지 계산해볼게요</H2>
      <p style={body}>
        일반적인 직장인 기준으로 비교하면 차이가 확 드러나요.
      </p>

      <BorderBox>
        <strong>일반 직장인 (특별공제 선택 시)</strong>{"\n"}
        &middot; 보장성보험료 100만원 납입 → 12만원 공제{"\n"}
        &middot; 의료비 200만원(3% 초과분) → 약 7.5만원 공제{"\n"}
        &middot; 기부금 50만원 → 7.5만원 공제{"\n"}
        &middot; 특별공제 합계: 약 27만원{"\n\n"}
        <strong>표준세액공제: 13만원</strong>{"\n\n"}
        차이: 14만원 손해. 의료비가 더 크면 수십만원 차이도 나요.
      </BorderBox>

      <p style={body}>
        보험료만 100만원 내도 세액공제가 12만원이에요. 건강보험료·고용보험료 소득공제까지 합하면 거의 13만원을 넘기죠. 의료비나 교육비가 조금이라도 있으면 확실히 특별공제가 이겨요.
      </p>

      <Divider />

      <H2>어떻게 확인하고 선택하나요?</H2>
      <p style={body}>
        사실 대부분은 간소화 자료만 제출하면 자동으로 특별공제가 적용돼요. 확인 절차를 정리하면 이래요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 연말정산) 소득세법 기준으로 작성했어요. 개인 상황에 따라 유불리가 다를 수 있으니 홈택스 모의계산기로 확인하세요." />
    </ArticleLayout>
  );
}
