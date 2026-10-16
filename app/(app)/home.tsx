import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../../src/components/BottomNav';
import { useAuth } from '../../src/contexts/AuthContext';
import { colors } from '../../src/theme/colors';

// Tela provisória do catálogo. Substituir pela home real.
export default function Home() {
  const { usuario } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>Olá, {usuario?.nome}!</Text>
        <Text style={styles.subtitle}>O catálogo de serviços chega em breve.</Text>
      </View>

      <BottomNav active="catalogo" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
});
