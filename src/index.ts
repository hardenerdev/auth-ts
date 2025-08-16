import { app } from './app';
import appConfig from './config/app.config';

const PORT = appConfig.port;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
