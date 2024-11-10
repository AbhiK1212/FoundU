// src/services/DatabaseService.ts
import mongoose from 'mongoose';
import { CardDetails } from '../types';

// Create the schema
const UCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['KEPT', 'LEFT', 'OTHER'],
    required: true,
  },
  location: {
    latitude: Number,
    longitude: Number,
    description: String,
  },
  keeperEmail: String,
  otherDescription: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  processed: {
    type: Boolean,
    default: false,
  },
});

// Create the model
const UCard = mongoose.model('UCard', UCardSchema);

export class DatabaseService {
  constructor() {
    this.connect();
  }

  private async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  async createUCardRecord(cardData: CardDetails) {
    try {
      const ucard = new UCard(cardData);
      return await ucard.save();
    } catch (error) {
      console.error('Error saving UCard:', error);
      throw error;
    }
  }

  async updateUCardRecord(id: string, updateData: Partial<CardDetails>) {
    try {
      return await UCard.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      console.error('Error updating UCard:', error);
      throw error;
    }
  }

  async getUCardRecord(id: string) {
    try {
      return await UCard.findById(id);
    } catch (error) {
      console.error('Error getting UCard:', error);
      throw error;
    }
  }
}