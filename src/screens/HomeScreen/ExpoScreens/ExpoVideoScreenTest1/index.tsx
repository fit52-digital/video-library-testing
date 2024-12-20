import {useEvent} from 'expo';
import {useVideoPlayer, VideoView} from 'expo-video';

import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import testAssets from '../../../../../assets/testAssets';

import MediaPlayerControls from '../../../../components/MediaPlayerControls';

const ExpoVideoScreenTest1: React.FC = () => {
  const [playerCount, onPlayerCountChange] = useState<number>(3);

  const [sourceIndex, setSourceIndex] = useState<number>(1);
  const [sourceOrigin, setSourceOrigin] = useState<'local' | 'remote'>('local');

  const videoPlayer = useVideoPlayer(
    testAssets[sourceIndex][sourceOrigin],
    player => {
      player.loop = true;
      player.muted = true;
      player.play();
    },
  );

  const {isPlaying} = useEvent(videoPlayer, 'playingChange', {
    isPlaying: videoPlayer?.playing,
  });

  const togglePlay = () => {
    if (isPlaying) {
      videoPlayer?.pause();
    } else {
      videoPlayer?.play();
    }
  };

  const previousSource = () => {
    // index must be between 1 and 10
    if (sourceIndex === 1) {
      setSourceIndex(10);
    } else {
      setSourceIndex(sourceIndex - 1);
    }

    const source = testAssets[sourceIndex][sourceOrigin];
    videoPlayer?.replace(source);
  };

  const nextSource = () => {
    // index must be between 1 and 10
    if (sourceIndex === 10) {
      setSourceIndex(1);
    } else {
      setSourceIndex(sourceIndex + 1);
    }

    const source = testAssets[sourceIndex][sourceOrigin];
    videoPlayer?.replace(source);
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
          <Text style={styles.headerTitle}>expo-video</Text>
          <Text style={styles.subTitle}>single player, multiple views</Text>
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
          <VideoView key={index} style={styles.video} player={videoPlayer} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpoVideoScreenTest1;

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
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
    marginBottom: 10,
  },
});
