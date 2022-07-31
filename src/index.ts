import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import express from 'express';
import morgan from 'morgan';
// import { nanoid } from 'nanoid';

const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
const genId = () => randomUUID();

const seedDB = async () => {
  if ((await db.submission.count()) === 0) {
    await db.submission.createMany({
      data: [
        {
          id: genId(),
          submittedAt: new Date(),
          data: {"name": "John Doe", "twitter": "@example"}
        },
        {
          id: genId(),
          submittedAt: new Date(),
          data: {"name": "Jane Doe", "twitter": "@exemplo"}
        }
      ],
    });
  }
};

try {
  seedDB();
} catch (error) {
  console.log(error);
}

const app = express();
const port = Number(process.env.PORT ?? 8080);
app.use(morgan('dev'));

app.get('/', async (req, res) => {
  const submissions = await db.submission.findMany();
  res.json(submissions);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started at port ${port}`);
});
