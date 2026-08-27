---
name: TypeScript Best Practices
description: Convenciones y mejores prácticas para TypeScript en el proyecto
trigger: typescript, type, interface, generic
license: MIT
author: The Good Trainer Team
version: 1.0.0
scope: root
auto_invoke: ["typescript", "type", "interface"]
tools: ["read", "write"]
---

# TypeScript Best Practices

## Principios
1. Tipado estricto - evitar `any`
2. Interfaces sobre types cuando sea posible
3. Generics para código reutilizable
4. Utility types de TypeScript
5. Type guards para validación en runtime

## Estructura de Tipos

### Interfaces

```typescript
// Interfaces para objetos
interface User {
  id: string;
  name: string;
  email: string;
  age?: number; // Opcional
  readonly createdAt: Date; // Solo lectura
}

// Extensión de interfaces
interface AdminUser extends User {
  permissions: string[];
  role: 'admin' | 'superadmin';
}

// Interfaces para funciones
interface SearchFunction {
  (query: string, filters?: SearchFilters): Promise<SearchResult[]>;
}
```

### Types

```typescript
// Types para unions
type Status = 'pending' | 'active' | 'inactive' | 'archived';

// Types para intersecciones
type UserWithMetadata = User & {
  metadata: Record<string, unknown>;
};

// Types para funciones
type EventHandler = (event: Event) => void;

// Types para objetos complejos
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};
```

## Patrones a Seguir

✅ **Usar interfaces para definir shapes de objetos**
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
}
```

✅ **Usar type para unions y aliases**
```typescript
type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ID = string | number;
```

✅ **Usar generics para código reutilizable**
```typescript
function getById<T>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}
```

✅ **Usar utility types**
```typescript
// Partial - todos los campos opcionales
type PartialUser = Partial<User>;

// Pick - seleccionar campos
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - omitir campos
type UserWithoutEmail = Omit<User, 'email'>;

// Record - objeto con keys y valores tipados
type UserMap = Record<string, User>;
```

✅ **Type guards para validación**
```typescript
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  );
}

if (isUser(data)) {
  // TypeScript sabe que data es User
  console.log(data.name);
}
```

✅ **Usar enums para constantes relacionadas**
```typescript
enum UserRole {
  ADMIN = 'admin',
  TRAINER = 'trainer',
  CLIENT = 'client',
}
```

## Patrones a Evitar

❌ **No usar `any`**
```typescript
// Evitar
function process(data: any) { ... }

// Usar
function process(data: unknown) {
  if (isValidData(data)) {
    // Procesar
  }
}
```

❌ **No usar type assertions innecesarias**
```typescript
// Evitar
const user = data as User;

// Usar
if (isUser(data)) {
  const user = data; // TypeScript infiere el tipo
}
```

❌ **No duplicar definiciones de tipos**
```typescript
// Evitar
interface User { id: string; name: string; }
interface UserData { id: string; name: string; }

// Usar
interface User { id: string; name: string; }
type UserData = User;
```

## React + TypeScript

### Componentes

```typescript
import { FC, ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
}

export const Card: FC<CardProps> = ({ title, children, onClose }) => {
  return (
    <div>
      <h2>{title}</h2>
      {children}
      {onClose && <button onClick={onClose}>Close</button>}
    </div>
  );
};
```

### Hooks

```typescript
import { useState, useEffect } from 'react';

// Hook con tipos genéricos
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

### Event Handlers

```typescript
import { ChangeEvent, FormEvent } from 'react';

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Handle submit
};
```

## API y Fetch

```typescript
// Definir tipos de respuesta
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Función con tipos genéricos
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}

// Uso
const users = await fetchData<User[]>('/api/users');
```

## Error Handling

```typescript
// Custom error types
class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Type guard para errors
function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

// Uso
try {
  await fetchData();
} catch (error) {
  if (isApiError(error)) {
    console.log(`API Error: ${error.statusCode}`);
  } else if (error instanceof Error) {
    console.log(error.message);
  }
}
```

## Ejemplos

### Correcto: Tipado completo

```typescript
interface UserCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: User;
  expiresAt: Date;
}

async function login(
  credentials: UserCredentials
): Promise<AuthResponse> {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new ApiError(response.status, 'Login failed');
  }

  return response.json();
}
```

### Incorrecto: Sin tipos

```typescript
// ❌ Evitar
async function login(credentials) {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  return response.json();
}
```

## Utility Types Comunes

```typescript
// Readonly - hacer todo readonly
type ReadonlyUser = Readonly<User>;

// Required - todos los campos requeridos
type RequiredUser = Required<User>;

// NonNullable - remover null y undefined
type NonNullableString = NonNullable<string | null | undefined>;

// ReturnType - obtener tipo de retorno
type LoginResult = ReturnType<typeof login>;

// Parameters - obtener tipos de parámetros
type LoginParams = Parameters<typeof login>;

// Awaited - obtener tipo de una promesa
type UserData = Awaited<ReturnType<typeof fetchUser>>;
```

## Mapped Types

```typescript
// Hacer todos los campos opcionales y nullable
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// Hacer todos los campos en funciones
type Listeners<T> = {
  [P in keyof T as `on${Capitalize<string & P>}`]: (value: T[P]) => void;
};

// Ejemplo
interface User {
  name: string;
  age: number;
}

type UserListeners = Listeners<User>;
// { onName: (value: string) => void; onAge: (value: number) => void; }
```

## Conditional Types

```typescript
// Tipo condicional básico
type IsString<T> = T extends string ? true : false;

// Extraer tipos
type ExtractArrayType<T> = T extends Array<infer U> ? U : never;

// Ejemplo
type StringArray = string[];
type StringType = ExtractArrayType<StringArray>; // string
```

## Type Narrowing

```typescript
// Con typeof
function format(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// Con in operator
interface Dog {
  bark: () => void;
}

interface Cat {
  meow: () => void;
}

function makeSound(animal: Dog | Cat) {
  if ('bark' in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// Con instanceof
function handleError(error: Error | string) {
  if (error instanceof Error) {
    console.log(error.stack);
  } else {
    console.log(error);
  }
}
```
