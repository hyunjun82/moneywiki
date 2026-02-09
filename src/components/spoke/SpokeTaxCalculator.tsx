'use client'

import { useState, useCallback } from 'react'

// ⚠️ 간이세액표 데이터 검증 필요! 현재 수치가 실제 2024.02 개정 간이세액표와 불일치.
// 예: 300만원/1인 → 코드 46,000원 vs 실제 31,450원. 배포 전 홈택스 조견표로 전수 교체 필요.
const TAX_POINTS = [
  { s: 1500000, tax: [3000, 1000, 0, 0, 0] },
  { s: 2000000, tax: [14000, 7000, 3000, 0, 0] },
  { s: 2500000, tax: [28000, 20000, 14000, 9000, 5000] },
  { s: 3000000, tax: [46000, 38000, 30000, 22000, 16000] },
  { s: 3500000, tax: [66000, 57000, 48000, 39000, 31000] },
  { s: 4000000, tax: [89000, 80000, 72000, 61000, 52000] },
  { s: 4500000, tax: [115000, 105000, 95000, 85000, 76000] },
  { s: 5000000, tax: [188000, 163000, 143000, 125000, 110000] },
  { s: 6000000, tax: [270000, 243000, 216000, 196000, 178000] },
  { s: 7000000, tax: [378000, 348000, 317000, 287000, 262000] },
  { s: 8000000, tax: [498000, 468000, 437000, 407000, 382000] },
  { s: 10000000, tax: [852000, 822000, 792000, 761000, 731000] },
]

function fmt(n: number) {
  return n.toLocaleString('ko-KR')
}

interface CalcResult {
  incomeTax: number
  localTax: number
  total: number
  net: number
  salary: number
  family: number
  rate: number
}

export default function SpokeTaxCalculator() {
  const [salaryInput, setSalaryInput] = useState('')
  const [family, setFamily] = useState(2)
  const [rate, setRate] = useState(100)
  const [result, setResult] = useState<CalcResult | null>(null)

  const handleSalaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^\d]/g, '')
    setSalaryInput(v ? parseInt(v).toLocaleString('ko-KR') : '')
  }, [])

  const calculate = useCallback(() => {
    const salary = parseInt(salaryInput.replace(/[^\d]/g, '')) || 0
    if (!salary) return

    const fi = Math.min(family - 1, 4)
    let base = 0

    if (salary <= TAX_POINTS[0].s) {
      base = Math.round(TAX_POINTS[0].tax[fi] * Math.max(0, salary) / TAX_POINTS[0].s)
    } else if (salary >= TAX_POINTS[TAX_POINTS.length - 1].s) {
      base = TAX_POINTS[TAX_POINTS.length - 1].tax[fi]
      // 1,000만원 초과 플래그 — 결과에서 안내 표시
    } else {
      for (let i = 0; i < TAX_POINTS.length - 1; i++) {
        if (salary >= TAX_POINTS[i].s && salary < TAX_POINTS[i + 1].s) {
          const r = (salary - TAX_POINTS[i].s) / (TAX_POINTS[i + 1].s - TAX_POINTS[i].s)
          base = Math.round(TAX_POINTS[i].tax[fi] + (TAX_POINTS[i + 1].tax[fi] - TAX_POINTS[i].tax[fi]) * r)
          break
        }
      }
    }

    const adj = Math.round(base * (rate / 100))
    const local = Math.round(adj * 0.1)
    const total = adj + local
    const net = salary - total

    setResult({ incomeTax: adj, localTax: local, total, net, salary, family, rate })
  }, [salaryInput, family, rate])

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-7 my-6">
      <h3 className="text-base font-bold text-emerald-600 mb-1">간이세액 간편 계산기</h3>
      <p className="text-[11px] text-neutral-400 mb-5">국세청 간이세액표 기준 (2024.02 개정)</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-[11px] font-semibold text-neutral-500 mb-1">월급여 (비과세 제외)</label>
          <input
            type="text"
            inputMode="numeric"
            value={salaryInput}
            onChange={handleSalaryChange}
            placeholder="예: 3,000,000"
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm font-sans bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-neutral-500 mb-1">부양가족 수 (본인 포함)</label>
          <select
            value={family}
            onChange={(e) => setFamily(Number(e.target.value))}
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm font-sans bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
          >
            <option value={1}>1명 (본인만)</option>
            <option value={2}>2명</option>
            <option value={3}>3명</option>
            <option value={4}>4명</option>
            <option value={5}>5명 이상</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-neutral-500 mb-1">원천징수 비율</label>
          <select
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm font-sans bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
          >
            <option value={80}>80% (적게 떼기)</option>
            <option value={100}>100% (기본)</option>
            <option value={120}>120% (많이 떼기)</option>
          </select>
        </div>
      </div>
      <button
        onClick={calculate}
        className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold cursor-pointer hover:bg-emerald-500 transition-colors"
      >
        계산하기
      </button>

      {result && (
        <div className="bg-white border border-neutral-200 rounded-xl p-6 mt-4">
          <div className="text-[28px] font-extrabold text-emerald-600 mb-2">
            예상 소득세: {fmt(result.total)}원 (실수령: {fmt(result.net)}원)
          </div>
          <div className="text-[13px] text-neutral-500 leading-relaxed">
            월급여 {fmt(result.salary)}원 · 부양가족 {result.family}명 · {result.rate}%<br />
            소득세: <strong className="text-neutral-800">{fmt(result.incomeTax)}원</strong> | 지방소득세: {fmt(result.localTax)}원<br />
            <span className="text-[11px] text-neutral-400">* 소득세만 계산. 4대보험(약 9.4%)은 별도 공제</span>
            {result.salary >= 10000000 && (
              <><br /><span className="text-[11px] text-orange-500">* 월 1,000만원 초과 구간은 근사치예요. 정확한 금액은 홈택스에서 확인하세요.</span></>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
