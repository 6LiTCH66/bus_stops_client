import axios, {AxiosRequestConfig} from "axios";
import {StopInformation} from "../types/StopInfo";
import {StopAreaDTO} from "../types/StopAreaDTO";
import {BusInfoDTO} from "../types/BusInfoDTO";
import {RouteInformation} from "../types/RouteInformation";
import {LocationState} from "../types/LocationState";
import {BusTimeDTO} from "../types/BusTimeDTO";
import {TripTimeInformation} from "../types/TripTimeInformation";
export const getStopAreas = async () =>{
    try{
        const stopAreas = await axios.get<StopInformation[]>(`${process.env.REACT_APP_BASE_URL}/buss/stop-area`, {withCredentials: true});
        return stopAreas.data

    }catch (err){
        console.log(err)
        throw err

    }
}

export const getStopByArea = async (params: StopAreaDTO) => {
    try{
        const stopAreas = await axios.get<StopInformation[]>(`${process.env.REACT_APP_BASE_URL}/buss`, {withCredentials: true, params: params});
        return stopAreas.data

    }catch (err){
        console.log(err)
        throw err

    }
}

export const getBusByStop = async (params: BusInfoDTO) => {
    try{
        const routes = await axios.get<RouteInformation[]>(`${process.env.REACT_APP_BASE_URL}/buss/all`, {withCredentials: true, params: params});
        return routes.data

    }catch (err){
        console.log(err)
        throw err
    }
}

export const getUserLocation = async (params: LocationState) => {
    try{
        const routes = await axios.get<StopInformation>(`${process.env.REACT_APP_BASE_URL}/buss/location`, {withCredentials: true, params: params});
        return routes.data

    }catch (err){
        console.log(err)
        throw err
    }
}

export const getBusTimeByStop = async (params: BusTimeDTO) => {
    try{
        const routes = await axios.get<TripTimeInformation[]>(`${process.env.REACT_APP_BASE_URL}/buss/location/bus-time`,{withCredentials: true, params: params});
        return routes.data

    }catch (err){
        console.log(err)
        throw err
    }
}