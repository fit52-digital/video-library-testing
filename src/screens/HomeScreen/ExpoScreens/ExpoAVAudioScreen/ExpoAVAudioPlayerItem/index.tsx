import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Audio, AVPlaybackSource} from 'expo-av';

const convertIncomingUriToSource = (uri: string | number): AVPlaybackSource => {
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

const ExpoAVAudioPlayerItem: React.FC<IExpoAudioPlayerItemProps> = props => {
  const {source, isPlaying = false, index} = props;
  const [soundPlayer, setSoundPlayer] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    let mounted = true;
    let currentSound: Audio.Sound | null = null;

    const loadSound = async () => {
      try {
        if (soundPlayer) {
          await soundPlayer.unloadAsync();
          setSoundPlayer(null);
        }

        const {sound} = await Audio.Sound.createAsync(
          convertIncomingUriToSource(source),
        );

        if (mounted) {
          currentSound = sound;
          setSoundPlayer(sound);
        }
      } catch (error) {
        console.warn('[ExpoAVAudioPlayerItem] Error loading sound:', error);
      }
    };

    loadSound();

    return () => {
      mounted = false;
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  useEffect(() => {
    if (!soundPlayer) {
      return;
    }
    let isCancelled = false;

    const controlPlayback = async () => {
      try {
        if (isPlaying) {
          await soundPlayer.playAsync();
        } else {
          await soundPlayer.pauseAsync();
        }
      } catch (error) {
        if (!isCancelled) {
          console.warn('[ExpoAVAudioPlayerItem] Playback error:', error);
        }
      }
    };

    controlPlayback();

    return () => {
      isCancelled = true;
    };
  }, [soundPlayer, isPlaying]);

  useEffect(() => {
    return () => {
      if (soundPlayer) {
        soundPlayer.unloadAsync();
      }
    };
  }, [soundPlayer]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`Audio player (${index + 1})`}</Text>
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
