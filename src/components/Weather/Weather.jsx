import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import './Weather.css'

export default class Weather extends Component {
    render() {
        return (
            <ListGroup className='mb-1 listgroup'>
                <ListGroup.Item variant="dark">Weather</ListGroup.Item>
                <ListGroup.Item variant="warning">Description: {this.props.description}</ListGroup.Item>
                <ListGroup.Item variant="warning">Temperature: {this.props.temp}</ListGroup.Item>
                <ListGroup.Item variant="warning">Wind Speed: {this.props.windSpeed}</ListGroup.Item>
                <ListGroup.Item variant="warning">Humidity: {this.props.humidity}</ListGroup.Item>
            </ListGroup>
        )
    }
}
