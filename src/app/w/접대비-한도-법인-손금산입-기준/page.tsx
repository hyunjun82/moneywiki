"use client";

// Q1. 법인 운영하면서 거래처 식사·선물에 쓴 돈이 경비로 인정되는지, 한도가 얼마인지 궁금한 상황
// Q2. 기본한도·추가한도를 확인하고 3만원 초과 적격증빙 규칙을 지켜서 세금 불이익을 피해야 함
// Q3. 중소기업 3,600만, 일반 1,200만, 수입금액별 추가한도 비율, 3만원 증빙, 문화접대비 20%, 명칭 변경(업무추진비)
// Q4. GreenBox(한도 요약표) + BorderBox(적격증빙) + Checklist(관리 체크리스트) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const MANAGE_CHECKLIST = [
  "3만 원 초과 결제 시 반드시 신용카드 또는 현금영수증 사용",
  "거래처명·목적을 영수증에 메모 (예: OO사 김 대표 계약 논의)",
  "월별로 접대비 합산해서 기본한도 초과 여부 점검",
  "문화접대비(공연·영화·전시 등)는 별도로 구분 기록",
  "경조사비도 접대비에 포함되니 건당 20만 원 이내로 관리",
  "법인카드 사용 권장 (개인카드 사용 시 법인 청구 명확히)",
];

const FAQS = [
  {
    q: "접대비와 업무추진비가 다른 건가요?",
    a: "2024년 1월부터 세법상 '접대비'가 '업무추진비'로 명칭이 바뀌었어요. 같은 비용이고 한도나 규칙은 동일해요.",
  },
  {
    q: "3만 원 이하면 증빙이 필요 없나요?",
    a: "네, 3만 원 이하는 간이영수증만 있어도 경비로 인정받을 수 있어요. 3만 원 초과하면 반드시 신용카드 매출전표나 현금영수증이 필요해요.",
  },
  {
    q: "한도를 초과하면 어떻게 되나요?",
    a: "초과분은 경비로 인정 안 돼서 과세소득이 늘어나요. 법인세를 추가로 내야 하고, 미신고 시 가산세까지 붙을 수 있어요.",
  },
  {
    q: "직원 회식비도 접대비인가요?",
    a: "아니요. 직원끼리의 식사·회식은 복리후생비예요. 접대비는 외부 거래처나 고객을 대접하는 비용이에요.",
  },
  {
    q: "경조사비는 접대비에 포함되나요?",
    a: "네, 거래처 관계자의 결혼·장례 등 경조사비도 접대비로 분류돼요. 건당 20만 원까지는 적격증빙 없이도 인정받을 수 있어요.",
  },
  {
    q: "문화접대비가 뭔가요?",
    a: "영화표, 공연 티켓, 전시회 입장권 같은 문화비로 거래처를 대접하는 거예요. 일반 접대비 한도의 20%를 추가로 인정받을 수 있어서 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "법인세법 제25조 (접대비의 손금불산입)", url: "https://www.law.go.kr/법령/법인세법" },
      { label: "소득세법 시행령 (적격증빙 기준)", url: "https://www.law.go.kr/법령/소득세법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 접대비 한도 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스: 법인세 신고", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "법인세-신고-기한-세율", title: "법인세 신고 기한과 세율", description: "법인세 신고 일정과 세율 구간이에요." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "매달 원천세 신고하는 절차예요." },
  { slug: "부가세-환급-신청", title: "부가세 환급 신청 절차", description: "매입세액 공제로 부가세 환급받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 법인세 · 접대비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        접대비 한도, 법인은 얼마까지 경비 처리될까?<br />
        손금산입 기준과 적격증빙
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        거래처 식사비, 선물, 경조사비를 회사 경비로 처리하고 싶은데 한도가 얼마인지 모르겠죠?
        초과하면 경비 인정이 안 돼서 세금을 더 내야 해요.
        중소기업은 연 3,600만 원, 일반 법인은 1,200만 원이 기본한도예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>접대비 기본한도는 얼마인가요?</H2>
      <SectionBadge>기본한도</SectionBadge>

      <p style={body}>
        <a href="https://www.law.go.kr/법령/법인세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>법인세법 제25조</a>에서
        접대비(2024년부터 명칭이 &apos;업무추진비&apos;로 변경) 손금산입 한도를 정하고 있어요.
        1년 동안 이 한도 이내로 쓰면 전액 경비 처리가 가능해요.
      </p>

      <GreenBox title="기업 유형별 기본한도">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>구분</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>기본한도</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <td style={{ padding: "5px 8px", fontWeight: 600 }}>중소기업</td>
              <td style={{ padding: "5px 8px" }}>연 3,600만 원</td>
              <td style={{ padding: "5px 8px", fontSize: 12 }}>2020년부터 인상</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <td style={{ padding: "5px 8px", fontWeight: 600 }}>일반 법인</td>
              <td style={{ padding: "5px 8px" }}>연 1,200만 원</td>
              <td style={{ padding: "5px 8px", fontSize: 12 }}>중소기업 외 법인</td>
            </tr>
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        기본한도 외에 수입금액(매출)에 따른 추가한도가 있어요.
        수입금액 100억 원 이하라면 0.3%, 100~500억 원은 0.2%를 추가로 인정받아요.
        예를 들어 수입금액 50억 원인 중소기업이라면 3,600만 원 + (50억 x 0.3%) = 5,100만 원까지 경비 처리가 가능해요.
      </p>

      <Divider />

      <H2>3만 원 넘으면 반드시 증빙이 필요해요</H2>
      <SectionBadge>적격증빙</SectionBadge>

      <p style={body}>
        접대비에서 가장 자주 실수하는 부분이에요.
        3만 원을 초과하는 건 반드시 신용카드 매출전표나 현금영수증이 있어야 경비로 인정돼요.
        간이영수증만 있으면 한도 이내라도 인정 안 돼요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>적격증빙 기준</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>3만 원 이하</strong>: 간이영수증 가능</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>3만 원 초과</strong>: 신용카드 매출전표 또는 현금영수증 필수</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>경조사비</strong>: 건당 20만 원까지 적격증빙 없이 인정</p>
        <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.9 }}>
          증빙 없는 3만 원 초과 접대비 → 경비 불인정 → 과세소득 증가 → 추가 세금
        </p>
      </BorderBox>

      <p style={body}>
        문화접대비(공연·영화·전시 등)는 일반 접대비 한도의 20%를 추가로 인정받을 수 있어요.
        기본한도 3,600만 원인 중소기업이라면 720만 원을 더 쓸 수 있는 거예요.
        문화접대비도 3만 원 초과 시 적격증빙이 필요해요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>접대비 관리, 이것만 지키세요</H2>
      <SectionBadge>관리 체크리스트</SectionBadge>

      <p style={body}>
        한도를 넘기면 초과분에 대해 <a href="/w/법인세-신고-기한-세율" style={{ color: "#1D9E75", textDecoration: "underline" }}>법인세</a>를 추가로 내야 해요.
        미신고하면 가산세까지 붙으니 월별로 관리하는 습관이 중요해요.
      </p>

      <Checklist items={MANAGE_CHECKLIST} />

      <p style={{ ...body, marginTop: 14 }}>
        접대비인지 복리후생비인지 구분이 애매하면 세무사와 상담하세요.
        분류를 잘못하면 세무조사 시 지적 받을 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 법인세법 기준으로 작성됐어요. 기업 유형이나 업종에 따라 세부 기준이 다를 수 있으니 세무 전문가와 상담하세요." />
    </ArticleLayout>
  );
}
