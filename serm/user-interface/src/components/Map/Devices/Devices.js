import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchDevices } from '../../../actions/deviceActions'
import Device from './Device'
import './Devices.css'
import Progress from '../../Progress/Progress'

class Devices extends Component {
  componentWillMount() {
    this.props.fetchDevices()
  }

  componentDidUpdate() {
    this.props.propogateDevices(this.props.devices.items)
  }

  getInfectionStatus(device) {
    if (device && this.props.currentEvent) {
      if (device['_id']['$oid'] === this.props.currentEvent['device']['_id']['$oid']) {
        return this.props.currentEvent['infection_status']
      }
    }

    return 0
  }

  render() {
    return (
      <div>
        <Progress show={this.props.devices.fetching}/>
        {this.props.devices.items.map(device => 
          <Device 
          key={device['_id']['$oid']} device={device}
          infectionStatus={this.getInfectionStatus(device)}
          onDeviceClick={() => this.props.onDeviceClick(device)}
          running={this.props.running}/>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    devices: state.devices,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDevices : () => dispatch(fetchDevices())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Devices)