import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw Error('ConfigError: undefined JWT_SECRET');

const ROOT_USERNAME = process.env.ROOT_USERNAME;
if (!ROOT_USERNAME) throw Error('ConfigError: undefined ROOT_USERNAME');

const ROOT_PASSWORD = process.env.ROOT_PASSWORD;
if (!ROOT_PASSWORD) throw Error('ConfigError: undefined ROOT_PASSWORD');

export default { JWT_SECRET, ROOT_USERNAME, ROOT_PASSWORD };
