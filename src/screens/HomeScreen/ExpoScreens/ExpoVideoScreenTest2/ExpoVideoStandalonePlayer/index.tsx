import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Easing} from 'react-native';
import {useVideoPlayer, VideoView, VideoSource} from 'expo-video';

interface IExpoVideoStandalonePlayerProps {
  source: VideoSource;
  isPlaying?: boolean;
  videoSize?: 'small' | 'large';
}

const ExpoVideoStandalonePlayer: React.FC<IExpoVideoStandalonePlayerProps> = ({
  source,
  isPlaying = false,
  videoSize = 'large',
}) => {
  const videoPlayer = useVideoPlayer(source, player => {
    // Configure the video player
    player.loop = true;
    player.muted = true;
    player.play();
  });

  const flipAnim = useRef(
    new Animated.Value(videoSize === 'large' ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: videoSize === 'large' ? 1 : 0,
      duration: 800, // Slower flip
      easing: Easing.ease, // Smooth easing
      useNativeDriver: true, // Use native driver for transforms
    }).start();
  }, [videoSize, flipAnim]);

  const rotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const scale = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
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

  // Replace video if source changes
  useEffect(() => {
    if (videoPlayer) {
      videoPlayer.replace(source);
    }
  }, [source, videoPlayer]);

  const animatedStyle = {
    transform: [
      {perspective: 1000}, // Helps with 3D flip
      {rotateY},
      {scale},
    ],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <VideoView style={styles.video} player={videoPlayer} />
    </Animated.View>
  );
};

export default ExpoVideoStandalonePlayer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: 300,
  },
});
