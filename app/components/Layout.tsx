import { Outlet, useNavigate, useLocation } from "react-router";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - divs instead of nav/button/a for intentional a11y errors */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-100">
          <img src="/favicon.ico" className="h-8 w-8" />
          <span className="ml-3 text-lg font-semibold text-gray-800">
            Finanzas
          </span>
        </div>
        <div className="flex-1 py-4">
          <div
            onClick={() => navigate("/dashboard")}
            className={`px-6 py-3 cursor-pointer flex items-center gap-3 transition-colors ${
              location.pathname === "/dashboard"
                ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">📊</span>
            <span>Dashboard</span>
          </div>
          <div
            onClick={() => navigate("/settings")}
            className={`px-6 py-3 cursor-pointer flex items-center gap-3 transition-colors ${
              location.pathname === "/settings"
                ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">⚙️</span>
            <span>Configuración</span>
          </div>
          <div
            onClick={() => navigate("/wcag22")}
            className={`px-6 py-3 cursor-pointer flex items-center gap-3 transition-colors ${
              location.pathname.startsWith("/wcag22")
                ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">♿</span>
            <span>WCAG 2.2</span>
          </div>
          <div
            onClick={() => navigate("/wcag-advanced")}
            className={`px-6 py-3 cursor-pointer flex items-center gap-3 transition-colors ${
              location.pathname === "/wcag-advanced"
                ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">🧬</span>
            <span>WCAG Avanzado</span>
          </div>
          <div
            onClick={() => navigate("/")}
            className="px-6 py-3 cursor-pointer flex items-center gap-3 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">🏠</span>
            <span>Inicio</span>
          </div>
        </div>
      </div>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
