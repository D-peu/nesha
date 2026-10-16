import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../theme/colors';

type AvatarProps = {
  nome: string;
  size?: number;
  uri?: string;
};

// Sem foto, mostra as iniciais. Passe `uri` quando houver foto de perfil.
export function Avatar({ nome, size = 40, uri }: AvatarProps) {
  const iniciais = nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');

  const base = { width: size, height: size, borderRadius: size / 2 };

  if (uri) {
    return <Image source={{ uri }} style={base} contentFit="cover" />;
  }

  return (
    <View style={[styles.fallback, base]}>
      <Text style={[styles.text, { fontSize: size * 0.38 }]}>{iniciais}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    color: colors.primary,
  },
});
