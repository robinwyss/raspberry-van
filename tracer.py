#!/usr/bin/python

from pymodbus.client.sync import ModbusSerialClient as ModbusClient

import time

port = 'COM3' #"/dev/ttyUSB0"


_client = ModbusClient(method = 'rtu', port = port, baudrate = 115200)
_client.connect()

def read():
    # read 6 registers starting at 0x3100
    result = _client.read_input_registers(0x3100, 17, unit=1)

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

    result2 = _client.read_input_registers(0x3200, 2, unit=1)
    batteryStatus = result2.registers[0]
    # equipmentStatus = result2.registers[1]
    
    time.sleep(1) # pause before reading the next register

    # read the battery SOC
    result = _client.read_input_registers(0x311A, 1, unit=1)
    batterySOC = result.registers[0]

    pvData = {
        'volt': pvVolts,
        'amp': pvAmps,
        'power': pvPower
    }

    loadData = {
        'volt': loadVolts,
        'amp': loadAmps,
        'power': loadPower
    }

    batteryData = {
        'volt': batteryVolts,
        'amp': batteryAmps,
        'power': batteryPower,
        'status': batteryStatus,
        'temperature': batteryTemp,
        'soc': batterySOC
    }

    return {
        'pv': pvData, 
        'battery': batteryData,
        'load': loadData
    }