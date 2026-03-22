"use client";

// Q1. 아파트 청약에서 특별공급이 뭔지, 내가 해당되는 유형이 있는지 알고 싶은 무주택 세대.
// Q2. 특별공급 유형별 자격 조건을 파악하고, 본인에 맞는 유형으로 청약홈에서 신청하는 행동.
// Q3. 5개 유형(신혼부부·생애최초·다자녀·노부모·기관추천) 자격·소득 기준·비율, 세대당 1회 제한, 공공/민간 차이, 2026년 변경사항(맞벌이 소득 완화·미혼 생애최초 허용).
// Q4. EligibilityChecker(유형 판단) + BorderBox(유형별 비교표) + GreenBox(2026 변경사항) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "house", label: "무주택 세대구성원" },
  { id: "savings", label: "청약통장 가입 (6개월~2년 이상, 유형별 상이)" },
  { id: "income", label: "도시근로자 월평균 소득 기준 충족 (유형별 상이)" },
  { id: "first", label: "특별공급 당첨 이력 없음 (세대당 평생 1회)" },
];

const APPLY_STEPS = [
  { title: "청약통장 확인", desc: "가입 기간과 납입 횟수가 유형별 기준을 충족하는지 확인해요. 신혼부부는 6개월, 생애최초는 2년 이상이에요." },
  { title: "자격·소득 기준 확인", desc: "모집공고문에서 본인 유형의 소득·자산 기준을 확인해요. 공공분양과 민간분양 기준이 달라요." },
  { title: "청약홈에서 신청", desc: "청약홈(applyhome.co.kr) 또는 모바일 앱에서 해당 특별공급 유형으로 청약 신청해요." },
  { title: "당첨자 발표 후 서류 제출", desc: "당첨되면 주민등록등본, 가족관계증명서, 소득증빙, 혼인관계증명서 등을 기한 내 제출해요.", tip: "서류 미제출 시 당첨 취소" },
];

const FAQS = [
  { q: "특별공급은 몇 번까지 가능해요?", a: "세대당 평생 1회만 당첨 가능해요. 한 번 당첨되면 그 세대 구성원 전원이 특별공급 신청이 불가해요. 이후에는 일반공급만 가능하죠." },
  { q: "미혼도 특별공급 신청 가능해요?", a: "생애최초 특별공급은 미혼 1인가구도 가능해요 (전용 60㎡ 이하). 신혼부부·다자녀는 기혼자만 가능해요." },
  { q: "소득 초과하면 아예 방법이 없나요?", a: "민간분양 다자녀는 소득 제한이 없어요. 일반공급도 소득 제한 없는 경우가 많으니 확인해보세요." },
  { q: "공공분양과 민간분양 차이가 뭔가요?", a: "공공분양은 자산(부동산·자동차) 기준이 있고 소득 기준이 엄격해요. 민간분양은 자산 기준이 없고 소득 기준이 느슨한 편이에요." },
  { q: "부적격 당첨되면 어떻게 되나요?", a: "당첨이 취소되고, 허위 기재 시 10년간 청약 신청이 제한돼요. 자격 조건을 꼼꼼히 확인하세요." },
  { q: "특별공급 떨어지면 예비입주자가 되나요?", a: "네. 낙첨자 중에서 예비입주자를 선정해요. 정당첨자가 포기하면 순번대로 기회가 와요." },
  { q: "출산가구는 2회 당첨 가능하다고요?", a: "맞아요. 2025년 개편으로 출산가구는 특별공급 최대 2회까지 당첨 기회가 있어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "주택공급에 관한 규칙(법제처)", url: "https://www.law.go.kr/법령/주택공급에관한규칙" },
      { label: "한국부동산원 청약홈", url: "https://www.applyhome.co.kr" },
    ],
  },
];

const RELATED = [
  { slug: "특별공급-예비입주자-선정-당첨절차", title: "특별공급 예비입주자 당첨 절차", description: "예비입주자로 선정됐을 때 당첨까지의 과정이에요." },
  { slug: "청약-가점제-계산", title: "청약 가점 계산", description: "가점 항목별 점수 계산법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 청약 · 특별공급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        특별공급, 나도 해당될까?
        <br />
        <span style={{ fontSize: 18, fontWeight: 500, color: "#555" }}>
          유형별 자격 조건과 신청 방법
        </span>
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일반공급 경쟁률이 너무 높아서 당첨이 막막하죠.
        특별공급은 정책 대상자에게 별도 물량을 우선 배정하는 제도예요.
        신혼부부, 생애최초, 다자녀, 노부모부양, 기관추천 5가지 유형이 있고, 내 조건에 맞으면 경쟁률이 훨씬 낮아요.
      </p>

      <Divider />

      <H2>특별공급 기본 자격부터 체크해보세요</H2>
      <p style={body}>
        유형마다 세부 조건은 다르지만, 공통으로 충족해야 할 기본 자격이 있어요.
      </p>
      <SectionBadge>공통 자격 확인</SectionBadge>
      <EligibilityChecker items={ELIG_ITEMS} />

      <Divider />

      <H2>5개 유형별 조건은 어떻게 다른가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택공급에관한규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택공급에 관한 규칙</a>에서
        유형별 자격과 배정 비율을 정하고 있어요.
      </p>
      <SectionBadge>유형별 비교표</SectionBadge>
      <BorderBox title="특별공급 5개 유형 비교">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, lineHeight: 1.8, minWidth: 520 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #1D9E75" }}>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>유형</th>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>핵심 자격</th>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>소득 기준</th>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>비율(공공)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>신혼부부</td>
                <td style={{ padding: "8px 4px" }}>혼인 7년 이내</td>
                <td style={{ padding: "8px 4px" }}>100~140%</td>
                <td style={{ padding: "8px 4px", fontWeight: 600, color: "#1D9E75" }}>30%</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>생애최초</td>
                <td style={{ padding: "8px 4px" }}>주택 소유 이력 0</td>
                <td style={{ padding: "8px 4px" }}>100~160%</td>
                <td style={{ padding: "8px 4px" }}>25%</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>다자녀</td>
                <td style={{ padding: "8px 4px" }}>미성년 자녀 3명+</td>
                <td style={{ padding: "8px 4px" }}>공공 120%, 민간 없음</td>
                <td style={{ padding: "8px 4px" }}>10%</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>노부모부양</td>
                <td style={{ padding: "8px 4px" }}>65세↑ 부모 3년+ 동거</td>
                <td style={{ padding: "8px 4px" }}>제한 없음</td>
                <td style={{ padding: "8px 4px" }}>3%</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>기관추천</td>
                <td style={{ padding: "8px 4px" }}>국가유공자·장애인 등</td>
                <td style={{ padding: "8px 4px" }}>기관별 상이</td>
                <td style={{ padding: "8px 4px" }}>10%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </BorderBox>

      <Divider />

      <H2>2026년에 달라진 점은?</H2>
      <p style={body}>
        청약 제도가 개편되면서 특별공급 문턱이 낮아진 부분이 있어요.
      </p>
      <GreenBox title="2026년 주요 변경사항">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.2 }}>
          <li><strong>맞벌이 소득 기준 완화</strong>: 연 1.2억 → 1.6억원으로 상향</li>
          <li><strong>미혼 생애최초 허용</strong>: 미혼 1인가구도 생애최초 특별공급 신청 가능 (60㎡ 이하)</li>
          <li><strong>부부 중복 청약 허용</strong>: 같은 단지에 부부가 각각 청약 가능</li>
          <li><strong>출산가구 2회 기회</strong>: 출산가구는 특별공급 최대 2회 당첨 가능</li>
          <li><strong>무주택 요건 완화</strong>: 과거 주택 보유했어도 현재 무주택이면 신청 가능</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        <a href="https://www.applyhome.co.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>청약홈</a>에서 온라인 신청해요.
      </p>
      <SectionBadge>신청 4단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <ArticleAd />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <RelatedArticles items={RELATED} />

      <Disclaimer text="이 글은 2026년 3월 기준 주택공급에 관한 규칙을 바탕으로 작성했어요. 단지별 모집공고문에서 세부 조건이 달라질 수 있으니 반드시 공고문을 확인하세요." />
    </ArticleLayout>
  );
}
