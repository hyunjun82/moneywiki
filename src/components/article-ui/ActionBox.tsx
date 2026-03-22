"use client";

import { colors } from "./styles";

export interface ActionItem {
  /** 버튼 라벨 */
  label: string;
  /** 이동 URL (내부링크 또는 외부 공식 사이트) */
  href: string;
  /** 외부 링크면 true (새 창 열림) */
  external?: boolean;
}

interface Props {
  /** 박스 상단 한 줄 안내 문구 */
  title?: string;
  /** 행동 유도 버튼 목록 (최대 3개 권장) */
  items: ActionItem[];
}

export function ActionBox({
  title = "지금 바로 할 수 있어요",
  items,
}: Props) {
  return (
    <div
      style={{
        margin: "32px 0",
        padding: "20px 24px",
        borderRadius: 12,
        border: `1.5px solid ${colors.border}`,
        background: colors.greenBg,
      }}
    >
      <p
        style={{
          margin: "0 0 14px 0",
          fontSize: 15,
          fontWeight: 700,
          color: colors.greenText,
        }}
      >
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            {...(item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 18px",
              borderRadius: 8,
              background: "#fff",
              border: `1px solid ${colors.border}`,
              color: colors.mainGreen,
              fontSize: 14.5,
              fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.15s",
            }}
          >
            <span>{item.label}</span>
            <span style={{ fontSize: 16 }}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
