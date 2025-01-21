import {AudioPlayer, AudioSource, createAudioPlayer} from 'expo-audio';
import {EventSubscription} from 'expo-modules-core';

let audioPlayerObject: AudioPlayer | null = null;
let subscription: EventSubscription | null = null;

/**
 * Converts incoming URI to the AudioSource format required by expo-audio.
 */
const convertIncomingUriToSource = (uri: string | number): AudioSource => {
  if (typeof uri === 'number') {
    // Bundled resource
    return uri;
  }

  const isRemoteFile = /^https?:\/\//.test(uri);

  return {uri: `${isRemoteFile ? '' : 'file:///'}${uri}`};
};

/**
 * Creates (if necessary) a single AudioPlayer and sets up our single event listener.
 */
const setupAudioPlayer = (): void => {
  // If we already have an AudioPlayer, don't recreate it.
  if (audioPlayerObject) {
    console.log('setupAudioPlayer: Audio player object already exists.');
    return;
  }

  console.log('Initializing audio player...');

  try {
    audioPlayerObject = createAudioPlayer(null);

    if (!audioPlayerObject) {
      throw new Error('Could not create audio player object');
    }
  } catch (error) {
    console.log('Error initializing audio player', error);
  }
};

/**
 * Cleans up the AudioPlayer and removes the single subscription.
 */
const releaseAudioPlayer = () => {
  if (!audioPlayerObject) {
    return;
  }

  try {
    console.log('Releasing audio player...');
    subscription?.remove();
    subscription = null;

    audioPlayerObject.release();
    audioPlayerObject = null;
  } catch (err) {
    console.log('Error releasing audio player', err);
  }
};

/**
 * loadAndPlayAudioTrack returns a Promise that resolves once the track finishes playback.
 */
const loadAndPlayAudioTrack = async (uri: string | number): Promise<void> => {
  const source = convertIncomingUriToSource(uri);

  if (!audioPlayerObject) {
    return;
  }

  try {
    console.log('replacing and playing track:', source);
    audioPlayerObject.replace(source);

    audioPlayerObject.play();

    return new Promise(resolve => {
      const playToEndSubscriptionDisposer = audioPlayerObject?.addListener(
        'playbackStatusUpdate',
        status => {
          console.log('playbackStatusUpdate:', status);
          if (status.didJustFinish) {
            console.log('Audio has for src', source);

            playToEndSubscriptionDisposer?.remove();
            resolve();
          }
        },
      );
    });
  } catch (err: any) {}
};

/**
 * Plays multiple audio tracks sequentially (one after the other).
 */
const multiLoadAudioTrack = async (
  trackUrls: (string | number)[],
): Promise<void> => {
  console.log('loading and playing tracks:', trackUrls);

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

        return loadAndPlayAudioTrack(url);
      },
      Promise.resolve(),
    );
  } catch (err) {
    console.log('An error occurred while playing the tracks:', err);
  }
};

/**
 * Resume the currently loaded track (if any).
 */
const playAudioTrack = (): void => {
  audioPlayerObject?.play();
};

/**
 * Pause the currently loaded track (if any).
 */
const pauseAudioTrack = (): void => {
  if (!audioPlayerObject) {
    console.log('pauseAudioTrack: No audio player to pause.');

    return;
  }

  try {
    audioPlayerObject.pause();
  } catch (err) {
    console.log('pauseAudioTrack: Error pausing audio:', err);
  }
};

const togglePlayPause = async (): Promise<void> => {
  if (!audioPlayerObject) {
    return;
  }

  try {
    if (audioPlayerObject.playing) {
      audioPlayerObject.pause();

      return;
    }

    audioPlayerObject.play();
  } catch (err) {
    console.log('An error occurred while toggling play/pause:', err);
  }
};

/**
 * Discard the current track, if any.
 */
const discardAudioTrack = (): void => {
  if (!audioPlayerObject) {
    console.log('discardAudioTrack: No audio player to discard from.');

    return;
  }

  try {
    audioPlayerObject.pause();
    audioPlayerObject.replace(null);
  } catch (err) {
    console.log('discardAudioTrack: Error discarding audio track:', err);
  }
};

export {
  setupAudioPlayer,
  releaseAudioPlayer,
  loadAndPlayAudioTrack,
  multiLoadAudioTrack,
  playAudioTrack,
  pauseAudioTrack,
  discardAudioTrack,
  togglePlayPause,
};
