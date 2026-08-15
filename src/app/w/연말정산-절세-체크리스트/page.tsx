"use client";
// Q1. 연말정산 체크리스트에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 12월부터 준비하고 1월 간소화자료를 확인하는 게 좋아요., 안경 구입비, 교복비, 월세 등 놓치기 쉬운 공제를 챙기세요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "연말정산 준비 언제부터 해요?", a: "12월부터 준비하고, 1월 15일에 간소화자료를 확인하면 돼요." },
  { q: "놓치기 쉬운 공제는 뭐가 있어요?", a: "안경 구입비, 교복비, 월세, 기부금 등이 있어요." },
  { q: "부양가족 중복 공제하면 어떻게 돼요?", a: "나중에 추징당해요. 가족끼리 미리 누가 공제받을지 정해야 해요." },
  { q: "간소화에서 누락된 건 어떻게 해요?", a: "직접 영수증을 발급받아서 회사에 제출하면 돼요." },
  { q: "제출 기한을 놓치면요?", a: "5월 종합소득세 신고나 경정청구로 공제받을 수 있어요." },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산", title: "연말정산", description: "관련 내용 정리." },
  { slug: "연말정산-간소화서비스-이용방법", title: "연말정산 간소화서비스 이용방법", description: "관련 내용 정리." },
  { slug: "연말정산", title: "연말정산", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 절세 체크리스트
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        12월부터 준비하고 1월 간소화자료를 확인하는 게 좋아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>놓치기 쉬운 공제 9가지</H2>
      <p style={body}>안경, 콘택트렌즈 구입비는 의료비 공제 대상이에요. 1인당 50만 원 한도로 15% 세액공제받아요.</p>
      <GreenBox>
        12월부터 준비하고 1월 간소화자료를 확인하는 게 좋아요.{"\n"}
        안경 구입비, 교복비, 월세 등 놓치기 쉬운 공제를 챙기세요.{"\n"}
        부양가족 소득·나이 요건과 중복 여부를 꼭 확인하세요.
      </GreenBox>
      <p style={body}>확인 방법: 간소화서비스에서 자동 조회 안 될 수 있어요. 안경점에서 영수증 직접 발급받으세요.</p>

      <CategoryButton label="연말정산" count={10} href="/category/%EC%97%B0%EB%A7%90%EC%A0%95%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>인적공제 체크리스트</H2>
      <p style={body}>부양가족 등록 전 확인:
- [ ] 부양가족 소득금액 100만 원 이하인가요? (근로소득만 있으면 총급여 500만 원 이하)
- [ ] 부양가족 나이 요건 충족하나요? (직계존속 60세 이상, 직계비속 20세 이하)
- [ ] 다른 가족과 중복 등록 안 했나요?
- [ ] 경로우대(70세 이상), 장애인 추가공제 해당자 있나요?</p>
      <BorderBox>
        <strong>인적공제 체크리스트</strong><br />
        부양가족 등록 전 확인:
- [ ] 부양가족 소득금액 100만 원 이하인가요? (근로소득만 있으면 총급여 500만 원 이하)
- [ ] 부양가족 나이 요건 충족하나요? (직계존속 60세 이상, 직계비속 20세 이하)
      </BorderBox>

      <Divider />
      <H2>서류 준비 체크리스트</H2>
      <p style={body}>기본 서류:
- [ ] 주민등록등본 (부양가족 확인)
- [ ] 가족관계증명서 (필요시)</p>
      <p style={body}>별도 제출 필요:
- [ ] 월세 계약서 + 이체내역
- [ ] 안경 구입 영수증
- [ ] 장애인증명서
- [ ] 기부금 영수증 (누락 시)</p>

      <Divider />
      <H2>연말정산 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
