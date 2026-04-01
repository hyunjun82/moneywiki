"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 무보험 차량이나 뺑소니 사고를 당했을 때 보상받을 수 있는지, 이 특약을 가입해야 하는지 궁금한 상황
// Q2. 무보험차 상해 특약의 보장 내용을 이해하고, 자동차보험 갱신 시 가입 또는 한도를 확인한다
// Q3. 보장 범위(무보험·뺑소니·전동킥보드), 한도 2억, 보험료 1만원 미만, 가족 범위, 구상권 구조
// Q4. GreenBox(핵심 요약) + 비교표(보장 범위) + Checklist(가입 확인) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "내 자동차보험에 '무보험차 상해' 담보가 포함돼 있는지 확인",
  "보장 한도가 2억원으로 설정돼 있는지 (1억→2억 변경 권장)",
  "가족 범위: 본인 + 배우자 + 부모 + 자녀 + 배우자 부모",
  "전동킥보드·자전거 사고도 보장 대상인지 약관 확인",
  "보험 갱신 시 자동 해지되지 않았는지 매년 체크",
];

const FAQS = [
  {
    q: "무보험차 상해 특약 보험료가 비싸지 않나요?",
    a: "연간 1만원도 안 돼요. 보장 한도를 최대 2억원으로 설정해도 보험료 부담이 거의 없어요. 보험사가 가해자에게 구상권(배상액 회수)을 행사하는 구조라서 보험료가 저렴한 거예요.",
  },
  {
    q: "가족도 보장되나요? 다른 차를 타고 있을 때도요?",
    a: "개인용 자동차보험 기준으로 본인, 배우자, 부모, 자녀, 배우자의 부모까지 보장돼요. 다른 차를 타고 있을 때, 보행 중, 자전거를 탈 때도 보장이 돼요.",
  },
  {
    q: "뺑소니 사고도 이 특약으로 보상받나요?",
    a: "네. 뺑소니 차량은 '보험 가입 여부를 확인할 수 없는 차량'으로 분류돼서 무보험차 상해 특약으로 보상받아요. 가해 차량을 못 찾아도 보상이 가능해요.",
  },
  {
    q: "전동킥보드에 치여도 보장되나요?",
    a: "보장돼요. 전동킥보드는 자동차관리법상 이륜자동차로 분류되는데, 대부분 보험 미가입 상태예요. 전동킥보드 사고 시 가해자가 무보험이면 이 특약으로 보상받을 수 있어요.",
  },
  {
    q: "상대방이 책임보험(의무보험)만 있으면 어떻게 되나요?",
    a: "책임보험만 가입한 차량도 무보험차로 분류돼요. 책임보험의 대인배상 한도는 사망 1.5억, 부상 3,000만원인데, 이를 초과하는 손해를 무보험차 상해 특약에서 보상해 줘요.",
  },
  {
    q: "사고 나면 어떻게 청구하나요?",
    a: "본인 자동차보험 회사에 전화해서 무보험차 상해 특약으로 접수하면 돼요. 사고 증명서류(경찰 사고접수확인서, 진단서)를 제출하면 보험사에서 심사 후 보상해요. 보험사가 이후 가해자에게 구상권을 행사해요.",
  },
];

const RELATED = [
  { slug: "자동차보험-가입", title: "자동차보험 가입 방법", description: "보험 가입 시 알아야 할 핵심 사항." },
  { slug: "자동차보험-특약", title: "자동차보험 특약 종류", description: "어떤 특약을 넣어야 하는지 정리." },
  { slug: "교통사고-합의금", title: "교통사고 합의금 기준", description: "사고 시 합의금 산정 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 자동차보험 · 특약</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        무보험 차에 치이면 어떡하나요?<br />
        무보험차 상해 특약 보장 범위와 가입법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        상대 차량이 보험이 없거나, 뺑소니를 당했을 때 병원비는 누가 내주나요?
      </p>
      <p style={body}>
        무보험차 상해 특약을 가입해 두면 <strong>최대 2억원</strong>까지 보상받을 수 있어요.
        보험료는 연간 <strong>1만원도 안 들고</strong>, 본인뿐 아니라 가족까지 보장돼요.
        전동킥보드 사고나 뺑소니도 포함이에요. 자동차보험 갱신할 때 꼭 확인해야 하는 특약이에요.
      </p>

      <Divider />

      <H2>어떤 사고에서 보장받을 수 있나요?</H2>
      <p style={body}>
        무보험차 상해 특약은 단순히 &quot;보험 없는 차&quot;만 해당하는 게 아니에요.
        책임보험(의무보험)만 가입한 차, 뺑소니 차, 전동킥보드까지 범위가 넓어요. 아래 표에서 보장 여부를 살펴보세요.
      </p>

      <SectionBadge>보장 대상 범위</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>사고 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>보장 여부</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>설명</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["보험 미가입 차량 사고", "O", "아예 보험이 없는 차"],
              ["책임보험(의무보험)만 있는 차", "O", "종합보험 미가입, 한도 초과분 보상"],
              ["뺑소니 (가해차 미확인)", "O", "차량 못 찾아도 보상 가능"],
              ["전동킥보드·이륜차 사고", "O", "대부분 보험 미가입 상태"],
              ["도난 차량에 의한 사고", "O", "무보험 차량으로 분류"],
              ["음주운전 차량 사고", "X", "가해자 종합보험에서 먼저 보상"],
            ].map(([type, covered, desc], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{type}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: covered === "O" ? "#1D9E75" : "#dc2626" }}>{covered}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280", fontSize: 13 }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        보험료가 저렴한 이유: 보험사가 피해자에게 보상한 후 가해자에게 구상권을 행사해서 배상액을 회수하는 구조예요. 보험사 입장에서 실질 손실이 적으니까 보험료도 저렴한 거예요.
      </GreenBox>

      <CategoryButton label="자동차보험 정보" count={5} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>내 보험에 이 특약이 있나요?</H2>
      <p style={body}>
        자동차보험 증권을 열어서 &quot;무보험차상해&quot; 항목이 있는지 찾아보세요.
        없으면 보험사에 전화해서 추가하면 돼요. 보장 한도는 <strong>2억원</strong>으로 설정하는 게 좋아요. 1억에서 2억으로 올려도 보험료 차이가 거의 없거든요.
      </p>

      <Checklist items={CHECKLIST_ITEMS} />

      <BorderBox>
        <strong>보장 대상 가족 범위 (개인용 기준)</strong>{"\n"}
        · 기명피보험자 (계약자 본인){"\n"}
        · 배우자{"\n"}
        · 부모 (양부모 포함){"\n"}
        · 자녀 (양자 포함){"\n"}
        · 배우자의 부모{"\n"}
        차량 탑승 여부와 관계없이 보행 중·자전거 탑승 중에도 보장
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 자동차보험 표준약관을 바탕으로 작성됐어요. 보험사별 세부 약관이 다를 수 있으니, 가입 전 약관을 살펴보세요." />
    </ArticleLayout>
  );
}
