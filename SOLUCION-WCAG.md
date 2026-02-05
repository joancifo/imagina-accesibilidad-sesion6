# Soluciones WCAG 2.2 — ejercicios de certificación

Guía técnica para explicar y resolver cada uno de los ejercicios durante la clase.

---

## Ejercicio 1: el slider "intocable" (WCAG 2.5.7)

**El problema:** El criterio *Dragging Movements* exige que cualquier acción que requiera arrastrar tenga una alternativa de "puntero simple" (clic). Un usuario con temblor de manos o que usa un head wand (varilla en la cabeza) no puede mantener presionado y arrastrar a la vez.

**La solución:**

- Permitir hacer clic en cualquier punto de la barra para saltar a ese valor.
- Añadir botones + / - al lado del slider.
- (Idealmente) Usar `<input type="range">` nativo, que ya trae todo esto de serie.

---

## Ejercicio 2: botones microscópicos (WCAG 2.5.8)

**El problema:** El criterio *Target Size (Minimum)* introducido en 2.2 exige que el objetivo táctil sea de al menos 24×24 píxeles CSS, o que haya suficiente espacio alrededor para no pulsar el botón equivocado.

**La solución:**

- **Opción A (diseño):** Aumentar el tamaño del botón.
- **Opción B (CSS):** Añadir `p-2` (padding) transparente para aumentar el área de clic sin cambiar el tamaño visual del icono.

---

## Ejercicio 3: el input escondido (WCAG 2.4.11)

**El problema:** *Focus Not Obscured (Minimum)*. Es muy común con los banners de cookies o chats flotantes. Si haces Tab y el foco queda detrás del banner, el usuario no sabe dónde está.

**La solución:**

- **CSS scroll padding:** En el contenedor principal o `html`, añadir `scroll-padding-bottom: [altura-del-banner]`. Así el navegador calcula el scroll automático dejando ese espacio de respeto.
- **Diseño:** Evitar elementos fijos que ocupen el 100% del ancho en móviles.

---

## Ejercicio 4: "prohibido pegar" (WCAG 3.3.8)

**El problema:** *Accessible Authentication*. Obligar a transcribir códigos o contraseñas penaliza a personas con dislexia o problemas de memoria a corto plazo.

**La solución:**

- Eliminar el bloqueo de pegado: quitar `onPaste={(e) => e.preventDefault()}`.
- Permitir gestores: asegurarse de que el `autocomplete` funcione para que 1Password / LastPass puedan rellenar el campo.
