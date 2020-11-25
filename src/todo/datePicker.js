import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
 const OnDatePicker = props =>{
  return(
    <DatePicker 
   
    componentId={props.componentId}
      selected ={props.selected} 
      onChange ={props.onChange}
      name = {props.id}
      dateFormat="yyyy-MM-dd"
    />
  )
}
export default OnDatePicker;