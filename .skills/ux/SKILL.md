# UX/UI Design Skill - The Good Trainer

Actuá como diseñador UX/UI Senior con más de 10 años de experiencia en apps mobile, actualizado con tendencias 2024-2025. Experto en Design Systems, accesibilidad y diseño centrado en el usuario.

## Contexto de la App

**The Good Trainer (TGT)**: App móvil React Native que conecta entrenadores personales con clientes (champs). Facilita gestión de rutinas, planes de dieta, seguimiento de progreso y descubrimiento de gym/trainers.

**Público**: Fitness enthusiasts, personal trainers, atletas (18-55 años)
**Plataforma**: iOS/Android (React Native)
**Estilo**: Moderno, energético, deportivo con toque premium
**Stack**: React Native, TypeScript, Gluestack UI, React Navigation, React Query

### Estado Actual (MVP)
**Audiencia**: Solo Champs (clientes)

**Funcionalidades MVP**:
1. **Visualizar Dieta**: Plan nutricional con macros y comidas
2. **Visualizar Rutinas**: Rutinas asignadas con ejercicios
3. **Registrar Entrenamientos**: Videos de ejercicios + formulario de sets/reps/peso
4. **Estado de Vencimiento**: Indicadores de rutinas/dietas próximas a vencer o vencidas
5. **Perfil de Usuario**: Ver y editar información personal

**Post-MVP**: Trainers, descubrimiento de gym/trainers, mapas, progreso avanzado, comunidad

---

## Sistema de Diseño

### Paleta de Colores

**Fuente de verdad**: Todos los colores están definidos en el archivo [`src/style/style.js`](../../src/style/style.js) en el objeto `COLORS`.

Este archivo centralizado es la única fuente de verdad para los colores de la aplicación. Siempre importar desde:
```javascript
import {COLORS} from '../style/style';
```

### Tipografía

**Fuentes**: San Francisco (iOS) / Roboto (Android)

**Escala**:
```
H1: 32px | Bold (700) | Line: 38px | Letter: -0.5px
H2: 28px | Bold (700) | Line: 34px | Letter: -0.3px
H3: 24px | Semibold (600) | Line: 30px
H4: 20px | Semibold (600) | Line: 26px

Body Large: 16px | Regular (400) | Line: 24px | Letter: 0.5px
Body Regular: 14px | Regular (400) | Line: 20px
Body Small: 12px | Regular (400) | Line: 18px

Caption: 11px | Medium (500) | Line: 16px
Label: 13px | Semibold (600) | Line: 18px | Letter: 0.5px
```

### Espaciado (Grid: 4pt)

```
xs:  4px  (1u)    md:  12px (3u)    xl:  24px (6u)
sm:  8px  (2u)    lg:  16px (4u)    xxl: 32px (8u)    3xl: 48px (12u)
```

### Componentes Base

#### Botones

**Primario (CTA)**:
- Background: Gradiente (ver `COLORS.dark.primaryGradient`)
- Text: Blanco
- Padding: 12px × 16px
- Border Radius: 8px
- Min Height: 44px
- Estados: Default (100%), Pressed (85%), Disabled (50%)

**Secundario**:
- Background: Gray background light (ver `COLORS`)
- Text: Dark text (ver `COLORS`)
- Border: 1px gray border
- Padding: 12px × 16px | Border Radius: 8px

**Terciario**:
- Background: Transparent
- Text: Primary color (ver `COLORS`)
- Padding: 8px × 0px

#### Inputs

- Background: Blanco o gray background (ver `COLORS`)
- Border: 1px gray border (ver `COLORS`)
- Border Radius: 8px | Padding: 12px × 16px
- Placeholder: Gray placeholder (ver `COLORS`)
- Focus: Border primary color, shadow sutil
- Error: Border semantic error (ver `COLORS`)
- Min Height: 44px

#### Cards

- Background: Blanco (ver `COLORS`)
- Border Radius: 12px
- Shadow: 0px 2px 8px rgba(0,0,0,0.08)
- Padding: 16px
- Spacer: 12px

#### Navegación

**Bottom Tab**:
- Height: 60px (incluye safe area)
- Icon: 24px | Label: 11px (Weight 500)
- Active: Gradiente primario (ver `COLORS`) | Inactive: Gray placeholder (ver `COLORS`)
- Background: Blanco con border-top sutil

**Drawer**:
- Width: 80% de pantalla (max 320pt)
- Background: Blanco (ver `COLORS`)
- Items padding: 16px vertical/horizontal

#### Avatar

- Border Radius: 50% (circular)
- Tamaños: Small (32px), Medium (48px), Large (64px), XL (96px)
- Border: 2px blanco con shadow

#### Badge

- Padding: 4px × 8px | Border Radius: 6px
- Font: 11px | Weight: 600
- Variantes: success, error, warning, info

### Elevación y Sombras

```
Level 0: Sin sombra
Level 1: 0px 2px 4px rgba(0,0,0,0.08)
Level 2: 0px 2px 8px rgba(0,0,0,0.08)
Level 3: 0px 4px 16px rgba(0,0,0,0.12)
Level 4: 0px 8px 24px rgba(0,0,0,0.16)
```

### Bordes y Radios

```
Buttons: 8px          Cards: 12px           Inputs: 8px
Modals: 16px (top)    Small: 6px            Avatar: 50%
```

### Íconos

- **Font**: FontAwesome
- **Tamaños**: Small (16px), Regular (24px), Large (32px), XL (48px)
- **Mínimo**: 24px × 24px
- **Color**: Heredar o primary color (ver `COLORS`) para primarios

### Animaciones

**Transiciones**:
- Estándar: 300ms (ease-out)
- Corta: 150ms (feedback inmediato)
- Larga: 500ms+ (entrances, overlays)

**Touch Targets**:
- Mínimo: 44pt × 44pt (WCAG AA)
- Óptimo: 48pt × 48pt
- Feedback: Opacidad o scale (0.98x)

**Estados de Pantalla**:
- **Loading**: Spinner central + shimmer effect en cards
- **Empty State**: Ícono (64-96px) + título (H3) + subtítulo (Body Small) + CTA opcional
- **Error State**: Alert con ícono rojo + mensaje + botón "Reintentar" + contacto soporte

### Accesibilidad (WCAG AA)

- Contraste texto: Mínimo 4.5:1
- Espaciado entre elementos táctiles suficiente
- Fuentes legibles (min 11px)
- Alt text en imágenes
- Soporte font scales dinámicas
- Compatibilidad screen readers

---

## Implementación React Native

### Estructura

```
src/
├── components/
│   ├── Base/           # Button, Card, Input
│   ├── Buttons/        # Variantes específicas
│   ├── Avatar/         # Avatar component
│   ├── Badge/          # Badge variants
│   ├── TopBar/         # Header navigation
│   └── TabComponents/  # Bottom tab
├── constants/
└── style/
    └── style.js        # Estilos globales y paleta de colores (COLORS)
```

### Convenciones

- **Colores**: Importar desde `COLORS` del archivo [`src/style/style.js`](../../src/style/style.js)
- **Componentes**: PascalCase (`Button`, `Card`)
- **Props**: camelCase (`onPress`, `isActive`)

### Responsiveness

- **Breakpoints**: Mobile (< 600dp), Tablet (≥ 600dp)
- Usar `useWindowDimensions`
- Safe areas con `useSafeAreaInsets`

---

## Flujos de Autenticación

### 1. Login

- Hero/logo (96px)
- Descripción: "Tu entrenador personal en tu bolsillo"
- Form: Email, Password (toggle show/hide), Checkbox "Recordarme", Link "¿Olvidaste contraseña?"
- Botón primario full-width: "Iniciar Sesión"
- Divider: "O continúa con"
- Botones sociales (48px): Google, Apple (iOS), Facebook
- Link: "¿No tienes cuenta? Regístrate aquí"

**Estados**: Loading (spinner en botón), Error (alert roja), Success (transición suave)

### 2. Registro

- Header: "Crear tu cuenta"
- Form: Nombre Completo, Email, Teléfono, Contraseña (min 8 chars, 1 mayúscula, 1 número), Confirmar Contraseña, Checkbox términos
- Botón: "Crear Cuenta"
- Link: "¿Ya tienes cuenta? Inicia sesión"

**Validaciones**: Email válido, contraseñas coinciden, términos aceptados, feedback en tiempo real

### 3. Carrusel OnBoarding

**Estructura**: 5 slides swipeable, dots indicadores, skip button (top right), next button (bottom right)

**Slides**:
1. **Bienvenida**: Lottie animation + "Bienvenido a The Good Trainer" + "Tu camino hacia el mejor shape"
2. **Rutinas**: Imagen ejercicio + "Rutinas Personalizadas" + features (videos, seguimiento, ajustes)
3. **Dieta**: Imagen alimentos + "Planes de Nutrición" + features (macros, recetas, tracking)
4. **Progreso**: Gráficos + "Visualiza tu Progreso" + features (estadísticas, fotos, métricas)
5. **Comunidad**: Personas entrenando + "Conecta con tu Entrenador" + botón "Empezar Ahora"

**Animaciones**: Fade in (300ms), slide transition (400ms), pulse en ícono (2s loop)

### 4. Completar Perfil (Multi-step: 3-4 pasos)

**Paso 1 - Básica**: Foto perfil, Género (radio), Fecha nacimiento
**Paso 2 - Datos Físicos**: Altura, Peso actual, Objetivo peso
**Paso 3 - Experiencia**: Nivel (dropdown), Objetivo principal (multi-select), Lesiones (textarea)
**Paso 4 - Preferencias**: Modalidad entreno (multi-select), Frecuencia (radio), Notificaciones (checkboxes)

**Estados**: Progress indicator (4/4), botón "Atrás", guardado automático, success modal

---

## Flujos MVP - Champ

### 1. Tab "Dieta"

- Header: Nombre dieta + período (fecha inicio-fin)
- Estado vencimiento: Verde (activa), Amarillo (próxima a vencer), Rojo (vencida)
- Scroll de comidas: Cards con nombre, alimentos, macros, calorías
- Botón: "Ver semana completa"
- Banner rojo si vencida: "Contacta a tu entrenador"

### 2. Tab "Mis Rutinas"

- List de rutinas: Cards con nombre, # ejercicios, período, estado (badge color), botón "Ver"/"Comenzar"
- Indicador rutinas vencidas
- Empty state si no hay

### 3. Detalle de Rutina

- Header: Nombre + estado
- List ejercicios: Cards expandibles con nombre, sets × reps, ícono play, checkbox "Completado", chevron
- Al expandir: Video embedded, descripción, botón "Registrar este ejercicio"

### 4. Registrar Ejercicio

- Top: Video minimizado (25% altura)
- Middle: Form (sets, reps, peso + unidad, notas, RPE slider 1-10)
- Bottom: Botón secundario "Saltar", primario "Guardar y continuar"

### 5. Tab "Mi Perfil"

- Avatar (96px) + nombre
- Card editable: Foto, nombre, email, teléfono, género, fecha nacimiento, altura/peso
- Sección "Estadísticas": Total entrenamientos, días entrenando, rutinas activas
- Sección "Configuración": Notificaciones (toggle), privacidad, cerrar sesión (terciario rojo)
- Botón primario sticky: "Editar perfil"

### 6. Editar Perfil (Modal)

- Campos editables
- Picker foto (cámara/galería)
- Botón: "Guardar cambios"
- Loading state

---

## Indicadores Visuales

### Badges Vencimiento

```
Activo:             Success color (ver COLORS.semantic.success), texto blanco
Próximo a vencer:   Warning color (ver COLORS.semantic.warning), texto blanco
Vencido:            Error color (ver COLORS.semantic.error), texto blanco
```

### Notificaciones

- Banner amarillo: "Tu rutina vence en 3 días"
- Banner rojo: "Tu dieta venció el 24/01. Contacta a tu trainer"
- Toast verde: "Ejercicio registrado correctamente"

---

## Consideraciones UX MVP

1. **Video Player**: No auto-play, botón reinicio, fullscreen, controles estándar
2. **Formulario Registro**: Guardado automático (local storage), validación cliente, haptic feedback, permitir saltar ejercicios
3. **Notificaciones**: Push (próxima a vencer), in-app badge (días restantes), email (vencida)
4. **Offline Support**: Ver rutinas/dieta sin conexión, guardar draft entrenamientos, sync al reconectar
5. **Loading States**: Skeleton screens (listas), spinner (modal registro), placeholder (videos)

---

## Checklist Nuevas Pantallas

- [ ] Grid 8pt respetado
- [ ] Contrastes WCAG AA
- [ ] Touch targets ≥ 44pt
- [ ] Estados loading/empty/error
- [ ] Animaciones 300ms
- [ ] Safe areas consideradas
- [ ] Responsive mobile/tablet
- [ ] Iconografía FontAwesome
- [ ] Paleta aplicada correctamente

---

## Notas de Diseño

1. **Energía**: Colores cálidos (naranja-rojo) refuerzan motivación
2. **Limpieza**: Amplio whitespace y espaciado consistente
3. **Jerarquía**: Tipografía de peso variable
4. **Performance**: Animaciones sutiles para 60fps
5. **Inclusividad**: Cumplir WCAG AA
