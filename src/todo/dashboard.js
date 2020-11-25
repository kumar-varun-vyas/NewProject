
import React from 'react';
import CreateTask from './createTask';
import './dashBoard.css';
import CheckBox from './checkBox';
import OnDatePicker from './datePicker';

import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
import moment from 'moment';

const token = localStorage.getItem('tokenKey');


export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      tasks:[],
      taskId:[],
      isCheck:false,
      date:null,
      todayTasks:[],
      sevenDaysTasks:[],
      showTodayTask: false,
      showAllTask:false,
      showSevenDaysTask: false

    
    }
    this.fetchData= this.fetchData.bind(this); 
    this.deleteTask=this.deleteTask.bind(this);
  
    this.hideComponent = this.hideComponent.bind(this);
   // this.onClickAllTask = this.onClickAllTask.bind(this);
  

    console.log("localStorage", localStorage.getItem("tokenKey"));
    // this.refreshPage = this.refreshPage.bind(this);
    // console.log(this.state.date);
  }
  componentDidMount(){
    const token = localStorage.getItem('tokenKey');
  }
  hideComponent(name){
    switch(name){
      case "showAlltask":
        
         this.setState({showAllTask :true});
         this.setState({showTodayTask : false});
         this.setState({ showSevenDaysTask: false});
        
      break;
      
      case "showTodayTask":
         this.setState({showTodayTask :true});
         this.setState({showAllTask : false});
         this.setState({ showSevenDaysTask: false});
        
       
        break;
      case "showSevenDaysTask":
        this.setState({ showSevenDaysTask:true });
        this.setState({showAllTask : false});
        this.setState({showTodayTask : false});
        break;
        default : return null ;  
    }
  }
 
 

    fetchData(e){
      if(this.state.showAllTask){
        this.setState({showTodayTask : false});
        this.setState({
          showSevenDaysTask:false
        });
      }
     
      // e.preventDefault();
     // const token = localStorage.getItem('tokenKey');
      console.log("token", token);
      const baseUrl="http://127.0.0.1:8000/api/get/task";
      axios.get(baseUrl , 
     {
       headers: {
           'Accept': 'application/json',
           'Authorization': 'Bearer '+token
       },}
          
          ).then(response=>{
            console.log(response);
            this.setState({tasks:response.data.data});

            console.log(this.state.tasks);
          

   
          })
          .catch(error=>{
            console.log(error.response);
            alert("something went wrong please try agian");
          })
    
    }

    fetchTodayTask(e){
      
     
      const baseUrl="http://127.0.0.1:8000/api/today/task";
      axios.get(baseUrl , 
     {
       headers: {
           'Accept': 'application/json',
           'Authorization': 'Bearer '+token
       },}
          
          ).then(response=>{
            console.log(response);
            this.setState({todayTasks:response.data.data});

            console.log(this.state.todayTasks);

   
          })
          .catch(error=>{
            console.log(error.response);
            alert("something went wrong please try agian");
          })

    }

   fetchSevenDaysTask(){
    const baseUrl="http://127.0.0.1:8000/api/sevenDays/task";
    axios.get(baseUrl , 
   {
     headers: {
         'Accept': 'application/json',
         'Authorization': 'Bearer '+token
     },}
        
        ).then(response=>{
          console.log(response);
          this.setState({sevenDaysTasks:response.data.data});
          // console.log(response.data.data)
          console.log(this.state.sevenDaysTasks);

 
        })
        .catch(error=>{
          console.log(error.response);
          alert("something went wrong please try agian");
        })

   }

deleteTask(id){
  if(window.confirm('Are you sure?')){
   
    axios.post("http://127.0.0.1:8000/api/delete" ,
    {task_id:id}  ,
  
    {
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+token
      },}
    
    
    ).then(response=>{
      console.log(response);
     
    }).catch(error=>{
      console.log(error.response);
      alert("something went wrong please try agian");
    })
  }

}



  
handleCheckChildElement = (event) =>{
  
  let tasks = this.state.tasks
  tasks.forEach(task => {
    console.log(event.target.value, task.id);
       if (task.id == event.target.value){
         // event.target.checked =task.status
        console.log( event.target.checked); 

         let statusSet = '';
         if(event.target.checked){
           statusSet ="complete";
         }
         else{
           statusSet = "incomplete"
         }
         const token = localStorage.getItem('tokenKey');
         axios.post(`http://127.0.0.1:8000/api/update/task/${task.id}`,
         {status: statusSet},
         {
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer '+token
          },}

         ).then(res=>{
           console.log(res.data.data)
           
          
         }).catch(
           error=>{
             console.log(error.response);
             alert("something went wrong please try agian");

           }
         )
 
          }     
    })
    this.setState({tasks :tasks})
  console.log("new state=",this.state.tasks)

}
// onClickAllTask=()=>{
 
//     this.hideComponent("showAllTask");
 
//  this.fetchData;
// }


  render() {
    const {showAllTask , showSevenDaysTask, showTodayTask} = this.state;
    {console.log(showAllTask)}
    {console.log(showTodayTask)}
    {console.log(showSevenDaysTask)}
    return (
      <React.Fragment>
      <div className="container-div">

        <CreateTask />
        <hr />
        <div className="setButtons">
          <button onClick={(e)=>{
            this.hideComponent("showAlltask");      
             this.fetchData(e);
          
            } }
          type='button'>All tasks</button>
         
          <button onClick={()=>
          {
          this.hideComponent("showTodayTask");
          this.fetchTodayTask() ;
          }}
           type='button'>today's task </button>

          {/* //button for 7 days */}
          <button onClick={()=>
          {
          this.hideComponent("showSevenDaysTask");
          this.fetchSevenDaysTask();
       
          }}
           type='button'
          
          >7 days task</button>

        </div>
        <h3>tasks</h3>
         <div className ="tasks">
           {
            showAllTask &&
             this.state.tasks.map((task, id)=>{
               {/* console.log(task.status); */}
                  const isDisabled =()=> {if(task.status == "complete"){
                    return true;
                  }else{
                    return false;
                  }
                  }
                  {/* console.log("isDisabled", isDisabled()); */}
              
             return(
               <div className = "taskTitle">
                <ul>
                  <div className="task-container" key={id}>
                  {/* <input type="checkbox" /> */}
                
                    <li>
                    <div>
                   
                    <CheckBox handleCheckChildElement = {this.handleCheckChildElement}{...task}
                     disabled = {isDisabled()}  />
                    {task.title }
                    <br/>
                    {task.schedule_time}

         
                    
                     
                  <button onClick = {()=>{
                    this.deleteTask(task.id)}}
                  >delete</button>
                  {/* <button>complete</button> */}
                  </div>
                  </li>
                  </div>
                </ul>

               </div>
              ) })
           }
         </div>
         <div className="tasks">
         {
         
          
          showTodayTask &&
           
           this.state.todayTasks.map((task, id)=>{
            const isDisabled =()=> {if(task.status == "complete"){
                    return true;
                  }else{
                    return false;
                  }
                  }
              return (

                  <div className="taskTitle">

                  <ul>
                  <div className="task-container" key={id}>
                  {/* <input type="checkbox" /> */}
                
                    <li>
                    <div>
                   
                    <CheckBox handleCheckChildElement = {this.handleCheckChildElement}{...task}
                     disabled = {isDisabled()}  />
                    {task.title }
                    <br/>
                    {task.schedule_time}

         
                    
                     
                  <button onClick = {()=>{
                    this.deleteTask(task.id)}}
                  >delete</button>
                  {/* <button>complete</button> */}
                  </div>
                  </li>
                  </div>
                </ul>


                  </div>


              )
          }
          
          
          
          )}
          
        
         
          
         
         </div>
         <div>
           {
             showSevenDaysTask &&
             this.state.sevenDaysTasks.map((task, id)=>{
            const isDisabled =()=> {if(task.status == "complete"){
                    return true;
                  }else{
                    return false;
                  }
                  }
              return (

                  <div className="taskTitle">

                  <ul>
                  <div className="task-container" key={id}>
                  {/* <input type="checkbox" /> */}
                
                    <li>
                    <div>
                   
                    <CheckBox handleCheckChildElement = {this.handleCheckChildElement}{...task}
                     disabled = {isDisabled()}  />
                    {task.title }
                    <br/>
                    {task.schedule_time}

         
                    
                     
                  <button onClick = {()=>{
                    this.deleteTask(task.id)}}
                  >delete</button>
                  {/* <button>complete</button> */}
                  </div>
                  </li>
                  </div>
                </ul>


                  </div>


              )
          }
          
          
          
          )
           }
         </div>
        
      </div>
      </React.Fragment>
    )
  }
}