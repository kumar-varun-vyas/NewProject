import React ,{useState}from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
 
const ReactCalendar=(props)=> {
  const [date, setDate] = useState(new Date());
 
  
  const refreshPage=()=>{
    window.location.reload(false);
  }

  const onChange = date =>{
    setDate(date);
    const token = localStorage.getItem('tokenKey');
    console.log("token", token);
    let taskId = props.id;
    console.log("task id", taskId)
    console.log(props.Id)
   
    const baseUrl="http://127.0.0.1:8000/api/task/timing";
    axios.post(baseUrl,
        
          {
            schedule_time: date.toLocaleDateString("fr-CA"),
            task_id:props.id


          }
         ,
        {
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer '+token
          },}
      
      ).then(response=>{
        console.log(response);
        if(response.status ===201){
          refreshPage();
        }
     
      
        // if(response.data.status === true){
        // this.refreshPage();}
 

      })
      .catch(error=>{
        console.log(error.response);
      
      })

  }
  
 
 
  return (
    <div>
      <Calendar
      key = {props.Id}
        onChange={onChange}
      
        value={date}
      
      
       
      ></Calendar>
      {console.log(date)}
      
      {date.toLocaleDateString("fr-CA")}
    
      
    </div>
  );
}
export default ReactCalendar;


