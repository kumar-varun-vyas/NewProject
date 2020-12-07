import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import "./createTask.css"


 class CreateTask extends React.Component{

  constructor(){
    super();
    this.state ={
      title : "",
      id:'',
      state:'',
      schedule_time:''

    }
  }
  refreshPage(){
    window.location.reload(false);
  }
  handleSubmit=(e)=>{
     
  //  e.preventDefault();
    const Title = this.getTitle.value;
    const Status ='incomplete';
    const Date = this.getDate.value;
    const data = {
      Title,
      Status,
      Date
    }
    console.log(data);
    const token = localStorage.getItem('tokenKey');
    console.log("token", token);
   
    const baseUrl="http://127.0.0.1:8000/api/create/task";
    axios.post(baseUrl,
        
          {
           title:Title,
           status: Status,
           schedule_time: Date

          }
         ,
        {
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer '+token
          },}
      
      ).then(response=>{
        console.log(response);
        console.log(response.data.data.title);
        console.log(response.data.data.id);
        console.log(response.data.data.schedule_time)
        if(response.data.status === true){
        this.refreshPage();}
        // { this.setState({ title :response.data.data.title})}
        // {this.setState({id:response.data.data.id})}  
         
         
        
        
      })
      .catch(error=>{
        console.log(error.response);
        alert("title should be between 6 and 20 character and retry ");
      })
    

   
    // this.getTitle.value ='';
    // this.getStatus.value ="";
   console.log("disTitle =", this.state.title, "id=",this.state.id);
    // this.props.dispatch({
    //   type : 'ADD_TASK',
    //   id: this.state.id,
    //   title:this.state.title,
    //   status: Status,

      
    // })
  
this.getTitle.value = "";
this.getDate.value ="";
  }

  render(props){

    return(
      <React.Fragment>
      <div className="form">

      <h2>todo task</h2>
     

      <label>Task :- </label>
      <input type="text" 
      placeholder ="enter your title"
      ref={(input)=>this.getTitle = input}
       />
       
       <label>  Schedule Date :-</label>
        <input className="date" type="date"
       placeholder ="YYYY-MM-DD" 
       
       ref ={(input)=>this.getDate=input} /> 
      
       <button onClick={
         ()=>{this.handleSubmit();
        }
       }>ADD</button>


    
     
        </div>
      </React.Fragment>

    );
  }

}

export default connect()(CreateTask);

