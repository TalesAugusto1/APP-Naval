import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
  InputSlot,
  HStack,
  Pressable,
} from '@gluestack-ui/themed';
import { Eye, EyeOff, LucideIcon } from 'lucide-react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

interface AuthInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  icon?: LucideIcon;
  isPassword?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  autoFocus?: boolean;
  accessibilityLabel: string;
  accessibilityHint?: string;
}

export function AuthInput({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
  icon: Icon,
  isPassword = false,
  keyboardType = 'default',
  autoFocus = false,
  accessibilityLabel,
  accessibilityHint,
}: AuthInputProps) {
  const colors = useThemeColors();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isInvalid={!!error}>
      <FormControlLabel>
        <HStack space="xs" alignItems="center">
          {Icon && <Icon size={16} color={colors.iconSecondary} />}
          <FormControlLabelText fontWeight="$semibold" color={colors.textColor}>
            {label}
          </FormControlLabelText>
        </HStack>
      </FormControlLabel>
      <Input
        borderRadius="$lg"
        borderWidth={1}
        borderColor={error ? '$error500' : colors.borderColor}
        bg={colors.cardBg}
      >
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
          autoFocus={autoFocus}
          accessible={true}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
        />
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            <InputSlot pr="$4">
              {showPassword ? (
                <EyeOff size={20} color={colors.iconSecondary} />
              ) : (
                <Eye size={20} color={colors.iconSecondary} />
              )}
            </InputSlot>
          </Pressable>
        )}
      </Input>
      {error && (
        <FormControlError>
          <FormControlErrorText>{error}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
}
