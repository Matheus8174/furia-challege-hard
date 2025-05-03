import { StyleSheet, View } from 'react-native';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor
} from 'react-native-vision-camera';

import { useTensorflowModel } from 'react-native-fast-tflite';

import { useResizePlugin } from 'vision-camera-resize-plugin';
import { router } from 'expo-router';
import { Worklets } from 'react-native-worklets-core';
import React from 'react';
import { ValidateDataSchema } from '@/schemas/createUserSchema';
import { useFormContext } from 'react-hook-form';

const threshold = 0.2;

function GetFacePhoto() {
  const { setValue } = useFormContext<ValidateDataSchema>();

  const { hasPermission, requestPermission } = useCameraPermission();

  const device = useCameraDevice('front');

  const cameraRef = React.useRef<Camera>(null);

  const [activeCam, setActiveCam] = React.useState(true);

  const { resize } = useResizePlugin();

  const handleFaceDetection = Worklets.createRunOnJS(() => setActiveCam(false));

  if (!hasPermission) requestPermission();

  const { model } = useTensorflowModel(
    require('../../../assets/MediaPipeFaceDetector.tflite')
  );

  React.useEffect(() => {
    if (activeCam) return;

    cameraRef.current?.takeSnapshot().then((photo) => {
      if (!photo) return;

      setValue('facePhoto', photo.path);

      router.replace('/(register)/documents-validation');
    });
  }, [activeCam, setValue]);

  const frameProcessor = useFrameProcessor(
    async (frame) => {
      'worklet';

      if (!model) return;

      const resized = resize(frame, {
        scale: {
          width: 256,
          height: 256
        },
        pixelFormat: 'rgb',
        dataType: 'float32'
      });

      const outputs = model.runSync([resized]);

      const boxScores = outputs[1];

      for (const score of boxScores) {
        if (score > threshold) {
          handleFaceDetection();
        }
      }
    },
    [model]
  );

  return (
    <View className="flex-1 bg-black-200">
      {device && (
        <Camera
          video={true}
          device={device}
          torch="off"
          ref={cameraRef}
          frameProcessor={frameProcessor}
          isActive={activeCam}
          style={StyleSheet.absoluteFill}
        />
      )}
    </View>
  );
}

export default GetFacePhoto;
