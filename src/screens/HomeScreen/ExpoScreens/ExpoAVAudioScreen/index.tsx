import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Video, ResizeMode} from 'expo-av';
import testVideoAssets from '../../../../../videoAssets/testAssets';

import MediaPlayerControls from '../../../../components/MediaPlayerControls';

const ExpoAVAudioScreen: React.FC = () => {
  const [playerCount, onPlayerCountChange] = useState<number>(3);

  const videoRefs = useRef<(Video | null)[]>(Array(playerCount).fill(null));
  const [sourceIndex, setSourceIndex] = useState<number>(1);
  const [sourceOrigin, setSourceOrigin] = useState<'local' | 'remote'>('local');
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const previousSource = () => {
    // index must be between 1 and 10
    if (sourceIndex === 1) {
      setSourceIndex(10);
    } else {
      setSourceIndex(sourceIndex - 1);
    }
  };

  const nextSource = () => {
    // index must be between 1 and 10
    if (sourceIndex === 10) {
      setSourceIndex(1);
    } else {
      setSourceIndex(sourceIndex + 1);
    }
  };

  const playerCountIncrease = () => {
    const newCount = Math.min(playerCount + 1, 100);
    onPlayerCountChange(newCount);
  };

  const playerCountDecrease = () => {
    const newCount = Math.max(playerCount - 1, 1);
    onPlayerCountChange(newCount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>expo-av (Audio)</Text>
        </View>

        <MediaPlayerControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          nextSource={nextSource}
          previousSource={previousSource}
          toggleLabel={sourceOrigin}
          toggleValue={sourceOrigin === 'local'}
          onToggle={() =>
            setSourceOrigin(sourceOrigin === 'local' ? 'remote' : 'local')
          }
          onPlayerIncrease={playerCountIncrease}
          onPlayerDecrease={playerCountDecrease}
          playerCount={playerCount}
        />

        {Array.from({length: playerCount}).map((_, index) => (
          <Video
            key={index}
            ref={el => (videoRefs.current[index] = el)}
            style={styles.video}
            source={testVideoAssets[sourceIndex][sourceOrigin]}
            useNativeControls={false}
            isMuted={true}
            shouldPlay={isPlaying}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onError={error =>
              console.log(`ERROR: Video player ${index + 1}`, error)
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpoAVAudioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#f2f2f7',
  },
  headerTitle: {
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
    marginBottom: 10,
  },
});
