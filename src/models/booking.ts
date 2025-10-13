import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type BookingStatus = 'Pending' | 'Confirmed' | 'CheckedIn' | 'CheckedOut' | 'Cancelled';
export type BookingSource = 'Local' | 'Booking.com' | 'TripAdvisor' | 'Expedia';

export interface IBookingItem {
  description: string;
  amount: number;
}

export interface IBooking extends Document {
  roomId: Types.ObjectId;
  guestId: Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;
  source: BookingSource;
  sourceBookingId?: string;
}

const BookingSchema = new Schema<IBooking>(
  {
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true, index: true },
    guestId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'CheckedIn', 'CheckedOut', 'Cancelled'], default: 'Pending' },
    source: { type: String, enum: ['Local', 'Booking.com', 'TripAdvisor', 'Expedia'], default: 'Local', index: true },
    sourceBookingId: { type: String, index: true },
  },
  { timestamps: true }
);

BookingSchema.index({ source: 1, sourceBookingId: 1 }, { unique: true, partialFilterExpression: { sourceBookingId: { $exists: true } } });

export const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', BookingSchema);






