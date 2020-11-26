
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

### Backend
`export FLASK_APP=main.py`
`flask run`

### Frontend
`cd web`
`npm run start`