"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 부동산 계약서나 대출 계약서를 쓰는데 인지세를 붙여야 하는지, 얼마를 내야 하는지 모르는 사람
// Q2. 계약 금액에 맞는 인지세를 확인하고 전자수입인지로 납부한다
// Q3. 세액표(1천만~10억 초과별 2~35만원), 전자수입인지 구매 방법, 납부 시기, 과태료(미납 300%)
// Q4. GreenBox(세액표) + Steps(납부 절차) + BorderBox(과태료) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "전자수입인지 사이트에 접속하세요",
    desc: "전자수입인지 발급 시스템(e-revenuestamp.or.kr)에 접속해요. 회원가입 또는 비회원으로도 구매할 수 있어요. 홈택스에서도 인지세 메뉴를 통해 구매 가능해요.",
    tip: "비회원 구매도 가능",
    link: { label: "전자수입인지 사이트", href: "https://www.e-revenuestamp.or.kr" },
  },
  {
    title: "인지세 금액과 문서 종류를 선택하세요",
    desc: "계약 금액에 맞는 인지세 금액을 선택하고, 문서 종류(부동산 매매, 금전소비대차 등)를 선택해요. 종이문서용 또는 전자문서용을 고를 수 있어요.",
    tip: "종이 계약서 = 종이문서용, 전자 계약서 = 전자문서용",
  },
  {
    title: "결제하고 기재번호를 받으세요",
    desc: "신용카드나 계좌이체로 결제하면 전자수입인지 기재번호가 발급돼요. 이 번호를 계약서에 적으면 인지세 납부가 완료돼요. 종이 인지처럼 붙이는 게 아니라 번호만 기재하면 돼요.",
    tip: "기재번호로 국세청에서 납부 확인 가능",
  },
  {
    title: "계약서에 기재번호, 납부일, 금액을 적으세요",
    desc: "계약서 하단에 전자수입인지 기재번호, 납부 일자, 납부 금액을 기재해요. 계약서 서명 전에 인지세를 먼저 납부하고 기재하는 순서가 맞아요.",
    tip: "서명 전에 인지세 납부 → 기재 → 서명 순서",
  },
];

const FAQS = [
  {
    q: "전세 계약서에도 인지세를 붙여야 하나요?",
    a: "네, 1천만원 초과하는 전세 계약서에는 인지세를 붙여야 해요. 3억원 전세라면 인지세 15만원이에요. 1천만원 이하 계약은 면제돼요.",
  },
  {
    q: "인지세는 누가 내나요?",
    a: "계약 당사자가 연대해서 내요. 특별한 약정이 없으면 반반씩 부담하는 게 일반적이에요. 전세 계약이라면 임대인과 임차인이 각각 절반씩 내요.",
  },
  {
    q: "계약서를 2부 작성하면 인지세도 2번 내나요?",
    a: "네, 계약서 1부당 인지세가 붙어요. 3억원 전세 계약서 2부를 작성하면 15만원 x 2 = 30만원이에요. 한 부에만 붙이면 안 돼요.",
  },
  {
    q: "인지세 안 붙이면 과태료가 얼마나 되나요?",
    a: "미납 세액의 최대 300%예요. 15만원 인지세를 안 붙이면 과태료 45만원이 나와요. 자진 신고하면 경감돼요. 3개월 내 100%, 6개월 내 200%, 그 이후 300%예요.",
  },
  {
    q: "인지세를 이미 냈는데 계약이 취소됐어요. 환급되나요?",
    a: "네, 계약 해제 후 5년 이내에 홈택스에서 환급 신청하면 돌려받을 수 있어요. 인지를 잘못 붙인 경우나 초과 납부한 경우에도 환급 가능해요.",
  },
  {
    q: "월세 계약서에도 인지세가 붙나요?",
    a: "월세 보증금이 1천만원을 초과하면 인지세 대상이에요. 보증금 500만원짜리 월세 계약은 면제예요. 월세 금액 자체는 인지세 계산에 포함하지 않고 보증금만 기준이에요.",
  },
];

const SOURCES = [
  { name: "국세청 인지세", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2293&cntntsId=7705" },
  { name: "전자수입인지 발급", href: "https://www.e-revenuestamp.or.kr" },
  { name: "인지세법", href: "https://www.law.go.kr/법령/인지세법" },
];

const RELATED = [
  { slug: "부동산-매매-절차-계약-등기-순서", title: "부동산 매매 절차", description: "계약부터 등기까지 전체 순서 정리." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부", description: "부동산 살 때 내는 취득세 세율과 기한." },
  { slug: "부동산등기부-열람-발급-방법", title: "등기부등본 열람 방법", description: "인터넷등기소에서 발급하는 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 &middot; 인지세 &middot; 전자수입인지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약서 인지세, 얼마를 어떻게 내나?<br />
        금액별 세액표와 전자수입인지 납부 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "부동산 계약서에 인지세를 붙여야 한다는데, 얼마를 어떻게 내나요?"
      </p>
      <p style={body}>
        계약 금액에 따라 <strong>2만원~35만원</strong>이에요. 전자수입인지를 온라인으로 구매해서 계약서에 기재번호만 적으면 끝이에요. 안 붙이면 과태료가 <strong>미납액의 최대 300%</strong>나 되니까 꼭 챙기세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>계약 금액별 인지세가 얼마인지 보세요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/인지세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>인지세법</a>에 따라 계약 금액 구간별로 정해져 있어요. 금액이 클수록 인지세도 커져요.
      </p>

      <SectionBadge>인지세 세액표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>계약 금액</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>인지세</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1천만원 이하", "면제"],
              ["1천만원 초과 ~ 3천만원 이하", "2만원"],
              ["3천만원 초과 ~ 5천만원 이하", "4만원"],
              ["5천만원 초과 ~ 1억원 이하", "7만원"],
              ["1억원 초과 ~ 10억원 이하", "15만원"],
              ["10억원 초과", "35만원"],
            ].map(([range, tax], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{range}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{tax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        3억원 아파트 전세 계약이라면 인지세는 <strong>15만원</strong>이에요. 5천만원 이하 원룸 전세는 <strong>4만원</strong>이고요. 1천만원 이하 계약은 아예 면제예요.
      </p>

      <CategoryButton label="세금 정보" count={12} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>전자수입인지로 납부하는 방법이에요</H2>
      <p style={body}>
        요즘은 종이 인지 대신 전자수입인지를 온라인으로 구매해요. 계약서에 기재번호만 적으면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>안 붙이면 과태료가 얼마나 되나요?</H2>
      <p style={body}>
        인지세 과태료는 매우 무거워요. 시간이 지날수록 커지니까 깜빡했더라도 빨리 납부하는 게 이득이에요.
      </p>

      <SectionBadge>과태료 감면 기준</SectionBadge>
      <BorderBox>
        <strong>자진 신고 시 과태료율</strong>{"\n"}
        &middot; 계약일로부터 3개월 내: 미납액의 100%{"\n"}
        &middot; 3개월 초과 ~ 6개월 내: 미납액의 200%{"\n"}
        &middot; 6개월 초과: 미납액의 300%{"\n\n"}
        인지세 15만원을 6개월 넘겨서 적발되면 과태료 45만원 + 인지세 15만원 = 총 60만원이에요.
      </BorderBox>

      <GreenBox>
        인지세 납부 시기{"\n"}
        &middot; 원칙: 계약서 작성 시(서명 전) 즉시 납부{"\n"}
        &middot; 사업자 후납: 다음 달 10일까지 일괄 납부 가능{"\n"}
        &middot; 환급: 계약 해제 시 5년 내 홈택스에서 신청
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 인지세법을 바탕으로 작성했어요. 세액표와 과태료는 법 개정에 따라 변경될 수 있으니 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
