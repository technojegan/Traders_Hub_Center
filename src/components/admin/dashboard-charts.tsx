"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
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
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
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
        />
        <Bar
          dataKey="lossPercent"
          stackId="winloss"
          fill="url(#lossFill)"
          name="Loss %"
          radius={[3, 3, 0, 0]}
          isAnimationActive={false}
        />
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
  const total = ceCount + peCount;
  const data = [
    { name: "CE", value: ceCount },
    { name: "PE", value: peCount },
  ];
  const fills = ["url(#ceFill)", "url(#peFill)"];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <defs>
          <linearGradient id="ceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--thc-ce)" stopOpacity={1} />
            <stop offset="100%" stopColor="var(--thc-ce)" stopOpacity={0.55} />
          </linearGradient>
          <linearGradient id="peFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--thc-pe)" stopOpacity={1} />
            <stop offset="100%" stopColor="var(--thc-pe)" stopOpacity={0.55} />
          </linearGradient>
        </defs>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={56}
          outerRadius={88}
          paddingAngle={3}
          label={({ name, value }) =>
            total > 0 ? `${name} ${Math.round(((value ?? 0) / total) * 100)}%` : name
          }
          labelLine={{ stroke: "var(--muted-foreground)", strokeWidth: 1 }}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={fills[index % fills.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={chartTooltipStyle} />
        <Legend formatter={(value) => legendText(`${value} (${value === "CE" ? ceCount : peCount})`)} />
      </PieChart>
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

export function TpSlComparisonChart({
  data,
}: {
  data: { date: string; tpHitPercent: number; slHitPercent: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        {grid}
        <XAxis dataKey="date" tick={axisTick} />
        <YAxis tick={axisTick} unit="%" />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Legend formatter={legendText} />
        <Line
          type="monotone"
          dataKey="tpHitPercent"
          name="TP Hit %"
          stroke="var(--thc-win)"
          strokeWidth={2.5}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="slHitPercent"
          name="SL Hit %"
          stroke="var(--thc-loss)"
          strokeWidth={2.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function MonthlyPerformanceChart({
  data,
}: {
  data: { month: string; totalPercent: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="monthWinFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--thc-win)" stopOpacity={0.95} />
            <stop offset="100%" stopColor="var(--thc-win)" stopOpacity={0.35} />
          </linearGradient>
          <linearGradient id="monthLossFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--thc-loss)" stopOpacity={0.95} />
            <stop offset="100%" stopColor="var(--thc-loss)" stopOpacity={0.35} />
          </linearGradient>
        </defs>
        {grid}
        <XAxis dataKey="month" tick={axisTick} />
        <YAxis tick={axisTick} />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Bar
          dataKey="totalPercent"
          name="Total Capture %"
          radius={[3, 3, 0, 0]}
          isAnimationActive={false}
        >
          {data.map((entry) => (
            <Cell
              key={entry.month}
              fill={entry.totalPercent >= 0 ? "url(#monthWinFill)" : "url(#monthLossFill)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
