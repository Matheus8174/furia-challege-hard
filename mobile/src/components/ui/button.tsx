import React from 'react';

import { cn } from '@/utils/cn';
import type { PropsWithChildren } from 'react';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export type ButtonRef = {
  disable: (d: boolean) => void;
};

const Button = React.forwardRef<
  ButtonRef,
  PropsWithChildren<TouchableOpacityProps>
>(({ children, className, disabled, ...rest }, forwardRef) => {
  const [disable, setDisable] = React.useState(disabled);

  React.useImperativeHandle(forwardRef, () => ({
    disable: (d: boolean) => setDisable(d)
  }));

  return (
    <TouchableOpacity
      disabled={disable}
      activeOpacity={0.7}
      className={cn(
        'rounded-xl items-center justify-center p-5 bg-black-200 disabled:opacity-75',
        className
      )}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
});

export default Button;
