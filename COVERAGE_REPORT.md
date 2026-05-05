# Reporte de Cobertura de Pruebas
Fecha: 2026-05-05 | Proyecto: Notes App | Modo: TDD

## 1. Resumen Ejecutivo
| Capa | Framework | Estado | Cobertura | Tests Pasados | Tests Fallidos |
|------|-----------|--------|-----------|---------------|----------------|
| Backend | pytest | FAIL | 0% | 0 | 0 |
| Frontend | vitest | FAIL | 0% | 0 | 7 |

**Evaluación general:** Ambos servicios presentan fallos críticos en sus configuraciones de test. El backend carece del directorio `tests/` requerido por pytest. El frontend tiene errores de configuración de Jest que impiden la transformación de módulos ES6.

## 2. KPIs de Calidad
| Indicador | Valor | Umbral | Estado |
|-----------|-------|--------|--------|
| Cobertura global (promedio) | 0% | ≥90% | FAIL |
| Tests totales ejecutados | 0 | - | - |
| Tests fallidos | 7 | 0 | FAIL |
| Capas sin cobertura | 2 | 0 | FAIL |

## 3. Detalle por Capa — Backend
| Archivo | %Stmts | %Branch | %Funcs | %Lines | Sin cubrir |
|---------|--------|---------|--------|--------|------------|

No se generó cobertura debido a que no se encontraron tests.

## 4. Detalle por Capa — Frontend
| Archivo | %Stmts | %Branch | %Funcs | %Lines | Sin cubrir |
|---------|--------|---------|--------|--------|------------|

No se generó cobertura debido a errores de parseo en todos los archivos de test.

## 5. Tests Fallidos
| Test | Capa | Error | Prioridad |
|------|------|-------|-----------|
| frontend/tests/App.test.jsx | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| frontend/tests/components/NoteForm.test.jsx | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| frontend/tests/components/NoteItem.test.jsx | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| frontend/tests/components/NoteList.test.jsx | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| frontend/tests/api/notes.test.jsx | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| frontend/tests/hooks/useNotes.test.jsx | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| frontend/tests/main.test.jsx | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |

## 6. Líneas Sin Cubrir (top 10 por impacto)
| Archivo | Líneas | Motivo probable |
|---------|--------|-----------------|
| N/A | N/A | No hay cobertura disponible |

## 7. Análisis de Calidad
### Fortalezas
- El código del backend y frontend existe y parece estar estructurado correctamente
- Se han definido archivos de test, indicando intención de seguir TDD

### Áreas de Mejora
- **Backend**: Crear directorio `tests/` con archivos pytest configurados correctamente
- **Frontend**: Configurar Jest para soportar módulos ES6 (agregar babel-jest, transformIgnorePatterns, o migrar a vitest)
- Ambos servicios requieren configuración de transformadores para JSX/ESM

## 8. Recomendaciones (priorizadas)
1. **ALTA:** Crear directorio `backend/tests/` con tests pytest funcionales
2. **ALTA:** Corregir configuración Jest en frontend para soportar JSX y ESM
3. **MEDIA:** Agregar babel-jest y configurar `.babelrc` o `transformIgnorePatterns`
4. **BAJA:** Migrar de Jest a vitest (ya instalado) para consistencia con el ecosistema Vite

## 9. Output Completo de Tests
### Backend
```
[notice] A new release of pip is available: 24.0 -> 26.1.1
[notice] To update, run: pip install --upgrade pip
/usr/local/lib/python3.11/site-packages/pytest_asyncio/plugin.py:208: PytestDeprecationWarning: The configuration option "asyncio_default_fixture_loop_scope" is unset.
The event loop scope for asynchronous fixtures will default to the fixture caching scope. Future versions of pytest-asyncio will default the loop scope for asynchronous fixtures to function scope. Set the default fixture loop scope explicitly in order to avoid unexpected behavior in the future. Valid fixture loop scopes are "function", "class", "module", "package", "session"

  warnings.warn(PytestDeprecationWarning(_DEFAULT_FIXTURE_LOOP_SCOPE_UNSET))

no tests ran in 0.00s
ERROR: file or directory not found: tests/
```

### Frontend
```
FAIL frontend/tests/hooks/useNotes.test.jsx
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of the "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation, specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /workspace/b4e9d2e3-5f6c-7890-bcde-f01234567891/frontend/tests/hooks/useNotes.test.jsx:1
    import { test, expect } from '@jest/globals';
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1314:40)

FAIL frontend/tests/api/notes.test.jsx
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of the "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation, specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /workspace/b4e9d2e3-5f6c-7890-bcde-f01234567891/frontend/tests/api/notes.test.jsx:1
    import { test, expect } from '@jest/globals';
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1314:40)

FAIL frontend/tests/App.test.jsx
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of the "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation, specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /workspace/b4e9d2e3-5f6c-7890-bcde-f01234567891/frontend/tests/App.test.jsx:1
    import { test, expect } from '@jest/globals';
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1314:40)

FAIL frontend/tests/components/NoteItem.test.jsx
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of the "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation, specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /workspace/b4e9d2e3-5f6c-7890-bcde-f01234567891/frontend/tests/components/NoteItem.test.jsx:1
    import { test, expect } from '@jest/globals';
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1314:40)

FAIL frontend/tests/components/NoteForm.test.jsx
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of the "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation, specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /workspace/b4e9d2e3-5f6c-7890-bcde-f01234567891/frontend/tests/components/NoteForm.test.jsx:1
    import { test, expect } from '@jest/globals';
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1314:40)

FAIL frontend/tests/components/NoteList.test.jsx
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of the "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation, specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /workspace/b4e9d2e3-5f6c-7890-bcde-f01234567891/frontend/tests/components/NoteList.test.jsx:1
    import { test, expect } from '@jest/globals';
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1314:40)

FAIL frontend/tests/main.test.jsx
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of the "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation, specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /workspace/b4e9d2e3-5f6c-7890-bcde-f01234567891/frontend/tests/main.test.jsx:1
    import { test, expect } from '@jest/globals';
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1314:40)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |       0 |        0 |       0 |       0 |
----------|---------|----------|---------|---------|-------------------
Test Suites: 7 failed, 7 total
Tests:       0 total
Snapshots:   0 total
Time:        1.808 s
Ran all test suites.
```

## 10. Metadata
| Campo | Valor |
|-------|-------|
| Generado | 2026-05-05 18:43 UTC |
| Modo | TDD (tests escritos antes del código) |
| Umbral configurado | ≥90% |
| Herramientas | pytest v8.2.0 / vitest v1.5.0 (Jest) |
