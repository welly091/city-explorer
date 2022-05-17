import React, { Component } from 'react';
import { Form, Button, Image} from 'react-bootstrap'
import axios from 'axios'

export default class Explorer extends Component {
  constructor(props){
    super(props)
    this.state={
      city:"",
      lat:"",
      lon:"",
      visible:"none",
      showInfo:false,
      showError:false,
      statusCode:0
    }
  }

  updateCity = (e) => {
    this.setState({city: e.target.value})
  }

  handleCityInfo = async (e) => {
    e.preventDefault()
    await axios.get(`https://us1.locationiq.com/v1/search.php?ey=${process.env.REACT_APP_LOCATION_API_KEY}&format=json&q=${this.state.city}`)
    .then((res) =>{
      this.setState({lat:res.data[0].lat, lon:res.data[0].lon, visible:"inline", showInfo:true})
      console.log(this.state.lat + " " + this.state.lon)
    })
    .catch((error) =>{
      this.setState({showInfo:false, showError:true, statusCode:error.request.status})
      // console.log(error.request.status)
      console.log({error:"Unable to geocode"})
    })
  }

  render() {
    const{lat, lon, visible, showInfo, showError, statusCode} = this.state
    return (
      <div>
          <Form onSubmit={this.handleCityInfo}>
              <Form.Group className="m-2">
                  <Form.Label htmlFor="inputCity">Please Enter A City Name</Form.Label>
                  <Form.Control id="inputCity" placeholder="Enter city.."  onChange={this.updateCity}></Form.Control>
                  <Button variant="info" className="m-2" type="submit">Explorer!</Button>
              </Form.Group>
          </Form>
          {
            showInfo ? (<div>
            <div>City: {this.state.city}</div>
            <div>Latitude: {this.state.lat}</div>
            <div>Longtitude: {this.state.lon}</div>
            <Image thumbnail src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${lat},${lon}`} alt='map' style={{display:visible}}></Image>
          </div>)
            : showError ? <div>{statusCode} Error. Please try again.</div> : <div></div>
            
          }
          
      </div>
    )
  }
}