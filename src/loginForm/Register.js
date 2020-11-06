import React from 'react';
import './login.css';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name:"",
      email: '',
      password: '',
      nameerr:'',
      emailerr: '',
      passworderr: ''
    }
  }
  valid = () => {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    var letters = /^[A-Za-z]+$/;
    if(!this.state.name.match(letters)){
      this.setState({nameerr:"invalide name"})
    }
    else if (!this.state.email.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')) {
      this.setState({ emailerr: "invalid email" })
    }
    else if (!this.state.password.match(decimal)) {
      this.setState({ passworderr: " password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter,  one numeric digit, and one special character" })
      alert("Password invalid ")
    }
    else { return true; }


  }


  handelSubmit = (e) => {
    e.preventDefault();

    //  const Email = this.getEmail.value ;
    //  const Password = this.getPassword.value; 
    const Email = this.state.email;
    const Password = this.state.password;
    const Name = this.state.name;
    const data = { Email, Password, Name };

    console.log(data);
    this.setState(
      { emailerr: "", passworderr: "", nameerr:"" })
    if (this.valid()) {
      alert("submitted successfully");
    
    }
  }

    render(){
      return (
        <React.Fragment>
          <div className="container">
            <div className="main-div" >

              <h1>Register</h1>
              <form onSubmit={this.handelSubmit}>

              <input
                  type="text"
                  placeholder="Enter your name... "
                  ref={(input) => this.getEmail = input}
                  onChange={(event) => { this.setState({ name: event.target.value }) }}
                />
                <p style={{ color: "red", fontSize: 10 }}>{this.state.nameerr}</p>
               

                <input
                  type="text"
                  placeholder="Enter your email... "
                  ref={(input) => this.getEmail = input}
                  onChange={(event) => { this.setState({ email: event.target.value }) }}
                />
                <p style={{ color: "red", fontSize: 10 }}>{this.state.emailerr}</p>
               

                <input
                  type="text"
                  placeholder="Enter your password..."
                  ref={(input) => this.getPassword = input}
                  onChange={(event) => { this.setState({ password: event.target.value }) }}

                />
                <p style={{ color: "red", fontSize: 10 }}>{this.state.passworderr}</p>
                

                <button>submit</button>
               
              </form>
              <p>If you have not register , Please REGISTER first </p>

            </div>

          </div>
        </React.Fragment>
      )
    }
  }

  export default Register;