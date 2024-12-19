import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

const ExpoAVVideoScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Expo-AV (Video)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpoAVVideoScreen;

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
    fontSize: 34,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
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
    color: '#000',
    fontSize: 16,
  },
  itemSubtitle: {
    color: '#8e8e93',
    fontSize: 14,
    marginTop: 2,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#c7c7cc',
    marginLeft: 20,
  },
});
