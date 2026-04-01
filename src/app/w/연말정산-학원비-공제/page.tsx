"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 아이 학원비가 연말정산에서 공제되는지, 취학전만 되는지 궁금한 상황
// Q2. 취학전 아동 학원비 300만원 한도 15% 공제를 빠짐없이 신청하고 영수증을 확보한다
// Q3. 취학전만 가능한 이유, 300만원 한도(유치원비 합산), 대상 학원 종류, 입학연도 1~2월 처리, 영수증 확보
// Q4. GreenBox(결론) + 비교 테이블(가능/불가) + Steps(신청절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스 간소화서비스에서 먼저 조회하세요",
    desc: "일부 학원은 간소화서비스에 자동 등록돼 있어요. 1월 15일 이후 홈택스에서 교육비 항목을 조회해 보세요. 자녀 이름으로 학원비가 뜨면 그대로 다운로드하면 돼요.",
    tip: "모든 학원이 자동 조회되는 건 아니에요",
  },
  {
    title: "조회 안 되면 학원에 교육비 납입증명서를 요청하세요",
    desc: "간소화에서 안 뜨는 학원은 직접 교육비 납입증명서를 받아야 해요. 학원명, 사업자등록번호, 수강자(자녀) 이름, 수강 기간, 금액, 학원 직인이 들어간 서류예요.",
  },
  {
    title: "회사에 교육비 영수증을 제출하세요",
    desc: "간소화 PDF와 직접 받은 납입증명서를 함께 회사 인사팀에 제출하면 돼요. 교육비 세액공제란에 취학전 아동 교육비로 잡혀요.",
  },
];

const FAQS = [
  {
    q: "초등학생 학원비는 왜 공제 안 되나요?",
    a: "정부가 사교육비를 세금으로 지원하지 않겠다는 정책이에요. 취학전 아동만 보육 차원에서 학원비를 교육비로 인정해주고, 초중고 학생 학원비는 공제 대상에서 빠져요.",
  },
  {
    q: "방문학습지(빨간펜, 구몬 등)도 공제 되나요?",
    a: "안 돼요. 사업자등록된 정식 학원에서 주 1회 이상 정기 교습을 받는 경우만 공제돼요. 방문학습지, 개인과외, 온라인 교육은 대상이 아니에요.",
  },
  {
    q: "유치원비와 학원비를 합산하나요?",
    a: "네, 취학전 아동의 유치원비·어린이집비·학원비를 합산해서 연 300만원 한도예요. 유치원비가 200만원이면 학원비는 100만원까지만 공제돼요.",
  },
  {
    q: "초등학교 입학하는 해 1~2월 학원비는요?",
    a: "공제돼요. 3월 입학 전까지는 취학전 아동이에요. 1~2월 학원비는 교육비 공제 대상이고, 3월부터는 초등학생이라 학원비 공제가 안 돼요.",
  },
  {
    q: "자녀가 여러 명이면 한도가 늘어나나요?",
    a: "네, 자녀별로 각각 300만원 한도예요. 취학전 아이가 2명이면 최대 600만원(자녀당 300만원)까지 공제 대상이에요. 자녀별로 따로 계산해요.",
  },
  {
    q: "학원비 영수증을 안 받으면 어떻게 되나요?",
    a: "영수증 없이는 공제를 못 받아요. 간소화에서 안 뜨는 학원은 반드시 직접 납입증명서를 받아 두세요. 12월에 미리 요청하는 게 좋아요.",
  },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "소득세법 시행령 제118조의6", href: "https://www.law.go.kr/법령/소득세법시행령" },
];

const RELATED = [
  { slug: "연말정산-교육비-세액공제", title: "연말정산 교육비 세액공제", description: "초중고·대학 교육비 공제 한도와 대상." },
  { slug: "연말정산-취학전-아동-교육비", title: "취학전 아동 교육비", description: "유치원·어린이집·학원비 교육비 공제." },
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 핵심 공제." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 . 교육비 . 학원비 공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        학원비도 연말정산 공제 되나요?<br />
        취학전 아동만 300만원 한도로 공제
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "태권도, 영어 학원비도 연말정산에서 돌려받을 수 있나요?"
      </p>
      <p style={body}>
        <strong>취학전 아동(초등학교 입학 전)</strong>이면 가능해요. 태권도, 피아노, 미술, 영어 학원비가 <strong>연 300만원 한도로 15% 세액공제</strong>돼요.
        최대 <strong>45만원 환급</strong>. 다만 초중고 학생 학원비는 안 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>누가 공제받고, 누가 못 받나요?</H2>
      <p style={body}>
        학원비 공제의 핵심은 <strong>나이</strong>예요. 취학 전인지 아닌지가 갈림길이에요.
      </p>

      <SectionBadge>대상별 공제 가능 여부</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대상</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>학원비 공제</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["취학전 아동 (7세 이하, 미입학)", "O", "연 300만원 한도, 15%"],
              ["초등학생", "X", "학원비 공제 불가"],
              ["중·고등학생", "X", "학원비 공제 불가"],
              ["대학생", "X", "등록금만 공제 가능"],
              ["성인 본인", "X", "직업훈련비만 별도 가능"],
            ].map(([target, eligible, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, background: "#fafafa" }}>{target}</td>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: eligible === "O" ? "#1D9E75" : "#dc2626" }}>{eligible}</td>
                <td style={{ padding: "10px 12px" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>어떤 학원이 공제 대상이에요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 시행령 제118조의6</a>에 따라 사업자등록된 정식 학원에서 주 1회 이상 정기 교습을 받는 비용이 해당돼요.
      </p>

      <SectionBadge>공제 가능 vs 불가 학원</SectionBadge>
      <BorderBox title="학원 종류별 공제 여부">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li><strong>공제 가능</strong>: 태권도, 피아노, 미술, 영어, 수영, 발레, 축구교실 등 정식 학원</li>
          <li><strong>공제 불가</strong>: 방문학습지(빨간펜, 구몬), 개인과외, 일부 온라인 교육</li>
        </ul>
      </BorderBox>

      <GreenBox title="유치원비와 합산 300만원">
        유치원비·어린이집비·학원비를 합산해서 자녀 1인당 연 300만원 한도예요. 유치원비 200만원이면 학원비는 100만원까지만 공제.
      </GreenBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>학원비 공제, 이렇게 신청하세요</H2>
      <p style={body}>
        학원비는 간소화에서 자동 조회 안 되는 경우가 많아요. 직접 챙겨야 놓치지 않아요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>초등 입학 연도, 몇 월까지 공제되나요?</H2>
      <p style={body}>
        3월에 입학한다면 <strong>1~2월 학원비까지만 공제</strong>돼요. 3월부터는 초등학생이라 학원비 공제가 끝나요.
      </p>

      <SectionBadge>입학 연도 구분</SectionBadge>
      <BorderBox title="입학 연도 학원비 공제">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>1~2월 학원비: <strong>취학전 아동</strong> → 공제 가능</li>
          <li>3월~ 학원비: <strong>초등학생</strong> → 공제 불가</li>
        </ul>
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <CategoryButton label="연말정산 글 더보기" href="/w" />
      <RelatedArticles items={RELATED} />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 일반적인 안내예요. 개인 상황에 따라 다를 수 있으니 국세청(126) 또는 세무사와 상담하세요." />
    </ArticleLayout>
  );
}
