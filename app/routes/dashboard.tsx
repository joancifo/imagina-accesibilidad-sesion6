import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Route } from "./+types/dashboard";

const kpiData = [
  { label: "Ingresos", value: "24.582 €", change: "+12.5%", positive: true },
  { label: "Gastos", value: "18.230 €", change: "-3.2%", positive: true },
  { label: "Balance", value: "6.352 €", change: "+8.1%", positive: true },
];

const chartData = [
  { month: "Ene", ingresos: 4200, gastos: 3800 },
  { month: "Feb", ingresos: 5100, gastos: 4100 },
  { month: "Mar", ingresos: 4800, gastos: 3900 },
  { month: "Abr", ingresos: 6200, gastos: 4500 },
  { month: "May", ingresos: 5800, gastos: 4200 },
  { month: "Jun", ingresos: 7100, gastos: 4800 },
];

const transactions = [
  { id: 1, concept: "Nómina", amount: "2.450 €", date: "05/02/2025", type: "ingreso" },
  { id: 2, concept: "Supermercado", amount: "-127 €", date: "04/02/2025", type: "gasto" },
  { id: 3, concept: "Alquiler", amount: "-850 €", date: "01/02/2025", type: "gasto" },
  { id: 4, concept: "Freelance", amount: "1.200 €", date: "28/01/2025", type: "ingreso" },
  { id: 5, concept: "Luz", amount: "-62 €", date: "25/01/2025", type: "gasto" },
];

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard - Finanzas" }];
}

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-300 mb-8">
        Dashboard financiero
      </h1>

      {/* KPI cards - low contrast text (gray-300 on white) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {kpiData.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <p className="text-gray-300 text-sm font-medium">{kpi.label}</p>
            <p className="text-2xl font-bold text-gray-300 mt-1">{kpi.value}</p>
            <p
              className={`text-sm mt-2 ${
                kpi.positive ? "text-green-600" : "text-red-600"
              }`}
            >
              {kpi.change} vs mes anterior
            </p>
          </div>
        ))}
      </div>

      {/* Chart - color only (red/green), no data table, no proper legend */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-10">
        <h2 className="text-gray-300 text-lg font-medium mb-6">
          Evolución mensual
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="ingresos"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: "#22c55e" }}
              />
              <Line
                type="monotone"
                dataKey="gastos"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-gray-300 text-xs mt-2">
          Línea verde = ingresos, línea roja = gastos
        </p>
      </div>

      {/* Table as divs (no table semantics) + div buttons */}
      {/* Intentional: h4 / strong instead of h2 — breaks heading hierarchy (1.3.1) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <strong className="block text-gray-300 text-lg font-bold p-6 pb-0">
          Transacciones recientes
        </strong>
        <div className="p-6">
          {/* Header row */}
          <div className="flex gap-4 py-3 border-b border-gray-200 text-gray-300 text-sm font-medium">
            <div className="flex-1">Concepto</div>
            <div className="w-28">Importe</div>
            <div className="w-28">Fecha</div>
            <div className="w-24">Acciones</div>
          </div>
          {/* Data rows */}
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex gap-4 py-4 border-b border-gray-100 items-center"
            >
              <div className="flex-1 text-gray-700">{tx.concept}</div>
              <div
                className={`w-28 font-medium ${
                  tx.type === "ingreso" ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.amount}
              </div>
              <div className="w-28 text-gray-600">{tx.date}</div>
              <div className="w-24 flex gap-2">
                <div
                  onClick={() => console.log("edit", tx.id)}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200"
                >
                  ✏️
                </div>
                <div
                  onClick={() => console.log("delete", tx.id)}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200"
                >
                  🗑️
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
