"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 보안카드가 불편하거나 이체 한도를 높이려고 OTP 발급을 알아보는 상황
// Q2. 디지털OTP 또는 토큰형 OTP를 발급받아서 인터넷뱅킹에 등록한다
// Q3. OTP 종류(토큰형/카드형/디지털), 발급 장소와 비용, 은행별 지원 현황, 여러 은행 공동 사용
// Q4. Steps(발급 절차) + GreenBox(비용 비교) + BorderBox(은행별 지원) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DIGITAL = [
  {
    title: "은행 앱에서 OTP 메뉴를 찾으세요",
    desc: "KB국민, 신한, 우리, 하나 등 대부분의 은행 앱에서 '보안매체 관리' 또는 'OTP 발급' 메뉴를 찾을 수 있어요. 앱 실행 후 전체 메뉴에서 '보안센터'나 'OTP'를 검색하면 빠르게 찾아요.",
    tip: "앱 업데이트 후 진행하세요",
  },
  {
    title: "본인인증을 완료하세요",
    desc: "공동인증서, 금융인증서, 간편인증 중 하나로 본인인증을 해요. 인증이 완료되면 디지털OTP 앱 설치 안내가 나와요. 금융결제원의 디지털OTP 앱을 별도로 설치해야 하는 은행도 있어요.",
    tip: "금융결제원 디지털OTP 앱: 별도 설치 필요",
  },
  {
    title: "앱 비밀번호를 등록하고 완료하세요",
    desc: "디지털OTP 앱에서 6자리 비밀번호를 설정하면 발급이 완료돼요. 이후 인터넷뱅킹이나 모바일뱅킹에서 이체할 때 디지털OTP 앱의 번호를 입력하면 돼요. 발급 비용은 무료예요.",
    tip: "비밀번호 분실 시 앱 재설치 후 재발급",
  },
];

const STEPS_TOKEN = [
  {
    title: "은행 영업점에 신분증을 가져가세요",
    desc: "주민등록증이나 운전면허증을 지참하고 가까운 영업점을 방문해요. 토큰형 OTP는 대부분의 은행에서 즉시 발급해줘요. 카드형은 재고가 있는 지점에서만 가능한 경우가 있으니 미리 전화로 확인하세요.",
    tip: "방문 전 영업점에 재고 확인",
  },
  {
    title: "OTP를 발급받고 등록하세요",
    desc: "창구에서 신분증 확인 후 바로 OTP를 받아요. 토큰형은 3,000원, 카드형은 약 10,000원이에요. 우대 등급 고객은 무료인 경우도 있어요. 발급 즉시 인터넷뱅킹에 등록까지 해줘요.",
    tip: "토큰형 3,000원 / 카드형 10,000원",
  },
  {
    title: "다른 은행에도 등록하세요",
    desc: "토큰형 OTP 하나로 여러 은행에 등록할 수 있어요. 다른 은행 인터넷뱅킹에 접속해서 'OTP 등록' 메뉴에서 기기 뒷면의 일련번호를 입력하면 돼요. 은행마다 방문 없이 온라인 등록이 가능해요.",
    tip: "토큰형 1개 = 여러 은행 공동 사용",
  },
];

const FAQS = [
  {
    q: "디지털OTP와 토큰형 OTP 중 뭐가 나아요?",
    a: "편의성은 디지털OTP가 좋아요. 무료이고 휴대폰만 있으면 되니까요. 토큰형은 배터리 걱정 없이 안정적이고 여러 은행에 바로 등록할 수 있어요. 해외에서도 쓸 수 있고요. 이체 금액이 크거나 여러 은행을 쓰면 토큰형이 편해요.",
  },
  {
    q: "OTP 분실하면 어떻게 해요?",
    a: "즉시 은행에 분실 신고를 하세요. 토큰형은 영업점 방문해서 재발급받고, 디지털OTP는 앱 삭제 후 재설치하면 돼요. 분실 신고하면 기존 OTP가 즉시 무효화되니까 다른 사람이 쓸 수 없어요.",
  },
  {
    q: "OTP 발급하면 이체 한도가 올라가나요?",
    a: "맞아요. 보안카드는 1일 이체 한도가 보통 1억원이지만, OTP를 등록하면 5억원까지 올릴 수 있는 은행이 많아요. 은행마다 차이가 있으니 발급 후 한도 변경 신청을 별도로 하세요.",
  },
  {
    q: "OTP 배터리가 다 되면 어떻게 해요?",
    a: "토큰형 OTP 배터리 수명은 보통 3~5년이에요. 화면이 흐려지거나 안 보이면 영업점에서 새 기기로 교체해야 해요. 비용은 처음 발급과 동일해요. 디지털OTP는 배터리 걱정이 없고요.",
  },
  {
    q: "모든 은행에서 디지털OTP를 지원하나요?",
    a: "아직 전체 은행이 지원하는 건 아니에요. KB국민, 신한, 우리, iM뱅크, 신협 등에서 사용 가능하고, 하나은행은 자체 모바일OTP를 운영해요. 본인 거래 은행의 지원 여부를 먼저 확인하세요.",
  },
];

const RELATED = [
  { slug: "금융인증서-공동인증서-차이", title: "금융인증서와 공동인증서 차이", description: "어떤 인증서를 써야 하는지 비교." },
  { slug: "예금자보호제도", title: "예금자보호제도", description: "은행 예금 5,000만원 보호 범위." },
  { slug: "CMA계좌-금리-혜택", title: "CMA계좌 금리 혜택", description: "단기 자금 굴리기 좋은 CMA." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · OTP · 보안</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        OTP 발급, 어디서 어떻게 받나요?<br />
        종류별 비용과 발급 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "보안카드 번호 찾는 게 너무 번거로운데, OTP로 바꾸면 편해지나요?"
      </p>
      <p style={body}>
        OTP 하나면 보안카드 없이 간편하게 이체할 수 있어요.
        <strong>디지털OTP는 은행 앱에서 무료로 발급</strong>받고, 토큰형은 영업점에서 3,000원이면 발급 가능해요.
        이체 한도도 올라가니까 큰 금액을 보내야 할 때 꼭 필요해요.
        <a href="/w/금융인증서-공동인증서-차이" style={{ color: "#1D9E75", textDecoration: "underline" }}>인증서</a>와 함께 쓰면 보안이 더 강력해지고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>OTP 종류별 비용과 특징이 달라요</H2>
      <p style={body}>
        OTP는 크게 토큰형, 카드형, 디지털OTP 세 가지예요. 토큰형은 열쇠고리 모양 기기이고, 카드형은 신용카드 크기예요. 디지털OTP는 스마트폰 앱으로 쓰는 거예요.
      </p>

      <SectionBadge>종류별 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>토큰형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>카드형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>디지털OTP</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["비용", "3,000원", "~10,000원", "무료"],
              ["발급 장소", "영업점", "영업점", "은행 앱"],
              ["여러 은행 등록", "가능", "가능", "은행별 다름"],
              ["배터리 수명", "3~5년", "3~5년", "없음 (앱)"],
              ["휴대성", "보통", "좋음", "매우 좋음"],
            ].map(([item, token, card, digital], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{token}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{card}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{digital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="금융 정보" count={10} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>디지털OTP 발급은 앱에서 5분이면 돼요</H2>
      <p style={body}>
        디지털OTP는 영업점에 갈 필요 없이 은행 앱에서 바로 발급받을 수 있어요. 비용도 무료이고 발급 절차가 간단해서 가장 많이 선택하는 방식이에요.
      </p>

      <Steps steps={STEPS_DIGITAL} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>토큰형 OTP는 영업점에서 발급받으세요</H2>
      <p style={body}>
        여러 은행을 동시에 쓰거나 해외에서 이체가 필요한 분은 토큰형이 편해요. 기기 하나로 모든 은행에 등록할 수 있거든요. 발급은 가까운 은행 영업점에서 바로 가능해요.
      </p>

      <Steps steps={STEPS_TOKEN} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준으로 작성했어요. 은행별 OTP 지원 범위와 비용은 변동될 수 있으니 거래 은행에 확인하세요." />
    </ArticleLayout>
  );
}
