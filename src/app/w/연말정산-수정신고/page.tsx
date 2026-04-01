"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산 끝났는데 공제를 빠뜨리거나 잘못 신고한 걸 발견해서 어떻게 정정하는지 알고 싶은 상황
// Q2. 홈택스에서 경정청구(환급) 또는 수정신고(추가납부)를 직접 완료한다
// Q3. 수정신고 vs 경정청구 차이, 5년 기한, 홈택스 신청 경로, 가산세 감면 조건
// Q4. GreenBox(핵심 차이) + Steps(홈택스 절차) + Checklist(누락 점검) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스에 로그인하세요",
    desc: "홈택스(hometax.go.kr)에 공동인증서나 간편인증으로 접속해요. 로그인 후 '세금신고 > 종합소득세 신고 > 근로소득 신고'로 이동하면 경정청구와 수정신고 메뉴가 나와요.",
    tip: "모바일 손택스 앱에서도 가능해요",
  },
  {
    title: "경정청구 또는 수정신고를 선택하세요",
    desc: "세금을 더 냈으면 '경정청구', 덜 냈으면 '수정신고'를 선택해요. 경정청구는 환급받는 거고, 수정신고는 추가 납부하는 거예요. 귀속연도를 선택하면 기존 신고 내역이 자동으로 불러와져요.",
    tip: "2025년 귀속이면 귀속연도 2025 선택",
  },
  {
    title: "빠뜨린 공제를 추가하거나 잘못된 항목을 수정하세요",
    desc: "의료비, 교육비, 신용카드 등 누락된 공제 항목을 추가로 입력해요. 중복 공제받은 항목은 삭제하고요. 변경된 내용에 따라 환급액이나 추가 납부세액이 자동으로 계산돼요.",
  },
  {
    title: "신고서를 제출하고 결과를 확인하세요",
    desc: "수정된 신고서를 전자 제출하면 끝이에요. 경정청구는 접수 후 보통 2~3개월 내에 환급금이 본인 계좌로 입금돼요. 수정신고는 제출 즉시 부족한 세금을 납부할 수 있어요.",
    tip: "환급 진행 상황은 홈택스 '조회/발급'에서 확인",
  },
];

const CHECKLIST = [
  "간소화서비스에서 누락된 의료비 영수증이 없는지 재확인",
  "부양가족 중복 공제 여부 점검 (부부가 같은 자녀를 각각 공제받진 않았는지)",
  "신용카드·체크카드 사용액 중 빠진 항목이 없는지 확인",
  "기부금 영수증 누락 여부 확인",
  "주택자금 공제(월세, 전세대출) 빠뜨리지 않았는지 점검",
  "귀속연도 기준 5년 이내인지 확인 (5년 지나면 경정청구 불가)",
];

const FAQS = [
  {
    q: "수정신고와 경정청구, 뭐가 다른 건가요?",
    a: "수정신고는 세금을 덜 냈을 때(추가 납부), 경정청구는 세금을 더 냈을 때(환급) 하는 거예요. 공제를 빠뜨렸으면 경정청구, 공제를 중복으로 받았으면 수정신고예요.",
  },
  {
    q: "경정청구하면 환급금은 언제 들어오나요?",
    a: "접수 후 보통 2~3개월 내에 본인 계좌로 입금돼요. 홈택스에서 진행 상황을 조회할 수 있고, 세무서에서 추가 서류를 요청하면 처리가 좀 더 걸릴 수 있어요.",
  },
  {
    q: "회사를 통해서도 정정할 수 있나요?",
    a: "네, 인사팀에 요청하면 회사가 국세청에 수정 신고를 대신해줄 수 있어요. 다만 퇴사했거나 회사가 거부하면 본인이 홈택스에서 직접 해야 해요.",
  },
  {
    q: "수정신고를 안 하면 어떻게 되나요?",
    a: "국세청이 조사해서 적발되면 무신고 가산세(20%)와 납부지연 가산세(하루 0.022%)가 붙어요. 자진 수정신고하면 가산세가 50~90% 감면되니까 빨리 하는 게 유리해요.",
  },
  {
    q: "5년이 지나면 정말 못 받나요?",
    a: "네, 국세기본법상 경정청구 기한은 법정신고기한으로부터 5년이에요. 예를 들어 2025년 귀속 연말정산은 2031년 5월 31일까지 경정청구할 수 있어요. 그 이후에는 불가해요.",
  },
  {
    q: "여러 해 치를 한꺼번에 경정청구할 수 있나요?",
    a: "네, 5년 이내라면 여러 귀속연도를 각각 경정청구할 수 있어요. 2021년~2025년 귀속분까지 빠뜨린 공제가 있으면 연도별로 따로 신청하면 돼요.",
  },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "국세기본법", href: "https://www.law.go.kr/법령/국세기본법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-경정청구", title: "연말정산 경정청구 방법", description: "공제 빠뜨렸을 때 환급받는 절차." },
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 핵심 공제 항목." },
  { slug: "연말정산-환급금-조회", title: "연말정산 환급금 조회", description: "내 환급금이 얼마인지 확인하는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 . 수정신고 . 경정청구</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 공제 빠뜨렸다면?<br />
        수정신고와 경정청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "연말정산 끝났는데 의료비를 빠뜨렸어요. 이제 못 받는 건가요?"
      </p>
      <p style={body}>
        아니에요, <strong>5년 이내</strong>라면 <strong>경정청구</strong>로 돌려받을 수 있어요.
        반대로 공제를 중복으로 받아서 세금을 덜 냈다면 <strong>수정신고</strong>로 추가 납부하는 거예요.
        <a href="/w/연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>연말정산</a> 끝났다고 끝이 아니에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>수정신고 vs 경정청구, 핵심 차이는?</H2>
      <p style={body}>
        이름이 비슷해서 헷갈리지만 방향이 정반대예요. 세금을 더 냈는지, 덜 냈는지에 따라 갈려요.
      </p>

      <SectionBadge>핵심 비교</SectionBadge>
      <GreenBox title="한 줄 구분법">
        <strong>경정청구</strong> = 세금 더 냄 → 환급받기 | <strong>수정신고</strong> = 세금 덜 냄 → 추가 납부하기. 둘 다 홈택스에서 직접 신청해요.
      </GreenBox>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>경정청구</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>수정신고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["언제?", "세금을 더 냈을 때", "세금을 덜 냈을 때"],
              ["결과", "환급(돌려받기)", "추가 납부"],
              ["기한", "5년 이내", "제한 없음 (빠를수록 유리)"],
              ["가산세", "없음", "자진 신고 시 50~90% 감면"],
              ["흔한 사례", "의료비·교육비 누락", "부양가족 중복 공제"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, background: "#fafafa" }}>{label}</td>
                <td style={{ padding: "10px 12px" }}>{a}</td>
                <td style={{ padding: "10px 12px" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>홈택스에서 경정청구·수정신고하는 절차</H2>
      <p style={body}>
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 직접 할 수 있어요. 회사를 통해 요청하는 것보다 더 빠르고, 퇴사 후에도 가능하죠.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>경정청구 전, 빠뜨린 항목 없는지 점검하세요</H2>
      <p style={body}>
        한 번 경정청구할 때 놓친 항목을 몰아서 넣는 게 좋아요. 나중에 또 빠뜨리면 다시 신청해야 하거든요.
        <a href="/w/연말정산-의료비-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>의료비 공제</a>나
        <a href="/w/연말정산-교육비-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}> 교육비 공제</a>를 놓치는 경우가 제일 많아요.
      </p>

      <SectionBadge>누락 점검 리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자진 수정신고하면 가산세가 줄어들어요</H2>
      <p style={body}>
        잘못 공제받은 걸 발견했다면 국세청이 찾기 전에 먼저 수정신고하세요. <a href="https://www.law.go.kr/법령/국세기본법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세기본법</a>에 따라 자진 수정신고하면 가산세가 크게 줄어요.
      </p>

      <SectionBadge>가산세 감면 비율</SectionBadge>
      <BorderBox title="자진 수정신고 시 가산세 감면">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>법정신고기한 후 <strong>1개월 이내</strong>: 가산세 <strong>90% 감면</strong></li>
          <li>1개월 초과 ~ <strong>3개월 이내</strong>: <strong>75% 감면</strong></li>
          <li>3개월 초과 ~ <strong>6개월 이내</strong>: <strong>50% 감면</strong></li>
          <li>6개월 초과 ~ <strong>1년 이내</strong>: <strong>30% 감면</strong></li>
          <li>1년 초과 ~ <strong>2년 이내</strong>: <strong>20% 감면</strong></li>
          <li>2년 초과: <strong>10% 감면</strong></li>
        </ul>
      </BorderBox>
      <p style={body}>
        빨리 할수록 유리해요. 국세청 조사 통보를 받은 뒤에는 감면이 안 되니까요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <CategoryButton label="연말정산" count={20} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 일반적인 안내이며, 개인 상황에 따라 다를 수 있어요. 정확한 세무 판단은 국세청(126) 또는 세무사와 상담하세요." />
    </ArticleLayout>
  );
}
