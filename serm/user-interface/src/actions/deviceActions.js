import axios from 'axios'

import { API_URL } from '../config/AppConfig'

export function fetchDevices() {
  return function(dispatch) {
    dispatch({type: 'FETCH_DEVICES'})
    axios.get(API_URL + '/devices')
      .then((response) => {
        dispatch({type: 'FETCH_DEVICES_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_DEVICES_REJECTED', payload: err})
      })
  }
}