import {createVideoPlayer, VideoPlayer, VideoSource} from 'expo-video';

let videoPlayerObject: VideoPlayer | null = null;

const convertIncomingUriToSource = (uri: string | number): VideoSource => {
  // Bundled files will have their uri resolve to a number id
  if (typeof uri === 'number') {
    return uri;
  }

  const isRemoteFile = /^https?:\/\//.test(uri);

  return {uri: `${isRemoteFile ? '' : 'file:///'}${uri}`};
};

const setupVideoPlayer = async () => {
  if (videoPlayerObject) {
    console.log('setupVideoPlayer: Video player object already exists.');
    return;
  }

  console.log('Initializing video player...');

  try {
    videoPlayerObject = createVideoPlayer(null);
  } catch (error) {
    console.log('Error initializing video player', error);
  }
};

const loadAndPlayTrack = async (uri: string | number): Promise<void> => {
  const source = convertIncomingUriToSource(uri);

  if (!videoPlayerObject) {
    return;
  }

  try {
    videoPlayerObject.replace(source);

    videoPlayerObject.play();

    return new Promise(resolve => {
      const playToEndSubscriptionDisposer = videoPlayerObject?.addListener(
        'playToEnd',
        () => {
          console.log('Video has ended', source);

          playToEndSubscriptionDisposer?.remove();
          resolve();
        },
      );
    });
  } catch (err: any) {}
};

// Plays multiple tracks sequentially.
const multiLoadTracks = async (
  trackUrls: (string | number)[],
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

        return loadAndPlayTrack(url);
      },
      Promise.resolve(),
    );
  } catch (err) {
    console.log('An error occurred while playing the tracks:', err);
  }
};

const togglePlayPause = async (): Promise<void> => {
  if (!videoPlayerObject) {
    return;
  }

  try {
    if (videoPlayerObject.playing) {
      videoPlayerObject.pause();

      return;
    }

    videoPlayerObject.play();
  } catch (err) {
    console.log('An error occurred while toggling play/pause:', err);
  }
};

export {setupVideoPlayer, multiLoadTracks, togglePlayPause};
