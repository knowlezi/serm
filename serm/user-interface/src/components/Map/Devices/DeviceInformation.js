import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'

import Theme from '../../../config/theme/Theme'
import './DeviceInformation.css'

class DeviceInformation extends Component {
    getLocation(device) {
        if (device.location.city && device.location.city !== '' &&
         device.location.country_name && device.location.country_name !== '') {
            return <div>{device.location.city + ', ' + device.location.country_name}</div>
        } else if (device.location.city && device.location.city !== '') {
            return <div>{device.location.city}</div>
        } else if (device.location.country_name && device.location.country_name !== '') {
            return <div>{device.location.country_name}</div>
        }
    }

    render() {
        return (
            <Dialog
            key={this.props.device.id}
            open={this.props.open}
            onRequestClose={this.props.handleClose}>
                <span className='window window-title' style={{color: Theme.palette.textColor}}>
                    {this.props.device.ip + ':' + this.props.device.port}
                    <span className='window window-subtitle' style={{color: Theme.palette.alternateTextColor}}>
                        {this.getLocation(this.props.device)}
                    </span>
                </span>
                <div className='window window-content' style={{color: Theme.palette.alternateTextColor}}>
                    {this.props.device.type && this.props.device.type !== '' ? <div><strong>Type:</strong> {this.props.device.type}</div> : null}
                    {this.props.device.product && this.props.device.product !== '' ? <div><strong>Product:</strong> {this.props.device.product}</div> : null}
                    {this.props.device.os && this.props.device.os !== '' ? <div><strong>Operating System:</strong> {this.props.device.os}</div> : null}
                </div>
            </Dialog>
        )
    }
}

export default DeviceInformation