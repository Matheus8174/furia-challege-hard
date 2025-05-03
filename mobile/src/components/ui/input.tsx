import React, { ForwardedRef, MutableRefObject } from 'react';

import {
  Path,
  Control,
  FieldValues,
  useController,
  RegisterOptions
} from 'react-hook-form';
import {
  TextInputProps,
  View,
  TextInput as NTextInput,
  TouchableOpacity
} from 'react-native';

import { tv } from 'tailwind-variants';
import { SvgProps } from 'react-native-svg';

import colors from './colors';
import { Feather } from '@expo/vector-icons';
import Text from './text';
import { cn } from '@/utils/cn';

const inputTv = tv({
  slots: {
    label: 'text-white-200 mb-2 font-regular',
    input: 'grow items-center h-20 text-white-100 text-lg',
    container:
      'gap-4 flex-row border border-transparent bg-black-200 rounded-xl overflow-hidden'
  },
  variants: {
    focused: {
      true: {
        container: 'border-white-100'
      }
    }
  }
});

export interface InputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  password?: boolean;
  error?: string;
  Icon?: React.ElementType<SvgProps>;
}

type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

interface ControlledInputProps<T extends FieldValues>
  extends InputProps,
    InputControllerType<T> {
  formatter?: (value: string) => string;
}

export const Input = React.forwardRef<NTextInput, InputProps>(
  (props, forwardedRef) => {
    const { label, error, testID, Icon, className, password, ...inputProps } =
      props;

    const [isFocussed, setIsFocussed] = React.useState(false);

    const [showInputContent, setShowInputContent] = React.useState(true);

    const togglePassword = () => setShowInputContent((prev) => !prev);

    const iconColor = isFocussed ? colors.white[100] : colors.gray[300];

    const onBlur = React.useCallback(() => setIsFocussed(false), []);
    const onFocus = React.useCallback(() => setIsFocussed(true), []);

    const styles = inputTv({
      focused: isFocussed
    });

    return (
      <View className="">
        {label && <Text className={styles.label()}>{label}</Text>}
        <View className={styles.container()}>
          {Icon && (
            <Icon
              color={iconColor}
              width={25}
              height={25}
              className="absolute z-20 ml-5 top-1/2 -translate-y-1/2"
            />
          )}
          <NTextInput
            testID={testID}
            ref={forwardedRef}
            underlineColorAndroid="transparent"
            placeholderTextColor={colors.gray[100]}
            className={styles.input({
              className: cn(className, {
                '!pl-[60px]': Icon,
                'px-8': !Icon
              })
            })}
            onBlur={onBlur}
            onFocus={onFocus}
            autoCapitalize="none"
            secureTextEntry={password && showInputContent}
            {...inputProps}
          />

          {password && (
            <TouchableOpacity
              activeOpacity={0.7}
              className="self-center mr-4"
              onPress={togglePassword}
            >
              {showInputContent ? (
                <Feather name="eye-off" color={iconColor} size={22} />
              ) : (
                <Feather name="eye" color={iconColor} size={22} />
              )}
            </TouchableOpacity>
          )}
        </View>

        <Text className="absolute bottom-0 translate-y-full pt-[2px] text-sm font-normal text-red-400/90">
          {error}
        </Text>
      </View>
    );
  }
);

export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, formatter, ...inputProps } = props;

  const { field, fieldState } = useController({
    control,
    name,
    rules
  });

  const onChangeText = formatter
    ? (text: string) => field.onChange(formatter(text))
    : field.onChange;

  return (
    <Input
      ref={field.ref}
      onChangeText={onChangeText}
      value={field?.value}
      error={fieldState.error?.message}
      {...inputProps}
    />
  );
}
