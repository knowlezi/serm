import React, { Component } from 'react'
import { Map as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet'
import { IconButton } from 'material-ui'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'

import './Map.css'
import Theme from '../../config/theme/Theme'
import Devices from './Devices/Devices'
import Device from '../../entities/Device'
import DeviceInformation from './Devices/DeviceInformation'
import Key from './Key/Key'

class Map extends Component {
    constructor() {
        super()
        this.state = {
            infoOpen: false,
            deviceClicked: Device
        }
    }

    onDeviceClick = (device) => {
        this.setState({ infoOpen: true, deviceClicked: device })
    }
    
    onInformationClose = () => this.setState({ infoOpen: false, deviceClicked: Device })

    render() {
        return (
            <div>
                <LeafletMap minZoom={5} maxZoom={14} maxBoundsViscosity={1} 
                worldCopyJump={true} center={[-15, 15]}
                zoom={5} zoomControl={false}>
                    <ZoomControl position='topright'/>
                    
                    <TileLayer url='//cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png'/>

                    <Devices 
                    currentEvent={this.props.currentEvent}
                    onDeviceClick={this.onDeviceClick} 
                    propogateDevices={this.props.propogateDevices}
                    running={this.props.running}/>

                    <IconButton 
                    onClick={this.props.toggleMenu}
                    style={{
                        position: 'relative',
                        zIndex: 700
                    }}
                    iconStyle={{ color: Theme.palette.textColor }}>
                        <MenuIcon />
                    </IconButton>

                    <Key/>
                </LeafletMap>

                <DeviceInformation
                device={this.state.deviceClicked}
                malware={this.props.malware}
                open={this.state.infoOpen}
                handleClose={this.onInformationClose}/>
            </div>
        )
    }
}

export default Map