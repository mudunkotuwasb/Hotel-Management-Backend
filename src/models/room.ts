import mongoose, { Schema, Document, Model } from 'mongoose';

export type RoomType = 'single' | 'double' | 'suite';
export type RoomStatus = 'Available' | 'Occupied' | 'Reserved' | 'OutOfService';

export interface IRoom extends Document {
  roomNumber: number;
  type: RoomType;
  rate: number;
  amenities: string[];
  status: RoomStatus;
  needsCleaning: boolean;
}

const RoomSchema = new Schema<IRoom>(
  {
    roomNumber: { type: Number, required: true, unique: true, index: true },
    type: { type: String, enum: ['single', 'double', 'suite'], required: true },
    rate: { type: Number, required: true },
    amenities: { type: [String], default: [] },
    status: { type: String, enum: ['Available', 'Occupied', 'Reserved', 'OutOfService'], default: 'Available' },
    needsCleaning: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Room: Model<IRoom> = mongoose.model<IRoom>('Room', RoomSchema);


