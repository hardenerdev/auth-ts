import dotenv from 'dotenv';

dotenv.config({
    path: '.env'
});

const mongoConfig = {
    url: process.env.MONGO_URL || 'mongodb://mongo:27017/users'
};

export default mongoConfig;
