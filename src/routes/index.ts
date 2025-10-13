import { Express, Request, Response } from 'express';
import { roomsRouter } from './rooms.js';
import { bookingsRouter } from './bookings.js';
import { menuRouter } from './menu.js';
import { ordersRouter } from './orders.js';
import { inventoryRouter } from './inventory.js';
import { tripsRouter } from './trips.js';
import { invoicesRouter } from './invoices.js';
import { reportsRouter } from './reports.js';
import { userRouter } from './user.js';

export function registerRoutes(app: Express): void {
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.use('/rooms', roomsRouter);
  app.use('/bookings', bookingsRouter);
  app.use('/menu', menuRouter);
  app.use('/orders', ordersRouter);
  app.use('/inventory', inventoryRouter);
  app.use('/trips', tripsRouter);
  app.use('/invoices', invoicesRouter);
  app.use('/reports', reportsRouter);
  app.use('/me', userRouter);
}


