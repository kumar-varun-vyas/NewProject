import React from 'react';
import "./login.css";
import axios from 'axios';

class Login extends React.Component{
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailerr: '',
      passworderr: ''
    }
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  valid = () => {
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
     if(!this.state.email.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')){
      this.setState({ emailerr: "invalid email" })
  }
  else if(!this.state.password.match(decimal) ){
      this.setState({passworderr:" password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter,  one numeric digit, and one special character"})
  }
    else { return true; }


  }
  

 handelSubmit =(e)=>{
   e.preventDefault();

  //  const Email = this.getEmail.value ;
  //  const Password = this.getPassword.value; 
  const Email = this.state.email;
  const Password = this.state.password;
   const data ={Email, Password};

   console.log(data );
   this.setState(
    { emailerr: "", passworderr: "" })
    if (this.valid()) {
    // alert("submitted");
      localStorage.clear();
    

    axios.post(`http://127.0.0.1:8000/api/login?email=${Email}&password=${Password}`)
    .then(res=>{
      if(res.data.token_type==="Bearer"){
        this.handleSuccessfulAuth(res.data);
         const tokenValue = res.data.access_token;
     localStorage.setItem("tokenKey",tokenValue);
      }
      else{
        alert("something went wrong, please retry");
      }
      console.log(res);
    
     

    })
    .catch(error=>{
      alert("something went wrong, Please Retry ")
      console.log("registration error", error)
    });
    console.log("pre-token", localStorage);
  }
 
 
 
 }
 handleSuccessfulAuth(data){
  //TODO update parent component
  this.props.handleLogin(data);
  this.props.history.push("/dashboard");
}

  render(){
    return(
      <React.Fragment>
      <div className = "container">
        <div className= "main-div">
       
         <h1>login</h1>

         <form onSubmit ={this.handelSubmit}>

          <input
           type="text" 
           placeholder ="Enter your email... "
           ref = {(input)=>this.getEmail=input}
           onChange ={(event)=>{this.setState({email: event.target.value})}}
          />
            <p style={{ color: "red", fontSize: 10 }}>{this.state.emailerr}</p>
          <br/>
         
          <input 
           type ="password"
           placeholder = "Enter your password..."
           ref = {(input)=>this.getPassword= input}
           onChange ={(event)=>{this.setState({password: event.target.value})}}

          />
            <p style={{ color: "red", fontSize: 10 }}>{this.state. passworderr}</p>
           <br/>
          
          <button>submit</button>
          <p>If you have not register , Please REGISTER first </p>
          </form>
         
        </div>
      </div>
       
      </React.Fragment>
    )
  }

}

export default Login ;


