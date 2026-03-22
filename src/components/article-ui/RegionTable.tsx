import { colors } from "./styles";

interface RegionRow {
  region: string;
  amount: string;
  condition?: string;
}

interface RegionTableProps {
  title: string;
  rows: RegionRow[];
  note?: string;
}

export function RegionTable({ title, rows, note }: RegionTableProps) {
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
            <th style={{ ...cell, fontWeight: 600, color: colors.heading, textAlign: "left" }}>지역</th>
            <th style={{ ...cell, fontWeight: 600, color: colors.heading, textAlign: "right" }}>금액</th>
            {rows.some((r) => r.condition) && (
              <th style={{ ...cell, fontWeight: 600, color: colors.heading, textAlign: "right" }}>조건</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 1 ? colors.bgFaint : "#fff" }}>
              <td style={{ ...cell, fontWeight: 500 }}>{r.region}</td>
              <td style={{ ...cell, textAlign: "right", color: colors.mainGreen, fontWeight: 600 }}>
                {r.amount}
              </td>
              {rows.some((row) => row.condition) && (
                <td style={{ ...cell, textAlign: "right", color: colors.sub }}>{r.condition || ""}</td>
              )}
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
