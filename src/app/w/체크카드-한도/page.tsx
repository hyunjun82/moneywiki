"use client";

// Q1. 체크카드로 큰 금액 결제하려는데 한도 부족 오류가 떠서 한도를 올리고 싶은 상황이에요.
// Q2. 본인 체크카드의 현재 한도를 확인하고, 앱이나 고객센터에서 한도를 올리는 행동.
// Q3. 기본 한도(일 600만/월 1,000만), 변경 방법(앱/고객센터/영업점), 최대 한도, 미성년자 한도.
// Q4. GreenBox(기본 한도) + Steps(한도 변경 절차) + 표(은행별 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  { title: "은행 앱 접속", desc: "본인 거래 은행 앱에 로그인해요. 카드 메뉴 또는 체크카드 관리 메뉴를 찾아요." },
  { title: "한도 변경 메뉴 선택", desc: "'카드 관리' → '한도 변경' 또는 '이용 한도 설정'을 선택해요. 카드를 선택하면 현재 한도가 표시돼요." },
  { title: "원하는 한도 입력", desc: "일일 한도와 월간 한도를 원하는 금액으로 입력해요. 은행별 최대 한도 범위 내에서 설정 가능해요.", tip: "잔액이 있어도 한도를 넘으면 결제 안 돼요" },
  { title: "본인인증 후 완료", desc: "비밀번호나 생체인증으로 본인확인하면 즉시 변경돼요. 별도 수수료는 없어요." },
];

const FAQS = [
  {
    q: "체크카드인데 왜 한도가 있나요?",
    a: "보안 때문이에요. 카드 분실이나 부정 사용 시 피해를 최소화하려고 일일·월간 한도를 걸어두는 거예요. 잔액이 있어도 한도를 넘으면 결제가 안 돼요.",
  },
  {
    q: "한도를 1억원까지 올릴 수 있나요?",
    a: "은행마다 달라요. 일부 은행은 고객센터나 영업점에서 최대 1억원까지 설정 가능해요. 앱에서는 보통 5천만원까지 가능해요.",
  },
  {
    q: "미성년자 체크카드 한도는 얼마예요?",
    a: "만 12~13세는 일 3만원, 월 30만원으로 제한돼요. 만 14세 이상은 법정대리인 동의 하에 한도를 높일 수 있어요.",
  },
  {
    q: "한도 변경에 수수료가 있나요?",
    a: "대부분 은행은 무료예요. 앱, 고객센터, 영업점 어디서 해도 수수료가 없어요.",
  },
  {
    q: "월 한도는 언제 복원되나요?",
    a: "매월 1일 0시에 자동으로 복원돼요. 월 1,000만원 한도라면 매월 1일에 다시 1,000만원으로 리셋돼요.",
  },
  {
    q: "한도를 낮추는 것도 가능한가요?",
    a: "네. 보안을 위해 일부러 한도를 낮게 설정하는 분도 있어요. 같은 방법으로 한도를 줄일 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "참고 자료",
    items: [
      { label: "KB국민카드 체크카드 한도 변경", url: "https://m.kbcard.com" },
      { label: "하나카드 이용안내", url: "https://www.hanacard.co.kr/OSA10000010N.web" },
    ],
  },
];

const RELATED = [
  { slug: "신용카드-발급-조건", title: "신용카드 발급 조건", description: "신용카드 발급에 필요한 소득·신용 기준을 정리해요." },
  { slug: "마이너스-통장-관리", title: "마이너스 통장 관리법", description: "마이너스 통장 한도와 이자 관리법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 카드 · 한도</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        체크카드 한도, 왜 막히고 어떻게 올릴까?<br />
        기본 한도와 변경 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        체크카드로 큰 금액 결제하려는데 "한도 초과"가 뜨신 적 있죠?
        내 돈을 쓰는 건데 왜 한도가 있는지 의아하셨을 거예요.
        보안 때문에 기본 한도가 걸려 있는데, 앱에서 바로 올릴 수 있어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>체크카드 기본 한도는 얼마예요?</H2>
      <p style={body}>
        은행마다 조금씩 다르지만, 별도 요청 없으면 기본 한도가 자동 설정돼요.
        잔액이 충분해도 일일 한도나 월간 한도를 넘기면 결제가 거절돼요.
      </p>

      <GreenBox>
        일반적인 기본 한도예요.<br />
        · <strong>일일 한도</strong>: 600만원 (일부 은행 500만원)<br />
        · <strong>월간 한도</strong>: 1,000만원<br />
        · <strong>미성년자</strong>: 일 3만원 / 월 30만원 (만 12~13세 기준)
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>한도 변경, 앱에서 바로 돼요</H2>
      <p style={body}>
        은행 앱에서 3분이면 한도를 올릴 수 있어요. 앱이 불편하면 고객센터 전화나 영업점 방문으로도 가능해요.
      </p>

      <SectionBadge>한도 변경 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>은행별 최대 한도가 다른가요?</H2>
      <p style={body}>
        은행마다 앱에서 설정할 수 있는 최대 한도가 다르고, 고객센터나 영업점에서는 더 높게 설정할 수 있어요.
      </p>

      <SectionBadge>은행별 최대 한도 참고</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>은행</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>앱 최대 (일)</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>고객센터 최대 (일)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["KB국민", "5,000만원", "1억원"],
              ["신한", "5,000만원", "1억원"],
              ["하나", "2,000만원", "별도 상담"],
              ["우리", "5,000만원", "1억원"],
              ["농협", "5,000만원", "별도 상담"],
            ].map(([bank, app, cs], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{bank}</td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>{app}</td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>{cs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        은행별 한도는 정책에 따라 달라질 수 있어요. 정확한 최대 한도는 본인 거래 은행 앱이나 고객센터에서 확인하는 게 가장 정확해요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주요 은행 공식 사이트를 바탕으로 작성됐어요. 은행별 한도 정책은 수시로 변경될 수 있으니 해당 은행에서 최신 정보를 확인해봐요." />
    </ArticleLayout>
  );
}
