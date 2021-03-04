
### Requirements
* Python3
* InfluxDB https://docs.influxdata.com/influxdb/v2.0/get-started/
    * With a bucket called *solardata*

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

## Config

add a config.ini file, example:
```
[DB]
HOST = http://localhost:8086
TOKEN = XXX
ORG = van
BUCKET = solardata
```

add a .env file, inside the *web* folder example:
```
REACT_APP_HOST=http://localhost:8086
REACT_APP_TOKEN=XXX
REACT_APP_ORG=van
REACT_APP_BUCKET=solardata
```

## Run 
make sure influxDB is running, otherwise start it
`influxd`

### Backend
`python3 main.py`

### Frontend
`cd web`
`npm run start`

