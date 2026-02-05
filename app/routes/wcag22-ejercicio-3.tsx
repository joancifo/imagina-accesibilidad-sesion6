import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/wcag22-ejercicio-3";

// TRAMPA WCAG 2.4.11 (Focus not obscured): Banner fijo tapa el último campo/botón
// al recibir foco con Tab; el usuario no ve dónde está el foco.

export function meta({}: Route.MetaArgs) {
  return [{ title: "Ejercicio 3 - Formulario largo | WCAG 2.2" }];
}

export default function Wcag22Ejercicio3() {
  const [values, setValues] = useState<Record<string, string>>({});

  return (
    <div className="p-8 max-w-xl pb-40">
      <nav className="mb-6 text-sm">
        <Link to="/wcag22" className="text-indigo-600 hover:underline">
          ← Volver a WCAG 2.2
        </Link>
      </nav>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Ejercicio 3: Formulario de registro
      </h1>
      <p className="text-gray-600 mb-8">
        Navega con <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-sm">Tab</kbd> hasta
        el final. Criterio: <strong>2.4.11 Focus not obscured</strong>.
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={values.name ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={values.email ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            id="phone"
            type="tel"
            value={values.phone ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Dirección
          </label>
          <input
            id="address"
            type="text"
            value={values.address ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, address: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
            Comentarios (último campo antes del envío)
          </label>
          <textarea
            id="comments"
            value={values.comments ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, comments: e.target.value }))}
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
          />
        </div>
        {/* TRAMPA: este botón queda oculto detrás del banner fijo al recibir foco */}
        <button
          type="button"
          className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
        >
          Enviar formulario
        </button>
      </div>

      {/* TRAMPA: banner fijo que oculta el foco cuando está en el último campo/botón */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-4 px-6 flex items-center justify-between shadow-lg z-10"
        role="banner"
      >
        <span className="text-sm font-medium">¿Aceptas las cookies?</span>
        <div className="flex gap-2">
          <button type="button" className="px-4 py-2 bg-gray-600 rounded-lg text-sm hover:bg-gray-500">
            Rechazar
          </button>
          <button type="button" className="px-4 py-2 bg-indigo-600 rounded-lg text-sm hover:bg-indigo-500">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
