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
  return (
    <VStack space="lg">
      <FormControl isRequired isInvalid={!!errors.name}>
        <FormControlLabel>
          <FormControlLabelText>Nome da Turma</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Ex: 1º Ano A"
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

      <FormControl isRequired isInvalid={!!errors.shift}>
        <FormControlLabel>
          <FormControlLabelText>Turno</FormControlLabelText>
        </FormControlLabel>
        <Select selectedValue={shift} onValueChange={(value) => onChangeShift(value as Shift)}>
          <SelectTrigger variant="outline" size="lg">
            <SelectInput placeholder="Selecione o turno" />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
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

      <FormControl isRequired isInvalid={!!errors.schoolYear}>
        <FormControlLabel>
          <FormControlLabelText>Ano Letivo</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="2025"
            value={schoolYear}
            onChangeText={onChangeSchoolYear}
            onBlur={onBlurSchoolYear}
            keyboardType="number-pad"
          />
        </Input>
        {errors.schoolYear && (
          <FormControlError>
            <FormControlErrorText>{errors.schoolYear}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {showSchoolSelector && (
        <FormControl isRequired isInvalid={!!errors.schoolId}>
          <FormControlLabel>
            <FormControlLabelText>Escola</FormControlLabelText>
          </FormControlLabel>
          <Select selectedValue={schoolId} onValueChange={onChangeSchoolId}>
            <SelectTrigger variant="outline" size="lg">
              <SelectInput placeholder="Selecione a escola" />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
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
      )}
    </VStack>
  );
}
