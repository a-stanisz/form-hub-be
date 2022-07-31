import { PrismaClient } from '@prisma/client';
// import { randomUUID } from 'crypto';
import express from 'express';
import morgan from 'morgan';

const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });

const seedDB = async () => {
  if (!(await db.user.count())) {
    await db.user.createMany({
      data: [
        {
          email: 'email@example.com',
          name: 'Admin',
        },
        {
          email: 'john.doe@example.com',
          name: 'John Doe',
        },
      ],
    });
  }
};
seedDB();

const app = express();
const port = Number(process.env.PORT ?? 8080);
app.use(morgan('dev'));

app.get('/', async (req, res) => {
  const users = await db.user.findMany();
  res.json(users);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started at port ${port}`);
});
