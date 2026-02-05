import { useState } from "react";
import type { Route } from "./+types/wcag-advanced";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WCAG avanzado - Ejercicios de auditoría" }];
}

export default function WcagAdvanced() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Ejercicios avanzados WCAG
      </h1>
      <p className="text-gray-600 mb-10">
        Violaciones específicas para práctica de auditoría (IAAP CPACC/WAS).
        Identifica el criterio y la trampa en cada bloque.
      </p>

      {/* ——— Ejercicio 5: 3.3.7 Redundant Entry ——— */}
      <h2 className="text-xl font-bold mt-8 mb-4">
        Ejercicio 5 — Criterio 3.3.7 Redundant Entry (WCAG 2.2)
      </h2>
      <Ejercicio5RedundantEntry />

      {/* ——— Ejercicio 6: 2.5.2 Pointer Cancellation ——— */}
      <h2 className="text-xl font-bold mt-8 mb-4">
        Ejercicio 6 — Criterio 2.5.2 Pointer Cancellation (WCAG 2.1)
      </h2>
      <Ejercicio6PointerCancellation />

      {/* ——— Ejercicio 7: 1.4.13 Content on Hover/Focus ——— */}
      <h2 className="text-xl font-bold mt-8 mb-4">
        Ejercicio 7 — Criterio 1.4.13 Content on Hover or Focus (WCAG 2.1)
      </h2>
      <Ejercicio7Tooltip />

      {/* ——— Ejercicio 8: 4.1.2 Name, Role, Value ——— */}
      <h2 className="text-xl font-bold mt-8 mb-4">
        Ejercicio 8 — Criterio 4.1.2 Name, Role, Value (ARIA)
      </h2>
      <Ejercicio8Switch />
    </div>
  );
}

// TRAMPA 3.3.7: Sin opción "Usar la misma dirección"; campos con nombres oscuros para evitar autocompletado.
function Ejercicio5RedundantEntry() {
  const [shipping, setShipping] = useState({ a: "", b: "", c: "" });
  const [billing, setBilling] = useState({ x: "", y: "", z: "" });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Dirección de envío
        </h3>
        <div className="grid gap-3 sm:grid-cols-1">
          {/* TRAMPA: nombres de campo no estándar para que el navegador no sugiera "misma dirección" ni autocomplete */}
          <input
            type="text"
            placeholder="Calle y número"
            value={shipping.a}
            onChange={(e) => setShipping((s) => ({ ...s, a: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            name="ship_line1"
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="CP y ciudad"
            value={shipping.b}
            onChange={(e) => setShipping((s) => ({ ...s, b: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            name="ship_line2"
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="País"
            value={shipping.c}
            onChange={(e) => setShipping((s) => ({ ...s, c: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            name="ship_country"
            autoComplete="off"
          />
        </div>
      </section>
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Dirección de facturación
        </h3>
        {/* TRAMPA: no hay checkbox "Usar la misma dirección" — entrada redundante obligatoria */}
        <div className="grid gap-3 sm:grid-cols-1">
          <input
            type="text"
            placeholder="Calle y número"
            value={billing.x}
            onChange={(e) => setBilling((b) => ({ ...b, x: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            name="bill_line1"
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="CP y ciudad"
            value={billing.y}
            onChange={(e) => setBilling((b) => ({ ...b, y: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            name="bill_line2"
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="País"
            value={billing.z}
            onChange={(e) => setBilling((b) => ({ ...b, z: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            name="bill_country"
            autoComplete="off"
          />
        </div>
      </section>
      <button
        type="button"
        className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
      >
        Continuar al pago
      </button>
    </div>
  );
}

// TRAMPA 2.5.2: Acción disparada en onMouseDown en lugar de onClick — no se puede cancelar moviendo el puntero fuera.
function Ejercicio6PointerCancellation() {
  const [deleted, setDeleted] = useState(false);

  const handleAction = () => {
    setDeleted(true);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-gray-600 text-sm mb-4">
        Botón crítico: la acción se ejecuta al bajar el dedo (mouse down), no al
        soltar (click). No puedes arrepentirte moviendo el ratón fuera.
      </p>
      {/* TRAMPA: onMouseDown en lugar de onClick — viola Pointer Cancellation */}
      <div
        role="button"
        tabIndex={0}
        onMouseDown={handleAction}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") e.currentTarget.click();
        }}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 cursor-pointer select-none"
      >
        Borrar cuenta
      </div>
      {deleted && (
        <p className="mt-4 text-sm text-red-600 font-medium">
          Acción ejecutada (simulada).
        </p>
      )}
    </div>
  );
}

// TRAMPA 1.4.13: Tooltip que se oculta al salir del icono — no se puede mover el cursor al tooltip para leer/copiar.
function Ejercicio7Tooltip() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-gray-600 text-sm mb-4">
        Pasa el ratón sobre el icono de ayuda. Intenta mover el cursor hacia el
        texto del tooltip para copiarlo.
      </p>
      <div className="relative inline-flex">
        {/* TRAMPA: onMouseLeave del icono oculta el tooltip; no hay zona de tolerancia ni hover sobre el tooltip */}
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold text-sm cursor-help"
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          aria-describedby="tooltip-ej7"
        >
          ?
        </span>
        {/* TRAMPA: hay un "gap" entre icono y tooltip; al mover hacia el tooltip se cruza onMouseLeave y desaparece */}
        {visible && (
          <span
            id="tooltip-ej7"
            className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-10 w-48 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg pointer-events-none"
            role="tooltip"
          >
            Aquí podrías leer instrucciones largas. No puedes mover el cursor
            aquí sin que se cierre.
          </span>
        )}
      </div>
    </div>
  );
}

// TRAMPA 4.1.2: Switch sin semántica — solo div + onClick, sin role, aria-checked ni nombre accesible.
function Ejercicio8Switch() {
  const [on, setOn] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-gray-600 text-sm mb-4">
        Interruptor ON/OFF. Un lector de pantalla no anuncia qué control es ni
        su estado.
      </p>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Notificaciones</span>
        {/* TRAMPA: div con onClick; sin role="switch", sin aria-checked, sin nombre accesible — 4.1.2 Name, Role, Value */}
        <div
          onClick={() => setOn(!on)}
          className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
            on ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 rounded-full bg-white shadow transition-all duration-200 ${
              on ? "left-[22px]" : "left-0.5"
            }`}
            style={{ width: 20, height: 20 }}
          />
        </div>
        <span className="text-sm text-gray-500">{on ? "ON" : "OFF"}</span>
      </div>
    </div>
  );
}
