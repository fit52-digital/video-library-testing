import React from 'react';

import {Svg, Path, SvgProps} from 'react-native-svg';

const PlayIcon: React.FC<SvgProps> = props => {
  const {
    width = '100%',
    height = '100%',
    color = 'black',
    ...restProps
  } = props;

  return (
    <Svg height={height} width={width} viewBox="0 0 15 15" {...restProps}>
      <Path
        d="M13.846 8.382L1.97 14.716A1 1 0 01.5 13.833V1.167A1 1 0 011.97.284l11.876 6.334a1 1 0 010 1.764z"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  );
};

export default PlayIcon;
