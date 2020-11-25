import Axios from 'axios';
import React from 'react';
import axios from 'axios';

export default class ShowTodayTask extends React.Component{

  state = {
    task : []
  }

  // componentDidMount(){
  //   this.tasks();
  // }
  fatchData();

  fatchData(){
    const token = localStorage.getItem('tokenKey');
    console.log("token", token);
    const baseUrl="http://127.0.0.1:8000/api/today/task";
    axios.get(baseUrl,
        {
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer '+token
          },}
      
      ).then(response=>{
        console.log(response);
        })
      .catch(error=>{
        console.log(error.response);
      })

    }


  render(){
    return(
      <p>task</p>
    )
  }

}