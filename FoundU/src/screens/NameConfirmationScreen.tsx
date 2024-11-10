// src/screens/NameConfirmationScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, Image } from 'react-native';
import { Button, Text } from '@rneui/themed';

export const NameConfirmationScreen = ({ route, navigation }) => {
  const { detectedName, imageUri } = route.params;
  const [name, setName] = useState(detectedName);
  const [isEditing, setIsEditing] = useState(!detectedName);

  const validateName = (name: string) => {
    // Basic name validation
    const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+(?:-[A-Z][a-z]+)?$/;
    return namePattern.test(name);
  };

  const handleConfirm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    if (!validateName(name)) {
      Alert.alert(
        'Invalid Name Format',
        'Please enter a valid name format (e.g., "John Smith" or "John Smith-Jones")',
        [
          {
            text: 'Edit',
            style: 'cancel',
          },
          {
            text: 'Continue Anyway',
            onPress: () => proceedToNextScreen(),
          },
        ]
      );
      return;
    }

    proceedToNextScreen();
  };

  const proceedToNextScreen = () => {
    navigation.navigate('ActionSelection', {
      name: name.trim(),
      imageUri,
    });
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Confirm Name on UCard</Text>
      
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter name (e.g., John Smith)"
            autoCapitalize="words"
            autoCorrect={false}
          />
        ) : (
          <View style={styles.nameDisplay}>
            <Text style={styles.nameText}>{name}</Text>
            <Button
              title="Edit"
              type="clear"
              onPress={() => setIsEditing(true)}
            />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Confirm"
          onPress={handleConfirm}
          containerStyle={styles.button}
          buttonStyle={styles.primaryButton}
        />
        <Button
          title="Cancel"
          type="outline"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#881c1c',
  },
  imageContainer: {
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  nameDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  nameText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    width: '45%',
  },
  primaryButton: {
    backgroundColor: '#881c1c',
  },
});