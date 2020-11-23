#!/usr/bin/env python

import time

# import the server implementation
from pymodbus.client.sync import ModbusSerialClient as ModbusClient
from pymodbus.mei_message import *
from epsolar_tracer.registers import registers, coils

default_port = '/dev/ttyXRUSB0'

port = input('Enter serial port to use [{}]:'.format(default_port)) or default_port

# choose the serial client
client = ModbusClient(method='rtu', port=port, baudrate=115200, stopbits=1, bytesize=8, timeout=1)
client.connect()

request = ReadDeviceInformationRequest(unit=1)
response = client.execute(request)
print(repr(response))
print(repr(response.information))

for rey_type, reg in registers.items():
    print()
    print(reg)
    rr = client.read_input_registers(reg.address, 1, unit=1)
    if hasattr(rr, "getRegister"):
        print("read_input_registers: {}".format(rr.getRegister(0)))
    else:
        print("read_input_registers: {}".format(str(rr)))
    rr = client.read_holding_registers(reg.address, 1, unit=1)
    if hasattr(rr, "getRegister"):
        print("read_holding_registers: {}".format(rr.getRegister(0)))
    else:
        print("read_holding_registers: {}".format(str(rr)))

for coil_type, reg in coils.items():
    print()
    print(reg)
    rr = client.read_coils(reg.address, unit=1)
    if hasattr(rr, "bits"):
        print("read_coils: {}".format(str(rr.bits)))
    else:
        print("read_coils: {}".format(str(rr)))
    rr = client.read_discrete_inputs(reg.address, unit=1)
    if hasattr(rr, "bits"):
        print("read_discrete_inputs: {}".format(str(rr.bits)))
    else:
        print("read_discrete_inputs: {}".format(str(rr)))