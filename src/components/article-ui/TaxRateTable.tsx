import { colors } from "./styles";

interface TaxRow {
  bracket: string;
  rate: string;
  deduction: string;
}

interface TaxRateTableProps {
  title: string;
  rows: TaxRow[];
  note?: string;
}

export function TaxRateTable({ title, rows, note }: TaxRateTableProps) {
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
            <th style={{ ...cell, fontWeight: 600, color: colors.heading, textAlign: "left" }}>과세표준</th>
            <th style={{ ...cell, fontWeight: 600, color: colors.heading, textAlign: "center" }}>세율</th>
            <th style={{ ...cell, fontWeight: 600, color: colors.heading, textAlign: "right" }}>누진공제</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 1 ? colors.bgFaint : "#fff" }}>
              <td style={cell}>{r.bracket}</td>
              <td style={{ ...cell, textAlign: "center", color: colors.mainGreen, fontWeight: 700 }}>
                {r.rate}
              </td>
              <td style={{ ...cell, textAlign: "right" }}>{r.deduction}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {note && (
        <p style={{ fontSize: 11.5, color: colors.muted, padding: "8px 14px", margin: 0, lineHeight: 1.6 }}>
          {note}
        </p>
      )}
    </div>
  );
}
