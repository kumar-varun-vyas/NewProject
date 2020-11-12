import React from 'react';
import './App.css';
import Home from './loginForm/home';
 import Login from './loginForm/Login';
import Register from './loginForm/Register';
import Dashboard from './loginForm/dashboard';
import Logout from './loginForm/logout';
//  import Logout from './loginForm/logout'
import {
  BrowserRouter ,
  Route, Link, Switch
}from 'react-router-dom';

import { withRouter } from 'react-router';




class App extends React.Component {

  constructor(){
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user:{}
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout =this.handleLogout.bind(this);
  }

  handleLogin(data){
    this.setState({
      loggedInStatus : "LOGGED_IN",
      user : data
    })
  }
  
  handleLogout(e){
    this.setState({
      loggedInStatus : "NOT_LOGGED_IN",
      user : {}
    });
    // this.props.history.push('/login')
    // localStorage.setItem("tokenKey",null);
  }
 
  
  render(){
  return (
    <div className="App">
    <BrowserRouter>
      <div>
        <ul className="nav">
        <li>
          <Link style={{ color:"blue",display:"block", textAlign:"center",
            textDecoration:"none" }}
            to="/logout"
             onClick={(e)=>this.handleLogout(e)}
             >Logout</Link>
          </li>
         
            <li>
            <Link style={{ color:"blue",display:"block", textAlign:"center",
            textDecoration:"none" }} to="/register">Register</Link>
          </li>
          <li>
          <Link style={{ color:"blue",display:"block", textAlign:"center",
            textDecoration:"none",marginRight:10 }} 
            to="/login" 
            >Login</Link>
            </li>
         
        </ul>
        <Switch>
        <Route
          path="/logout"
          component= {Logout}

        ></Route>
        <Route exact 
        path="/register" 
        render = {props=>(
              <Register {...props} handleLogin={this.handleLogin}  loggedInStatus ={this.state.loggedInStatus}/>
            )}
            
            ></Route>
        
          <Route exact
            path ="/" 
            render = {props=>(
              <Home {...props} handleLogin={this.handleLogin}  loggedInStatus ={this.state.loggedInStatus}/>
            )}

          
           ></Route>
          <Route exact 
          path="/login" 
          render = {props=>(
              <Login {...props} handleLogin={this.handleLogin}  loggedInStatus ={this.state.loggedInStatus}/>
            )}
           
           ></Route>
          
          <Route exact 
          path="/dashboard" 
            render={props=>(
              <Dashboard {...props} handleLogin={this.handleLogin} loggedInStatus ={this.state.loggedInStatus}/>
            )}
          
          ></Route>

          {/* <Route exact
          path="/logout"
          handleLogout ={this.handleLogout}
          ></Route> */}
         
        </Switch>
      </div>
    </BrowserRouter>
     
     {/* <Login/>
     <Register/> */}
     
    </div>
  );
}}

export default App;
