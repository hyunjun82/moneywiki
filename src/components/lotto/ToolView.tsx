"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import s from "./lotto.module.css";
import { RANGES, ballBg, ballStyle } from "./lottoBall";

/**
 * /lotto/tool — 시안 lotto-main.html 의 tool 화면.
 *
 * 추첨 로직은 시안 그대로다.
 *   · 1~45 풀을 피셔-예이츠로 섞어 앞 6개 + 7번째를 보너스로 쓴다 (중복 없음)
 *   · 320ms 간격으로 한 알씩 공개하고 마지막에 보너스가 붙는다
 *   · 기록은 최근 5회만 남긴다
 */

const REVEAL_MS = 320;
const HISTORY_MAX = 5;

/** 시안 기본값 — 지난주 당첨번호와 몇 개 맞는지 세는 데 쓴다 */
const LAST_NUMS = [8, 16, 28, 30, 31, 44];

/** 큰 드럼에 박힌 장식 공 9개 — 시안 좌표 그대로 */
const DRUM_BALLS = [
  { size: 44, rotate: 0, z: 96, y: 0, n: 5 },
  { size: 38, rotate: 51, z: 92, y: -34, n: 15 },
  { size: 46, rotate: 103, z: 88, y: 28, n: 25 },
  { size: 34, rotate: 154, z: 100, y: -12, n: 35 },
  { size: 42, rotate: 206, z: 90, y: 40, n: 43 },
  { size: 36, rotate: 257, z: 94, y: -42, n: 8 },
  { size: 40, rotate: 309, z: 86, y: 12, n: 18 },
  { size: 30, rotate: 28, z: 58, y: 56, n: 28 },
  { size: 28, rotate: 190, z: 52, y: -58, n: 42 },
];

interface HistoryItem {
  id: number;
  nums: number[];
  bonus: number;
}

export default function ToolView() {
  const [picks, setPicks] = useState<number[]>([]);
  const [bonus, setBonus] = useState<number | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [round, setRound] = useState(0);
  const [copyMsg, setCopyMsg] = useState<string | null>(null);
  const [shareMsg, setShareMsg] = useState<string | null>(null);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  const flash = useCallback((set: (v: string | null) => void, label: string) => {
    set(label);
    timers.current.push(setTimeout(() => set(null), 1600));
  }, []);

  const draw = () => {
    if (drawing) return;
    clearTimers();

    // 피셔-예이츠 — 45개를 섞어 앞에서 잘라 쓰므로 중복이 나올 수 없다
    const pool = Array.from({ length: 45 }, (_, i) => i + 1);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const final = pool.slice(0, 6).sort((a, b) => a - b);
    const b = pool[6];

    setPicks([]);
    setBonus(null);
    setDrawing(true);

    final.forEach((n, i) => {
      timers.current.push(
        setTimeout(() => setPicks((prev) => [...prev, n]), REVEAL_MS * (i + 1))
      );
    });
    timers.current.push(
      setTimeout(() => {
        setBonus(b);
        setDrawing(false);
        setRound((r) => {
          const id = r + 1;
          setHistory((h) => [{ id, nums: final, bonus: b }, ...h].slice(0, HISTORY_MAX));
          return id;
        });
      }, REVEAL_MS * 7)
    );
  };

  const reset = () => {
    clearTimers();
    setPicks([]);
    setBonus(null);
    setDrawing(false);
    setHistory([]);
    setRound(0);
  };

  const resultString = () => picks.join(", ") + (bonus ? ` + 보너스 ${bonus}` : "");

  const copy = async () => {
    const text = resultString();
    try {
      await navigator.clipboard.writeText(text);
      flash(setCopyMsg, "복사됨!");
    } catch {
      flash(setCopyMsg, "복사 실패");
    }
  };

  const share = async () => {
    const text = `내 로또 번호 — ${resultString()}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "로또 번호 추출기", text });
        return;
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      flash(setShareMsg, "링크 대신 복사됨");
    } catch {
      flash(setShareMsg, "공유 불가");
    }
  };

  const discard = () => {
    setPicks([]);
    setBonus(null);
    setHistory((h) => h.filter((x) => x.id !== round));
  };

  const copyHistory = async (h: HistoryItem) => {
    try {
      await navigator.clipboard.writeText(`${h.nums.join(", ")} + 보너스 ${h.bonus}`);
      flash(setCopyMsg, "복사됨!");
    } catch {
      /* 무시 */
    }
  };

  const hasResult = bonus !== null && !drawing;
  const hit = picks.filter((n) => LAST_NUMS.includes(n)).length;
  const statusText = drawing
    ? "추첨 중…"
    : bonus
      ? "마지막 공은 보너스 번호입니다"
      : "버튼을 눌러 번호를 뽑아보세요";

  return (
    <div className="min-h-screen bg-[#EFEDE8] font-sans text-[#3C424A] flex justify-center px-6 pt-14 pb-[72px]">
      <div className="w-full max-w-[680px] flex flex-col gap-9">
        <div className="flex justify-start">
          <Link
            href="/lotto"
            className="flex items-center gap-1.5 text-[14px] font-medium text-[#6C727B] hover:text-[#1F4E79] transition-colors"
          >
            ← 처음으로
          </Link>
        </div>

        <header className="flex flex-col gap-2.5 items-center text-center">
          <div className="text-[13px] tracking-[0.06em] uppercase font-semibold text-[#1F4E79]">
            Lotto 6 / 45
          </div>
          <h1 className="m-0 text-[30px] sm:text-[36px] font-extrabold tracking-[-0.02em] text-[#1A1D21]">
            로또 번호 추출기
          </h1>
          <p className="m-0 text-[14px] text-[#6C727B]">
            1부터 45까지 중복 없이 6개 + 보너스 1개를 뽑습니다
          </p>
        </header>

        <section
          className="bg-white border border-[#E2DFD7] rounded-[20px] px-6 sm:px-8 pt-9 pb-8 flex flex-col items-center gap-8"
          style={{
            boxShadow: "0 1px 2px rgba(26,29,33,.04),0 16px 40px -28px rgba(26,29,33,.35)",
          }}
        >
          {/* 큰 3D 드럼 */}
          <div
            className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] flex items-center justify-center"
            style={{ perspective: "900px" }}
            aria-hidden
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 34% 26%, #FFFFFF 0%, #F3F1EC 38%, #E2DFD7 72%, #CFCBC1 100%)",
                boxShadow:
                  "inset 0 -18px 40px rgba(26,29,33,.14), 0 24px 40px -26px rgba(26,29,33,.45)",
              }}
            />
            <div
              className="absolute inset-[18px] rounded-full border border-white/70"
              style={{ background: "rgba(255,255,255,.25)" }}
            />
            <div
              className={`relative w-px h-px ${s.drumSlow}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {DRUM_BALLS.map((b, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: b.size,
                    height: b.size,
                    margin: -b.size / 2,
                    transform: `rotateY(${b.rotate}deg) translateZ(${b.z}px) translateY(${b.y}px)`,
                    background: ballBg(b.n),
                    boxShadow: "inset -3px -5px 8px rgba(0,0,0,.22)",
                  }}
                />
              ))}
            </div>
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 22%, rgba(255,255,255,.85) 0%, rgba(255,255,255,.28) 22%, rgba(255,255,255,0) 46%), radial-gradient(circle at 72% 84%, rgba(255,255,255,.35) 0%, rgba(255,255,255,0) 30%)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,.6)",
              }}
            />
            <div
              className="absolute -bottom-3.5 left-1/2 w-[200px] h-[22px] -ml-[100px] rounded-full"
              style={{ background: "rgba(26,29,33,.16)", filter: "blur(10px)" }}
            />
          </div>

          {/* 뽑힌 번호 */}
          <div className="flex items-center justify-center gap-2.5 flex-wrap min-h-16">
            {Array.from({ length: 6 }, (_, i) => {
              const n = picks[i];
              return (
                <div
                  key={i}
                  style={ballStyle(n)}
                  className={n ? s.ballPop : drawing ? s.slotPulse : undefined}
                >
                  {n ?? ""}
                </div>
              );
            })}
            <div className="text-[22px] text-[#9CA1A8] font-bold px-0.5">+</div>
            <div
              style={ballStyle(bonus, { big: true })}
              className={bonus ? s.ballPop : drawing ? s.slotPulse : undefined}
            >
              {bonus ?? ""}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 items-center">
            <button
              type="button"
              onClick={draw}
              disabled={drawing}
              className="relative overflow-hidden flex items-center gap-2.5 text-white text-[17px] font-extrabold px-9 py-4 rounded-full hover:brightness-110 active:translate-y-px disabled:opacity-70 transition-[filter,transform]"
              style={{
                background: "linear-gradient(180deg,#2A6099 0%,#1F4E79 100%)",
                boxShadow: "0 10px 20px -10px rgba(31,78,121,.85)",
              }}
            >
              <span
                className={`absolute top-0 left-0 w-[38%] h-full pointer-events-none ${s.shimmer}`}
                style={{
                  background:
                    "linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.3),rgba(255,255,255,0))",
                }}
              />
              <span
                className="w-5 h-5 rounded-full flex-none"
                style={{
                  background:
                    "radial-gradient(circle at 34% 28%, #FFF3CF, #F0C64F 50%, #B98A17 100%)",
                }}
              />
              번호 추첨하기
            </button>
            <button
              type="button"
              onClick={reset}
              className="border border-[#CFCBC1] bg-transparent text-[#6C727B] text-[15px] font-medium px-[22px] py-3.5 rounded-full hover:text-[#3C424A] hover:border-[#9CA1A8] transition-colors"
            >
              초기화
            </button>
          </div>

          <div className="text-[14px] text-[#9CA1A8] text-center" aria-live="polite">
            {statusText}
          </div>

          {hasResult ? (
            <div className="w-full border-t border-[#E2DFD7] pt-5 flex flex-col gap-3.5 items-center">
              <div className="text-[15px] font-semibold text-[#3C424A] tracking-[0.02em] bg-[#F7F6F3] border border-[#E2DFD7] rounded-[10px] px-[18px] py-3 text-center tabular-nums">
                {picks.join("  ·  ")}
                {bonus ? `   +  ${bonus}` : ""}
              </div>
              <div className="text-[14px] text-[#6C727B] text-center">
                지난주 당첨번호와 {hit}개 일치
              </div>
              <div className="flex gap-2.5 flex-wrap justify-center">
                <ActionButton onClick={copy} label={copyMsg ?? "번호 복사"} icon="copy" />
                <ActionButton onClick={share} label={shareMsg ?? "공유하기"} icon="share" />
                <ActionButton onClick={discard} label="번호 버리기" icon="trash" danger />
              </div>
            </div>
          ) : null}
        </section>

        {/* 추첨 기록 */}
        {history.length > 0 ? (
          <section className="flex flex-col gap-3.5">
            <div className="flex items-baseline justify-between">
              <h2 className="m-0 text-[21px] font-bold text-[#1A1D21] tracking-[-0.01em]">
                추첨 기록
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-[14px] text-[#6C727B]">{history.length}회</span>
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  className="text-[14px] font-medium text-[#9CA1A8] hover:text-[#C0504D] transition-colors"
                >
                  전체 삭제
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center gap-3 bg-white border border-[#E2DFD7] rounded-xl px-4 py-3 hover:border-[#CFCBC1] transition-colors"
                >
                  <span className="text-[14px] text-[#9CA1A8] w-[34px] flex-none">#{h.id}</span>
                  <span className="text-[16px] font-semibold text-[#3C424A] tracking-[0.02em] flex-1 tabular-nums">
                    {h.nums.join("  ·  ")}
                    {`   +  ${h.bonus}`}
                  </span>
                  <IconButton onClick={() => copyHistory(h)} title="이 조합 복사" icon="copy" />
                  <IconButton
                    onClick={() => setHistory((x) => x.filter((y) => y.id !== h.id))}
                    title="삭제"
                    icon="trash"
                    danger
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <footer className="flex flex-col gap-4 border-t border-[#CFCBC1] pt-[22px]">
          <div className="flex flex-wrap gap-y-2 gap-x-[18px] items-center justify-center">
            {RANGES.map((r) => (
              <div key={r.label} className="flex items-center gap-[7px] text-[14px] text-[#6C727B]">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ background: ballBg(r.from) }}
                />
                {r.label}
              </div>
            ))}
          </div>

          {/* 광고 — 시안의 ad-slot-tool 자리 */}
          <AdSlot slot="bottom" />

          <p className="m-0 text-center text-[14px] text-[#9CA1A8] leading-[1.4]">
            번호는 매번 무작위로 생성되며 당첨을 보장하지 않습니다. 구매는 만 19세 이상만
            가능합니다.
          </p>
        </footer>
      </div>
    </div>
  );
}

/* ─────────────────────────── 버튼 조각 ─────────────────────────── */

const ICONS = {
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </>
  ),
  trash: (
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  ),
};

function Icon({ icon, size = 15 }: { icon: keyof typeof ICONS; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICONS[icon]}
    </svg>
  );
}

function ActionButton({
  onClick,
  label,
  icon,
  danger,
}: {
  onClick: () => void;
  label: string;
  icon: keyof typeof ICONS;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 border border-[#CFCBC1] bg-white text-[14px] font-semibold px-5 py-[11px] rounded-full whitespace-nowrap flex-none transition-colors ${
        danger
          ? "text-[#6C727B] hover:border-[#C0504D] hover:text-[#C0504D] hover:bg-[#FBEDEC]"
          : "text-[#3C424A] hover:border-[#1F4E79] hover:text-[#1F4E79] hover:bg-[#E9F0F7]"
      }`}
    >
      <Icon icon={icon} />
      {label}
    </button>
  );
}

function IconButton({
  onClick,
  title,
  icon,
  danger,
}: {
  onClick: () => void;
  title: string;
  icon: keyof typeof ICONS;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`text-[#9CA1A8] p-1.5 rounded-lg flex leading-none transition-colors ${
        danger ? "hover:text-[#C0504D] hover:bg-[#FBEDEC]" : "hover:text-[#1F4E79] hover:bg-[#E9F0F7]"
      }`}
    >
      <Icon icon={icon} size={16} />
    </button>
  );
}
