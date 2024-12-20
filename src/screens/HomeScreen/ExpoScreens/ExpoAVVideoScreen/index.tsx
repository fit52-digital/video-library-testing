import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
import {Video, ResizeMode} from 'expo-av';
import testAssets from '../../../../../assets/testAssets';

const VIDEO_COUNT = 3;

const ExpoAVVideoScreen: React.FC = () => {
  const videoRefs = useRef<(Video | null)[]>(Array(VIDEO_COUNT).fill(null));
  const [sourceIndex, setSourceIndex] = useState<number>(1);
  const [sourceOrigin, setSourceOrigin] = useState<'local' | 'remote'>('local');

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const previousSource = () => {
    // index has to be between 1 and 10
    const currentSourceIndex = sourceIndex;

    if (currentSourceIndex === 1) {
      setSourceIndex(10);
    } else {
      setSourceIndex(currentSourceIndex - 1);
    }
  };

  const nextSource = () => {
    // index has to be between 1 and 10
    const currentSourceIndex = sourceIndex;

    if (currentSourceIndex === 10) {
      setSourceIndex(1);
    } else {
      setSourceIndex(currentSourceIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Expo-AV (Video)</Text>
        </View>

        <Button title="Prev" onPress={previousSource} />
        <Button title="Toggle Play" onPress={togglePlay} />
        <Button title="Next" onPress={nextSource} />

        {Array.from({length: VIDEO_COUNT}).map((_, index) => {
          return (
            <Video
              key={index}
              ref={el => (videoRefs.current[index] = el)}
              style={styles.video}
              source={testAssets[sourceIndex][sourceOrigin]}
              useNativeControls={false}
              isMuted={true}
              shouldPlay={isPlaying}
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onError={error =>
                console.log(`ERROR: Video player ${index + 1}`, error)
              }
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpoAVVideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
    marginBottom: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#f2f2f7',
  },
  headerTitle: {
    fontSize: 34,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
