#!/bin/sh

port=8086
containername=influxdb
org=van
bucket=solardata
tracerconfig=./config.ini
webconfig=./web/.env

# create the influx container and expose port 8086
printf 'Create InfluxDB container. Name: %s, port %d\r\n' $containername $port
docker create --name=$containername -p $port:8086 influxdb:latest > /dev/null
docker start $containername > /dev/null

printf '%s\r\n'  'Wait for container to be up.'
until [ "`docker inspect -f {{.State.Running}} $containername`"=="true" ]; do
    printf '.'
    sleep 0.5;
done;

# wait for influx to be ready
sleep 5;

printf 'Configure InfluxDB org: %s, bucke: %s\r\n'
# setup influxDB
docker exec -it $containername influx setup --org $org --bucket $bucket --username raspberry --password raspberry --force
bucketId=$(docker exec -it $containername influx bucket list -n $bucket --json | jq -r '.[0].id')
webtoken=$(docker exec -it $containername influx auth create -o $org --read-bucket $bucketId -d apiToken -d web-client --json | jq '.token' -r)
tracerToken=$(docker exec -it $containername influx auth create -o $org --write-bucket $bucketId -d apiToken -d tracer-client --json | jq '.token' -r)

printf 'Write config %s\r\n' $tracerconfig
/bin/cat <<EOM >$tracerconfig
[DB]
HOST = http://localhost:$port
TOKEN = $tracerToken
ORG = $org
BUCKET = $bucket
EOM

printf 'Write config %s\r\n' $webconfig
/bin/cat <<EOM >$webconfig
REACT_APP_HOST=http://localhost:$port
REACT_APP_TOKEN=$webtoken
REACT_APP_ORG=$org
REACT_APP_BUCKET=$bucket
EOM