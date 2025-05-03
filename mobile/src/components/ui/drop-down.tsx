import React from 'react';

import { Feather } from '@expo/vector-icons';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  RotateInDownLeft,
  RotateOutDownLeft
} from 'react-native-reanimated';
import colors from './colors';
import { View } from 'react-native';
import Text from './text';

const IconAnimated = Animated.createAnimatedComponent(Feather);

type DropdownProps = {
  onChange: (...event: any[]) => void;
  data: string[] | readonly [...string[]];
  children: React.ReactNode;
};

const Divider = () => <View className="h-[1px] w-full bg-black-200" />;

function Item(props: React.PropsWithChildren<TouchableOpacityProps>) {
  const { children, ...rest } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="justify-center p-4"
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

function Dropdown({ children, data, onChange }: DropdownProps) {
  const [showPicker, setShowPicker] = React.useState(false);

  const togglePicker = () => setShowPicker((prev) => !prev);

  const selected = React.useRef('');

  return (
    <View>
      {showPicker && (
        <View
          className="absolute pb-2 self-end z-20"
          style={{
            transform: [{ translateY: '-100%' }]
          }}
        >
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="gap-1 rounded-lg bg-black-400 p-2"
          >
            {data.map((value, index, arr) => (
              <View key={value}>
                <Item
                  onPress={() => {
                    setShowPicker(false);

                    onChange(value);

                    selected.current = value;
                  }}
                >
                  <Text>{value}</Text>
                </Item>

                {index !== arr.length - 1 ? <Divider /> : null}
              </View>
            ))}
          </Animated.View>
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        className="justify-between items-center rounded-xl py-5 px-8 flex-row bg-black-200"
        onPress={togglePicker}
      >
        <Text className="font-regular text-white-100">
          {selected.current || children}
        </Text>

        {showPicker ? (
          <IconAnimated
            name="chevron-down"
            size={25}
            color={colors.white[100]}
            entering={RotateInDownLeft}
            exiting={RotateOutDownLeft}
          />
        ) : (
          <Animated.View
            entering={RotateInDownLeft}
            exiting={RotateOutDownLeft}
          >
            <Feather name="chevron-up" size={25} color={colors.white[100]} />
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default Dropdown;
