import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.js';
import { User } from '../models/user.js';

export const userRouter = Router();
userRouter.use(authenticate());

// GET /me
userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const doc = await User.findOne({ keycloakId: user.sub }).lean();
    res.json(doc || { keycloakId: user.sub, email: user.email, name: user.name });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PUT /me
userRouter.put('/', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const update = req.body;
    const doc = await User.findOneAndUpdate({ keycloakId: user.sub }, update, { upsert: true, new: true });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
});



