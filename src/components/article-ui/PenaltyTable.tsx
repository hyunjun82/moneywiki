import { colors } from "./styles";

interface PenaltyRow {
  violation: string;
  penalty: string;
  note?: string;
}

interface PenaltyTableProps {
  title: string;
  rows: PenaltyRow[];
}

export function PenaltyTable({ title, rows }: PenaltyTableProps) {
  const cell: React.CSSProperties = {
    padding: "10px 12px",
    fontSize: 13,
    color: colors.body,
    lineHeight: 1.7,
    borderBottom: `1px solid ${colors.lineFaint}`,
  };

  return (
    <div
      style={{
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        overflow: "hidden",
        margin: "1.2rem 0",
      }}
    >
      <div style={{ padding: "12px 14px", backgroundColor: colors.greenBg }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: colors.greenText, margin: 0 }}>{title}</p>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...cell, fontWeight: 600, color: colors.heading, textAlign: "left" }}>위반 항목</th>
            <th style={{ ...cell, fontWeight: 600, color: colors.heading, textAlign: "right" }}>제재</th>
            <th style={{ ...cell, fontWeight: 600, color: colors.heading, textAlign: "right" }}>비고</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 1 ? colors.bgFaint : "#fff" }}>
              <td style={cell}>{r.violation}</td>
              <td style={{ ...cell, textAlign: "right", color: "#dc2626", fontWeight: 600 }}>{r.penalty}</td>
              <td style={{ ...cell, textAlign: "right", color: colors.sub }}>{r.note || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
