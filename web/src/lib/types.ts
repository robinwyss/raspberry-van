export type Climate = {
    temperature: string
}

type BatteryData = {
    current: number,
    voltage: number,
    temperature: number
}

type SolarpanelData = {
    current: number,
    voltage: number,
}

type LoadData = {
    current: number,
    voltage: number,
}

export type MpptData = {
    battery: BatteryData,
    solarpanel: SolarpanelData,
    load: LoadData
}

export const EmptyMpptData = (): MpptData => {
    return {
        battery: { current: -1, voltage: -1, temperature: -99 },
        solarpanel: { current: -1, voltage: -1 },
        load: { current: -1, voltage: -1 }
    }
}