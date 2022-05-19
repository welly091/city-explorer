import React, { Component } from 'react';
import { Form, Button, Image} from 'react-bootstrap'
import axios from 'axios'
import Weather from '../Weather/Weather.jsx';
import ShowMap from '../ShowMap/ShowMap.jsx';
import ShowMovies from '../ShowMovies/ShowMovies.jsx';
import './Explorer.css'

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
      weatherDataObj:{},
      movieDataArray:[]
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
      let lat = parseFloat(res.data[0].lat).toFixed(2)
      let lon = parseFloat(res.data[0].lon).toFixed(2)
      this.setState({lat, lon, visible:"inline", showInfo:true})
      this.getWeatherData(lat, lon)
      this.getMovieData(this.state.city)
    })
    .catch((error) =>{
      this.setState({showInfo:false, showError:true, statusCode:error.request.status})
      // console.log(error.request.status)
      console.log({error:"Unable to geocode"})
    })
  }

  getWeatherData = async(lat ,lon) =>{
    if(this.state.isFound === false) return
    await axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`)
    .then((res) =>{
      console.log(res.data)
        if(typeof res.data === 'string')this.setState({weatherDataObj:{}})
        else this.setState({weatherDataObj:res.data})
    }).catch((error) =>{
        this.setState({weatherDataObj:{}})
        console.log({error: "Something went wrong."})
    })
  }

  getMovieData = async(city) =>{
    if(this.state.isFound === false) return
    await axios.get(`${process.env.REACT_APP_SERVER}/movie?city=${city}`)
    .then((res) =>{
      console.log(res.data)
      this.setState({movieDataArray: res.data})
    }).catch((error) =>{
      this.setState({movieDataArray: []})
      console.log({error:"Something went wrong"})
    })
  }

  render() {
    const{city, lat, lon, visible, showInfo, showError, statusCode, weatherDataObj, movieDataArray} = this.state
    return (
      <div className="text-light bg-dark">
          <Form onSubmit={this.handleCityInfo}>
              <Form.Group className="">
                  <Form.Label htmlFor="inputCity">Please Enter A City Name</Form.Label>
                  <Form.Control id="inputCity" placeholder="Enter city.."  onChange={this.updateCity}></Form.Control>
                  <Button variant="info" className="m-2" type="submit">Explorer!</Button>
              </Form.Group>
          </Form>
          {
            showInfo ? (
            <div className='text-primary p-3'>
              <ShowMap city={city} lat={lat} lon={lon} visible={visible} />
              <Weather windSpeed={weatherDataObj.WindSpeed} temp={weatherDataObj.temp} humidity={weatherDataObj.humidity} description={weatherDataObj.description} />
              <ShowMovies movieDataArray={movieDataArray}></ShowMovies>
              <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${lat},${lon}&zoom=12`} alt='map' style={{display:visible}} width="500"></Image>
            </div>
            ): showError ? <div>{statusCode} Error. Please try again.</div> : <div></div>
          }
      </div>
    )
  }
}
