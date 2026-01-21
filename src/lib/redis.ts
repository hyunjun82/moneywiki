import { Redis } from "@upstash/redis";

// Upstash Redis 클라이언트 (환경변수 자동 감지)
export const redis = new Redis({
  url: process.env.STORAGE_REST_API_URL || process.env.KV_REST_API_URL || "",
  token: process.env.STORAGE_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || "",
});

// 광고 클릭 추적 키 생성
function getClickKey(ip: string): string {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  return `ad_click:${ip}:${today}`;
}

// 차단 IP 키
function getBlockKey(ip: string): string {
  return `blocked:${ip}`;
}

// 광고 클릭 기록 및 카운트 증가
export async function recordAdClick(ip: string): Promise<number> {
  const key = getClickKey(ip);
  const count = await redis.incr(key);

  // 24시간 후 자동 만료 (첫 클릭 시에만 설정)
  if (count === 1) {
    await redis.expire(key, 86400); // 24시간 = 86400초
  }

  return count;
}

// 오늘 클릭 횟수 조회
export async function getClickCount(ip: string): Promise<number> {
  const key = getClickKey(ip);
  const count = await redis.get<number>(key);
  return count || 0;
}

// IP 차단 (7일간)
export async function blockIP(ip: string, reason: string): Promise<void> {
  const key = getBlockKey(ip);
  await redis.set(key, reason, { ex: 604800 }); // 7일 = 604800초
}

// IP 차단 여부 확인
export async function isBlocked(ip: string): Promise<boolean> {
  const key = getBlockKey(ip);
  const blocked = await redis.get(key);
  return blocked !== null;
}

// 클릭 한도 설정 (하루 10회 초과 시 의심)
export const CLICK_LIMIT = 10;
