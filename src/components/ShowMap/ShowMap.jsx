import React from 'react'
import { Image } from 'react-bootstrap'

export default (props) => {  
    const{city, lat, lon, visible}=props
    return (
        <div>
            <div className='m-4'>
                <div>City: {city}</div>
                <div>Latitude: {lat}</div>
                <div>Longtitude: {lon}</div>
              </div>
              <Image roundedCircle src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${lat},${lon}&zoom=12`} alt='map' style={{display:visible}}></Image>
        </div>
    )
}
