import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/users.route';
import sessionRoutes from './routes/session.route';
import groupRoutes from './routes/group.route';
import taskRoutes from './routes/task.route';
import notificationRoutes from './routes/notification.route';
import calendarRoutes from './routes/calendar.route';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import * as dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Cohabit API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000/api'
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'user@example.com' },
            password: { type: 'string', example: 'password123' },
            username: { type: 'string', example: 'username' },
            name: { type: 'string', example: 'John' },
            lastname: { type: 'string', example: 'Doe' },
          },
        },
        Task: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            description: { type: 'string' },
            assignedTo: { type: 'string' },
            createdBy: { type: 'string' },
            groupId: { type: 'string' },
            status: { type: 'string', enum: ['pendiente', 'realizada'] },
            date: { type: 'string', format: 'date-time' },
            dueDate: { type: 'string', format: 'date-time' },
          },
        },
        Notification: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            type: { type: 'string' },
            read: { type: 'boolean' },
            message: { type: 'string' },
          },
        },
        Group: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            members: {
              type: 'array',
              items: { type: 'string' },
            },
            tasks: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
        Calendar: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            groupId: { type: 'string' },
            tasks: {
              type: 'array',
              items: { type: 'string' }, // Ajusta el tipo de los elementos según tu modelo
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Aquí se apuntan a las rutas
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', sessionRoutes);
app.use('/api', taskRoutes);
app.use('/api', groupRoutes);
app.use('/api', notificationRoutes);
app.use('/api', calendarRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
