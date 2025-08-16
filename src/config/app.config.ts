import dotenv from 'dotenv';

dotenv.config({
    path: '.env'
});

const appConfig = {
    port: process.env.PORT || 4000
};

export default appConfig;
