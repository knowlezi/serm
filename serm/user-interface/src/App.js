import React, { Component } from 'react'
import { connect } from 'react-redux'


import './App.css'
import { fetchSimulation } from './actions/simulatorActions'
import Map from './components/Map/Map'
import Logger from './components/Logger/Logger'
import Menu from './components/Menu/Menu'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false,
      speed: 1,
      devices: [],
      malware: null,
      event: null,
      running: false
    }
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  handleRelease(malware, params) {
    this.props.fetchSimulation(this.state.devices, malware, params)

    this.setState({
      menuOpen: false,
      malware: malware,
      speed: params.speed,
      running: true
    })
  }

  stopSimulation() {
    this.setState({ simulation: null, running: false, event: null, speed: 1 })
  }

  setDevices = (devices) => this.setState({ devices })

  setCurrentEvent = (event) => this.setState({ currentEvent: event })

  render() {
    return (
        <div className='app'>
          <Menu 
            open={this.state.menuOpen} 
            handleRelease={this.handleRelease.bind(this)} 
            onRequestChange={(menuOpen) => this.setState({menuOpen})} 
          />

          <Map
            currentEvent={this.state.currentEvent} 
            propogateDevices={this.setDevices} 
            toggleMenu={this.toggleMenu}
            malware={this.state.malware}
            running={this.state.running}/>

          <Logger
            simulation={this.props.simulation}
            running={this.state.running}
            propogateCurrentEvent={this.setCurrentEvent}
            speed={this.state.speed}
            handleStop={this.stopSimulation.bind(this)}
          />
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    simulation: state.simulation,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSimulation : (devices, malware, params) => dispatch(fetchSimulation(devices, malware, params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)