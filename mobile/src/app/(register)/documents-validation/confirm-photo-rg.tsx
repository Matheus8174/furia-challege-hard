import { View } from 'react-native';

import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFormContext } from 'react-hook-form';

import Text from '@/components/ui/text';
import colors from '@/components/ui/colors';
import ConfirmPhoto from '@/components/confirm-photo';
import { ValidateDataSchema } from '@/schemas/createUserSchema';

function ConfirmPhotoRg() {
  const { getValues } = useFormContext<ValidateDataSchema>();

  const rgPhoto = getValues('rgPhoto');

  const message = rgPhoto.length >= 1 ? 'parte de trás' : 'parte da frente';

  const goToCamera = () =>
    router.push('/(register)/documents-validation/get-document-photo');

  return (
    <ConfirmPhoto onPress={goToCamera}>
      <FontAwesome5 name="user-circle" size={80} color={colors.white[300]} />

      <View className="items-center justify-center flex-row flex-wrap">
        <Text className="text-white-300 text-lg text-center">
          Tire uma foto da{' '}
        </Text>
        <Text className="text-lg font-semibold">{message}</Text>
        <Text className="text-white-300 text-lg text-center">
          do seu documento
        </Text>
      </View>
    </ConfirmPhoto>
  );
}

export default ConfirmPhotoRg;
