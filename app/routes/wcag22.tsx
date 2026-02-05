import { Link } from "react-router";
import type { Route } from "./+types/wcag22";

const exercises = [
  {
    to: "/wcag22/ejercicio-1",
    title: "Ejercicio 1",
    criterion: "2.5.7 Dragging (Nivel AA)",
    description: "Deslizador de volumen. Identifica por qué no cumple accesibilidad.",
    icon: "🎚️",
  },
  {
    to: "/wcag22/ejercicio-2",
    title: "Ejercicio 2",
    criterion: "2.5.8 Target size (Nivel AA)",
    description: "Barra de redes sociales o paginación. Detecta el problema de tamaño.",
    icon: "👆",
  },
  {
    to: "/wcag22/ejercicio-3",
    title: "Ejercicio 3",
    criterion: "2.4.11 Focus not obscured (Nivel AA)",
    description: "Formulario largo con elemento fijo. ¿Qué pasa al navegar con Tab?",
    icon: "📌",
  },
  {
    to: "/wcag22/ejercicio-4",
    title: "Ejercicio 4",
    criterion: "3.3.8 Accessible authentication (Nivel AA)",
    description: "Confirmar contraseña. Prueba a pegar desde el gestor de contraseñas.",
    icon: "🔐",
  },
];

export function meta({}: Route.MetaArgs) {
  return [{ title: "WCAG 2.2 - Ejercicios de certificación" }];
}

export default function Wcag22() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Criterios nuevos WCAG 2.2
        </h1>
        <p className="text-gray-600">
          Ejercicios para detectar violaciones de accesibilidad. Cada enlace lleva
          a una página con errores intencionados; identifica el criterio afectado
          y cómo corregirlo.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {exercises.map((ex) => (
          <Link
            key={ex.to}
            to={ex.to}
            className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="text-3xl mb-3 block" aria-hidden>
              {ex.icon}
            </span>
            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
              {ex.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-indigo-600">
              {ex.criterion}
            </p>
            <p className="mt-2 text-gray-600 text-sm">{ex.description}</p>
            <span className="mt-4 inline-block text-sm font-medium text-indigo-600 group-hover:underline">
              Ir al ejercicio →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
