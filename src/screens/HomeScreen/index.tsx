import React, {Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const expoComponents = [
    {
      title: 'expo-av (video)',
      subtitle: 'multiple video player instances',
      description: `Stress test the expo-av (video) by launching multiple simultaneous video players to quickly induce crashes or unresponsiveness for benchmarking.\n\nCreate over 20 instances and cycle through available tracks; if the app remains responsive, add more players until it becomes unresponsive.`,
      onPress: () => {
        navigation.navigate('ExpoAVVideo' as never);
      },
    },
    {
      title: 'expo-av (audio)',
      subtitle: 'multiple audio player instances',
      onPress: () => {
        navigation.navigate('ExpoAVAudio' as never);
      },
    },
    {
      title: 'expo-av',
      subtitle: 'audio and video player paired together',
      description: `Stress test the expo-av library together, by launching multiple simultaneous audio & video players to quickly induce crashes or unresponsiveness for benchmarking.\n\nCreate multiple instances and cycle through available tracks; if the app remains responsive, add more players until it becomes unresponsive.`,
      onPress: () => {
        navigation.navigate('ExpoAVTest1' as never);
      },
    },
    {
      title: 'expo-video',
      subtitle: 'single player, multiple views',
      description: `Stress test for the **expo-video** library using a single shared video player across multiple parallel views, comparing the separated player/view approach to the combined model.\n\nTests show a 4–5× increase in instances without significant impact.\n\nHowever, on Android only one view can play at once, whereas iOS supports multiple simultaneous views, suggesting a potential bug or limitation in the split player/view approach.`,
      onPress: () => {
        navigation.navigate('ExpoVideoTest1' as never);
      },
    },
    {
      title: 'expo-video',
      subtitle: 'multiple players, multiple views',
      description: `Stress test of the expo-video library’s combined player/view approach, benchmarking it directly against the deprecated expo-av component. The test assesses whether expo-video offers significant performance improvements.\n\nTesting shows that expo-video handles high instance loads markedly better than expo-av, demonstrating a welcomed enhancement.`,
      onPress: () => {
        navigation.navigate('ExpoVideoTest2' as never);
      },
    },
    {
      title: 'expo-audio',
      subtitle: 'multiple audio player instances',
      onPress: () => {
        navigation.navigate('ExpoAudioTest1' as never);
      },
    },
    {
      title: 'expo-video & expo-audio',
      subtitle: 'video and audio player paired together',
      description: `Stress test the latest expo-video and expo-audio libraries using their combined player/view approaches, benchmarking them against the deprecated expo-av components.\n\nThe test evaluates whether expo-video and expo-audio offer significant performance improvements. Results show that expo-video handles high instance loads markedly better than expo-av, demonstrating a welcomed enhancement.`,
      onPress: () => {
        navigation.navigate('ExpoVideoAndAudioTest1' as never);
      },
    },
  ];

  const reactNativeVideoComponents = [
    {
      title: 'react-native-video (v6)',
      subtitle: 'multiple video player instances',
      description: `Stress test react-native-video (v6) launching multiple simultaneous video players to quickly induce crashes or unresponsiveness for benchmarking.\n\nCreate over 20 instances and cycle through available tracks; if the app remains responsive, add more players until it becomes unresponsive.`,
      onPress: () => {
        navigation.navigate('ReactNativeVideo' as never);
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Expo</Text>
        </View>

        <View style={styles.section}>
          {expoComponents.map((item, index) => {
            return (
              <Fragment key={item.title + item.subtitle}>
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={item.onPress}>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.subtitle && (
                      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    )}
                    {item.description && (
                      <Text style={styles.bodyText}>{item.description}</Text>
                    )}
                  </View>
                </TouchableOpacity>
                {index === expoComponents.length && (
                  <View style={styles.separator} />
                )}
              </Fragment>
            );
          })}
        </View>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>React Native Video</Text>
        </View>

        <View style={styles.section}>
          {reactNativeVideoComponents.map((item, index) => {
            return (
              <Fragment key={item.title}>
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={item.onPress}>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.subtitle && (
                      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    )}
                    {item.description && (
                      <Text style={styles.bodyText}>{item.description}</Text>
                    )}
                  </View>
                </TouchableOpacity>
                {index === reactNativeVideoComponents.length && (
                  <View style={styles.separator} />
                )}
              </Fragment>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 12,
    color: '#333',
  },
  searchBox: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  searchPlaceholder: {
    color: '#8e8e93',
    fontSize: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  profileDetails: {
    color: '#8e8e93',
    fontSize: 14,
    marginTop: 2,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemContent: {
    flexDirection: 'column',
  },
  itemTitle: {
    color: '#007aff',
    fontSize: 16,
  },
  itemSubtitle: {
    color: '#8e8e93',
    fontSize: 16,
    marginTop: 2,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#c7c7cc',
    marginLeft: 20,
  },
});
