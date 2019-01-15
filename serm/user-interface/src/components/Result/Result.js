import React, { Component } from "react"
import { Dialog, RaisedButton, IconButton } from "material-ui"
import InfoIcon from "material-ui/svg-icons/action/info"

import "./Result.css"
import Information from "../Information/Information"
import Theme from '../../config/theme/Theme'

class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showInfo: false
        }
    }

    openInfo = () => this.setState({ showInfo: true, open: false })
    closeInfo = () => this.setState({ showInfo: false, open: true })
    openLogs = () => {
        let logs = {
            events: [],
            statistics: {}
        }
        const events = this.props.simulation.item["events"]

        for (var e in events) {
            let condensed_event = {
                time: events[e]["time"]["formatted_timestamp"],
                endpoint: events[e]["device"]["ip"] + ":" + events[e]["device"]["port"],
                location: events[e]["device"]["location"],
                type: events[e]["device"]["type"],
                product: events[e]["device"]["product"],
                os: events[e]["device"]["os"],
                message: events[e]["message"]
            }
            logs["events"].push(condensed_event)
        }

        logs["statistics"] = this.props.simulation.item["statistics"]

        let json_logs = JSON.stringify(logs, null, 2)
        let logWindow = window.open()
        logWindow.document.open()
        logWindow.document.write("<html><head><title>Logs</title></head><body><pre>" + 
            json_logs + "</pre></body></html>")
        logWindow.document.close()
    }

    render() {
        return (
            this.props.open ?
            <div>
                <Dialog
                open={this.props.open}
                onRequestClose={this.props.handleClose}>
                    <div className="window window-content" style={{color: Theme.palette.alternateTextColor, fontSize: 12}}>
                        <p>Simulating the effects of releasing <strong>{this.props.simulation.item.request.malware.name}</strong> into the Internet of Things</p>
                        <br/>
                        <p><strong>{this.props.simulation.item.statistics.total_infected}</strong> devices infected</p>
                        <p><strong>{this.props.simulation.item.statistics.total_clean}</strong> devices failed to infect</p>
                        <p><strong>{this.props.simulation.item.statistics.total_devices}</strong> devices total</p>
                        <br/>
                        <p>Simulation run for <strong>{this.props.simulation.item.statistics.run_time}</strong></p>
                        <br/>
                    </div>
                    <div>
                        <RaisedButton label="View Logs" primary={true} onClick={this.openLogs}/>
                        <IconButton onClick={this.openInfo}
                        iconStyle={{ color: Theme.palette.textColor }}
                        style={{ float: "right"}}>
                            <InfoIcon />
                        </IconButton>
                    </div>
                </Dialog>
                <Information open={this.state.showInfo} handleClose={this.closeInfo}/>
            </div>
            : null
        )
    }
}

export default Result