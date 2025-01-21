import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';

import testAudioAssets from '../../../../../audioAssets/testAssets';

import {
  multiLoadAudioTrack,
  setupAudioPlayer,
  togglePlayPause as togglePlayPauseAudio,
} from '../../../../services/audioPlayer';

import {
  setupVideoPlayer,
  multiLoadTracks,
  togglePlayPause as togglePlayPauseVideo,
} from '../../../../services/videoAudioPlayer';

const ExpoAudioScreenTest2: React.FC = () => {
  useEffect(() => {
    setupAudioPlayer();
    setupVideoPlayer();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Queue player</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>expo-audio queue player</Text>

          <Button
            title="Load & play queue"
            onPress={async () => {
              await multiLoadAudioTrack([
                testAudioAssets['1'].local,
                testAudioAssets['2'].local,
                testAudioAssets['3'].local,
                testAudioAssets['4'].local,
              ]);
            }}
          />

          <Button
            title="Play/pause"
            onPress={async () => {
              await togglePlayPauseAudio();
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>expo-video queue player</Text>

          <Button
            title="Load & play queue"
            onPress={async () => {
              await multiLoadTracks([
                testAudioAssets['1'].local,
                testAudioAssets['2'].local,
                testAudioAssets['3'].local,
                testAudioAssets['4'].local,
              ]);
            }}
          />

          <Button
            title="Play/pause"
            onPress={async () => {
              await togglePlayPauseVideo();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpoAudioScreenTest2;

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
  section: {
    flexDirection: 'column',
    gap: 12,
    padding: 12,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
    marginBottom: 10,
  },
});
