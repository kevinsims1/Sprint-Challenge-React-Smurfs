import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom'

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    console.log('CDM now running');
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        console.log(res);
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });
  }

  
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
          <nav>
          <h1 className="store-header">Kevs Smurfs</h1>
          <div className="nav-links">
            
            <NavLink exact to="/">
              Smurfs
            </NavLink><br/>
            <NavLink to="/smurf-form">Smurfs form</NavLink>
          </div>
        </nav>


        <Route exact path="/"  render={
            props => <Smurfs {...props} smurfs={this.state.smurfs}  />
          } />

        <Route
          path="/smurf-form"
          exact
          render={
            props => <SmurfForm {...props} addSmurf={this.addSmurf} />
          }
        />
        {/* <SmurfForm /> 
        <Smurfs smurfs={this.state.smurfs} /> */}
      </div>
    );
  }
}

export default App;
