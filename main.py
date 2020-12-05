#!/usr/bin/python

# from tracer import read
from tracerMock import read

def loadData():
    result = read()

    print("PV Voltage (V): ", result.panel.voltage)
    print("PV Current (A): ", result.panel.ampere)
    print("PV Power (W): ", result.panel.power)
    print("Battery Voltage (V):", result.battery.voltage)
    print("Battery Charging Current (A):", result.battery.ampere)
    print("Battery Charging Power (W):", result.battery.power)
    print("Load Voltage (V):", result.load.voltage)
    print("Load Charging Current (A):", result.load.ampere)
    print("Load Charging Power (W):", result.load.power)
    print("Battery Temp (C):", result.battery.temperature)
    print("Battery Status: ", result.battery.status)
    print("batterySOC=", result.battery.soc)

loadData()