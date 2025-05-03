import { View } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import Text from '@/components/ui/text';
import ConfirmPhoto from '@/components/confirm-photo';
import colors from '@/components/ui/colors';
import { router } from 'expo-router';

function ConfirmPhotoFace() {
  const goToCamera = () =>
    router.push('/(register)/documents-validation/get-face-photo');

  return (
    <ConfirmPhoto onPress={goToCamera}>
      <FontAwesome5 name="glasses" size={80} color={colors.white[100]} />

      <View className="gap-2 items-center">
        <Text className="text-white-300 text-lg text-center">
          Tire boné e óculos e vá para um{' '}
        </Text>
        <Text className="text-lg font-semibold">local claro</Text>
      </View>
    </ConfirmPhoto>
  );
}

export default ConfirmPhotoFace;
