"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 대출 상담 중 DSR/DTI 용어를 처음 듣고 내 대출 한도가 얼마인지 모르는 상황
// Q2. DSR 계산해서 추가로 빌릴 수 있는 금액이 얼마인지 파악하는 것
// Q3. DSR vs DTI 차이, 40% 규제 의미, 계산 공식, 스트레스DSR 3단계
// Q4. 비교표(DSR vs DTI) + 계산 예시 BorderBox + GreenBox(핵심)

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "DSR 40%가 정확히 무슨 뜻인가요?",
    a: "연소득의 40%까지만 대출 상환에 쓸 수 있다는 거예요. 연봉 5천만원이면 연간 2천만원, 월 약 167만원까지만 모든 대출 원리금을 갚는 데 쓸 수 있어요. 이 안에서 빌릴 수 있는 금액이 결정돼요.",
  },
  {
    q: "DSR 계산할 때 전세대출도 포함되나요?",
    a: "포함돼요. 주택담보대출, 신용대출, 전세대출, 마이너스통장까지 모든 대출의 원리금이 들어가요. DTI는 기타 대출의 이자만 보는데, DSR은 원리금 전체를 보기 때문에 더 까다로워요.",
  },
  {
    q: "1가구 2주택자는 대출을 아예 못 받나요?",
    a: "주택 구매 목적 주택담보대출은 2025년 6월부터 사실상 금지됐어요. 생활 자금이나 사업 자금 목적 대출은 여전히 가능해요. 1주택자가 추가 집을 사면서 대출받으려면 기존 집을 6개월 이내에 팔아야 하고, 수도권은 6개월 내 전입도 필수예요.",
  },
  {
    q: "스트레스 DSR이 뭔가요?",
    a: "실제 금리가 아닌 더 높은 금리를 가정해서 DSR을 계산하는 방식이에요. 나중에 금리가 오를 때를 대비해 미리 더 보수적으로 계산하는 거예요. 2025년 7월부터 3단계가 시행돼서 수도권은 스트레스 금리 3.0%를 추가로 얹어 계산해요.",
  },
  {
    q: "DSR이 40%를 넘으면 대출이 완전히 불가능한가요?",
    a: "은행 대출은 40%가 기준이에요. 다만 1억원 이하 소액 대출은 DSR 70%까지 가능해요. 비은행권(저축은행, 캐피탈)은 DSR 50%까지 가능하지만 금리가 높아요. 정책 대출(버팀목, 디딤돌)은 DSR 대신 DTI를 적용해서 조건이 다를 수 있어요.",
  },
  {
    q: "DTI는 이제 안 쓰나요?",
    a: "여전히 쓰는 곳이 있어요. 주택도시기금 정책 대출(버팀목전세대출, 디딤돌대출)은 DTI를 적용해요. 대부분 시중 은행 대출은 DSR로 바뀌었지만, 서민 지원 목적 정책 대출은 DSR보다 완화된 DTI를 유지하고 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융위원회: 가계대출 관리방안 (2025.6)", url: "https://www.fsc.go.kr/no010101/79514" },
    ],
  },
];

const RELATED = [
  { slug: "주택담보대출", title: "주택담보대출 종류와 금리", description: "주담대 고정금리·변동금리 차이와 DSR 적용 기준을 정리했어요." },
  { slug: "신용대출", title: "신용대출 한도와 금리", description: "신용대출도 DSR에 포함돼요. 대출 전 한도 계산 방법이에요." },
  { slug: "전세자금대출", title: "전세자금대출 종류와 조건", description: "전세대출도 DSR에 포함돼요. 버팀목·시중은행 상품 비교예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 대출 규제 · DSR</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DSR DTI 차이와 계산 방법,<br />
        40% 규제 의미
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        대출 알아보다가 DSR이랑 DTI 때문에 막혔나요? 둘 다 "얼마나 갚을 수 있나"를 보는 기준이에요.
        DSR이 더 까다로운 이유는 모든 대출 원리금을 다 보기 때문이에요.{" "}
        <a href="https://www.fsc.go.kr/no010101/79514" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융위원회 가계대출 관리방안</a>에 따라
        2025년 7월부터 스트레스 DSR 3단계가 적용돼서 대출 한도가 더 줄었어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>DSR과 DTI, 뭐가 다른가요?</H2>
      <p style={body}>
        쉽게 보면 DTI는 주택담보대출만 집중해서 보고, DSR은 모든 대출을 다 봐요.
        DTI는 주담대 원리금 + 기타 대출 이자만 계산하는데,
        DSR은 주담대·신용대출·전세대출·마이너스통장 모두 원리금으로 계산해요.
      </p>

      <SectionBadge>DSR vs DTI 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>DSR</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>DTI</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "계산 범위", dsr: "모든 대출 원리금 전체", dti: "주담대 원리금 + 기타 대출 이자" },
              { label: "기타 대출 계산 방식", dsr: "원리금(이자+원금) 전부", dti: "이자만" },
              { label: "적용 기준", dsr: "은행 40%, 비은행 50%", dti: "정책 대출(버팀목, 디딤돌 등)" },
              { label: "더 까다로운 쪽", dsr: "◀ 훨씬 까다로움", dti: "상대적으로 느슨함" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{row.label}</td>
                <td style={{ padding: "10px 12px", color: "#1D9E75" }}>{row.dsr}</td>
                <td style={{ padding: "10px 12px" }}>{row.dti}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        DSR 계산 공식<br />
        DSR = (연간 모든 대출 원리금 상환액 ÷ 연소득) × 100<br />
        은행 DSR 40% / 비은행(저축은행·캐피탈) DSR 50%
      </GreenBox>

      <Divider />

      <H2>DSR 계산 예시, 얼마까지 빌릴 수 있나요?</H2>
      <p style={body}>
        계산이 복잡해 보이지만 순서가 있어요.
        현재 갚고 있는 대출 원리금 총액을 연소득으로 나누면 현재 DSR이 나와요.
        40%에서 현재 DSR을 빼면 추가로 쓸 수 있는 여유가 얼마인지 보여요.
      </p>

      <BorderBox>
        예시: 연봉 5천만원, 현재 신용대출 월 56만원 + 전세대출 이자 월 25만원<br />
        현재 연간 상환액: (56+25) × 12 = 972만원<br />
        현재 DSR: 972만원 ÷ 5,000만원 × 100 = 약 19.4%<br />
        추가 여유: 40% - 19.4% = 20.6% → 연간 약 1,030만원<br />
        금리 4%, 30년 주담대 기준으로 약 1억 9,000만원 추가 대출 가능
      </BorderBox>

      <p style={body}>
        연봉 8천만원에 다른 대출이 없다면 어떨까요? 연간 상환 가능액은 8,000만원 × 40% = 3,200만원,
        월 약 267만원이에요. 금리 4%, 30년 주담대 기준으로 약 5억원까지 가능해요.
        단, 신용대출이나 전세대출이 있으면 그만큼 빼야 해요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>스트레스 DSR 3단계, 2025년 7월부터</H2>
      <p style={body}>
        2025년 7월부터 스트레스 DSR 3단계가 시행됐어요.
        실제 금리에 추가로 스트레스 금리를 얹어서 DSR을 계산해요.
        금리가 오를 경우를 미리 반영하는 방식이라서 대출 한도가 더 줄었어요.
      </p>

      <SectionBadge>스트레스 DSR 3단계 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>지역·유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>스트레스 금리</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>적용 비율</th>
            </tr>
          </thead>
          <tbody>
            {[
              { region: "수도권·규제지역", stress: "+3.0%", ratio: "100%" },
              { region: "지방 비규제지역 (2026.6까지)", stress: "+1.5%", ratio: "50%" },
              { region: "신용대출·기타", stress: "+1.5%", ratio: "100%" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{row.region}</td>
                <td style={{ padding: "10px 12px", color: "#ef4444", fontWeight: 600 }}>{row.stress}</td>
                <td style={{ padding: "10px 12px" }}>{row.ratio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        3단계 전후 한도 차이 (연소득 1억원, 금리 4%, 30년 주담대)<br />
        3단계 전: 4% + 스트레스 1.5% = 5.5% 기준 → 약 5억 8,700만원<br />
        3단계 후: 4% + 스트레스 3.0% = 7.0% 기준 → 약 4억 7,600만원<br />
        같은 소득인데 1억 1,100만원이나 줄어요
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DSR·DTI 관련 대출 상담에서 실제로 많이 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 금융위원회 가계대출 관리방안을 바탕으로 작성됐어요. DSR 기준과 스트레스 금리는 변경될 수 있으니 최신 정보는 금융위원회 또는 거래 은행에 문의하세요." />
    </ArticleLayout>
  );
}
