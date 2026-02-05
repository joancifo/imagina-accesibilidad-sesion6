import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/wcag22-ejercicio-1";

// TRAMPA WCAG 2.5.7 (Dragging): El control solo responde a arrastrar con el mouse.
// No hay click en la pista para saltar, ni soporte de teclado (flechas). Solo drag.

export function meta({}: Route.MetaArgs) {
  return [{ title: "Ejercicio 1 - Deslizador | WCAG 2.2" }];
}

export default function Wcag22Ejercicio1() {
  const [volume, setVolume] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setVolume(percent);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => updateFromClientX(e.clientX);
    const onUp = () => setIsDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isDragging]);

  return (
    <div className="p-8 max-w-xl">
      <nav className="mb-6 text-sm">
        <Link to="/wcag22" className="text-indigo-600 hover:underline">
          ← Volver a WCAG 2.2
        </Link>
      </nav>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Ejercicio 1: Deslizador de volumen
      </h1>
      <p className="text-gray-600 mb-8">
        Ajusta el volumen. Criterio a revisar: <strong>2.5.7 Dragging</strong>.
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Volumen
        </label>
        {/* TRAMPA: div en lugar de input range; solo eventos de ratón en el thumb */}
        {/* TRAMPA: la pista NO tiene onMouseDown — no se puede hacer clic para saltar */}
        {/* TRAMPA: no onKeyDown en ningún elemento — teclado (flechas) no hace nada */}
        <div
          ref={trackRef}
          className="relative h-3 w-full rounded-full bg-gray-200"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={volume}
          aria-valuetext={`${Math.round(volume)}%`}
          tabIndex={0}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-indigo-600 transition-none"
            style={{ width: `${volume}%` }}
          />
          <div
            className="absolute top-1/2 w-5 h-5 -translate-y-1/2 rounded-full bg-indigo-600 shadow cursor-grab active:cursor-grabbing"
            style={{ left: `calc(${volume}% - 10px)` }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragging(true);
              updateFromClientX(e.clientX);
            }}
            onMouseMove={(e) => {
              if (isDragging) updateFromClientX(e.clientX);
            }}
            onMouseLeave={() => setIsDragging(false)}
            onMouseUp={() => setIsDragging(false)}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">{Math.round(volume)}%</p>
      </div>
    </div>
  );
}
