---
name: UI Clean Code & SOLID
description: Buenas prácticas de código limpio, separación de responsabilidades y principios SOLID para componentes UI
trigger: ui, component, clean code, solid, separacion responsabilidades
license: MIT
author: The Good Trainer Team
version: 1.0.0
scope: root
auto_invoke: ["ui", "component", "clean code"]
tools: ["read", "write"]
---

# UI Clean Code & SOLID Principles

## Principios Fundamentales

### 1. **Single Responsibility Principle (SRP)**
Cada componente debe tener una única responsabilidad y razón para cambiar.

### 2. **Separation of Concerns**
Separar lógica de negocio, presentación, y manejo de estado.

### 3. **Don't Repeat Yourself (DRY)**
Extraer código duplicado a funciones, hooks o componentes reutilizables.

### 4. **Composición sobre Herencia**
Usar composición de componentes en lugar de componentes complejos.

### 5. **Keep It Simple (KISS)**
Mantener componentes simples y fáciles de entender.

## Arquitectura de Componentes

### Estructura Recomendada

```
src/
├── components/          # Componentes reutilizables
│   ├── atoms/          # Componentes básicos (Button, Input, Text)
│   ├── molecules/      # Combinación de atoms (SearchBar, Card)
│   └── organisms/      # Componentes complejos (Header, Form)
├── screens/            # Pantallas de la app
├── hooks/              # Custom hooks
├── services/           # Servicios (API calls)
├── utils/              # Utilidades puras
├── constants/          # Constantes
└── types/              # TypeScript types
```

## Separación de Responsabilidades

### ✅ Correcto: Componente con Responsabilidad Única

```tsx
// components/atoms/Button.tsx
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
```

```tsx
// hooks/useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials: Credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, login };
};
```

```tsx
// screens/LoginScreen.tsx
export const LoginScreen: React.FC = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch (error) {
      Alert.alert('Error', 'Credenciales inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={loading ? 'Cargando...' : 'Iniciar Sesión'}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
};
```

### ❌ Incorrecto: Todo en un Componente

```tsx
// ❌ Mezcla de responsabilidades
export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // ❌ Lógica de API directamente en el componente
      const response = await fetch('https://api.com/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      Alert.alert('Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* ❌ Componentes inline sin reutilización */}
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## Principios SOLID Aplicados

### S - Single Responsibility Principle

✅ **Correcto: Una Responsabilidad por Componente**

```tsx
// components/UserAvatar.tsx - Solo muestra el avatar
export const UserAvatar: React.FC<{ uri: string; size: number }> = ({ uri, size }) => (
  <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
);

// components/UserName.tsx - Solo muestra el nombre
export const UserName: React.FC<{ name: string }> = ({ name }) => (
  <Text style={styles.name}>{name}</Text>
);

// components/UserProfile.tsx - Compone los componentes
export const UserProfile: React.FC<{ user: User }> = ({ user }) => (
  <View style={styles.container}>
    <UserAvatar uri={user.avatarUrl} size={60} />
    <UserName name={user.name} />
  </View>
);
```

❌ **Incorrecto: Múltiples Responsabilidades**

```tsx
// ❌ Hace demasiadas cosas
export const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ❌ Fetch data
    fetchUser(userId).then(setUser);
  }, [userId]);

  // ❌ Cálculos complejos
  const formattedName = user?.name.toUpperCase().trim();

  // ❌ Renderiza, obtiene datos, y procesa todo junto
  return <View>...</View>;
};
```

### O - Open/Closed Principle

✅ **Correcto: Abierto para Extensión, Cerrado para Modificación**

```tsx
// Base component cerrado para modificación
interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card: React.FC<CardProps> = ({ children, style }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

// Extensión sin modificar el original
export const WorkoutCard: React.FC<{ workout: Workout }> = ({ workout }) => (
  <Card>
    <Text>{workout.name}</Text>
    <Text>{workout.duration} min</Text>
  </Card>
);

export const ProfileCard: React.FC<{ user: User }> = ({ user }) => (
  <Card>
    <UserAvatar uri={user.avatarUrl} size={50} />
    <UserName name={user.name} />
  </Card>
);
```

### L - Liskov Substitution Principle

✅ **Correcto: Los Componentes Derivados son Intercambiables**

```tsx
// Base
interface ButtonProps {
  title: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

// Extensiones que mantienen el contrato
export const PrimaryButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} />
);

export const SecondaryButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} />
);

// Uso: son intercambiables
const MyScreen = () => (
  <>
    <Button title="Normal" onPress={handlePress} />
    <PrimaryButton title="Primary" onPress={handlePress} />
    <SecondaryButton title="Secondary" onPress={handlePress} />
  </>
);
```

### I - Interface Segregation Principle

✅ **Correcto: Interfaces Pequeñas y Específicas**

```tsx
// Interfaces segregadas
interface Pressable {
  onPress: () => void;
}

interface Styleable {
  style?: StyleProp<ViewStyle>;
}

interface Disableable {
  disabled?: boolean;
}

// Componente usa solo lo que necesita
interface IconButtonProps extends Pressable, Styleable {
  icon: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Icon name={icon} />
  </TouchableOpacity>
);
```

❌ **Incorrecto: Interface Monolítica**

```tsx
// ❌ Demasiadas props, muchas opcionales que no todos usan
interface ButtonProps {
  title?: string;
  icon?: string;
  leftIcon?: string;
  rightIcon?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: string;
  size?: string;
  color?: string;
  // ... 20 props más
}
```

### D - Dependency Inversion Principle

✅ **Correcto: Depender de Abstracciones**

```tsx
// Abstracción (contrato)
interface StorageService {
  save: (key: string, value: string) => Promise<void>;
  get: (key: string) => Promise<string | null>;
}

// Implementación concreta
class AsyncStorageService implements StorageService {
  async save(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  }

  async get(key: string) {
    return await AsyncStorage.getItem(key);
  }
}

// Hook depende de la abstracción, no de la implementación
export const useStorage = (storage: StorageService) => {
  const save = async (key: string, value: string) => {
    await storage.save(key, value);
  };

  const get = async (key: string) => {
    return await storage.get(key);
  };

  return { save, get };
};

// Uso: inyección de dependencia
const MyComponent = () => {
  const storage = useStorage(new AsyncStorageService());
  // Fácil de testear con un mock
};
```

## Patrones de Clean Code

### 1. Extracción de Lógica a Custom Hooks

✅ **Correcto:**

```tsx
// hooks/useForm.ts
export const useForm = <T extends object>(initialValues: T) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});

  const handleChange = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const reset = () => setValues(initialValues);

  return { values, errors, handleChange, reset };
};

// Uso en componente
const LoginForm = () => {
  const { values, handleChange } = useForm({ email: '', password: '' });

  return (
    <>
      <Input value={values.email} onChangeText={(v) => handleChange('email', v)} />
      <Input value={values.password} onChangeText={(v) => handleChange('password', v)} />
    </>
  );
};
```

### 2. Componentes Presentacionales vs Contenedores

✅ **Correcto: Separar Lógica de Presentación**

```tsx
// components/WorkoutList.tsx (Presentacional)
interface WorkoutListProps {
  workouts: Workout[];
  onSelectWorkout: (workout: Workout) => void;
  loading?: boolean;
}

export const WorkoutList: React.FC<WorkoutListProps> = ({
  workouts,
  onSelectWorkout,
  loading
}) => {
  if (loading) return <LoadingSpinner />;

  return (
    <FlatList
      data={workouts}
      renderItem={({ item }) => (
        <WorkoutItem workout={item} onPress={() => onSelectWorkout(item)} />
      )}
      keyExtractor={item => item.id}
    />
  );
};

// screens/WorkoutsScreen.tsx (Contenedor)
export const WorkoutsScreen: React.FC = () => {
  const { workouts, loading } = useWorkouts();
  const navigation = useNavigation();

  const handleSelectWorkout = (workout: Workout) => {
    navigation.navigate('WorkoutDetail', { workoutId: workout.id });
  };

  return (
    <WorkoutList
      workouts={workouts}
      onSelectWorkout={handleSelectWorkout}
      loading={loading}
    />
  );
};
```

### 3. Composición de Componentes

✅ **Correcto: Compound Components Pattern**

```tsx
// components/Card/Card.tsx
export const Card: React.FC<{ children: ReactNode }> = ({ children }) => (
  <View style={styles.card}>{children}</View>
);

Card.Header = ({ children }: { children: ReactNode }) => (
  <View style={styles.header}>{children}</View>
);

Card.Body = ({ children }: { children: ReactNode }) => (
  <View style={styles.body}>{children}</View>
);

Card.Footer = ({ children }: { children: ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

// Uso
const MyCard = () => (
  <Card>
    <Card.Header>
      <Text>Título</Text>
    </Card.Header>
    <Card.Body>
      <Text>Contenido</Text>
    </Card.Body>
    <Card.Footer>
      <Button title="Acción" />
    </Card.Footer>
  </Card>
);
```

### 4. Render Props Pattern

✅ **Correcto: Compartir Lógica con Render Props**

```tsx
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => ReactNode;
}

export const DataFetcher = <T,>({ url, children }: DataFetcherProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return <>{children(data, loading, error)}</>;
};

// Uso
const WorkoutsList = () => (
  <DataFetcher<Workout[]> url="/api/workouts">
    {(workouts, loading, error) => {
      if (loading) return <LoadingSpinner />;
      if (error) return <ErrorMessage error={error} />;
      return <WorkoutList workouts={workouts} />;
    }}
  </DataFetcher>
);
```

## Naming Conventions

### Componentes y Archivos

✅ **Correcto:**
```
components/
  atoms/
    Button.tsx          # PascalCase
    Input.tsx
  molecules/
    SearchBar.tsx
    WorkoutCard.tsx
```

### Hooks

✅ **Correcto:**
```
hooks/
  useAuth.ts          # camelCase con prefijo "use"
  useWorkouts.ts
  useForm.ts
```

### Utilidades

✅ **Correcto:**
```
utils/
  formatDate.ts       # camelCase
  validateEmail.ts
  calculateBMI.ts
```

## Evitar Código Duplicado (DRY)

### ❌ Incorrecto: Código Duplicado

```tsx
const ProfileScreen = () => (
  <View style={{ padding: 20, backgroundColor: '#fff' }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Profile</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={{ padding: 20, backgroundColor: '#fff' }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Settings</Text>
  </View>
);
```

### ✅ Correcto: Extraer a Componentes Reutilizables

```tsx
// components/ScreenContainer.tsx
export const ScreenContainer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

// components/ScreenTitle.tsx
export const ScreenTitle: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.title}>{title}</Text>
);

// Uso
const ProfileScreen = () => (
  <ScreenContainer>
    <ScreenTitle title="Profile" />
  </ScreenContainer>
);

const SettingsScreen = () => (
  <ScreenContainer>
    <ScreenTitle title="Settings" />
  </ScreenContainer>
);
```

## Performance y Optimización

### 1. Memoización

```tsx
// Componente pesado memoizado
export const WorkoutItem = React.memo<WorkoutItemProps>(
  ({ workout, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{workout.name}</Text>
    </TouchableOpacity>
  ),
  // Comparador custom si es necesario
  (prevProps, nextProps) => prevProps.workout.id === nextProps.workout.id
);
```

### 2. useCallback y useMemo

```tsx
const WorkoutsList = ({ workouts }: { workouts: Workout[] }) => {
  // useCallback para funciones
  const handlePress = useCallback((workout: Workout) => {
    console.log('Selected:', workout.id);
  }, []);

  // useMemo para cálculos costosos
  const sortedWorkouts = useMemo(
    () => workouts.sort((a, b) => a.name.localeCompare(b.name)),
    [workouts]
  );

  return (
    <FlatList
      data={sortedWorkouts}
      renderItem={({ item }) => <WorkoutItem workout={item} onPress={handlePress} />}
    />
  );
};
```

## Testing y Testabilidad

### Componentes Testables

```tsx
// ✅ Fácil de testear: recibe props, devuelve UI
export const Button: React.FC<ButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} testID="button">
    <Text testID="button-text">{title}</Text>
  </TouchableOpacity>
);

// Test
import { render, fireEvent } from '@testing-library/react-native';

describe('Button', () => {
  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<Button title="Test" onPress={onPress} />);

    fireEvent.press(getByTestId('button'));

    expect(onPress).toHaveBeenCalled();
  });
});
```

## Checklist de Clean Code

✅ **Antes de commitear:**
- [ ] Componentes tienen una única responsabilidad
- [ ] Lógica de negocio está separada de UI
- [ ] No hay código duplicado
- [ ] Nombres descriptivos y consistentes
- [ ] Props tienen interfaces tipadas
- [ ] Componentes son reutilizables
- [ ] No hay lógica compleja en JSX
- [ ] Estilos están organizados
- [ ] Performance optimizada (memo, useCallback cuando necesario)
- [ ] Componentes son testables

## Ejemplos de Refactoring

### Antes: Componente Complejo

```tsx
// ❌ Mal: Todo junto
const WorkoutScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/workouts')
      .then(res => res.json())
      .then(setWorkouts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = workouts.filter(w => w.name.includes(filter));

  return (
    <View>
      <TextInput value={filter} onChangeText={setFilter} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filtered}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};
```

### Después: Componentes Limpios

```tsx
// ✅ Bien: Separado en responsabilidades

// hooks/useWorkouts.ts
export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    workoutService.getAll()
      .then(setWorkouts)
      .finally(() => setLoading(false));
  }, []);

  return { workouts, loading };
};

// hooks/useFilter.ts
export const useFilter = <T,>(items: T[], filterFn: (item: T, query: string) => boolean) => {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => items.filter(item => filterFn(item, query)),
    [items, query, filterFn]
  );

  return { query, setQuery, filtered };
};

// components/SearchBar.tsx
export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => (
  <TextInput
    style={styles.searchBar}
    value={value}
    onChangeText={onChangeText}
    placeholder="Buscar..."
  />
);

// components/WorkoutList.tsx
export const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, loading }) => {
  if (loading) return <LoadingSpinner />;

  return (
    <FlatList
      data={workouts}
      renderItem={({ item }) => <WorkoutItem workout={item} />}
      keyExtractor={item => item.id}
    />
  );
};

// screens/WorkoutsScreen.tsx
export const WorkoutsScreen: React.FC = () => {
  const { workouts, loading } = useWorkouts();
  const { query, setQuery, filtered } = useFilter(
    workouts,
    (workout, q) => workout.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} />
      <WorkoutList workouts={filtered} loading={loading} />
    </View>
  );
};
```

## Recursos Adicionales

- **Atomic Design:** Organización de componentes en átomos, moléculas, organismos
- **Container/Presentational Pattern:** Separar lógica de presentación
- **Custom Hooks:** Reutilizar lógica con estado
- **Composition:** Preferir composición sobre props complejas
