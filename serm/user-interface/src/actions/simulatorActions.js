import axios from 'axios'

import { API_URL } from '../config/AppConfig'

export function fetchSimulation(devices, malware, params) {
  return function(dispatch) {
    dispatch({type: 'FETCH_SIMULATION'})
    axios.post(
      API_URL + '/sim',
      {
        malware,
        devices,
        params
      }
    ).then(response => {
      dispatch({type: 'FETCH_SIMULATION_FULFILLED', payload: response.data})
    })
    .catch(err => {
      dispatch({type: 'FETCH_SIMULATION_REJECTED', payload: err})  
    })
  }
}

