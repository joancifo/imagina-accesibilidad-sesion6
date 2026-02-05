import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/wcag22-ejercicio-4";

// TRAMPA WCAG 3.3.8 (Accessible authentication): Bloqueo de pegado en "Confirmar contraseña"
// obliga a escribir manualmente, perjudicando a usuarios con gestores de contraseñas o limitaciones.

export function meta({}: Route.MetaArgs) {
  return [{ title: "Ejercicio 4 - Confirmar contraseña | WCAG 2.2" }];
}

export default function Wcag22Ejercicio4() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="p-8 max-w-xl">
      <nav className="mb-6 text-sm">
        <Link to="/wcag22" className="text-indigo-600 hover:underline">
          ← Volver a WCAG 2.2
        </Link>
      </nav>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Ejercicio 4: Crear cuenta
      </h1>
      <p className="text-gray-600 mb-8">
        Prueba a pegar la contraseña en "Confirmar contraseña". Criterio:{" "}
        <strong>3.3.8 Accessible authentication</strong>.
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="reg-email"
            type="email"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="reg-confirm" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar contraseña
          </label>
          {/* TRAMPA: Bloqueo de paste — viola 3.3.8 Accesible Authentication */}
          <input
            id="reg-confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            autoComplete="new-password"
          />
          <p className="mt-1 text-xs text-gray-500">
            Por seguridad, no está permitido pegar en este campo.
          </p>
        </div>
        <button
          type="button"
          className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
