// src/services/LocationService.ts
import * as Location from 'expo-location';

export class LocationService {
  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      return false;
    }
  }

  async getCurrentLocation() {
    try {
      const hasPermission = await this.requestPermissions();
      
      if (!hasPermission) {
        throw new Error('Location permission not granted');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  }

  async getLocationDescription(latitude: number, longitude: number) {
    try {
      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const description = [
        address.name,
        address.street,
        address.city,
        'UMass Amherst'
      ]
        .filter(Boolean)
        .join(', ');

      return {
        description,
        fullAddress: address,
      };
    } catch (error) {
      console.error('Error getting location description:', error);
      throw error;
    }
  }
}