"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 결혼 후 전세 구하려는데, 정부 지원 대출이 뭐가 있고 얼마까지 빌릴 수 있는지 모르겠는 상황
// Q2. 내 소득 기준으로 신혼부부 전세대출 한도·금리를 파악하고, 은행에 서류 준비해서 신청한다
// Q3. 소득·주택 조건, 수도권/비수도권 한도, 금리 구간, 우대금리, 필요 서류, 신청 절차
// Q4. EligibilityChecker(자격) + GreenBox(한도·금리 요약) + DocTable(서류) + Steps(절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, DocTable, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "marry", label: "혼인기간 7년 이내이거나 3개월 이내 결혼 예정" },
  { id: "house", label: "부부 모두 무주택 세대주(예정자 포함)" },
  { id: "income", label: "부부합산 연소득 7,500만 원 이하" },
  { id: "deposit", label: "보증금 수도권 5억 이하 / 수도권 외 4억 이하" },
  { id: "area", label: "전용면적 85㎡ 이하 주택" },
  { id: "net", label: "부부합산 순자산 3.61억 원 이하" },
];

const DOCS = [
  { name: "혼인관계증명서 (또는 청첩장·예식장 계약서)", required: true, where: "정부24 또는 주민센터" },
  { name: "가족관계증명서", required: true, where: "정부24 또는 주민센터" },
  { name: "주민등록등본", required: true, where: "정부24 또는 주민센터" },
  { name: "소득증빙 (재직증명서 + 원천징수영수증)", required: true, where: "회사 또는 홈택스" },
  { name: "임대차계약서 사본", required: true, where: "계약 시 수령" },
  { name: "기본증명서 (자녀 우대금리 시)", required: false, where: "정부24 또는 주민센터" },
  { name: "신분증 사본", required: true, where: "본인 소지" },
];

const STEPS_DATA = [
  {
    title: "전세 계약서부터 먼저 써요",
    desc: "은행에 대출 신청하려면 임대차계약서가 있어야 해요. 집을 먼저 정하고, 계약서에 보증금·계약기간·특약을 명확히 적으세요. 잔금일은 대출 실행까지의 여유를 두고 잡는 게 좋아요.",
    tip: "잔금일을 최소 2주 이상 여유있게 잡기",
  },
  {
    title: "주택도시기금 취급 은행에 신청하세요",
    desc: "KB국민, 신한, 하나, 우리, NH농협 등 주요 시중은행에서 취급해요. 지점 방문이나 인터넷뱅킹으로 신청 가능하고, 인터넷이 대기 시간 없어서 편해요. 서류를 미리 준비해서 가면 빨라요.",
    link: { label: "주택도시기금 안내", href: "https://www.myhome.go.kr" },
  },
  {
    title: "심사 후 1~2주 안에 승인이 나와요",
    desc: "소득·자산 요건, 주택 조건을 심사해요. 승인되면 전입신고와 확정일자를 받은 뒤 대출이 실행돼요. 전입신고와 확정일자는 보증금을 지키는 대항력을 갖추는 절차니까 반드시 먼저 처리하세요.",
    tip: "전입신고 + 확정일자 = 대출 실행 전 필수",
  },
  {
    title: "2년 계약 + 4회 연장으로 최장 10년까지",
    desc: "대출 기간은 기본 2년이에요. 2년마다 갱신 심사를 통과하면 최대 4회 연장, 총 10년까지 이용할 수 있어요. 갱신 시 소득·주택 요건을 다시 확인하니까 소득이 크게 늘면 연장이 제한될 수 있어요.",
  },
];

const FAQS = [
  {
    q: "결혼 전에도 신청할 수 있나요?",
    a: "네, 결혼 예정일 3개월 이내라면 예비 신혼부부로 신청 가능해요. 혼인관계증명서 대신 청첩장이나 예식장 계약서를 내면 돼요. 대출 실행 후 혼인신고를 완료해야 해요.",
  },
  {
    q: "청년 전세대출이랑 중복으로 받을 수 있나요?",
    a: "안 돼요, 둘 중 하나만 선택해야 해요. 보통 신혼부부 대출이 한도(최대 2.5억)도 높고 금리 우대폭도 커서, 결혼했다면 신혼부부 대출이 유리한 경우가 많아요.",
  },
  {
    q: "대출 기간 중 집을 사면 어떻게 되나요?",
    a: "주택 구입 시 6개월 이내에 전액 상환해야 해요. 전세자금 용도로 빌려준 거니까요. 실무에서는 주택담보대출로 갈아타는 경우가 많고, 중도상환 수수료는 없어요.",
  },
  {
    q: "소득이 올라서 기준을 넘으면요?",
    a: "2년마다 갱신 심사 때 소득 요건을 다시 확인해요. 처음에 5천만 원이었는데 8천만 원을 넘으면 연장이 제한될 수 있어요. 이런 경우 시중은행 전세대출로 전환해야 해요.",
  },
  {
    q: "전자계약하면 금리가 더 낮아지나요?",
    a: "네, 부동산 전자계약 시 0.1%p 우대금리를 추가로 받아요. 중개사무소에서 전자계약 시스템을 안내해 줘요.",
  },
  {
    q: "오피스텔도 대출 대상이에요?",
    a: "주거용으로 등록된 오피스텔은 대상이에요. 전용면적 85㎡ 이하, 보증금 기준 내면 가능하고, 건축물대장에 주거용으로 되어 있어야 해요.",
  },
];

const SOURCES = [
  { name: "주택도시기금 신혼부부 전세대출", href: "https://www.myhome.go.kr" },
  { name: "한국주택금융공사", href: "https://www.hf.go.kr" },
];

const RELATED = [
  { slug: "청년-전세대출-버팀목-조건", title: "청년 전세대출 버팀목 조건", description: "만 19~34세 청년 대상 전세대출 조건과 금리." },
  { slug: "DSR-계산-한도-규제", title: "DSR 계산과 한도", description: "대출 원리금 상환 부담 비율 계산법." },
  { slug: "전세자금대출-전세보증보험", title: "전세보증보험 가입 조건", description: "전세 보증금 지키는 보증보험 안내." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 전세대출 · 신혼부부</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        신혼부부 전세대출, 얼마까지 빌릴 수 있나요?<br />
        한도·금리·신청 조건 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        결혼 준비에 돈이 다 들어갔는데, 전세 보증금까지 모으기 막막하죠.
      </p>
      <p style={body}>
        신혼부부 전용 버팀목 전세대출은 시중 은행보다 금리가 훨씬 낮아요.
        수도권 최대 <strong>2.5억 원</strong>, 최저 금리 <strong>연 1.0%</strong>까지 가능하고, 자녀 수에 따라 우대금리도 추가돼요.
        내 조건에 맞는지 아래에서 바로 체크해 보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 자격 조건 */}
      <H2>내가 신청할 수 있는지 먼저 체크해요</H2>
      <p style={body}>
        <a href="https://www.myhome.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택도시기금</a> 기준으로 6가지 요건을 모두 충족해야 해요.
        하나라도 빠지면 신청이 안 되니까 꼼꼼히 확인하세요.
        <a href="/w/청년-전세대출-버팀목-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>청년 전세대출</a>과 중복 신청은 안 돼요.
      </p>

      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="6가지 모두 해당되면 신청 가능해요!"
        partialMatchText="체크하지 못한 항목이 있으면 신청이 어려울 수 있어요."
      />

      <p style={body}>
        소득 기준은 부부합산이에요. 맞벌이면 두 사람 연소득을 합쳐서 7,500만 원 이하여야 하고, 외벌이는 본인 소득만 봐요.
        조건이 맞는다면, 한도와 금리가 얼마인지가 다음 궁금증이죠.
      </p>

      <CategoryButton label="금융 정보" count={8} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 한도·금리 */}
      <H2>수도권 2.5억, 금리는 최저 연 1.0%</H2>
      <p style={body}>
        한도는 지역에 따라 다르고, 금리는 소득 구간과 우대 항목에 따라 달라져요.
        시중은행 전세대출 금리가 4~5%대인 걸 생각하면 차이가 크죠.
      </p>

      <GreenBox>
        대출 한도{"\n"}
        · 수도권: 최대 2.5억 원 (임차보증금의 80% 이내){"\n"}
        · 수도권 외: 최대 1.6억 원 (임차보증금의 80% 이내){"\n\n"}
        금리 (2026년 기준){"\n"}
        · 기본금리: 연 1.9%~3.3%{"\n"}
        · 우대금리 포함 시: 최저 연 1.0%{"\n"}
        · 가산금리 포함 시: 최고 연 4.3%
      </GreenBox>

      <SectionBadge>우대금리 항목</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>우대폭</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["신혼가구 우대", "-0.2%p"],
              ["자녀 1명", "-0.3%p"],
              ["자녀 2명", "-0.5%p"],
              ["다자녀(3명 이상)", "-0.7%p"],
              ["전자계약", "-0.1%p"],
            ].map(([item, rate], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        소득이 5천만 원 이하이면 기본금리 자체가 낮은 구간에서 시작해요.
        적게 빌릴수록 금리도 유리하고, <a href="/w/DSR-계산-한도-규제" style={{ color: "#1D9E75", textDecoration: "underline" }}>DSR 계산</a> 때도 부담이 줄어드니까 필요한 만큼만 빌리는 게 좋아요.
      </p>

      <Divider />

      {/* H2-3: 신청 절차 */}
      <H2>전세 계약부터 대출 실행까지 순서</H2>
      <p style={body}>
        신청 자체는 어렵지 않아요. 서류를 미리 준비하면 1~2주면 끝나요.
        핵심은 전입신고·확정일자를 대출 실행 전에 반드시 마치는 거예요.
      </p>

      <Steps steps={STEPS_DATA} />

      <Divider />

      {/* H2-4: 필요 서류 */}
      <H2>은행에 가져갈 서류 목록</H2>
      <p style={body}>
        서류가 생각보다 많아요. 미리 준비해 가면 한 번에 끝낼 수 있어요.
        예비 신혼부부는 혼인관계증명서 대신 청첩장이나 예식장 계약서를 내면 돼요.
      </p>

      <DocTable docs={DOCS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        신혼부부 전세대출에서 실제로 헷갈리는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 주택도시기금 기준으로 작성했어요. 금리·한도·우대 조건은 정책 변경에 따라 달라질 수 있으니 최신 기준은 주택도시기금 홈페이지(myhome.go.kr)에서 확인해 주세요." />
    </ArticleLayout>
  );
}
