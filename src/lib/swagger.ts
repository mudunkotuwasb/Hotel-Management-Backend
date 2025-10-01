import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json' assert { type: 'json' };

export function buildSwaggerSpec() {
  return swaggerJsdoc({
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'Hotel Management API',
        version,
      },
      servers: [{ url: 'http://localhost:3000' }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
      paths: {
        '/health': { get: { summary: 'Health', responses: { '200': { description: 'ok' } } } },
        '/rooms': {
          get: { tags: ['Rooms'], responses: { '501': { description: 'Not implemented' } } },
          post: { tags: ['Rooms'], security: [{ bearerAuth: [] }], responses: { '501': { description: 'Not implemented' } } }
        },
        '/rooms/{id}': {
          get: { tags: ['Rooms'], parameters: [{ name: 'id', in: 'path', required: true }], responses: { '501': { description: 'Not implemented' } } }
        },
        '/rooms/{id}/status': {
          patch: { tags: ['Rooms'], parameters: [{ name: 'id', in: 'path', required: true }], responses: { '501': { description: 'Not implemented' } } }
        },
        '/bookings': {
          get: { tags: ['Bookings'], responses: { '501': { description: 'Not implemented' } } },
          post: { tags: ['Bookings'], responses: { '501': { description: 'Not implemented' } } }
        },
        '/bookings/{id}/checkin': {
          post: { tags: ['Bookings'], parameters: [{ name: 'id', in: 'path', required: true }], responses: { '501': { description: 'Not implemented' } } }
        },
        '/bookings/{id}/checkout': {
          post: { tags: ['Bookings'], parameters: [{ name: 'id', in: 'path', required: true }], responses: { '501': { description: 'Not implemented' } } }
        },
        '/bookings/webhooks/ota': {
          post: { tags: ['Bookings'], responses: { '501': { description: 'Not implemented' } } }
        },
        '/menu': {
          get: { tags: ['Dining'], responses: { '501': { description: 'Not implemented' } } },
          post: { tags: ['Dining'], responses: { '501': { description: 'Not implemented' } } }
        },
        '/orders': {
          post: { tags: ['Dining'], responses: { '501': { description: 'Not implemented' } } }
        },
        '/orders/{id}/status': {
          patch: { tags: ['Dining'], parameters: [{ name: 'id', in: 'path', required: true }], responses: { '501': { description: 'Not implemented' } } }
        },
        '/inventory': {
          get: { tags: ['Inventory'], responses: { '501': { description: 'Not implemented' } } },
          post: { tags: ['Inventory'], responses: { '501': { description: 'Not implemented' } } }
        },
        '/inventory/{id}/adjust': {
          patch: { tags: ['Inventory'], parameters: [{ name: 'id', in: 'path', required: true }], responses: { '501': { description: 'Not implemented' } } }
        },
        '/inventory/alerts': {
          get: { tags: ['Inventory'], responses: { '501': { description: 'Not implemented' } } }
        },
        '/trips': {
          get: { tags: ['Trips'], responses: { '501': { description: 'Not implemented' } } },
          post: { tags: ['Trips'], responses: { '501': { description: 'Not implemented' } } }
        },
        '/trips/{id}/attach': {
          post: { tags: ['Trips'], parameters: [{ name: 'id', in: 'path', required: true }], responses: { '501': { description: 'Not implemented' } } }
        },
        '/trips/requests': {
          post: { tags: ['Trips'], responses: { '501': { description: 'Not implemented' } } }
        },
        '/invoices/{bookingId}': {
          get: { tags: ['Invoices'], parameters: [{ name: 'bookingId', in: 'path', required: true }], responses: { '501': { description: 'Not implemented' } } }
        },
        '/invoices/{bookingId}/generate': {
          post: { tags: ['Invoices'], parameters: [{ name: 'bookingId', in: 'path', required: true }], responses: { '501': { description: 'Not implemented' } } }
        },
        '/reports/occupancy': { get: { tags: ['Reports'], responses: { '501': { description: 'Not implemented' } } } },
        '/reports/sales': { get: { tags: ['Reports'], responses: { '501': { description: 'Not implemented' } } } },
        '/reports/inventory-usage': { get: { tags: ['Reports'], responses: { '501': { description: 'Not implemented' } } } }
      }
    },
    apis: [],
  });
}


