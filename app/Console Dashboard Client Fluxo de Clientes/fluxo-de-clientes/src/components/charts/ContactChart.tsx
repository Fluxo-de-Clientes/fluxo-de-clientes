import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
export interface ChartPoint {
  label: string
  atual: number
  anterior: number
}
export default function ContactChart({ data }: { data: ChartPoint[] }) {
  return (
    <div
      className="chart-container"
      role="img"
      aria-label={
        'Contatos no período: ' +
        data.map((p) => p.label + ': ' + p.atual + ', período anterior: ' + p.anterior).join('; ')
      }
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 12, left: -24, bottom: 0 }}
          accessibilityLayer
        >
          <defs>
            <linearGradient id="contact-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F0440B" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#F0440B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#ede9e2" strokeDasharray="3 4" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            minTickGap={30}
            tick={{ fill: '#77746e', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            tick={{ fill: '#77746e', fontSize: 12 }}
          />
          <Tooltip contentStyle={{ border: '1px solid #e8e1d7', borderRadius: 12, fontSize: 13 }} />
          <Area
            isAnimationActive={false}
            type="monotone"
            name="Período anterior"
            dataKey="anterior"
            stroke="#b9b4a7"
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="transparent"
          />
          <Area
            isAnimationActive={false}
            type="monotone"
            name="Este período"
            dataKey="atual"
            stroke="#F0440B"
            strokeWidth={2.6}
            fill="url(#contact-fill)"
            activeDot={{ r: 5, stroke: '#fff', strokeWidth: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
