import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", donors: 30, requests: 12 },
  { name: "Feb", donors: 45, requests: 18 },
  { name: "Mar", donors: 60, requests: 25 },
  { name: "Apr", donors: 50, requests: 20 },
  { name: "May", donors: 75, requests: 30 },
];

export default function Analytics() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        📊 Donor & Request Trends
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="donors"
            stroke="#4f46e5"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="requests"
            stroke="#10b981"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">
        📦 Monthly Requests
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="requests" fill="#f43f5e" />
          <Bar dataKey="donors" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
