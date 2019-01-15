import React, { Component } from 'react'

class Event extends Component {
    getLocation = (event) => {
        if (event.device.location.city && event.device.location.country_name) {
            return event.device.location.city + ", " + event.device.location.country_name
        } else if (event.device.location.country_name) {
            return event.device.location.country_name
        } else if (event.device.location.city) {
            return event.device.location.city
        } else {
            return "N/A"
        }
    }

    render() {
        const event = this.props.event

        return (
            <div style={{ width: '100%', marginBottom: 5 }}>
                <div style={{ width: '7%', display: 'inline-block', verticalAlign: 'top', marginRight: 5 }}>
                    {event.time.formatted_timestamp}
                </div>
                <div style={{ width: '12%', display: 'inline-block', verticalAlign: 'top', marginRight: 5 }}>
                    {event.device.ip + ":" + event.device.port}
                </div>
                <div style={{ width: '15%', display: 'inline-block', verticalAlign: 'top', marginRight: 5 }}>
                    {this.getLocation(event)}
                </div>
                <div style={{ width: '7.5%', display: 'inline-block', verticalAlign: 'top', marginRight: 5 }}>
                    {event.device.type ? event.device.type : "N/A"}
                </div>
                <div style={{ width: '7.5%', display: 'inline-block', verticalAlign: 'top', marginRight: 5 }}>
                    {event.device.product ? event.device.product : "N/A"}
                </div>
                <div style={{ width: '17%', display: 'inline-block', verticalAlign: 'top', marginRight: 5 }}>
                    {event.device.os ? event.device.os : "N/A"}
                </div>
                <div style={{ width: '28%', display: 'inline-block', verticalAlign: 'top' }}>
                    {event.message}
                </div>
            </div>
        )
    }
}

export default Event