"use client";

// Q1. 종신보험 가입했는데 상속세가 나올지 걱정되는 사람 (계약 구조에 따라 과세 여부가 달라진다는 걸 모름)
// Q2. 계약 구조(계약자·피보험자·수익자)를 보고 상속세 과세 여부를 판단하고, 절세 구조로 변경 행동
// Q3. 상속세및증여세법 제8조 간주상속재산, 계약구조 3패턴별 과세여부, 보험료 납부자 증빙, 증여세 이슈
// Q4. GreenBox(과세 판단 결론표) + Steps(절세 구조 변경 절차) + Checklist(보험료 납부 증빙 체크) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, Checklist,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "종신보험 사망보험금은 무조건 상속세가 나오나요?", a: "아니요. 계약자와 피보험자가 같은 사람일 때만 상속재산에 포함돼요. 자녀가 계약자이고 부모가 피보험자면 상속세가 안 나와요." },
  { q: "자녀 이름으로 계약했는데 부모가 보험료 내면요?", a: "부모가 매달 납부한 보험료가 증여로 간주돼요. 10년간 5,000만원 넘으면 증여세가 발생하니 자녀 소득으로 직접 납부해야 해요." },
  { q: "배우자가 계약자면 상속세 안 나오나요?", a: "배우자가 계약자·수익자이고 보험료도 배우자가 냈으면 상속재산에서 빠져요. 다만 배우자 공제 한도(최대 30억원)도 함께 따져야 해요." },
  { q: "기존 계약을 절세 구조로 바꿀 수 있나요?", a: "계약자 변경이 가능해요. 보험사에 연락해서 계약자를 자녀로 변경하면 되는데, 변경 시점 이후 보험료는 자녀가 직접 내야 해요." },
  { q: "상속세 세율은 얼마인가요?", a: "과세표준 1억 이하 10%, 5억 이하 20%, 10억 이하 30%, 30억 이하 40%, 30억 초과 50%예요. 5단계 초과누진세율이에요." },
  { q: "보험금이 상속공제 범위 안이면 세금 안 내나요?", a: "맞아요. 일괄공제 5억원 + 배우자공제 등으로 총 상속재산이 공제액 이하면 세금이 0원이에요. 보험금 포함 총 재산 기준으로 봐요." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "상속세 및 증여세법", url: "https://www.law.go.kr/법령/상속세및증여세법" },
    { label: "국세청 상속재산 평가 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2330&cntntsId=7723" },
    { label: "국세청 상속세 세액계산 흐름도", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2326&cntntsId=7720" },
  ]},
];

const RELATED = [
  { slug: "상속세-계산-세율-공제", title: "상속세 계산 세율과 공제 한도", description: "과세표준별 세율과 각종 공제 항목을 정리했어요." },
  { slug: "증여세-계산-세율-공제", title: "증여세 계산 세율과 공제", description: "10년 합산 증여공제 한도와 세율 구간이에요." },
  { slug: "종합부동산세-계산기", title: "종합부동산세 계산기", description: "부동산 보유세 부담을 미리 계산해 보세요." },
];

const STEPS = [
  { title: "현재 계약 구조 확인", desc: "보험증권에서 계약자·피보험자·수익자가 누구인지 확인해요. 보험사 앱이나 고객센터(☎)로 조회 가능해요.", tip: "증권 분실 시 보험사 앱에서 전자증권 조회" },
  { title: "계약자 변경 신청", desc: "보험사에 연락해서 계약자를 자녀로 변경해요. 자녀 신분증과 동의서가 필요해요.", tip: "변경 후 보험료 자동이체 계좌도 자녀 명의로" },
  { title: "보험료 납부 주체 변경", desc: "변경 시점부터 자녀 명의 계좌에서 보험료가 빠져나가도록 설정해요. 소득 증빙이 핵심이에요." },
  { title: "증빙 서류 보관", desc: "자녀 소득 증빙(근로소득원천징수영수증, 사업소득 신고서)과 보험료 납부 내역을 10년 이상 보관해요." },
];

const CHECKLIST = [
  "보험증권에서 계약자·피보험자·수익자 확인했나요?",
  "계약자와 피보험자가 같은 사람인지 확인했나요?",
  "보험료를 실제로 누가 내고 있는지 확인했나요?",
  "자녀 명의 계약이면 자녀에게 소득이 있는지 확인했나요?",
  "10년간 증여 합산액이 5,000만원을 넘지 않는지 확인했나요?",
  "보험료 납부 내역과 소득 증빙 서류를 보관하고 있나요?",
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 상속 · 보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        종신보험 상속재산 평가<br />
        계약 구조별 과세 기준과 절세 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        종신보험에 가입해 뒀는데, 나중에 상속세가 나올까 걱정되죠?
        계약자와 피보험자가 같으면 사망보험금이 상속재산에 포함돼요.
        하지만 자녀가 계약자이면서 보험료도 직접 냈다면 상속세가 안 나와요.
        계약 구조 하나로 수천만원 세금 차이가 나니까, 지금 보험증권부터 꺼내 보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>계약 구조별 상속세 과세 여부</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/상속세및증여세법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>상속세 및 증여세법 제8조</a>에서
        피보험자가 사망해서 지급되는 보험금 중, 피보험자가 보험료를 납부한 경우 그 보험금을 간주상속재산으로 봐요.
        핵심은 &quot;누가 보험료를 냈느냐&quot;예요.
      </p>

      <GreenBox title="계약 구조별 과세 판단">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>구조</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>계약자</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>피보험자</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>수익자</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>상속세</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px" }}>패턴 1</td>
              <td style={{ padding: "8px 6px" }}>부모(본인)</td>
              <td style={{ padding: "8px 6px" }}>부모(본인)</td>
              <td style={{ padding: "8px 6px" }}>자녀</td>
              <td style={{ padding: "8px 6px", color: "#dc2626", fontWeight: 600 }}>과세</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px" }}>패턴 2</td>
              <td style={{ padding: "8px 6px" }}>자녀</td>
              <td style={{ padding: "8px 6px" }}>부모</td>
              <td style={{ padding: "8px 6px" }}>자녀</td>
              <td style={{ padding: "8px 6px", color: "#1D9E75", fontWeight: 600 }}>비과세</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 6px" }}>패턴 3</td>
              <td style={{ padding: "8px 6px" }}>배우자</td>
              <td style={{ padding: "8px 6px" }}>본인</td>
              <td style={{ padding: "8px 6px" }}>배우자</td>
              <td style={{ padding: "8px 6px", color: "#1D9E75", fontWeight: 600 }}>비과세</td>
            </tr>
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        패턴 1처럼 부모가 계약자이자 피보험자면, 부모 사망 시 보험금 전액이 상속재산에 포함돼요.
        최대 50% 세율이 적용될 수 있어요.
        패턴 2는 자녀가 계약자이므로 자녀 본인의 보험 계약이에요. 부모 사망 시 보험금이 돌아오지만 상속이 아니라 자녀 본인의 보험금이에요.
      </p>

      <Divider />

      <H2>보험료 납부자가 왜 중요할까?</H2>
      <p style={body}>
        자녀가 계약자인데 부모가 보험료를 대신 내주면 매달 보험료만큼 증여가 일어나요.
        <a href="https://www.law.go.kr/법령/상속세및증여세법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>상속세 및 증여세법</a>에 따라
        직계존비속 간 10년간 증여공제 한도가 5,000만원(미성년자 2,000만원)이에요.
      </p>

      <BorderBox title="증여세 이슈 예시">
        <p style={{ fontSize: 13, lineHeight: 1.9, margin: 0 }}>
          월 보험료 30만원 x 12개월 x 10년 = 3,600만원 → 공제 한도 이내로 증여세 없음<br />
          월 보험료 50만원 x 12개월 x 10년 = 6,000만원 → 공제 초과 1,000만원에 10% 증여세 발생<br /><br />
          국세청은 실제 납부자를 추적해요. 자녀 계좌에서 빠져나갔더라도 그 돈이 부모에게서 온 거면 증여로 봐요.
        </p>
      </BorderBox>

      <p style={body}>
        절세 구조를 만들려면 자녀가 직접 벌어서 보험료를 내야 해요. 근로소득이나 사업소득이 있어야 하고, 그 소득으로 납부했다는 증빙을 남겨야 해요.
      </p>

      <Divider />

      <H2>절세 구조로 바꾸는 방법은?</H2>
      <p style={body}>
        이미 부모가 계약자·피보험자인 종신보험에 가입해 있다면, 계약자를 자녀로 변경하는 방법이 있어요.
        변경 시점 이후 납부하는 보험료부터 자녀 부담이 되니까, 빨리 바꿀수록 절세 효과가 커요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        계약자 변경 자체는 무료이고 보험사 앱이나 지점 방문으로 처리돼요.
        다만 변경 전까지 부모가 낸 보험료 부분은 여전히 상속재산에 포함될 수 있으니, 세무사 상담을 받아 보는 게 좋아요.
      </p>

      <Divider />

      <H2>보험료 납부 증빙 체크리스트</H2>
      <p style={body}>
        국세청 세무조사에서 보험료 납부 주체가 쟁점이 돼요.
        자녀가 계약자라도 소득 증빙이 없으면 &quot;부모가 대신 낸 것&quot;으로 판단해서 상속세나 증여세가 나올 수 있어요.
        아래 항목을 미리 챙겨 두세요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />
      <ArticleAd position="middle" />

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 상속세 및 증여세법을 바탕으로 작성했어요. 개별 사안은 세무사나 회계사에게 상담받으세요." />
    </ArticleLayout>
  );
}
