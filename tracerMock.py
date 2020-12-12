import collections
import random

Panel = collections.namedtuple('Panel', 'voltage current power')
Battery = collections.namedtuple('Battery', 'voltage current power status temperature soc')
Load = collections.namedtuple('Load', 'voltage current power')
Data = collections.namedtuple('Data', 'panel battery load')

pvVolts = 16.0
pvAmps = 5.0

batteryVolts = 13.0
batteryAmps = 2.0

loadVolts = 9.0
loadAmps = 3.0
batteryTemp = 22.0

def getRandom():
    return round((random.random() - 0.5), 1)

def read():

    pvVolts = 16.0 + getRandom() 
    pvAmps = 5.0 + getRandom()
    pvPower = pvVolts * pvAmps

    batteryVolts = 13.0 + getRandom()
    batteryAmps = 2.0 + getRandom()
    batteryPower = round(batteryVolts * batteryAmps, 1)

    loadVolts = 9.0 + getRandom()
    loadAmps = 3.0 + getRandom()
    loadPower = round(loadVolts * loadAmps)
    batteryTemp = 22.0 + getRandom()

    panel = Panel(pvVolts, pvAmps, pvPower)
    load = Load(loadVolts, loadAmps, loadPower)
    battery = Battery(batteryVolts, batteryAmps, batteryPower,"-", batteryTemp, "-")
    return Data(panel, battery, load)