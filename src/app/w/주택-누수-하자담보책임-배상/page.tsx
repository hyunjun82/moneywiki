"use client";

// Q1. 집 매매 후 누수를 발견해서 매도인에게 배상받고 싶은 상황
// Q2. 하자담보책임을 근거로 매도인에게 손해배상 청구 행동
// Q3. 민법 580조 하자담보책임, 6개월 청구기한, 숨겨진 하자 기준, 내용증명→조정→소송 절차
// Q4. GreenBox(배상 가능 여부 판단) + Steps(배상 청구 절차) + Checklist(증거 수집) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, Checklist,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "집 계약 전에 봤는데도 배상받을 수 있나요?", a: "비가 와야 알 수 있는 숨겨진 누수는 매수인이 미리 발견하기 어려워요. 매도인이 고의로 숨겼거나 중대한 과실이 있으면 배상 책임이 있어요." },
  { q: "배상 청구 기한은 언제까지인가요?", a: "하자를 안 날로부터 6개월, 매매계약 후 1년 이내에 청구해야 해요. 기한 넘으면 청구권이 소멸돼요." },
  { q: "아파트 공용부분 누수도 매도인 책임인가요?", a: "공용부분은 관리주체(관리사무소)에게 하자보수를 청구해요. 전유부분(내 집 안)의 누수만 매도인 책임이에요." },
  { q: "수리비 말고 다른 손해도 청구 가능한가요?", a: "수리비, 이사·임시거주 비용, 가구·가전 피해 등 누수로 인한 실제 손해 전부 청구 가능해요. 정신적 피해(위자료)도 인정되는 경우가 있어요." },
  { q: "매도인이 몰랐다고 주장하면요?", a: "매도인이 하자를 몰랐더라도 하자담보책임은 무과실책임이에요. 다만 매수인이 하자를 알았거나 과실로 몰랐으면 청구가 안 돼요." },
  { q: "소송 전에 합의할 수 있나요?", a: "내용증명 보내면 대부분 합의 제안이 와요. 합의 안 되면 하자심사분쟁조정위원회 조정을 먼저 시도하고, 그래도 안 되면 소송해요." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "민법 제580조 (매도인의 하자담보책임)", url: "https://www.law.go.kr/법령/민법" },
    { label: "찾기쉬운 생활법령정보 - 하자담보책임", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1222&ccfNo=3&cciNo=1&cnpClsNo=1" },
    { label: "하자심사분쟁조정위원회", url: "https://www.adc.go.kr" },
  ]},
];

const RELATED = [
  { slug: "아파트-하자보수-청구", title: "아파트 하자보수 청구", description: "아파트 신축 하자보수 청구 방법과 기한이에요." },
  { slug: "매매계약-해제-사유", title: "매매계약 해제 사유", description: "매매계약을 해제할 수 있는 법적 사유예요." },
  { slug: "전세-보증금-반환-소송", title: "전세 보증금 반환 소송", description: "전세 보증금 못 돌려받았을 때 소송 절차예요." },
];

const CLAIM_STEPS = [
  { title: "누수 증거 확보", desc: "누수 현장 사진·동영상을 촬영하고, 발생 일자와 상황을 기록해요. 수리업체 견적서도 받아 두세요.", tip: "사진에 날짜·시간이 찍히도록 촬영" },
  { title: "매도인에게 내용증명 발송", desc: "우체국 내용증명으로 하자 사실과 보수·배상 요청을 보내요. 법적 증거가 되니까 반드시 내용증명으로 보내세요." },
  { title: "합의 시도", desc: "매도인이 수리비를 부담하겠다고 하면 합의서를 작성해요. 합의 내용(금액, 기한, 이행 방법)을 명확히 기재하세요." },
  { title: "조정 신청 (합의 불성립 시)", desc: "하자심사분쟁조정위원회(adc.go.kr)에 조정을 신청해요. 소송보다 빠르고 비용이 적어요." },
  { title: "소송 제기 (조정 불성립 시)", desc: "관할 법원에 손해배상 청구소송을 제기해요. 수리비 + 부대비용 + 위자료를 청구할 수 있어요." },
];

const EVIDENCE_CHECKLIST = [
  "누수 현장 사진·동영상을 날짜 표시해서 촬영했나요?",
  "수리업체 견적서(2곳 이상)를 받았나요?",
  "매매계약서와 등기부등본을 준비했나요?",
  "입주 전 집 상태 사진이 있나요? (하자 미존재 증거)",
  "매도인이 하자를 숨겼다는 정황 증거(대화 기록 등)가 있나요?",
  "누수 발견일로부터 6개월 이내인지 확인했나요?",
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 매매 · 하자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택 누수, 매도인에게 배상받을 수 있을까?<br />
        하자담보책임 청구 조건과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집 사고 이사했는데 비가 오니까 천장에서 물이 새요.
        계약 때는 몰랐던 숨겨진 누수라면 매도인에게 배상을 받을 수 있어요.
        다만 6개월 안에 청구해야 하고, 증거가 핵심이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>누수 배상, 받을 수 있는 경우와 안 되는 경우</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/민법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>민법 제580조</a>에 따르면
        매매 목적물에 하자가 있을 때 매도인이 담보책임을 져요.
        다만 매수인이 하자를 알았거나, 과실로 몰랐을 경우에는 청구가 안 돼요.
      </p>

      <GreenBox title="배상 가능 여부 판단">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>상황</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>배상</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>이유</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px" }}>비 와야 알 수 있는 숨겨진 누수</td>
              <td style={{ padding: "8px 6px", color: "#1D9E75", fontWeight: 600 }}>가능</td>
              <td style={{ padding: "8px 6px" }}>매수인이 발견할 수 없는 하자</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px" }}>매도인이 고의로 은닉한 누수</td>
              <td style={{ padding: "8px 6px", color: "#1D9E75", fontWeight: 600 }}>가능</td>
              <td style={{ padding: "8px 6px" }}>매도인 고의·중과실</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px" }}>천장 물얼룩이 보이는데 무시하고 계약</td>
              <td style={{ padding: "8px 6px", color: "#dc2626", fontWeight: 600 }}>어려움</td>
              <td style={{ padding: "8px 6px" }}>매수인 과실</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 6px" }}>발견 후 6개월 경과</td>
              <td style={{ padding: "8px 6px", color: "#dc2626", fontWeight: 600 }}>불가</td>
              <td style={{ padding: "8px 6px" }}>청구권 소멸</td>
            </tr>
          </tbody>
        </table>
      </GreenBox>

      <Divider />

      <H2>배상 청구는 어떤 순서로 할까?</H2>
      <p style={body}>
        바로 소송하는 것보다 단계별로 접근하는 게 비용·시간 면에서 유리해요.
        내용증명 → 합의 → 조정 → 소송 순서로 진행하세요.
      </p>

      <Steps steps={CLAIM_STEPS} />

      <Divider />

      <H2>청구 기한은 얼마나 될까?</H2>
      <p style={body}>
        민법 제582조에 따르면 하자를 안 날로부터 6개월 이내에 권리를 행사해야 해요.
        6개월이 지나면 청구권이 소멸돼요.
      </p>

      <BorderBox title="기한 정리">
        <p style={{ fontSize: 13, lineHeight: 1.9, margin: 0 }}>
          &bull; 하자 발견일 기준: 6개월 이내 청구<br />
          &bull; 매매계약일 기준: 1년 이내<br />
          &bull; 매도인 고의 은닉: 일반 소멸시효(10년) 적용 가능<br /><br />
          비 온 날 누수를 발견했다면 그날이 기산일이에요. 바로 증거를 확보하고 내용증명을 보내세요.
        </p>
      </BorderBox>

      <Divider />

      <H2>누수 증거 수집 체크리스트</H2>
      <p style={body}>
        배상 청구에서 가장 중요한 건 증거예요. 아래 항목을 빠짐없이 챙겨 두세요.
      </p>

      <Checklist items={EVIDENCE_CHECKLIST} />

      <Divider />
      <ArticleAd position="mid" />

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법을 바탕으로 작성했어요. 개별 사안은 변호사에게 상담받으세요." />
    </ArticleLayout>
  );
}
