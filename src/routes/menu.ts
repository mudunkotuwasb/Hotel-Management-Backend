import { Router, Request, Response } from 'express';
import { authenticate, requireRoles } from '../middleware/auth.js';
import { notImplemented } from '../utils/notImplemented.js';

export const menuRouter = Router();
menuRouter.use(authenticate());

menuRouter.get('/', notImplemented);

menuRouter.post('/', requireRoles('admin', 'receptionist'), notImplemented);


