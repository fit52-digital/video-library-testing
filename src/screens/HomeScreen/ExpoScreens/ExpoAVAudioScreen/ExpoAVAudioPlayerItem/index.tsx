import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useExpoAVAudioTracks from '../../../../../hooks/useExpoAVAudioTracks';

interface IExpoAudioPlayerItemProps {
  source: (string | number)[];
  isPlaying?: boolean;
  index: number;
}

const ExpoAVAudioPlayerItem: React.FC<IExpoAudioPlayerItemProps> = props => {
  const {source, isPlaying = false, index} = props;

  useExpoAVAudioTracks(source);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`Audio player (${index})`}</Text>
      <Text style={styles.status}>{isPlaying ? 'Playing' : 'Paused'}</Text>
    </View>
  );
};

export default ExpoAVAudioPlayerItem;

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
