"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 콜센터·판매직으로 일하면서 고객 폭언에 시달리는데, 내가 법적 보호 대상인지 모르겠는 상황
// Q2. 산업안전보건법상 고객응대근로자에 해당하는지 확인하고, 폭언 발생 시 업무 중단을 요청하기
// Q3. 고객응대근로자 법적 정의(산안법 제41조), 해당 업무 범위, 사업주 의무(예방+사후조치), 위반 시 과태료 1천만원
// Q4. GreenBox(정의·해당 직종 표) + EligibilityChecker(내가 해당되나) + Steps(폭언 발생 시 대응 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, EligibilityChecker,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "온라인 채팅 상담원도 고객응대근로자에 해당되나요?", a: "네, 해당돼요. 정보통신망을 통해 고객을 상대하는 업무도 포함돼요. 전화, 대면, 채팅, 이메일 모두 같은 기준이 적용되죠." },
  { q: "고객이 욕하면 바로 전화를 끊어도 되나요?", a: "가능해요. 산업안전보건법 제41조 제2항에 따라 고객 폭언 시 업무를 일시적으로 중단할 수 있어요. 회사가 이를 이유로 불이익을 주면 위법이에요." },
  { q: "사업주가 보호 조치를 안 하면 어디에 신고하나요?", a: "고용노동부(1350)에 산업안전보건법 위반으로 신고하면 돼요. 근로감독관이 사업장을 조사하고 시정 명령을 내려요." },
  { q: "파견직이나 하청 직원도 보호받을 수 있나요?", a: "네. 고용 형태와 관계없이 고객을 직접 응대하는 업무에 종사하면 보호 대상이에요. 파견 회사와 사용 회사 모두 의무가 있어요." },
  { q: "고객 폭언으로 우울증이 생기면 산재 인정되나요?", a: "인정될 수 있어요. 업무상 스트레스로 인한 정신질환은 산재 심사 대상이에요. 진료 기록과 업무 관련성을 입증하면 돼요." },
  { q: "사업주가 안내문을 안 붙이면 바로 과태료가 나오나요?", a: "바로 부과되진 않아요. 고용노동부 점검 시 시정 명령이 먼저 나오고, 미이행 시 1천만원 이하 과태료가 부과돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "산업안전보건법 제41조", url: "https://www.law.go.kr/법령/산업안전보건법" },
      { label: "고용노동부 고객응대근로자 보호 가이드라인", url: "https://www.moel.go.kr" },
      { label: "찾기쉬운 생활법령정보 - 고객응대근로자", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1407" },
    ],
  },
];

const RELATED = [
  { slug: "휴업수당-지급-기준-계산", title: "휴업수당 지급 기준", description: "회사 사정으로 쉬게 됐을 때 받는 수당이에요." },
  { slug: "연차촉진-제도-절차", title: "연차촉진 제도 절차", description: "연차 사용촉진 서면 통보 요건을 다뤄요." },
  { slug: "파견근로자-기간-제한", title: "파견근로자 기간 제한", description: "파견직 2년 초과 시 직접고용 의무를 다뤄요." },
];

const CHECK_ITEMS = [
  { id: "c1", label: "고객을 직접 대면하거나 전화·채팅으로 응대하는 업무를 해요" },
  { id: "c2", label: "상품 판매나 서비스 제공 업무에 종사하고 있어요" },
  { id: "c3", label: "근로계약을 맺은 근로자(정규직·계약직·파견직 모두 포함)예요" },
  { id: "c4", label: "고객의 폭언·성희롱·폭행을 경험한 적이 있어요" },
];

const STEPS_DATA = [
  { title: "고객 폭언 발생 시 업무 중단", desc: "산업안전보건법 제41조에 따라 폭언·성희롱 발생 즉시 업무를 중단할 수 있어요. 전화라면 통화 종료, 대면이라면 자리를 떠나도 돼요." },
  { title: "관리자에게 즉시 보고", desc: "사건 내용(일시, 고객 정보, 발언 내용)을 관리자에게 보고하세요. 녹음이나 메모가 있으면 증거로 남겨두세요." },
  { title: "사업주 보호 조치 요청", desc: "근무 장소 변경, 배치전환, 유급 휴식, 심리상담 지원 중 필요한 조치를 요청하세요. 사업주는 거부할 수 없어요." },
  { title: "미조치 시 고용노동부 신고", desc: "사업주가 보호 조치를 하지 않으면 고용노동부(1350)에 산업안전보건법 위반으로 신고하세요. 1천만원 이하 과태료가 부과돼요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 고객응대근로자 · 감정노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고객응대근로자, 나도 해당될까?<br />
        보호 범위와 폭언 대응법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        콜센터에서 하루 종일 욕을 듣거나, 매장에서 고객한테 막말을 당해도 참아야 하는 줄 알았죠?
        산업안전보건법 제41조가 고객응대근로자를 보호하고 있어요.
        폭언이 발생하면 업무를 중단할 수 있고, 사업주가 보호 조치를 안 하면 1천만원 이하 과태료가 부과돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>고객응대근로자, 정확히 누구를 말하나요?</H2>
      <p style={body}>
        산업안전보건법 제41조에서 정의하는 고객응대근로자는 &quot;고객을 직접 대면하거나 정보통신망을 통해 상대하면서 상품을 판매하거나 서비스를 제공하는 업무에 종사하는 근로자&quot;예요.
        전화, 대면, 온라인 채팅 모두 포함되죠.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>응대 방식</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>해당 직종 예시</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "전화 응대", jobs: "콜센터 상담원, 텔레마케터, AS 접수 상담원" },
              { type: "대면 응대", jobs: "백화점 판매직, 은행 창구, 호텔 프런트, 식당 서빙" },
              { type: "온라인 응대", jobs: "쇼핑몰 채팅 상담, SNS 메시지 응대, 이메일 상담" },
              { type: "민원 응대", jobs: "정부 민원창구, 병원 접수처, 공항 안내데스크" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.type}</td>
                <td style={{ padding: "5px 8px" }}>{row.jobs}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 고용 형태(정규직·계약직·파견직) 관계없이 해당 업무 종사자 모두 보호 대상
        </p>
      </GreenBox>

      <H2>나도 보호 대상인지 확인해 보세요</H2>
      <p style={body}>
        아래 항목에 체크해 보세요. 고객을 직접 상대하는 업무를 하고 있다면 고객응대근로자로 보호받을 수 있어요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="고객응대근로자에 해당돼요. 고객 폭언·성희롱 시 업무 중단권과 사업주 보호 조치를 요구할 수 있어요."
        partialMatchText="일부 조건이 충족돼요. 고객을 직접 응대하는 업무라면 보호 대상일 가능성이 높아요."
      />

      <H2>고객 폭언 시 이렇게 대응하세요</H2>
      <p style={body}>
        참고 넘기지 마세요. 법이 보장하는 권리를 행사하면 돼요.
        아래 절차대로 움직이면 사업주가 조치를 취하지 않을 수 없어요.
      </p>

      <Steps steps={STEPS_DATA} />

      <H2>사업주는 어떤 의무가 있나요?</H2>
      <p style={body}>
        산업안전보건법 제41조는 사업주에게 예방 의무와 사후 조치 의무를 모두 부과하고 있어요.
        예방 조치를 안 하면 그 자체로 법 위반이에요.
      </p>

      <BorderBox>
        <strong>사업주 필수 조치 사항</strong><br /><br />
        ▶ <strong>예방 조치</strong>: 고객 안내문 게시(&quot;폭언 시 상담 종료&quot;), 업무 매뉴얼 마련, 연 1회 이상 건강장해 예방 교육<br />
        ▶ <strong>사후 조치</strong>: 업무 중단 허용, 근무 장소 변경·배치전환, 유급 휴식 부여, 심리상담 지원<br />
        ▶ <strong>금지 사항</strong>: 업무 중단을 이유로 해고·징계 등 불이익 처분 금지<br /><br />
        ★ 위반 시 1천만원 이하 과태료 / 불이익 처분 시 1년 이하 징역 또는 1천만원 이하 벌금
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 산업안전보건법 기준으로 작성됐어요. 구체적인 사업장 적용은 고용노동부(1350)에 확인하세요." />
    </ArticleLayout>
  );
}
