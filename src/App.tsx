import React, {useEffect, useState} from 'react';
import './App.scss';
import {TextField, Autocomplete} from "@mui/material";
import {StopInformation} from "./types/StopInfo";
import {getStopAreas} from "./http/busAPI";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Bus from "./components/Bus";

const queryClient = new QueryClient();
function App() {



  return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
            <Bus/>

        </div>
      </QueryClientProvider>
  );
}

export default App;
