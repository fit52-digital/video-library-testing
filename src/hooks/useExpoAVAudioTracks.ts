import {useEffect} from 'react';
import {multiLoadAudioTrack} from '../services/expo-av-audio';

const useExpoAVAudioTracks = (
  tracks: (string | number)[],
  isAudioEnabled: boolean = true,
): void => {
  useEffect(() => {
    const playAudioPrompt = async () => {
      await multiLoadAudioTrack(tracks, isAudioEnabled);
    };

    playAudioPrompt();
  }, [isAudioEnabled, tracks]);
};

export default useExpoAVAudioTracks;
