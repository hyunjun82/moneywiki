"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산에서 부양가족 의료비를 공제받을 수 있는지, 한도가 얼마인지 궁금한 상황
// Q2. 부양가족 의료비를 합산해서 세액공제를 신청하고 환급받는다
// Q3. 공제 대상(나이·소득 무관), 공제율(15/20/30%), 한도(700만원/무한), 맞벌이 전략, 실손 차감
// Q4. GreenBox로 공제율 요약 + BorderBox로 대상 정리 + Checklist로 준비사항

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "부양가족 의료비 간소화 자료 조회 (가족관계 등록 먼저)",
  "실손보험 수령액 차감 후 본인 부담분만 계산",
  "안경·콘택트렌즈 영수증 별도 보관 (1인 연 50만원 한도)",
  "간소화에 누락된 병원비 → 영수증 직접 제출",
  "맞벌이면 소득 낮은 쪽에서 의료비 몰아 결제",
  "6세 이하 자녀 의료비는 한도 없음 확인",
];

const FAQS = [
  { q: "부양가족이 소득이 있어도 의료비 공제받을 수 있나요?", a: "네. 의료비 세액공제는 부양가족의 나이와 소득 제한이 없어요. 인적공제를 못 받는 부양가족이라도 의료비는 합산해서 공제받을 수 있죠." },
  { q: "총급여 3% 문턱이 뭔가요?", a: "의료비 공제는 총급여의 3%를 초과한 금액부터 시작돼요. 연봉 5,000만원이면 150만원 넘는 의료비부터 공제되는 거예요." },
  { q: "부모님과 따로 살아도 공제받을 수 있나요?", a: "네. 주민등록상 동거하지 않아도 실제 부양하는 가족이라면 의료비 공제를 받을 수 있어요." },
  { q: "미용 목적 시술도 공제 대상인가요?", a: "안 돼요. 성형수술, 미용 목적 피부과 시술은 공제 대상이 아니에요. 치료 목적이어야 해요." },
  { q: "산후조리원비도 공제받을 수 있나요?", a: "총급여 7,000만원 이하면 출산 1회당 200만원까지 공제받을 수 있어요. 2025년 귀속분부터 적용돼요." },
  { q: "실손보험금 받았으면 어떻게 되나요?", a: "실손보험금을 받은 만큼 의료비 공제 대상에서 빼요. 병원비 100만원 중 실손으로 70만원 돌려받았으면 30만원만 공제 대상이에요." },
  { q: "6세 이하 자녀 의료비 한도가 없어졌다고요?", a: "네. 2025년 귀속(2026년 연말정산)부터 6세 이하 부양가족의 의료비는 700만원 한도가 사라져서 전액 공제받을 수 있어요." },
];

const SOURCES = [
  { name: "소득세법 제59조의4", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr" },
  { name: "홈택스 간소화서비스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-인적공제-중복", title: "연말정산 인적공제 중복 주의", description: "부양가족 중복 공제 시 둘 다 추징당해요." },
  { slug: "연말정산", title: "연말정산 공제 항목 정리", description: "소득공제부터 세액공제까지 전체 흐름." },
  { slug: "연말정산-계산기", title: "연말정산 계산기", description: "예상 환급액을 미리 계산해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 의료비 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부양가족 의료비, 연말정산에서 얼마 돌려받을까?<br />
        공제 대상부터 맞벌이 전략까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가족 병원비가 많이 나왔는데, 연말정산에서 돌려받을 수 있는지 궁금하죠.
      </p>
      <p style={body}>
        부양가족 의료비는 나이·소득 제한 없이 합산해서 <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>상 15% 세액공제를 받을 수 있어요.
        2025년 귀속부터 6세 이하 자녀 의료비 한도가 사라지고, 산후조리원비 공제도 확대됐어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>공제율과 한도, 한눈에 봐요</H2>
      <p style={body}>
        의료비 세액공제는 총급여의 3%를 초과하는 금액부터 적용돼요. 공제율은 의료비 종류에 따라 달라요.
      </p>

      <GreenBox>
        난임시술비: 30% 공제 (한도 없음){"\n"}
        미숙아·선천성이상아: 20% 공제 (한도 없음){"\n"}
        본인·65세 이상·장애인·6세 이하: 15% 공제 (한도 없음){"\n"}
        그 외 부양가족: 15% 공제 (연 700만원 한도)
      </GreenBox>

      <p style={body}>
        연봉 5,000만원 직장인이 가족 의료비 500만원을 썼다면, 총급여 3%인 150만원을 넘는 350만원의 15%인 52만 5천원을 돌려받아요.
      </p>

      <CategoryButton label="연말정산 정보" count={12} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>누구 의료비까지 합산할 수 있나요?</H2>
      <p style={body}>
        의료비 공제의 가장 큰 장점은 부양가족 소득·나이 제한이 없다는 점이에요.
      </p>

      <BorderBox>
        <strong>공제 가능 부양가족</strong><br />
        배우자: 소득·나이 무관{"\n"}
        부모님·조부모님: 따로 살아도 실제 부양하면 OK{"\n"}
        자녀·손자녀: 성인 자녀도 가능{"\n"}
        형제자매: 생계를 같이하는 경우{"\n\n"}
        <strong>핵심</strong>: 인적공제(기본공제)를 못 받는 부양가족이라도 의료비는 합산 가능
      </BorderBox>

      <p style={body}>
        다만 실제로 본인이 부담한 의료비여야 해요. 본인 명의 카드나 현금영수증으로 결제한 게 증빙이 되죠.
      </p>

      <Divider />

      <H2>맞벌이 부부, 누가 공제받는 게 유리할까?</H2>
      <p style={body}>
        의료비 공제는 총급여 3% 초과분부터 시작되니까, 소득이 낮은 쪽에서 몰아서 받는 게 유리해요.
      </p>

      <GreenBox>
        남편 연봉 7,000만원 → 3% = 210만원 초과해야 공제 시작{"\n"}
        아내 연봉 3,000만원 → 3% = 90만원 초과해야 공제 시작{"\n"}
        같은 가족 의료비 300만원이면:{"\n"}
        남편 기준: 300-210 = 90만원 × 15% = 13.5만원 환급{"\n"}
        아내 기준: 300-90 = 210만원 × 15% = 31.5만원 환급
      </GreenBox>

      <p style={body}>
        아내가 받으면 18만원 더 돌려받아요. 자녀 의료비도 부부 중 한 쪽에만 합산할 수 있으니, 미리 한 사람 카드로 결제하는 게 좋아요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>연말정산 전 이것만 챙기세요</H2>
      <p style={body}>
        간소화서비스에서 대부분 자동 조회되지만, 빠지는 항목이 있어요.
      </p>

      <SectionBadge>사전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>의료비 공제 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>실제로 많이 헷갈리는 것만 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 연말정산) 기준 소득세법 제59조의4를 바탕으로 작성했어요. 공제율·한도는 세법 개정에 따라 변경될 수 있으니 홈택스에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
