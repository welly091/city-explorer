import React, { Component } from 'react'
import {Carousel, ListGroup} from 'react-bootstrap'
import './FetchYelp.css'

export default class ShowMovies extends Component {
    constructor(props){
        super(props)
        this.state={
            yelpData:[]
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            yelpData: props.yelpData
        }
    }

  render() {
      const{yelpData} = this.state
    return (
        <ListGroup className='carousel mb-1'>
            <ListGroup.Item variant="dark"> Restaurants recommend by Yelp.com! </ListGroup.Item>
                <Carousel >
                {
                    yelpData.map((buss,inx) => (
                        <Carousel.Item key={inx} >
                            <Carousel.Caption className="caption">
                                <div>{buss.name}</div>
                                <div>Price: {buss.price}</div>
                                <div>Rating: {buss.rating}</div>
                                <a href={buss.url} className="yelp_link">Yelp Link</a>
                            </Carousel.Caption>
                            {
                                <img src={buss.image_url} alt={buss.name} ></img>
                            }    
                        </Carousel.Item>
                    ))
                }
                </Carousel>
        </ListGroup>
    )  
  }
}