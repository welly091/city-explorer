import React, { Component } from 'react'

export default class Weather extends Component {
    render() {
        return (
        <div>
            <div>Description: {this.props.description}</div>
            <div>Date: {this.props.date}</div>
        </div>
        )
    }
}
