import {Audio, InterruptionModeAndroid, InterruptionModeIOS} from 'expo-av';

const sound = new Audio.Sound();

type MediaSource = number | {uri: string};

const convertIncomingUriToSource = (uri: string | number): MediaSource => {
  // Bundled files will have their uri resolve to a number id
  if (typeof uri === 'number') {
    return uri;
  }

  return {uri};
};

const setupAudioPlayer = async () => {
  await Audio.setAudioModeAsync({
    staysActiveInBackground: false,
    interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
  });
};

// loadAndPlayAudioTrack returns a promise that resolves once the track has finished playing,
// optionally executing a callback function. The callback triggers when a track finishes playing
const loadAndPlayAudioTrack = async (
  uri: string | number,
  isAudioEnabled: boolean = true,
  onTrackEndCallback?: () => void,
  onLoadErrorCallback?: () => void,
): Promise<void> => {
  const source = convertIncomingUriToSource(uri);

  try {
    await sound.unloadAsync();
    await sound.loadAsync(
      source,
      {
        // Tracks are muted individually
        isMuted: !isAudioEnabled,
        shouldPlay: true,
      },
      // disable Download first, as we want to control the source origin of the file
      false,
    );

    return new Promise(resolve => {
      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (status?.didJustFinish) {
          // Only call unloadAsync after the sound has finished playing.
          sound.unloadAsync().then(() => {
            resolve();
            onTrackEndCallback?.();
          });
        }
      });
    });
  } catch (err: any) {
    console.log(`loadAndPlayAudioTrack(): ${uri}`, err);

    // TODO: Fix the following expo issues. We should not be manually clearing the internal loading state of the sound object.
    // Clear the internal loading state to avoid blocking future audio loads

    sound._loaded = false;

    sound._loading = false;

    onLoadErrorCallback?.();

    return undefined;
  }
};

// Plays multiple audio tracks sequentially.
// Utilizes `reduce` to chain asynchronous loading and playing operations,
// ensuring each track starts after the previous one finishes. This sequential
// promise chaining prevents concurrent playback and maintains the order of tracks.
const multiLoadAudioTrack = async (
  trackUrls: (string | number)[],
  isAudioEnabled: boolean = true,
  onTrackEndCallback?: () => void,
  onLoadErrorCallback?: () => void,
): Promise<void> => {
  try {
    await trackUrls.reduce(
      async (
        previousPromise: Promise<void>,
        url: string | number,
      ): Promise<void> => {
        // Wait for the previous promise to resolve.
        await previousPromise;

        if (!url) {
          return Promise.resolve();
        }

        return loadAndPlayAudioTrack(
          url,
          isAudioEnabled,
          onTrackEndCallback,
          onLoadErrorCallback,
        );
      },
      Promise.resolve(),
    );
  } catch (err) {
    console.log('An error occurred while playing the audio tracks:', err);
  }
};

const playAudioTrack = async (): Promise<void> => {
  try {
    const {isLoaded} = await sound.getStatusAsync();

    if (!isLoaded) {
      return;
    }

    await sound.playAsync();
  } catch (err: any) {
    console.log('Error playing audio:', err);
  }
};

const pauseAudioTrack = async (isUnloading: boolean = false): Promise<void> => {
  if (!sound) {
    return;
  }

  try {
    const {isLoaded} = await sound.getStatusAsync();

    if (!isLoaded) {
      return;
    }

    if (isUnloading) {
      await sound.stopAsync();

      return;
    }

    await sound.pauseAsync();
  } catch (err: any) {
    console.log('Error pausing audio:', err);
  }
};

const discardAudioTrack = async (): Promise<void> => {
  if (!sound) {
    return;
  }

  try {
    await sound.stopAsync();
    await sound.unloadAsync();
  } catch (err: any) {
    console.log('discardAudioTrack()', err);
  }
};

export {
  setupAudioPlayer,
  discardAudioTrack,
  convertIncomingUriToSource,
  pauseAudioTrack,
  playAudioTrack,
  multiLoadAudioTrack,
};

export type {MediaSource};
