import {useQuery, useMutation} from "react-query";
import {StopInformation} from "../types/StopInfo";
import {getBusByStop, getBusTimeByStop, getStopAreas, getStopByArea, getUserLocation} from "../http/busAPI";
import React, {useEffect, useState} from "react";
import {Autocomplete, TextField, } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {LocationState} from "../types/LocationState";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {RouteInformation} from "../types/RouteInformation";
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PlaceIcon from '@mui/icons-material/Place';
import ExploreIcon from '@mui/icons-material/Explore';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import "./bus.scss"

const Bus = () => {
    const [selectedArea, setSelectedArea] = useState<StopInformation | null>(null)
    const [selectedStop, setSelectedStop] = useState<StopInformation[] | null>(null)
    const [selectedBusStop, setSelectedBusStop] = useState<StopInformation | null>(null);

    const [closestStopInArea, setClosestStopInArea] = useState<StopInformation | null>(null);

    const [location, setLocation] = useState<LocationState>({ user_lat: null, user_lon: null });

    const [expanded, setExpanded] = React.useState<string | false>(false);


    const { data: stopAreas, error, isLoading } = useQuery<StopInformation[]>('stopAreas', getStopAreas);

    const { mutate, data: busStops } = useMutation(getStopByArea);
    const { mutate: getBuses, data: buses } = useMutation(getBusByStop);
    const { mutate: getClosestStop, data: closestStop } = useMutation(getUserLocation);
    const { mutate: getBusTimes, data: busTimes } = useMutation(getBusTimeByStop);


    useEffect(() => {
        if (busStops){
            setSelectedStop(busStops)
        }

    }, [busStops]);

    useEffect(() => {
        if (selectedArea){
            mutate({stop_area: selectedArea.stop_area});
        } else {
            setSelectedStop(null);
            setSelectedBusStop(null);
        }
    }, [selectedArea]);

    useEffect(() => {
        if (selectedBusStop){
            getBuses({stop_id: selectedBusStop.stop_id})
        }

    }, [selectedBusStop]);

    const detectLocation = () => {

        navigator.geolocation.getCurrentPosition((position) => {

            getClosestStop({user_lat: position.coords.latitude, user_lon:position.coords.longitude})
        }, () => {
            console.log("Unable to retrieve your location")
        });
    }
    useEffect(() => {
        if (closestStop){
            setClosestStopInArea(closestStop)
            setSelectedArea(closestStop)
            setSelectedBusStop(closestStop)

        }
    }, [closestStop]);



    const handleChange = (panel: string, bus: RouteInformation) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);

        if (isExpanded) {
            getBusTime(bus);
        }
    };

    const getBusTime = (bus: RouteInformation) => {
        const currentTime = new Date().toLocaleTimeString()

        if (selectedBusStop){
            console.log(bus.route_short_name);
            console.log(selectedBusStop.stop_id);
            getBusTimes({stop_id: selectedBusStop.stop_id, route_short_name: bus.route_short_name, currentTime: currentTime})
        }

    };


    return (
        <div className="main-bus">


            {/*<Button variant="outlined" onClick={() => detectLocation()} style={{textTransform: 'none', fontSize: '16px'}}>*/}
            {/*    <LocationOnTwoToneIcon/>*/}

            {/*    My location*/}
            {/*</Button>*/}
            <div className="main-btns">
                {stopAreas && (
                    <Autocomplete
                        id="auto-complete"
                        options={stopAreas}
                        getOptionLabel={(option: StopInformation) => option.stop_area}
                        sx={{width: 300}}
                        onChange={(event, newValue) => setSelectedArea(newValue)}
                        value={selectedArea}
                        isOptionEqualToValue={(option, value) => option.stop_area === value.stop_area}
                        autoComplete
                        includeInputInList
                        renderInput={(params) => <TextField {...params} variant="standard" label="Enter your Stop Area"/>}
                    />
                )}

                <Autocomplete
                    id="disabled"
                    options={selectedStop || []}
                    getOptionLabel={(option: StopInformation) => `${option.stop_name} ${option.stop_code}`}
                    sx={{width: 300}}
                    disabled={!selectedStop ? true : false}
                    value={selectedBusStop}
                    onChange={(event, newValue) => setSelectedBusStop(newValue)}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField {...params} label="Enter your Bus Stop" variant="standard"/>
                    )}
                />

                <IconButton aria-label="locationon"  onClick={() => detectLocation()} >
                    <PlaceIcon fontSize="large"/>
                </IconButton>
            </div>


            <div>
                {selectedBusStop && (
                    <>
                        {buses && buses.map((bus, index) => (
                            <Accordion key={bus.id} expanded={expanded === `panel${index}`}
                                       onChange={handleChange(`panel${index}`, bus)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}bh-content`}
                                    id={`panel${index}bh-header`}
                                >
                                    <Typography sx={{width: '33%', flexShrink: 0}}>
                                        {bus.route_short_name}
                                    </Typography>
                                    <Typography sx={{color: 'text.secondary'}}>
                                        {bus.route_long_name}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                        <TableContainer sx={{ maxHeight: 440 }}>
                                            <Table sx={{ minWidth: 650 }}  aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Trip Headsign</TableCell>
                                                        <TableCell align="right">Arrival Time</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {busTimes && busTimes.map((time) => (
                                                        <TableRow
                                                            key={time.trip_id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {time.trip_headsign}
                                                            </TableCell>
                                                            <TableCell align="right">{time.arrival_time}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </>
                )}
            </div>

        </div>
    )
}

export default Bus;