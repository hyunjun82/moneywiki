"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 미혼 청년인데 집값이 부담돼서 공공분양 특별공급에 내가 해당되는지 자격 조건을 알고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인이 자격 조건에 맞는지 확인하고, LH청약플러스에서 청약 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 나이(19~39세), 무주택+과거 소유이력 없음, 소득 140% 이하, 자산 2.88억 이하, 청약통장 6개월+6회 납입, 60㎡ 이하, 평생 1회 제한.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → EligibilityChecker(자격 확인) + GreenBox(핵심 조건 요약) + Steps(신청 절차) + BorderBox(소득·자산 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "청약통장이 꼭 있어야 하나요?",
    a: "네. 주택청약종합저축에 가입 후 6개월 경과 + 6회 이상 납입해야 해요. 통장 없이는 신청 자체가 안 돼요.",
  },
  {
    q: "이혼한 사람도 미혼청년으로 신청 가능한가요?",
    a: "가능해요. '혼인 중이 아닌 상태'면 되기 때문에 이혼·사별한 경우도 현재 미혼이면 신청할 수 있어요.",
  },
  {
    q: "과거에 분양권 가졌다 팔았어도 안 되나요?",
    a: "안 돼요. 분양권·입주권도 주택 소유 이력으로 봐요. 과거에 한 번이라도 소유했으면 자격이 없어요.",
  },
  {
    q: "소득 기준 140%가 구체적으로 얼마예요?",
    a: "1인 가구 기준 약 470만 원(세전 월평균)이에요. 매년 바뀌니 공고문에서 정확한 금액을 확인하세요.",
  },
  {
    q: "우선공급이랑 잔여공급은 뭐가 다른가요?",
    a: "우선공급은 5년 이상 소득세 납부한 근로자·자영업자 대상(30% 배정)이에요. 나머지는 잔여공급으로 전체 자격자가 경쟁해요.",
  },
  {
    q: "당첨되면 평생 1회 제한인가요?",
    a: "네. 미혼청년특공은 1세대당 평생 1회예요. 신중하게 단지를 골라서 청약하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "공공주택 특별법(법제처)", url: "https://www.law.go.kr/법령/공공주택특별법" },
      { label: "LH청약플러스", url: "https://apply.lh.or.kr" },
      { label: "찾기쉬운 생활법령정보 — 미혼청년 특별공급", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1773&ccfNo=2&cciNo=1&cnpClsNo=5" },
    ],
  },
];

const RELATED = [
  { slug: "청약저축-청약예금-전환-방법-조건", title: "청약저축 전환 방법", description: "청약통장 종류별 차이와 전환 방법을 확인하세요." },
  { slug: "국민임대주택-전용면적-70제곱미터-입주자격", title: "국민임대주택 입주 자격", description: "공공분양 외에 임대주택도 고려해보세요." },
  { slug: "5세대-실손보험-가입-조건", title: "5세대 실손보험 가입 조건", description: "내 집 마련과 함께 보험 점검도 해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 청약 · 특별공급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        미혼청년 공공분양 특별공급, 나도 되나요?<br />
        자격 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        미혼이고 집값이 부담되시죠? 정부가 결혼하지 않은 청년도 내 집 마련할 수 있도록 공공분양 특별공급을 만들었어요.
        19~39세 무주택 미혼이면 신청할 수 있는데, 소득·자산·청약통장 조건이 맞아야 해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>내가 자격이 되는지 확인해보세요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/공공주택특별법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공공주택 특별법</a>에서 정한 조건이에요.
        아래 항목을 하나라도 충족 못 하면 신청할 수 없어요.
      </p>

      <EligibilityChecker
        items={[
          { id: "e1", label: "만 19세 이상 39세 이하" },
          { id: "e2", label: "현재 혼인 중이 아님 (미혼·이혼·사별)" },
          { id: "e3", label: "과거 주택 소유 이력 없음 (분양권·입주권 포함)" },
          { id: "e4", label: "청약통장 6개월 경과 + 6회 이상 납입" },
          { id: "e5", label: "월평균 소득 도시근로자 140% 이하 (1인 약 470만 원)" },
          { id: "e6", label: "본인 자산 2억 8,900만 원 이하" },
        ]}
        allMatchText="축하드려요! 미혼청년 특별공급 자격 조건을 충족해요. LH청약플러스에서 공고를 확인하세요."
        partialMatchText="일부 조건이 맞지 않아요. 체크 안 된 항목을 확인해주세요."
      />

      <Divider />

      <H2>소득과 자산 기준이 구체적으로 얼마예요?</H2>
      <p style={body}>
        소득은 세전 총급여 기준이에요. 근로소득·사업소득·기타소득을 모두 합산해요.
      </p>

      <SectionBadge>2026년 기준</SectionBadge>
      <BorderBox title="소득·자산 기준">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#f0faf6" }}>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>기준</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["월평균 소득 (1인 가구)", "도시근로자 월평균소득 140% 이하 (약 470만 원)"],
                ["본인 자산", "2억 8,900만 원 이하"],
                ["부모 자산", "10억 8,300만 원 이하"],
                ["자동차", "3,683만 원 이하"],
              ].map(([label, value], i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ padding: "8px 10px", fontWeight: 600, fontSize: 13 }}>{label}</td>
                  <td style={{ padding: "8px 10px", fontSize: 13 }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BorderBox>

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        입주자 모집공고가 나오면 <a href="https://apply.lh.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>LH청약플러스</a>나 청약홈에서 온라인 신청해요.
      </p>

      <Steps steps={[
        { title: "모집공고 확인", desc: "LH청약플러스에서 미혼청년 특별공급 공고를 찾으세요.", tip: "알림 설정해두면 공고 나올 때 바로 알 수 있어요." },
        { title: "자격 요건 재확인", desc: "공고문에 적힌 소득·자산 기준이 매년 달라질 수 있어요." },
        { title: "온라인 청약 신청", desc: "공고에 명시된 기간 내에 LH청약플러스에서 신청하세요." },
        { title: "서류 제출", desc: "주민등록등본, 소득증빙, 자산증빙, 가족관계증명서 등을 준비하세요.", tip: "공고마다 서류가 다를 수 있으니 꼼꼼히 읽으세요." },
        { title: "당첨 확인·계약", desc: "당첨 시 계약금(분양가 10%)을 내고 정식 계약해요.", tip: "계약금 목돈이 필요하니 미리 준비하세요." },
      ]} />

      <Divider />

      <H2>신청 전 꼭 알아야 할 것들</H2>

      <GreenBox title="주의사항 3가지">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li><strong>전용면적 60㎡ 이하만</strong> 신청 가능 — 60㎡ 초과 평형에 넣으면 부적격 처리</li>
          <li><strong>평생 1회 제한</strong> — 한 번 당첨되면 다시 미혼청년특공 쓸 수 없음</li>
          <li><strong>부모 자산도 확인</strong> — 본인뿐 아니라 부모 자산 10억 8,300만 원 이하여야 함</li>
        </ul>
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 공공주택 특별법을 바탕으로 작성됐어요. 구체적인 기준은 입주자 모집공고에서 확인하세요." />
    </ArticleLayout>
  );
}
