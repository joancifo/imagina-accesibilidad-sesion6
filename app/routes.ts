import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/layout.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    route("settings", "routes/settings.tsx"),
    route("wcag22", "routes/wcag22.tsx"),
    route("wcag22/ejercicio-1", "routes/wcag22-ejercicio-1.tsx"),
    route("wcag22/ejercicio-2", "routes/wcag22-ejercicio-2.tsx"),
    route("wcag22/ejercicio-3", "routes/wcag22-ejercicio-3.tsx"),
    route("wcag22/ejercicio-4", "routes/wcag22-ejercicio-4.tsx"),
  ]),
] satisfies RouteConfig;
