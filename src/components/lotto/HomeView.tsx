"use client";

import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import s from "./lotto.module.css";
import { ballStyle, ballBg } from "./lottoBall";

/**
 * /lotto — 시안 lotto-main.html 의 home 화면.
 *
 * 지난주 당첨 번호는 시안이 props 기본값으로 갖고 있던 값을 그대로 쓴다.
 * (1204회 8,16,28,30,31,44 + 27) — 실데이터 연결은 별도 작업이다.
 */

const LAST = {
  round: 1204,
  date: "2025.12.27 추첨",
  nums: [8, 16, 28, 30, 31, 44],
  bonus: 27,
};

/** 히어로 드럼에 박힌 공 4개 — 시안 그대로 */
const DRUM = [
  { n: 7, rotate: 0, z: 66, y: -52 },
  { n: 13, rotate: 90, z: 66, y: -17 },
  { n: 25, rotate: 180, z: 66, y: 17 },
  { n: 42, rotate: 270, z: 66, y: 52 },
];

export default function HomeView() {
  return (
    <div className="min-h-screen bg-[#EFEDE8] font-sans text-[#3C424A] flex justify-center px-6 pt-14 pb-[72px]">
      <div className="w-full max-w-[680px] flex flex-col gap-9">
        <div className="flex flex-col gap-10 pt-2">
          {/* 제목 */}
          <div className="flex flex-col gap-3.5 items-center text-center">
            <div className="text-[13px] tracking-[0.06em] uppercase font-semibold text-[#1F4E79]">
              Lotto 6 / 45
            </div>
            <h1 className="m-0 text-[32px] sm:text-[44px] leading-[1.25] font-extrabold tracking-[-0.02em] text-[#1A1D21]">
              이번 주 번호,
              <br />
              3D 추첨기로 뽑아보세요
            </h1>
            <p className="m-0 text-[18px] sm:text-[20px] text-[#6C727B] leading-[1.4]">
              1~45번 공이 돌아가는 추첨기에서
              <br />
              중복 없는 6개 번호와 보너스 번호를 추천해 드립니다.
            </p>
          </div>

          {/* 3D 추첨기 */}
          <div
            className="relative w-[220px] h-[220px] self-center flex items-center justify-center"
            style={{ perspective: "800px" }}
            aria-hidden
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 34% 26%, #FFFFFF 0%, #F3F1EC 38%, #E2DFD7 72%, #CFCBC1 100%)",
                boxShadow:
                  "inset 0 -14px 30px rgba(26,29,33,.14), 0 20px 34px -22px rgba(26,29,33,.45)",
              }}
            />
            <div
              className={`relative w-px h-px ${s.drum}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {DRUM.map((b) => (
                <div
                  key={b.n}
                  className="absolute w-0 h-0"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${b.rotate}deg) translateZ(${b.z}px) translateY(${b.y}px)`,
                  }}
                >
                  <div className={s.drumBack} style={{ transformStyle: "preserve-3d" }}>
                    <div
                      className="w-8 h-8 -m-4 rounded-full flex items-center justify-center text-white font-extrabold"
                      style={{
                        transform: `rotateY(-${b.rotate}deg)`,
                        background: ballBg(b.n),
                        boxShadow: "inset -4px -5px 9px rgba(0,0,0,.24)",
                        fontSize: b.n >= 10 ? 13 : 14,
                        textShadow: "0 1px 2px rgba(0,0,0,.35)",
                      }}
                    >
                      {b.n}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 22%, rgba(255,255,255,.85) 0%, rgba(255,255,255,.28) 22%, rgba(255,255,255,0) 46%)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,.6)",
              }}
            />
            <div
              className={`absolute -top-1.5 -right-[26px] w-[76px] h-[76px] rounded-full flex flex-col items-center justify-center ${s.coinFloat}`}
              style={{
                background:
                  "radial-gradient(circle at 34% 28%, #FFF3CF 0%, #F0C64F 42%, #B98A17 100%)",
                boxShadow:
                  "inset -4px -6px 12px rgba(120,80,0,.35), 0 12px 20px -12px rgba(26,29,33,.6)",
              }}
            >
              <span className="text-[20px] font-extrabold text-[#6B4A05] leading-none">1등</span>
              <span className="text-[10px] font-bold text-[#8A6410] tracking-[0.06em]">
                JACKPOT
              </span>
            </div>
            <div
              className="absolute -bottom-2.5 left-1/2 w-40 h-[18px] -ml-20 rounded-full"
              style={{ background: "rgba(26,29,33,.16)", filter: "blur(9px)" }}
            />
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3.5 items-center">
            <Link
              href="/lotto/tool"
              className={`relative overflow-hidden text-white text-[18px] sm:text-[20px] font-extrabold px-10 sm:px-[54px] py-5 sm:py-[22px] rounded-full flex items-center gap-3 hover:brightness-110 active:translate-y-0.5 transition-[filter,transform] ${s.ctaGlow}`}
              style={{ background: "linear-gradient(180deg,#2A6099 0%,#1F4E79 100%)" }}
            >
              <span
                className={`absolute top-0 left-0 w-[38%] h-full pointer-events-none ${s.shimmer}`}
                style={{
                  background:
                    "linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.35),rgba(255,255,255,0))",
                }}
              />
              <span
                className="w-[26px] h-[26px] rounded-full flex-none"
                style={{
                  background:
                    "radial-gradient(circle at 34% 28%, #FFF3CF, #F0C64F 50%, #B98A17 100%)",
                }}
              />
              로또 번호 추천 받기
              <span className="text-[22px] leading-none">→</span>
            </Link>
            <span className="text-[14px] text-[#9CA1A8]">무료 · 회원가입 없이 3초 만에 추첨</span>
          </div>

          {/* 지난주 당첨 번호 */}
          <div
            className="bg-white border border-[#E2DFD7] rounded-[18px] px-6 pt-6 pb-[22px] flex flex-col gap-[18px]"
            style={{
              boxShadow: "0 1px 2px rgba(26,29,33,.04),0 14px 34px -28px rgba(26,29,33,.35)",
            }}
          >
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h2 className="m-0 text-[21px] font-bold text-[#1A1D21] tracking-[-0.01em]">
                지난주 당첨 번호
              </h2>
              <span className="text-[14px] text-[#6C727B]">
                {LAST.round}회 · {LAST.date}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {LAST.nums.map((n) => (
                <div key={n} style={ballStyle(n, { size: 46 })}>
                  {n}
                </div>
              ))}
              <div className="text-[18px] text-[#9CA1A8] font-bold px-0.5">+</div>
              <div style={ballStyle(LAST.bonus, { size: 46 })}>{LAST.bonus}</div>
            </div>
            <div className="grid grid-cols-3 gap-2.5 border-t border-[#E2DFD7] pt-4">
              {[
                { rank: "1등", prize: "약 20억", odds: "814만분의 1", gold: true },
                { rank: "2등", prize: "약 5천만", odds: "135만분의 1" },
                { rank: "3등", prize: "약 150만", odds: "3만 5천분의 1" },
              ].map((r) => (
                <div key={r.rank} className="flex flex-col gap-[3px] items-center text-center">
                  <span
                    className="text-[13px] font-bold tracking-[0.06em]"
                    style={{ color: r.gold ? "#9A7B2E" : "#6C727B" }}
                  >
                    {r.rank}
                  </span>
                  <span
                    className="text-[19px] font-extrabold"
                    style={{ color: r.gold ? "#7A5C13" : "#1A1D21" }}
                  >
                    {r.prize}
                  </span>
                  <span className="text-[14px] text-[#9CA1A8]">{r.odds}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 누적 배지 */}
          <div className="flex items-center justify-center gap-2.5 bg-[#E9F0F7] border border-[#CFE0EE] rounded-full px-[22px] py-3 self-center">
            <span className="w-2 h-2 rounded-full bg-[#2E7D5B] flex-none" />
            <span className="text-[14px] text-[#1F4E79] font-semibold">
              지금까지 이 추첨기로 뽑힌 번호 조합 <b className="font-extrabold">128,405</b>개
            </span>
          </div>

          {/* 광고 — 시안의 ad-slot-home 자리 */}
          <AdSlot slot="bottom" />

          <p className="m-0 text-center text-[14px] text-[#9CA1A8] leading-[1.4]">
            번호는 매번 무작위로 생성되며 당첨을 보장하지 않습니다. 구매는 만 19세 이상만
            가능합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
