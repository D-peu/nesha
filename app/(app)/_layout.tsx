import { Redirect, Stack } from 'expo-router';
import { PULAR_LOGIN } from '../../src/config/dev';
import { useAuth } from '../../src/contexts/AuthContext';

// Telas protegidas. Sem sessão, volta para o login.
export default function AppLayout() {
  const { usuario, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!usuario && !PULAR_LOGIN) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
