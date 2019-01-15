import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Drawer, MenuItem, RaisedButton, SelectField, IconButton } from 'material-ui'
import InfoIcon from 'material-ui/svg-icons/action/info'

import { fetchMalware } from '../../actions/malwareActions'
import locations from '../../data/locations'
import Information from '../Information/Information'
import MalwareInformation from '../MalwareInformation/MalwareInformation'
import Theme from '../../config/theme/Theme'
import './Menu.css'

class Menu extends Component {
    constructor() {
        super()
        this.state = {
            malwareValue: null,
            malware: null,
            speedValue: 1,
            locationValue: 'Worldwide',
            disabled: true,
            showInfo: false,
            showMalwareInfo: false
        }
    }

    componentWillMount() {
        this.props.fetchMalware()
    }

    createMalwareMenuItems() {
        return this.props.malware.items.map(malware =>
            <MenuItem key={malware.name} value={malware.name} primaryText={malware.name} />
        )
      }

    handleMalwareChange = (event, index, malwareValue) => this.setState({ malware: this.getMalware(malwareValue), malwareValue, disabled: false })
    handleSpeedChange = (event, index, speedValue) => this.setState({ speedValue })
    handleLocationChange = (event, index, locationValue) => this.setState({ locationValue })

    openInfo = () => this.setState({ showInfo: true })
    closeInfo = () => this.setState({ showInfo: false })

    openMalwareInfo = () => this.setState({ showMalwareInfo: true })
    closeMalwareInfo = () => this.setState({ showMalwareInfo: false })

    getMalware(malwareValue) {
        for (var malware in this.props.malware.items) {
            if (this.props.malware.items[malware].name === malwareValue) {
                return this.props.malware.items[malware]
            }
        }
    }

    render() {
        return (
            <div>
                <Drawer
                docked={false}
                containerStyle={{ padding: 20 }}
                width={300}
                open={this.props.open}
                onRequestChange={this.props.onRequestChange}>
                    <div style={{ paddingTop: 50, height: '100%' }}>
                    
                        <h1 style={{ textAlign: 'center', marginBottom: 25 }}>serm</h1>
                        <SelectField
                        value={this.state.malwareValue}
                        autoWidth={true}
                        onChange={this.handleMalwareChange}
                        floatingLabelText='Select Malware'>
                            {this.createMalwareMenuItems()}
                        </SelectField>
                        {
                            this.state.malwareValue ?
                            <p style={{ 
                                textAlign: 'right', 
                                margin: 0,
                                marginTop: 10,
                                fontSize: 12, 
                                color: Theme.palette.alternateTextColor
                            }}>
                                <a onClick={this.openMalwareInfo}>
                                    About {this.state.malwareValue}
                                </a>
                            </p> : null
                        }
                        <SelectField
                        value={this.state.locationValue}
                        autoWidth={true}
                        onChange={this.handleLocationChange}
                        floatingLabelText='Location'
                        maxHeight={200}>
                            <MenuItem key={1} value='Worldwide' primaryText='Worldwide'/>
                            {
                                locations.map((location) =>
                                    <MenuItem key={location} value={location} primaryText={location}/>
                                )
                            }
                        </SelectField>
                        <SelectField
                        value={this.state.speedValue}
                        autoWidth={true}
                        onChange={this.handleSpeedChange}
                        floatingLabelText='Simulation Speed'>
                            <MenuItem key={1} value={1} primaryText='Normal'/>
                            <MenuItem key={2} value={2} primaryText='2x'/>
                            <MenuItem key={3} value={3} primaryText='3x'/>
                            <MenuItem key={5} value={5} primaryText='5x'/>
                            <MenuItem key={10} value={10} primaryText='10x'/>
                            <MenuItem key={20} value={20} primaryText='20x'/>
                        </SelectField>
                        <div style={{ paddingTop: 50, margin: 'auto', width: 100, height: 100 }}>
                            <RaisedButton 
                            disabled={this.state.disabled}
                            primary={true}
                            label='Release' 
                            onClick={() => this.props.handleRelease(this.state.malwareValue, {
                                'speed': this.state.speedValue,
                                'location': this.state.locationValue
                            })}/>
                        </div>
                        <div style={{ position: 'fixed', bottom: 15, right: 0 }}>
                            <IconButton onClick={this.openInfo}
                            iconStyle={{ color: Theme.palette.textColor }}>
                                <InfoIcon />
                            </IconButton>
                        </div>
                    </div>
                </Drawer>

                <Information 
                    open={this.state.showInfo} 
                    handleClose={this.closeInfo}/>

                {
                    this.state.malware ?
                    <MalwareInformation 
                    malware={this.state.malware} 
                    open={this.state.showMalwareInfo} 
                    handleClose={this.closeMalwareInfo}/>
                    : null
                }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      malware: state.malware,
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchMalware : () => dispatch(fetchMalware())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Menu)
