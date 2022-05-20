import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import SpecificForecast from './SpecificForecast/SpecificForecast'
import './ForecastWeather.css'

export default class ForecastWeather extends Component {
    constructor(props){
        super(props)
        this.state={
            weatherForecast:[],
            date:'',
            description:'',
            show:false
            
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            weatherForecast: props.weatherForecast
        }
    }

    handelClick = (e) =>{
        const index = e.target.getAttribute('value')
        this.setState({
            date: this.state.weatherForecast[index].date,
            description: this.state.weatherForecast[index].description,
            show:true
        })
    }

  render() {
    const{weatherForecast, date, description, show} = this.state
    console.log(date)
    return (
        <div>
            <Dropdown className='mb-1 forecast'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Daily Weather Forecast
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        weatherForecast.map((forecast,inx) => (
                            <Dropdown.Item key={inx} value={inx} variant="warning" onClick={this.handelClick}>Date: {forecast.date}</Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
            {
                show ? <SpecificForecast date={date} description={description}/> : <div></div>
            }
        </div>
    )
  }
}
