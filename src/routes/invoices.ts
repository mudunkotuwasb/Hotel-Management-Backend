import { Router, Request, Response } from 'express';
import { authenticate, requireRoles } from '../middleware/auth.js';
import { notImplemented } from '../utils/notImplemented.js';

export const invoicesRouter = Router();
invoicesRouter.use(authenticate());

// GET /invoices/:bookingId
invoicesRouter.get('/:bookingId', requireRoles('admin', 'receptionist'), notImplemented);

// POST /invoices/:bookingId/generate
invoicesRouter.post('/:bookingId/generate', requireRoles('admin', 'receptionist'), notImplemented);


