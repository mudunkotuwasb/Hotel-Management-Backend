import { Router, Request, Response } from 'express';
import { authenticate, requireRoles } from '../middleware/auth.js';
import { notImplemented } from '../utils/notImplemented.js';

export const inventoryRouter = Router();
inventoryRouter.use(authenticate());

inventoryRouter.get('/', requireRoles('admin', 'receptionist'), notImplemented);

inventoryRouter.post('/', requireRoles('admin', 'receptionist'), notImplemented);

inventoryRouter.patch('/:id/adjust', requireRoles('admin', 'receptionist'), notImplemented);

inventoryRouter.get('/alerts', requireRoles('admin', 'receptionist'), notImplemented);


