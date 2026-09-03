"use client";

import { useState } from "react";
import type { QuickProps } from "./index";

/**
 * 실업급여 즉답 — 월급·가입기간·나이 → 총액·하루·일수·월환산
 * 산식: 3개월 임금 ÷ 90 × 60%, 하한·상한 적용. 일수는 별표1.
 * params: { low: 66048, high: 68100, days: [[120,120],[150,180],[180,210],[210,240],[240,270]] }
 *   — 글의 증거 JSON 값과 같아야 한다. 코드에 숫자를 박지 않는다.
 */
const YEARS = ["1년 미만", "1~3년", "3~5년", "5~10년", "10년 이상"];
const AGES = ["50세 미만", "50세 이상 또는 장애인"];
const fmt = (n: number) => `${n.toLocaleString("ko-KR")}원`;

export function UnemploymentBenefit({ params }: QuickProps) {
  const low = Number(params.low ?? 0);
  const high = Number(params.high ?? Infinity);
  const days = (params.days as number[][]) ?? [[120, 120], [150, 180], [180, 210], [210, 240], [240, 270]];
  const [sal, setSal] = useState(Number(params.defaultSalary ?? 250));
  const [yr, setYr] = useState(Number(params.defaultYears ?? 2));
  const [ag, setAg] = useState(0);

  const sixty = Math.floor((sal * 10000 * 3) / 90 * 0.6);
  let daily = sixty, rule = "60% 적용";
  if (sixty < low) { daily = low; rule = "하한 적용"; }
  else if (sixty > high) { daily = high; rule = "상한 적용"; }
  const d = days[yr][ag];

  return (
    <div className="now-body">
      <div>
        <div className="ctrl">
          <label htmlFor="qc-sal">퇴사 전 3개월 평균 월급</label>
          <div className="range">
            <input id="qc-sal" type="range" min={150} max={600} step={10} value={sal} onChange={(e) => setSal(+e.target.value)} />
            <output>{sal}만 원</output>
          </div>
        </div>
        <div className="ctrl">
          <label>고용보험 가입기간</label>
          <div className="seg">
            {YEARS.map((y, i) => <button type="button" key={y} aria-pressed={yr === i} onClick={() => setYr(i)}>{y}</button>)}
          </div>
        </div>
        <div className="ctrl">
          <label>퇴사 당시 나이</label>
          <div className="seg">
            {AGES.map((a, i) => <button type="button" key={a} aria-pressed={ag === i} onClick={() => setAg(i)}>{a}</button>)}
          </div>
        </div>
      </div>
      <div className="now-out">
        <div><div className="cap">총 지급액</div><div className="big">{fmt(daily * d)}</div></div>
        <div className="row"><span>하루 금액</span><b>{fmt(daily)}</b></div>
        <div className="row"><span>지급 일수</span><b>{d}일 (약 {Math.round(d / 30)}개월)</b></div>
        <div className="row"><span>한 달(30일) 기준</span><b>{fmt(daily * 30)}</b></div>
        <div className="row"><span>적용</span><b>{rule}</b></div>
      </div>
    </div>
  );
}
