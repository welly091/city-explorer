import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Explorer from './components/Explorer/Explorer.jsx';
import Header from './components/Header/Header.jsx'


export default class App extends Component {
    render(){
      return (
      <div className='bg-dark'>
        <Header />
        <Explorer />
      </div>
    );
  }
}
  

