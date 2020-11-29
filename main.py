#!/usr/bin/python

from tracer import read

result = read()

print("PV Voltage (V): ", result.pv.volt)
print("PV Current (A): ", result.pv.amp)
print("PV Power (W): ", result.pv.power)
print("Battery Voltage (V):", result.battery.volt)
print("Battery Charging Current (A):", result.battery.volt)
print("Battery Charging Power (W):", result.battery.power)
print("Load Voltage (V):", result.load.volt)
print("Load Charging Current (A):", result.load.amp)
print("Load Charging Power (W):", result.load.power)
print("Battery Temp (C):", result.battery.status)
print("Battery Status: ", result.battery.status)
print("batterySOC=", result.battery.soc)

