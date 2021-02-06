const solarMaxWatt = 240;
const batteryEmptyVoltage = 12.8;
const batteryFullVoltage = 14.7;
const loadMaxAmps = 20;

const roundedPercentage = (value: number) => {
    return Math.round(value * 10000) / 100;
}

const getSolarPercentage = (watts: number) => {
    return roundedPercentage(watts / solarMaxWatt);
}

const getBatteryPercentage = (batteryVolt: number) => {
    return roundedPercentage((batteryVolt - batteryEmptyVoltage) / (batteryFullVoltage - batteryEmptyVoltage))
}

const getLoadPercentage = (loadCurrent: number) => {
    return roundedPercentage(loadCurrent / loadMaxAmps)
}

export { getSolarPercentage, getBatteryPercentage, getLoadPercentage }