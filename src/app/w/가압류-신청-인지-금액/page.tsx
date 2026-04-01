"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 돈을 못 받아서 가압류 신청하려는데 비용이 얼마나 드는지 모르는 상황
// Q2. 가압류 신청에 필요한 전체 비용(인지대+송달료+담보금)을 파악하고 전자소송으로 신청한다
// Q3. 인지대 정액 1만원, 전자소송 10% 할인, 송달료 15,600원+, 담보금 채권액의 10~40%
// Q4. GreenBox(비용 요약) + Steps(신청 절차) + DocTable(서류) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "전자소송 사이트에 회원가입하세요",
    desc: "대법원 전자소송(ecfs.scourt.go.kr)에 접속해서 회원가입해요. 공동인증서나 간편인증으로 본인 확인하면 바로 이용 가능해요. 인지대 10% 할인에 24시간 접수도 되니까 전자소송이 훨씬 편해요.",
    tip: "인지대 9,000원 (방문 시 10,000원)",
    link: { label: "전자소송 바로가기", href: "https://ecfs.scourt.go.kr" },
  },
  {
    title: "가압류 신청서를 작성하세요",
    desc: "전자소송에서 '가압류 신청서' 양식을 선택하고 채권금액, 채무자 정보, 가압류 대상 재산을 입력해요. 소명자료(차용증, 계약서, 문자 내역 등)를 PDF로 첨부하면 돼요.",
    tip: "채무자 주소를 정확히 기재해야 송달이 돼요",
  },
  {
    title: "인지대 + 송달료를 결제하세요",
    desc: "신청서 작성 후 결제 화면에서 인지대 9,000원 + 송달료(채무자 1명 기준 15,600원)를 카드나 계좌이체로 납부해요. 채무자가 여러 명이면 송달료가 그만큼 늘어요.",
    tip: "송달료 = 5,200원 × 3회 × 채무자 수",
  },
  {
    title: "담보제공 결정을 받으세요",
    desc: "법원이 가압류 결정을 내리면서 담보 금액을 정해줘요. 보통 채권금액의 10~40%예요. 현금공탁이나 보증보험 중 선택해서 담보를 제공하면 가압류가 집행돼요.",
    tip: "보증보험이 편하지만 보험료(연 1~2%) 발생",
  },
];

const DOCS = [
  { name: "가압류 신청서", required: true, where: "전자소송 양식 또는 법원 민원실" },
  { name: "소명자료 (차용증, 계약서 등)", required: true, where: "본인 보관 서류" },
  { name: "채무자 주소 확인 서류", required: true, where: "등기부등본, 주민등록초본 등" },
  { name: "수입인지 10,000원", required: true, where: "우체국 구매 (전자소송 시 온라인 결제)" },
  { name: "송달료 납부 영수증", required: true, where: "법원 수납 또는 전자결제" },
  { name: "담보제공 증명서", required: true, where: "공탁서 또는 보증보험증권" },
];

const CHECKLIST = [
  "채권금액 확인 / 정확한 청구 금액 산정",
  "전자소송 vs 방문 신청 결정 / 전자소송이 10% 절약",
  "송달료 계산 / 채무자 수 × 5,200원 × 3회",
  "담보 방법 결정 / 현금공탁 vs 보증보험",
  "소명자료 준비 / 차용증, 문자, 계약서 등 PDF 변환",
];

const FAQS = [
  {
    q: "채권금액 10억이어도 인지대가 1만원이에요?",
    a: "맞아요. 가압류는 금액에 관계없이 정액 10,000원이에요. 일반 민사소송은 소가에 비례해서 인지대가 올라가지만, 가압류는 임시 조치라서 정액이에요.",
  },
  {
    q: "담보금은 돌려받을 수 있나요?",
    a: "네. 본안소송에서 승소 확정되면 담보취소 신청을 해서 돌려받을 수 있어요. 현금공탁은 공탁금 회수 절차, 보증보험은 보험 종료로 처리돼요.",
  },
  {
    q: "부동산 가압류는 비용이 더 드나요?",
    a: "등록면허세와 등기 수수료가 추가로 들어요. 채권금액의 약 0.2% 정도예요. 1억원 가압류면 약 20만원 추가 비용이 발생해요.",
  },
  {
    q: "변호사 없이 혼자 할 수 있나요?",
    a: "할 수 있어요. 전자소송 양식을 따라 작성하면 되고, 모르는 게 있으면 대한법률구조공단(132)에서 무료 상담받을 수 있어요.",
  },
  {
    q: "가압류 신청하면 바로 재산이 묶이나요?",
    a: "법원이 결정을 내리고 담보를 제공하면 그때부터 집행돼요. 빠르면 신청 후 1~3일 이내에 결정이 나와요. 긴급한 경우 즉일 처리도 가능해요.",
  },
  {
    q: "가압류 후에 본안소송을 꼭 해야 하나요?",
    a: "네. 가압류는 임시 조치예요. 보통 가압류 결정 후 2주 이내에 본안소송(돈 갚으라는 소송)을 제기해야 해요. 안 하면 가압류가 취소될 수 있어요.",
  },
];

const SOURCES = [
  { name: "민사소송 등 인지법", href: "https://www.law.go.kr/법령/민사소송등인지법" },
  { name: "대법원 전자소송", href: "https://ecfs.scourt.go.kr" },
  { name: "대한법률구조공단", href: "https://www.klac.or.kr" },
];

const RELATED = [
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "공인중개사 거래 신고 절차." },
  { slug: "공인중개사-업무범위", title: "공인중개사 업무범위", description: "중개사가 할 수 있는 일." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부", description: "부동산 취득세 세율 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률 · 가압류 · 소송비용</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        가압류 신청, 비용이 얼마나 들까요?<br />
        인지대부터 담보금까지 전체 비용 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "돈 받을 방법을 찾다가 가압류를 알게 됐는데, 비용이 많이 들까요?"
      </p>
      <p style={body}>
        가압류 인지대는 채권금액에 상관없이 <strong>정액 10,000원</strong>이에요. 전자소송으로 하면 <strong>9,000원</strong>이고요.
        다만 인지대만으로 끝나는 게 아니에요. 송달료, 담보제공금까지 합치면 실제 비용은 채권금액의 10~40% 수준이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>가압류 전체 비용, 한눈에 보기</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/민사소송등인지법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사소송 등 인지법</a>에 따르면 가압류 인지대는 정액이에요.
        비용 항목별로 정리하면 이렇게 돼요.
      </p>

      <SectionBadge>항목별 비용</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>금액</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["인지대", "10,000원 (전자 9,000원)", "금액 무관 정액"],
              ["송달료", "15,600원~", "채무자 1명 × 3회분"],
              ["담보제공금", "채권액의 10~40%", "부동산 10%, 예금 40%"],
              ["등기비용 (부동산)", "채권액의 약 0.2%", "부동산 가압류 시만"],
            ].map(([item, amount, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{amount}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        1억원 부동산 가압류 예시{"\n"}
        인지대 9,000원 + 송달료 15,600원 + 담보금 1,000만원 + 등기 20만원{"\n"}
        = 총 약 1,022만원 (담보금은 승소 후 돌려받아요)
      </GreenBox>

      <CategoryButton label="법률 정보" count={6} href="/category/법률" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>전자소송으로 신청하는 방법</H2>
      <p style={body}>
        <a href="https://ecfs.scourt.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대법원 전자소송</a>을 이용하면 인지대 10% 할인에 법원 방문도 필요 없어요.
        24시간 접수 가능하고 진행 상황도 온라인으로 확인할 수 있죠.
      </p>

      <SectionBadge>신청 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>어떤 서류를 준비해야 하나요?</H2>
      <p style={body}>
        서류 하나라도 빠지면 보정 명령이 내려와서 시간이 지체돼요.
        미리 다 챙겨서 한 번에 접수하는 게 좋아요.
      </p>

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>신청 전에 체크하세요</H2>
      <p style={body}>
        가압류는 속도가 중요해요. 채무자가 재산을 빼돌리기 전에 신속하게 신청해야 하니까
        아래 항목을 미리 정리해두세요.
      </p>

      <Checklist items={CHECKLIST} />

      <BorderBox title="무료 상담">
        대한법률구조공단(전화 132)에서 가압류 절차 무료 상담을 받을 수 있어요.
        법원 민원실에서도 인지대·송달료 정확한 금액을 안내받을 수 있고요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 민사소송 등 인지법으로 작성됐어요. 담보금 비율은 사안에 따라 법원이 개별 결정해요." />
    </ArticleLayout>
  );
}
