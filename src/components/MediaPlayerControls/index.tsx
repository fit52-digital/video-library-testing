import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Switch, Text} from 'react-native';

import PauseIcon from '../icons/PauseIcon';
import PlayIcon from '../icons/PlayIcon';
import SkipIcon from '../icons/SkipIcon';

interface IMediaPlayerControls {
  isPlaying: boolean;
  togglePlay: () => void;
  previousSource: () => void;
  nextSource: () => void;
  toggleValue?: boolean;
  toggleLabel?: string;
  onToggle?: () => void;

  onPlayerIncrease?: () => void;
  onPlayerDecrease?: () => void;
  playerCount?: number;
}

const MediaPlayerControls: React.FC<IMediaPlayerControls> = props => {
  const {
    isPlaying,
    togglePlay,
    previousSource,
    nextSource,
    toggleValue,
    toggleLabel,
    onToggle,
    playerCount,
    onPlayerIncrease,
    onPlayerDecrease,
  } = props;

  const [skipCount, setSkipCount] = useState(0);

  const increaseSkipCount = () => {
    setSkipCount(prev => prev + 1);
  };

  return (
    <View style={styles.playerWrapper}>
      <View style={styles.playerSettings}>
        {onToggle && (
          <View style={styles.sourceToggle}>
            <Switch onValueChange={onToggle} value={toggleValue} />
            <Text style={styles.sourceLabel}>{toggleLabel}</Text>
          </View>
        )}

        {onPlayerIncrease && onPlayerDecrease && (
          <View style={styles.playerCountWrapper}>
            <Text style={styles.sourceLabel}>{`video players`}</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                onPress={onPlayerDecrease}
                style={styles.counterButton}>
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{playerCount}</Text>
              <TouchableOpacity
                onPress={onPlayerIncrease}
                style={styles.counterButton}>
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.skipCounterContainer}>
          <TouchableOpacity
            onPress={() => setSkipCount(0)}
            style={styles.resetButtonContainer}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <Text style={styles.sourceLabel}>
            skips: <Text style={styles.boldLabel}>{skipCount}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.playerControls}>
        <TouchableOpacity
          onPress={() => {
            previousSource?.();
            increaseSkipCount();
          }}>
          <SkipIcon
            height={24}
            width={24}
            color="#000"
            style={{transform: [{rotateY: '180deg'}]}}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlay} style={styles.playPauseButton}>
          {isPlaying ? (
            <PauseIcon height={24} width={24} color="#000" />
          ) : (
            <PlayIcon height={24} width={24} color="#000" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            nextSource?.();
            increaseSkipCount();
          }}>
          <SkipIcon height={24} width={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MediaPlayerControls;

const styles = StyleSheet.create({
  playerWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  playerSettings: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  playerControls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  playPauseButton: {
    marginHorizontal: 20,
  },
  sourceToggle: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  playerCountWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  sourceLabel: {
    fontSize: 14,
    color: '#000',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 2,
  },
  counterButton: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },
  counterText: {
    fontSize: 18,
    color: '#000',
  },
  counterValue: {
    fontSize: 16,
    color: '#000',
    width: 40,
    textAlign: 'center',
  },
  skipCounterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  resetButtonContainer: {
    backgroundColor: '#ddd',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  resetButtonText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  boldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
