"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 금융·보험업 법인의 세무 담당자가 교육세 중간예납 기한과 납부 방법을 확인하려는 상황
// Q2. 2026년 교육세 중간예납 3회분 기한을 확인하고 홈택스에서 신고·납부를 완료한다
// Q3. 납부 대상(금융보험업 법인만), 3회 분할 일정(2·5·8월), 세율 0.5%, 가산세(미납일당 0.022%)
// Q4. GreenBox(요약) + Steps(납부 절차) + 일정 테이블 + BorderBox(가산세) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스에 법인 계정으로 로그인하세요",
    desc: "홈택스(hometax.go.kr)에 법인 공동인증서로 로그인해요. 세무대리인이 있다면 대리인 계정으로도 신고 가능해요.",
    tip: "세무사가 대행하는 경우가 대부분",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "교육세 중간예납 신고서를 작성하세요",
    desc: "세금신고 → 교육세 → 중간예납 신고 메뉴에서 신고서를 작성해요. 직전 사업연도 납부세액의 1/4을 기재하면 돼요. 수익금액이 크게 변동됐으면 실적 기준으로 신고할 수도 있어요.",
    tip: "중간예납세액 = 직전 연도 납부세액 ÷ 4",
  },
  {
    title: "신고서 제출 후 바로 납부하세요",
    desc: "계좌이체가 가장 일반적이에요. 신용카드도 가능하지만 수수료 0.8%가 붙어요. 금액이 큰 만큼 계좌이체로 수수료 없이 납부하는 게 좋아요.",
    tip: "기한일까지 납부 완료해야 가산세 면제",
  },
];

const CHECKLIST = [
  "우리 회사가 금융·보험업 법인인지 확인 / 일반 사업자는 교육세 대상 아님",
  "2026년 1차 기한: 2월 28일(토) → 3월 2일(월) / 주말 연장",
  "2차 기한: 5월 31일(일) → 6월 1일(월) / 주말 연장",
  "3차 기한: 8월 31일(월) / 연장 없음",
  "확정신고: 다음 해 3월 31일까지 / 법인세와 동시 신고",
];

const FAQS = [
  {
    q: "일반 제조업 법인인데 교육세를 내야 하나요?",
    a: "아니요. 교육세 중간예납 대상은 금융·보험업 법인만이에요. 은행, 보험사, 증권사, 카드사, 저축은행 등이 해당하고, 일반 제조업·서비스업은 관계없어요.",
  },
  {
    q: "교육세 세율은 얼마예요?",
    a: "금융·보험업 수익금액의 0.5%예요. 수익금액은 이자수익, 보험료수익 등 금융업 특성에 맞는 수익을 말해요.",
  },
  {
    q: "중간예납 세액은 어떻게 계산하나요?",
    a: "직전 사업연도 납부세액을 4로 나눈 금액이에요. 분기별로 1/4씩 납부하는 거예요. 실제 수익이 크게 변동됐다면 실적 기준으로 신고할 수도 있어요.",
  },
  {
    q: "기한 넘기면 가산세가 얼마나 붙나요?",
    a: "납부불성실가산세로 미납세액에 하루당 0.022%가 붙어요. 1억원을 30일 늦게 내면 66만원이에요. 신고 자체를 안 하면 무신고 가산세 20%도 별도로 부과돼요.",
  },
  {
    q: "주세나 개별소비세에 붙는 교육세와 같은 건가요?",
    a: "다른 거예요. 주세·개별소비세에 붙는 교육세는 해당 세금 신고 시 함께 내는 부가세 형태예요. 금융보험업 교육세는 별도의 독립 세목이고 중간예납 제도가 있어요.",
  },
];

const SOURCES = [
  { name: "국세청 교육세", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2292&cntntsId=7704" },
  { name: "교육세법", href: "https://www.law.go.kr/법령/교육세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "법인세-신고-기한-세율", title: "법인세 신고 기한과 세율", description: "12월 결산법인 신고 기한." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "원천세 신고 절차 정리." },
  { slug: "2월-세금-신고-납부-일정", title: "2월 세금 납부 일정", description: "2월에 내야 하는 세금 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 교육세 · 금융법인</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        결산법인 교육세, 언제 얼마나 내야 하나요?<br />
        2·5·8월 3회 중간예납 일정과 납부 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "교육세 중간예납 기한이 언제예요? 우리 회사가 대상인지도 모르겠어요."
      </p>
      <p style={body}>
        교육세 중간예납은 <strong>금융·보험업 법인만</strong> 해당돼요. 일반 사업자는 낼 필요 없어요.
        은행, 보험사, 증권사, 카드사 등이 대상이고, <strong>2월·5월·8월 말일</strong>까지 3회에 걸쳐 분할 납부해요.
        세율은 수익금액의 <strong>0.5%</strong>이고, 기한 넘기면 하루당 0.022% 가산세가 붙어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>2026년 중간예납 일정은 어떻게 되나요?</H2>
      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2292&cntntsId=7704" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a> 기준으로
        말일이 주말·공휴일이면 다음 영업일까지 연장돼요.
      </p>

      <SectionBadge>2026년 납부 일정</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>차수</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>원래 기한</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>실제 기한</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대상 기간</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1차", "2월 28일(토)", "3월 2일(월)", "전년 4분기"],
              ["2차", "5월 31일(일)", "6월 1일(월)", "당해 1분기"],
              ["3차", "8월 31일(월)", "8월 31일(월)", "당해 2분기"],
              ["확정신고", "3월 31일", "3월 31일", "연간 정산"],
            ].map(([round, orig, actual, period], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i === 3 ? "#f0fdf4" : i % 2 === 0 ? "#fff" : "#f9fafb", fontWeight: i === 3 ? 600 : 400 }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{round}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{orig}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{actual}</td>
                <td style={{ padding: "9px 12px" }}>{period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        중간예납세액 = 직전 사업연도 납부세액 ÷ 4{"\n"}
        세율: 금융보험업 수익금액의 0.5%{"\n"}
        확정신고(3월)에서 실제 실적으로 정산 → 차액 추가 납부 또는 환급
      </GreenBox>

      <CategoryButton label="세금 정보" count={8} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>홈택스에서 납부하는 절차</H2>
      <p style={body}>
        대부분 세무사가 법인세와 함께 대행하지만, 직접 하는 경우도 있어요.
        홈택스에서 3단계로 끝나요.
      </p>

      <SectionBadge>납부 3단계</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>기한 넘기면 가산세가 이렇게 붙어요</H2>
      <p style={body}>
        금융법인은 납부 금액이 크기 때문에 가산세 부담도 커요. 하루만 늦어도 수십만원이 나올 수 있어요.
      </p>

      <BorderBox title="가산세 종류">
        납부불성실가산세: 미납세액 x 미납일수 x 0.022%{"\n"}
        → 1억원을 30일 늦게 납부하면 66만원{"\n\n"}
        무신고가산세: 납부세액의 20% (부정 무신고 40%){"\n"}
        → 1억원 무신고 시 2,000만원 가산세
      </BorderBox>

      <Divider />

      <H2>우리 회사가 대상인지 체크하세요</H2>
      <p style={body}>
        교육세 중간예납 대상인지 헷갈릴 수 있어요. 아래 기준으로 확인하세요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 교육세법과 국세청 안내로 작성됐어요. 구체적인 신고 사항은 세무사와 상담하세요." />
    </ArticleLayout>
  );
}
