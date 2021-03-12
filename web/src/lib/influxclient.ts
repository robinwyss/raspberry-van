import { InfluxDB, FluxResultObserver, CommunicationObserver } from '@influxdata/influxdb-client'

const settings = {
    host: process.env.REACT_APP_HOST || "",
    token: process.env.REACT_APP_TOKEN || "",
    org: process.env.REACT_APP_ORG || "",
    bucket: process.env.REACT_APP_BUCKET || "",
}

const queryApi = new InfluxDB({ url: settings.host, token: settings.token }).getQueryApi(settings.org)

export const queryLatestValues = (consumer: FluxResultObserver<string[]>) => {
    queryApi.queryRows(`from(bucket: "${settings.bucket}")
    |> range(start: -1d)
    |> filter(fn: (r) => r["_measurement"] == "solarpanel" or r["_measurement"] == "battery" or r["_measurement"] == "load")
    |> filter(fn: (r) => r["_field"] == "current" or r["_field"] == "temperature" or r["_field"] == "voltage")
    |> last()`, consumer);
}

export const queryBatteryValues = (consumer: CommunicationObserver<string>) => {
    queryApi.queryLines(`from(bucket: "${settings.bucket}")
    |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
    |> filter(fn: (r) => r["_measurement"] == "battery")
    |> filter(fn: (r) => r["_field"] == "temperature" or r["_field"] == "voltage" or r["_field"] == "current")
    |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
    |> yield(name: "mean")`, consumer);
}

export const queryLoadValues = (consumer: CommunicationObserver<string>) => {
    queryApi.queryLines(`from(bucket: "${settings.bucket}")
    |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
    |> filter(fn: (r) => r["_measurement"] == "load")
    |> filter(fn: (r) => r["_field"] == "current" or r["_field"] == "voltage")
    |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
    |> yield(name: "mean")`, consumer);
}

export const querySolarpanelValues = (consumer: CommunicationObserver<string>) => {
    queryApi.queryLines(`from(bucket: "${settings.bucket}")
    |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
    |> filter(fn: (r) => r["_measurement"] == "solarpanel")
    |> filter(fn: (r) => r["_field"] == "current" or r["_field"] == "voltage")
    |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
    |> yield(name: "mean")`, consumer);
}

