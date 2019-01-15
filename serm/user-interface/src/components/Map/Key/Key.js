import React, { Component } from 'react'
import { Paper } from 'material-ui'

import Theme from '../../../config/theme/Theme'
import './Key.css'

const style = {
    paperStyle: {
        position: 'fixed',
        padding: 5,
        zIndex: 700,
        top: 10,
        right: 50,
        display: 'inline-block',
        backgroundColor: Theme.palette.canvasColor
    },
    markerStyle: {
        width: 5,
        height: 5,
        borderRadius: 10
    },
    textStyle: {
        color: Theme.palette.alternateTextColor,
        fontSize: 9
    }
  };
  

class Key extends Component {
    render() {
        return (
            <Paper className='window' style={style.paperStyle} zDepth={2}>
                <div>
                    <div style={{ marginBottom: 2 }}>
                        <div style={{ padding: 7, float: 'left' }}>
                            <div style={{...{backgroundColor: 'white'}, ...style.markerStyle}}/>
                        </div>
                        <span style={style.textStyle}>DEFAULT</span>
                    </div>
                    <div style={{ marginBottom: 2 }}>
                        <div style={{ padding: 7, float: 'left' }}>
                            <div style={{...{backgroundColor: 'yellow'}, ...style.markerStyle}}/>
                        </div>
                        <span style={style.textStyle}>FAILED TO INFECT</span>
                    </div>
                    <div style={{ marginBottom: 2 }}>
                        <div style={{ padding: 7, float: 'left' }}>
                            <div style={{...{backgroundColor: 'red'}, ...style.markerStyle}}/>
                        </div>
                        <span style={style.textStyle}>INFECTED</span>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default Key