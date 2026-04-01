"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 주담대 이자를 매달 100만원씩 내는 직장인이 연말정산에서 얼마나 공제받을 수 있는지 확인하려는 상황
// Q2. 내 대출 조건(상환기간·금리유형)에 맞는 공제 한도를 파악하고 홈택스에서 정확히 반영한다
// Q3. 한도 600~2,000만원, 기준시가 6억 이하, 15년+고정+비거치 = 2,000만원, 대환대출 가능
// Q4. GreenBox(한도 표) + BorderBox(계산 예시) + Checklist(공제 조건 점검) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "무주택 또는 1주택 세대주인지 확인",
  "취득 당시 기준시가 6억원 이하인지 확인",
  "대출 상환기간이 10년 이상인지 확인",
  "고정금리인지 변동금리인지 확인",
  "비거치식(원리금균등/원금균등) 분할상환인지 확인",
  "소유권 등기일로부터 3개월 이내 차입했는지 확인",
  "대환대출 시 기존 대출 조건이 유지되는지 확인",
];

const FAQS = [
  {
    q: "변동금리 대출이면 공제 한도가 달라지나요?",
    a: "네. 15년 이상 상환이라도 변동금리면 800만원 한도예요. 고정금리 + 비거치식이면 2,000만원까지 올라가요. 대출 갈아탈 때 고정금리로 바꾸면 한도가 커져요.",
  },
  {
    q: "원금은 공제 안 되나요?",
    a: "맞아요. 이자 상환액만 공제 대상이에요. 원금 상환분은 소득공제가 안 돼요. 매달 납입하는 금액 중 이자 부분만 해당돼요.",
  },
  {
    q: "대환대출(갈아타기)해도 공제받을 수 있나요?",
    a: "네. 기존 대출을 상환하고 새 대출로 갈아타도 요건을 충족하면 계속 공제돼요. 새 대출의 상환기간이 10년 이상이고 나머지 조건을 만족하면 돼요.",
  },
  {
    q: "기준시가 6억원은 어디서 확인하나요?",
    a: "국토교통부 부동산 공시가격 알리미(realtyprice.kr)에서 확인할 수 있어요. 취득 당시 기준시가가 6억원 이하여야 하니까 매매 시점 공시가격을 확인하세요.",
  },
  {
    q: "부부 공동명의면 누가 공제받나요?",
    a: "대출 채무자가 공제받아요. 공동명의 주택이라도 대출은 한 명 명의인 경우가 많은데, 그 대출 명의자가 공제를 받아요. 부부 각각 대출이 있으면 각자 공제 가능하고요.",
  },
  {
    q: "전세대출 이자도 같은 공제인가요?",
    a: "아니에요. 전세대출은 주택임차차입금 원리금상환 소득공제로 별도 항목이에요. 한도가 400만원이고 원금+이자 모두 포함돼요. 주담대 이자 공제와는 다른 항목이에요.",
  },
];

const SOURCES = [
  { name: "국세청 장기주택저당차입금", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40608&cntntsId=239020" },
  { name: "소득세법 제52조", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "부동산공시가격 알리미", href: "https://www.realtyprice.kr" },
];

const RELATED = [
  { slug: "연말정산-전세대출-이자", title: "전세대출 이자 소득공제 방법", description: "주택임차차입금 400만원 한도 공제." },
  { slug: "연말정산", title: "연말정산 가이드", description: "소득공제와 세액공제 전체 구조 이해하기." },
  { slug: "주택담보대출-계산기", title: "주택담보대출 이자 계산기", description: "월 상환액과 총 이자 계산." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 주택담보대출 · 소득공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주담대 이자, 연말정산에서 얼마나 빼줘요?<br />
        공제 한도 최대 2,000만원 조건 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매달 주담대 이자만 100만원씩 나가는데, 이걸 연말정산에서 돌려받을 수 있냐고요?
      </p>
      <p style={body}>
        주택담보대출 이자는 <strong>소득공제</strong> 대상이에요. 15년 이상 고정금리 비거치식이면 <strong>최대 2,000만원</strong>까지 공제돼요.
        연 이자 1,000만원에 세율 24%라면 <strong>약 240만원 절세</strong>가 가능해요.
        대출 조건에 따라 한도가 600만원~2,000만원으로 달라지니까 내 조건을 먼저 확인해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>대출 조건별 공제 한도가 이렇게 달라요</H2>
      <p style={body}>
        공제 한도는 <strong>상환기간</strong>과 <strong>금리유형</strong>, <strong>상환방식</strong> 세 가지 조합으로 결정돼요.
        15년 이상에 고정금리+비거치식이면 최대 한도를 받을 수 있어요.
      </p>

      <SectionBadge>상환 조건별 공제 한도</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>상환기간</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>금리·상환 조건</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>연 공제 한도</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["10년 이상", "고정금리 또는 비거치식", "600만원"],
              ["15년 이상", "조건 없음", "800만원"],
              ["15년 이상", "고정금리 또는 비거치식", "1,800만원"],
              ["15년 이상", "고정금리 + 비거치식 모두", "2,000만원"],
            ].map(([period, condition, limit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{period}</td>
                <td style={{ padding: "9px 12px" }}>{condition}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        핵심 포인트{"\n"}
        · 소득공제라서 실제 절세액 = 공제금액 × 내 세율{"\n"}
        · 세율 24%면 공제 1,000만원 → 절세 240만원{"\n"}
        · 원금 상환분은 공제 안 됨, 이자만 해당
      </GreenBox>

      <p style={body}>
        변동금리 대출을 쓰고 있다면 대환 시 고정금리로 전환하면 한도가 확 올라가요.
        실제 금액으로 계산해 볼게요.
      </p>

      <CategoryButton label="연말정산 가이드" count={30} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>실제로 얼마나 절세되는지 계산해 봐요</H2>
      <p style={body}>
        소득공제는 세액공제와 달리 내 세율에 따라 절세액이 달라져요. 세율이 높을수록 효과가 커요.
      </p>

      <SectionBadge>절세 시뮬레이션</SectionBadge>
      <BorderBox>
        <strong>예시 1: 연봉 6,000만원, 이자 1,200만원, 15년+고정+비거치</strong>{"\n"}
        · 공제 한도: 2,000만원{"\n"}
        · 공제 대상: 1,200만원 (실제 이자){"\n"}
        · 세율 24% 적용: 1,200만 × 24% = <strong>약 288만원 절세</strong>{"\n\n"}
        <strong>예시 2: 연봉 4,500만원, 이자 800만원, 15년 변동금리</strong>{"\n"}
        · 공제 한도: 800만원{"\n"}
        · 공제 대상: 800만원{"\n"}
        · 세율 15% 적용: 800만 × 15% = <strong>약 120만원 절세</strong>{"\n\n"}
        <strong>예시 3: 연봉 8,000만원, 이자 2,500만원, 15년+고정+비거치</strong>{"\n"}
        · 공제 한도: 2,000만원{"\n"}
        · 공제 대상: 2,000만원 (한도 적용){"\n"}
        · 세율 35% 적용: 2,000만 × 35% = <strong>약 700만원 절세</strong>
      </BorderBox>

      <p style={body}>
        고소득자일수록 소득공제 효과가 커져요. 연봉 8,000만원이면 같은 이자를 내도 절세액이 3배 가까이 차이 나요.
        그런데 공제받으려면 먼저 몇 가지 조건을 충족해야 해요.
      </p>

      <Divider />

      <H2>공제받으려면 이 조건을 전부 만족해야 해요</H2>
      <p style={body}>
        주담대 이자 공제는 조건이 까다로운 편이에요. 하나라도 안 맞으면 공제가 아예 안 되니까 미리 점검하세요.
        특히 기준시가 6억원과 상환기간 10년을 놓치는 경우가 많아요.
      </p>

      <SectionBadge>공제 요건 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <BorderBox>
        <strong>2024년부터 바뀐 점</strong>{"\n"}
        · 기준시가 5억원 → <strong>6억원</strong>으로 완화{"\n"}
        · 최대 공제 한도 1,800만원 → <strong>2,000만원</strong>으로 확대{"\n"}
        · 2024년 1월 1일 이후 차입분부터 적용
      </BorderBox>

      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40608&cntntsId=239020" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 장기주택저당차입금 안내</a>에서 세부 요건을 확인할 수 있어요.
        <a href="/w/연말정산-전세대출-이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>전세대출 이자</a>는 별도 항목(400만원 한도)이니까 혼동하지 마세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        주담대 이자 공제에서 실제로 헷갈리는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 공제 한도와 기준시가 요건은 세법 개정에 따라 달라질 수 있으니 최신 기준은 국세청에서 확인해 주세요." />
    </ArticleLayout>
  );
}
