import React from 'react';

export default class Home extends React.Component{

  constructor(props){
    super(props);

   
  }

 

  render(){
    return(
      <React.Fragment>
        <h1>Home</h1>
        <h1>status: {this.props.loggedInStatus}</h1>
      </React.Fragment>
    )
  }
}