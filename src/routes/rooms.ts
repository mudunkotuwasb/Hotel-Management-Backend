import { Router, Request, Response } from 'express';
import { authenticate, requireRoles } from '../middleware/auth.js';
import { notImplemented } from '../utils/notImplemented.js';

export const roomsRouter = Router();

// All routes require authentication
roomsRouter.use(authenticate());

// GET /rooms?status=&type=&minRate=&maxRate=
roomsRouter.get('/', notImplemented);

// GET /rooms/:id
roomsRouter.get('/:id', notImplemented);

// POST /rooms (admin)
roomsRouter.post('/', requireRoles('admin'), notImplemented);

// PATCH /rooms/:id/status (admin/receptionist)
roomsRouter.patch('/:id/status', requireRoles('admin', 'receptionist'), notImplemented);


