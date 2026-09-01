"use client";
// Q1. 법인을 운영 중인 대표자/경리담당자가 법인세 신고 시즌(3월)을 앞두고 기한과 세율을 확인하려는 상황
// Q2. 법인세 신고 기한을 알고 홈택스에서 신고·납부를 완료한다
// Q3. 신고 기한(3월 31일), 2026년 세율 구간(10/20/22/25%), 중간예납 의무, 가산세 구조
// Q4. 세율 비교표 + Steps(신고 절차) + GreenBox(계산 공식) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "결산 완료 후 세무조정 하세요",
    desc: "사업연도 종료 후 회계결산서를 확정하고, 세법상 익금·손금 차이를 조정해요. 접대비 한도 초과분, 감가상각비 차이 등이 대표적인 조정 항목이죠. 세무사에게 맡기는 경우라면 1월 중에 결산 자료를 전달해야 여유 있게 진행돼요.",
    tip: "12월 결산 법인 기준, 자료 전달 기한은 1월 말 전후",
  },
  {
    title: "과세표준 계산 후 세액을 산출하세요",
    desc: "순이익에서 이월결손금·비과세소득을 차감한 금액이 과세표준이에요. 여기에 세율(10~25%)을 곱하고, 세액공제와 감면 항목을 빼면 납부할 법인세가 나와요. 중소기업 특별세액감면이나 연구개발비 세액공제가 있다면 이 단계에서 반영해요.",
    tip: "법인세 산출 공식: (과세표준 × 세율) - 공제·감면 = 납부세액",
  },
  {
    title: "3월 31일까지 홈택스에서 신고하세요",
    desc: "국세청 홈택스 로그인 후 '신고/납부 → 세금신고 → 법인세'를 선택하면 돼요. 재무제표, 세무조정계산서 등 첨부 서류를 함께 제출해야 해요. 3월 31일이 주말·공휴일이면 그다음 영업일로 자동 연장돼요.",
    tip: "홈택스 → 신고/납부 → 법인세 → 정기신고",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "납부도 기한 내에 마쳐야 가산세 없어요",
    desc: "신고와 납부는 별개예요. 신고는 제때 했어도 납부를 늦기면 납부지연 가산세(하루 0.022%)가 붙어요. 납부세액이 1,000만원을 초과하면 분납(2개월 이내)도 가능하지만, 그래도 원칙 기한은 지켜야 해요.",
    tip: "분납 가능 금액: 납부세액 50% 이하를 최대 2개월 분납",
  },
];

const CHECKLIST = [
  "결산서 확정 완료 / 세무사 전달 기한 확인",
  "이월결손금 있으면 차감 / 발생 연도 10년 이내 것만 인정",
  "중소기업 세액감면 요건 해당 여부 확인",
  "중간예납 기납부액 확인 / 정산 차액만 납부",
  "신고 기한 3월 31일 / 납부 기한 동일",
];

const FAQS = [
  {
    q: "법인세 신고 기한을 넘기면 가산세가 얼마나 붙나요?",
    a: "무신고 가산세는 납부세액의 20%예요. 부정행위(허위 장부 등)로 인한 무신고면 40%까지 올라가요. 납부 지연 가산세는 하루당 0.022%씩 붙기 때문에 늦을수록 눈덩이처럼 커지죠. 기한을 넘겼더라도 즉시 신고하면 그날까지만 가산세가 붙으니까 빨리 신고하는 게 이득이에요.",
  },
  {
    q: "2026년 법인세율이 인상됐다는데 얼마나 올랐나요?",
    a: "2026년 1월 1일 이후 개시 사업연도부터 전 구간 1%p씩 올랐어요. 2억원 이하 9%→10%, 2억~200억 19%→20%, 200억~3,000억 21%→22%, 3,000억 초과 24%→25%로 2022년 이전 수준으로 돌아간 거예요.",
  },
  {
    q: "중간예납은 언제 내야 하나요?",
    a: "12월 결산 법인 기준으로 8월 31일까지예요. 전년도 법인세의 50%를 미리 내는 방식이고, 확정신고 때 정산하면서 이미 낸 금액을 빼요. 직전 사업연도 법인세가 없거나 소규모 법인은 중간예납 의무가 면제될 수 있어요.",
  },
  {
    q: "법인세를 세무사 없이 직접 신고할 수 있나요?",
    a: "가능은 해요. 홈택스에서 법인세 신고서를 직접 작성하고 제출하면 돼요. 단, 재무제표·세무조정계산서 등 복잡한 서류가 필요하고, 공제·감면 항목을 놓치면 세금을 더 낼 수 있어요. 매출이 크거나 법인 설립 초기라면 세무사 의뢰를 권해요.",
  },
  {
    q: "이월결손금이 있으면 법인세를 줄일 수 있나요?",
    a: "네, 과거에 발생한 손실(이월결손금)을 과세표준에서 차감할 수 있어요. 발생한 사업연도 이후 10년 이내 것만 인정되고, 중소기업은 100% 차감 가능하지만 그 외 법인은 과세표준의 80%까지만 차감돼요.",
  },
  {
    q: "법인세 신고 연장 신청이 가능한가요?",
    a: "원칙적으로 법인세는 신고 기한 연장이 안 돼요. 다만 천재지변이나 화재 같은 불가피한 사유가 있으면 관할 세무서에 신청해서 연장받을 수 있어요. 코로나19 때처럼 국세청이 직권으로 기한을 연장하는 경우도 있지만, 일반적인 상황에선 기한을 엄수해야 해요.",
  },
];

const SOURCES = [
  { name: "국세청", href: "https://www.nts.go.kr" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
  { name: "법인세법", href: "https://www.law.go.kr/법령/법인세법" },
];

const RELATED = [
  { slug: "부가가치세-신고", title: "부가가치세 신고 기한과 방법", description: "1기·2기 확정신고 기한과 홈택스 신고 절차." },
  { slug: "종합소득세-신고", title: "종합소득세 신고 방법", description: "5월 종합소득세 신고 대상과 절차 안내." },
  { slug: "법인세-신고-기한-세율", title: "법인세 세율과 신고 기한", description: "2026년 개정 세율과 3월 신고 절차 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법인세 · 신고 기한 · 세율</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        법인세 신고 기한이 언제예요?<br />
        2026년 세율과 3월 신고 절차 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "법인세 기한이 3월 31일이라는데, 세율은 얼마예요?"
      </p>
      <p style={body}>
        12월 결산 법인은 <strong>다음 해 3월 31일</strong>까지 신고·납부해야 해요.
        2026년부터는 <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>법인세법 개정</a>으로 세율이 전 구간 1%p 올랐고요.
        신고 기한을 넘기면 납부세액의 <strong>20% 가산세</strong>가 붙기 때문에 기한 안에 처리하는 게 핵심이에요.
        아래에서 세율 구간부터 홈택스 신고 절차까지 한 번에 정리해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 세율 표 - 바로 답 */}
      <H2>2026년 법인세율, 구간별로 얼마예요?</H2>
      <p style={body}>
        2026년 1월 1일 이후 개시되는 사업연도부터 세율이 1%p씩 올랐어요.
        <a href="https://www.law.go.kr/법령/법인세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>법인세법 제55조</a> 개정에 따른 변경이에요.
        과세표준이 2억원 이하면 10%, 그 초과분은 아래 표처럼 단계적으로 높아져요.
      </p>

      <SectionBadge>2026년 법인세율 구간</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>과세표준</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>2026년 세율</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>2025년 이전</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2억원 이하", "10%", "9%"],
              ["2억원 초과 ~ 200억원 이하", "20%", "19%"],
              ["200억원 초과 ~ 3,000억원 이하", "22%", "21%"],
              ["3,000억원 초과", "25%", "24%"],
            ].map(([range, rate2026, rate2025], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{range}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate2026}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#9ca3af" }}>{rate2025}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        납부세액 계산 공식{"\n"}
        과세표준 × 세율 = 산출세액{"\n"}
        산출세액 - 세액공제·감면 - 기납부세액 = 납부세액
      </GreenBox>

      <p style={body}>
        예를 들어 과세표준이 5억원이면 2억원까지는 10%(2,000만원), 초과분 3억원에는 20%(6,000만원)를 적용해서 총 8,000만원이 산출세액이에요.
        여기서 중소기업 감면이나 연구개발비 공제를 빼면 실제 납부세액이 나오죠.
      </p>

      <CategoryButton label="세금 정보" count={12} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 신고 기한 */}
      <H2>신고 기한은 언제예요? 12월 법인 기준</H2>
      <p style={body}>
        법인세 신고 기한은 <strong>사업연도 종료일로부터 3개월 이내</strong>예요.
        12월 결산 법인이라면 다음 해 <strong>3월 31일</strong>이 기한이죠.
        3월 31일이 토·일요일이나 공휴일이면 그다음 영업일로 자동 연장돼요.
      </p>
      <p style={body}>
        3월 결산 법인은 6월 30일, 6월 결산은 9월 30일, 9월 결산은 12월 31일이에요.
        <a href="/w/부가가치세-신고-기한-대상" style={{ color: "#1D9E75", textDecoration: "underline" }}>부가가치세</a>처럼 예정·확정 구분 없이 연 1회 신고가 원칙이에요.
        단, 중간예납이라는 제도로 세금을 먼저 일부 납부해두는 구조예요.
      </p>

      <BorderBox>
        <strong>신고 기한 요약</strong>{"\n"}
        · 12월 결산 법인 → 다음 해 3월 31일{"\n"}
        · 기한 초과 시 무신고 가산세 20% 부과{"\n"}
        · 천재지변 등 불가피한 사유가 있으면 관할 세무서에 연장 신청 가능
      </BorderBox>

      <Divider />

      {/* H2-3: 신고 절차 Steps */}
      <H2>홈택스에서 신고하는 순서예요</H2>
      <p style={body}>
        법인세 신고는 결산→세무조정→신고서 작성→제출 순서로 진행해요.
        세무사에게 맡기더라도 대표자가 기본 흐름을 알아두면 진행 상황을 파악하기 쉬워요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-4: 체크리스트 */}
      <H2>신고 전 챙겨야 할 것들</H2>
      <p style={body}>
        법인세 신고에서 자주 놓치는 항목들이에요.
        특히 이월결손금 차감과 중간예납 기납부액 확인은 세금을 더 내는 실수로 이어지기 쉬우니 꼼꼼하게 체크하세요.
      </p>

      <SectionBadge>신고 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        법인세 신고에서 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 법인세법 기준으로 작성했어요. 세율·공제 한도는 법 개정에 따라 달라질 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 확인해 주세요." />
    </ArticleLayout>
  );
}
