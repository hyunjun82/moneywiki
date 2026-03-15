"use client";

import { colors } from "./styles";

export function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: `1px solid ${colors.line}`,
        margin: "2.2rem 0",
      }}
    />
  );
}
