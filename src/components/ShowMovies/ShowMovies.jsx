import React, { Component } from 'react'
import {Carousel, ListGroup} from 'react-bootstrap'
import './ShowMovies.css'

export default class ShowMovies extends Component {
    constructor(props){
        super(props)
        this.state={
            movieDataArray:[]
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            movieDataArray: props.movieDataArray
        }
    }

  render() {
      const{movieDataArray} = this.state
    return (
        <ListGroup className='carousel mb-1'>
            <ListGroup.Item variant="dark">Movies that includes this city name: </ListGroup.Item>
                <Carousel >
                {
                    movieDataArray.map((movie,inx) => (
                        <Carousel.Item key={inx} >
                            <Carousel.Caption className="caption">
                                <div>{movie.title}</div>
                                <div>{movie.release_on}</div>
                            </Carousel.Caption>
                            {
                                movie.image_url.match(/w500null$/) ? <img src='https://advancepetproduct.com/wp-content/uploads/2019/04/no-image.png' alt='noImage' width="500"></img> :
                                <img src={movie.image_url} alt={movie.title} ></img>
                            }    
                        </Carousel.Item>
                    ))
                }
                </Carousel>
        </ListGroup>
    )  
  }
}
