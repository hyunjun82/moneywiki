import { colors } from "./styles";

interface SupportTier {
  tier: string;
  amount: string;
  condition: string;
}

interface SupportAmountCardProps {
  title: string;
  tiers: SupportTier[];
  note?: string;
}

export function SupportAmountCard({ title, tiers, note }: SupportAmountCardProps) {
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

      <div style={{ padding: "4px 0" }}>
        {tiers.map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 14px",
              borderBottom: i < tiers.length - 1 ? `1px solid ${colors.lineFaint}` : "none",
              backgroundColor: i % 2 === 1 ? colors.bgFaint : "#fff",
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: colors.heading, margin: 0, lineHeight: 1.5 }}>
                {t.tier}
              </p>
              <p style={{ fontSize: 12, color: colors.sub, margin: "2px 0 0", lineHeight: 1.5 }}>
                {t.condition}
              </p>
            </div>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: colors.mainGreen,
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              {t.amount}
            </p>
          </div>
        ))}
      </div>

      {note && (
        <p
          style={{
            fontSize: 11.5,
            color: colors.muted,
            padding: "8px 14px",
            margin: 0,
            lineHeight: 1.6,
            borderTop: `1px solid ${colors.lineFaint}`,
          }}
        >
          {note}
        </p>
      )}
    </div>
  );
}
