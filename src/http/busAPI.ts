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
        const stopAreas = await axios.get<StopInformation[]>(`http://localhost:3000/buss/stop-area`, {withCredentials: true});
        return stopAreas.data

    }catch (err){
        console.log(err)
        throw err

    }
}

export const getStopByArea = async (params: StopAreaDTO) => {
    try{
        const stopAreas = await axios.post<StopInformation[]>(`http://localhost:3000/buss`, params, {withCredentials: true});
        return stopAreas.data

    }catch (err){
        console.log(err)
        throw err

    }
}

export const getBusByStop = async (params: BusInfoDTO) => {
    try{
        const routes = await axios.post<RouteInformation[]>(`http://localhost:3000/buss/all`, params, {withCredentials: true});
        return routes.data

    }catch (err){
        console.log(err)
        throw err
    }
}

export const getUserLocation = async (params: LocationState) => {
    try{
        const routes = await axios.post<StopInformation>(`http://localhost:3000/buss/location`, params, {withCredentials: true});
        return routes.data

    }catch (err){
        console.log(err)
        throw err
    }
}

export const getBusTimeByStop = async (params: BusTimeDTO) => {
    try{
        const routes = await axios.post<TripTimeInformation[]>(`http://localhost:3000/buss/location/bus-time`, params, {withCredentials: true});
        return routes.data

    }catch (err){
        console.log(err)
        throw err
    }
}