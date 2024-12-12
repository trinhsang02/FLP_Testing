import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const NFTCElement = () => {

  return (
    <View style={styles.container}>
        <LinearGradient
          colors={['#6688F2', '#DF6D8B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.innerFrame}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerFrame: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});

export default NFTCElement;
