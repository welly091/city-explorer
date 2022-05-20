import React, { Component } from 'react'
import{ ListGroup } from 'react-bootstrap'
import './SpecificForecast.css'

export default class SpecificForecast extends Component {
  render() {
    return (
        <ListGroup className='mb-1 sf'>
            <ListGroup.Item variant="info">{this.props.date}</ListGroup.Item>
            <ListGroup.Item variant="light">{this.props.description}</ListGroup.Item>
        </ListGroup>
    )
  }
}
