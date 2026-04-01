"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 5세대 실손보험 자기부담금이 얼마인지, 4세대보다 얼마나 올랐는지 궁금한 상황. 가입 전 비교하거나 전환 고민 중.
// Q2. 비급여 50% 부담 구조를 이해하고, 4세대 대비 불리한 점·유리한 점을 파악해서 가입/전환 여부를 판단하는 행동.
// Q3. 비급여 50%, 급여 입원 20%, 급여 외래 건보 연동, 중증 30%, 중증 입원 연간 500만원 상한, 4세대 비급여 30%.
// Q4. GreenBox(핵심 부담률) + 표(4세대 vs 5세대 비교) + BorderBox(계산 예시) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "5세대 실손 자기부담률이 4세대보다 더 높나요?", a: "네, 비급여 자기부담률이 30%에서 50%로 올라서 본인 부담이 더 커졌어요. 급여 입원 20%는 동일하고요." },
  { q: "5세대 실손 자기부담 상한이 있나요?", a: "중증 질환(암·뇌혈관·심장) 입원만 연간 500만원 상한이에요. 비중증은 상한이 없어서 치료비에 비례해 부담이 늘어나요." },
  { q: "비급여 치료비 200만원이면 얼마나 내야 하나요?", a: "5세대는 100만원(50%), 4세대는 60만원(30%)이에요. 5세대가 40만원 더 부담돼요." },
  { q: "급여 외래 자기부담은 어떻게 계산하나요?", a: "건강보험 본인부담률과 연동돼요. 상급종합병원 외래(60%)를 이용하면 60%는 본인이 내고 40%만 실손으로 받아요." },
  { q: "5세대가 더 비싼데 가입할 이유가 있나요?", a: "보험료가 30~50% 저렴해요. 병원을 자주 안 가면 보험료 절약분이 자기부담 증가분보다 클 수 있어요." },
  { q: "중증 질환 비급여는 부담률이 다른가요?", a: "네, 암·뇌혈관·심장질환 비급여는 30%로 일반 비급여(50%)보다 낮아요. 중증 입원은 연간 500만원 상한도 적용돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융위원회 실손보험 개편안", url: "https://www.fsc.go.kr" },
      { label: "금융감독원 보험상품 비교공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "5세대-실손보험-가입-조건", title: "5세대 실손보험 가입 조건", description: "가입 자격, 나이 제한, 기존 실손 보유 시 가입 가능 여부를 정리했어요." },
  { slug: "예금자보호제도", title: "예금자보호제도 1억원 한도", description: "은행 예금 보호 한도가 1억원으로 올랐어요. 보호 대상 상품을 확인해봐요." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "연금저축으로 받을 수 있는 세액공제 한도를 확인해봐요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>보험 · 실손 · 자기부담금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        5세대 실손보험 자기부담금<br />
        비급여 50% 부담, 계산법과 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        5세대 실손보험으로 바뀌면서 자기부담금이 얼마나 늘었는지 궁금하죠.
        비급여 치료비의 50%를 본인이 내야 하는데, 4세대(30%)보다 20%p 올랐어요.
        구체적인 계산법과 4세대 대비 비교를 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>5세대 실손 자기부담률은 얼마인가요?</H2>
      <p style={body}>
        <a href="https://www.fsc.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융위원회</a> 발표 기준으로, 5세대 실손보험의 자기부담률은 항목별로 달라요.
        비급여가 가장 높고, 급여 외래는 건강보험과 연동돼요.
      </p>

      <GreenBox>
        · 비급여: 본인 부담 <strong>50%</strong><br />
        · 급여 입원: 본인 부담 <strong>20%</strong><br />
        · 급여 외래: 건강보험 본인부담률과 <strong>연동</strong><br />
        · 중증 질환(암·뇌혈관·심장) 비급여: <strong>30%</strong><br />
        · 중증 입원 상한: 연간 <strong>500만원</strong>
      </GreenBox>

      <Divider />

      <H2>4세대보다 얼마나 늘었나요?</H2>
      <p style={body}>
        비급여 자기부담률이 30%에서 50%로 올라간 게 가장 큰 차이예요.
        치료비가 클수록 부담 차이도 커지니까 구체적인 금액으로 비교해봤어요.
      </p>

      <SectionBadge>4세대 vs 5세대 자기부담 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>치료비</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>4세대 (30%)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>5세대 (50%)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>차이</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["비급여 50만원", "15만원", "25만원", "+10만원"],
              ["비급여 100만원", "30만원", "50만원", "+20만원"],
              ["비급여 200만원", "60만원", "100만원", "+40만원"],
              ["급여 입원 100만원", "20만원", "20만원", "동일"],
            ].map(([cost, gen4, gen5, diff], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{cost}</td>
                <td style={{ padding: "9px 12px" }}>{gen4}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{gen5}</td>
                <td style={{ padding: "9px 12px", color: "#ef4444" }}>{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        대신 5세대 보험료가 30~50% 저렴해요. 병원을 자주 안 가는 사람이라면 보험료 절약분이 자기부담 증가분보다 클 수 있어요.
        반대로 병원을 자주 가는 사람은 4세대가 유리할 수 있으니 본인 의료비 패턴을 따져봐야 해요.
      </p>

      <Divider />

      <H2>자기부담금 계산은 어떻게 하나요?</H2>
      <p style={body}>
        비급여는 치료비에 50%를 곱하면 본인 부담이에요. 여기에 공제금(외래 1~2만원, 입원 10~20만원)이 추가로 빠질 수 있어요.
      </p>

      <BorderBox>
        <strong>계산 예시</strong><br /><br />
        <strong>1) MRI 비급여 80만원</strong><br />
        80만원 x 50% = 40만원 본인 부담, 보험사 40만원 보상<br /><br />
        <strong>2) 급여 입원 100만원</strong><br />
        100만원 x 20% = 20만원 본인 부담, 보험사 80만원 보상<br /><br />
        <strong>3) 암 비급여 치료비 1,000만원 (중증)</strong><br />
        1,000만원 x 30% = 300만원 본인 부담 (500만원 상한 이내)
      </BorderBox>

      <p style={body}>
        중증 질환으로 상급종합병원이나 종합병원에 입원하면 연간 본인 부담 상한이 500만원이에요.
        암 치료비로 3,000만원이 나와도 본인은 최대 500만원만 내면 돼요.
        비중증 질환은 상한이 없으니 치료비가 많으면 부담도 계속 커져요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 금융위원회 발표 자료를 바탕으로 작성됐어요. 보험 상품별 세부 약관은 보험사마다 다를 수 있으니 가입 전 약관을 반드시 확인해봐요." />
    </ArticleLayout>
  );
}
