import { cssInterop } from 'nativewind';
import { Path, Svg, SvgProps } from 'react-native-svg';
import colors from '../colors';

function user({ color = colors['gray'][100], ...rest }: SvgProps) {
  return (
    <Svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      pointerEvents="none"
      {...rest}
    >
      <Path
        d="M9.6801 8.81333C11.8377 8.81333 13.5868 7.06426 13.5868 4.90667C13.5868 2.74907 11.8377 1 9.6801 1C7.52251 1 5.77344 2.74907 5.77344 4.90667C5.77344 7.06426 7.52251 8.81333 9.6801 8.81333Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.78711 19.6668V17.4402C1.78711 14.8402 3.89378 12.7468 6.48045 12.7468H13.5071C16.1071 12.7468 18.2004 14.8535 18.2004 17.4402V19.6668"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
export const User = cssInterop(user, {
  className: {
    target: 'style'
  }
});
