import { render } from '@testing-library/react';
import React from 'react';


export default class Dashboard extends React.Component{

  constructor(props){
    super(props);

    console.log("localStorage", localStorage.getItem("tokenKey"));
  }


  

  render(){
    return(
      <React.Fragment>
        <h1>Dashboard</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <p>{localStorage.getItem("tokenKey")}</p>
       
      </React.Fragment>
    )
  }
}