import { Link } from "react-router";
import type { Route } from "./+types/wcag22-ejercicio-2";

// TRAMPA WCAG 2.5.8 (Target size): Áreas clicables < 24x24px y sin espacio entre ellas.

const socials = [
  { name: "Twitter", icon: "𝕏", href: "#" },
  { name: "LinkedIn", icon: "in", href: "#" },
  { name: "GitHub", icon: "⌃", href: "#" },
  { name: "Instagram", icon: "📷", href: "#" },
];

export function meta({}: Route.MetaArgs) {
  return [{ title: "Ejercicio 2 - Redes sociales | WCAG 2.2" }];
}

export default function Wcag22Ejercicio2() {
  return (
    <div className="p-8 max-w-xl">
      <nav className="mb-6 text-sm">
        <Link to="/wcag22" className="text-indigo-600 hover:underline">
          ← Volver a WCAG 2.2
        </Link>
      </nav>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Ejercicio 2: Síguenos en redes
      </h1>
      <p className="text-gray-600 mb-8">
        Criterio a revisar: <strong>2.5.8 Target size (mínimo 24x24px)</strong>.
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-700 mb-3">
          Comparte o sigue en redes sociales
        </p>
        {/* TRAMPA: botones 16x16px, gap-1; área clicable estrictamente pequeña */}
        <div className="flex gap-1 items-center">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              className="flex h-4 w-4 items-center justify-center rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium"
              title={s.name}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-700 mb-3">Paginación</p>
        {/* TRAMPA: misma violación en paginación — botones muy pequeños y juntos */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className="h-4 w-4 min-w-[16px] flex items-center justify-center rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs"
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
