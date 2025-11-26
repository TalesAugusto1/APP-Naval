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
  HStack,
} from '@gluestack-ui/themed';
import { Shift, School } from '@/types';
import { BookOpen, Clock, Calendar, Building } from 'lucide-react-native';

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
    <VStack space="xl">
      <FormControl isRequired isInvalid={!!errors.name}>
        <FormControlLabel>
          <HStack space="xs" alignItems="center">
            <BookOpen size={16} color="#4b5563" />
            <FormControlLabelText fontWeight="$semibold" color="$gray900">
              Nome da Turma
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
          <HStack space="xs" alignItems="center">
            <Clock size={16} color="#4b5563" />
            <FormControlLabelText fontWeight="$semibold" color="$gray900">
              Turno
            </FormControlLabelText>
          </HStack>
        </FormControlLabel>
        <Select selectedValue={shift} onValueChange={(value) => onChangeShift(value as Shift)}>
          <SelectTrigger
            variant="outline"
            size="lg"
            borderRadius="$lg"
            borderColor={errors.shift ? '$error500' : '$gray100'}
            bg="$white"
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

      <FormControl isRequired isInvalid={!!errors.schoolYear}>
        <FormControlLabel>
          <HStack space="xs" alignItems="center">
            <Calendar size={16} color="#4b5563" />
            <FormControlLabelText fontWeight="$semibold" color="$gray900">
              Ano Letivo
            </FormControlLabelText>
          </HStack>
        </FormControlLabel>
        <Input
          borderRadius="$lg"
          borderWidth={1}
          borderColor={errors.schoolYear ? '$error500' : '$gray100'}
          bg="$white"
        >
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
            <HStack space="xs" alignItems="center">
              <Building size={16} color="#4b5563" />
              <FormControlLabelText fontWeight="$semibold" color="$gray900">
                Escola
              </FormControlLabelText>
            </HStack>
          </FormControlLabel>
          <Select selectedValue={schoolId} onValueChange={onChangeSchoolId}>
            <SelectTrigger
              variant="outline"
              size="lg"
              borderRadius="$lg"
              borderColor={errors.schoolId ? '$error500' : '$gray100'}
              bg="$white"
            >
              <SelectInput placeholder="Selecione a escola" />
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
      )}
    </VStack>
  );
}
