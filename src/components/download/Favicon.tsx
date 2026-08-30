import manifest from "@/data/download/favicon-manifest.json";
import { CARD, LINE, MUTE } from "./theme";

const FAVICONS: Record<string, string> = manifest;

/** builds[0].url 같은 공식 주소에서 도메인을 뽑는다. */
export function domainOf(url?: string): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * 배포처 파비콘. 227개 도메인 중 못 받은 12개(gomlab.com 등 봇 차단)는
 * 이니셜 배지로 대신한다 — 깨진 이미지 아이콘보다 낫다.
 */
export function Favicon({
  url,
  size = 20,
  initialsFrom,
}: {
  url?: string;
  size?: number;
  /** 파비콘이 없을 때 이니셜을 뽑을 문구(보통 titleTop) */
  initialsFrom?: string;
}) {
  const domain = domainOf(url);
  const src = domain ? FAVICONS[domain] : undefined;

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        style={{ borderRadius: 5, flexShrink: 0, background: "#fff", objectFit: "contain" }}
      />
    );
  }

  const ch = (initialsFrom ?? domain ?? "?").trim().charAt(0).toUpperCase() || "?";
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: 5,
        background: CARD,
        border: `1px solid ${LINE}`,
        color: MUTE,
        fontSize: size * 0.5,
        fontWeight: 800,
        flexShrink: 0,
      }}
    >
      {ch}
    </span>
  );
}
