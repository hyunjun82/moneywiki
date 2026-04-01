"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 새 아파트에 입주했는데 관리사무소에서 하자보수보증금을 언급해서, 이게 뭔지 입주자가 내야 하는 건지 궁금한 상황
// Q2. 하자보수보증금의 정체와 용도를 파악하고, 하자가 발생했을 때 보증금으로 보수를 요청할 수 있다는 걸 확인한다
// Q3. 하자보수보증금 정의(건설사가 내는 돈), 비율(공종별 2~5%), 사용 조건(건설사 미보수 시), 반환 시점(담보책임기간 종료 후), 하자 유형별 책임기간
// Q4. GreenBox(핵심 정의) + 비교표(공종별 비율) + Steps(하자 보수 요청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "관리사무소에 하자를 접수하세요",
    desc: "균열, 누수, 들뜸 등 하자를 발견하면 관리사무소에 사진과 함께 접수해요. 접수 일자와 내용을 기록해 두세요.",
    tip: "하자 사진은 날짜가 보이도록 촬영",
  },
  {
    title: "건설사에 보수 요청을 하세요",
    desc: "관리사무소를 통해 건설사(사업주체)에게 하자보수 요청서를 보내요. 건설사는 접수일로부터 15일 이내에 보수 일정을 통보해야 해요.",
  },
  {
    title: "건설사가 보수하지 않으면 보증금을 사용해요",
    desc: "건설사가 보수를 거부하거나 15일 내에 응답하지 않으면 하자보수보증금으로 직접 보수할 수 있어요. 입주자대표회의에서 의결 후 진행해요.",
  },
  {
    title: "분쟁 시 하자심사분쟁조정위원회를 이용하세요",
    desc: "보수 범위나 비용에 다툼이 있다면 하자심사분쟁조정위원회에 조정을 신청할 수 있어요. 온라인으로 신청 가능하고 수수료는 없어요.",
    link: { label: "하자심사분쟁조정위원회", href: "https://www.adc.go.kr" },
  },
];

const FAQS = [
  { q: "하자보수보증금은 입주자가 내는 건가요?", a: "아니에요. 건설사(사업주체)가 준공검사 후 대가를 받기 전에 납부하는 돈이에요. 입주자가 직접 부담하는 비용이 아니에요." },
  { q: "하자가 없으면 보증금은 어떻게 되나요?", a: "담보책임기간이 끝나고 하자가 없으면 건설사에게 전액 반환돼요. 입주자에게 돌아오는 돈은 아니에요." },
  { q: "담보책임기간은 얼마나 되나요?", a: "하자 유형에 따라 1~10년이에요. 내장공사 2년, 미장공사 3년, 방수공사 5년, 구조체 하자는 10년이에요. 유형별로 기간이 다르니 확인이 필요해요." },
  { q: "보증금 비율이 공종마다 다른가요?", a: "네, 중요구조물 5%, 공항·항만 4%, 일반건축 3%, 그 외 2%예요. 아파트는 일반건축에 해당해서 보통 계약금액의 3%예요." },
  { q: "입주자대표회의 없이도 보증금을 쓸 수 있나요?", a: "원칙적으로 입주자대표회의 의결이 필요해요. 대표회의가 구성되지 않았다면 관리사무소장이 관리 주체로서 건설사에 보수 요청을 진행할 수 있어요." },
];

const SOURCES = [
  { name: "공동주택관리법", href: "https://www.law.go.kr/법령/공동주택관리법" },
  { name: "하자심사분쟁조정위원회", href: "https://www.adc.go.kr" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr" },
];

const RELATED = [
  { slug: "아파트-주차장-음주운전-기준", title: "아파트 주차장 음주운전 기준", description: "단지 내 도로 해당 여부 판단." },
  { slug: "아파트-층간소음-새벽-음악-소음기준", title: "층간소음 기준", description: "소음 데시벨 기준과 신고 방법." },
  { slug: "아파트-관리규약", title: "아파트 관리규약", description: "입주민 규약 주요 내용." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 아파트 · 하자보수</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아파트 하자보수보증금, 뭐에 쓰이나요?<br />
        용도와 보수 요청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "관리사무소에서 하자보수보증금 얘기하는데, 입주자가 내는 건가요?"
      </p>
      <p style={body}>
        하자보수보증금은 <strong>건설사가 납부하는 돈</strong>이에요.
        <a href="https://www.law.go.kr/법령/공동주택관리법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공동주택관리법</a>에 따라 공사 하자를 보수하기 위한 보증금으로,
        입주자가 직접 내는 비용이 아니에요.
        건설사가 보수를 거부하면 이 보증금으로 직접 수리할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>하자보수보증금이 정확히 뭔가요?</H2>
      <p style={body}>
        건설사가 공사 완료 후 준공검사를 받고, 대가를 지급받기 전에 납부하는 보증금이에요.
        건물에 균열, 침하, 파손, 들뜸, 누수 같은 하자가 생기면 이 돈으로 보수 비용을 충당해요.
      </p>

      <GreenBox>
        하자보수보증금 핵심 요약{"\n"}
        · 누가 내나요? → 건설사(사업주체)가 납부{"\n"}
        · 언제 내나요? → 준공검사 후, 대가 지급 전{"\n"}
        · 뭐에 쓰나요? → 건설사가 하자 보수를 안 할 때 직접 수리 비용{"\n"}
        · 반환은? → 담보책임기간 종료 후 하자 없으면 건설사에게 반환
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>보증금 비율은 얼마인가요?</H2>
      <p style={body}>
        공종(공사 종류)에 따라 계약금액 대비 비율이 달라요.
        아파트는 일반건축에 해당해서 보통 3%예요.
      </p>

      <SectionBadge>공종별 하자보수보증금 비율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공종</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>보증금률</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>예시 (계약금액 100억)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["철도, 댐, 터널, 교량 등 중요구조물", "5%", "5억원"],
              ["공항, 항만, 방파제, 간척", "4%", "4억원"],
              ["일반건축, 도로, 상하수도 (아파트 해당)", "3%", "3억원"],
              ["그 외 공사", "2%", "2억원"],
            ].map(([공종, 비율, 예시], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{공종}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{비율}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{예시}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>하자가 생기면 어떻게 보수를 요청하나요?</H2>
      <p style={body}>
        담보책임기간 내에 하자를 발견하면 건설사에 보수를 요청할 수 있어요.
        건설사가 보수하지 않으면 보증금으로 직접 수리를 진행해요.
      </p>
      <Steps steps={STEPS} />

      <Divider />

      <H2>담보책임기간은 얼마나 되나요?</H2>
      <p style={body}>
        하자 유형마다 기간이 달라요. 기간 내에 하자를 발견하고 신고해야 보수를 받을 수 있어요.
      </p>

      <SectionBadge>유형별 담보책임기간</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>하자 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>책임기간</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["내장공사, 수장공사", "2년"],
              ["미장공사, 타일공사", "3년"],
              ["방수공사", "5년"],
              ["철근콘크리트 구조체", "10년"],
            ].map(([유형, 기간], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{유형}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{기간}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        담보책임기간이 끝나면 보증금은 건설사에게 반환돼요. 기간 내에 하자를 발견했는데 아직 보수가 안 됐다면 기간이 끝나기 전에 반드시 접수해 두세요.
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 공동주택관리법을 바탕으로 작성했어요. 구체적인 하자 분쟁은 하자심사분쟁조정위원회에 상담하세요." />
    </ArticleLayout>
  );
}
