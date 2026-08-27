# Skill: Commit Message Standards

## 🎯 Propósito
Crear commits siguiendo las mejores prácticas, con mensajes claros y descriptivos en español argentino.

## 📋 Proceso de Commit

### 1. Análisis Pre-Commit
Ejecutar en paralelo:
- `git status` - Ver archivos modificados y sin seguimiento
- `git diff` - Ver cambios staged y unstaged
- `git log -5 --oneline` - Ver historial reciente para seguir el estilo

### 2. Estructura del Mensaje

```
<tipo>: <resumen breve>

- Detalle 1 de los cambios
- Detalle 2 de los cambios
- Detalle 3 de los cambios
```

### 3. Tipos de Commit

- **Agregar** - Nueva funcionalidad completa
- **Actualizar** - Mejora a funcionalidad existente
- **Arreglar** / **Fix** - Corrección de bugs
- **Refactorizar** - Cambios de código sin cambiar funcionalidad
- **Documentar** - Solo cambios de documentación
- **Estilo** - Formateo, espacios, etc (sin cambios de lógica)
- **Test** - Agregar o modificar tests

### 4. Reglas de Seguridad

**NUNCA:**
- Commitear archivos con secretos (.env, credentials.json, etc)
- Usar `--force` sin solicitud explícita del usuario
- Usar `--amend` a menos que sea explícitamente solicitado
- Hacer push automáticamente (solo si el usuario lo pide)

### 5. Formato del Commit

Usar HEREDOC para mantener formato correcto:

```bash
git commit -m "$(cat <<'EOF'
<Tipo>: <Resumen breve en español argentino>

- Cambio 1
- Cambio 2
- Cambio 3
EOF
)"
```

**IMPORTANTE:** NO incluir líneas de co-autoría ni firmas automáticas como "Generated with Claude Code" o "Co-Authored-By: Claude".

### 6. Verificación Post-Commit

Después del commit, ejecutar:
```bash
git status
```

Para verificar que el commit se creó correctamente.

## ✅ Ejemplo Completo

```bash
git commit -m "$(cat <<'EOF'
Agregar página de suscripción del trainer

- Implementar flujo de pago con Stripe
- Agregar validación de formulario
- Crear componentes de pricing cards
- Actualizar navegación del dashboard
EOF
)"
```

## 🚫 Qué NO hacer

- ❌ No incluir líneas como "Generated with Claude Code"
- ❌ No agregar "Co-Authored-By: Claude"
- ❌ No usar emojis a menos que el usuario lo pida
- ❌ No commitear cambios sin solicitud explícita
- ❌ No hacer commits vacíos

## 📝 Notas

- Todos los mensajes deben estar en **español argentino**
- El resumen debe ser claro y conciso (máx. 72 caracteres)
- Los detalles deben explicar el "qué" y el "por qué"
- Seguir el estilo del historial de commits existente
