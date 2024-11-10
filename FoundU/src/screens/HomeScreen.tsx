// src/screens/HomeScreen.tsx
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text h3 style={styles.title}>
          UCard Finder
        </Text>
        <Text style={styles.subtitle}>
          Help return lost UCards to their owners
        </Text>
        <Button
          title="Found a UCard?"
          onPress={() => navigation.navigate('Camera')}
          raised
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 10,
    color: '#881c1c', // UMass Maroon
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#881c1c',
    paddingVertical: 15,
  },
});