import React, { Component } from 'react'
import LinearProgress from 'material-ui/LinearProgress'

const style = {
    position: 'fixed',
    top: 0,
    zIndex: 700,
    borderRadius: 0
}

class Progress extends Component {
    render() {
        return (
            this.props.show ?
            <LinearProgress style={style} mode='indeterminate' />
            : null
        )
    }
}

export default Progress