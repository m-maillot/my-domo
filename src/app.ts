import express from 'express';
import path from 'path';
import logger from 'morgan';
import indexSpeed from './routes/fan/speed';
import indexState from './routes/fan/state';
import indexLightState from './routes/light/state';
import indexInfo from './routes/info';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/fan', indexSpeed);
app.use('/fan', indexState);
app.use('/fan', indexInfo);

app.use('/light', indexLightState);

app.listen(3000, function () {
    console.log('Server is listening on port 3000')
});