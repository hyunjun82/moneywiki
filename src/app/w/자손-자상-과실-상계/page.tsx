"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 교통사고가 났는데 내 과실이 있어서 보험금이 줄어든다는 얘기를 듣고, 자손과 자상 중 어떤 게 유리한지 확인하려는 상황
// Q2. 자손과 자상의 과실 상계 적용 차이를 이해하고, 보험 갱신 시 자상으로 변경할지 판단한다
// Q3. 자손 과실 비율 적용 구조, 자상 과실 무관 보상 원리, 상해 급수별 한도, 보상 항목 차이(치료비·위자료·휴업손해)
// Q4. 비교표(CompareTable 대체 GreenBox) + BorderBox(급수별 한도) + Steps(보험금 청구 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "사고 접수 후 보험사에 연락하세요",
    desc: "사고 발생 즉시 본인 보험사 콜센터에 접수해요. 자손과 자상 중 어떤 특약으로 청구할지 상담받을 수 있어요. 보통 과실이 큰 쪽은 자상이 유리하다고 안내해 줘요.",
  },
  {
    title: "병원 진료 후 진단서를 발급받으세요",
    desc: "정형외과, 신경외과 등 전문과에서 진단서를 받아요. 상해 급수가 여기서 결정돼요. 골절은 9~11급, 타박상이나 염좌는 12~14급으로 판정되는 경우가 많아요.",
  },
  {
    title: "보험금 청구서를 제출하세요",
    desc: "보험사 앱이나 팩스로 청구서, 진단서, 치료비 영수증을 제출해요. 자상은 치료비 외에 위자료와 휴업손해 서류도 함께 내야 해요. 소득증빙(급여명세서 등)을 준비하세요.",
  },
  {
    title: "보험사 심사 후 보험금을 수령해요",
    desc: "자손은 과실 비율을 적용해서 상해 급수 한도 내 금액이 나와요. 자상은 과실 비율 없이 실손 기준으로 계산돼요. 보통 접수 후 7~14일 내에 입금돼요.",
    tip: "보험금에 이의가 있으면 금융감독원 분쟁조정 신청 가능",
  },
];

const FAQS = [
  {
    q: "자손 자상 둘 다 가입할 수 있나요?",
    a: "안 돼요. 자손과 자상은 택1 특약이에요. 보험 가입 시 둘 중 하나만 선택해야 해요. 자상이 보장 범위가 넓은 대신 보험료가 연간 3~5만원 더 비싸요.",
  },
  {
    q: "과실 비율은 누가 결정하나요?",
    a: "손해보험협회 과실 인정 기준표를 기준으로 보험사가 판단해요. 신호 위반, 중앙선 침범, 후진 사고 등 유형마다 기본 비율이 정해져 있고, 과속이나 음주 같은 가중 사유가 있으면 과실이 더 커져요.",
  },
  {
    q: "자손에서 자상으로 바꿀 수 있나요?",
    a: "보험 갱신 시점에 변경할 수 있어요. 보험사 앱이나 고객센터에서 자상으로 변경 요청하면 돼요. 다음 보험 기간부터 적용되고, 현재 진행 중인 사고에는 소급 적용 안 돼요.",
  },
  {
    q: "단독사고에서 자손은 어떻게 보상되나요?",
    a: "단독사고는 내 과실이 100%예요. 자손은 치료비의 100%를 차감하니까 보상이 거의 없어요. 상해 급수에 따라 소액만 나오는 경우가 많아요. 자상이라면 과실 무관하게 전액 보상받을 수 있어요.",
  },
  {
    q: "자상은 실손보험과 중복 청구가 되나요?",
    a: "자상 보험금은 실손보험과 별개예요. 자상에서 치료비를 받고, 본인 부담분은 실손보험으로 추가 청구할 수 있어요. 이중 수령이 아니라 보장 항목이 다른 거예요.",
  },
  {
    q: "보험금에 불만이 있으면 어떻게 하나요?",
    a: "보험사에 이의를 제기하거나, 금융감독원(1332)에 분쟁 조정을 신청할 수 있어요. 손해보험협회에서도 분쟁 조정 서비스를 운영하고 있어요.",
  },
];

const SOURCES = [
  { name: "금융감독원 보험다모아", href: "https://fine.fss.or.kr" },
  { name: "손해보험협회", href: "https://www.knia.or.kr" },
];

const RELATED = [
  { slug: "자동차보험-자손-자상-차이", title: "자손 자상 차이", description: "자손과 자상의 기본 개념과 보장 범위 비교." },
  { slug: "자손-자상-선택-기준", title: "자손 자상 선택 기준", description: "운전 패턴별로 자손과 자상 중 유리한 걸 고르는 기준." },
  { slug: "자손-자상-보험료-차이", title: "자손 자상 보험료 차이", description: "보험료 차이와 보장 대비 비용 효율 비교." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>보험 · 자동차보험 · 과실 상계</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자손 자상, 과실 50%면 보험금이 절반?<br />
        과실 상계 적용 방식과 보상 차이
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        교통사고 났는데 내 과실이 50%래요. 보험금이 반으로 줄어드는 건가요?
      </p>
      <p style={body}>
        <strong>자손은 과실 비율만큼 보험금이 깎여요.</strong> 하지만 <strong>자상은 과실이 100%여도 전액 보상</strong>돼요.
        같은 사고인데 자손과 자상의 보험금 차이가 2~3배 나는 경우가 많아요.
        <a href="/w/자동차보험-자손-자상-차이" style={{ color: "#1D9E75", textDecoration: "underline" }}>자손 자상 차이</a>를 먼저 알아야 손해 안 봐요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>자손과 자상, 과실 적용이 어떻게 다를까?</H2>
      <p style={body}>
        핵심 차이는 딱 하나예요. <strong>과실 비율을 적용하느냐, 안 하느냐</strong>.
        자손(자기신체사고)은 내 과실만큼 치료비에서 빼고 남은 금액을 상해 급수 한도 내에서 줘요.
        자상(자동차상해)은 과실이 몇 %든 상관없이 가입 한도까지 치료비·위자료·휴업손해를 모두 보상해요.
      </p>

      <SectionBadge>자손 vs 자상 과실 적용 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>자손</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>자상</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["과실 상계", "적용 (내 과실만큼 차감)", "미적용 (과실 무관)"],
              ["보상 항목", "치료비만", "치료비 + 위자료 + 휴업손해"],
              ["보상 한도", "상해 급수별 한도", "가입 금액 한도"],
              ["보험료", "상대적으로 저렴", "연 3~5만원 추가"],
            ].map(([label, jasonVal, jasangVal], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{jasonVal}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{jasangVal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="보험 정보" count={8} href="/category/보험" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>과실 50% 사고, 보험금은 실제로 얼마나 차이 날까?</H2>
      <p style={body}>
        같은 사고로 치료비 500만원, 위자료 150만원, 휴업손해 200만원이 발생했다고 해볼게요.
        내 과실이 50%인 상호과실 사고예요.
      </p>

      <GreenBox>
        자손 (9급 상해, 한도 240만원){"\n"}
        치료비 500만원 x (100% - 과실 50%) = 250만원{"\n"}
        → 9급 한도 240만원과 비교 → 240만원 수령{"\n"}
        위자료·휴업손해는 보장 안 됨{"\n\n"}

        자상 (3,000만원 가입){"\n"}
        치료비 500만 + 위자료 150만 + 휴업손해 200만 = 850만원{"\n"}
        → 과실 무관, 전액 수령{"\n\n"}

        차이: 610만원 (자상이 3.5배 더 받아요)
      </GreenBox>

      <p style={body}>
        보험료 차이는 연간 3~5만원 정도인데, 사고 한 번에 수백만원 차이가 나요.
        특히 골절이나 인대파열 같은 큰 부상에서 격차가 더 커져요.
        <a href="/w/자손-자상-보험료-차이" style={{ color: "#1D9E75", textDecoration: "underline" }}>보험료 차이</a>를 감안해도 자상이 유리한 경우가 많아요.
      </p>

      <Divider />

      <H2>자손 상해 급수별 보상 한도는 어떻게 되나요?</H2>
      <p style={body}>
        자손은 치료비에서 과실을 빼고, 그 금액과 상해 급수 한도 중 작은 쪽을 받아요.
        급수는 의사 진단서를 기준으로 보험사가 판단해요.
      </p>

      <BorderBox>
        <strong>자손 상해 급수별 한도 (주요 구간)</strong>{"\n"}
        · 1급: 최대 3,000만원 (중증 후유장해){"\n"}
        · 5급: 최대 900만원{"\n"}
        · 9급: 최대 240만원 (골절 등){"\n"}
        · 12급: 최대 80만원 (인대 손상){"\n"}
        · 14급: 최대 50만원 (타박상, 염좌)
      </BorderBox>

      <p style={body}>
        타박상으로 치료비 100만원이 나왔는데 14급 판정이면, 과실 차감 후 금액과 50만원 중 작은 쪽을 받게 돼요.
        <a href="https://www.knia.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>손해보험협회</a>에서 급수별 상세 기준을 확인할 수 있어요.
      </p>

      <Divider />

      <H2>보험금 청구는 이렇게 진행돼요</H2>
      <p style={body}>
        사고 후 보험금을 받기까지의 절차를 단계별로 정리했어요.
        자상은 위자료와 휴업손해 서류가 추가로 필요하다는 점만 다르고, 나머지 절차는 비슷해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 일반적인 보험 정보를 제공하며, 개별 보험 상품의 약관에 따라 보상 내용이 달라질 수 있어요. 정확한 보장 내용은 본인의 보험 약관을 확인하세요." />
    </ArticleLayout>
  );
}
