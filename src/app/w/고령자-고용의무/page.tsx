"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 회사에서 고령자를 몇 명 고용해야 하는지, 안 지키면 벌금이 있는지 궁금한 사업주 상황이에요.
// Q2. 업종별 기준고용률을 확인하고, 보고 의무를 이행하는 행동.
// Q3. 300명 이상 보고 의무, 업종별 기준고용률(제조 2%/운수 6%/기타 3%), 정년 60세, 과태료.
// Q4. GreenBox(기준고용률) + 비교표(업종별) + BorderBox(주의사항) + Steps(보고 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";

const REPORT_STEPS = [
  { title: "고령자 현황 파악", desc: "매월 말일 기준 만 55세 이상 근로자 수를 집계해요. 연평균을 구해야 하니 매월 기록해두세요." },
  { title: "보고서 작성", desc: "정년 제도 운영 현황과 고령자 고용현황을 작성해요." },
  { title: "고용노동관서 제출", desc: "매년 1월 31일까지 관할 지방고용노동관서에 제출해요.", tip: "미보고 시 과태료가 부과될 수 있어요." },
];

const FAQS = [
  { q: "기준고용률을 안 지키면 벌금이 있나요?", a: "기준고용률 자체는 권장 사항이라 직접 벌금은 없어요. 다만 고용현황 보고를 안 하면 과태료가 부과돼요." },
  { q: "고령자 기준 나이가 몇 살인가요?", a: "만 55세 이상이 고령자예요. 만 50세 이상~55세 미만은 준고령자로 구분해요." },
  { q: "정년은 몇 세 이상으로 정해야 하나요?", a: "모든 사업장은 정년을 60세 이상으로 정해야 해요. 정년을 정하지 않으면 60세로 본다고 법에 명시돼 있어요." },
  { q: "고령자를 고용하면 지원금이 있나요?", a: "네, 계속고용장려금(비수도권 월 40만원)과 고령자 고용지원금(증가 1명당 분기 30만원)이 있어요." },
  { q: "300명 미만이면 아무 의무도 없나요?", a: "보고 의무는 없지만 고령자 고용을 권장하고 있고, 고용지원금 등 혜택은 300명 미만도 받을 수 있어요." },
  { q: "재취업지원서비스는 뭔가요?", a: "1,000명 이상 사업장은 정년퇴직 등 비자발적 이직 예정 고령자에게 재취업 지원 서비스를 제공해야 해요. 경력 상담, 직업훈련, 취업 알선 등이에요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용상 연령차별금지 및 고령자고용촉진에 관한 법률", url: "https://www.law.go.kr/법령/고용상연령차별금지및고령자고용촉진에관한법률" },
    { label: "찾기쉬운 생활법령정보(고령자 고용)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1122&ccfNo=3&cciNo=1&cnpClsNo=3" },
    { label: "고용노동부", url: "https://www.moel.go.kr" },
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 고령자 고용</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고령자 고용 의무, 우리 회사는 몇 명?<br />
        업종별 기준과 보고 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        상시 300명 이상 사업장은 매년 고령자 고용현황을 보고해야 해요.
        업종별로 권장 비율이 다르고, 보고 의무를 안 지키면 과태료가 나와요.
      </p>

      <Divider />

      <H2>업종별 기준고용률, 얼마나 채워야 하나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용상연령차별금지및고령자고용촉진에관한법률" style={{ color: "#1D9E75" }}>고용상 연령차별금지 및 고령자고용촉진에 관한 법률</a>에서
        업종별 기준고용률을 정하고 있어요. 강제 의무는 아니지만 달성을 권장해요.
      </p>

      <GreenBox title="업종별 기준고용률">
        제조업: <strong>2%</strong> (500명 기업 → 10명)<br />
        운수업·부동산업: <strong>6%</strong> (500명 기업 → 30명)<br />
        기타 업종: <strong>3%</strong> (500명 기업 → 15명)
      </GreenBox>

      <SectionBadge>업종별 예시</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>업종</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>기준고용률</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>500명 기업</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>1,000명 기업</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["제조업", "2%", "10명", "20명"],
              ["운수업·부동산업", "6%", "30명", "60명"],
              ["기타 업종", "3%", "15명", "30명"],
            ].map(([type, rate, ex500, ex1000], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{rate}</td>
                <td style={{ padding: "9px 12px" }}>{ex500}</td>
                <td style={{ padding: "9px 12px" }}>{ex1000}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>보고 의무, 이렇게 이행해요</H2>
      <p style={body}>
        300명 이상 사업장은 매년 고용현황을 보고해야 해요. 미보고 시 과태료 대상이에요.
      </p>

      <Steps steps={REPORT_STEPS} />

      <BorderBox>
        정년 규정도 함께 기억하세요.<br />
        · 모든 사업장은 <strong>정년 60세 이상</strong>으로 정해야 해요<br />
        · 정년 미설정 시 60세로 간주돼요<br />
        · <a href="/w/장애인-고용의무-최소-인원" style={{ color: "#1D9E75" }}>장애인 고용의무</a>와는 별도 기준이에요
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용상 연령차별금지 및 고령자고용촉진에 관한 법률을 바탕으로 작성됐어요. 업종 분류와 기준고용률은 변경될 수 있으니 고용노동부에 확인하세요." />
    </ArticleLayout>
  );
}
