import { Connection, createConnection } from 'typeorm';

export const connectDb = async () => {
  let connection: Connection | undefined;
  for (let retries = 0; retries < 5; retries++) {
    try {
      connection = await createConnection();
      break;
    } catch (error) {
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  if (connection) {
    await connection.runMigrations();
  }
};
