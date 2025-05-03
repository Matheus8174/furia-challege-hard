import React from 'react';

import { Pressable, TouchableOpacityProps, View } from 'react-native';
import { router } from 'expo-router';

import Text from '@/components/ui/text';
import { Feather } from '@expo/vector-icons';
import { black } from '@/components/ui/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing
} from 'react-native-reanimated';
import Button from '@/components/ui/button';

function ConfirmPhoto(props: React.PropsWithChildren<TouchableOpacityProps>) {
  const { children, ...rest } = props;

  const YoffSet = useSharedValue(0);

  const styles = useAnimatedStyle(() => ({
    transform: [{ translateY: YoffSet.value }]
  }));

  React.useEffect(() => {
    YoffSet.value = withRepeat(
      withTiming(20, { easing: Easing.ease, duration: 500 }),
      -1,
      true
    );
  }, [YoffSet]);

  return (
    <View className="flex-1 items-center justify-center gap-10">
      <Pressable
        className="absolute top-0 left-0 size-full bg-black-400/80"
        onTouchStart={router.back}
      />

      <Animated.View className="m-8 items-center gap-4" style={styles}>
        {children}
      </Animated.View>

      <Button
        className="bg-white-300 flex-row gap-4 justify-center items-center"
        {...rest}
      >
        <Feather name="camera" size={20} color={black[400]} />
        <Text className="text-black-400 font-semibold">Tirar Foto</Text>
      </Button>
    </View>
  );
}

export default ConfirmPhoto;
