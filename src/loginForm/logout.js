import React from 'react';
import axios from 'axios';



export default class Logout extends React.Component{

  constructor(){
    super();

    this.handleLogoutAuth =this.handleLogoutAuth.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount(){
    this.logout();
  }



   logout(){

    const token = localStorage.getItem('tokenKey');
   console.log("token", token);
     axios
    .get("http://127.0.0.1:8000/api/logout"
     ,{
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+token
      },})  
      
    .then(res=>{
      
      console.log("logout res", res);
      this.handleLogoutAuth();
    
    }).catch((error)=>{
      alert(error);
        console.log("logout error", error.response)
       
    })
     
    }
  

  handleLogoutAuth(){
    this.props.history.push('./login');
  }


  render(
  ){

    

    return(
      <div>

    
      </div>
    );
  }
}