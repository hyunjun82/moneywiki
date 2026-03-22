"use client";

// Q1. 어린이집 보육료 카드를 발급받으려는 부모. BC카드로 아이행복카드를 만들 수 있는지, 어디서 발급받는지 궁금한 상황.
// Q2. 12개 은행 중 하나를 골라 BC 아이행복카드를 발급받고, 복지로에 등록해서 보육료 결제를 시작하는 행동.
// Q3. 12개 발급 은행 목록, 온라인/오프라인 신청 경로, 보육료 결제 기능 별도 요청 필수, 연회비 무료, 지원금액(나이별).
// Q4. Steps(발급 절차) + GreenBox(핵심 정보) + 표(발급 은행) + FAQ

import {
  H2, SectionBadge, GreenBox, Divider, body, Steps,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ISSUE_STEPS = [
  { title: "발급 은행 선택", desc: "IBK기업은행, 우체국, SC제일은행 등 12개 은행 중 가까운 곳을 골라요.", tip: "우체국(3,500개)이 접근성이 가장 좋아요" },
  { title: "카드 신청", desc: "복지로, BC카드 홈페이지, 또는 선택한 은행 앱·창구에서 국민행복카드를 신청해요.", tip: "온라인이 빠르고, 오프라인도 가능해요" },
  { title: "보육료 결제 기능 요청", desc: "신청 시 '어린이집 보육료 결제 기능 추가'를 반드시 선택해요. 이걸 빼면 보육료 결제가 안 돼요." },
  { title: "복지로 사용 등록", desc: "복지로(bokjiro.go.kr) 또는 앱에서 카드 사용 등록을 해요. 등록 다음 달부터 보육료 결제가 가능해요." },
];

const FAQS = [
  { q: "BC카드 아이행복카드는 어느 은행에서 발급받나요?", a: "IBK기업은행, SC제일은행, DGB대구은행, 부산은행, 경남은행, 전북은행, 수협은행, 광주은행, 우체국, 제주은행, 신협, 현대증권 중에서 선택할 수 있어요." },
  { q: "보육료 결제가 안 되는데 왜 그런가요?", a: "발급 시 보육료 결제 기능을 별도로 요청해야 해요. 이미 발급받았다면 은행에 전화해서 기능 추가를 요청하면 돼요." },
  { q: "연회비가 있나요?", a: "신용카드, 체크카드 모두 연회비 무료예요." },
  { q: "보육료 지원금은 매달 얼마나 나오나요?", a: "만 0세 최대 514,000원, 만 1세 452,000원, 만 2세 373,000원, 만 3~5세 280,000원이에요." },
  { q: "국민행복카드를 다른 카드사로 이미 만들었는데 BC로 바꿀 수 있나요?", a: "네, 기존 카드를 해지하고 BC카드로 새로 발급받으면 돼요. 복지로에서 카드 변경 등록도 해야 해요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "BC카드 국민행복카드 안내", url: "https://www.bccard.com" },
      { label: "국민행복카드 공식 사이트", url: "http://www.voucher.go.kr" },
      { label: "복지로", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "부모급여-지원금액-신청방법", title: "부모급여 신청 방법", description: "부모급여 지원금액과 신청 절차를 정리했어요." },
  { slug: "2026-부모급여-지급-금액-인상-및-신청-방법", title: "2026 부모급여 금액 인상", description: "2026년 부모급여가 얼마나 올랐는지 확인해봐요." },
  { slug: "어린이집-보육료-결제-및-아이행복카드-발급-방법", title: "아이행복카드 전체 안내", description: "7개 카드사별 아이행복카드 발급 방법을 비교했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 보육 · 카드</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        BC카드 아이행복카드<br />
        12개 은행 발급 방법과 주의사항
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        어린이집 보육료 카드를 BC카드로 만들려고 하시죠.
        BC 아이행복카드는 12개 은행에서 발급할 수 있어요. 연회비 무료이고 전국 7,000여 곳에서 신청 가능하죠.
        발급 절차와 보육료 결제 기능 설정까지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>BC 아이행복카드, 어디서 발급받나요?</H2>
      <p style={body}>
        <a href="http://www.voucher.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민행복카드 공식 사이트</a>에서 안내하는
        7개 카드사 중 BC카드를 선택하면, 12개 제휴 은행에서 발급받을 수 있어요.
      </p>

      <SectionBadge>발급 가능 은행 12곳</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>은행</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>특징</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["IBK기업은행", "전국 지점 약 900개"],
              ["SC제일은행", "전국 주요 도시 지점"],
              ["DGB대구은행", "대구·경북 특화"],
              ["부산은행", "부산·경남 특화"],
              ["경남은행", "경남 특화"],
              ["전북은행", "전북 특화"],
              ["수협은행", "어촌·해안 접근성"],
              ["광주은행", "광주·전남 특화"],
              ["우체국", "전국 약 3,500개 (접근성 최고)"],
              ["제주은행", "제주 특화"],
              ["신협", "전국 지역별 운영"],
              ["현대증권", "온라인 발급"],
            ].map(([bank, desc], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 500 }}>{bank}</td>
                <td style={{ padding: "9px 12px" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        만 0~5세 자녀가 있으면 누구나 신청할 수 있어요.<br />
        신용카드·체크카드 모두 <strong>연회비 무료</strong>예요.
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>발급 절차는 이렇게 진행돼요</H2>
      <p style={body}>
        온라인(복지로, BC카드, 은행 앱)이나 오프라인(은행 창구) 어디서든 신청할 수 있어요.
        가장 중요한 건 3단계 '보육료 결제 기능 요청'이에요. 이걸 빼먹으면 카드가 나와도 보육료 결제가 안 돼요.
      </p>

      <Steps steps={ISSUE_STEPS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 BC카드·국민행복카드 공식 안내를 바탕으로 작성됐어요. 발급 은행별 세부 조건은 다를 수 있으니 해당 은행에 확인해봐요." />
    </ArticleLayout>
  );
}
