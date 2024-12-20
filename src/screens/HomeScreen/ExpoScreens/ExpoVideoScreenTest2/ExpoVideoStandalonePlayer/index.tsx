import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {useVideoPlayer, VideoView, VideoSource} from 'expo-video';

interface IExpoVideoStandalonePlayerProps {
  source: VideoSource;
  isPlaying?: boolean;
}

const ExpoVideoStandalonePlayer: React.FC<
  IExpoVideoStandalonePlayerProps
> = props => {
  const {source, isPlaying = false} = props;

  const videoPlayer = useVideoPlayer(source, player => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  useEffect(() => {
    if (videoPlayer) {
      if (!isPlaying) {
        videoPlayer.pause();
      } else {
        videoPlayer.play();
      }
    }
  }, [isPlaying, videoPlayer]);

  useEffect(() => {
    if (videoPlayer) {
      videoPlayer.replace(source);
    }
  }, [source, videoPlayer]);

  return <VideoView style={styles.video} player={videoPlayer} />;
};

export default ExpoVideoStandalonePlayer;

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
    marginBottom: 10,
  },
});
