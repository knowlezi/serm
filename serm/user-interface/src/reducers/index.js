import { combineReducers } from 'redux'

import devices from './devicesReducer'
import malware from './malwareReducer'
import simulation from './simulationReducer'

export default combineReducers({
  devices, 
  malware,
  simulation
})