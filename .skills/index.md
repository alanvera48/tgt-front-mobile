# The Good Trainer - Agent Orchestrator

## Project Context
React Native mobile app con TypeScript, React Navigation, TanStack Query y Redux.

## Skills Registry

| Skill | Cuándo usar |
|-------|-------------|
| [`react-native`](react-native/SKILL.md) | Componentes, APIs nativas, estilos, navegación |
| [`typescript`](typescript/SKILL.md) | Tipado, interfaces, generics, type safety |
| [`ui`](ui/SKILL.md) | Clean Code, SOLID, arquitectura de componentes |
| [`commit`](commit/SKILL.md) | Mensajes de commit y Pull Requests |

## Auto-invocation Rules

**Siempre invocar la skill correspondiente según el contexto:**
- Código React Native → `react-native`
- Tipado/TypeScript → `typescript`
- Arquitectura/componentes → `ui`
- Git commits/PRs → `commit`

**Importante:** Todo el contexto detallado está en cada skill. Este orquestador solo deriva.

## Quick Reference

**Estructura:** `/src/{components,screens,navigation,hooks,utils,helpers,context,constants,assets,layouts}`

**Naming:** PascalCase (componentes), camelCase (hooks/utils), UPPER_SNAKE_CASE (constantes)

**Branch principal:** `develop`

**Idioma:** Español argentino en commits y PRs
