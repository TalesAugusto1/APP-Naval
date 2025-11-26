import {
  VStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  Icon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Shift, School } from '@/types';

const SHIFT_LABELS = {
  [Shift.MORNING]: 'Manhã',
  [Shift.AFTERNOON]: 'Tarde',
  [Shift.EVENING]: 'Noite',
};

interface ClassFormFieldsProps {
  name: string;
  shift: Shift;
  schoolYear: string;
  schoolId: string;
  schools: School[];
  errors: { name?: string; shift?: string; schoolYear?: string; schoolId?: string };
  onChangeName: (text: string) => void;
  onChangeShift: (shift: Shift) => void;
  onChangeSchoolYear: (year: string) => void;
  onChangeSchoolId: (id: string) => void;
  onBlurName: () => void;
  onBlurSchoolYear: () => void;
  showSchoolSelector?: boolean;
}

export function ClassFormFields({
  name,
  shift,
  schoolYear,
  schoolId,
  schools,
  errors,
  onChangeName,
  onChangeShift,
  onChangeSchoolYear,
  onChangeSchoolId,
  onBlurName,
  onBlurSchoolYear,
  showSchoolSelector = false,
}: ClassFormFieldsProps) {
  const colors = useThemeColors();

  return (
    <VStack space="lg">
      {/* School Field - Always First */}
      <FormControl isRequired isInvalid={!!errors.schoolId}>
        <FormControlLabel>
          <FormControlLabelText fontWeight="$medium" color={colors.textColor}>
            Escola
          </FormControlLabelText>
        </FormControlLabel>
        <Select
          selectedValue={schoolId}
          onValueChange={onChangeSchoolId}
          accessible={true}
          accessibilityLabel="Escola da turma"
          accessibilityHint="Selecione a escola para vincular esta turma"
        >
          <SelectTrigger
            variant="outline"
            size="lg"
            borderRadius="$xl"
            borderColor={errors.schoolId ? '$error500' : '$gray200'}
            bg={colors.surfaceBg}
          >
            <SelectInput placeholder="Selecione uma escola" />
            <SelectIcon mr="$3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {schools.map((school) => (
                <SelectItem key={school.id} label={school.name} value={school.id} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
        {errors.schoolId && (
          <FormControlError>
            <FormControlErrorText>{errors.schoolId}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Class Name Field */}
      <FormControl isRequired isInvalid={!!errors.name}>
        <FormControlLabel>
          <FormControlLabelText fontWeight="$medium" color={colors.textColor}>
            Nome da Turma
          </FormControlLabelText>
        </FormControlLabel>
        <Input
          borderRadius="$xl"
          borderWidth={1}
          borderColor={errors.name ? '$error500' : '$gray200'}
          bg="$backgroundLight50"
        >
          <InputField
            placeholder="Ex: 7º Ano C"
            value={name}
            onChangeText={onChangeName}
            onBlur={onBlurName}
            accessible={true}
            accessibilityLabel="Nome da turma"
            accessibilityHint="Digite o nome da turma"
          />
        </Input>
        {errors.name && (
          <FormControlError>
            <FormControlErrorText>{errors.name}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Shift Field */}
      <FormControl isRequired isInvalid={!!errors.shift}>
        <FormControlLabel>
          <FormControlLabelText fontWeight="$medium" color={colors.textColor}>
            Turno
          </FormControlLabelText>
        </FormControlLabel>
        <Select
          selectedValue={shift}
          onValueChange={(value) => onChangeShift(value as Shift)}
          accessible={true}
          accessibilityLabel="Turno da turma"
          accessibilityHint="Selecione o turno: manhã, tarde ou noite"
        >
          <SelectTrigger
            variant="outline"
            size="lg"
            borderRadius="$xl"
            borderColor={errors.shift ? '$error500' : '$gray200'}
            bg={colors.surfaceBg}
          >
            <SelectInput placeholder="Selecione o turno" />
            <SelectIcon mr="$3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label={SHIFT_LABELS[Shift.MORNING]} value={Shift.MORNING} />
              <SelectItem label={SHIFT_LABELS[Shift.AFTERNOON]} value={Shift.AFTERNOON} />
              <SelectItem label={SHIFT_LABELS[Shift.EVENING]} value={Shift.EVENING} />
            </SelectContent>
          </SelectPortal>
        </Select>
        {errors.shift && (
          <FormControlError>
            <FormControlErrorText>{errors.shift}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* School Year Field */}
      <FormControl isRequired isInvalid={!!errors.schoolYear}>
        <FormControlLabel>
          <FormControlLabelText fontWeight="$medium" color={colors.textColor}>
            Ano Letivo
          </FormControlLabelText>
        </FormControlLabel>
        <Input
          borderRadius="$xl"
          borderWidth={1}
          borderColor={errors.schoolYear ? '$error500' : '$gray200'}
          bg="$backgroundLight50"
        >
          <InputField
            placeholder="2025"
            value={schoolYear}
            onChangeText={onChangeSchoolYear}
            onBlur={onBlurSchoolYear}
            keyboardType="number-pad"
            accessible={true}
            accessibilityLabel="Ano letivo"
            accessibilityHint="Digite o ano letivo da turma"
          />
        </Input>
        {errors.schoolYear && (
          <FormControlError>
            <FormControlErrorText>{errors.schoolYear}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </VStack>
  );
}
