import { Router, Request, Response } from 'express';
import { authenticate, requireRoles } from '../middleware/auth.js';
import { notImplemented } from '../utils/notImplemented.js';

export const reportsRouter = Router();
reportsRouter.use(authenticate());

reportsRouter.get('/occupancy', requireRoles('admin', 'receptionist'), notImplemented);

reportsRouter.get('/sales', requireRoles('admin'), notImplemented);

reportsRouter.get('/inventory-usage', requireRoles('admin', 'receptionist'), notImplemented);


