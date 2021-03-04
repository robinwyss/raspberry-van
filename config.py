import configparser

_config = configparser.ConfigParser()
_config.read('config.ini')

influx = {
    'host': _config.get('DB', 'HOST'),
    'token': _config.get('DB', 'TOKEN'),
    'org': _config.get('DB', 'ORG'),
    'bucket': _config.get('DB', 'BUCKET')
}
