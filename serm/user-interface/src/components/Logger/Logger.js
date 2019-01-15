import React, { Component } from 'react'
import { RaisedButton, IconButton } from 'material-ui'
import InfoIcon from 'material-ui/svg-icons/action/info'
import ScrollArea from 'react-scrollbar'

import './Logger.css'
import Theme from '../../config/theme/Theme'
import Information from '../Information/Information'
import Events from './Events/Events'
import Result from '../Result/Result'
import Progress from '../Progress/Progress'

class Logger extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showInfo: false,
            showResult: false,
            startTime: Date.now()
        }
    }

    openInfo = () => this.setState({ showInfo: true })
    closeInfo = () => this.setState({ showInfo: false })
    openResult = () => this.setState({ showResult: true })
    closeResult = () => {
        this.props.handleStop()
        this.setState({ showResult: false })
    }

    showLogger() {
        if (!this.state.showResult && this.props.simulation.fetched && this.props.running) {
            return (
                <div>
                    <div className='simulator-container' 
                        style={{ backgroundColor: Theme.palette.canvasColor, 
                            color: Theme.palette.textColor }}>
                        <div className='simulator-history' 
                            style={{ backgroundColor: Theme.palette.accent1Color }}>
                            <div className='simulator-history-headers'>
                                <h2 style={{ width: '7%', marginRight: 5 }}>Time</h2>
                                <h2 style={{ width: '12%', marginRight: 5 }}>Endpoint</h2> 
                                <h2 style={{ width: '15%', marginRight: 5 }}>Location</h2>
                                <h2 style={{ width: '7.5%', marginRight: 5 }}>Type</h2>
                                <h2 style={{ width: '7.5%', marginRight: 5 }}>Product</h2>
                                <h2 style={{ width: '17%', marginRight: 5 }}>OS</h2>
                                <h2 style={{ width: '28%' }}>Message</h2>
                            </div>
                            <ScrollArea
                            speed={0.5}
                            className='simulator-history-content'
                            horizontal={false}>
                                <Events
                                speed={this.props.speed}
                                propogateCurrentEvent={this.props.propogateCurrentEvent}
                                handleCompletion={this.openResult} 
                                data={this.props.simulation.item}/>
                            </ScrollArea>
                        </div>
                        <div className='simulator-toolbar'>
                            <IconButton onClick={this.openInfo}
                            iconStyle={{ color: Theme.palette.textColor }}
                            style={{ float: 'left'}}>
                                <InfoIcon />
                            </IconButton>
                            <RaisedButton onClick={this.props.handleStop} label='Cancel' primary={true} style={{ float: 'left', marginLeft: 10, marginTop: 5 }}/>     
                            <span className='simulator-info'>
                                <p style={{ marginTop: 20 }}>
                                    <span>Simulating the effects of releasing </span>
                                    <strong>{this.props.simulation.item.request.malware.name}</strong> 
                                    <span> into the Internet of Things</span>
                                </p>
                            </span>
                        </div>
                    </div>
                    <Information open={this.state.showInfo} handleClose={this.closeInfo}/>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <Progress show={this.props.simulation.fetching}/>
                {this.showLogger()}
                <Result simulation={this.props.simulation} open={this.state.showResult} 
                handleClose={this.closeResult} />
            </div>
        )
    }
}

export default Logger