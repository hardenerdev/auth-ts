import dotenv from 'dotenv';

dotenv.config({
    path: '.env'
});

const jwtConfig = {
    secret: process.env.JWT_SECRET || 'super secret'
};

export default jwtConfig;
