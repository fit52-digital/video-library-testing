import React from 'react';

import {Svg, Rect, Path, SvgProps} from 'react-native-svg';

const PauseIcon: React.FC<SvgProps> = props => {
  const {
    width = '100%',
    height = '100%',
    color = 'white',
    ...restProps
  } = props;

  return (
    <Svg
      enable-background={'new 0 0 566.93 566.93'}
      viewBox={'0 0 566.93 566.93'}
      height={height}
      width={width}
      {...restProps}>
      <Path
        fill={color}
        d={
          'm283.5 49.3c31.7 0 62.3 6.2 91.2 18.4 27.9 11.8 53 28.7 74.5 50.2s38.4 46.6 50.2 74.5c12.2 28.9 18.4 59.6 18.4 91.2s-6.2 62.3-18.4 91.2c-11.8 27.9-28.7 53-50.2 74.5s-46.6 38.4-74.5 50.2c-28.9 12.2-59.6 18.4-91.2 18.4s-62.3-6.2-91.2-18.4c-27.9-11.8-53-28.7-74.5-50.2s-38.4-46.6-50.2-74.5c-12.2-28.9-18.4-59.6-18.4-91.2s6.2-62.3 18.4-91.2c11.8-27.9 28.7-53 50.2-74.5s46.6-38.4 74.5-50.2c28.9-12.2 59.5-18.4 91.2-18.4m0-35c-148.8 0-269.3 120.6-269.3 269.3s120.5 269.4 269.3 269.4 269.3-120.6 269.3-269.3-120.5-269.4-269.3-269.4z'
        }
      />
      <Rect
        fill={color}
        x={'206.8'}
        y={'202.2'}
        width={'44'}
        height={'173.6'}
      />
      <Rect
        fill={color}
        x={'313.7'}
        y={'202.2'}
        width={'44'}
        height={'173.6'}
      />
    </Svg>
  );
};

export default PauseIcon;
