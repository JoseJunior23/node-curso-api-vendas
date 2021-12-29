import { createConnection } from 'typeorm';

createConnection().then(() =>
  console.log('✅ successful connection to the database'),
);
