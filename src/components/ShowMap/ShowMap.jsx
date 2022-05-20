import React from 'react'
import { ListGroup } from 'react-bootstrap'
import './ShowMap.css'

const ShowMap = (props) => {  
    const{city, lat, lon}=props
    return (
        <ListGroup className='mb-1 showmapListGroup'>
            <ListGroup.Item variant="dark">City: {city}</ListGroup.Item>
            <ListGroup.Item variant="warning">Latitude: {lat}</ListGroup.Item>
            <ListGroup.Item variant="warning">Longtitude: {lon}</ListGroup.Item>
        </ListGroup>
        
    )
}

export default ShowMap;
