"use client";

import { colors } from "./styles";

interface DocItem {
  name: string;
  required: boolean;
  where: string;
}

interface DocTableProps {
  docs: DocItem[];
}

export function DocTable({ docs }: DocTableProps) {
  return (
    <div
      style={{
        overflowX: "auto",
        margin: "1.2rem 0",
        borderRadius: 10,
        border: `1px solid ${colors.line}`,
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14.5,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: colors.bgFaint }}>
            <th
              style={{
                textAlign: "left",
                padding: "10px 14px",
                fontWeight: 600,
                color: colors.heading,
                borderBottom: `1px solid ${colors.line}`,
              }}
            >
              서류명
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "10px 14px",
                fontWeight: 600,
                color: colors.heading,
                borderBottom: `1px solid ${colors.line}`,
                width: 70,
              }}
            >
              필수
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "10px 14px",
                fontWeight: 600,
                color: colors.heading,
                borderBottom: `1px solid ${colors.line}`,
              }}
            >
              발급처
            </th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc, i) => (
            <tr
              key={i}
              style={{
                borderBottom:
                  i < docs.length - 1
                    ? `1px solid ${colors.lineFaint}`
                    : undefined,
              }}
            >
              <td style={{ padding: "9px 14px", color: colors.body }}>
                {doc.name}
              </td>
              <td
                style={{
                  padding: "9px 14px",
                  textAlign: "center",
                  color: doc.required ? colors.mainGreen : colors.muted,
                  fontWeight: 600,
                }}
              >
                {doc.required ? "O" : "△"}
              </td>
              <td style={{ padding: "9px 14px", color: colors.sub }}>
                {doc.where}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
