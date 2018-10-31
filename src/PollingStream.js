import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subject } from "rxjs"
import makePollingStream from './makePollingStream'

class PollingStream extends Component {
    constructor(props) {
        super(props)
        this.start$ = new Subject();
        this.stop$ = new Subject();
        this.polling = makePollingStream({
            interval: props.interval,
            start$: this.start$,
            stop$: this.stop$
        })
    }

    start = () => this.start$.next()
    stop = () => this.stop$.next()

    render() {
        const Stream = this.polling;
        return (
            <Stream route={this.props.route}>
                {response => this.props.children(response)}
            </Stream>
        );
    }
}

PollingStream.propTypes = {
    route: PropTypes.string.isRequired,
    interval: PropTypes.number.isRequired
}

PollingStream.defaultProps = {
    start$: PropTypes.string.isRequired,
    stop$: PropTypes.number.isRequired
}

export default PollingStream;