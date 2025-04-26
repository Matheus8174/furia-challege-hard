import { Text as NNText, TextProps } from 'react-native';

import { twMerge } from 'tailwind-merge';

function Text({ className, children, ...rest }: TextProps) {
  return (
    <NNText
      className={twMerge('text-base font-medium text-white-100', className)}
      {...rest}
    >
      {children}
    </NNText>
  );
}

export default Text;
