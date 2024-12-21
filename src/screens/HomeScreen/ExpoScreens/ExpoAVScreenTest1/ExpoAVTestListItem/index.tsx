import React from 'react';
import {StyleSheet} from 'react-native';
import {Video, ResizeMode, AVPlaybackSource} from 'expo-av';

import ExpoAVAudioPlayerItem from '../../ExpoAVAudioScreen/ExpoAVAudioPlayerItem';

interface IExpoAVTestListItemProps {
  audioSource: string | number;
  videoSource: string | number;
  isPlaying: boolean;
  index: number;
}

const ExpoAVTestListItem: React.FC<IExpoAVTestListItemProps> = props => {
  const {audioSource, videoSource, isPlaying, index} = props;
  return (
    <>
      <ExpoAVAudioPlayerItem
        source={audioSource}
        index={index}
        isPlaying={isPlaying}
      />
      <Video
        style={styles.video}
        source={videoSource as AVPlaybackSource}
        useNativeControls={false}
        isMuted={true}
        shouldPlay={isPlaying}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </>
  );
};

export default ExpoAVTestListItem;

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
    marginBottom: 10,
  },
});
