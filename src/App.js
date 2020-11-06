
import './App.css';
import Login from './loginForm/Login';
import Register from './loginForm/Register';
import {
  BrowserRouter as Router,
  Route, Link, Switch
}from 'react-router-dom';
import Demo from './demo';

function App() {
  return (
    <div className="App">
    <Router>
      <div>
        <ul className="nav">
          <li>
          <Link style={{ color:"blue",display:"block", textAlign:"center",
            textDecoration:"none",marginRight:10 }} to="/">login</Link>
            </li>
            <li>
            <Link style={{ color:"blue",display:"block", textAlign:"center",
            textDecoration:"none" }} to="/register">Register</Link>
          </li>
        </ul>
        <Switch>
        <Route exact path="/register" component={Register}></Route>
          <Route exact path="/" component = {Login}></Route>
         
        </Switch>
      </div>
    </Router>
     
     {/* <Login/>
     <Register/> */}
     <Demo/>
    </div>
  );
}

export default App;
