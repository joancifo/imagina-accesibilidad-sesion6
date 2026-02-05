# Guía de errores de accesibilidad (ejercicio de clase)

Este documento describe los **errores de accesibilidad introducidos intencionadamente** en el Dashboard Financiero para practicar su detección y corrección.

---

## 1. Errores de contraste

**Problema:** Textos importantes con contraste insuficiente (gris claro sobre fondo blanco).

**Dónde:**
- `app/routes/dashboard.tsx`: título "Dashboard financiero", etiquetas de las tarjetas KPI ("Ingresos", "Gastos", "Balance"), valores de los KPIs y títulos de secciones usan `text-gray-300`.
- `app/routes/settings.tsx`: título "Configuración del perfil" usa `text-gray-300`.

**Por qué es un error:** El ratio de contraste no cumple WCAG (mínimo 4.5:1 para texto normal). Dificulta la lectura a personas con baja visión o en pantallas con poca luz.

---

## 2. Divs en lugar de botones o enlaces

**Problema:** Elementos interactivos implementados con `<div>` o `<span>` y `onClick` en lugar de `<button>` o `<a>` (o `<Link>`).

**Dónde:**
- **Sidebar** (`app/components/Layout.tsx`): los ítems "Dashboard", "Configuración" e "Inicio" son `<div onClick={() => navigate(...)}>`.
- **Tabla de transacciones** (`app/routes/dashboard.tsx`): las acciones "Editar" (✏️) y "Eliminar" (🗑️) son `<div onClick>`.
- **Settings** (`app/routes/settings.tsx`): los botones "Guardar" y "Cancelar" son `<div onClick>`.

**Por qué es un error:** Los lectores de pantalla y la navegación por teclado no los reconocen como controles. No se pueden activar con Enter/Espacio ni aparecen en la lista de enlaces/botones.

---

## 3. Falta de etiquetas

**Problema:** Campos de formulario sin `<label>` asociado y botones de icono sin nombre accesible.

**Dónde:**
- **Formulario de Settings** (`app/routes/settings.tsx`): los inputs de "Nombre completo" y "Correo electrónico" y el `<select>` de moneda solo tienen `placeholder` o opciones visibles; no hay `<label>` vinculado con `htmlFor`/`id`.
- **Acciones de la tabla** (`app/routes/dashboard.tsx`): los iconos ✏️ y 🗑️ no tienen `aria-label` (p. ej. "Editar transacción", "Eliminar transacción").
- **Sidebar** (`app/components/Layout.tsx`): los iconos (📊, ⚙️, 🏠) no tienen `aria-label`; el elemento interactivo es un div, no un botón con texto o etiqueta.

**Por qué es un error:** Sin labels, las personas que usan lector de pantalla no saben qué dato debe ir en cada campo. Los botones solo de icono sin `aria-label` se anuncian como "botón" sin contexto.

---

## 4. Gráfico inaccesible

**Problema:** El gráfico de Recharts depende solo del color y no ofrece alternativa en texto/tabla.

**Dónde:** `app/routes/dashboard.tsx` — componente `LineChart` con dos series (ingresos en verde, gastos en rojo).

**Detalles del error:**
- **Solo color:** La diferencia entre series es básicamente verde vs rojo; no hay patrón, texto o leyenda robusta para quien no distingue colores.
- **Sin tabla de datos alternativa:** No hay `<table>` o lista con los mismos datos (mes, ingresos, gastos) para quien no puede interpretar el gráfico.
- **Leyenda poco clara:** Solo un texto pequeño debajo ("Línea verde = ingresos, línea roja = gastos") que no sustituye una leyenda accesible ni una tabla de datos.

**Por qué es un error:** Personas con daltonismo o que usan lector de pantalla no pueden obtener la misma información. WCAG recomienda no usar solo el color y ofrecer alternativas (p. ej. tabla de datos).

---

## 5. Foco eliminado

**Problema:** Se elimina el indicador de foco con `outline: none` en todos los elementos.

**Dónde:** `app/app.css` — regla global:

```css
*:focus {
  outline: none;
}
```

**Por qué es un error:** Quien navega con teclado (Tab) no ve dónde está el foco. Comentarios del tipo "el borde azul es feo" suelen llevar a quitar el outline sin reemplazarlo por otro indicador visible, lo que perjudica la accesibilidad.

**Solución recomendada:** Mantener un contorno visible en `:focus` (o un estilo equivalente) y, si hace falta, personalizarlo para que encaje con el diseño.

---

## 6. Imágenes sin texto alternativo

**Problema:** Uso de `<img>` sin atributo `alt`.

**Dónde:** `app/components/Layout.tsx` — logo en el sidebar:

```jsx
<img src="/favicon.ico" className="h-8 w-8" />
```

**Por qué es un error:** El lector de pantalla no puede describir la imagen. Si es decorativa, `alt=""`. Si es informativa (p. ej. logo de la app), `alt` debe describir su función o contenido.

---

## Resumen por fichero

| Fichero | Errores |
|---------|--------|
| `app/app.css` | Foco eliminado (`outline: none`) |
| `app/components/Layout.tsx` | Divs clicables en el sidebar; imagen sin `alt` |
| `app/routes/dashboard.tsx` | Contraste bajo; "tabla" con divs; acciones como divs; botones de icono sin `aria-label`; gráfico solo por color y sin tabla alternativa |
| `app/routes/settings.tsx` | Contraste bajo; inputs/select sin `<label>`; botones Guardar/Cancelar como divs |

Usa esta guía para localizar cada error en el código y, en clase, corregirlos siguiendo las prácticas de accesibilidad (WCAG, semántica HTML y ARIA cuando corresponda).
