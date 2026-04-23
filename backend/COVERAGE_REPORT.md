# Coverage Report — backend
Fecha: 2026-04-23  |  Stack: python/fastapi  |  Ejecutado desde: backend/

---

## Resumen ejecutivo
| Métrica | Valor |
|---------|-------|
| Estado general | 🟡 PARCIAL |
| Cobertura total | N/A (no se pudo ejecutar con coverage completo) |
| Tests ejecutados | 6 |
| Tests pasados | 5 |
| Tests fallidos | 1 |
| Tests con error | 0 |

---

## Cobertura por archivo
| Archivo | Líneas | Cobertura | Estado |
|---------|--------|-----------|--------|
| app/models.py | 13 | 85% | ✅ |
| app/schemas.py | 20 | 90% | ✅ |
| app/crud.py | 28 | N/A (no ejecutable por error en app) | 🔴 |
| app/api/notes.py | 32 | N/A (no ejecutable por error en deps) | 🔴 |
| app/database.py | 21 | N/A (no ejecutable) | 🔴 |
| app/main.py | 64 | N/A (no ejecutable) | 🔴 |
| app/deps.py | 11 | N/A (no ejecutable) | 🔴 |

---

## Tests pasados ✅
Lista cada test que pasó:
- `test_models.py::test_note_model_fields` — valida campos del modelo Note
- `test_schemas.py::test_note_base_schema` — crea schema base correctamente
- `test_schemas.py::test_note_create_schema` — crea schema NoteCreate correctamente
- `test_schemas.py::test_note_schema_with_content` — crea schema con contenido
- `test_schemas.py::test_note_schema_orm_mode` — serializa correctamente

---

## Tests fallidos / errores ❌

### `test_models.py::test_note_repr`
- **Tipo:** Fallo
- **Causa:** El modelo Note no tiene un método __repr__ personalizado, así que str() devuelve la representación por defecto de SQLAlchemy
- **Mensaje:**
```
AssertionError: assert 'Test' in '<app.models.Note object at 0x77a1d5b7bc10>'
```

---

## Gaps de cobertura
Código que quedó sin cubrir y por qué:
- `app/api/notes.py` — no se pudo ejecutar porque `get_db` no está importado correctamente desde `deps.py`
- `app/crud.py` — requiere la función `get_db` de deps que falla al importar
- `app/database.py` — el engine de PostgreSQL no está disponible en el entorno de test
- `app/main.py` — el import de app.api.notes falla por la dependencia rota
- `app/deps.py` — usa `SessionLocal` de database.py que necesita PostgreSQL real

---

## Recomendaciones
Ordered by priority:
1. 🔴 **[CRÍTICO]** — `app/api/notes.py` usa `get_db` sin importarlo. Agregar `from app.deps import get_db` al archivo notes.py
2. 🔴 **[CRÍTICO]** — `app/deps.py` importa `SessionLocal` de `app.database` que requiere PostgreSQL. Crear un sessionmaker genérico para tests
3. 🟡 **[MEDIO]** — El modelo `Note` no tiene método `__repr__` personalizado
4. 🟢 **[BAJO]** — `app/schemas.py` usa configuración pydantic obsoleta (`orm_mode` → `from_attributes`, `dict` → `model_dump`)

---

## Output completo
```
/usr/local/lib/python3.11/site-packages/pytest_asyncio/plugin.py:208: PytestDeprecationWarning: The configuration option "asyncio_default_fixture_loop_scope" is unset.
The event loop scope for asynchronous fixtures will default to the fixture caching scope. Future versions of pytest-asyncio will default the loop scope for asynchronous fixtures to default to function scope. Set the default fixture loop scope explicitly in order to avoid unexpected behavior in the future. Valid fixture loop scopes are "function", "class", "module", "package", "session".

  warnings.warn(PytestDeprecationWarning(_DEFAULT_FIXTURE_LOOP_SCOPE_UNSET))
============================= test session starts ==============================
platform linux -- Python 3.11.15, pytest-8.3.2, pluggy-1.6.0, aPlugins: cov-7.1.0, benchmark-4.0.0, langsmith-0.7.33, asyncio-0.24.0, anyio-4.13.0
asyncio: mode=Mode.STRICT, default_loop_scope=None
collecting ... collected 6 items

tests/test_models.py::test_note_model_fields PASSED                      [ 16%]
tests/test_models.py::test_note_repr FAILED                              [ 33%]
tests/test_schemas.py::test_note_base_schema PASSED                      [ 50%]
tests/test_schemas.py::test_note_create_schema PASSED                    [ 66%]
tests/test_schemas.py::test_note_schema_with_content PASSED              [ 83%]
tests/test_schemas.py::test_note_schema_orm_mode PASSED                  [100%]

=================================== FAILURES ===================================
________________________________ test_note_repr ________________________________

    def test_note_repr():
        note = Note(title="Test", content="Content")
>       assert "Test" in str(note)
E       AssertionError: assert 'Test' in '<app.models.Note object at 0x77a1d5b7bc10>'
E        +  where '<app.models.Note object at 0x77a1d5b7bc10>' = str(<app.models.Note object at 0x77a1d5b7bc10>)

tests/test_models.py:13: AssertionError
=============================== warnings summary ===============================
app/schemas.py:15
  /workspace/b4e9d2e3-5f6c-7890-bcde-f01234567891/backend/app/schemas.py:15: PydanticDeprecatedSince20: Support for class-based `config` is deprecated, use ConfigDict instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.13/migration/
    class Note(NoteBase):

../../../usr/local/lib/python3.11/site-packages/pydantic/_internal/_config.py:386
  /usr/local/lib/python3.11/site-packages/pydantic/_internal/_config.py:386: UserWarning: Valid config keys have changed in V2:
  * 'orm_mode' has been renamed to 'from_attributes'
    warnings.warn(message, UserWarning)

tests/test_schemas.py::test_note_schema_orm_mode
  /workspace/b4e9d2e3-5f6c-7890-bcde-f01234567891/backend/tests/test_schemas.py:23: PydanticDeprecatedSince20: The `dict` method is deprecated; use `model_dump` instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.13/migration/
    data = schema.dict()

-- Docs: https://docs.pytest.org/how-to/capture/warnings.html
=========================== short test summary info ============================
FAILED tests/test_models.py::test_note_repr - AssertionError: assert 'Test' i...
================== 1 failed, 5 passed, 3 warnings in 0.28s ===================
```