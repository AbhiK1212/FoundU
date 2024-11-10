// src/services/VisionService.ts
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { ProcessedImage } from '../types';

export class VisionService {
  private client: ImageAnnotatorClient;

  constructor() {
    this.client = new ImageAnnotatorClient({
      credentials: {
        client_email: process.env.GOOGLE_CLOUD_EMAIL,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
      },
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });
  }

  async processImage(imageUri: string): Promise<ProcessedImage> {
    try {
      // Convert image URI to buffer
      const response = await fetch(imageUri);
      const buffer = await response.arrayBuffer();

      // Process with Vision API
      const [result] = await this.client.textDetection(
        Buffer.from(buffer)
      );

      if (!result.textAnnotations?.length) {
        throw new Error('No text detected in image');
      }

      const text = result.textAnnotations[0].description;
      const name = this.extractName(text);

      return {
        name,
        confidence: result.textAnnotations[0].confidence || 0,
      };
    } catch (error) {
      console.error('Vision API Error:', error);
      throw error;
    }
  }

  private extractName(text: string): string {
    const lines = text.split('\n');
    
    // UCard specific name patterns
    const namePatterns = [
      /^[A-Z][a-z]+ [A-Z][a-z]+$/, // Basic name format
      /^[A-Z][a-z]+ [A-Z][a-z]+-[A-Z][a-z]+$/, // Hyphenated last names
      /^[A-Z][a-z]+ [A-Z]\. [A-Z][a-z]+$/, // With middle initial
    ];

    for (const line of lines) {
      const trimmedLine = line.trim();
      for (const pattern of namePatterns) {
        if (pattern.test(trimmedLine)) {
          return trimmedLine;
        }
      }
    }

    throw new Error('No valid name found in image');
  }
}