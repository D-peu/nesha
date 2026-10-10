import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { colors } from '../../src/theme/colors';

// Telas públicas (login/cadastro). Quem já está logado vai direto para a home.
export default function AuthLayout() {
  const { usuario, loading } = useAuth();

  if (!loading && usuario) {
    return <Redirect href="/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    />
  );
}
