"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 보안카드를 분실했거나 번호를 다 써서 인터넷뱅킹을 못 하는 상황
// Q2. 은행 영업점에 가서 신분증 하나로 보안카드를 즉시 재발급받는다
// Q3. 영업점 방문 즉시 발급, 온라인 신청(일부 은행), 분실 시 즉시 신고, 수수료(대부분 무료), OTP 전환 옵션
// Q4. Steps(재발급 절차) + BorderBox(은행별 비교) + GreenBox(분실 대처) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "분실했다면 즉시 분실 신고부터 해요",
    desc: "은행 앱이나 홈페이지에서 '보안카드 분실 신고' 메뉴를 찾아서 신고하세요. 고객센터 전화로도 돼요. 신고하면 해당 보안카드는 즉시 사용 정지되니까 누가 주워서 악용할 걱정이 없어요.",
    tip: "분실 신고 후에도 OTP나 간편인증이 있으면 인터넷뱅킹 가능",
  },
  {
    title: "가까운 은행 영업점에 신분증 들고 가세요",
    desc: "주민등록증이나 운전면허증 같은 신분증 하나만 있으면 돼요. 창구에서 '보안카드 재발급해 주세요'라고 하면 5분 안에 새 카드를 받을 수 있어요. 따로 신청서를 쓸 필요도 없어요.",
    tip: "점심시간(12~1시) 피하면 대기 시간 짧아요",
  },
  {
    title: "새 보안카드 수령 후 기존 카드는 폐기돼요",
    desc: "새 카드를 받는 순간 이전 보안카드는 자동 폐기돼요. 새 카드 번호로 인터넷뱅킹에 다시 등록하면 바로 사용 가능해요. 재발급 횟수 제한은 없어요.",
  },
];

const FAQS = [
  {
    q: "보안카드 재발급 수수료가 있나요?",
    a: "대부분 은행은 무료예요. KB국민은행, 신한은행, 우리은행, 하나은행 등 시중은행 전부 무료이고, 대구은행만 500원 수수료가 있어요(VIP는 무료).",
  },
  {
    q: "온라인으로 재발급받을 수 있나요?",
    a: "일부 은행은 홈페이지에서 신청하면 우편(등기)으로 보내줘요. 보통 2~3일 걸리니까 급하면 영업점 방문이 빨라요.",
  },
  {
    q: "보안카드 번호를 다 쓰면 어떻게 되나요?",
    a: "35개 번호를 전부 사용했으면 더 이상 인증이 안 돼요. 영업점에 가서 새 보안카드를 발급받거나, 이참에 OTP로 바꾸는 것도 방법이에요.",
  },
  {
    q: "보안카드 대신 OTP가 더 좋은가요?",
    a: "보안성은 OTP가 훨씬 좋아요. 30초마다 새 번호가 생성되니까 유출 위험이 적고, 번호를 다 쓸 일도 없어요. 은행에서 1~2만원에 발급받을 수 있고, 스마트폰 OTP 앱은 무료예요.",
  },
  {
    q: "보안카드 사진 찍어두면 안 되나요?",
    a: "절대 하면 안 돼요. 스마트폰에 보안카드 사진이 있으면 해킹당했을 때 전체 번호가 유출돼요. 실제로 보안카드 사진 유출로 피해를 본 사례가 많아요.",
  },
  {
    q: "타 은행 보안카드도 같은 방법인가요?",
    a: "네, 거의 동일해요. 신분증 지참해서 해당 은행 영업점에 가면 즉시 재발급돼요. 인터넷전문은행(카카오뱅크, 토스뱅크)은 보안카드 자체가 없고 앱 인증으로 처리해요.",
  },
];

const SOURCES = [
  { name: "KB국민은행 보안센터", href: "https://obank.kbstar.com/quics?page=C034929" },
  { name: "하나은행 인증/보안카드", href: "https://www.kebhana.com/cont/customer/customer01/customer0101/customer010103/index,1,list,2.jsp" },
  { name: "우리은행 보안카드", href: "https://spib.wooribank.com/pib/Dream?withyou=CQCCS0002" },
];

const RELATED = [
  { slug: "CMA계좌-금리-혜택", title: "CMA 계좌 금리 비교", description: "증권사별 CMA 금리와 활용법." },
  { slug: "예금자보호제도", title: "예금자보호제도 한도", description: "1인당 5,000만원 보호 범위와 예외." },
  { slug: "ETF-투자-초보자", title: "ETF 투자 시작하기", description: "초보자를 위한 ETF 기초와 매수법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보안카드 · 인터넷뱅킹</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보안카드 잃어버렸다면?<br />
        재발급 방법과 OTP 전환까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        인터넷뱅킹하려는데 보안카드가 어디 갔는지 모르겠죠.
      </p>
      <p style={body}>
        <strong>신분증 하나만 들고 은행에 가면 5분 만에 새로 받을 수 있어요.</strong>
        대부분 은행은 수수료도 무료예요.
        분실했다면 먼저 앱이나 고객센터로 분실 신고부터 하고, 영업점에서 재발급받으세요.
        번호를 자주 잃어버린다면 이번에 OTP로 바꾸는 것도 좋은 방법이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>보안카드 재발급, 이 순서로 하세요</H2>
      <p style={body}>
        분실과 번호 소진 모두 같은 방법이에요. 분실이면 신고부터, 번호 소진이면 바로 영업점으로 가면 돼요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="금융 정보" count={8} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>은행별 재발급 방법은 차이가 있나요?</H2>
      <p style={body}>
        영업점 방문 재발급은 모든 은행이 동일해요. 온라인 신청 가능 여부와 수수료만 약간 달라요.
      </p>

      <SectionBadge>은행별 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>은행</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>수수료</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>온라인 신청</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["KB국민은행", "무료", "가능 (우편)"],
              ["신한은행", "무료", "가능 (우편)"],
              ["우리은행", "무료", "가능 (우편)"],
              ["하나은행", "무료", "홈페이지·고객센터"],
              ["대구은행", "500원 (VIP 무료)", "불가"],
            ].map(([bank, fee, online], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{bank}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{fee}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{online}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />
      <ArticleAd position="mid" />

      <H2>분실했을 때 바로 이렇게 대처해요</H2>
      <p style={body}>
        보안카드를 잃어버리면 누군가 주워서 인터넷뱅킹에 악용할 수 있어요.
        발견 즉시 분실 신고하는 게 가장 중요해요.
      </p>

      <GreenBox>
        보안카드 분실 시 즉시 대처법{"\n"}
        · 1순위: 은행 앱 또는 고객센터로 분실 신고 (24시간 가능){"\n"}
        · 2순위: 다음 날 영업점 방문해서 재발급{"\n"}
        · 3순위: 금융감독원(1332)에 피해 사실 접수 (이상 거래 발견 시)
      </GreenBox>

      <Divider />

      <H2>보안카드 vs OTP, 뭐가 나은가요?</H2>
      <p style={body}>
        보안카드를 자주 분실하거나 번호를 빨리 쓴다면 OTP 전환을 고려해 보세요.
        OTP는 30초마다 새 번호가 자동 생성돼서 유출 위험이 거의 없어요.
      </p>

      <BorderBox>
        <strong>보안카드 vs OTP 비교</strong>{"\n"}
        · 보안카드: 무료 발급 / 35개 번호 고정 / 분실 시 유출 위험{"\n"}
        · 실물 OTP: 1~2만원 / 30초마다 새 번호 / 배터리 3~5년{"\n"}
        · 모바일 OTP: 무료(앱) / 스마트폰으로 즉시 인증 / 별도 기기 불필요
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        보안카드 재발급에서 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 주요 시중은행 기준으로 작성했어요. 은행별 정책은 수시로 변경될 수 있으니 해당 은행 홈페이지나 고객센터에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
