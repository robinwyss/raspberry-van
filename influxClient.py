from datetime import datetime

from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

import config

_client = InfluxDBClient(url=config.influx.host, token=config.influx.token)

def addPercentageMeasurement(measurement, device, field, value)
    point = Point(measurement)\\
    .tag("device", device)\\
    .field(field, value)\\
    .time(datetime.utcnow(), WritePrecision.NS)

    write_api.write(bucket, org, point)