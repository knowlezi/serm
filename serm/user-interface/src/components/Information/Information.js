import React, { Component } from 'react'
import Radium from 'radium'
import { Dialog } from 'material-ui'

import './Information.css'
import Theme from '../../config/theme/Theme'

const style = {
    link: {
        color: Theme.palette.alternateTextColor,
        textDecoration: "none",
        ":hover": { 
            color: Theme.palette.primary3Color, 
            textDecoration: "none"
        }
    }
}

class Information extends Component {
    render() {
        return (
            <Dialog
            open={this.props.open}
            onRequestClose={this.props.handleClose}>
                <span className='window window-title' style={{color: Theme.palette.textColor}}>
                    Information
                </span>
                <div className='window window-content' style={{color: Theme.palette.alternateTextColor}}>
                    <div>
                        <span>
                            <p>
                            The emergence of the Internet of Things has caused a variety of issues in the 
                            world of cyber security. Many device manufacturers are distributing 
                            insecure devices to customers and many customers are unaware of how to keep 
                            their devices secure. This has allowed the Internet of Things to become a 
                            goldmine for hackers.
                            </p>
                            <p>
                            <span>To further assist in raising awareness of the insecurities of the Internet of 
                            Things this project aims to demonstrate how vulnerable the Internet of Things 
                            by simulating the propagation of malware on real devices using data provided by </span>
                            <a key="ShodanAttribution" style={style.link} href="http://shodan.io">
                                <span style={{ fontWeight: 400 }}>Shodan</span>
                            </a>.
                            </p>
                        </span>
                    </div>
                    <p style={{ marginTop: 30, fontWeight: 400, fontSize: 12 }}> 
                        <a key="LeafletAttribution" style={style.link} href="http://leafletjs.com">Leaflet</a>
                        <span> | </span>
                        &copy; <a key="OSMAttribution" style={style.link }
                        href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
                        <span> </span>
                        &copy; <a key="CartoDBAttribution" style={style.link}
                        href="http://cartodb.com/attributions">CartoDB</a>
                    </p>
                </div>
            </Dialog>
        )
    }
}
  
export default Radium(Information)