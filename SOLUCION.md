# Solucionario — Guía rápida para la práctica de accesibilidad

Esta es la hoja de trucos de lo que debes **encontrar y arreglar** durante la hora de práctica. Los fallos están repartidos por el proyecto; usa la `GUIA.md` para localizarlos y esta guía para saber cómo corregirlos.

---

## 1. Navegación por teclado (la prueba del Tab)

**Fallo:** No se puede entrar al Sidebar ni a los botones de la tabla con el teclado porque son `<div>`.

**Arreglo:** Cambiar esos elementos a `<button>` (o enlaces `<Link>`/`<a>` donde sea navegación) o, como mínimo, añadir `tabIndex={0}` + `role="button"` y manejar `onKeyDown` (Enter/Espacio). **Lo mejor es usar `<button>` o `<Link>`.**

- **Sidebar:** `app/components/Layout.tsx` — sustituir los `<div onClick={...}>` por `<Link to="...">` o `<button>`.
- **Tabla:** `app/routes/dashboard.tsx` — sustituir los `<div onClick>` de Editar y Eliminar por `<button>` (con `aria-label`).

---

## 2. Foco visible

**Fallo:** Al navegar con Tab no se ve dónde está el foco porque se ha puesto `outline: none` global.

**Arreglo:** Quitar la regla `*:focus { outline: none; }` en `app/app.css` y, si quieres un estilo propio, usar por ejemplo `focus:ring` o `focus:outline` (Tailwind: `focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`) en los elementos interactivos en lugar de eliminar el outline por completo.

---

## 3. Lectores de pantalla (semántica)

**Fallo:** La “tabla” de transacciones se anuncia como “grupo, grupo, grupo” porque está hecha con `<div>` y flex.

**Arreglo:** Reescribir la sección de transacciones recientes usando `<table>`, `<thead>`, `<th>`, `<tbody>`, `<tr>` y `<td>`. Mantener los estilos con Tailwind (clases en `table`, `th`, `td`) para que siga viéndose bien.

---

## 4. Formularios

**Fallo:** El lector de pantalla dice algo como “edición de texto vacío” en los inputs porque no hay etiquetas asociadas.

**Arreglo:** Añadir `<label htmlFor="id-del-input">` para cada campo y dar al input el mismo `id`. En React: `<label htmlFor="nombre">Nombre</label>` y `<input id="nombre" ... />`. Lo mismo para email y para el select de moneda (p. ej. `id="currency"`).

---

## 5. Gráfico (el reto final)

**Fallo:** El gráfico es invisible para el lector de pantalla; la información solo está en la imagen/colores.

**Arreglo:** Implementar la **técnica de la tabla oculta** que vimos en teoría: añadir una tabla con los mismos datos del gráfico (mes, ingresos, gastos) y envolverla en un contenedor con clase `sr-only` (screen-reader only) para que solo la lean los lectores de pantalla y no se vea en pantalla. Así el contenido del gráfico queda disponible en texto.

---

## 6. Idioma de la página (criterio 3.1.1)

**Fallo:** El contenido está en español pero en `app/root.tsx` el `<html>` tiene `lang="en"`. El lector de pantalla leerá "Ingresos", "Gastos", etc. con acento inglés (suena mal).

**Arreglo:** Cambiar a `lang="es"` en la etiqueta `<html>`. En una demo con lector de pantalla se nota la diferencia de pronunciación.

---

## 7. Mensaje de estado (criterio 4.1.3 Status Messages)

**Fallo:** Al guardar en Configuración aparece el texto "Guardado correctamente." en el DOM, pero el lector de pantalla **no lo anuncia** porque no es una live region.

**Arreglo:** En el contenedor del mensaje (`app/routes/settings.tsx`), añadir `role="status"` o `aria-live="polite"` para que el lector anuncie el cambio cuando aparezca. Ejemplo: `<div role="status" aria-live="polite" className="...">`. Es el ejercicio ideal para practicar **Live Regions**.

---

## 8. Títulos jerárquicos (criterio 1.3.1)

**Fallo:** "Transacciones recientes" está marcado como `<strong>` con letra grande en lugar de `<h2>`. Al navegar por encabezados (tecla H en NVDA/VoiceOver), esa sección se salta.

**Arreglo:** Restaurar la semántica correcta: usar `<h2>` para "Transacciones recientes" en `app/routes/dashboard.tsx`. Puedes mantener el mismo aspecto con clases Tailwind (`text-lg font-bold`, etc.) en el `<h2>`.

---

## Resumen

| Área              | Dónde mirar           | Acción principal                                      |
|-------------------|-----------------------|--------------------------------------------------------|
| Teclado           | Layout, Dashboard      | `<div>` → `<button>` o `<Link>`                       |
| Foco              | `app/app.css`         | Quitar `outline: none`; usar `focus:ring`/outline     |
| Tabla             | Dashboard (transacciones) | Divs → `<table>`, `<thead>`, `<th>`, `<tbody>`, `<tr>`, `<td>` |
| Formularios       | Settings              | Añadir `<label htmlFor="...">` y `id` en inputs       |
| Gráfico           | Dashboard (Recharts)  | Tabla de datos con clase `sr-only`                   |
| Idioma            | `app/root.tsx`       | `lang="en"` → `lang="es"`                             |
| Mensaje de estado | Settings              | Añadir `role="status"` o `aria-live="polite"` al mensaje "Guardado" |
| Encabezados       | Dashboard             | `<strong>` "Transacciones recientes" → `<h2>`         |

Cuando termines, comprueba con **Tab** (teclado), **lector de pantalla** (NVDA, VoiceOver o similar) y **herramientas de contraste** que los textos cumplan ratio suficiente.
