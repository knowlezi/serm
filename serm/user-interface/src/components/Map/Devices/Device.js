import React, { Component } from 'react'
import { CircleMarker } from 'react-leaflet'

import './Device.css'

class Device extends Component {
    constructor() {
        super()
        this.state = {
            radius: 3,
            opacity: 0.5,
            color: 'white'
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.infectionStatus !== this.props.infectionStatus) {
            return true
        } else if (nextProps.running !== this.props.running) {
            return true
        } else {
            return false
        }
    }

    componentDidUpdate() {
        switch (this.props.infectionStatus) {
            case 1:
                this.setState({ color: 'red' })
                break
            case -1:
                this.setState({ color: 'yellow' })
                break          
            default:
                this.setState({ color: 'white' })
                break
        }
    }

    render() {
        return (
            <CircleMarker
                center={[this.props.device.location.latitude, this.props.device.location.longitude]} 
                radius={this.state.radius}
                color={this.state.color}
                pane='markerPane'
                fillOpacity={this.state.opacity}
                weight={0}
                onClick={() => this.props.onDeviceClick(this.props.device)}
                onMouseOver={(e) => e.target.setStyle({ color: 'cyan', opacity: 1 })}
                onMouseOut={(e) => e.target.setStyle({ color: this.state.color, opacity: 0.5 })}
            />
        )
    }
}

export default Device