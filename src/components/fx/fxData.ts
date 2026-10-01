"use client";

/**
 * 환율 데이터 계층 (브라우저).
 *
 * 데이터는 별도 갱신기가 price-data 브랜치에 발행하는 fx.json 하나다 — 금 시세(gold/priceData.ts)와 같은 구조.
 * 시세를 main에 커밋하면 /w/ 글 2,000여 개가 매번 재빌드되고 Cloudflare Pages 무료 한도를 넘긴다.
 *
 * 두 겹으로 보여준다 (2026-10-01):
 *   1) 빌드 직전 scripts/fx/fetch-snapshot.mjs 가 받은 스냅숏으로 서버가 HTML 을 굽는다 → 검색엔진이 숫자를 읽는다.
 *      페이지가 그 값을 initial 로 넘긴다.
 *   2) 브라우저가 열리면 이 훅이 최신 fx.json 으로 갈아끼운다 → 사람은 지금 값을 본다.
 *
 * 출처(갱신기가 채운다):
 *   rates — Yahoo Finance 시장 중간환율. 등락(change·changePct)은 전일 종가(prevClose) 대비다
 *           (2026-09-09). official — 한국수출입은행 매매기준율(키가 있을 때만)
 *   banks — 은행연합회 외환길잡이 (환전수수료율·기본/최대우대율·기준일, 인천공항점)
 *
 * 모든 최상위 키는 없을 수 있다. 값이 없으면 그 칸을 통째로 숨긴다.
 * 0원이나 '-'를 환율 자리에 내보내지 않는다.
 */

import { useEffect, useState } from "react";
import type { FxData } from "./fxCore";

// 클라이언트 경계 파일에서는 export * 를 쓸 수 없다 — 이름으로 다시 내보낸다.
export {
  UP_COLOR,
  DOWN_COLOR,
  FLAT_COLOR,
  perUnit,
  convert,
  bankRate,
  won,
  fxColor,
  changeText,
  prevCloseLabel,
  countryOf,
  unitNameOf,
  korDate,
  korDateTime,
  asOfLabel,
} from "./fxCore";
export type {
  FxRate,
  FxBank,
  FxBanks,
  FxAirport,
  FxAirportRow,
  FxOfficial,
  FxOfficialItem,
  FxData,
  HistoryPoint,
} from "./fxCore";

/** 갱신기가 발행하는 주소. */
export const FX_URL =
  "https://raw.githubusercontent.com/hyunjun82/moneywiki/price-data/fx.json";

export type FxStatus = "loading" | "ready" | "error";

/** 헤더 티커와 본문이 한 화면에서 같은 파일을 두 번 받지 않게 진행 중인 요청을 나눠 쓴다. */
let inflight: { at: number; p: Promise<FxData> } | null = null;
function fetchFx(): Promise<FxData> {
  if (inflight && Date.now() - inflight.at < 30_000) return inflight.p;
  const p = fetch(FX_URL, { cache: "no-store" }).then((r) =>
    r.ok ? (r.json() as Promise<FxData>) : Promise.reject(new Error(`HTTP ${r.status}`))
  );
  inflight = { at: Date.now(), p };
  p.catch(() => {
    if (inflight?.p === p) inflight = null;
  });
  return p;
}

/**
 * @param initial 서버가 빌드 때 구운 값. 주면 첫 화면이 그 값으로 그려지고(HTML 에 숫자가 남는다),
 *                브라우저가 최신 값을 받으면 바뀐다.
 */
export function useFx(initial?: FxData | null): { data: FxData | null; status: FxStatus } {
  const [state, setState] = useState<{ data: FxData | null; status: FxStatus }>(() =>
    initial ? { data: initial, status: "ready" } : { data: null, status: "loading" }
  );

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetchFx()
        .then((json) => {
          if (alive) setState({ data: json, status: "ready" });
        })
        .catch(() => {
          // 이미 값을 들고 있으면 유지한다. 갱신 실패로 화면을 비우지 않는다.
          if (alive) setState((prev) => (prev.data ? prev : { data: null, status: "error" }));
        });

    load();
    const timer = setInterval(load, 10 * 60 * 1000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  return state;
}
