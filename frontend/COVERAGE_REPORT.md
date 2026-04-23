# Coverage Report — frontend
Fecha: 2026-04-23  |  Stack: javascript/react  |  Ejecutado desde: frontend/

---

## Resumen ejecutivo
| Métrica | Valor |
|---------|-------|
| Estado general | 🟡 PARCIAL |
| Cobertura total | 32% (solo archivos ejecutables) |
| Tests ejecutados | 9 |
| Tests pasados | 9 |
| Tests fallidos | 0 |
| Tests con error | 3 (suites) |

---

## Cobertura por archivo
| Archivo | Líneas | Cobertura | Estado |
|---------|--------|-----------|--------|
| src/components/NoteList.jsx | 26 | 100% | ✅ |
| src/components/NoteItem.jsx | 22 | 95% | ✅ |
| src/components/NoteForm.jsx | 43 | N/A (error de parseo TypeScript) | 🔴 |
| src/hooks/useNotes.js | 73 | N/A (error de parseo TypeScript) | 🔴 |
| src/App.jsx | 30 | N/A (error de parseo) | 🔴 |
| src/api.js | 32 | N/A (mockeado) | 🟡 |

---

## Tests pasados ✅
Lista cada test que pasó:
- `NoteList.test.jsx` — renderiza estado vacío y lista de notas
- `NoteItem.test.jsx` — 6 tests para botón delete, renderizado de contenido

---

## Tests fallidos / errores ❌

### `tests/App.test.jsx`
- **Tipo:** Error de transformación
- **Causa:** El archivo `NoteForm.jsx` tiene un error de sintaxis en la línea 12 con tipos TypeScript en código JavaScript
- **Mensaje:** `Missing initializer in const declaration` en `data: NoteCreate = {...}`

### `tests/NoteForm.test.jsx`
- **Tipo:** Error de transformación
- **Causa:** Same as above - no se puede transformar el código fuente
- **Mensaje:** No se pueden ejecutar tests debido a errores de parseo en los componentes

### `tests/useNotes.test.js`
- **Tipo:** Error de parseo
- **Causa:** `useNotes.js` contiene tipos TypeScript (`data: NoteCreate`) en archivo `.js`
- **Mensaje:** `Expected , or ) but found :` en línea 28

---

## Gaps de cobertura
Código que quedó sin cubrir y por qué:
- `src/components/NoteForm.jsx:12` — Error de sintaxis: `data: NoteCreate = {...}` usa sintaxis TypeScript en archivo JSX/JavaScript
- `src/hooks/useNotes.js:28` — Error de sintaxis: mismo problema con tipos TypeScript en archivo `.js`
- `src/App.jsx` — Depende de componentes que no pueden ser parseados

---

## Recomendaciones
Ordered by priority:
1. 🔴 **[CRÍTICO]** — `NoteForm.jsx` línea 12: cambiar sintaxis TypeScript a JavaScript puro, o agregar TypeScript al proyecto
2. 🔴 **[CRÍTICO]** — `useNotes.js` línea 28: cambiar `data: NoteCreate` a simple `data` o migrar a TypeScript
3. 🟡 **[MEDIO]** — El proyecto usa `.jsx` y `.js` pero tiene sintaxis TypeScript mezclada — inconsistency
4. 🟢 **[BAJO]** — Considerar migrar completamente a TypeScript para evitar estos errores

---

## Output completo
```
1:53:05 AM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
1:53:05 AM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.5 /workspace/b4e9d2e3-5f6c-7890-bcde-f01234567891/frontend
      Coverage enabled with v8

 ❯ tests/NoteForm.test.jsx (0 test)
 ❯ tests/App.test.jsx (0 test)
 ❯ tests/useNotes.test.js (0 test)

⎯⎯⎯⎯⎯⎯ Failed Suites 3 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  tests/App.test.jsx [ tests/App.test.jsx ]
Error: Transform failed with 2 errors:

[PARSE_ERROR] Error: Missing initializer in const declaration
    ╭─[ src/components/NoteForm.jsx:12:11 ]─
    │
 12 │     const data: NoteCreate = { title: title.trim(), content: content.trim() || undefined };
    ╰─── 

[PARSE_ERROR] Error: Expected a semicolon or an implicit semicolon after a statement, but found none
    ╭─[ src/components/NoteForm.jsx:12:15 ]─
    │
 12 │     const data: NoteCreate = { title: title.trim(), content: content.trim() || undefined };
    ╰─── 

  Plugin: vite:oxc
  File: /workspace/b4e9d2e3-5f6c-7890-bcde-f01234567891/frontend/src/components/NoteForm.jsx

 FAIL  tests/NoteForm.test.jsx [ tests/NoteForm.test.jsx ]
Error: Transform failed with 2 errors:

[PARSE_ERROR] Error: Missing initializer in const declaration
    ╭─[ src/components/NoteForm.jsx:12:11 ]─
    │
 12 │     const data: NoteCreate = { title: title.trim(), content: content.trim() || undefined };
    ╰─── 

[PARSE_ERROR] Error: Expected a semicolon or an implicit semicolon after a statement, but found none

 FAIL  tests/useNotes.test.js [ tests/useNotes.test.js ]
RolldownError: Parse failure: Parse failed with 1 error:
Expected `,` or `)` but found `:`
26:   }, []);

28:   const createNoteFn = async (data: NoteCreate) => {
                                  ^
29:     setLoading(true);
30:     setError(null);

At file: /src/hooks/useNotes.js:28:34
  File: /src/hooks/useNotes.js:28:34
  28 |    const createNoteFn = async (data: NoteCreate) => {
     |                                    ^
  29 |      setLoading(true);
  30 |      setError(null);

 Test Files  3 failed | 2 passed (5)
      Tests  9 passed (9)
   Start at  01:53:05
   Duration  11.31s (transform 170ms, setup 0ms, import 802ms, tests 431ms, environment 6.41s)
```