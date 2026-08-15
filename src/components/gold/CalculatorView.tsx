"use client";

import Link from "next/link";
import { useState } from "react";
import { BandAd, Card, DataNotice, FooterNote, Hero, SideAd, Skeleton } from "./ui";
import { GRAM_PER_DON, korDate, korDateTime, perGram, usePrice, won } from "./priceData";

/** gold-calculator.html 시안을 옮긴 페이지. */

type Unit = "don" | "g";

const QUICK: Record<Unit, number[]> = {
  don: [0.5, 1, 3, 5, 10],
  g: [3.75, 10, 37.5, 100],
};

export default function CalculatorView() {
  const { data, status } = usePrice();
  const retail = data?.retail;
  const items = retail?.items ?? [];

  const [key, setKey] = useState("gold24");
  const [unit, setUnit] = useState<Unit>("don");
  const [amount, setAmount] = useState("1");

  const item = items.find((it) => it.key === key) ?? items[0];
  const num = Number(String(amount).replace(/,/g, ""));
  const valid = Number.isFinite(num) && num > 0;
  const grams = valid ? (unit === "don" ? num * GRAM_PER_DON : num) : 0;

  const sellPerGram = perGram(item?.userSell?.price);
  const buyPerGram = perGram(item?.userBuy?.price);
  const sellTotal = sellPerGram !== null ? sellPerGram * grams : null;
  const buyTotal = buyPerGram !== null ? buyPerGram * grams : null;

  const pick = (active: boolean) =>
    active
      ? "bg-[linear-gradient(140deg,#F3DE9C,#D4AF37)] text-[#17181C] border-transparent"
      : "bg-[#F7F6F3] text-[#6C727B] border-[#E2DFD7]";

  return (
    <div className="flex flex-col gap-7 pt-6">
      <Hero
        eyebrow="GOLD CALCULATOR"
        title="금 계산기"
        lead="순도와 중량을 넣으면 오늘 시세 기준 살 때·팔 때 금액을 바로 계산합니다."
      />

      {status === "error" ? <DataNotice /> : null}

      <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-7 items-start">
        {/* 입력 */}
        <Card className="p-6 sm:p-7 flex flex-col gap-[22px] rounded-[20px]">
          <div className="flex flex-col gap-2.5">
            <span className="text-[12px] font-bold tracking-[0.06em] text-[#6C727B]">
              1. 순도 선택
            </span>
            <div className="flex gap-2.5 flex-wrap">
              {items.length === 0
                ? [0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="flex-1 h-12 min-w-16" />)
                : items.map((it) => (
                    <button
                      key={it.key}
                      type="button"
                      onClick={() => setKey(it.key)}
                      className={`flex-1 min-w-[64px] py-3.5 rounded-xl text-[15px] sm:text-[16px] font-bold border transition-colors ${pick(
                        it.key === (item?.key ?? key)
                      )}`}
                    >
                      {it.name}
                    </button>
                  ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-[12px] font-bold tracking-[0.06em] text-[#6C727B]">2. 단위</span>
            <div className="flex gap-2.5">
              {([
                { key: "don" as Unit, label: "돈 (3.75g)" },
                { key: "g" as Unit, label: "그램 (g)" },
              ]).map((u) => (
                <button
                  key={u.key}
                  type="button"
                  onClick={() => setUnit(u.key)}
                  className={`flex-1 py-3 rounded-xl text-[15px] font-semibold border transition-colors ${pick(
                    unit === u.key
                  )}`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="gold-amount"
              className="text-[12px] font-bold tracking-[0.06em] text-[#6C727B]"
            >
              3. 중량 입력
            </label>
            <div className="flex items-center gap-3 bg-[#F7F6F3] border border-[#CFCBC1] rounded-[14px] px-4 sm:px-[18px] py-1.5">
              <input
                id="gold-amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-[26px] sm:text-[30px] font-bold text-[#1A1D21] py-3 tabular-nums"
              />
              <span className="text-[16px] font-bold text-[#8A6A16] shrink-0">
                {unit === "don" ? "돈" : "g"}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {QUICK[unit].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAmount(String(v))}
                  className="text-[13px] font-semibold text-[#3C424A] bg-[#F7F6F3] border border-[#E2DFD7] px-3.5 py-2 rounded-full hover:border-[#CFCBC1] transition-colors"
                >
                  {v}
                  {unit === "don" ? "돈" : "g"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1 border-t border-[#E2DFD7]">
            <div className="flex justify-between text-[15px] text-[#3C424A] pt-3.5">
              <span>적용 시세 (1g 기준)</span>
              <span className="font-bold text-[#1A1D21] tabular-nums">
                {sellPerGram !== null ? `${won(sellPerGram)}원 (매입)` : "—"}
              </span>
            </div>
            <div className="flex justify-between text-[15px] text-[#3C424A]">
              <span>환산 중량</span>
              <span className="font-bold text-[#1A1D21] tabular-nums">{grams.toFixed(2)} g</span>
            </div>
          </div>
        </Card>

        {/* 결과 */}
        <div className="flex flex-col gap-5">
          <div className="bg-[linear-gradient(145deg,#F7E7B0_0%,#E3C15C_32%,#D4AF37_66%,#A8801A_100%)] rounded-[20px] p-[26px] flex flex-col gap-[18px] shadow-[0_18px_40px_rgba(140,105,10,.28)]">
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-bold tracking-[0.06em] text-[#4A3400]">
                팔 때 · 예상 매입가
              </span>
              <div className="flex items-end gap-1.5">
                <span className="text-[34px] sm:text-[42px] font-extrabold leading-none tracking-[-0.03em] text-[#17181C] tabular-nums">
                  {sellTotal !== null && valid ? won(sellTotal) : "—"}
                </span>
                <span className="text-[18px] font-bold text-[#4A3400]">원</span>
              </div>
            </div>

            <div className="h-px bg-[rgba(74,52,0,.25)]" />

            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-bold tracking-[0.06em] text-[#4A3400]">
                살 때 · 예상 구입가
              </span>
              <div className="flex items-end gap-1.5">
                <span className="text-[26px] sm:text-[30px] font-extrabold text-[#17181C] tabular-nums">
                  {buyTotal !== null && valid ? won(buyTotal) : "—"}
                </span>
                <span className="text-[15px] font-bold text-[#4A3400]">원</span>
              </div>
              <span className="text-[12px] text-[#4A3400]">
                {buyPerGram === null && item
                  ? "이 품목은 판매가가 고시되지 않습니다"
                  : "부가세 별도 · 세공비 별도"}
              </span>
            </div>

            {retail?.quoteDate ? (
              <span className="text-[12px] text-[#4A3400]">
                {korDate(retail.quoteDate)} 고시가 기준
              </span>
            ) : null}
          </div>

          <SideAd />

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/gold/buy"
              className="bg-white border-[1.5px] border-[#D4AF37] rounded-[16px] p-[18px] text-center text-[16px] font-bold text-[#1A1D21] hover:brightness-[0.99] transition-[filter]"
            >
              금 살 때 가격
            </Link>
            <Link
              href="/gold/sell"
              className="bg-white border-[1.5px] border-[#D4AF37] rounded-[16px] p-[18px] text-center text-[16px] font-bold text-[#1A1D21] hover:brightness-[0.99] transition-[filter]"
            >
              금 팔 때 가격
            </Link>
          </div>
        </div>
      </section>

      <BandAd />

      <FooterNote
        text="계산 결과는 참고용이며 실제 거래가는 매장·감정 결과에 따라 달라집니다."
        updatedAt={korDateTime(data?.updatedAt)}
      />
    </div>
  );
}
