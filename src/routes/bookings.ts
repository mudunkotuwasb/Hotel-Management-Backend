import { Router } from 'express';
import { authenticate, requireRoles } from '../middleware/auth.js';
import { notImplemented } from '../utils/notImplemented.js';

export const bookingsRouter = Router();

bookingsRouter.use(authenticate());
bookingsRouter.get('/', notImplemented);
bookingsRouter.post('/', requireRoles('admin', 'receptionist', 'customer'), notImplemented);
bookingsRouter.post('/:id/checkin', requireRoles('admin', 'receptionist'), notImplemented);
bookingsRouter.post('/:id/checkout', requireRoles('admin', 'receptionist'), notImplemented);
bookingsRouter.post('/webhooks/ota', notImplemented);

