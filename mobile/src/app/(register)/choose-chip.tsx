import React from 'react';
import { Pressable, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { useFormContext } from 'react-hook-form';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import colors from '@/components/ui/colors';
import Chip from '@/components/ui/chip';

export type InterestsShape = { name: string; selected: boolean };

type FormShape = {
  [x: string]: InterestsShape[];
};

function ChooseChip() {
  const { setValue, getValues } = useFormContext<FormShape>();

  const { name } = useLocalSearchParams<{ name: string }>();

  const data = getValues(name);

  const snapPoints = React.useMemo(() => ['50%', '90%'], []);

  const handleChipPress = React.useCallback(
    (_name: string) => {
      setValue(
        name,
        data.map(({ name: name, selected }) => ({
          name,
          selected: name === _name ? !selected : selected
        }))
      );
    },
    [name, setValue, data]
  );

  return (
    <View className="flex-1">
      <Pressable
        className="absolute top-0 left-0 size-full"
        onTouchStart={router.back}
      />
      <BottomSheet
        index={0}
        overDragResistanceFactor={0}
        enablePanDownToClose
        snapPoints={snapPoints}
        onClose={router.back}
        backgroundStyle={{ backgroundColor: colors.black[200] }}
      >
        <BottomSheetView className="flex-1 bg-black-200">
          <View className="flex-1 flex-wrap gap-4 flex-row m-4">
            {data.map(({ name, selected }) => (
              <Chip
                key={name}
                selected={selected}
                onPress={() => handleChipPress(name)}
              >
                {name}
              </Chip>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

export default ChooseChip;
