import moment, { Moment } from "moment"

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

export type MpptResult = {
    hasData: boolean,
    datetime: Moment,
    data: MpptData
}

export type CsvResult = {
    hasData: boolean,
    csv: string
}

export enum PageState {
    Loading,
    NoData,
    Ready,
}

export const EmptyMpptResult = (): MpptResult => {
    return {
        hasData: false,
        datetime: moment(0),
        data: {
            battery: { current: -1, voltage: -1, temperature: -99 },
            solarpanel: { current: -1, voltage: -1 },
            load: { current: -1, voltage: -1 }
        }
    }
}
