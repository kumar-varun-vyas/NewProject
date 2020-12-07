
import React from 'react';
import CreateTask from './createTask';
import './dashBoard.css';
import CheckBox from './checkBox';
import ReactCalendar from './Calendar';
import LocalStorage from './localStorage';
import UpdateDate from './UpdateDate';

// import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
import moment from 'moment';  

const token = localStorage.getItem('tokenKey');
const localStorageToken = LocalStorage;

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
      showAllTask:true,
      showSevenDaysTask: false,
      showSearchResult:false,
      searchResult:[],
      search:'',
      countAllTask:'',
      countSevenDaysTask:'',
      countTodayTask:'',
      refresh:0,
      openCalendar:false,
      openCalendarId:''

    
    }
    this.fetchData= this.fetchData.bind(this); 
    this.deleteTask=this.deleteTask.bind(this);
  
    this.hideComponent = this.hideComponent.bind(this);
   // this.onClickAllTask = this.onClickAllTask.bind(this);
    this.handleSearchChange=this.handleSearchChange.bind(this);
    this.countAllTask=this.countAllTask.bind(this);
    this.countTodayTask=this.countTodayTask.bind(this);
    this.countSevenDaysTask=this.countSevenDaysTask.bind(this);
    this.refreshPage=this.refreshPage.bind(this);
    // console.log("localStorage", localStorage.getItem("tokenKey"));
   this.onShowCalender= this.onShowCalender.bind(this);
  }
  componentDidMount(){
   
   
  
    // const localStorageToken = LocalStorage;
    console.log(token);
    this.fetchData();
 
  }
  // useEffect(){
  //   this.refreshPage();
  // }
  refreshPage(){
    window.location.reload(false);
    this.setState({refresh: 1})
  }
  hideComponent(name){
    switch(name){
      case "showAlltask":
        
         this.setState({showAllTask :true});
         this.setState({showTodayTask : false});
         this.setState({ showSevenDaysTask: false});
         this.setState({showSearchResult:false});
        
      break;
      
      case "showTodayTask":
         this.setState({showTodayTask :true});
         this.setState({showAllTask : false});
         this.setState({ showSevenDaysTask: false});
         this.setState({showSearchResult:false});
        
       
        break;
      case "showSevenDaysTask":
        this.setState({ showSevenDaysTask:true });
        this.setState({showAllTask : false});
        this.setState({showTodayTask : false});
        this.setState({showSearchResult:false});
        break;
        case "showSearchResult":
          this.setState({showSearchResult:true});
          this.setState({showAllTask : false});
          this.setState({showTodayTask : false});
          this.setState({ showSevenDaysTask: false});

        default : return null ;  
    }
  }
 
 

    fetchData(e){
       
     console.log(token);
      const baseUrl="http://127.0.0.1:8000/api/get/task";
      axios.get(baseUrl , 
     {
       headers: {
           'Accept': 'application/json',
           'Authorization': 'Bearer '+ token
       },}
          
          ).then(response=>{
            console.log(response);
            this.setState({tasks:response.data.data});
            
            console.log(this.state.tasks);
          
            this.countAllTask();
   
          })
          .catch(error=>{
            console.log(error.response);
            if(error.response.status===401){
              alert("please Refreash page")
            }else{
            alert("something went wrong please try agian");
            }
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

handleSearchChange(e){
  
 
 
 let title = this.getTitle.value;
  if(title!== ''){
    
      
    axios.get(`http://127.0.0.1:8000/api/search?title=${title}` ,
   
  
    {
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ token
      },}
    
    
    ).then(response=>{
      console.log(response)
     if(response.data.status ===true){
      this.setState({
        searchResult:response.data.data
      })
      console.log(this.state.searchResult);

    }else{
      alert("Value not matched ,Please try somthing else ")
    }
     
    }).catch(error=>{
      console.log(error.response);
      alert("something went wrong please try agian");
    })
    this.getTitle.value = "";

  }else{
    alert("please enter some value")
  }
 
}
countAllTask(){
  axios.get("http://127.0.0.1:8000/api/count/task",
  {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ token
    },}
       
       ).then(response=>{
         console.log(response.data.status);
         if(response.data.status=== true){
         this.setState({countAllTask:response.data.data})
         }else{
          this.setState({countAllTask:"0"})
         }

       })
       .catch(error=>{
         console.log(error.response);
         alert("something went wrong please try agian");
       })
}
countTodayTask(){
  axios.get("http://127.0.0.1:8000/api/today/count",
  {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+token
    },}
       
       ).then(response=>{
         console.log(response.data.status);
         if(response.data.status===true){
         this.setState({
           countTodayTask:response.data.Today
         })
         }else{
          this.setState({
            countTodayTask:"0"
          })
         }

       })
       .catch(error=>{
         console.log(error.response);
         alert("something went wrong please try agian");
       })
}
countSevenDaysTask(){
  axios.get("http://127.0.0.1:8000/api/sevenDays/count",
  {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+token
    },}
       
       ).then(response=>{
         console.log(response.data.status);
         if(response.data.status){
         this.setState({
           countSevenDaysTask:response.data.Today
         })
         }else{
          this.setState({
            countSevenDaysTask:"0"
          })
         }

       })
       .catch(error=>{
         console.log(error.response.data);
         if(error.response.data.status===false){
          this.setState({
            countSevenDaysTask:"0"
          })
         }else{
         alert("something went wrong please try agian");
        }
       })
}

onShowCalender(event){
  let tasks = this.state.tasks
  tasks.forEach(task => {
   
       if (task.id == event.target.value){
        console.log(event.target.value, task.id);
         // event.target.checked =task.status
         this.setState({
          openCalendar:!this.state.openCalendar,
       

        });
        this.setState({openCalendarId: task.id},
        console.log(this.state.openCalendarId));

       

        }
}
  )}
  deleteDate(id){
    if(window.confirm('Are you sure?')){
     
      axios.post("http://127.0.0.1:8000/api/date/delete" ,
      {date_id:id}  ,
    
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


  render() {
    const {showAllTask , showSevenDaysTask, showTodayTask,showSearchResult, openCalendar} = this.state;
   
    {console.log(openCalendar)}
    return (
      <React.Fragment>
      <div className="container-div">

        <CreateTask count = {this.countAllTask} />
        <hr />
        <div className="setButtons">
          <button onClick={(e)=>{
            this.hideComponent("showAlltask");      
             this.fetchData(e);
             this.countAllTask();
          
            } }
          type='button'>All Tasks</button>
         
          <button onClick={()=>
          {
          this.hideComponent("showTodayTask");
          this.fetchTodayTask() ;
          this.countTodayTask();
          }}
           type='button'>Today's Task </button>

          {/* //button for 7 days */}
          <button onClick={()=>
          {
          this.hideComponent("showSevenDaysTask");
          this.fetchSevenDaysTask();
          this.countSevenDaysTask(); 
          }}
           type='button'
          
          >7 Days Task</button>
          

        </div>
        {/* <h3>Tasks</h3> */}
         <div className ="tasks">
         <input type="text" className="input" placeholder="Search by Title..."
           ref={(input)=>this.getTitle = input}
          //  onChange ={(event)=>{this.setState({search: event.target.value})}}
 
          

         /><button  onClick={()=>{
            this.hideComponent("showSearchResult");
             this.handleSearchChange();
           }}>Search</button>
            
           <div>  
       { showAllTask && <p>All tasks (incomplete/total):- {this.state.countAllTask}</p>} 
         
          
        
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
                   <table className="table">
                 
                   
                   
                   
                   <td>
                    <CheckBox handleCheckChildElement = {this.handleCheckChildElement}
                    {...task}
                     disabled = {isDisabled()} 
                     onChange ={this.countAllTask}
                      />
                      </td>
                      <td>
                    <h4>{task.title}</h4> 
                    
                    </td>
                    <td  className="dropdown">
                        <h3 className="dropbtn">dates &#8595;</h3>
                       {/* <button className="dropbtn">dates</button> */}
                        <div  className="dropdown-content">
                        {task.schedule_time.map((date)=>{
                         return(
                        <div>
                      
                          <tr>
                             <li>
                              <p>{date.schedule_time}</p>
                       
                             </li>
                            <li>
                             <button
                              type="delete"
                              onClick = {()=>{
                              this.deleteDate(date.id);
                              this.fetchData();
                              }}
                            >dlt</button>
                           </li>
                          </tr>
                        </div>
                        )

                    })}
                    </div>
                 </td>
                    
         
                    
                     <td>
                  <button onClick = {()=>{
                    this.deleteTask(task.id);
                    this.fetchData();
                    }}
                  >Delete</button>
                  </td>
                    <td>
                   
                   
                     <button value={task.id}
                     onClick={(event)=>{this.onShowCalender(event)

                    }}>
                    setDate 
                   
                      </button>
                      
                    </td>
                    
                    {/* {  this.state.openCalendarId===task.id &&  */}
                  { ((this.state.openCalendarId===task.id )&& openCalendar) &&
                      <ReactCalendar 
                        Id={this.state.openCalendarId}
                        {...task}
                        fatchData ={this.fetchData}
                      />}
                    
                  
                  </table>
                  </div>
                  </li>
                  </div>
                </ul>

               </div>
              ) })
           }
         </div>
         </div>
         <div className="tasks">
           <div>

                {   showTodayTask && <p>today tasks :- {this.state.countTodayTask}</p>}
                
            

                {   showTodayTask &&
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
                          <table className="table">
                          <td>
                              <CheckBox handleCheckChildElement = {this.handleCheckChildElement}{...task}
                              disabled = {isDisabled()}  />
                            </td> 
                            <td>
                            <h4>{task.title}</h4> 
                            </td>
                            <td  className="dropdown">
                            <h3 className="dropbtn">dates &#8595;</h3>
                       {/* <button className="dropbtn">dates</button> */}
                        <div  className="dropdown-content">
                        {task.schedule_time.map((date)=>{
                         return(
                        <div>
                      
                          <tr>
                             <li>
                              <p>{date.schedule_time}</p>
                       
                             </li>
                            <li>
                             <button
                              type="delete"
                              onClick = {()=>{
                              this.deleteDate(date.id);
                              this.fetchData();
                              }}
                            >dlt</button>
                           </li>
                          </tr>
                        </div>
                        )

                    })}
                    </div>
                 </td>
                            <td>
                              <button onClick = {()=>{
                              this.deleteTask(task.id)}}
                              >delete</button>
                          </td> 
                          <td>
                   
                   
                   <button value={task.id}
                   onClick={(event)=>{this.onShowCalender(event)

                  }}>
                  setDate 
                 
                    </button>
                    
                  </td>
                  
                  {/* {  this.state.openCalendarId===task.id &&  */}
                  { ((this.state.openCalendarId===task.id )&& openCalendar) &&
                    <ReactCalendar 
                      Id={this.state.openCalendarId}
                      {...task}
                      fatchData ={this.fetchData}
                    />}
                          </table>
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
         <div className="tasks">
         {
             
          showSevenDaysTask &&<p> 7 days tasks :- {this.state.countSevenDaysTask}</p>}
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
                    <table className="table">
                    <td>
                    <CheckBox handleCheckChildElement = {this.handleCheckChildElement}{...task}
                     disabled = {isDisabled()}  />
                     </td>
                    <td>
                    <h4>{task.title}</h4> 
                    </td>
                    <td  className="dropdown">
                    <h3 className="dropbtn">dates &#8595;</h3>
                       {/* <button className="dropbtn">dates</button> */}
                        <div  className="dropdown-content">
                        {task.schedule_time.map((date)=>{
                         return(
                        <div>
                      
                          <tr>
                             <li>
                              <p>{date.schedule_time}</p>
                       
                             </li>
                            <li>
                             <button
                              type="delete"
                              onClick = {()=>{
                              this.deleteDate(date.id);
                              this.fetchData();
                              }}
                            >dlt</button>
                           </li>
                          </tr>
                        </div>
                        )

                    })}
                    </div>
                 </td>
         
                    
                   <td>  
                  <button onClick = {()=>{
                    this.deleteTask(task.id);
                    this.fetchSevenDaysTask();
                    }}
                  >delete</button>
                  </td>
                  <td>
                   
                   
                     <button value={task.id}
                     onClick={(event)=>{this.onShowCalender(event)

                    }}>
                    setDate 
                   
                      </button>
                      
                    </td>
                    
                    {/* {  this.state.openCalendarId===task.id &&  */}
                    { ((this.state.openCalendarId===task.id )&& openCalendar) &&
                      <ReactCalendar 
                        Id={this.state.openCalendarId}
                        {...task}
                        fatchData ={this.fetchData}
                      />}
                  </table>
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
         <div className="tasks">
         {
         
          
        showSearchResult &&
          
          this.state.searchResult.map((task, id)=>{
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
                   <table className="table">
                    <td>
                   <CheckBox handleCheckChildElement = {this.handleCheckChildElement}{...task}
                    disabled = {isDisabled()}  />
                    </td>
                    <td>
                    <h4>{task.title}</h4> 
                   </td>
                   <td  className="dropdown">
                   <h3 className="dropbtn">dates &#8595;</h3>
                       {/* <button className="dropbtn">dates</button> */}
                        <div  className="dropdown-content">
                        {task.schedule_time.map((date)=>{
                         return(
                        <div>
                      
                          <tr>
                             <li>
                              <p>{date.schedule_time}</p>
                       
                             </li>
                            <li>
                             <button
                              type="delete"
                              onClick = {()=>{
                              this.deleteDate(date.id);
                              this.fetchData();
                              }}
                            >dlt</button>
                           </li>
                          </tr>
                        </div>
                        )

                    })}
                    </div>
                 </td>
        
                   
                   <td> 
                 <button onClick = {()=>{
                   this.deleteTask(task.id)}}
                 >delete</button>
                 </td>
                 <td>
                   
                   
                   <button value={task.id}
                   onClick={(event)=>{this.onShowCalender(event)

                  }}>
                  setDate 
                 
                    </button>
                    
                  </td>
                  
                  {/* {  this.state.openCalendarId===task.id &&  */}
                  { ((this.state.openCalendarId===task.id )&& openCalendar) &&
                    <ReactCalendar 
                      Id={this.state.openCalendarId}
                      {...task}
                      fatchData ={this.fetchData}
                    />}
                 </table>
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
        
      </div>
      </React.Fragment>
    )
  }
}