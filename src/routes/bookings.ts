import { Router, Request, Response } from 'express';
import { authenticate, requireRoles } from '../middleware/auth.js';
import { Booking, IBooking, BookingStatus } from '../models/booking.js';
import { Room } from '../models/room.js';

export const bookingsRouter = Router();

bookingsRouter.use(authenticate());

// List bookings for current user (customers) or all (staff)
bookingsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const isStaff = user.roles.some((r: string) => ['admin', 'receptionist'].includes(r));
    const filter: any = isStaff ? {} : { guestId: user.sub };
    const bookings = await Booking.find(filter).sort({ createdAt: -1 }).lean();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Create booking (with simple availability check)
bookingsRouter.post('/', requireRoles('admin', 'receptionist', 'customer'), async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { roomId, checkIn, checkOut, guestId } = req.body as {
      roomId: string;
      checkIn: string;
      checkOut: string;
      guestId?: string;
    };

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (!(start < end)) return res.status(400).json({ error: 'Invalid date range' });

    const overlapping = await Booking.findOne({
      roomId,
      status: { $in: ['Pending', 'Confirmed', 'CheckedIn'] },
      $or: [
        { checkIn: { $lt: end }, checkOut: { $gt: start } },
      ],
    });
    if (overlapping) return res.status(409).json({ error: 'Room not available in selected dates' });

    const created = await Booking.create({
      roomId: room._id as any,
      guestId: (guestId || user.sub) as any,
      checkIn: start,
      checkOut: end,
      status: 'Confirmed',
      source: 'Local',
    } as any);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create booking' });
  }
});

// Check-in
bookingsRouter.post('/:id/checkin', requireRoles('admin', 'receptionist'), async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'CheckedIn' },
      { new: true }
    );
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    await Room.findByIdAndUpdate(booking.roomId, { status: 'Occupied' });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: 'Failed to check in' });
  }
});

// Check-out
bookingsRouter.post('/:id/checkout', requireRoles('admin', 'receptionist'), async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'CheckedOut' },
      { new: true }
    );
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    await Room.findByIdAndUpdate(booking.roomId, { status: 'Available', needsCleaning: true });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: 'Failed to check out' });
  }
});

// OTA webhook placeholder
bookingsRouter.post('/webhooks/ota', (_req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

