"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 퇴거할 때 집주인이 보증금에서 원상복구비를 빼겠다고 하는데, 어디까지가 정당한 공제인지 모르는 임차인
// Q2. 정당한 공제 항목을 확인하고, 부당한 공제는 증빙 요청하거나 분쟁조정위에 신청한다
// Q3. 공제 가능 항목(연체 월세, 과실 파손), 공제 불가 항목(자연 노후, 통상 손모), 감가상각 계산법, 분쟁 대응 방법(132)
// Q4. GreenBox(공제 가능/불가) + BorderBox(감가상각 예시) + Steps(분쟁 대응) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "공제 내역서와 증빙을 요청하세요",
    desc: "임대인이 공제하겠다고 하면 항목별 금액과 견적서·영수증을 달라고 하세요. 증빙 없이 구두로만 '50만원 뺄게요' 하면 거부할 수 있어요. 문자나 카톡으로 요청하면 증거도 남아요.",
  },
  {
    title: "감가상각 적용 여부를 따져보세요",
    desc: "임차인 과실로 파손된 것이라도 사용 연수만큼 감가상각해야 해요. 장판을 5년 쓰고 파손했으면 내용연수 8년 기준으로 잔존가치(37.5%)만 공제가 맞아요. 전액 공제를 요구하면 부당해요.",
  },
  {
    title: "협의가 안 되면 분쟁조정위에 신청하세요",
    desc: "임대차분쟁조정위원회 전화번호는 132예요. 무료이고 조정 결과에 법적 효력이 있어요. 한국소비자원(1372)에도 상담할 수 있어요.",
    link: { label: "정부24 임대차 분쟁조정", href: "https://www.gov.kr/portal/service/serviceInfo/PTR000050545" },
  },
  {
    title: "그래도 안 되면 보증금반환청구소송을 해요",
    desc: "소액사건(3,000만원 이하)이면 변호사 없이 직접 소송할 수 있어요. 내용증명을 먼저 보내고, 14일 이내 반환이 없으면 법원에 지급명령을 신청하세요.",
  },
];

const FAQS = [
  {
    q: "벽지 변색은 임차인이 물어야 하나요?",
    a: "아니에요. 벽지 변색은 자연 노후(경년열화)에 해당해서 임차인 책임이 아니에요. 대법원 판례에서도 통상 손모는 임대인 부담이라고 판시했어요.",
  },
  {
    q: "장판 교체비를 전액 공제하겠다고 하면?",
    a: "부당해요. 임차인 과실이라도 감가상각을 적용해야 해요. 장판 내용연수는 5~8년이고, 사용 기간만큼 감가한 잔존가치만 공제할 수 있어요.",
  },
  {
    q: "청소비도 공제 대상인가요?",
    a: "전문 청소가 필요한 수준(음식물 심한 오염, 반려동물 냄새 등)이면 공제 가능해요. 일반적인 퇴거 후 청소는 임차인이 직접 하면 되고, 공제 대상이 아니에요.",
  },
  {
    q: "증빙 없이 공제하겠다고 하면 어떻게 해요?",
    a: "거부하면 돼요. '견적서나 영수증 없이는 공제에 동의할 수 없다'고 문자로 통보하세요. 증빙 없는 공제는 법적으로 효력이 없어요.",
  },
  {
    q: "정산서에 도장 찍으면 나중에 다툴 수 없나요?",
    a: "정산서에 '정산 완료' 문구가 있고 양측이 서명했다면 나중에 뒤집기 어려워요. 서명 전에 항목별 금액을 꼼꼼히 확인하고, 이의가 있으면 서명하지 마세요.",
  },
  {
    q: "보증금 안 주면 열쇠 안 줘도 되나요?",
    a: "네, 보증금 반환과 명도(퇴거)는 동시이행 관계예요. 보증금을 주지 않으면 집을 비워줄 의무도 없어요. 다만 특약으로 달리 정했으면 예외예요.",
  },
];

const SOURCES = [
  { name: "민법 제618조", href: "https://www.law.go.kr/법령/민법" },
  { name: "대한법률구조공단", href: "https://www.klac.or.kr" },
  { name: "정부24 임대차 신고", href: "https://www.gov.kr/portal/service/serviceInfo/PTR000050545" },
];

const RELATED = [
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "계약 후 30일 이내 거래신고 절차." },
  { slug: "공인중개사-업무범위", title: "공인중개사 업무 범위", description: "중개사가 해야 할 일과 해서는 안 되는 일." },
  { slug: "아파트-관리사무소장-업무-역할", title: "아파트 관리사무소장 역할", description: "관리비 관련 문제 해결 창구." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 보증금 · 임대차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보증금에서 뭘 공제할 수 있나요?<br />
        정당한 공제와 부당한 공제 구분법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴거할 때 집주인이 보증금에서 이것저것 빼겠다고 하면 당황스럽죠.
      </p>
      <p style={body}>
        연체 월세, 임차인 과실 파손은 공제 가능하지만 <strong>벽지 변색, 장판 마모 같은 자연 노후는 공제 불가</strong>예요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법</a>과 대법원 판례 모두 통상 손모는 임대인 부담이라고 보고 있어요.
        과도한 공제를 요구받으면 <strong>증빙을 요청</strong>하고, 안 되면 임대차분쟁조정위원회(132)에 신청하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>공제 가능한 것과 불가능한 것, 딱 나눠요</H2>
      <p style={body}>
        핵심 기준은 하나예요. <strong>임차인 잘못이면 공제 가능, 자연스러운 닳음이면 공제 불가</strong>예요.
      </p>

      <GreenBox>
        공제 가능 항목{"\n"}
        · 연체 월세, 미납 관리비, 미납 공과금{"\n"}
        · 임차인 과실로 인한 파손(벽에 구멍, 유리 깨짐 등){"\n"}
        · 무단 구조 변경 복구비{"\n"}
        · 계약서상 약정 위약금
      </GreenBox>

      <BorderBox>
        <strong>공제 불가능 항목</strong>{"\n"}
        · 벽지 변색, 장판 마모 (자연 노후·경년열화){"\n"}
        · 가전 노후 (에어컨 성능 저하 등){"\n"}
        · 임대인 수리 의무 항목 (누수, 보일러 고장 등){"\n"}
        · 증빙 없는 과도한 원상복구비
      </BorderBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>감가상각은 이렇게 적용해요</H2>
      <p style={body}>
        임차인 과실이라도 사용 기간만큼 감가상각해야 공정해요.
        오래 쓴 장판을 파손했다고 새 장판 비용 전액을 물리면 부당한 거예요.
      </p>

      <SectionBadge>감가상각 계산 예시</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>내용연수</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>5년 사용 시 잔존가치</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["도배", "3~5년", "0% (내용연수 초과)"],
              ["장판", "5~8년", "37.5% (8년 기준)"],
              ["보일러", "10~15년", "66.7% (15년 기준)"],
              ["싱크대", "10~15년", "66.7% (15년 기준)"],
            ].map(([item, years, value], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{years}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        장판 교체비가 50만원인데 5년 사용했다면, 8년 내용연수 기준으로 잔존가치 37.5%인 <strong>18.75만원만 공제</strong>가 맞아요.
        50만원 전액 공제를 요구하면 거부하세요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>부당한 공제, 이 순서로 대응하세요</H2>
      <p style={body}>
        임대인이 터무니없는 금액을 요구할 때 단계별로 대응하는 방법이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        보증금 공제에서 실제로 분쟁이 많은 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 민법과 대법원 판례 기준으로 작성했어요. 개별 계약 조건이나 특약에 따라 달라질 수 있으니 분쟁 시 법률 전문가 상담을 권장해요." />
    </ArticleLayout>
  );
}
