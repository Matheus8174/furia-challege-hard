import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';
import { cssInterop } from 'nativewind';

import colors from '../colors';

function email({ color = colors['gray'][100], ...rest }: SvgProps) {
  return (
    <Svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      pointerEvents="none"
      {...rest}
    >
      <Path
        d="M16.6648 15.08H3.33513C2.05081 15.08 1 14.0039 1 12.6663V3.41371C1 2.08617 2.04108 1 3.33513 1H16.6648C17.9492 1 19 2.07611 19 3.41371V12.6663C19 14.0039 17.9589 15.08 16.6648 15.08Z"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.9976 1.77405L11.3133 8.63302C10.5641 9.40742 9.43542 9.40742 8.6765 8.63302L1.99219 1.77405"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.0723 7.95935L17.9977 13.9031"
        stroke="#C2C3CB"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.00195 13.9034L7.99546 8.04004"
        stroke="#C2C3CB"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export const Email = cssInterop(email, {
  className: {
    target: 'style'
  }
});
