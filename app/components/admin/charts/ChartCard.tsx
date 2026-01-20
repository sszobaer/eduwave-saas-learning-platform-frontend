"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";

const COLORS = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#00C49F", "#FF6699"
];

// Line Chart Card
interface LineChartProps {
  data: any[];
  dataKeyX: string;
  dataKeyY: string;
  title: string;
}

export function LineChartCard({ data, dataKeyX, dataKeyY, title }: LineChartProps) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-lg shadow-purple-900/20 hover:shadow-purple-600/30 transition-all duration-300">

      <h3 className="text-lg font-semibold text-purple-300 mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey={dataKeyX} stroke="#AAA" />
          <YAxis stroke="#AAA" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", borderRadius: 6, border: "none" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Line
            type="monotone"
            dataKey={dataKeyY}
            stroke="#FF6384"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Bar Chart Card
interface BarChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  title: string;
}

export function BarChartCard({ data, dataKey, nameKey, title }: BarChartProps) {
  return (
     <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-lg shadow-purple-900/20 hover:shadow-purple-600/30 transition-all duration-300">
      <h3 className="text-lg font-semibold text-purple-300 mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey={nameKey} stroke="#AAA" />
          <YAxis stroke="#AAA" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", borderRadius: 6, border: "none" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Bar dataKey={dataKey}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <LabelList dataKey={dataKey} position="top" fill="#fff" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Pie Chart Card
export function PieChartCard({ data, dataKey, nameKey, title }: BarChartProps) {
  return (
     <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-lg shadow-purple-900/20 hover:shadow-purple-600/30 transition-all duration-300">
      <h3 className="text-lg font-semibold text-purple-300 mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            paddingAngle={3}
            stroke="#1F2937"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", borderRadius: 6, border: "none" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend wrapperStyle={{ color: "#fff" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
