import express from 'express';
import TuyaDevice from "tuyapi";
import {config} from "../../config";

const router = express.Router();

router.get('/info', async (req, res, next) => {
    const device = new TuyaDevice(config);
    try {
        await device.find();
        await device.connect();
        let status = await device.get({schema: true});
        await device.disconnect()
        res.send(status)
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
});

export default router;
