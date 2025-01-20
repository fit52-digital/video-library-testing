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
  playAudioTrack,
} from '../../../../services/audioPlayer';
import {
  setupVideoPlayer,
  multiLoadTracks,
} from '../../../../services/videoAudioPlayer';

const ExpoAudioScreenTest2: React.FC = () => {
  useEffect(() => {
    setupAudioPlayer();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>expo-audio</Text>
        </View>

        <Button
          title="Load queue"
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
          title="Play"
          onPress={() => {
            playAudioTrack();
          }}
        />
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
  headerTitle: {
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
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
