import { Button, ButtonText, ButtonSpinner } from '@gluestack-ui/themed';

interface AuthButtonProps {
  text: string;
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: 'solid' | 'outline';
  accessibilityLabel: string;
  accessibilityHint?: string;
}

export function AuthButton({
  text,
  onPress,
  isLoading = false,
  isDisabled = false,
  variant = 'solid',
  accessibilityLabel,
  accessibilityHint,
}: AuthButtonProps) {
  return (
    <Button
      size="lg"
      variant={variant}
      action="primary"
      onPress={onPress}
      isDisabled={isDisabled || isLoading}
      bg={variant === 'solid' ? '$primary500' : 'transparent'}
      $hover-bg={variant === 'solid' ? '$primary600' : '$gray50'}
      borderRadius="$lg"
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      style={{
        shadowColor: variant === 'solid' ? '#000' : undefined,
        shadowOffset: variant === 'solid' ? { width: 0, height: 2 } : undefined,
        shadowOpacity: variant === 'solid' ? 0.1 : undefined,
        shadowRadius: variant === 'solid' ? 4 : undefined,
        elevation: variant === 'solid' ? 2 : undefined,
      }}
    >
      {isLoading ? <ButtonSpinner mr="$2" /> : null}
      <ButtonText fontWeight="$bold">{text}</ButtonText>
    </Button>
  );
}
