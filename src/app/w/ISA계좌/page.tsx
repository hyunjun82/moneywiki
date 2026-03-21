"use client";
// Q1: 절세 통장 ISA가 뭔지 모르거나 가입을 고민 중인 직장인·자영업자
// Q2: 본인 소득에 맞는 ISA 유형(중개형/서민형) 선택 후 증권사 앱에서 개설
// Q3: 비과세 한도(200만 vs 400만), 운용방식(중개형/신탁형), 3년 의무유지, 연 2,000만원 납입한도, 손익통산
// Q4: GreenBox(유형 비교표) + GreenBox(세금 시뮬레이션) + BorderBox(개설 절차) + Steps + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";

const FAQS = [
  {
    q: "ISA 계좌 중개형과 신탁형 뭐가 더 유리해요?",
    a: "주식·ETF를 직접 사고팔고 싶으면 중개형이에요. 은행에 맡기고 싶으면 신탁형이고요. 중개형은 수수료가 낮고 배당금도 비과세 적용돼서 주식 투자자에게 유리해요.",
  },
  {
    q: "서민형과 일반형 비과세 한도가 왜 달라요?",
    a: "소득이 낮은 분에게 더 큰 혜택을 주려는 취지예요. 서민형은 총급여 5,000만원 이하면 400만원까지, 일반형은 소득 무관하게 200만원까지 비과세예요.",
  },
  {
    q: "3년 전에 해지하면 손해가 커요?",
    a: "비과세·분리과세 혜택이 전부 사라져요. 수익 전체에 15.4% 세금이 부과돼요. 원금은 중도 인출해도 불이익 없지만, 수익 부분은 만기까지 유지해야 해요.",
  },
  {
    q: "ISA에서 해외주식 직접 매매되나요?",
    a: "해외주식 직접 매매는 안 돼요. 대신 국내 상장 해외 ETF(TIGER 미국S&P500, KODEX 나스닥100 등)로 간접 투자는 가능해요.",
  },
  {
    q: "ISA 만기 후 연금계좌로 옮기면 뭐가 좋아요?",
    a: "ISA 만기금을 연금저축이나 IRP로 이전하면 이전 금액의 10%(최대 300만원) 추가 세액공제를 받아요. ISA 비과세 + 연금 세액공제로 이중 절세가 가능해요.",
  },
  {
    q: "ISA 계좌 여러 개 만들 수 있나요?",
    a: "1인 1계좌만 개설 가능해요. 은행·증권사 통틀어 1개뿐이에요. 다른 금융사로 이동은 가능하니까 처음에 잘 선택하는 게 중요해요.",
  },
];

const REFERENCES = [
  {
    category: "법률·공식 자료",
    items: [
      { label: "조세특례제한법 제91조의18 (ISA)", url: "https://www.law.go.kr/법령/조세특례제한법" },
      { label: "금융위원회: ISA 제도 안내", url: "https://www.fsc.go.kr" },
      { label: "금융감독원: ISA 계좌 비교", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "ISA계좌-납입한도", title: "ISA 납입 한도 연간 2,000만원", description: "연간·누적 한도와 이월 규칙 정리예요." },
  { slug: "ISA계좌-ETF-추천", title: "ISA 계좌 ETF 추천", description: "ISA에 담으면 비과세로 수익 나는 ETF예요." },
  { slug: "ISA계좌-만기", title: "ISA 만기 후 연금 전환 방법", description: "만기금을 연금저축·IRP로 옮기는 절세 전략이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 절세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        ISA 계좌, 가입하면 뭐가 좋을까?<br />
        비과세 한도부터 개설 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주식으로 500만원 벌면 세금 77만원 떼여요. 근데 ISA 계좌에 넣어두면 같은 수익에 세금이 9.9만원까지 줄어요.
        ISA(개인종합자산관리계좌)는 주식·펀드·예금 수익을 한 계좌에서 합산해서 세금을 깎아주는 절세 통장이에요.
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75" }}>조세특례제한법 제91조의18</a>에 근거한 제도예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>ISA 계좌란? 세금 줄여주는 절세 통장</H2>
      <p style={body}>
        ISA는 쉽게 말해 여러 금융상품을 한 바구니에 담아서 세금 혜택받는 통장이에요.
        보통 주식 계좌는 주식만, 펀드 계좌는 펀드만 담잖아요. ISA는 주식, 펀드, 예금, ETF를 한 계좌에 넣을 수 있어요.
      </p>
      <p style={body}>
        핵심은 <strong>손익통산</strong>이에요. 주식으로 300만원 벌고 펀드로 100만원 손해봤다면?
        일반 계좌는 300만원에 세금을 매기지만, ISA는 순이익 200만원에만 과세해요.
        게다가 순이익 200만원(서민형은 400만원)까지는 세금이 0원이에요.
        초과분도 일반 세율 15.4%가 아니라 9.9%만 부과하고요.
      </p>

      <GreenBox>
        <strong>ISA 핵심 구조</strong><br />
        <br />
        손익통산: 이익과 손실을 합산해서 순이익에만 과세<br />
        비과세 한도: 일반형 200만원 / 서민형 400만원<br />
        초과분 세율: 9.9% (일반 계좌 15.4%보다 5.5%p 낮음)<br />
        의무 유지: 3년 (중도 해지 시 혜택 소멸)<br />
        납입 한도: 연 2,000만원, 총 1억원<br />
        <br />
        <span style={{ fontSize: 12, color: "#666" }}>출처: <a href="https://www.fsc.go.kr" style={{ color: "#1D9E75" }}>금융위원회</a> ISA 제도 안내</span>
      </GreenBox>

      <Divider />

      <H2>유형 비교,중개형·신탁형·서민형·일반형</H2>
      <p style={body}>
        ISA는 두 가지 기준으로 나눠요. 운용 방식(내가 직접 vs 맡기기)과 소득 기준(비과세 한도)이에요.
        대부분 <strong>중개형 + 서민형</strong> 조합을 선택해요. 주식 직접 매매 + 400만원 비과세라서 가장 유리하거든요.
      </p>

      <GreenBox>
        <strong>운용 방식별 비교</strong><br />
        <br />
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>유형</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>운용 주체</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>투자 가능 상품</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>수수료</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "중개형", who: "본인 직접", what: "주식, ETF, 펀드, 채권", fee: "낮음 (0.1~0.3%)" },
              { type: "신탁형", who: "은행 위탁", what: "펀드, 예금", fee: "중간 (0.3~0.5%)" },
              { type: "일임형", who: "증권사 일임", what: "포트폴리오 자동 구성", fee: "높음 (0.5~1.0%)" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: i === 0 ? 700 : 400 }}>{r.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{r.who}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{r.what}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{r.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <strong>소득 기준별 비과세 한도</strong><br />
        서민형 (총급여 5,000만원 이하): <strong>400만원</strong> 비과세<br />
        일반형 (소득 무관): <strong>200만원</strong> 비과세<br />
        농어민형 (종합소득 3,800만원 이하): <strong>400만원</strong> 비과세
      </GreenBox>

      <Divider />

      <H2>세금 절감,일반 계좌와 얼마나 차이 날까</H2>
      <p style={body}>
        배당·이자 수익 500만원 기준으로 비교해볼게요. 차이가 꽤 커요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>계좌 유형</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>비과세</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>세금</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>실수령</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "일반 계좌", free: "없음", tax: "77만원", net: "423만원" },
              { type: "ISA 일반형", free: "200만원", tax: "29.7만원", net: "470.3만원" },
              { type: "ISA 서민형", free: "400만원", tax: "9.9만원", net: "490.1만원" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 2 ? "rgba(29,158,117,0.06)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: i === 2 ? 700 : 400 }}>{r.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{r.free}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#E53E3E" }}>{r.tax}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontWeight: i === 2 ? 700 : 400 }}>{r.net}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          수익 500만원 기준 | 서민형은 일반 계좌 대비 약 67만원 절세<br />
          비과세 초과분 세율 9.9% (일반 15.4%보다 5.5%p 낮음)
        </p>
      </GreenBox>
      <p style={body}>
        같은 500만원을 벌어도 서민형 ISA에 넣어두면 67만원을 더 가져가는 거예요.
        3년, 5년 장기로 가면 절세 효과가 수백만 원 단위로 쌓이죠.
      </p>

      <Divider />

      <H2>가입 조건과 제한사항</H2>
      <p style={body}>
        만 19세 이상이면 누구나 가입할 수 있어요. 근로소득이 있으면 만 15세부터도 가능하고요.
        다만 <strong>금융소득종합과세 대상자</strong>(이자·배당소득 연 2,000만원 초과)는 가입이 안 돼요.
      </p>

      <BorderBox>
        <strong>가입 조건 정리</strong><br />
        <br />
        나이: 만 19세 이상 (근로소득자는 만 15세)<br />
        계좌 수: 1인 1계좌 (은행·증권사 통틀어)<br />
        제한: 금융소득종합과세 대상자 가입 불가<br />
        서민형 추가 조건: 총급여 5,000만원 이하 또는 종합소득 3,800만원 이하<br />
        <br />
        <strong>납입 한도</strong><br />
        연간: 최대 2,000만원<br />
        총 한도: 1억원<br />
        이월: 미사용 한도는 다음 해로 넘길 수 있음
      </BorderBox>

      <Divider />

      <H2>ISA 계좌 개설하는 방법</H2>
      <p style={body}>
        은행·증권사 앱에서 5분이면 끝나요. 서민형은 소득증명원을 미리 홈택스에서 발급받아두면 바로 신청할 수 있어요.
      </p>

      <Steps items={[
        { title: "증권사·은행 앱 설치", desc: "토스증권, 카카오페이증권, NH투자증권, KB국민은행 등 원하는 금융사 앱을 설치해요." },
        { title: "ISA 메뉴 → 유형 선택", desc: "운용 방식(중개형/신탁형)과 소득 기준(일반형/서민형)을 골라요. 주식 투자할 거면 중개형이에요." },
        { title: "본인인증 (신분증 촬영)", desc: "앱에서 신분증 사진 찍으면 비대면 인증이 완료돼요." },
        { title: "서민형이면 소득증명원 제출", desc: "홈택스에서 소득금액증명원을 발급(3분)받아 앱에 업로드해요." },
        { title: "개설 완료 → 자동이체 설정", desc: "매월 50~166만원 자동이체를 걸어두면 납입 한도를 효율적으로 쓸 수 있어요." },
      ]} />

      <p style={body}>
        중개형은 증권사에서만 개설돼요. 은행에서는 중개형을 안 다뤄요.
        신탁형은 은행·증권사 둘 다 가능하니까 수수료 비교 후 선택하세요.
      </p>

      <Divider />

      <H2>만기 후 선택지 3가지</H2>
      <p style={body}>
        3년(또는 5년) 유지 후 만기가 오면 선택지가 3가지예요.
      </p>

      <BorderBox>
        <strong>만기 후 옵션</strong><br />
        <br />
        1. 해지 후 인출: 비과세 혜택 받은 상태로 현금화<br />
        2. 연장: 최대 5년까지 연장하며 세금 혜택 유지<br />
        3. <a href="/w/연금저축" style={{ color: "#1D9E75" }}>연금저축</a>·IRP 전환: 이전 금액의 10%(최대 300만원) 추가 세액공제<br />
        <br />
        당장 쓸 돈이면 1번, 노후 자금이면 3번이 유리해요.
        만기 60일 이내에 연금계좌로 옮겨야 추가 공제를 받을 수 있어요.
      </BorderBox>

      <p style={body}>
        특히 3번 연금 전환이 가장 강력한 절세 전략이에요.
        ISA에서 비과세 혜택 받고, 연금저축으로 옮기면서 세액공제까지 받으니까 이중 절세가 되는 거예요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 금융위원회·조세특례제한법 기준으로 작성했어요. ISA 서민형 소득 조건은 직전 과세기간 기준이며, 개설 시 금융사에서 확인해요." />
    </ArticleLayout>
  );
}
