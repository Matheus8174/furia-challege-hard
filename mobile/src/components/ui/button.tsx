import type { PropsWithChildren } from 'react';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { twMerge } from 'tailwind-merge';

function Button({
  children,
  className,
  ...rest
}: PropsWithChildren<TouchableOpacityProps>) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={twMerge(
        'rounded-xl items-center justify-center p-5 bg-black-200',
        className
      )}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

export default Button;
