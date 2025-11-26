import {
  VStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
  HStack,
} from '@gluestack-ui/themed';
import { Building, MapPin } from 'lucide-react-native';

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
    <VStack space="xl">
      <FormControl isInvalid={!!errors.name} isRequired>
        <FormControlLabel>
          <HStack space="xs" alignItems="center">
            <Building size={16} color="#4b5563" />
            <FormControlLabelText fontWeight="$semibold" color="$gray900">
              Nome da Escola
            </FormControlLabelText>
          </HStack>
        </FormControlLabel>
        <Input
          borderRadius="$lg"
          borderWidth={1}
          borderColor={errors.name ? '$error500' : '$gray100'}
          bg="$white"
        >
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
          <HStack space="xs" alignItems="center">
            <MapPin size={16} color="#4b5563" />
            <FormControlLabelText fontWeight="$semibold" color="$gray900">
              Endereço
            </FormControlLabelText>
          </HStack>
        </FormControlLabel>
        <Input
          borderRadius="$lg"
          borderWidth={1}
          borderColor={errors.address ? '$error500' : '$gray100'}
          bg="$white"
        >
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
