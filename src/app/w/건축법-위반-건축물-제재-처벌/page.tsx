"use client";

// Q1. 건축법 위반 사실을 알게 됐거나 위반 건축물을 매수·매도하려는 상황
// Q2. 위반 유형별 제재(이행강제금, 형사처벌, 행정조치) 수준을 파악하고 대응 방향을 결정한다
// Q3. 이행강제금(시가표준액×위반비율, 매년 반복), 형사처벌(3년/5억), 행정조치(철거·사용금지)
// Q4. 제재 비교표 + GreenBox(핵심) + Steps(대응 절차) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "위반 내용을 정확히 확인하세요",
    desc: "건축물대장에서 '위반건축물' 표시 여부를 확인해요. 정부24나 세움터에서 건축물대장 열람이 가능해요. 위반 유형(무허가, 건폐율 초과, 용도변경 등)에 따라 이행강제금 비율이 달라지거든요.",
    tip: "세움터(cloud.eais.go.kr)에서 온라인 열람 가능",
  },
  {
    title: "시정명령 기한 내에 자진 시정하세요",
    desc: "지자체에서 시정명령이 나오면 정해진 기한 안에 위반 사항을 고쳐야 해요. 기한 내에 시정하면 이행강제금이 부과되지 않아요. 위반 부분을 철거하거나 용도를 원래대로 바꾸는 식이에요.",
    tip: "기한 연장이 필요하면 사전에 신청",
  },
  {
    title: "시정이 어려우면 건축사와 상담하세요",
    desc: "무허가 증축이라면 사후 건축허가(추인)가 가능한지 확인해야 해요. 건축사 사무소에서 관련 법규 검토 후 합법화 가능 여부를 판단해줘요. 합법화가 되면 위반건축물 표시도 삭제돼요.",
    tip: "합법화 비용이 이행강제금보다 저렴한 경우가 많아요",
  },
  {
    title: "이행강제금 부과 시 이의신청을 검토하세요",
    desc: "이행강제금 통지를 받으면 60일 이내에 행정심판이나 행정소송을 제기할 수 있어요. 금액 산정이 잘못됐거나 시정이 불가능한 사유가 있으면 감면받을 수 있어요.",
    tip: "행정심판은 무료, 변호사 없이도 가능",
  },
];

const CHECKLIST = [
  "건축물대장에 위반건축물 표시 여부 확인 / 세움터에서 열람",
  "위반 유형 확인 / 무허가·건폐율·용적률·용도변경 중 어떤 유형인지",
  "시정명령 기한 확인 / 기한 내 자진 시정이 최선",
  "합법화(사후허가) 가능 여부 확인 / 건축사 상담",
  "이행강제금 부과 이력 확인 / 매년 반복 부과 여부",
];

const FAQS = [
  {
    q: "이행강제금은 한 번만 내면 끝인가요?",
    a: "아니에요. 위반 사항을 시정할 때까지 매년 반복 부과돼요. 최대 연 2회까지 가능하고, 10년이면 이행강제금이 원래 건물값을 넘을 수도 있어요.",
  },
  {
    q: "위반 건축물을 사면 내가 이행강제금을 내야 하나요?",
    a: "네. 이행강제금은 건물 소유자에게 부과돼요. 위반 건축물을 매수하면 그 순간부터 새 소유자가 이행강제금 납부 의무를 지게 돼요. 매수 전에 반드시 확인하세요.",
  },
  {
    q: "이행강제금 말고 벌금도 따로 받나요?",
    a: "이행강제금(행정)과 형사처벌(벌금·징역)은 별개예요. 둘 다 동시에 받을 수 있어요. 도시지역 위반이면 5억원 이하 벌금에 3년 이하 징역까지 가능해요.",
  },
  {
    q: "합법화가 되면 이전 이행강제금도 환급받나요?",
    a: "이미 납부한 이행강제금은 환급이 안 돼요. 합법화 이후부터 추가 부과가 멈추는 거예요. 그래서 위반을 빨리 해결할수록 비용이 줄어요.",
  },
  {
    q: "철거 명령 받으면 무조건 허물어야 하나요?",
    a: "원칙적으로는 이행해야 해요. 안 하면 행정대집행으로 강제 철거되고 그 비용까지 청구받아요. 다만 행정심판으로 다툴 수는 있어요.",
  },
  {
    q: "영리 목적이면 이행강제금이 더 나오나요?",
    a: "네. 임대 수익 목적으로 불법 증축한 경우 이행강제금이 최대 2배까지 가중돼요. 일반 위반 3,000만원이라면 영리 목적은 6,000만원까지 나올 수 있어요.",
  },
];

const SOURCES = [
  { name: "건축법", href: "https://www.law.go.kr/법령/건축법" },
  { name: "생활법령정보", href: "https://www.easylaw.go.kr" },
  { name: "세움터", href: "https://cloud.eais.go.kr" },
];

const RELATED = [
  { slug: "건축허가-산지전용허가-의제-변경", title: "건축허가 산지전용허가 의제", description: "의제허가 변경 시 주의사항." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부", description: "부동산 취득세 세율 정리." },
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "공인중개사 거래 신고 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축법 · 위반 제재</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건축법 위반하면 어떤 처벌 받나요?<br />
        이행강제금부터 형사처벌까지 제재 종류
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "건폐율 조금 넘었을 뿐인데, 매년 수천만원씩 고지서가 날아와요."
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/건축법" style={{ color: "#1D9E75", textDecoration: "underline" }}>건축법</a> 위반은 세 가지 제재를 동시에 받을 수 있어요.
        <strong>이행강제금</strong>(매년 반복 부과), <strong>형사처벌</strong>(징역·벌금), <strong>행정조치</strong>(철거·사용금지)가 별도로 진행돼요.
        작은 위반도 방치하면 비용이 눈덩이처럼 불어나요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>위반 유형별 이행강제금은 얼마나 될까요?</H2>
      <p style={body}>
        이행강제금은 시가표준액에 위반 비율을 곱해서 계산해요. 위반 유형에 따라 비율이 다르고, 시정할 때까지 매년 부과돼요.
      </p>

      <SectionBadge>이행강제금 비율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>위반 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>부과 비율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>예시 (30평, 평당 200만원)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["무허가 건축", "100%", "6,000만원"],
              ["용적률 초과", "90%", "5,400만원"],
              ["건폐율 초과", "80%", "4,800만원"],
              ["허가·신고 없는 용도변경", "50%~80%", "3,000~4,800만원"],
            ].map(([type, rate, ex], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{rate}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        이행강제금 = 시가표준액 × 위반면적 × 부과비율{"\n"}
        시정할 때까지 매년(최대 연 2회) 반복 부과{"\n"}
        영리 목적이면 최대 2배 가중
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>형사처벌은 어느 수준까지 가나요?</H2>
      <p style={body}>
        이행강제금과 별개로 형사 고발이 진행될 수 있어요. 지역에 따라 처벌 수위가 달라요.
      </p>

      <SectionBadge>지역별 형사처벌 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>지역</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>징역</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>벌금</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["도시지역", "3년 이하", "5억원 이하"],
              ["도시지역 밖", "2년 이하", "1억원 이하"],
            ].map(([area, prison, fine], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{area}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#dc2626", fontWeight: 700 }}>{prison}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700 }}>{fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        징역과 벌금이 병과(동시 부과)될 수 있어요. 영리 목적이거나 상습적인 위반은 더 무겁게 처벌돼요.
        행정조치로는 허가 취소, 공사 중지, 철거·사용금지 명령이 나올 수 있고요.
      </p>

      <Divider />

      <H2>위반 통보 받으면 어떻게 대응해야 할까요?</H2>
      <p style={body}>
        시정명령을 받았다면 기한 내에 고치는 게 가장 좋아요. 방치하면 비용이 기하급수적으로 불어나거든요.
      </p>

      <SectionBadge>대응 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>위반 건축물 매매 전 반드시 확인하세요</H2>
      <p style={body}>
        위반 건축물을 매수하면 이행강제금 납부 의무가 새 소유자에게 넘어와요.
        매수 전에 아래 항목을 반드시 체크하세요.
      </p>

      <Checklist items={CHECKLIST} />

      <BorderBox title="주의">
        건축물대장에 '위반건축물' 표시가 있으면 은행 담보대출이 거절될 수 있어요.
        매매 시 시세보다 낮게 거래되는 경우가 많고, 합법화 비용까지 고려해야 해요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 건축법으로 작성됐어요. 이행강제금 비율은 지자체 조례에 따라 차이가 있을 수 있어요." />
    </ArticleLayout>
  );
}
