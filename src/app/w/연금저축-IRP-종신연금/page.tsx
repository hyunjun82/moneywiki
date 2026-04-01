"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연금저축이나 IRP로 모은 돈을 받을 때 세금을 줄이고 싶어서, 종신연금으로 전환하면 어떻게 되는지 알고 싶은 상황
// Q2. 종신연금의 세율 혜택(3.3%)을 확인하고 생명보험사로 이전해서 전환 여부를 결정한다
// Q3. 종신연금 정의(사망 시까지 수령), 세율(평생 3.3%), 확정기간형 세율(5.5~3.3% 나이별), 전환 방법(생명보험사 이전), 주의사항(해지 불가, 1,500만원 초과 시 16.5%)
// Q4. CompareTable(종신 vs 확정기간형) + Steps(전환 절차) + GreenBox(세율 비교) + Checklist(전환 전 점검) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "종신연금을 제공하는 생명보험사를 선택하세요",
    desc: "삼성생명, 한화생명, 교보생명 등 주요 생명보험사에서 종신연금 상품을 취급해요. 예정이율과 수수료를 비교해서 선택하세요.",
    tip: "은행·증권사는 종신연금을 제공하지 않아요",
  },
  {
    title: "생명보험사에 IRP 또는 연금저축 계좌를 개설하세요",
    desc: "선택한 보험사의 홈페이지나 앱에서 연금 계좌를 새로 개설해요. 기존 계좌와 별도로 이전용 계좌가 필요해요.",
  },
  {
    title: "생명보험사 앱에서 기존 계좌 이전 신청하세요",
    desc: "이전받는 보험사에서 이전 신청을 하면 돼요. 기존 금융기관 방문은 필요 없고 유선으로 이전 의사 확인만 하면 완료돼요. 이전은 해지가 아니라 계약유지로 처리돼서 세제혜택이 유지돼요.",
    tip: "연금저축보험 7년 이내 이전 시 중도해지 수수료 주의",
  },
  {
    title: "55세 이후에 종신연금 수령을 개시하세요",
    desc: "55세 이후에 수령을 시작해야 3.3% 저율과세가 적용돼요. 개시 시점에 종신연금 방식을 선택하면 이후 평생 같은 세율이 유지돼요.",
  },
];

const CHECKLIST = [
  "급한 목돈이 필요할 가능성 확인 (종신연금 해지 불가)",
  "연간 수령액 1,500만원 이하로 조절 가능한지 확인",
  "생명보험사별 예정이율과 수수료 비교",
  "연금저축보험 가입 7년 경과 여부 확인 (수수료 면제)",
  "확정기간형 일부 + 종신연금 분산 수령 검토",
];

const FAQS = [
  { q: "종신연금이 확정기간형보다 얼마나 절세되나요?", a: "55세 기준으로 확정기간형은 5.5%, 종신연금은 3.3%예요. 연 1,000만원 수령 시 확정기간형은 세금 55만원, 종신연금은 33만원이라 연 22만원 차이가 나요." },
  { q: "종신연금으로 전환한 뒤에 해지할 수 있나요?", a: "해지 불가능해요. 종신연금은 사망 시까지 받는 계약이라 중도 해지나 일시금 전환이 안 돼요. 유동성이 완전히 없어지니까 신중하게 결정해야 해요." },
  { q: "연간 1,500만원을 넘기면 어떻게 되나요?", a: "3.3% 저율과세 대신 16.5% 기타소득세가 적용되거나 종합과세(최대 49.5%)로 전환돼요. 1,500만원 이하로 수령액을 조절하는 게 절세에 유리해요." },
  { q: "은행 IRP에서도 종신연금으로 받을 수 있나요?", a: "은행이나 증권사는 종신연금을 제공하지 않아요. 생명보험사로 이전해야만 종신연금 전환이 가능해요. 이전 시 세제혜택은 그대로 유지돼요." },
  { q: "일부만 종신연금으로 전환할 수 있나요?", a: "가능해요. 적립금 일부를 생명보험사로 이전해서 종신연금으로 받고, 나머지는 기존 계좌에서 확정기간형으로 받을 수 있어요. 유동성과 절세를 동시에 챙기는 전략이에요." },
  { q: "사망 후 남은 돈은 어떻게 되나요?", a: "보증기간이 있는 종신연금 상품을 선택하면 보증기간 내 사망 시 남은 기간분을 유족이 받을 수 있어요. 보증기간이 없는 순수 종신형은 사망과 동시에 지급이 종료돼요." },
];

const SOURCES = [
  { name: "소득세법 시행령 제40조의2", href: "https://www.law.go.kr/법령/소득세법시행령" },
  { name: "금융감독원", href: "https://www.fss.or.kr" },
];

const RELATED = [
  { slug: "연말정산-건강보험료", title: "연말정산 건강보험료 공제", description: "건강보험료 소득공제 한도와 절세." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축 세액공제 한도", description: "세액공제 한도와 공제율 정리." },
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 수령 비교", description: "일시금 vs 연금 수령 세금 차이." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 연금 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연금저축·IRP, 종신연금으로 받으면?<br />
        평생 3.3% 세율과 전환 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "연금 수령할 때 세금을 최대한 줄이고 싶은데, 종신연금이 유리한가요?"
      </p>
      <p style={body}>
        종신연금으로 전환하면 <strong>나이와 관계없이 평생 3.3%</strong>만 과세돼요.
        확정기간형은 55세에 5.5%부터 시작해서 80세가 돼야 3.3%로 내려가요.
        생명보험사로 이전하면 종신연금 전환이 가능하고, 세제혜택은 그대로 유지돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>종신연금 vs 확정기간형, 세율이 얼마나 다른가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 시행령</a>에서 정한 종신계약에 해당하면 나이와 관계없이 3.3%가 적용돼요.
        확정기간형과 비교하면 차이가 확연해요.
      </p>

      <SectionBadge>연금 수령 방식별 세율 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>종신연금</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>확정기간형</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["55~69세 세율", "3.3%", "5.5%"],
              ["70~79세 세율", "3.3%", "4.4%"],
              ["80세 이상 세율", "3.3%", "3.3%"],
              ["수령 기간", "사망 시까지", "10~20년 등 정해진 기간"],
              ["제공 기관", "생명보험사만", "은행·증권·보험 모두"],
              ["중도 해지", "불가능", "가능 (16.5% 기타소득세)"],
            ].map(([구분, 종신, 확정], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{구분}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{종신}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{확정}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        연 1,000만원 수령 시 세금 비교 (55세 기준){"\n"}
        종신연금: 1,000만원 x 3.3% = 33만원{"\n"}
        확정기간형: 1,000만원 x 5.5% = 55만원{"\n"}
        연 22만원 절세, 20년이면 440만원 차이
      </GreenBox>

      <CategoryButton label="금융 정보" count={10} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>생명보험사로 이전하는 절차가 복잡한가요?</H2>
      <p style={body}>
        복잡하지 않아요. 이전받는 보험사에서 신청만 하면 되고 기존 금융기관 방문은 필요 없어요.
      </p>
      <Steps steps={STEPS} />

      <Divider />

      <H2>전환 전에 뭘 확인해야 하나요?</H2>
      <p style={body}>
        종신연금은 해지가 안 되기 때문에 전환 전에 신중하게 점검해야 해요.
        아래 체크리스트를 확인해 보세요.
      </p>
      <Checklist items={CHECKLIST} />

      <BorderBox>
        <strong>연간 1,500만원 초과 주의</strong>{"\n"}
        연금수령액이 연 1,500만원을 넘으면 3.3% 대신 16.5% 기타소득세가 적용되거나 최대 49.5% 종합과세 세율이 적용될 수 있어요. 수령액을 1,500만원 이하로 조절하는 게 핵심이에요.
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 소득세법을 바탕으로 작성했어요. 개인별 적립금 규모와 수령 계획에 따라 최적 전략이 다를 수 있으니 금융기관에 상담하세요." />
    </ArticleLayout>
  );
}
