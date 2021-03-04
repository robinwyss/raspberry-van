from datetime import datetime

from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

from config import influx

_client = InfluxDBClient(url=influx['host'], token=influx['token'])
org = influx['org']
bucket = influx['bucket']

def writeMeasurements(data):
    sequence = [
        f'solarpanel voltage={data.panel.voltage}',
        f'solarpanel current={data.panel.current}',
        f'battery voltage={data.battery.voltage}',
        f'battery current={data.battery.current}',
        f'battery temperature={data.battery.temperature}',
        f'load voltage={data.load.voltage}',
        f'load current={data.load.current}',
    ]

    write_api = _client.write_api(write_options=SYNCHRONOUS)
    write_api.write(bucket, org, sequence)

# def addMeasurement(measurement, device, field, value):
#     point = Point(measurement)\\
#     .tag("device", device)\\
#     .field(field, value)\\
#     .time(datetime.utcnow(), WritePrecision.NS)

#     write_api.write(bucket, org, point)