"use client";
// Q1. 해외 주재원·파견인데 자녀 학비를 연말정산에서 공제받을 수 있는지 궁금한 상황이에요.
// Q2. 본인 상황이 공제 대상인지 판단하고, 서류를 준비해서 연말정산에 반영하는 행동.
// Q3. 공제 대상자 범위(근무관련 유학 vs 자비유학), 학교급별 한도(300만원/900만원), 필요 서류, 간소화 미조회 대응법.
// Q4. EligibilityChecker(공제 대상 판단) + GreenBox(한도 요약) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";
import { Steps } from "@/components/article-ui/Steps";

const ELIGIBILITY_ITEMS = [
  { id: "overseas", label: "해외파견·주재원으로 근무 중이에요" },
  { id: "child", label: "자녀가 기본공제 대상자(소득 100만원 이하)예요" },
  { id: "school", label: "유치원~고교 정규과정에 다니고 있어요" },
  { id: "insurance", label: "고용보험·국민연금 가입된 근로자예요" },
];

const STEPS = [
  { title: "해외학교에서 서류 발급", desc: "재학증명서와 교육비 납입증명서를 학교에 요청해요. 영문 서류가 기본이에요.", tip: "한글 번역본도 함께 준비하면 처리가 빨라요" },
  { title: "파견증명 확인", desc: "회사 인사팀에서 해외파견 증명서를 발급받아요. 근무관련 유학이면 필수 서류예요." },
  { title: "회사에 제출", desc: "연말정산 시 교육비 영수증과 함께 제출해요. 간소화에서 안 뜨니까 직접 제출해야 해요." },
  { title: "홈택스 확인", desc: "공제 반영 여부를 홈택스에서 확인해요. 누락됐으면 경정청구로 돌려받을 수 있어요." },
];

const FAQS = [
  { q: "자비유학으로 해외 대학 보낸 자녀도 공제되나요?", a: "안 돼요. 자비유학 대학은 공제 대상이 아니에요. 유치원~고교까지만 연 300만원 한도로 공제 가능하고, 근무관련 유학이 아닌 대학은 빠져요." },
  { q: "해외 어학연수도 교육비 공제 대상인가요?", a: "아니요. 어학연수는 정규과정이 아니라서 공제 대상에서 제외돼요. 정규 학위과정만 해당해요." },
  { q: "해외 교육비는 간소화 서비스에서 조회되나요?", a: "대부분 안 떠요. 해외 교육기관이 국세청에 자료를 제출하지 않기 때문이에요. 직접 서류를 챙겨서 회사에 제출해야 해요." },
  { q: "환율은 어떻게 적용하나요?", a: "교육비를 실제로 납부한 날의 기준환율을 적용해요. 납부일 환율로 원화 환산해서 공제 한도와 비교해요." },
  { q: "공제율이 15%라면 실제로 얼마 돌려받나요?", a: "유치원~고교 300만원 한도 기준, 300만원 x 15% = 45만원이 세액에서 빠져요. 본인 해외 대학원(근무관련)은 한도 없이 전액의 15%를 공제받아요." },
  { q: "본인이 해외 대학원에 다니는 것도 공제되나요?", a: "회사 발령으로 해외 근무하면서 대학원에 다니면 근무관련 유학으로 인정돼요. 이 경우 한도 없이 전액 15% 세액공제를 받아요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국세청 교육비 세액공제 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40633&cntntsId=239024" },
    { label: "소득세법 제59조의4 (교육비 세액공제)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "찾기쉬운 생활법령정보 - 유학비용 세액공제", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=699&ccfNo=3&cciNo=6&cnpClsNo=1" },
  ]},
];

const RELATED = [
  { slug: "연말정산-교육비-세액공제", title: "연말정산 교육비 세액공제", description: "국내 교육비 공제 한도와 대상을 정리했어요." },
  { slug: "연말정산-대학교-등록금-공제", title: "연말정산 대학교 등록금 공제", description: "대학 등록금 공제 조건과 한도를 알아봐요." },
  { slug: "연말정산", title: "연말정산 가이드", description: "연말정산 전체 흐름과 공제 항목을 한눈에 볼 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 교육비 · 해외</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 해외교육비, 공제될까?<br />
        대상 조건부터 서류 준비까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해외 주재원으로 나갔는데 아이 학비도 공제받을 수 있는지 궁금하셨죠?
        해외교육비는 조건이 까다로워요. 근무관련 유학이거나 유치원~고교 정규과정이어야 하고,
        자비유학 대학은 빠져요. 누가 공제받을 수 있고, 서류는 어떻게 챙겨야 하는지 정리해드릴게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>내가 공제 대상인지 확인해봐요</H2>
      <p style={body}>
        해외교육비 공제는 <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의4</a>에 따라
        근무관련 유학이거나 유치원~고교 정규과정에 다니는 자녀가 대상이에요.
        아래 항목에 모두 해당하면 공제받을 수 있어요.
      </p>

      <SectionBadge>공제 자격 체크</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="해외교육비 세액공제 대상이에요! 서류를 준비해서 회사에 제출하세요."
        partialMatchText="일부 조건이 안 맞을 수 있어요. 해당 항목을 다시 확인해보세요."
      />

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>공제 한도와 금액은 얼마나 되나요?</H2>
      <p style={body}>
        학교급과 유학 유형에 따라 한도가 달라요. 공제율은 모두 15%예요.
        유치원~고교는 연 300만원, 대학은 연 900만원 한도가 있어요.
        본인이 근무관련으로 해외 대학원에 다니면 한도 없이 전액 공제돼요.
      </p>

      <GreenBox>
        공제 한도 핵심 정리예요.<br />
        · 유치원~고교(자녀): 연 <strong>300만원</strong> 한도 → 최대 45만원 환급<br />
        · 대학(자녀, 근무관련): 연 <strong>900만원</strong> 한도 → 최대 135만원 환급<br />
        · 본인 대학원(근무관련): <strong>한도 없음</strong> → 전액 × 15%<br />
        · 자비유학 대학: <strong>공제 불가</strong>
      </GreenBox>

      <p style={body}>
        예를 들어 해외 고등학교 학비가 연 500만원이면, 한도인 300만원 × 15% = 45만원을 세액에서 돌려받아요.
        본인이 회사 지원으로 해외 MBA를 다니면 등록금 전액의 15%가 공제돼요.
      </p>

      <Divider />

      <H2>서류 준비와 신청 절차</H2>
      <p style={body}>
        해외교육비는 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 간소화에서 대부분 안 떠요.
        직접 서류를 챙겨야 해요. 아래 순서대로 준비하세요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <BorderBox>
        <strong>필요 서류 목록</strong><br /><br />
        · 재학증명서 (해외학교 발급, 영문)<br />
        · 교육비 납입증명서 (해외학교 발급)<br />
        · 해외파견 증명서 (회사 발급, 근무관련 유학 시)<br />
        · 번역본 (필요 시 한글 번역 + 공증)
      </BorderBox>

      <Divider />

      <H2>이런 경우는 공제 안 돼요</H2>
      <p style={body}>
        조건에서 빠지는 경우가 꽤 있어요. 미리 확인하고 착오 없도록 하세요.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>공제 가능 (O)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>공제 불가 (X)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["해외파견 중 자녀 유치원~고교", "자비유학 대학"],
              ["주재원 자녀 정규과정", "어학연수·단기 캠프"],
              ["본인 해외 대학원(근무관련)", "개인 유학 대학"],
              ["자비유학 유치원~고교(300만원 한도)", "부모 한국 거주, 자녀만 해외 대학"],
            ].map(([yes, no], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", color: "#1D9E75" }}>O {yes}</td>
                <td style={{ padding: "9px 12px", color: "#ef4444" }}>X {no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        자녀가 기본공제 대상자(연 소득금액 100만원 이하)여야 교육비 공제가 적용돼요.
        자녀가 아르바이트 등으로 소득이 100만원을 넘기면 공제 대상에서 빠지니 주의하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 세법 개정 시 공제 한도·대상이 달라질 수 있으니 국세청 공식 사이트에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
