import { Climate, MpptData } from './types'

const endpoint = "http://localhost:5000"

async function http<T>(
    request: RequestInfo
): Promise<T> {
    const response = await fetch(request);
    const body = await response.json();
    return body;
}

async function getClimate(): Promise<Climate> {
    return await http<Climate>(endpoint + '/climate')
}

async function getMpptData(): Promise<MpptData> {
    return await http<MpptData>(endpoint + '/mppt')
}

export { getClimate, getMpptData }