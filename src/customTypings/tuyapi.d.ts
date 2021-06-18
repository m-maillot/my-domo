declare module 'tuyapi' {

    interface DeviceConfig {
        id: string,
        key: string,
        ip?: string,
        version?: string,
        issueGetOnConnect?: boolean,
    }

    class TuyaDevice {

        constructor(param: DeviceConfig);

        /**
         * Finds an ID or IP, depending on what's missing.
         * If you didn't pass an ID or IP to the constructor,
         * you must call this before anything else.
         */
        find(input?: { timeout?: number, all?: boolean }): Promise<boolean | Array<any>>;

        /**
         * Connects to the device. Can be called even
         * if device is already connected.
         */
        connect(): Promise<boolean>

        /**
         * Returns current connection status to device.
         * @returns {Boolean}
         * (`true` if connected, `false` otherwise.)
         */
        isConnected(): boolean

        /**
         * Gets a device's current status.
         * Defaults to returning only the value of the first DPS index.
         */
        get<T>(options: { schema?: boolean, dps?: number, cid?: string }): Promise<T>

        /**
         * Sets a property on a device.
         *
         * @example
         * // set default property
         * tuya.set({set: true}).then(() => console.log('device was turned on'))
         * @example
         * // set custom property
         * tuya.set({dps: 2, set: false}).then(() => console.log('device was turned off'))
         * @example
         * // set multiple properties
         * tuya.set({
         *           multiple: true,
         *           data: {
         *             '1': true,
         *             '2': 'white'
         *          }}).then(() => console.log('device was changed'))
         * @example
         * // set custom property for a specific (virtual) deviceId
         * tuya.set({
         *           dps: 2,
         *           set: false,
         *           devId: '04314116cc50e346566e'
         *          }).then(() => console.log('device was turned off'))
         */
        set<T>(options: { dps: string, set: boolean | string | number | object, cid?: string, multiple?: boolean, data?: object, shouldWaitForResponse?: boolean }): Promise<T>

        /**
         * Disconnects from the device, use to
         * close the socket and exit gracefully.
         */
        disconnect(): void
    }

    export = TuyaDevice;
}