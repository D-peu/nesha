import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type NoticeProps = {
  text: string;
  tone?: 'warning' | 'error';
  icon?: keyof typeof Ionicons.glyphMap;
};

export function Notice({ text, tone = 'warning', icon }: NoticeProps) {
  const isError = tone === 'error';
  const fg = isError ? colors.error : colors.warningText;

  return (
    <View
      style={[
        styles.box,
        {
          backgroundColor: isError ? colors.errorSoft : colors.warningSoft,
          borderColor: isError ? colors.errorBorder : colors.warningBorder,
        },
      ]}
    >
      {!!icon && (
        <Ionicons
          name={icon}
          size={16}
          color={isError ? colors.error : colors.warningIcon}
        />
      )}
      <Text style={[styles.text, { color: fg }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
  },
});
