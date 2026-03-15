"use client";

import { colors } from "./styles";

interface Props {
  label: string;
  href: string;
  count?: number;
}

export function CategoryButton({ label, href, count }: Props) {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: "100%",
        padding: "16px 24px",
        backgroundColor: colors.mainGreen,
        color: "#fff",
        fontSize: 16,
        fontWeight: 600,
        borderRadius: 12,
        textDecoration: "none",
        marginTop: 28,
        marginBottom: 28,
      }}
    >
      <span style={{ fontSize: 18 }}>&#128209;</span>
      {label}
      {count != null && ` ${count}개`}
      {" 전체 보기"}
      <span style={{ fontSize: 14 }}>&#10095;</span>
    </a>
  );
}
