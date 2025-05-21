'use client'
import { requestAddress } from "@/service/axiosRequest"
import { useQuery } from "@tanstack/react-query"


export enum AddressLocation {
    TINH = '/provinces/getAll?limit=-1',
    HUYEN = '/districts/getByProvince?limit=-1&provinceCode=',
    XA = '/wards/getByDistrict?limit=-1&districtCode='
}


const fetchAddress = async (type: AddressLocation, code?: string) => {
    try {
        if (type == AddressLocation.TINH) {
            const res = await requestAddress.get(`${type}`)
            return res.data.data.data
        }
        if (type == AddressLocation.HUYEN) {
            if (code == '') return alert('Lỗi api địa chỉ')
            const res = await requestAddress.get(`${type}${code}`)
            return res.data.data.data
        }
        if (type == AddressLocation.XA) {
            if (code == '') return alert('Lỗi api địa chỉ')
            const res = await requestAddress.get(`${type}${code}`)
            return res.data.data.data
        }
    } catch (e) {
        console.log(e)
        return alert('Lỗi api địa chỉ')
    }
}

export const useAddress = (type: AddressLocation, code?: string) => {

    let key = ''
    if (type == AddressLocation.TINH) {
        key = 'tinh'
    }
    if (type == AddressLocation.HUYEN) {
        key = `huyen${code}`
    }
    if (type == AddressLocation.XA) {
        key = `xa${code}`
    }
    return useQuery({
        queryKey: [key],
        queryFn: () => fetchAddress(type, code)
    })
}