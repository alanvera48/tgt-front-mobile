---
name: React Native Components
description: Guía para crear componentes React Native con TypeScript y mejores prácticas
trigger: component, screen, react, native, view
license: MIT
author: The Good Trainer Team
version: 1.0.0
scope: root
auto_invoke: ["component", "screen", "react-native"]
tools: ["read", "write", "bash"]
---

# React Native Components Skill

## Principios
1. Componentes funcionales con TypeScript
2. Props tipadas con interfaces
3. Uso de hooks para estado y efectos
4. Estilos modularizados con StyleSheet
5. Responsividad y accesibilidad

## Estructura de Componente

```tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
  isActive?: boolean;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onPress,
  isActive = false
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onPress && (
        <TouchableOpacity
          style={[styles.button, isActive && styles.buttonActive]}
          onPress={onPress}
        >
          <Text>Action</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonActive: {
    backgroundColor: '#0051D5',
  },
});
```

## Patrones a Seguir

✅ **Usar componentes funcionales con TypeScript**
```tsx
export const MyComponent: React.FC<Props> = (props) => { ... }
```

✅ **Tipar todas las props con interfaces**
```tsx
interface ComponentProps {
  title: string;
  onPress?: () => void;
}
```

✅ **Usar StyleSheet.create para estilos**
```tsx
const styles = StyleSheet.create({
  container: { padding: 16 }
});
```

✅ **Manejar estados con useState y useEffect**
```tsx
const [isLoading, setIsLoading] = useState(false);
useEffect(() => { ... }, [dependencies]);
```

✅ **Implementar memoización cuando sea necesario**
```tsx
const MemoizedComponent = React.memo(MyComponent);
```

✅ **Usar SafeAreaView para áreas seguras**
```tsx
import { SafeAreaView } from 'react-native-safe-area-context';
<SafeAreaView style={styles.container}>...</SafeAreaView>
```

## Patrones a Evitar

❌ **No usar componentes de clase**
```tsx
// Evitar
class MyComponent extends React.Component { ... }
```

❌ **No usar any para tipos**
```tsx
// Evitar
const handlePress = (data: any) => { ... }
```

❌ **No usar estilos inline sin StyleSheet**
```tsx
// Evitar (excepto para estilos dinámicos simples)
<View style={{ padding: 16, margin: 8 }}>
```

❌ **No olvidar el Key en listas**
```tsx
// Evitar
items.map(item => <Item />)
// Correcto
items.map(item => <Item key={item.id} />)
```

## Estructura de Screens

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'ScreenName'>;

export const MyScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data or initialize
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

## Hooks Personalizados

```tsx
import { useState, useEffect } from 'react';

export const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
```

## Navegación

```tsx
// Definir tipos de navegación
export type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
  Profile: { userId: string };
};

// Usar navegación tipada
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
navigation.navigate('Details', { id: '123' });
```

## Gestión de Estado

```tsx
// Con useState para estado local
const [count, setCount] = useState(0);

// Con useReducer para estado complejo
const [state, dispatch] = useReducer(reducer, initialState);

// Con Context para estado compartido
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

## Ejemplos

### Correcto: Componente con Props Tipadas

```tsx
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
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
```

### Incorrecto: Props sin tipar

```tsx
// ❌ Evitar
export const Button = ({ title, onPress, variant }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
```

## Performance

✅ **Usar React.memo para prevenir re-renders**
```tsx
export const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});
```

✅ **Usar useCallback para callbacks**
```tsx
const handlePress = useCallback(() => {
  // Handle press
}, [dependencies]);
```

✅ **Usar useMemo para cálculos costosos**
```tsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

## Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';

describe('MyComponent', () => {
  it('should render correctly', () => {
    const { getByText } = render(<MyComponent title="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('should handle press', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <MyComponent title="Test" onPress={onPress} />
    );
    fireEvent.press(getByText('Test'));
    expect(onPress).toHaveBeenCalled();
  });
});
```
