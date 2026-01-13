"use client";

import { useState, useCallback } from "react";

// 변환 상수
const PYEONG_TO_SQM = 3.3058; // 1평 = 3.3058㎡
const SQM_TO_SQFT = 10.7639; // 1㎡ = 10.7639ft²

type UnitType = "pyeong" | "sqm" | "sqft";

interface ConversionResult {
  pyeong: number;
  sqm: number;
  sqft: number;
}

export default function AreaConverterCalculator() {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputUnit, setInputUnit] = useState<UnitType>("pyeong");
  const [result, setResult] = useState<ConversionResult | null>(null);

  // 변환 계산
  const calculate = useCallback((value: number, unit: UnitType): ConversionResult => {
    let pyeong: number;
    let sqm: number;
    let sqft: number;

    switch (unit) {
      case "pyeong":
        pyeong = value;
        sqm = value * PYEONG_TO_SQM;
        sqft = sqm * SQM_TO_SQFT;
        break;
      case "sqm":
        sqm = value;
        pyeong = value / PYEONG_TO_SQM;
        sqft = value * SQM_TO_SQFT;
        break;
      case "sqft":
        sqft = value;
        sqm = value / SQM_TO_SQFT;
        pyeong = sqm / PYEONG_TO_SQM;
        break;
      default:
        pyeong = 0;
        sqm = 0;
        sqft = 0;
    }

    return { pyeong, sqm, sqft };
  }, []);

  // 입력값 변경 처리
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    const numValue = parseFloat(value.replace(/,/g, ""));
    if (!isNaN(numValue) && numValue >= 0) {
      setResult(calculate(numValue, inputUnit));
    } else {
      setResult(null);
    }
  }, [inputUnit, calculate]);

  // 단위 변경 처리
  const handleUnitChange = useCallback((unit: UnitType) => {
    setInputUnit(unit);
    const numValue = parseFloat(inputValue.replace(/,/g, ""));
    if (!isNaN(numValue) && numValue >= 0) {
      setResult(calculate(numValue, unit));
    }
  }, [inputValue, calculate]);

  // 빠른 입력 버튼
  const handleQuickInput = useCallback((value: number) => {
    const currentValue = parseFloat(inputValue.replace(/,/g, "")) || 0;
    const newValue = currentValue + value;
    setInputValue(newValue.toString());
    setResult(calculate(newValue, inputUnit));
  }, [inputValue, inputUnit, calculate]);

  // 초기화
  const handleClear = useCallback(() => {
    setInputValue("");
    setResult(null);
  }, []);

  // 숫자 포맷팅
  const formatNumber = (num: number, decimals: number = 2): string => {
    return num.toLocaleString("ko-KR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // 일반적인 면적 예시
  const areaExamples = [
    { name: "원룸", pyeong: 7, description: "소형 원룸" },
    { name: "투룸", pyeong: 12, description: "일반 투룸" },
    { name: "20평대", pyeong: 25, description: "소형 아파트" },
    { name: "30평대", pyeong: 34, description: "중형 아파트" },
    { name: "40평대", pyeong: 42, description: "대형 아파트" },
    { name: "50평대", pyeong: 52, description: "고급 아파트" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">평수 계산기</h2>
            <p className="text-emerald-100 text-sm">평 ↔ ㎡ ↔ ft² 변환</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 단위 선택 탭 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            입력 단위 선택
          </label>
          <div className="flex gap-2">
            {[
              { value: "pyeong" as UnitType, label: "평", sub: "坪" },
              { value: "sqm" as UnitType, label: "㎡", sub: "제곱미터" },
              { value: "sqft" as UnitType, label: "ft²", sub: "제곱피트" },
            ].map((unit) => (
              <button
                key={unit.value}
                onClick={() => handleUnitChange(unit.value)}
                className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                  inputUnit === unit.value
                    ? "border-sky-500 bg-sky-50 text-sky-700"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <div className="text-lg font-bold">{unit.label}</div>
                <div className="text-xs text-neutral-500">{unit.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 입력 영역 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            면적 입력
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="숫자를 입력하세요"
              className="w-full px-4 py-4 text-2xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors text-right pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">
              {inputUnit === "pyeong" ? "평" : inputUnit === "sqm" ? "㎡" : "ft²"}
            </span>
          </div>

          {/* 빠른 입력 버튼 */}
          <div className="flex gap-2 mt-3">
            {inputUnit === "pyeong" ? (
              <>
                <button onClick={() => handleQuickInput(1)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+1평</button>
                <button onClick={() => handleQuickInput(5)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+5평</button>
                <button onClick={() => handleQuickInput(10)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+10평</button>
                <button onClick={() => handleQuickInput(20)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+20평</button>
              </>
            ) : inputUnit === "sqm" ? (
              <>
                <button onClick={() => handleQuickInput(10)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+10㎡</button>
                <button onClick={() => handleQuickInput(30)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+30㎡</button>
                <button onClick={() => handleQuickInput(50)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+50㎡</button>
                <button onClick={() => handleQuickInput(100)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+100㎡</button>
              </>
            ) : (
              <>
                <button onClick={() => handleQuickInput(100)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+100ft²</button>
                <button onClick={() => handleQuickInput(300)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+300ft²</button>
                <button onClick={() => handleQuickInput(500)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+500ft²</button>
                <button onClick={() => handleQuickInput(1000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+1000ft²</button>
              </>
            )}
            <button onClick={handleClear} className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium transition-colors">C</button>
          </div>
        </div>

        {/* 결과 표시 */}
        {result && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">변환 결과</h3>

            <div className="grid grid-cols-3 gap-4">
              {/* 평 */}
              <div className={`p-4 rounded-xl ${inputUnit === "pyeong" ? "bg-sky-500 text-white" : "bg-white"}`}>
                <div className="text-xs mb-1 opacity-70">평 (坪)</div>
                <div className="text-xl font-bold">{formatNumber(result.pyeong)}</div>
                <div className="text-xs opacity-70 mt-1">평</div>
              </div>

              {/* 제곱미터 */}
              <div className={`p-4 rounded-xl ${inputUnit === "sqm" ? "bg-sky-500 text-white" : "bg-white"}`}>
                <div className="text-xs mb-1 opacity-70">제곱미터</div>
                <div className="text-xl font-bold">{formatNumber(result.sqm)}</div>
                <div className="text-xs opacity-70 mt-1">㎡</div>
              </div>

              {/* 제곱피트 */}
              <div className={`p-4 rounded-xl ${inputUnit === "sqft" ? "bg-sky-500 text-white" : "bg-white"}`}>
                <div className="text-xs mb-1 opacity-70">제곱피트</div>
                <div className="text-xl font-bold">{formatNumber(result.sqft)}</div>
                <div className="text-xs opacity-70 mt-1">ft²</div>
              </div>
            </div>

            {/* 변환 공식 표시 */}
            <div className="mt-4 pt-4 border-t border-sky-200">
              <div className="text-sm text-sky-700">
                <div className="flex items-center gap-2">
                  <span className="font-medium">변환 공식:</span>
                  <span>1평 = 3.3058㎡ = 35.58ft²</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 면적 예시 */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
          <h4 className="font-medium text-neutral-700 mb-3">일반적인 주거 면적</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {areaExamples.map((example) => (
              <button
                key={example.name}
                onClick={() => {
                  setInputUnit("pyeong");
                  setInputValue(example.pyeong.toString());
                  setResult(calculate(example.pyeong, "pyeong"));
                }}
                className="p-3 bg-white border border-neutral-200 rounded-lg hover:border-sky-300 hover:bg-sky-50 transition-all text-left"
              >
                <div className="text-sm font-medium text-neutral-800">{example.name}</div>
                <div className="text-xs text-neutral-500">{example.pyeong}평 ({formatNumber(example.pyeong * PYEONG_TO_SQM, 0)}㎡)</div>
              </button>
            ))}
          </div>
        </div>

        {/* 이용안내 */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            이용안내
          </h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• 1평 = 약 3.3㎡로 계산합니다 (정확히 3.3058㎡)</li>
            <li>• 부동산에서 흔히 말하는 '평형'은 '공급면적(분양면적)' 기준이에요</li>
            <li>• 분양면적(공급면적)은 전용면적보다 넓어요</li>
            <li>• 국토교통부 공식 표기는 ㎡(제곱미터)예요</li>
          </ul>
        </div>

        {/* 전용면적 vs 공급면적 설명 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">전용면적 vs 공급면적</h4>
          <div className="text-sm text-blue-700 space-y-2">
            <div>
              <span className="font-medium">전용면적</span>: 실제로 사용할 수 있는 방, 거실, 주방 등의 면적
            </div>
            <div>
              <span className="font-medium">공급면적</span>: 전용면적 + 주거공용면적(복도, 계단, 엘리베이터 등)
            </div>
            <div className="pt-2 border-t border-blue-200">
              예: 84㎡ 아파트 = 전용 84㎡ (약 25평) + 공용면적
            </div>
          </div>
        </div>

        {/* 평수별 면적 환산표 */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 평수별 면적 환산표</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">평수</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">㎡ (제곱미터)</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">ft² (제곱피트)</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">주거 타입</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden md:table-cell">한줄평</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">7평</td>
                  <td className="py-2 px-2 text-center border border-gray-300">23.1㎡</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">249ft²</td>
                  <td className="py-2 px-2 text-center border border-gray-300">원룸</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">1인 가구 🧑</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">15평</td>
                  <td className="py-2 px-2 text-center border border-gray-300">49.6㎡</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">534ft²</td>
                  <td className="py-2 px-2 text-center border border-gray-300">투룸/오피스텔</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">신혼부부 👫</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">24평</td>
                  <td className="py-2 px-2 text-center border border-gray-300 font-bold text-emerald-600">79.3㎡ (전용 59㎡)</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">854ft²</td>
                  <td className="py-2 px-2 text-center border border-gray-300">소형 아파트</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">신혼부부·3인가구</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">34평</td>
                  <td className="py-2 px-2 text-center border border-gray-300 font-bold text-emerald-600">112.4㎡ (전용 84㎡)</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">1,210ft²</td>
                  <td className="py-2 px-2 text-center border border-gray-300">국민평수 (국평)</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">4인 가족 ⭐</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">42평</td>
                  <td className="py-2 px-2 text-center border border-gray-300">138.8㎡</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">1,494ft²</td>
                  <td className="py-2 px-2 text-center border border-gray-300">대형 아파트</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">넓은 거실 🌟</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">52평</td>
                  <td className="py-2 px-2 text-center border border-gray-300">171.9㎡</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">1,850ft²</td>
                  <td className="py-2 px-2 text-center border border-gray-300">프리미엄</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">고급 아파트 💎</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">※ 분양광고 84㎡ = 전용면적 84㎡ ≈ 약 25평 (실사용 면적)</p>

          <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">💡 핵심 포인트</p>
            <ul className="text-xs text-emerald-700 mt-1 space-y-1">
              <li>• 84㎡ = 약 25평 (가장 많이 찾는 국민평수!)</li>
              <li>• 평 × 3.3 = ㎡ (빠른 암산법)</li>
              <li>• 분양면적 ≠ 전용면적 (공용면적 제외해야 실평수)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
