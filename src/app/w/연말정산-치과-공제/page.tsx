"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 임플란트나 치열교정에 큰돈을 썼는데 연말정산에서 얼마나 돌려받을 수 있는지 궁금한 직장인
// Q2. 치과 치료비 중 공제되는 항목을 확인하고 환급 금액을 계산한다
// Q3. 공제 대상(임플란트 O, 미백 X), 공제율 15%, 총급여 3% 기준, 한도(본인·65세 무제한), 실손보험 차감
// Q4. GreenBox(공제/불가 분류) + Calculator식 예시 BorderBox + Steps(증빙 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스 간소화 서비스에서 치과 진료비를 확인하세요",
    desc: "1월 15일부터 홈택스 연말정산 간소화 서비스가 열려요. 의료비 항목에서 치과 진료비가 자동으로 조회돼요. 금액이 맞는지 확인만 하면 돼요.",
    tip: "누락된 경우 치과에서 진료비납입확인서 발급",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "치열교정은 저작기능장애 진단서가 필요해요",
    desc: "치열교정 비용을 공제받으려면 치과 전문의가 발급한 저작기능장애 진단서를 첨부해야 해요. 진단서 없으면 미용 목적으로 봐서 공제가 안 돼요. 교정 시작할 때 미리 받아두세요.",
    tip: "자녀 치열교정도 진단서 있으면 공제 가능",
  },
  {
    title: "실손보험 환급금은 빼고 신청하세요",
    desc: "실손보험으로 돌려받은 금액은 공제 대상에서 제외해요. 임플란트 500만원 중 실손보험 200만원 받았으면 공제 대상은 300만원이에요. 간소화 자료에 실손보험 환급 내역이 반영돼 있으니 확인하세요.",
    tip: "2025년 귀속부터 실손보험 자동 차감 적용",
  },
  {
    title: "PDF 다운로드해서 회사에 제출하세요",
    desc: "간소화 자료를 PDF로 다운로드해서 회사에 제출하면 끝이에요. 저작기능장애 진단서는 별도로 첨부해야 해요. 해외 치과 치료 영수증도 직접 제출하면 공제 가능해요.",
    tip: "해외 치과 치료도 영수증 제출하면 공제",
  },
];

const FAQS = [
  {
    q: "임플란트 500만원 했는데 얼마 돌려받나요?",
    a: "총급여 5천만원 기준으로 계산하면, 3% 기준액 150만원을 빼고 350만원의 15%인 52만 5천원을 환급받아요. 총급여가 낮을수록 3% 기준액도 낮아져서 환급이 더 커져요. 본인 치료비라 한도 제한 없이 전액 공제 대상이에요.",
  },
  {
    q: "미용 목적 치열교정은 정말 안 되나요?",
    a: "네, 미용 목적 교정은 공제 대상이 아니에요. 하지만 부정교합으로 저작기능에 장애가 있다면 진단서를 받을 수 있어요. 교정 상담 때 의사에게 저작기능장애 해당 여부를 물어보세요.",
  },
  {
    q: "스케일링도 공제되나요?",
    a: "네, 스케일링은 예방 치료로 의료비 공제 대상이에요. 건강보험 적용 스케일링(연 1회)도, 자비로 추가 받은 스케일링도 모두 공제돼요.",
  },
  {
    q: "부모님 틀니 비용도 공제받을 수 있나요?",
    a: "네, 기본공제 대상자인 부모님(60세 이상, 소득 100만원 이하)의 틀니 비용은 공제돼요. 65세 이상이면 한도 없이 전액 공제 가능해요. 65세 미만이면 700만원 한도가 적용돼요.",
  },
  {
    q: "여러 치과 다녀도 합산되나요?",
    a: "네, 모든 치과 진료비가 합산돼서 의료비 공제 대상이에요. 간소화 서비스에서 자동으로 합산 조회돼요. 누락된 치과가 있으면 해당 치과에서 진료비납입확인서를 받아서 직접 추가하면 돼요.",
  },
  {
    q: "치아 보험(치아보험 상품)으로 받은 돈도 빼야 하나요?",
    a: "실손보험 환급금만 빼면 돼요. 정액형 치아보험(가입 시 약정 금액 지급)은 의료비에서 차감하지 않아요. 실손보험처럼 실제 치료비 기준으로 환급받는 상품만 차감 대상이에요.",
  },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "소득세법 제59조의4", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-의료비-세액공제", title: "연말정산 의료비 세액공제", description: "의료비 전체 공제 기준과 한도 정리." },
  { slug: "연말정산-안경구입비-공제", title: "안경구입비 공제 방법", description: "안경, 콘택트렌즈 연 50만원 한도." },
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 주요 공제 항목." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 &middot; 의료비 공제 &middot; 치과</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        치과 치료비, 연말정산에서 얼마 돌려받나?<br />
        임플란트부터 치열교정까지 공제 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "임플란트 500만원 했는데 연말정산으로 돌려받을 수 있어요?"
      </p>
      <p style={body}>
        치과 치료비는 <strong>의료비 세액공제 15%</strong> 대상이에요. 임플란트, 틀니, 충치 치료 모두 돼요. 총급여 5천만원에 임플란트 500만원이면 <strong>최대 52만원</strong> 환급받을 수 있어요. 다만 치아 미백이나 미용 교정은 안 되고, 치열교정은 <strong>저작기능장애 진단서</strong>가 있어야 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어떤 치과 치료가 공제되고, 안 되나요?</H2>
      <p style={body}>
        기준은 단순해요. <strong>치료 목적이면 공제, 미용 목적이면 불가</strong>예요.
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" style={{ color: "#1D9E75", textDecoration: "underline" }}> 국세청</a>에서 치료 목적 여부를 기준으로 판단해요.
      </p>

      <SectionBadge>공제 대상 분류</SectionBadge>
      <GreenBox>
        공제 가능 (치료 목적){"\n"}
        &middot; 충치 치료, 신경 치료, 발치(사랑니 포함){"\n"}
        &middot; 잇몸 치료(치주 질환), 크라운, 브릿지{"\n"}
        &middot; 임플란트, 틀니{"\n"}
        &middot; 스케일링(예방 치료){"\n"}
        &middot; 레진, 아말감 충전{"\n\n"}
        조건부 공제{"\n"}
        &middot; 치열교정 → 저작기능장애 진단서 필수{"\n\n"}
        공제 불가 (미용 목적){"\n"}
        &middot; 치아 미백, 라미네이트, 미용 교정
      </GreenBox>

      <CategoryButton label="연말정산 정보" count={15} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>공제 금액은 어떻게 계산하나요?</H2>
      <p style={body}>
        의료비 세액공제는 총급여의 <strong>3% 초과분</strong>에 대해 <strong>15%</strong>를 돌려주는 구조예요. 3% 기준 아래 금액은 본인 부담이고, 넘는 부분만 공제돼요.
      </p>

      <SectionBadge>계산 예시</SectionBadge>
      <BorderBox>
        <strong>연봉 5,000만원 + 임플란트 500만원</strong>{"\n"}
        &middot; 3% 기준액: 5,000만원 x 3% = 150만원{"\n"}
        &middot; 공제 대상: 500만원 - 150만원 = 350만원{"\n"}
        &middot; 세액공제: 350만원 x 15% = 52만 5천원 환급{"\n\n"}
        <strong>연봉 5,000만원 + 65세 부모님 틀니 300만원</strong>{"\n"}
        &middot; 3% 기준액: 150만원{"\n"}
        &middot; 공제 대상: 300만원 - 150만원 = 150만원{"\n"}
        &middot; 세액공제: 150만원 x 15% = 22만 5천원 환급
      </BorderBox>

      <p style={body}>
        본인, 65세 이상, 장애인 치료비는 <strong>한도 없이</strong> 전액 공제돼요. 그 외 부양가족(배우자, 자녀 등)은 연 <strong>700만원 한도</strong>가 있어요. 본인 임플란트라면 금액이 아무리 커도 전액 공제 대상이에요.
      </p>

      <Divider />

      <H2>공제받으려면 어떻게 해야 하나요?</H2>
      <p style={body}>
        대부분은 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 간소화 서비스에서 자동으로 처리돼요. 치열교정 같은 특수한 경우만 추가 서류가 필요해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>실손보험 받았으면 어떻게 되나요?</H2>
      <p style={body}>
        실손보험으로 환급받은 금액은 <strong>공제 대상에서 제외</strong>돼요. 본인이 실제로 부담한 금액만 공제받을 수 있어요.
      </p>

      <BorderBox>
        <strong>실손보험 차감 예시</strong>{"\n"}
        &middot; 임플란트 비용: 500만원{"\n"}
        &middot; 실손보험 환급: 200만원{"\n"}
        &middot; 공제 대상 금액: 300만원{"\n\n"}
        2025년 귀속분부터 간소화 자료에 실손보험 환급 내역이 자동 반영돼요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 연말정산) 기준으로 작성했어요. 개인 상황에 따라 공제 금액이 달라질 수 있으니 홈택스 간편계산기로 확인하세요." />
    </ArticleLayout>
  );
}
