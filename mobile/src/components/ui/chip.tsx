import { PropsWithChildren } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import Text from '@/components/ui/text';
import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import colors from './colors';

interface ChipProps extends TouchableOpacityProps {
  selected?: boolean;
}

function Chip({
  children,
  selected = false,
  ...rest
}: PropsWithChildren<ChipProps>) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn(
        'px-6 py-3 bg-black-600 rounded-full gap-2 flex-row items-center justify-center',
        {
          'bg-white-300': selected
        }
      )}
      {...rest}
    >
      <Text className={selected ? 'text-black-600' : 'text-white-300'}>
        {children}
      </Text>

      {selected && (
        <Feather name="x-circle" color={colors.black[600]} size={20} />
      )}
    </TouchableOpacity>
  );
}

export default Chip;
