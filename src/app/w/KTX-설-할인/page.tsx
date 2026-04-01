"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 설 연휴에 KTX/SRT 할인이 있는지, 예매는 어떻게 하는지 알고 싶은 상황. 귀성 비용을 아끼려는 목적.
// Q2. 역귀성 할인 열차를 확인하고, 코레일톡/SRT 앱에서 할인 열차를 예매하는 행동.
// Q3. 2월 13~18일 6일간 할인, 역귀성(지방→서울) 할인폭 크고, 코레일톡·SRT 앱 예매, 1개월 전 예매 시작.
// Q4. GreenBox(핵심 일정) + 표(구간별 할인 요금) + Steps(예매 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Steps,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const BOOKING_STEPS = [
  { title: "앱 설치", desc: "코레일톡(KTX) 또는 SRT 앱을 설치해요." },
  { title: "회원가입·로그인", desc: "앱에 가입하고 로그인해요. 비회원 예매도 가능하지만 할인 열차 확인이 쉬워요." },
  { title: "열차 조회", desc: "출발일을 설정하고 '할인' 표시가 된 열차를 찾아요. 역귀성(지방→서울) 열차가 할인 대상이에요.", tip: "인기 시간대는 빨리 매진돼요" },
  { title: "좌석 선택·결제", desc: "할인 좌석을 선택하고 결제하면 끝이에요. 할인은 자동 적용돼요." },
];

const FAQS = [
  { q: "KTX 설 할인 예매는 언제 시작하나요?", a: "설 연휴 1개월 전부터 예매 가능해요. 2026년은 1월 중순부터니까 앱에서 일정을 미리 확인해두세요." },
  { q: "SRT 설 할인은 자동으로 적용되나요?", a: "네, SRT 앱에서 할인 표시된 열차를 선택하면 결제 시 자동 적용돼요. 별도 쿠폰 입력 없어요." },
  { q: "역귀성 할인은 왜 더 큰가요?", a: "귀경(지방→서울) 때 좌석이 많이 남아서예요. 정부가 수요 분산을 위해 역귀성 할인을 더 크게 적용해요." },
  { q: "역 창구에서도 할인 예매가 되나요?", a: "네, 역 창구에서도 예매할 수 있어요. 수수료는 없지만 대기 시간이 길어요. 앱 예매가 훨씬 편해요." },
  { q: "설 고속도로 무료랑 비교하면 뭐가 나을까요?", a: "귀성(서울→지방)은 고속도로 무료(2.15~18)가 유리하고, 귀경(지방→서울)은 KTX 역귀성 할인이 유리한 경우가 많아요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "코레일 KTX 예매", url: "https://www.letskorail.com" },
      { label: "SR SRT 예매", url: "https://etk.srail.kr" },
    ],
  },
];

const RELATED = [
  { slug: "설-고속도로-무료", title: "설 고속도로 무료 구간", description: "설 연휴 고속도로 무료 기간과 해당 구간을 정리했어요." },
  { slug: "설-성수품-할인", title: "설 성수품 할인 정보", description: "설에 할인되는 성수품 목록과 구매 방법이에요." },
  { slug: "온누리상품권-환급", title: "온누리상품권 환급", description: "전통시장 이용 시 온누리상품권으로 추가 할인받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활정보 · 교통 · 설 연휴</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        KTX·SRT 설 할인<br />
        역귀성 열차 예매 방법과 할인 정보
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        설 연휴 기차표 예매하셨나요?
        2026년 설에 KTX·SRT 일부 열차가 할인돼요.
        역귀성(지방→서울) 할인이 더 크니까, 예매 시기와 방법을 미리 확인해두면 좋아요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>설 할인 기간과 핵심 정보</H2>
      <p style={body}>
        2026년 설 연휴 기간에 KTX·SRT 일부 열차가 10~30% 할인돼요.
        역귀성 열차가 할인폭이 더 크니까 귀경 때 활용하면 교통비를 아낄 수 있어요.
      </p>

      <GreenBox>
        · 할인 기간: 2월 13일(목) ~ 18일(화), <strong>6일간</strong><br />
        · 할인 대상: KTX·SRT 일부 열차 (앱에서 '할인' 표시 확인)<br />
        · 할인폭: <strong>10~30%</strong> (역귀성 열차가 더 큼)<br />
        · 예매 시작: 설 연휴 <strong>1개월 전</strong> (1월 중순부터)
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>구간별 예상 할인 요금은?</H2>
      <p style={body}>
        역귀성(지방→서울) 기준으로 30% 할인 적용 시 예상 요금이에요.
        정확한 할인율은 열차별로 다르니까 앱에서 확인이 필요해요.
      </p>

      <SectionBadge>주요 구간 할인 예상 (30% 기준)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구간</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>정상 요금</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>할인 후</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>절약</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["서울-부산", "59,800원", "약 41,860원", "17,940원"],
              ["서울-대전", "23,700원", "약 16,590원", "7,110원"],
              ["서울-광주", "44,800원", "약 31,360원", "13,440원"],
            ].map(([route, normal, disc, save], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 500 }}>{route}</td>
                <td style={{ padding: "9px 12px", color: "#888" }}>{normal}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{disc}</td>
                <td style={{ padding: "9px 12px", color: "#ef4444" }}>{save}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        <strong>귀성 vs 귀경, 뭐가 유리할까?</strong><br /><br />
        · 귀성(서울→지방): 할인 적음 → <strong>고속도로 무료(2.15~18)</strong> 활용이 유리<br />
        · 귀경(지방→서울): 할인폭 큼 → <strong>KTX·SRT 역귀성 할인</strong> 활용이 유리
      </BorderBox>

      <Divider />

      <H2>예매는 이렇게 하면 돼요</H2>
      <p style={body}>
        코레일톡(KTX)이나 SRT 앱에서 예매하는 게 가장 편해요.
        인기 시간대는 예매 시작하자마자 빠르게 매진되니까 1개월 전에 바로 예약하세요.
      </p>

      <Steps steps={BOOKING_STEPS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 코레일·SR 발표 자료를 바탕으로 작성됐어요. 할인 열차와 할인율은 매년 달라질 수 있으니 코레일톡·SRT 앱에서 최신 정보를 확인해봐요." />
    </ArticleLayout>
  );
}
