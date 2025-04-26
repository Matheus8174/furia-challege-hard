import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';
import { cssInterop } from 'nativewind';

import colors from '../colors';

function lock({ color = colors['gray'][100], ...rest }: SvgProps) {
  return (
    <Svg
      width="19"
      height="21"
      viewBox="0 0 19 21"
      fill="none"
      pointerEvents="none"
      {...rest}
    >
      <Path
        d="M0.916992 16.9123V12.756C0.916992 10.9435 2.38575 9.46436 4.20866 9.46436H14.8024C16.6149 9.46436 18.0941 10.9331 18.0941 12.756V16.9123C18.0941 18.7248 16.6253 20.2039 14.8024 20.2039H4.20866C2.38575 20.2039 0.916992 18.7352 0.916992 16.9123Z"
        stroke={color}
        stroke-width="1.5625"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4.13574 9.4749V6.29781C4.13574 3.33948 6.54199 0.933228 9.50032 0.933228C12.4587 0.933228 14.8649 3.33948 14.8649 6.29781V9.4749H4.13574Z"
        stroke={color}
        stroke-width="1.5625"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.5 16.9854V14.2979"
        stroke={color}
        stroke-width="1.5625"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.50065 14.8396C10.0932 14.8396 10.5736 14.3592 10.5736 13.7666C10.5736 13.1741 10.0932 12.6937 9.50065 12.6937C8.90809 12.6937 8.42773 13.1741 8.42773 13.7666C8.42773 14.3592 8.90809 14.8396 9.50065 14.8396Z"
        stroke={color}
        stroke-width="1.5625"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export const Lock = cssInterop(lock, {
  className: {
    target: 'style'
  }
});
