"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 상가 임차인인데 건물주가 보증금을 올려달라고 해서 법적 한도가 얼마인지 확인하려는 상황
// Q2. 5% 한도 규칙과 1년 제한을 알고, 건물주의 과도한 요구를 법적 근거로 거절한다
// Q3. 5% 상한, 1년 이내 재인상 금지, 환산보증금 지역별 기준, 거절 방법
// Q4. GreenBox(결론) + BorderBox(환산보증금 지역별 기준) + Steps(거절 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "5% 한도를 넘는지 계산해보세요",
    desc: "현재 보증금에 5%를 곱하면 최대 인상 가능 금액이 나와요. 보증금 1억이면 최대 500만원, 월세 100만원이면 최대 5만원까지만 올릴 수 있어요. 이 이상 요구하면 법적으로 무효예요.",
    tip: "보증금과 월세 각각 5% 적용",
  },
  {
    title: "마지막 인상일로부터 1년이 지났는지 따져보세요",
    desc: "계약일이나 마지막 증액일로부터 1년이 안 됐으면 증액 자체가 불가능해요. 상가건물임대차보호법 제11조에서 1년 이내 재증액을 금지하고 있어요.",
    tip: "계약서에 적힌 날짜 기준",
  },
  {
    title: "환산보증금이 지역 기준 이하인지 따져보세요",
    desc: "환산보증금(보증금 + 월세 × 100)이 지역별 기준액을 초과하면 5% 제한이 적용 안 돼요. 서울은 9억, 과밀억제권역은 6억 9천만원이 기준이에요. 초과하면 건물주와 협상으로 결정해야 해요.",
    tip: "환산보증금 = 보증금 + (월세 × 100)",
  },
  {
    title: "문자나 이메일로 거절 의사를 남기세요",
    desc: "구두가 아니라 문자, 이메일, 내용증명 등 서면으로 거절하세요. 나중에 분쟁이 생기면 증거로 쓸 수 있어요. '상가건물임대차보호법 제11조에 따라 5%를 초과하는 증액 요구는 받아들일 수 없어요'라고 적으면 돼요.",
    tip: "내용증명 발송 시 우체국에서 3,000~5,000원",
  },
];

const CHECKLIST = [
  "현재 보증금 × 5% = 최대 인상 가능 금액",
  "마지막 인상일로부터 1년 경과 여부",
  "환산보증금(보증금 + 월세 × 100) 계산",
  "지역별 환산보증금 기준 초과 여부 확인",
  "거절 의사 서면(문자·이메일) 기록 보관",
];

const FAQS = [
  {
    q: "보증금 1억에 월세 100만원인데, 환산보증금이 얼마예요?",
    a: "2억 2천만원이에요. 보증금 1억 + (월세 100만원 × 100) = 2억 2천만원이죠. 서울 기준 9억 이하니까 상가건물임대차보호법 5% 제한이 적용돼요.",
  },
  {
    q: "건물주가 월세만 올리겠다고 하면요?",
    a: "월세도 동일하게 5% 이내로만 올릴 수 있어요. 월세 100만원이면 최대 5만원까지만 인상 가능하죠. 보증금과 월세를 합쳐서 전체 5%가 아니라, 각각 5% 상한이에요.",
  },
  {
    q: "8개월밖에 안 됐는데 올려달라고 하면요?",
    a: "거절할 수 있어요. 계약이나 마지막 증액 후 1년이 지나야 다시 증액 요구가 가능해요. 1년 미만이면 법적으로 요구 자체가 효력이 없어요.",
  },
  {
    q: "환산보증금이 기준을 넘으면 무방비 상태인가요?",
    a: "5% 상한은 적용 안 되지만, 계약갱신청구권(최대 10년)은 보호받을 수 있어요. 다만 차임 증감은 당사자 간 협의로 정해야 하고, 분쟁 시 법원에서 경제사정 변동을 감안해 판단해요.",
  },
  {
    q: "건물주가 보증금 대신 관리비를 확 올리면요?",
    a: "2026년 5월 12일 시행 개정법에서 임차인이 관리비 내역을 요청할 수 있는 근거가 생겼어요. 관리비가 갑자기 크게 올랐다면 내역서를 요청해서 정당한지 따져보세요. 부당한 인상은 거절할 수 있어요.",
  },
  {
    q: "거절했는데 건물주가 퇴거를 요구하면요?",
    a: "상가 임차인에게는 계약갱신청구권이 있어요. 최초 계약 포함 10년까지 갱신을 요구할 수 있죠. 건물주가 정당한 사유 없이 갱신을 거절하면 법원에서 다툴 수 있어요.",
  },
];

const SOURCES = [
  { name: "상가건물임대차보호법", href: "https://www.law.go.kr/법령/상가건물임대차보호법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=627&ccfNo=1&cciNo=2&cnpClsNo=1" },
];

const RELATED = [
  { slug: "상가건물임대차보호법", title: "상가건물임대차보호법 핵심", description: "상가 임차인이 알아야 할 법적 권리." },
  { slug: "상가-계약갱신청구권", title: "상가 계약갱신청구권", description: "최대 10년까지 계약 연장 가능." },
  { slug: "환산보증금", title: "환산보증금 계산법", description: "지역별 기준과 계산 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 상가 임대차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상가 보증금 5% 넘게 올려달라고요?<br />
        법적 한도와 거절 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        상가에서 장사하는데 건물주가 갑자기 보증금을 크게 올려달라고 하면 막막하죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/상가건물임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>상가건물임대차보호법</a> 제11조에 따르면 보증금과 월세 인상은 각각 <strong>기존 금액의 5% 이내</strong>로만 가능해요.
        1년 이내 재인상도 금지되고요. 다만 환산보증금이 지역별 기준을 넘으면 이 보호를 못 받아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>보증금 인상 한도 5%, 핵심 규칙이에요</H2>
      <p style={body}>
        보증금 1억이면 최대 500만원, 2억이면 최대 1,000만원까지만 올릴 수 있어요. 건물주가 &ldquo;시세가 올랐으니 5,000만원 더 내라&rdquo;고 해도 법적으로 무효예요.
      </p>
      <p style={body}>
        월세도 마찬가지예요. 월세 100만원이면 최대 5만원까지만 인상 가능하죠. 이 규칙은 2018년 1월 26일부터 시행됐어요. 그 전에는 9%였는데 임차인 보호를 위해 5%로 낮췄어요.
      </p>

      <GreenBox title="인상 한도 정리">
        보증금 5% + 월세 5% 각각 적용. 1년 이내 재인상 금지. 환산보증금 지역 기준 초과 시 제한 없음.
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>환산보증금, 지역 기준을 넘으면 보호 못 받아요</H2>
      <p style={body}>
        여기서 주의할 점이 있어요. 5% 상한은 환산보증금이 지역별 기준 이하인 상가에만 적용돼요. 환산보증금은 보증금에 월세의 100배를 더한 금액이에요.
      </p>

      <SectionBadge>지역별 환산보증금 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>지역</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>기준액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["서울", "9억원"],
              ["과밀억제권역(서울 제외)", "6억 9천만원"],
              ["광역시·세종·파주·화성 등", "5억 4천만원"],
              ["그 외 지역", "3억 7천만원"],
            ].map(([region, amount], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{region}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        보증금 3억에 월세 300만원이라면 환산보증금이 6억이에요. 서울이면 9억 기준 이하니까 5% 보호를 받죠. 하지만 보증금 5억에 월세 500만원이면 환산보증금이 10억이라 서울에서도 보호 대상이 아니에요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>건물주의 과도한 요구, 이렇게 거절하세요</H2>
      <p style={body}>
        법 조문만 안다고 끝이 아니에요. 실제로 거절할 때는 증거를 남기는 게 중요해요. 구두로만 이야기하면 나중에 &ldquo;그런 적 없다&rdquo;고 뒤집힐 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>입찰 전 체크리스트</H2>
      <p style={body}>
        건물주에게 인상 요구를 받으면 아래 항목을 하나씩 확인해보세요. 하나라도 해당하면 거절할 근거가 돼요.
      </p>

      <Checklist items={CHECKLIST} />

      <p style={body}>
        <a href="/w/상가-계약갱신청구권" style={{ color: "#1D9E75", textDecoration: "underline" }}>계약갱신청구권</a>과 함께 활용하면 최대 10년까지 안정적으로 영업할 수 있어요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 법률 정보를 제공하며 법률 자문이 아니에요. 구체적인 상황은 변호사와 상담하세요." />
    </ArticleLayout>
  );
}
