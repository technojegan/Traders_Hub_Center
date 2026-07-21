"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function percentLabel(value: unknown) {
  const n = typeof value === "number" ? value : 0;
  return n >= 12 ? `${Math.round(n)}` : "";
}

const chartTooltipStyle = {
  backgroundColor: "var(--popover)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--popover-foreground)",
};

const axisTick = { fontSize: 11, fill: "var(--muted-foreground)" };
const grid = <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />;

function legendText(value: string) {
  return <span style={{ color: "var(--muted-foreground)", fontSize: 12 }}>{value}</span>;
}

export function CumulativeLineChart({
  data,
}: {
  data: { date: string; cumulativePercent: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="cumulativeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.55} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.03} />
          </linearGradient>
        </defs>
        {grid}
        <XAxis dataKey="date" tick={axisTick} />
        <YAxis tick={axisTick} />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Area
          type="monotone"
          dataKey="cumulativePercent"
          stroke="var(--primary)"
          strokeWidth={2.5}
          fill="url(#cumulativeFill)"
          dot={false}
          name="Cumulative %"
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function WinLossBarChart({
  data,
}: {
  data: { date: string; winPercent: number; lossPercent: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
        barCategoryGap="6%"
      >
        <defs>
          <linearGradient id="winFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--thc-win)" stopOpacity={0.95} />
            <stop offset="100%" stopColor="var(--thc-win)" stopOpacity={0.35} />
          </linearGradient>
          <linearGradient id="lossFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--thc-loss)" stopOpacity={0.95} />
            <stop offset="100%" stopColor="var(--thc-loss)" stopOpacity={0.35} />
          </linearGradient>
        </defs>
        {grid}
        <XAxis dataKey="date" tick={axisTick} />
        <YAxis domain={[0, 100]} unit="%" tick={axisTick} />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Legend formatter={legendText} />
        <Bar
          dataKey="winPercent"
          stackId="winloss"
          fill="url(#winFill)"
          name="Win %"
          isAnimationActive={false}
        >
          <LabelList
            dataKey="winPercent"
            position="inside"
            formatter={percentLabel}
            fill="#0b0b0d"
            fontSize={8}
            fontWeight={700}
          />
        </Bar>
        <Bar
          dataKey="lossPercent"
          stackId="winloss"
          fill="url(#lossFill)"
          name="Loss %"
          radius={[3, 3, 0, 0]}
          isAnimationActive={false}
        >
          <LabelList
            dataKey="lossPercent"
            position="inside"
            formatter={percentLabel}
            fill="#0b0b0d"
            fontSize={8}
            fontWeight={700}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function WinRateDonutChart({ wins, losses }: { wins: number; losses: number }) {
  const total = wins + losses;
  const winRate = total > 0 ? (wins / total) * 100 : 0;
  const data = [
    { name: "Wins", value: wins },
    { name: "Losses", value: losses },
  ];
  const fills = ["url(#winDonutFill)", "url(#lossDonutFill)"];

  return (
    <div className="relative" style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <defs>
            <linearGradient id="winDonutFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--thc-win)" stopOpacity={1} />
              <stop offset="100%" stopColor="var(--thc-win)" stopOpacity={0.55} />
            </linearGradient>
            <linearGradient id="lossDonutFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--thc-loss)" stopOpacity={1} />
              <stop offset="100%" stopColor="var(--thc-loss)" stopOpacity={0.55} />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={64}
            outerRadius={92}
            paddingAngle={3}
            startAngle={90}
            endAngle={-270}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={fills[index % fills.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend
            formatter={(value) => legendText(`${value} (${value === "Wins" ? wins : losses})`)}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-8">
        <div className="text-center">
          <p className="font-heading text-2xl font-bold text-[var(--thc-win)]">
            {winRate.toFixed(1)}%
          </p>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Win Rate</p>
        </div>
      </div>
    </div>
  );
}

interface RiskRewardPoint {
  label: string;
  buyPrice: number;
  sellTargetPrice: number;
  sellSlPrice: number;
  gainPercent: number;
  lossPercent: number;
}

function RiskRewardTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: RiskRewardPoint }[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0].payload;
  return (
    <div
      className="rounded-lg border border-white/10 px-3 py-2 text-xs"
      style={{ backgroundColor: "var(--popover)", color: "var(--popover-foreground)" }}
    >
      <p className="mb-1.5 font-semibold">{point.label}</p>
      <p style={{ color: "var(--muted-foreground)" }}>
        Buy (Entry): <span style={{ color: "var(--popover-foreground)" }}>₹{point.buyPrice}</span>
      </p>
      <p style={{ color: "var(--thc-win)" }}>
        Sell (Target): ₹{point.sellTargetPrice} ({point.gainPercent >= 0 ? "+" : ""}
        {point.gainPercent}%)
      </p>
      <p style={{ color: "var(--thc-loss)" }}>
        Sell (SL): ₹{point.sellSlPrice} ({point.lossPercent}%)
      </p>
    </div>
  );
}

export function OngoingRiskRewardChart({ data }: { data: RiskRewardPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }} barGap={4}>
        <defs>
          <linearGradient id="riskGainFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--thc-win)" stopOpacity={0.95} />
            <stop offset="100%" stopColor="var(--thc-win)" stopOpacity={0.35} />
          </linearGradient>
          <linearGradient id="riskLossFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--thc-loss)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--thc-loss)" stopOpacity={0.95} />
          </linearGradient>
        </defs>
        {grid}
        <XAxis dataKey="label" tick={axisTick} />
        <YAxis unit="%" tick={axisTick} />
        <Tooltip content={<RiskRewardTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Legend formatter={legendText} />
        <Bar
          dataKey="gainPercent"
          name="Potential Gain %"
          fill="url(#riskGainFill)"
          radius={[3, 3, 0, 0]}
          isAnimationActive={false}
        />
        <Bar
          dataKey="lossPercent"
          name="Potential Risk %"
          fill="url(#riskLossFill)"
          radius={[0, 0, 3, 3]}
          isAnimationActive={false}
        />
      </BarChart>
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
        <defs>
          <linearGradient id="bwWinFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--thc-win)" stopOpacity={0.95} />
            <stop offset="100%" stopColor="var(--thc-win)" stopOpacity={0.35} />
          </linearGradient>
          <linearGradient id="bwLossFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--thc-loss)" stopOpacity={0.95} />
            <stop offset="100%" stopColor="var(--thc-loss)" stopOpacity={0.35} />
          </linearGradient>
        </defs>
        {grid}
        <XAxis dataKey="label" tick={axisTick} />
        <YAxis tick={axisTick} />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Bar dataKey="pnlPercent" name="P&L %" radius={[3, 3, 0, 0]} isAnimationActive={false}>
          {data.map((entry) => (
            <Cell
              key={entry.label}
              fill={entry.pnlPercent >= 0 ? "url(#bwWinFill)" : "url(#bwLossFill)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
