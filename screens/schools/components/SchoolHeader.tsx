import { Heading, HStack, Pressable } from '@gluestack-ui/themed';
import { School } from '@/types';
import { useThemeColors } from '@/hooks/useThemeColors';
import { navigateToEditSchool, goBack } from '@/navigation';
import { ArrowLeft, Edit } from 'lucide-react-native';
import { useProtectedAction } from '@/hooks/useProtectedAction';

interface SchoolHeaderProps {
  school: School;
}

export function SchoolHeader({ school }: SchoolHeaderProps) {
  const colors = useThemeColors();
  const handleEdit = useProtectedAction(async () => {
    navigateToEditSchool(school.id);
  });

  return (
    <HStack alignItems="center" space="md" mb="$4">
      <Pressable
        onPress={goBack}
        w={40}
        h={40}
        alignItems="center"
        justifyContent="center"
        borderRadius="$xl"
        style={({ pressed }) => ({
          opacity: pressed ? 0.6 : 1,
          backgroundColor: pressed ? colors.pressedBg : 'transparent',
        })}
      >
        <ArrowLeft size={20} color={colors.iconPrimary} />
      </Pressable>
      <Heading size="lg" color={colors.textColor} flex={1}>
        {school.name}
      </Heading>
      <Pressable
        onPress={handleEdit}
        w={40}
        h={40}
        alignItems="center"
        justifyContent="center"
        borderRadius="$xl"
        style={({ pressed }) => ({
          opacity: pressed ? 0.6 : 1,
          backgroundColor: pressed ? colors.pressedBg : 'transparent',
        })}
      >
        <Edit size={20} color={colors.iconPrimary} />
      </Pressable>
    </HStack>
  );
}
