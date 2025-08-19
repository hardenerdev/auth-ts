import dotenv from 'dotenv';

dotenv.config({
    path: '.env'
});

const bcryptConfig = {
    salt: process.env.BCRYPT_SALT || 10
};

export default bcryptConfig;
