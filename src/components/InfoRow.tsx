import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

// Linha "ícone + texto" usada nos cards de agendamento.
export function IconLine({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <View style={styles.iconLine}>
      <Ionicons name={icon} size={14} color={colors.textMuted} />
      <Text style={styles.iconLineText}>{text}</Text>
    </View>
  );
}

// Linha "rótulo à esquerda, valor à direita" do resumo do serviço.
export function SummaryRow({
  label,
  value,
  stacked,
  bold,
}: {
  label: string;
  value: string;
  stacked?: boolean; // valor abaixo do rótulo (endereço, observações)
  bold?: boolean;
}) {
  if (stacked) {
    return (
      <View style={styles.stacked}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, styles.valueLeft, bold && styles.bold]}>
          {value}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, bold && styles.bold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  iconLineText: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 5,
  },
  stacked: {
    paddingVertical: 5,
  },
  label: {
    fontSize: 12,
    color: colors.textMuted,
  },
  value: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
  valueLeft: {
    textAlign: 'left',
    marginTop: 2,
  },
  bold: {
    fontWeight: '800',
  },
});
