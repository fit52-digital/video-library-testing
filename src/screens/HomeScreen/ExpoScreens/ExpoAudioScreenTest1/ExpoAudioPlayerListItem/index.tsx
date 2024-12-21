import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useAudioPlayer} from 'expo-audio';

const convertIncomingUriToSource = (uri: string | number): AVPlaybackSource => {
  // Bundled files may be imported as a numeric resource, e.g., require('path/to/file')
  if (typeof uri === 'number') {
    return uri;
  }
  return {uri};
};

interface IExpoAudioPlayerItemProps {
  source: string | number;
  isPlaying?: boolean;
  index: number;
}

const ExpoAudioPlayerListItem: React.FC<IExpoAudioPlayerItemProps> = props => {
  const {source, isPlaying = false, index} = props;

  const audioPlayer = useAudioPlayer(null);

  useEffect(() => {
    if (audioPlayer) {
      if (!isPlaying) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
    }
  }, [isPlaying, audioPlayer]);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.replace(source);
    }
  }, [source, audioPlayer]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`Audio player (${index + 1})`}</Text>
      <Text style={styles.status}>{isPlaying ? 'Playing' : 'Paused'}</Text>
    </View>
  );
};

export default ExpoAudioPlayerListItem;

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
