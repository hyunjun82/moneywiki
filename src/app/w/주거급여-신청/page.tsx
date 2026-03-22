"use client";

// Q1. 월세 부담이 크거나 소득이 낮아서 정부 주거비 지원을 받을 수 있는지 알고 싶은 저소득 가구
// Q2. 내 소득인정액이 기준 중위소득 48% 이하인지 확인하고, 주민센터나 복지로에서 주거급여를 신청한다
// Q3. 소득 기준(중위소득 48%), 지역별 기준임대료, 임차급여·수선유지급여 차이, 신청 서류, 청년 분리지급
// Q4. EligibilityChecker(자격 확인) + 지역별 지원금 표 + Steps(신청 절차) + DocTable(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, Disclaimer,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "주민센터에 방문하거나 복지로에서 온라인 신청해요",
    desc: "거주지 관할 주민센터(행정복지센터)를 방문하거나, 복지로(bokjiro.go.kr)에서 온라인으로 신청할 수 있어요. 전화 상담은 정부 민원 129번이에요.",
    tip: "복지로 온라인 신청이 가장 편해요",
    link: { label: "복지로 바로가기", href: "https://www.bokjiro.go.kr" },
  },
  {
    title: "서류를 제출해요",
    desc: "사회보장급여 신청서, 신분증, 임대차계약서(임차인), 통장 사본, 소득·재산 증빙 서류를 내면 돼요. 자가 소유자는 건물등기부등본도 필요해요.",
    tip: "서류가 부족하면 주민센터에서 안내해줘요",
  },
  {
    title: "자격 조사를 받아요 (약 30일)",
    desc: "신청 후 약 30일간 소득인정액, 재산, 주거 상태를 조사해요. 소득인정액 = 소득 + 재산의 소득환산액이에요. 조사 과정에서 추가 서류를 요청받을 수 있어요.",
  },
  {
    title: "급여 결정 통지를 받아요",
    desc: "조사 결과에 따라 지급 여부와 금액이 결정돼요. 결정서가 우편으로 오고, 급여는 매월 20일경 수급자 계좌로 입금돼요.",
    tip: "이사하면 14일 이내에 변경 신고 필수",
  },
];

const FAQS = [
  { q: "주거급여 받으면 매달 얼마 나오나요?", a: "지역과 가구원수에 따라 달라요. 서울 1인가구 기준 월 최대 34.1만원, 4인가구는 최대 52.7만원이에요. 실제 월세와 기준임대료 중 적은 금액을 지급해요." },
  { q: "전세 살아도 받을 수 있나요?", a: "네. 전세 가구는 전세금의 연 4%를 12로 나눈 금액과 기준임대료 중 적은 금액을 받아요. 전세 2억이면 월 약 66만원이 기준인데, 기준임대료가 더 적으면 기준임대료만큼 받아요." },
  { q: "직장 다녀도 받을 수 있나요?", a: "소득인정액이 기준 중위소득 48% 이하면 가능해요. 직장인이라도 소득이 기준 이하면 대상이에요. 복지로 모의계산기로 미리 확인해보세요." },
  { q: "집이 있어도 주거급여를 받을 수 있나요?", a: "네. 자가 소유자는 수선유지급여를 받아요. 집 상태에 따라 경보수 457만원, 중보수 849만원, 대보수 1,241만원을 지원해요. 도배·장판부터 지붕·벽체 보수까지 돼요." },
  { q: "부모님과 따로 사는 청년도 받을 수 있나요?", a: "주거급여 수급가구의 미혼 청년(만 19~30세)이 부모와 별도 거주하면 청년 주거급여 분리지급을 신청할 수 있어요. 청년 명의로 따로 지급돼요." },
  { q: "주거급여랑 다른 복지 중복으로 받을 수 있나요?", a: "긴급복지 주거지원과는 중복 수급이 제한돼요. 다른 주거 지원 사업과도 중복 여부를 확인해야 해요. 생계급여, 의료급여와는 중복 수급이 가능해요." },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 주거급여 · 신청 방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주거급여, 나도 받을 수 있나요?<br />
        자격 조건부터 신청 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "월세가 빠듯한데, 정부에서 주거비를 지원해준다고요?"
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주거급여법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주거급여법</a>에 따라 기준 중위소득 48% 이하 가구에게 월세·전세 주거비를 지원해요. 임차 가구는 <strong>임차급여</strong>, 자가 소유 가구는 <strong>수선유지급여</strong>를 받을 수 있어요.
      </p>

      <Divider />

      <H2>소득 기준, 내가 해당되는지 보세요</H2>
      <p style={body}>
        소득인정액이 기준 중위소득 48% 이하면 대상이에요. 소득인정액은 실제 소득에 재산의 소득환산액을 더한 거예요.
      </p>

      <SectionBadge>2026년 주거급여 선정 기준 (중위소득 48%)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>가구원수</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>소득인정액 기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1인", "약 111만원"],
              ["2인", "약 184만원"],
              ["3인", "약 236만원"],
              ["4인", "약 288만원"],
              ["5인", "약 338만원"],
            ].map(([size, amount], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 600 }}>{size}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        <a href="https://www.bokjiro.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>복지로</a>에서 모의계산을 해보면 내 소득인정액이 얼마인지 미리 확인할 수 있어요.
      </p>

      <Divider />

      <H2>임차급여, 지역별로 이만큼 받아요</H2>
      <p style={body}>
        월세·전세 세입자가 받는 임차급여는 지역(급지)과 가구원수에 따라 기준임대료가 정해져 있어요. 실제 월세와 기준임대료 중 적은 금액을 지급해요.
      </p>

      <SectionBadge>2026년 기준임대료 (월)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>급지</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>1인</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>2인</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>3인</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>4인</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["서울", "34.1만", "38.2만", "45.5만", "52.7만"],
              ["경기·인천", "26.8만", "30.2만", "35.8만", "41.4만"],
              ["광역시·세종", "21.6만", "24.0만", "28.7만", "33.2만"],
              ["그 외", "17.8만", "19.7만", "23.6만", "27.4만"],
            ].map(([region, p1, p2, p3, p4], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{region}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{p1}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{p2}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{p3}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{p4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        자가 소유자는 수선유지급여를 받아요{"\n"}
        · 경보수 (도배·장판): 457만원 / 3년 주기{"\n"}
        · 중보수 (난방·욕실): 849만원 / 5년 주기{"\n"}
        · 대보수 (지붕·벽체): 1,241만원 / 7년 주기
      </GreenBox>

      <Divider />

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>
        주민센터 방문 또는 복지로 온라인 신청이에요. 신청부터 지급까지 약 30일 정도 걸려요.
      </p>
      <Steps steps={STEPS} />

      <Divider />

      <H2>청년이라면 분리지급도 가능해요</H2>
      <p style={body}>
        주거급여 수급가구의 미혼 청년(만 19~30세)이 부모와 따로 살면, 부모 가구와 별도로 청년 명의 계좌에 임차급여를 지급받을 수 있어요.
      </p>
      <BorderBox>
        청년 주거급여 분리지급 조건{"\n"}
        · 만 19~30세 미혼 / 주거급여 수급가구 자녀{"\n"}
        · 부모와 별도 거주 (주소지가 달라야 함){"\n"}
        · 청년 명의 임대차계약서 필요
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.8 }}>
        출처: <a href="https://www.law.go.kr/법령/주거급여법" style={{ color: "#9ca3af" }}>주거급여법</a> · <a href="https://www.myhome.go.kr" style={{ color: "#9ca3af" }}>마이홈포털</a> · <a href="https://www.bokjiro.go.kr" style={{ color: "#9ca3af" }}>복지로</a>
      </p>
      <Disclaimer text="이 글은 2026년 3월 기준 주거급여법과 보건복지부 고시를 참고했어요. 정확한 소득인정액은 복지로 모의계산으로 확인하세요." />
    </div>
  );
}
