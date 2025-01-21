import {useVideoPlayer} from 'expo-video';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface IExpoAudioPlayerItemProps {
  source: string | number;
  isPlaying?: boolean;
  index: number;
}

const ExpoVideoPlayerListItem: React.FC<IExpoAudioPlayerItemProps> = props => {
  const {source, isPlaying = false, index} = props;

  const videoPlayer = useVideoPlayer(null, player => {
    player.audioMixingMode = 'duckOthers';
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`Audio player (${index + 1})`}</Text>
      <Text style={styles.status}>{isPlaying ? 'Playing' : 'Paused'}</Text>
    </View>
  );
};

export default ExpoVideoPlayerListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
});
