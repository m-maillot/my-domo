import express from 'express';
import TuyaDevice from "tuyapi";
import {config, Dps} from "../../../config";

const router = express.Router();

interface RequestParams {
    action: "on" | "off";
}

router.get<RequestParams>('/turn/:action', async (req, res, next) => {
    const action = req.params.action
    const device = new TuyaDevice(config);
    try {
        await device.find();
        await device.connect();
        const running = action === "on"
        const result = await device.set({dps: Dps.fanState, set: running});
        device.disconnect();
        res.send(result)
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
});

export default router;
