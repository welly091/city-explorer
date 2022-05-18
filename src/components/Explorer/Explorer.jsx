import React, { Component } from 'react';
import { Form, Button} from 'react-bootstrap'
import Weather from '../Weather/Weather.jsx';
import ShowMap from '../ShowMap/ShowMap.jsx';
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
      statusCode:0,
      weatherData:[],
    }
  }

  //Update the city value from Input  
  updateCity = (e) => {
    this.setState({city: e.target.value})
  }
  
  //axios.GET method
  handleCityInfo = async (e) => {
    e.preventDefault()
    await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&format=json&q=${this.state.city}`)
    .then((res) =>{
      this.setState({lat:res.data[0].lat, lon:res.data[0].lon, visible:"inline", showInfo:true})
      return this.connectToBackend()
    })
    .catch((error) =>{
      this.setState({showInfo:false, showError:true, statusCode:error.request.status})
      // console.log(error.request.status)
      console.log({error:"Unable to geocode"})
    })
  }

  connectToBackend = async() =>{
    if(this.state.isFound === false) return
    await axios.get(`${process.env.REACT_APP_SERVER}?name=${this.state.city}`)
    .then((res) =>{
        if(typeof res.data === 'string')this.setState({weatherData:[]})
        else this.setState({weatherData:res.data})
    }).catch((error) =>{
        this.setState({weatherData:[]})
        console.log({error: "Something went wrong."})
    })
  }

  render() {
    const{city, lat, lon, visible, showInfo, showError, statusCode, weatherData} = this.state
    return (
      <div className="text-light bg-dark">
          <Form onSubmit={this.handleCityInfo}>
              <Form.Group className="m-3 p-5">
                  <Form.Label htmlFor="inputCity">Please Enter A City Name</Form.Label>
                  <Form.Control id="inputCity" placeholder="Enter city.."  onChange={this.updateCity}></Form.Control>
                  <Button variant="info" className="m-2" type="submit">Explorer!</Button>
              </Form.Group>
          </Form>
          {
            showInfo ? (
            <div className='text-primary p-3'>
              <ShowMap city={city} lat={lat} lon={lon} visible={visible} />
              {
                weatherData.map((eachData,inx)=>{
                  return <Weather description={eachData.description} date={eachData.date} key={inx} />
                })
              }
            </div>
            ): showError ? <div>{statusCode} Error. Please try again.</div> : <div></div>
          }
      </div>
    )
  }
}
