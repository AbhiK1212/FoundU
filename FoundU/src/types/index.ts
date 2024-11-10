// src/types/index.ts
export interface CardDetails {
    name: string;
    imageUri: string;
    status: 'KEPT' | 'LEFT' | 'OTHER';
    location?: {
      latitude: number;
      longitude: number;
      description: string;
    };
    keeperEmail?: string;
    otherDescription?: string;
  }
  
  export interface ProcessedImage {
    name: string;
    confidence: number;
  }