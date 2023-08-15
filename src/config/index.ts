import { config } from 'dotenv';
config();

export const { NODE_ENV } = process.env;
export const IS_DEV = process.env.NODE_ENV === 'development';
export const MONGO_URI = process.env.MONGO_URI;
