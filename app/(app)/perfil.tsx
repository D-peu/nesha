import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../../src/components/Avatar';
import { BottomNav } from '../../src/components/BottomNav';
import { Button } from '../../src/components/Button';
import { useAuth } from '../../src/contexts/AuthContext';
import { colors } from '../../src/theme/colors';

// Tela provisória de perfil: por enquanto só mostra o usuário e permite sair.
export default function Perfil() {
  const { usuario, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.content}>
        <Avatar nome={usuario?.nome ?? '?'} size={72} />
        <Text style={styles.name}>{usuario?.nome}</Text>
        <Text style={styles.email}>{usuario?.email}</Text>

        <Button
          title="Sair"
          variant="outline"
          style={styles.logout}
          onPress={signOut}
        />
      </View>

      <BottomNav active="perfil" />
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
  },
  email: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
  },
  logout: {
    alignSelf: 'stretch',
    marginTop: 32,
  },
});
