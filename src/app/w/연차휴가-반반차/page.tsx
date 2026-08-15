"use client";
// Q1. 연차를 2시간만 쓸 수 있는지, 반반차 제도가 법적으로 보장되는 건지 궁금한 직장인이에요.
// Q2. 회사에 반반차 제도가 있는지 확인하고, 없으면 도입을 요청하거나 시간단위 연차를 활용하는 행동.
// Q3. 반반차는 법정 제도가 아님, 취업규칙 도입 필요, 시간단위 연차와 차이(노사 서면합의), 사용 시 급여 계산.
// Q4. GreenBox(법적 지위 정리) + BorderBox(비교표) + Steps(도입 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";

const STEPS = [
  { title: "취업규칙 확인", desc: "현재 취업규칙에 반반차 규정이 있는지 인사팀에 문의해요.", tip: "단체협약이나 근로계약서도 함께 확인하세요" },
  { title: "반반차 조항 신설", desc: "\"연차휴가는 반반차(2시간) 단위로 분할 사용할 수 있다\" 조항을 취업규칙에 넣어요." },
  { title: "근로자 과반수 의견 청취", desc: "취업규칙 변경이니까 근로자 과반수 의견을 들어야 해요. 유리한 변경이라 동의까지는 필요 없어요." },
  { title: "노동청 신고", desc: "변경된 취업규칙을 관할 노동청에 신고하면 제도 도입이 완료돼요." },
];

const FAQS = [
  { q: "반반차가 법으로 보장된 권리인가요?", a: "아니요. 반반차는 근로기준법에 없는 제도예요. 회사가 취업규칙으로 도입해야 사용할 수 있어요. 법정 권리가 아니라 회사 복지 제도에 가까워요." },
  { q: "시간단위 연차와 반반차는 뭐가 다른가요?", a: "시간단위 연차는 근로기준법 제60조 제7항에 따라 노사 서면합의가 필요하고 연간 8일 한도예요. 반반차는 회사 취업규칙으로 도입하는 거라 법적 요건이 달라요." },
  { q: "반반차를 쓰면 연차가 0.25일 차감되나요?", a: "네, 일반적으로 반차 = 0.5일, 반반차 = 0.25일로 계산해요. 연차 15일이면 반반차로 최대 60회 사용할 수 있는 거예요." },
  { q: "반반차 사용 횟수를 회사가 제한할 수 있나요?", a: "네, 가능해요. 취업규칙에 '월 2회' 또는 '연간 8회'처럼 횟수 제한을 둘 수 있어요. 제한 조건은 회사마다 달라요." },
  { q: "회사에 반반차가 없으면 어떻게 하나요?", a: "인사팀에 도입을 건의하거나, 시간단위 연차 사용을 요청해봐요. 시간단위 연차는 노사 서면합의만 되면 연 8일까지 사용 가능해요." },
  { q: "반반차를 쓰면 그 시간 급여는 어떻게 되나요?", a: "유급이에요. 연차휴가를 분할 사용하는 거니까 반반차 2시간도 급여가 지급돼요. 별도 급여 삭감은 없어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "근로기준법 제60조 (연차 유급휴가)", url: "https://www.law.go.kr/법령/근로기준법" },
    { label: "고용노동부 행정해석", url: "https://www.moel.go.kr" },
  ]},
];

const RELATED = [
  { slug: "연차휴가-사용", title: "연차휴가 사용 가이드", description: "연차 발생 기준부터 사용 촉진까지 정리했어요." },
  { slug: "시간단위-연차휴가", title: "시간 단위 연차휴가", description: "노사 서면합의로 시간 단위 연차를 쓰는 방법이에요." },
  { slug: "연차수당-계산-방법", title: "연차수당 계산 방법", description: "미사용 연차에 대한 수당 계산법을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 연차 · 휴가</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연차휴가 반반차, 2시간만 쓸 수 있나?<br />
        법적 근거와 도입 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        병원 한 번 가려고 반차를 쓰기엔 아깝고, 2시간만 빠지고 싶은 적 있죠?
        반반차(2시간 연차)는 법에 정해진 제도가 아니에요.
        회사가 취업규칙으로 만들어야 쓸 수 있어요. 법적 근거와 도입 절차를 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>반반차의 법적 지위는 어떻게 되나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제60조</a>에서
        연차휴가는 1일 단위가 원칙이에요. 반차(0.5일)도 법에 명시된 건 아니지만,
        근로자에게 유리하니까 대부분 회사가 허용하고 있어요. 반반차(0.25일)도 마찬가지예요.
      </p>

      <GreenBox>
        핵심 정리예요.<br />
        · 연차휴가 원칙: <strong>1일 단위</strong> (근로기준법 제60조)<br />
        · 반차(0.5일): 법정 제도 아님, 회사 재량으로 허용<br />
        · 반반차(0.25일): 법정 제도 아님, <strong>취업규칙 도입 필요</strong><br />
        · 시간단위 연차: <strong>노사 서면합의</strong> 필요, 연간 8일 한도
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>반반차 vs 시간단위 연차, 뭐가 다를까?</H2>
      <p style={body}>
        이름은 비슷한데 법적 근거가 완전히 달라요. 혼동하기 쉬우니까 비교해서 확인하세요.
      </p>

      <SectionBadge>제도 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>반반차</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>시간단위 연차</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["법적 근거", "없음 (회사 재량)", "근로기준법 제60조 제7항"],
              ["도입 요건", "취업규칙 규정", "노사 서면합의"],
              ["사용 한도", "회사가 정함", "연간 8일 이내"],
              ["사용 단위", "2시간 (0.25일)", "1시간 단위"],
              ["차감 방식", "0.25일 차감", "시간 비례 차감"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px" }}>{a}</td>
                <td style={{ padding: "9px 12px" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>우리 회사에 반반차를 도입하려면?</H2>
      <p style={body}>
        반반차는 근로자에게 유리한 제도라서 도입 절차가 비교적 간단해요.
        취업규칙에 조항을 넣고 근로자 의견을 들으면 돼요.
      </p>

      <SectionBadge>도입 절차</SectionBadge>
      <Steps steps={STEPS} />

      <BorderBox>
        <strong>급여 계산 예시</strong><br /><br />
        연차 15일인 직원이 반반차를 사용하면:<br />
        · 반반차 1회 = 0.25일 차감<br />
        · 15일 ÷ 0.25 = 최대 <strong>60회</strong> 반반차 사용 가능<br />
        · 반차(0.5일)와 혼합 사용도 가능해요
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 근로기준법과 고용노동부 행정해석을 바탕으로 작성됐어요. 회사별 취업규칙에 따라 세부 내용이 다를 수 있으니 인사팀에 확인하세요." />
    </ArticleLayout>
  );
}
