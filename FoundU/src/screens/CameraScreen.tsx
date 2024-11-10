// src/screens/CameraScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Button, Text } from '@rneui/themed';
import { VisionService } from '../services/VisionService';

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const processImage = async (uri: string) => {
    try {
      setIsProcessing(true);
      const visionService = new VisionService();
      const result = await visionService.processImage(uri);

      if (result.confidence > 0.8) {
        navigation.navigate('NameConfirmation', {
          detectedName: result.name,
          imageUri: uri,
        });
      } else {
        Alert.alert(
          'Low Confidence Detection',
          'Would you like to enter the name manually?',
          [
            {
              text: 'Enter Manually',
              onPress: () => navigation.navigate('NameConfirmation', {
                detectedName: '',
                imageUri: uri,
              }),
            },
            {
              text: 'Try Again',
              style: 'cancel',
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Could not process the image. Please try again or enter the name manually.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        await processImage(photo.uri);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      await processImage(result.assets[0].uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button
          title="Pick from Gallery"
          onPress={pickImage}
          containerStyle={styles.button}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
      >
        <View style={styles.buttonContainer}>
          {isProcessing ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <>
              <Button
                title="Take Photo"
                onPress={takePicture}
                containerStyle={styles.button}
              />
              <Button
                title="Choose from Gallery"
                onPress={pickImage}
                containerStyle={styles.button}
              />
            </>
          )}
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});