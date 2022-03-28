import { createConnection } from 'typeorm';

export const connectDb = async () => {
  for (let retries = 0; retries < 5; retries++) {
    try {
      await createConnection();
      break;
    } catch (error) {
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};
