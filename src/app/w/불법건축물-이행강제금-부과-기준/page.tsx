"use client";
// Q1: 불법 증축 건물을 샀거나 직접 지었는데 구청에서 이행강제금 통보를 받은 상황
// Q2: 내 이행강제금이 얼마인지 계산하고, 감경·면제 방법을 선택해 대응한다
// Q3: 이행강제금 계산 공식(면적x공시지가x부과율x감경율), 감경 조건 3가지, 시정·철거 절차, 불복 방법
// Q4: GreenBox(계산 공식) + BorderBox(감경 조건 비교) + Steps(시정 절차) + DocTable(불복 서류)
// MAP-INTRO: 구청에서 이행강제금 납부 통보가 왔죠?
// MAP-TYPE: 절차
// MAP-H2: 이행강제금 개념 > 계산 공식과 부과율 > 감경 조건 3가지 > 시정·철거 절차 > 불복·이의신청 > FAQ
// MAP-COMP: GreenBox > BorderBox > BorderBox > BorderBox > GreenBox > FAQ

import { H2, SectionBadge, GreenBox, BorderBox, Divider, body } from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { Disclaimer } from "@/components/article-ui/Disclaimer";

const FAQS = [
  {
    q: "이행강제금은 몇 번이나 부과되나요?",
    a: "시정명령을 이행할 때까지 연 2회까지 반복 부과돼요. 법적으로는 시정 완료 시점까지 계속 나올 수 있으니, 빨리 시정하는 게 금전적으로 유리하죠.",
  },
  {
    q: "불법 증축 부분만 철거하면 면제되나요?",
    a: "네, 위반 부분을 원상복구하고 시정 결과를 구청에 제출하면 불법건축물 지정이 해제돼요. 이후 추가 부과는 없고요. 다만 이미 부과된 금액은 납부해야 하죠.",
  },
  {
    q: "불법건축물을 모르고 샀는데 감경이 가능한가요?",
    a: "가능해요. 위반 발생 이후 소유권이 변경된 경우 75% 감경을 받을 수 있죠. 등기부등본과 매매계약서로 증명하면 돼요.",
  },
  {
    q: "이행강제금과 벌금은 다른 건가요?",
    a: "완전히 달라요. 벌금은 형사처벌이고, 이행강제금은 행정제재예요. 시정을 유도하기 위한 간접 강제 수단이죠. 둘 다 동시에 부과될 수도 있고요.",
  },
  {
    q: "이행강제금 부과에 이의가 있으면 어떻게 하나요?",
    a: "부과 통지를 받은 날부터 90일 이내에 행정심판을 청구할 수 있어요. 면적 오측정이나 감경 미적용 같은 사유로 다투면 되죠.",
  },
  {
    q: "자진 시정하면 감면받을 수 있나요?",
    a: "지자체 조례에 따라 자진 시정 시 감경이나 면제가 가능해요. 시정명령 전에 먼저 고치면 유리하죠. 관할 구청에 확인해보는 게 좋고요.",
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem",
      fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        불법건축물 이행강제금 부과 기준<br />
        계산법, 감경 조건, 면제 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        구청에서 "이행강제금 납부하라"는 통보가 왔죠? 불법 증축이나 무허가 용도변경이 있는 건물에 부과되는 행정제재예요.{" "}
        <a href="https://www.law.go.kr/법령/건축법/제80조" style={{ color: "#1D9E75", textDecoration: "underline" }}>건축법 제80조</a>에 근거한 제도인데,
        계산 방식을 알면 금액을 줄일 수 있는 방법이 보여요.
        감경 조건과 시정 절차까지 한 번에 정리해 드릴게요.
      </p>

      <Divider />

      {/* H2-1: 이행강제금 개념 */}
      <H2>이행강제금이 뭐고, 왜 나오는 건가요?</H2>
      <p style={body}>
        불법으로 건축하거나 허가 없이 용도를 바꾼 건물에 시정명령이 내려져요. 소유자가 그 명령을 따르지 않으면 부과되는 돈이 이행강제금이에요.
        벌금과는 성격이 완전히 달라요. 벌금은 형사처벌이지만, 이행강제금은 "어서 고쳐라"라는 의미의 행정 제재죠.
      </p>
      <p style={body}>
        무단 증축 10평, 주택을 허가 없이 상가로 바꾼 경우 등이 대표적이에요. 구청에서 시정명령을 보냈는데 안 고치면 이행강제금이 반복 부과돼요.
        연 2회까지 나올 수 있고, 시정할 때까지 계속되죠.
      </p>

      <Divider />

      {/* H2-2: 계산 방식 */}
      <H2>이행강제금 계산 공식과 부과율</H2>
      <p style={body}>
        이행강제금은 정해진 공식으로 계산해요. 위반 유형에 따라 부과율이 다르기 때문에 내 상황에 맞춰 확인하는 게 중요하죠.
      </p>

      <SectionBadge>계산 공식</SectionBadge>
      <GreenBox>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>이행강제금 = 위반 면적(m2) x 개별공시지가(원/m2) x 부과율 x 감경율</p>
        <p style={{ fontSize: 14 }}>
          위반 면적은 불법으로 지은 부분만 해당돼요. 개별공시지가는 해당 토지의 공시가격이고, 지역마다 달라요.
        </p>
      </GreenBox>

      <p style={body}>
        부과율은 위반 유형에 따라 크게 달라져요. 어떤 위반이냐에 따라 부담이 확 바뀌죠.
      </p>

      <SectionBadge>위반 유형별 부과율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.8 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #1D9E75", textAlign: "left" }}>
              <th style={{ padding: "8px 12px" }}>위반 유형</th>
              <th style={{ padding: "8px 12px" }}>부과율</th>
              <th style={{ padding: "8px 12px" }}>예시</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 12px" }}>무단 증축·건폐율·용적률 위반</td>
              <td style={{ padding: "8px 12px", fontWeight: 600 }}>50%</td>
              <td style={{ padding: "8px 12px" }}>허가 없이 10평 증축</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 12px" }}>기타 위반 (대통령령)</td>
              <td style={{ padding: "8px 12px", fontWeight: 600 }}>10% 이내</td>
              <td style={{ padding: "8px 12px" }}>경미한 시설 변경</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={body}>
        구체적으로 볼게요. 개별공시지가 100만원/m2, 위반 면적 33m2(약 10평), 무단 증축(50%)이라면?
        33 x 100만원 x 0.5 = 1,650만원이 기본 이행강제금이에요.
        여기에 감경율이 적용되면 실제 납부액은 크게 줄어들죠.
      </p>

      <Divider />

      {/* H2-3: 감경 조건 */}
      <H2>이행강제금 감경받는 3가지 방법</H2>
      <p style={body}>
        이행강제금을 줄일 수 있는 법적 근거가 있어요. 내 상황에 해당하는지 하나씩 살펴보죠.
      </p>

      <SectionBadge>감경 조건별 비교</SectionBadge>
      <BorderBox>
        <p style={{ fontWeight: 700, marginBottom: 12, color: "#1D9E75" }}>감경 조건 3가지</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>1. 소유권 변경 후 매입 (75% 감경)</p>
            <p style={{ fontSize: 14, color: "#555" }}>
              불법 증축은 이전 소유자가 했고, 내가 사고 나서 알게 된 경우예요. 등기부등본과 매매계약서로 증명하면 되죠.
              위 1,650만원 예시에서 75% 감경받으면 412만 5천원만 내면 돼요.
            </p>
          </div>
          <div>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>2. 농축산 시설 (20% 감경)</p>
            <p style={{ fontSize: 14, color: "#555" }}>
              500m2 미만(수도권 외 1,000m2) 축사, 농축산물 보관 창고 등이 대상이에요.
            </p>
          </div>
          <div>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>3. 자진 시정 (조례에 따라 감경~면제)</p>
            <p style={{ fontSize: 14, color: "#555" }}>
              시정명령 전에 자진해서 고치면 감경이나 면제가 가능해요. 지자체마다 조례가 다르니 관할 구청에 문의하는 게 좋죠.
            </p>
          </div>
        </div>
      </BorderBox>

      <Divider />

      {/* H2-4: 시정·철거 절차 */}
      <H2>위반건축물 시정과 철거, 이렇게 진행돼요</H2>
      <p style={body}>
        이행강제금을 더 이상 안 내려면 시정하는 게 가장 확실해요. 아래 순서대로 진행하면 되죠.
      </p>

      <SectionBadge>시정 절차</SectionBadge>
      <BorderBox>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ background: "#1D9E75", color: "#fff", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>1</span>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 2 }}>현장 조사</p>
              <p style={{ fontSize: 14, color: "#555" }}>정확히 어디가 위반인지, 얼마나 철거해야 하는지 확인해요.</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ background: "#1D9E75", color: "#fff", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>2</span>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 2 }}>불법 증축 부분 철거</p>
              <p style={{ fontSize: 14, color: "#555" }}>직접 하거나 철거 업체를 부르면 돼요. 비용은 소유자 부담이죠.</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ background: "#1D9E75", color: "#fff", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>3</span>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 2 }}>시정 결과 제출</p>
              <p style={{ fontSize: 14, color: "#555" }}>철거 완료 사진, 측량 결과 등을 구청에 첨부해서 제출해요.</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ background: "#1D9E75", color: "#fff", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>4</span>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 2 }}>불법건축물 지정 해제</p>
              <p style={{ fontSize: 14, color: "#555" }}>구청 확인 후 해제되면 추가 부과가 중단돼요. 이미 부과된 건 납부해야 하죠.</p>
            </div>
          </div>
        </div>
      </BorderBox>

      <p style={body}>
        시정 비용이 부담스러워도 한 번에 고치는 게 장기적으로 저렴해요. 이행강제금은 매년 반복 부과되니까, 계속 내는 것보다 원상복구가 낫죠.
      </p>

      <Divider />

      {/* H2-5: 불복·이의신청 */}
      <H2>이행강제금 불복, 90일 이내 행정심판</H2>
      <p style={body}>
        이행강제금 부과에 이의가 있으면 불복할 수 있어요. 부과 통지를 받은 날부터 90일 이내에 행정심판을 청구하면 되죠.
        행정심판 결과에 불복하면 행정소송을 제기할 수도 있고요.
      </p>

      <SectionBadge>주요 이의신청 사유</SectionBadge>
      <GreenBox>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2 }}>
          <li>면적 오측정: 위반 면적이 실제보다 크게 산정된 경우</li>
          <li>부과율 오적용: 50%가 아닌 10% 대상인데 잘못 적용된 경우</li>
          <li>감경 조건 미적용: 소유권 변경 75% 감경 대상인데 반영 안 된 경우</li>
          <li>시정 완료 후 부과: 이미 철거했는데 이행강제금이 나온 경우</li>
        </ul>
      </GreenBox>

      <p style={body}>
        증거 서류를 꼼꼼히 챙겨야 해요. 측량 결과, 등기부등본, 철거 사진, 시정 완료 확인서 등이 핵심이에요.
        혼자 진행하기 어려우면 행정사나 변호사 도움을 받는 것도 방법이죠.
      </p>

      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <Disclaimer text="이 글은 건축법 제80조 및 관련 시행령을 바탕으로 정리한 일반 안내 자료예요. 구체적인 감경 조건과 부과율은 지자체 조례에 따라 다를 수 있으니, 관할 구청에 직접 문의해보세요." />
    </div>
  );
}
