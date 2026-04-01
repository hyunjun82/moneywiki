"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 설 연휴에 귀성하는데 고속도로 통행료가 무료인지, 정확한 기간이 궁금한 운전자
// Q2. 무료 기간을 확인하고 출발 시간을 맞춰서 통행료를 절약한다
// Q3. 2026년 2월 15~18일 4일간, 전국 모든 고속도로(민자 포함), 하이패스·일반 모두, 구간별 절약 금액
// Q4. GreenBox(핵심 요약) + BorderBox(구간별 절약) + Checklist(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "출발 시간 조정 / 2월 15일 0시 이후 톨게이트 통과해야 무료",
  "귀경 시간 주의 / 2월 18일 24시 이전에 톨게이트 통과 필수",
  "하이패스 단말기 전원 확인 / 꺼져 있으면 미납 처리될 수 있어요",
  "실시간 교통정보 확인 / 한국도로공사(ex.co.kr) 또는 내비게이션 앱",
  "연휴 정체 피하기 / 귀성 15일 오전, 귀경 18일 오전이 가장 혼잡",
];

const FAQS = [
  {
    q: "무료 기간은 정확히 언제부터 언제까지인가요?",
    a: "2026년 2월 15일(토) 00시 00분부터 2월 18일(화) 24시 00분까지 4일간이에요. 자정 기준이에요.",
  },
  {
    q: "14일 밤에 출발해도 무료인가요?",
    a: "진입 시점이 아니라 톨게이트 통과(진출) 시점 기준이에요. 14일 밤에 출발해도 15일 0시 이후에 톨게이트를 나가면 무료예요.",
  },
  {
    q: "민자 고속도로도 무료인가요?",
    a: "네. 서울-춘천, 인천대교 등 민자 고속도로도 포함이에요. 다만 일부 터널이나 교량 통행료는 별도일 수 있으니 확인하세요.",
  },
  {
    q: "하이패스 이용자는 어떻게 되나요?",
    a: "하이패스 단말기 전원을 켜고 통과하면 통행료 0원이 정상 처리돼요. 단말기가 꺼져 있으면 미납 처리될 수 있으니 꼭 전원 확인하세요.",
  },
  {
    q: "18일 밤에 출발해서 19일 새벽에 나가면 무료인가요?",
    a: "18일 24시(=19일 0시) 이전에 고속도로에 진입했더라도 19일 0시 이후에 나가면 무료가 적용돼요. 진입 시점 기준이라 18일 중에 들어갔으면 괜찮아요.",
  },
];

const SOURCES = [
  { name: "한국도로공사", href: "https://www.ex.co.kr" },
  { name: "정책브리핑", href: "https://www.korea.kr/news/policyNewsView.do?newsId=148959357" },
];

const RELATED = [
  { slug: "설-성수품-할인", title: "설 성수품 할인 받는 법", description: "정부 할인쿠폰으로 최대 50% 절약." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부 방법", description: "부동산 취득 시 세율과 신고 절차." },
  { slug: "부가세-환급-신청", title: "부가세 환급 신청", description: "매입이 매출보다 클 때 환급받는 법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활정보 · 고속도로 · 설 연휴</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026 설 고속도로 무료, 언제부터 언제까지?<br />
        면제 기간과 구간별 절약 금액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        설 귀성길 통행료가 무료라는데 정확한 기간이 궁금하시죠.
      </p>
      <p style={body}>
        <strong>2월 15일(토) 0시부터 18일(화) 24시까지 4일간</strong> 전국 모든 고속도로 통행료가 면제돼요.
        하이패스든 일반 차로든 상관없이 0원이에요.
        서울-부산 왕복이면 약 <strong>3만원</strong>, 서울-광주는 약 <strong>2.5만원</strong> 아낄 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>무료 기간과 적용 구간 정리</H2>
      <p style={body}>
        전국 모든 고속도로에 적용돼요. 민자 고속도로(서울-춘천, 인천대교 등)도 포함이에요.
      </p>

      <GreenBox>
        2026 설 고속도로 무료 핵심{"\n"}
        · 기간: 2월 15일(토) 00:00 ~ 18일(화) 24:00 (4일간){"\n"}
        · 대상: 전국 모든 고속도로 (민자 포함){"\n"}
        · 차종: 모든 차량 (하이패스·일반 차로 모두){"\n"}
        · 기준: 톨게이트 통과(진출) 시점
      </GreenBox>

      <SectionBadge>연휴 일정</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>날짜</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>요일</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>통행료</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2월 15일", "토", "무료 (귀성 시작)"],
              ["2월 16일", "일", "무료 (설 당일)"],
              ["2월 17일", "월", "무료 (대체공휴일)"],
              ["2월 18일", "화", "무료 (귀경 마감)"],
            ].map(([date, day, toll], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{date}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{day}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{toll}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="생활정보" count={5} href="/category/생활정보" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>구간별로 얼마나 절약되나요?</H2>
      <p style={body}>
        장거리일수록 절약 효과가 커요. 4인 가족 왕복이면 교통비만 수만원 아끼는 거예요.
      </p>

      <BorderBox>
        <strong>구간별 왕복 절약 금액</strong>{"\n"}
        · 서울-부산: 약 30,000원{"\n"}
        · 서울-광주: 약 25,000원{"\n"}
        · 서울-강릉: 약 16,000원{"\n"}
        · 서울-대전: 약 12,000원
      </BorderBox>

      <p style={body}>
        아낀 통행료로 <a href="/w/설-성수품-할인" style={{ color: "#1D9E75", textDecoration: "underline" }}>설 성수품 할인</a>까지 활용하면 명절 비용을 크게 줄일 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>출발 전에 이것만 확인하세요</H2>
      <p style={body}>
        무료 기간의 시작·종료 시점을 정확히 알아야 통행료 0원이에요.
      </p>

      <SectionBadge>주의사항 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        설 고속도로 무료와 관련해 많이 궁금해하는 것들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 설 기준으로 작성했어요. 무료 기간은 매년 정부 발표에 따라 달라질 수 있으니 한국도로공사 공식 발표를 확인해 주세요." />
    </ArticleLayout>
  );
}
