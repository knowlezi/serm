import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Event from './Event'

class Events extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            timer: null,
            elapsed: 0,
            eventIndex: 0,
            device: null
        }
    }

    componentDidMount() {
        this.setState({ timer: setInterval(this.tick.bind(this), 1000 / this.props.speed) })
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    tick() {
        this.setState({ elapsed: this.state.elapsed + 1000 })

        if (this.props.data) {
            if (this.state.eventIndex >= this.props.data.events.length) {
                this.props.handleCompletion()
            } else {
                this.appendEventsOverTime()
            }
        }
    }

    appendEventsOverTime() {
        for (this.state.eventIndex; this.state.eventIndex < this.props.data.events.length;) {
            const event = this.props.data.events[this.state.eventIndex]

            if (event.time.ms < this.state.elapsed) {
                this.props.propogateCurrentEvent(event)

                this.state.events.push(
                    <Event key={event.id} event={event}/>
                )

                if (this.state.events.length > 100) {
                    this.setState({
                        events: this.state.events.slice(this.state.events.length - 100)
                    })
                }

                this.setState({ eventIndex: this.state.eventIndex + 1 })
                this.context.scrollArea.scrollBottom()
            } else {
                break
            }
        }
    }

    render() {
        return (
            this.props.data
            ?
            <div>
                {this.state.events}
            </div>
            :
            null
        )
    }
}
 
Events.contextTypes = {
    scrollArea: PropTypes.object
}

export default Events