
### Requirements
- Python3
- InfluxDB https://docs.influxdata.com/influxdb/v2.0/get-started/

## Setup

### Backend
Setup Python venv
`python3 -m venv env`
activate environemnt
`. env/bin/activate`
Install packages
`pip install -r requirements.txt`

### Frontend
`cd web`
`npm install`

## Run 
make sure influxDB is running, otherwise start it
`influxd`

### Backend
`python3 main.py`

### Frontend
`cd web`
`npm run start`

## Config

add a config.ini file, example:
```
[DB]
HOST = http://localhost:8086
TOKEN = XXX
ORG = van
BUCKET = data
```