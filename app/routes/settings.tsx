import { useState } from "react";
import type { Route } from "./+types/settings";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Configuración - Finanzas" }];
}

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [message, setMessage] = useState("");

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-300 mb-8">
        Configuración del perfil
      </h1>

      {/* Form without labels - only placeholders */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
        <div>
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400"
          />
        </div>
        <div>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800"
          >
            <option value="EUR">Euro (EUR)</option>
            <option value="USD">Dólar (USD)</option>
            <option value="GBP">Libra (GBP)</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <div
            onClick={() => setMessage("Guardado correctamente.")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 font-medium"
          >
            Guardar
          </div>
          <div
            onClick={() => setMessage("")}
            className="px-6 py-3 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 font-medium"
          >
            Cancelar
          </div>
        </div>
        {message && (
          <div className="text-green-600 mt-2">{message}</div>
        )}
      </div>
    </div>
  );
}
