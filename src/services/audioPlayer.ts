import {
  AudioPlayer,
  AudioSource,
  createAudioPlayer,
  AudioStatus,
} from 'expo-audio';
import {EventSubscription} from 'expo-modules-core';

let audioPlayerObject: AudioPlayer | null = null;
let subscription: EventSubscription | null = null;

// We'll store the "resolve" function for whichever track is currently playing.
// When playback ends, we call this to finish the promise returned by loadAndPlayAudioTrack.
let resolveCurrentTrack: (() => void) | null = null;

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

    // Attach ONE listener for "playbackStatusUpdate".
    subscription = audioPlayerObject.addListener(
      'playbackStatusUpdate',
      (statusUpdate: AudioStatus) => {
        console.log(
          'playbackStatusUpdate => didJustFinish:',
          statusUpdate.didJustFinish,
          '| playbackState:',
          statusUpdate.playbackState,
        );

        if (statusUpdate.playbackState === 'readyToPlay') {
          audioPlayerObject?.play();
        }

        // If you only want to play once in setup and then remove the listener:
        if (statusUpdate.didJustFinish) {
          resolveCurrentTrack?.();
        }
      },
    );
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
  if (!audioPlayerObject) {
    console.log('loadAndPlayAudioTrack called, but audioPlayerObject is null.');

    return;
  }

  const source = convertIncomingUriToSource(uri);

  if (!source) {
    console.log('loadAndPlayAudioTrack: Invalid source provided.', source);

    return;
  }

  try {
    // Assign the per-track callback so that handlePlaybackStatusUpdate can call it
    // onCurrentTrackEnd = onTrackEndCallback || null;

    // Replace the source
    audioPlayerObject.replace(source);

    // Return a Promise that resolves in handlePlaybackStatusUpdate when didJustFinish = true
    // eslint-disable-next-line consistent-return
    return new Promise<void>(resolve => {
      resolveCurrentTrack = resolve;
      // If an error happens while loading/playing, you can catch it outside or add more logic here
    });
  } catch (error) {
    console.log('loadAndPlayAudioTrack: Error loading or playing track', error);
  }
};

/**
 * Plays multiple audio tracks sequentially (one after the other).
 */
const multiLoadAudioTrack = async (
  trackUrls: (string | number)[],
): Promise<void> => {
  if (!audioPlayerObject) {
    console.log('multiLoadAudioTrack called, but audioPlayerObject is null.');

    return;
  }

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
    console.log(
      'multiLoadAudioTrack: An error occurred while playing multiple tracks:',
      err,
    );
  }
};

/**
 * Resume the currently loaded track (if any).
 */
const playAudioTrack = (): void => {
  if (!audioPlayerObject) {
    console.log('playAudioTrack: No audio player to play from.');

    return;
  }

  try {
    audioPlayerObject.play();
  } catch (err) {
    console.log('playAudioTrack: Error playing audio:', err);
  }
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
};
