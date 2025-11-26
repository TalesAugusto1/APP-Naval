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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isInvalid={!!error}>
      <FormControlLabel>
        <HStack space="xs" alignItems="center">
          {Icon && <Icon size={16} color="#4b5563" />}
          <FormControlLabelText fontWeight="$semibold" color="$gray900">
            {label}
          </FormControlLabelText>
        </HStack>
      </FormControlLabel>
      <Input
        borderRadius="$lg"
        borderWidth={1}
        borderColor={error ? '$error500' : '$gray100'}
        bg="$white"
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
                <EyeOff size={20} color="#6b7280" />
              ) : (
                <Eye size={20} color="#6b7280" />
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
