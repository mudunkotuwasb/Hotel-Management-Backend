import { Router, Request, Response } from 'express';
import { authenticate, requireRoles } from '../middleware/auth.js';
import { Room, IRoom, RoomStatus, RoomType } from '../models/room.js';

export const roomsRouter = Router();

// All routes require authentication
roomsRouter.use(authenticate());

// GET /rooms?status=&type=&minRate=&maxRate=
roomsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { status, type, minRate, maxRate } = req.query as {
      status?: RoomStatus;
      type?: RoomType;
      minRate?: string;
      maxRate?: string;
    };

    const filter: any = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (minRate || maxRate) {
      filter.rate = {};
      if (minRate) filter.rate.$gte = Number(minRate);
      if (maxRate) filter.rate.$lte = Number(maxRate);
    }

    const rooms = await Room.find(filter).sort({ roomNumber: 1 }).lean();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// GET /rooms/:id
roomsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const room = await Room.findById(req.params.id).lean();
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});

// POST /rooms (admin)
roomsRouter.post('/', requireRoles('admin'), async (req: Request, res: Response) => {
  try {
    const payload = req.body as Partial<IRoom>;
    const room = await Room.create(payload);
    res.status(201).json(room);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create room' });
  }
});

// PATCH /rooms/:id/status (admin/receptionist)
roomsRouter.patch('/:id/status', requireRoles('admin', 'receptionist'), async (req: Request, res: Response) => {
  try {
    const { status } = req.body as { status: RoomStatus };
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update room status' });
  }
});


