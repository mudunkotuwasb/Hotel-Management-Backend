import { Router, Request, Response } from 'express';
import { authenticate, requireRoles } from '../middleware/auth.js';
import { notImplemented } from '../utils/notImplemented.js';

export const tripsRouter = Router();
tripsRouter.use(authenticate());

// GET /trips (public & private)
tripsRouter.get('/', notImplemented);

tripsRouter.post('/', requireRoles('admin', 'receptionist'), notImplemented);

// POST /trips/:id/attach (receptionist)
tripsRouter.post('/:id/attach', requireRoles('receptionist'), notImplemented);

// POST /trip-requests (customer)
tripsRouter.post('/requests', requireRoles('customer'), notImplemented);


