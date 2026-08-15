"use client";
// Q1. 올해 병원비가 많이 나왔는데 연말정산에서 얼마나 돌려받을 수 있는지 궁금한 직장인
// Q2. 내 의료비가 공제 대상인지 확인하고, 총급여 3% 초과분의 15% 환급액을 계산한다
// Q3. 3% 초과분부터 공제, 본인·장애인 한도 없음, 난임 30%, 실손보험 차감, 간소화서비스 누락 항목
// Q4. GreenBox(핵심 구조) + BorderBox(계산 예시) + Checklist(공제 대상 정리) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "본인 의료비 영수증 (한도 없음, 전액 공제)",
  "부양가족 의료비 영수증 (연 700만원 한도)",
  "안경·콘택트렌즈 구입비 (1인당 50만원 한도)",
  "보청기·휠체어 등 장애인 보장구 (한도 없음)",
  "산후조리원 비용 (총급여 7,000만원 이하, 200만원 한도)",
  "난임시술비 영수증 (30% 공제율, 한도 없음)",
  "실손보험 보전받은 금액은 차감했는지 확인",
];

const FAQS = [
  {
    q: "부모님 의료비도 내가 공제받을 수 있나요?",
    a: "네. 의료비 공제는 나이·소득 제한이 없어요. 부모님이 60세 미만이거나 소득이 있어도 내가 돈을 냈으면 공제받을 수 있어요. 다른 공제 항목은 소득 100만원 이하 조건이 있지만 의료비는 특별히 예외예요.",
  },
  {
    q: "실손보험으로 돌려받은 금액은 어떻게 되나요?",
    a: "실손보험으로 보전받은 금액은 의료비에서 빼고 계산해요. 병원비 100만원 중 실손으로 70만원 받았다면 30만원만 공제 대상이에요. 간소화서비스에서 자동으로 차감되는 경우가 많지만 직접 확인하는 게 좋아요.",
  },
  {
    q: "치과 임플란트도 공제되나요?",
    a: "네, 치료 목적 임플란트는 공제돼요. 미용 목적인 치아 교정은 원칙적으로 안 되지만, 저작기능장애 진단서가 있으면 공제 가능해요.",
  },
  {
    q: "의료비가 총급여 3% 안 넘으면 아예 못 받나요?",
    a: "맞아요. 3%를 넘는 금액부터 공제가 시작돼요. 연봉 5,000만원이면 150만원 넘는 의료비부터예요. 가족 의료비를 합산하면 3%를 넘기기 쉬워지니까 한 사람에게 몰아서 공제받는 게 유리해요.",
  },
  {
    q: "간소화서비스에 안 나오는 의료비가 있나요?",
    a: "안경·콘택트렌즈 구입비, 보청기, 일부 한의원 비용은 간소화서비스에 안 잡히는 경우가 많아요. 영수증을 직접 챙겨서 회사에 제출하거나 홈택스에 등록해야 해요.",
  },
  {
    q: "맞벌이 부부는 누가 의료비 공제를 받는 게 유리해요?",
    a: "총급여가 낮은 쪽이 유리해요. 3% 문턱이 낮아지니까 더 많은 금액이 공제 대상이 되거든요. 연봉 3,000만원이면 90만원 넘으면 되지만, 7,000만원이면 210만원을 넘어야 시작돼요.",
  },
];

const SOURCES = [
  { name: "국세청 의료비 세액공제", href: "https://www.nts.go.kr" },
  { name: "소득세법 제59조의4", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스 간소화서비스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-임플란트", title: "임플란트 연말정산 공제 방법", description: "치료 목적 임플란트의 의료비 공제 조건." },
  { slug: "연말정산-의료비-공제한도", title: "의료비 공제 한도 상세 안내", description: "본인·부양가족·장애인별 한도 차이." },
  { slug: "연말정산", title: "연말정산 가이드", description: "소득공제와 세액공제 전체 구조 이해하기." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 의료비 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        병원비 많이 썼는데, 얼마나 돌려받을까?<br />
        의료비 세액공제 조건과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        올해 병원에 많이 다녀서 의료비가 꽤 나왔다고요?
      </p>
      <p style={body}>
        총급여의 <strong>3%를 넘는 의료비</strong>에 대해 <strong>15%</strong>를 세금에서 빼줘요.
        연봉 5,000만원에 의료비 500만원이면 약 <strong>52만원</strong> 돌려받아요.
        본인 의료비는 <strong>한도 없이 전액 공제</strong>되고, 난임시술은 공제율이 <strong>30%</strong>까지 올라가요.
        지금 내 의료비가 공제 대상인지, 정확히 얼마를 돌려받는지 계산해 볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>의료비 세액공제, 핵심 구조부터 볼게요</H2>
      <p style={body}>
        의료비 세액공제는 구조가 단순해요. <strong>총급여 3%를 넘는 금액</strong>에 공제율을 곱하면 끝이에요.
        3% 미만은 공제가 안 되니까 이 문턱을 넘느냐가 핵심이에요.
      </p>

      <SectionBadge>의료비 세액공제 구조</SectionBadge>
      <GreenBox>
        공제 대상 = (의료비 지출 - 총급여 × 3%) × 공제율{"\n\n"}
        · 일반 의료비: 15% (연 700만원 한도){"\n"}
        · 본인·장애인·65세 이상: 15% (한도 없음){"\n"}
        · 난임시술: 30% (한도 없음){"\n"}
        · 미숙아·선천성이상아: 20% (한도 없음)
      </GreenBox>

      <p style={body}>
        본인 의료비와 난임시술비에 한도가 없다는 게 포인트예요. 큰 수술이나 난임치료를 한 해에는 환급액이 크게 늘어나요.
        그럼 실제 금액으로 계산해 볼게요.
      </p>

      <CategoryButton label="연말정산 가이드" count={30} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>내 의료비로 얼마 돌려받는지 계산해 봐요</H2>
      <p style={body}>
        연봉과 의료비 금액에 따라 환급액이 달라져요. 몇 가지 시나리오로 보여드릴게요.
      </p>

      <SectionBadge>계산 예시</SectionBadge>
      <BorderBox>
        <strong>예시 1: 연봉 5,000만원, 의료비 500만원</strong>{"\n"}
        · 3% 문턱: 5,000만 × 3% = 150만원{"\n"}
        · 공제 대상: 500만 - 150만 = 350만원{"\n"}
        · 환급: 350만 × 15% = <strong>52.5만원</strong>{"\n\n"}
        <strong>예시 2: 연봉 3,000만원, 본인 수술비 300만원</strong>{"\n"}
        · 3% 문턱: 3,000만 × 3% = 90만원{"\n"}
        · 공제 대상: 300만 - 90만 = 210만원{"\n"}
        · 환급: 210만 × 15% = <strong>31.5만원</strong> (본인이라 한도 없음){"\n\n"}
        <strong>예시 3: 연봉 4,000만원, 난임시술 800만원</strong>{"\n"}
        · 3% 문턱: 4,000만 × 3% = 120만원{"\n"}
        · 공제 대상: 800만 - 120만 = 680만원{"\n"}
        · 환급: 680만 × 30% = <strong>204만원</strong>
      </BorderBox>

      <p style={body}>
        난임시술은 공제율이 30%라 환급액이 확 커져요. 올해 난임치료를 받았다면 영수증을 반드시 챙기세요.
        그런데 누구 의료비까지 내가 공제받을 수 있는지도 중요하죠.
      </p>

      <Divider />

      <H2>가족 의료비도 내가 공제받을 수 있나요?</H2>
      <p style={body}>
        의료비 세액공제만의 특별한 규정이 하나 있어요. <strong>나이·소득 제한이 없어요.</strong>
        다른 공제는 부양가족 소득이 100만원 이하여야 하지만, 의료비는 내가 돈을 냈으면 가족 소득과 관계없이 공제돼요.
      </p>

      <SectionBadge>대상별 공제 한도</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대상</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제율</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>한도</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>조건</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["본인", "15%", "한도 없음", "나이·소득 무관"],
              ["장애인", "15%", "한도 없음", "나이·소득 무관"],
              ["65세 이상", "15%", "한도 없음", "나이·소득 무관"],
              ["부양가족 (일반)", "15%", "700만원", "나이·소득 무관"],
              ["난임시술", "30%", "한도 없음", "본인 또는 배우자"],
              ["미숙아·선천성이상아", "20%", "한도 없음", "해당 자녀"],
            ].map(([target, rate, limit, cond], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{target}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{limit}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{cond}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        <strong>돈을 낸 사람</strong>이 공제받아요. 형이 부모님 병원비를 냈는데 내가 공제받으면 안 돼요.
        맞벌이 부부라면 총급여가 낮은 쪽에 몰아주는 게 유리하죠.
      </p>

      <Divider />

      <H2>놓치기 쉬운 항목, 미리 챙기세요</H2>
      <p style={body}>
        간소화서비스에 자동으로 안 잡히는 항목들이 꽤 있어요. 특히 안경 구입비와 보청기는 직접 영수증을 챙겨야 해요.
        실손보험 보전금액도 빠뜨리면 나중에 추징당할 수 있으니 꼼꼼히 확인하세요.
      </p>

      <SectionBadge>의료비 공제 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        의료비 세액공제에서 실제로 헷갈리는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 의료비 공제 한도와 공제율은 세법 개정에 따라 달라질 수 있으니 최신 기준은 국세청 홈택스에서 확인해 주세요." />
    </ArticleLayout>
  );
}
