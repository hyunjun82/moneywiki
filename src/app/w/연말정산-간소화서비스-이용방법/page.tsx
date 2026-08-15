"use client";
// Q1. 회사에서 연말정산 서류 제출 요청이 왔는데 간소화서비스를 어떻게 이용해서 PDF를 제출해야 할지 모르는 상황
// Q2. 홈택스에서 자료 조회하고 PDF 다운로드해서 회사에 제출, 누락 자료 직접 챙기기
// Q3. 1월 15일 개통, 20일 이후 조회 권장, 부양가족 동의 필요, 안경·교복 등 직접 챙길 항목
// Q4. 조회 항목 표 + 누락 항목 표로 한 번에 파악
// MAP-INTRO: 연말정산 서류 제출 요청이 왔는데 어디서 뭘 해야 할지 모르겠죠
// MAP-TYPE: 절차
// MAP-H2: 간소화서비스 이용 순서 > 조회 항목 > 누락 항목 직접 챙기기 > 부양가족 동의 > FAQ
// MAP-COMP: Steps > table > BorderBox > GreenBox > FAQ

"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스 로그인 (1월 15일 이후)",
    desc: "홈택스(hometax.go.kr)에 접속해서 공동인증서 또는 간편인증(카카오톡·네이버·PASS)으로 로그인해요. 요즘은 간편인증이 더 편해서 많이 써요. 손택스 앱에서도 동일하게 이용 가능해요.",
    tip: "1월 20일 이후 조회하면 추가 자료까지 반영돼서 더 정확해요",
  },
  {
    title: "연말정산 간소화 메뉴 진입",
    desc: "로그인 후 '장려금·연말정산·전자기부금' 메뉴 → '연말정산 간소화'로 들어가세요. 귀속연도를 2025년으로 선택하고 '전체 조회'를 클릭하면 의료비·교육비·카드 등 모든 자료가 한 번에 조회돼요.",
    tip: "귀속연도 = 급여를 받은 연도 (2025년 급여 → 귀속연도 2025년)",
  },
  {
    title: "부양가족 자료 동의 확인",
    desc: "배우자·자녀·부모 등 부양가족 자료를 조회하려면 동의가 필요해요. 성인 부양가족은 본인이 홈택스에서 '자료제공 동의'를 해야 하고, 미성년 자녀는 부모가 대신 동의할 수 있어요. 동의는 1월 15일 이전에 미리 해두는 게 좋아요.",
    tip: "연간 소득 100만원 초과(근로소득만 있으면 총급여 500만원 초과) 부양가족은 기본공제 불가",
    link: { label: "연말정산 부양가족 공제 조건 보기", href: "/w/연말정산-부양가족-공제" },
  },
  {
    title: "PDF 다운로드 후 회사 제출",
    desc: "조회 화면 아래 '한꺼번에 내려받기' 또는 'PDF 저장' 버튼을 클릭하면 전체 공제 자료가 PDF로 저장돼요. 파일을 이메일로 보내거나 회사 시스템에 업로드하면 돼요. 홈택스에서 회사로 직접 전송하는 기능도 있어요.",
    tip: "출력이 필요한 회사도 있으니 미리 확인하세요",
  },
];

const PROVIDED_ITEMS = [
  { item: "신용·체크카드 사용액", note: "전통시장·대중교통 구분 포함" },
  { item: "현금영수증", note: "카드 합산 조회" },
  { item: "의료비", note: "병원·약국·한의원·안경점(시력교정용)" },
  { item: "교육비", note: "학원비·대학 등록금·유치원비" },
  { item: "보험료", note: "보장성 보험, 연금저축" },
  { item: "기부금", note: "기부금영수증 없어도 조회 가능" },
];

const NOT_PROVIDED = [
  { item: "안경·콘택트렌즈 구입비", action: "안경점에서 영수증 직접 수령" },
  { item: "교복 구입비", action: "구입처에서 영수증 수령 (연 50만원 한도)" },
  { item: "장애인증명서", action: "의료기관에서 직접 발급" },
  { item: "해외 교육기관 교육비", action: "재학증명서 + 납입증명서 수령" },
  { item: "월세 세액공제 서류", action: "임대차계약서 + 이체 내역 준비" },
];

const CHECKLIST = [
  "1월 20일 이후 홈택스 접속해서 전체 조회",
  "부양가족 자료제공 동의 미리 받기 (1월 15일 이전 권장)",
  "안경·교복 등 간소화서비스 미제공 항목 영수증 직접 챙기기",
  "소득 있는 부양가족 기본공제 여부 먼저 확인",
  "PDF 다운로드 후 회사 제출 방법(이메일·직접 전송) 확인",
  "연말정산 가산세 주의: 잘못 공제받으면 추가 납부",
];

const FAQS = [
  {
    q: "간소화서비스는 언제 개통되나요?",
    a: "매년 1월 15일에 개통돼요. 하지만 1월 20일 이후에 조회해야 추가 자료까지 반영돼서 더 정확해요. 회사 제출 기한이 15~20일 사이라면 일단 조회 후 20일에 다시 확인하세요.",
  },
  {
    q: "안경이나 교복 구입비도 조회되나요?",
    a: "안 돼요. 안경·콘택트렌즈·교복비는 간소화서비스에서 제공되지 않아요. 구입처에서 영수증을 직접 받아야 해요. 시력교정용 안경은 공제 가능하고, 교복은 학생 1명당 연 50만원 한도예요.",
  },
  {
    q: "부양가족 자료는 어떻게 조회하나요?",
    a: "부양가족이 홈택스에서 '자료제공 동의'를 해야 조회 가능해요. 성인은 본인 직접, 미성년 자녀는 부모가 대신 동의해요. 동의 후 24시간 내외로 반영돼요.",
  },
  {
    q: "손택스 앱에서도 PDF를 받을 수 있나요?",
    a: "네, 손택스 앱에서도 자료 조회와 PDF 다운로드가 모두 가능해요. 다운로드된 파일을 카카오톡이나 이메일로 바로 보낼 수 있어요. 화면이 작아서 세부 내용 확인은 PC가 더 편해요.",
  },
  {
    q: "간소화서비스에서 안 나오는 의료비가 있나요?",
    a: "있어요. 일부 소규모 병원이나 한의원은 국세청에 자료를 늦게 제출하는 경우가 있어요. 1월 20일 이후에도 없다면 해당 기관에서 직접 영수증을 받아야 해요.",
  },
  {
    q: "회사로 직접 전송은 어떻게 하나요?",
    a: "조회 화면에서 '회사로 자료 전송' 버튼을 클릭하고 회사 사업자등록번호를 입력하면 돼요. 회사가 이 시스템을 사용한다면 PDF 없이도 바로 제출 가능해요. 회사 담당자에게 먼저 확인하세요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청 홈택스: 연말정산 간소화", url: "https://www.hometax.go.kr" },
      { label: "국세청: 연말정산 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-부양가족-공제", title: "연말정산 부양가족 공제 조건", description: "부양가족 기본공제 받으려면 소득 요건이 중요해요." },
  { slug: "의료비-세액공제", title: "의료비 세액공제 받는 방법", description: "의료비 공제율과 한도, 누락 자료 챙기는 방법이에요." },
  { slug: "연말정산-가산세", title: "연말정산 가산세 주의사항", description: "잘못 공제받으면 가산세가 붙어요. 주의할 항목 정리예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>
        세금 · 연말정산 · 간소화서비스
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 간소화서비스 이용 방법<br />
        조회부터 PDF 제출, 누락 항목까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연말정산 서류 제출 요청이 왔는데 어디서 뭘 해야 할지 모르겠죠.
        홈택스 간소화서비스에서{" "}
        <a href="/w/연말정산-부양가족-공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          부양가족 동의
        </a>만 미리 받아두면 클릭 몇 번으로 PDF를 받아 제출할 수 있어요.
        조회 방법부터 안경·교복 등 누락 항목 챙기는 법까지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>간소화서비스 이용 순서 4단계</H2>
      <p style={body}>
        1월 15일 개통되지만 20일 이후에 조회하는 게 더 정확해요.
        병원·학원이 자료를 늦게 제출하는 경우가 있어서 20일 이후에 추가 자료가 반영돼요.
        부양가족 동의는 1월 15일 이전에 미리 받아두는 게 좋아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>간소화서비스에서 조회되는 항목</H2>
      <p style={body}>
        의료비, 교육비, 카드 사용액, 보험료 등 대부분의 공제 자료가 자동으로 조회돼요.
        다만 일부 항목은 간소화서비스에서 제공되지 않아서 직접 챙겨야 해요.
        놓치면 공제를 못 받으니 꼭 확인하세요.
      </p>

      <SectionBadge>조회 가능 항목</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {PROVIDED_ITEMS.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{row.item}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "#6b7280" }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionBadge>직접 챙겨야 하는 항목</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#fef2f2" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #dc2626", fontWeight: 600 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #dc2626", fontWeight: 600 }}>준비 방법</th>
            </tr>
          </thead>
          <tbody>
            {NOT_PROVIDED.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#dc2626" }}>{row.item}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "#374151" }}>{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        안경·교복 구입비는 간소화서비스에 안 나와요.<br />
        구입처에서 영수증이나 현금영수증을 직접 받아야 해요.<br />
        월세 세액공제도 임대차계약서+이체 내역을 직접 준비해야 해요.
      </BorderBox>

      <GreenBox>
        1월 20일 이후 조회 → 부양가족 동의 확인 → 누락 항목 영수증 수령 → PDF 다운로드 후 제출<br />
        이 순서로 하면 공제 자료를 빠짐없이 챙길 수 있어요
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>연말정산 간소화서비스 체크리스트</H2>
      <p style={body}>
        한 번에 챙기기 위한 체크리스트예요.
        특히 잘못 공제받으면 나중에{" "}
        <a href="/w/연말정산-가산세" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          가산세
        </a>가 붙으니 부양가족 소득 요건을 꼭 먼저 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        간소화서비스 이용 시 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 개통일·제출 기한은 매년 달라질 수 있으니 국세청(126) 또는 홈택스에서 최신 일정을 확인하세요." />
    </ArticleLayout>
  );
}
