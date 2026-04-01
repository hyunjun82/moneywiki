"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 직원 급여 지급하고 원천세 신고·납부 어떻게 하는지 모르는 사업자
// Q2. 홈택스 원천세 신고 → 위택스 지방소득세 신고 → 다음달 10일까지 납부
// Q3. 급여 지급 다음달 10일 기한 / 소득세(홈택스)+지방소득세(위택스) 각각 / 반기신고 20인이하 / 잘못납부=수정신고로 환급
// Q4. GreenBox(신고 사이트별 절차) + Steps(정기 신고 4단계) + BorderBox(가산세 + 반기신고 + 환급) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "원천세 신고를 안 하면 어떻게 되나요?",
    a: "납부불성실가산세가 붙어요. 미납세액의 3%에 더해 하루 0.022%씩 추가 가산세가 붙고 최대 50%까지 붙을 수 있어요. 늦게라도 최대한 빨리 납부해야 해요.",
  },
  {
    q: "반기 신고는 누가 할 수 있나요?",
    a: "상시근로자 20명 이하 사업장은 반기 신고를 선택할 수 있어요. 1~6월분은 7월 10일까지, 7~12월분은 다음 해 1월 10일까지 신고하면 돼요. 매달 신고하는 번거로움을 줄일 수 있어요.",
  },
  {
    q: "소득세만 신고하면 되나요?",
    a: "아니에요. 소득세는 홈택스에서, 지방소득세는 위택스에서 각각 신고해야 해요. 둘 다 해야 가산세가 안 붙어요. 지방소득세 특별징수를 빠뜨리는 경우가 많으니 주의하세요.",
  },
  {
    q: "원천세를 잘못 냈으면 어떻게 하나요?",
    a: "수정신고를 하면 과다 납부한 세금을 환급받을 수 있어요. 홈택스에서 수정신고 후 환급 신청하거나, 다음 달 원천세에서 조정해서 사용할 수 있어요. 관할 세무서에 문의하면 안내받을 수 있어요.",
  },
  {
    q: "근로소득원천징수영수증은 어떻게 발급하나요?",
    a: "홈택스 → 나의홈택스 → 연말정산·지급명세서 → 지급명세서 등 제출내역에서 조회하고 출력할 수 있어요. 연말정산 신고 기간(3월 10일) 이후 1~2개월 뒤부터 조회 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청 홈택스 원천세 신고", url: "https://www.hometax.go.kr" },
      { label: "국세청: 신고납부기한 안내", url: "https://www.nts.go.kr" },
      { label: "위택스 지방소득세 특별징수 신고", url: "https://www.wetax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "원천징수", title: "원천징수란 무엇인가요", description: "월급에서 세금 떼는 원천징수 개념이에요." },
  { slug: "연말정산", title: "연말정산 절차 전체 흐름", description: "원천세 신고와 연결되는 연말정산이에요." },
  { slug: "근로소득세", title: "근로소득세 계산 방법", description: "원천세 금액 계산하는 방법이에요." },
];

const STEPS = [
  {
    title: "홈택스 접속 후 원천세 신고",
    desc: "hometax.go.kr 로그인 → 신고/납부 → 세금신고 → 원천세 → 정기신고(또는 반기신고) 선택 후 직원별 급여와 원천징수세액 입력",
  },
  {
    title: "소득세 납부",
    desc: "신고 후 납부서 확인 → 계좌이체 또는 신용카드로 납부. 급여 지급 다음달 10일까지 완료",
  },
  {
    title: "위택스에서 지방소득세 신고",
    desc: "wetax.go.kr 접속 → 신고하기 → 지방소득세 특별징수 → 소득세 신고 내역과 동일하게 입력",
  },
  {
    title: "지방소득세 납부",
    desc: "위택스에서 납부 완료. 두 사이트 모두 신고·납부해야 가산세가 붙지 않아요",
  },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 원천세 · 사업자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        원천세 신고 납부 방법<br />
        홈택스+위택스 다음달 10일까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직원 급여를 줬으면 다음달 10일까지 원천세를 신고·납부해야 해요.
        소득세는 홈택스, 지방소득세는 위택스에서 각각 신고해야 가산세가 안 붙어요.
        상시근로자 20명 이하면 반기 신고로 부담을 줄일 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>신고 사이트별 역할</H2>
      <p style={body}>
        두 사이트에 각각 신고해야 해요. 홈택스만 하면 지방소득세 미신고로 가산세가 붙어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>신고 항목</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>사이트</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>메뉴 경로</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "소득세 (원천세)", site: "홈택스 (hometax.go.kr)", path: "신고/납부 → 세금신고 → 원천세" },
              { item: "지방소득세 (특별징수)", site: "위택스 (wetax.go.kr)", path: "신고하기 → 지방소득세 특별징수" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.item}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontSize: 12 }}>{row.site}</td>
                <td style={{ padding: "5px 8px", fontSize: 11 }}>{row.path}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 납부 기한: 급여 지급 다음달 10일까지 (예: 1월 급여 → 2월 10일)
        </p>
      </GreenBox>

      <H2>원천세 신고 절차</H2>
      <p style={body}>
        홈택스 신고 후 위택스까지 완료해야 끝이에요.
      </p>

      <Steps steps={STEPS} />

      <H2>가산세·반기신고·환급 주의사항</H2>
      <p style={body}>
        기한 지나면 가산세가 빠르게 쌓여요. 반기 신고 대상인지도 확인해 봐요.
      </p>

      <BorderBox>
        <strong>가산세 구조</strong><br />
        미납세액 × 3% (불성실 가산세 기본)<br />
        + 하루 0.022%씩 추가 (최대 50% 한도)<br />
        → 30일 지연 시 약 3.66% 추가<br />
        <br />
        <strong>반기 신고 (20인 이하 사업장)</strong><br />
        1~6월분: 7월 10일까지 / 7~12월분: 다음 해 1월 10일까지<br />
        세무서에 반기 납부 승인 신청 후 적용<br />
        <br />
        <strong>잘못 납부한 경우</strong><br />
        수정신고 → 과다 납부분 환급 신청<br />
        또는 다음 달 납부 시 차감해서 적용<br />
        관할 세무서 방문 또는 홈택스 수정신고 가능<br />
        <br />
        ★ 지방소득세 신고 빠뜨리는 경우 많음 → 위택스도 꼭 확인
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 원천세 신고 방법은 세법 개정에 따라 변경될 수 있으니 국세청 홈택스 공지를 확인하세요." />
    </ArticleLayout>
  );
}
