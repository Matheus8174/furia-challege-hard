import Button from '@/components/ui/button';
import { black } from '@/components/ui/colors';
import Text from '@/components/ui/text';
import { ValidateDataSchema } from '@/schemas/createUserSchema';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { Camera, useCameraDevice } from 'react-native-vision-camera';

function GetFacePhoto() {
  const { setValue, getValues } = useFormContext<ValidateDataSchema>();

  const device = useCameraDevice('back');

  const [activeCam, setActiveCam] = React.useState(true);

  const cameraRef = React.useRef<Camera>(null);

  async function handleTakeSnapsoot() {
    // const photo = await cameraRef.current?.takeSnapshot();

    // if (!photo) return;

    setActiveCam(false);

    const data = [
      'rgPhoto',
      '/data/user/0/com.matheus8174.furiahubmobile/cache/mrousavy6080206416510243607.jpg'
    ];

    const rgPhoto = getValues('rgPhoto');

    setValue('rgPhoto', [...rgPhoto, data[1]]);

    router.replace('/(register)/documents-validation');
  }

  if (!device) return null;

  return (
    <View className="flex-1">
      <Camera
        ref={cameraRef}
        video={true}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={activeCam}
      />

      <Button
        onPress={handleTakeSnapsoot}
        className="absolute z-50 flex-row gap-2 items-center self-center bg-white-200 bottom-20"
      >
        <Feather name="camera" size={20} color={black[400]} />

        <Text className="text-black-400">Tirar Foto do RG</Text>
      </Button>
    </View>
  );
}

export default GetFacePhoto;
