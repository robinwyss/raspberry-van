import { InfluxDB, FluxTableMetaData } from '@influxdata/influxdb-client'
import { MpptData, EmptyMpptData } from "./types";


const settings = {
    host: process.env.REACT_APP_HOST || "",
    token: process.env.REACT_APP_TOKEN || "",
    org: process.env.REACT_APP_ORG || "",
    bucket: process.env.REACT_APP_BUCKET || "",
}

const queryApi = new InfluxDB({ url: settings.host, token: settings.token }).getQueryApi(settings.org)

async function getBatteryData(): Promise<MpptData> {
    const promise = new Promise<MpptData>((resolve, reject) => {
        const data: MpptData = EmptyMpptData()
        queryApi.queryRows(`from(bucket: "${settings.bucket}")
            |> range(start: -1d)
            |> filter(fn: (r) => r["_measurement"] == "solarpanel" or r["_measurement"] == "battery" or r["_measurement"] == "load")
            |> filter(fn: (r) => r["_field"] == "current" or r["_field"] == "temperature" or r["_field"] == "voltage")
            |> last()`, {
            next(row: string[], tableMeta: FluxTableMetaData) {
                const o = tableMeta.toObject(row)

                switch (o._measurement) {
                    case "battery":
                        switch (o._field) {
                            case "current": data.battery.current = o._value
                                break;
                            case "voltage": data.battery.voltage = o._value
                                break;
                            case "temperature": data.battery.temperature = o._value
                                break;
                        }
                        break;
                    case "solarpanel":
                        switch (o._field) {
                            case "current": data.solarpanel.current = o._value
                                break;
                            case "voltage": data.solarpanel.voltage = o._value
                                break;
                        }
                        break;
                    case "load":
                        switch (o._field) {
                            case "current": data.load.current = o._value
                                break;
                            case "voltage": data.load.voltage = o._value
                                break;
                        }
                        break;
                }
            },
            error(error: Error) {
                console.error(error)
                console.log('\nFinished ERROR')
                reject(error)
            },
            complete() {
                resolve(data);
            },
        })
    });

    return promise
}

export { getBatteryData }