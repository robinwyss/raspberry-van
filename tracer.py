#!/usr/bin/python

from pymodbus.client.sync import ModbusSerialClient as ModbusClient
import sqlite3

import time

port = 'COM3' #"/dev/ttyUSB0"
dbfile = "chargecontroller.db"

def initdb():
    con = sqlite3.connect('chargecontroller.db')




client = ModbusClient(method = 'rtu', port = port, baudrate = 115200)
client.connect()

while True:

    # read 6 registers starting at 0x3100
    result = client.read_input_registers(0x3100, 17, unit=1)

    pvVolts = float(result.registers[0] / 100.0)
    pvAmps = float(result.registers[1] / 100.0)
    pvPower = float(result.registers[2] / 100.0)
    batteryVolts = float(result.registers[4] / 100.0)
    batteryAmps = float(result.registers[5] / 100.0)
    batteryPower = float(result.registers[6] / 100.0)
    loadVolts = float(result.registers[12] / 100.0)
    loadAmps = float(result.registers[13] / 100.0)
    loadPower = float(result.registers[14] / 100.0)
    batteryTemp = float(result.registers[16] / 100.0)


    print("PV Voltage (V): ", pvVolts)
    print("PV Current (A): ", pvAmps)
    print("PV Power (W): ", pvPower)
    print("Battery Voltage (V):", batteryVolts)
    print("Battery Charging Current (A):", batteryAmps)
    print("Battery Charging Current (A):", batteryPower)
    print("Load Voltage (V):", loadVolts)
    print("Load Charging Current (A):", loadAmps)
    print("Load Charging Current (A):", loadPower)
    print("Battery Temp (C):", batteryTemp)
    print("")

    result2 = client.read_input_registers(0x3200, 2, unit=1)
    batteryStatus = result2.registers[0]
    equipmentStatus = result2.registers[1]

    print("Battery Status: ", batteryStatus)
    print("Equipment Status: ", equipmentStatus)

    time.sleep(1) # pause before reading the next register

    # read the battery SOC
    result = client.read_input_registers(0x311A, 1, unit=1)
    batterySOC = result.registers[0]

    print("batterySOC=", batterySOC)