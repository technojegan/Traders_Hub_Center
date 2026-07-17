"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartTooltipStyle = {
  backgroundColor: "var(--popover)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--popover-foreground)",
};

export function CumulativeLineChart({
  data,
}: {
  data: { date: string; cumulativePercent: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
        <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Line
          type="monotone"
          dataKey="cumulativePercent"
          stroke="var(--primary)"
          strokeWidth={2.5}
          dot={false}
          name="Cumulative %"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function WinLossBarChart({
  data,
}: {
  data: { date: string; wins: number; losses: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Bar dataKey="wins" fill="var(--thc-win)" name="Wins" radius={[3, 3, 0, 0]} />
        <Bar dataKey="losses" fill="var(--thc-loss)" name="Losses" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CePeDonutChart({
  ceCount,
  peCount,
}: {
  ceCount: number;
  peCount: number;
}) {
  const data = [
    { name: "CE", value: ceCount },
    { name: "PE", value: peCount },
  ];
  const colors = ["var(--thc-win)", "var(--thc-loss)"];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={chartTooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function BestWorstBarChart({
  data,
}: {
  data: { label: string; pnlPercent: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
        <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Bar dataKey="pnlPercent" name="P&L %" radius={[3, 3, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.label}
              fill={entry.pnlPercent >= 0 ? "var(--thc-win)" : "var(--thc-loss)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
