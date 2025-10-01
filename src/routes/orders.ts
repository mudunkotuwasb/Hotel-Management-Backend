import { Router, Request, Response } from 'express';
import { authenticate, requireRoles } from '../middleware/auth.js';
import { notImplemented } from '../utils/notImplemented.js';

export const ordersRouter = Router();
ordersRouter.use(authenticate());

// POST /orders (guest or receptionist)
ordersRouter.post('/', requireRoles('customer', 'receptionist'), notImplemented);

// PATCH /orders/:id/status (kitchen/receptionist)
ordersRouter.patch('/:id/status', requireRoles('kitchen', 'receptionist'), notImplemented);


