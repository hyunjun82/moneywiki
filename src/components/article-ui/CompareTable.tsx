import { colors } from "./styles";

interface CompareRow {
  label: string;
  optionA: string;
  optionB: string;
}

interface CompareTableProps {
  titleA: string;
  titleB: string;
  rows: CompareRow[];
}

export function CompareTable({ titleA, titleB, rows }: CompareTableProps) {
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
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: colors.greenBg }}>
            <th style={{ ...cell, fontWeight: 600, color: colors.greenText, width: "28%" }} />
            <th style={{ ...cell, fontWeight: 700, color: colors.mainGreen, textAlign: "center" }}>
              {titleA}
            </th>
            <th style={{ ...cell, fontWeight: 700, color: colors.mainGreen, textAlign: "center" }}>
              {titleB}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 1 ? colors.bgFaint : "#fff" }}>
              <td style={{ ...cell, fontWeight: 600, color: colors.heading }}>{r.label}</td>
              <td style={{ ...cell, textAlign: "center" }}>{r.optionA}</td>
              <td style={{ ...cell, textAlign: "center" }}>{r.optionB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
