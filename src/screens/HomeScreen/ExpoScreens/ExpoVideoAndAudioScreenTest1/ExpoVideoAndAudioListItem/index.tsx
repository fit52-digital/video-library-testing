import React from 'react';

import ExpoAudioPlayerListItem from '../../ExpoAudioScreenTest1/ExpoAudioPlayerListItem';
import ExpoVideoStandalonePlayer from '../../ExpoVideoScreenTest2/ExpoVideoStandalonePlayer';

interface IExpoAVTestListItemProps {
  audioSource: string | number;
  videoSource: string | number;
  isPlaying: boolean;
  index: number;
}

const ExpoVideoAndAudioItem: React.FC<IExpoAVTestListItemProps> = props => {
  const {audioSource, videoSource, isPlaying, index} = props;
  return (
    <>
      <ExpoAudioPlayerListItem
        source={audioSource}
        index={index}
        isPlaying={isPlaying}
      />
      <ExpoVideoStandalonePlayer isPlaying={isPlaying} source={videoSource} />
    </>
  );
};

export default ExpoVideoAndAudioItem;
