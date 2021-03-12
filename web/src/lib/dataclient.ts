import { FluxTableMetaData } from '@influxdata/influxdb-client'
import { queryLatestValues } from './influxclient';
import { EmptyMpptResult, MpptResult } from "./types";
import moment from 'moment'


async function getMpptData(): Promise<MpptResult> {
    const promise = new Promise<MpptResult>((resolve, reject) => {
        const result = EmptyMpptResult()
        queryLatestValues({
            next(row: string[], tableMeta: FluxTableMetaData) {
                result.hasData = true;
                const o = tableMeta.toObject(row)
                const dateTime = moment(o._time)
                result.datetime = dateTime.isAfter(result.datetime) ? dateTime : result.datetime
                switch (o._measurement) {
                    case "battery":
                        switch (o._field) {
                            case "current": result.data.battery.current = o._value
                                break;
                            case "voltage": result.data.battery.voltage = o._value
                                break;
                            case "temperature": result.data.battery.temperature = o._value
                                break;
                        }
                        break;
                    case "solarpanel":
                        switch (o._field) {
                            case "current": result.data.solarpanel.current = o._value
                                break;
                            case "voltage": result.data.solarpanel.voltage = o._value
                                break;
                        }
                        break;
                    case "load":
                        switch (o._field) {
                            case "current": result.data.load.current = o._value
                                break;
                            case "voltage": result.data.load.voltage = o._value
                                break;
                        }
                        break;
                }
            },
            error(error: Error) {
                console.error(error)
                console.log('\nFinished ERROR')
                resolve(result);
            },
            complete() {
                resolve(result);
            },
        })
    });

    return promise
}

export { getMpptData }