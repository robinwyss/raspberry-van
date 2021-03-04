import { InfluxDB, FluxResultObserver } from '@influxdata/influxdb-client'

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