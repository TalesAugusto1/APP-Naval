import {
  VStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
} from '@gluestack-ui/themed';

interface SchoolFormFieldsProps {
  name: string;
  address: string;
  errors: { name?: string; address?: string };
  onChangeName: (value: string) => void;
  onChangeAddress: (value: string) => void;
  onBlurName: () => void;
  onBlurAddress: () => void;
}

export function SchoolFormFields({
  name,
  address,
  errors,
  onChangeName,
  onChangeAddress,
  onBlurName,
  onBlurAddress,
}: SchoolFormFieldsProps) {
  return (
    <VStack space="lg">
      <FormControl isInvalid={!!errors.name} isRequired>
        <FormControlLabel>
          <FormControlLabelText>Nome da Escola</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Ex: Escola Municipal José de Alencar"
            value={name}
            onChangeText={onChangeName}
            onBlur={onBlurName}
          />
        </Input>
        {errors.name && (
          <FormControlError>
            <FormControlErrorText>{errors.name}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.address} isRequired>
        <FormControlLabel>
          <FormControlLabelText>Endereço</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Ex: Rua das Flores, 123 - Centro"
            value={address}
            onChangeText={onChangeAddress}
            onBlur={onBlurAddress}
            multiline
            numberOfLines={2}
          />
        </Input>
        {errors.address && (
          <FormControlError>
            <FormControlErrorText>{errors.address}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </VStack>
  );
}
