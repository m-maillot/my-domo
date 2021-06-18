import express from 'express';
import TuyaDevice from "tuyapi";
import {config, Dps, FanDetail} from "../../../config";

const router = express.Router();

interface RequestParams {
    action: "up" | "down";
}

router.get<RequestParams>('/speed/:action', async (req, res, next) => {
    const action = req.params.action
    const device = new TuyaDevice(config);
    try {
        await device.find();

        await device.connect();

        let status = await device.get<FanDetail>({schema: true});
        const running = status.dps[Dps.fanState];
        const speed = status.dps[Dps.fanSpeed];
        console.log(`Current state = ${running} with speed ${speed}`);

        let result: any | null = null
        if (action === "up") {
            if (!running) {
                result = await device.set({dps: Dps.fanState, set: true});
            } else if (speed < 6) {
                result = await device.set({dps: Dps.fanSpeed, set: speed + 1});
            } else {
                console.log(`Can't go faster, stop here ${speed}`)
            }
        } else if (action === "down") {
            if (!running) {
                console.log("Fan is already stopped");
            } else if (speed == 1) {
                result = await device.set({dps: Dps.fanState, set: false});
            } else if (speed <= 6) {
                result = await device.set({dps: Dps.fanSpeed, set: speed - 1});
            } else {
                console.log(`Invalid current speed ${speed}`)
            }
        } else {
            console.error(`action unknown: ${action}`);
            res.sendStatus(400);
        }
        device.disconnect();
        if (result) {
            res.send(result)
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
});

export default router;
