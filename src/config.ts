export const config = {
    id: process.env.DEVICE_ID ?? "",
    key: process.env.DEVICE_KEY ?? "",
    ip: process.env.DEVICE_IP,
    version: '3.3',
    issueGetOnConnect: false,
}

export enum Dps {
    fanState = "60",
    fanRotation = "63",
    fanSpeed = "62",
    lightState = "20",
    lightColor = "23",
}

export interface FanDetailDps {
    '60': boolean;
    '62': number;
    '63': number;
    '20': boolean;
    '23': number;
}

export interface FanDetail {
    dps: FanDetailDps;
}