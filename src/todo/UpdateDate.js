import React from 'react';

function UpdateDate(){
  return(
    <div>
    <label>  Schedule Date :-</label>
        <input style={{width :"20px"  }} className="date" type="date"
       placeholder ="YYYY-MM-DD" 
       
      //  ref ={(input)=>this.getDate=input}
        /> 
  </div>
  )
}

export default UpdateDate;