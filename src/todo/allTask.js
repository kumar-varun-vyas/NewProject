import React,{Component} from 'react';
import {connect} from 'react-redux';

import Task from './task';

class AllTask extends Component{

  render(){
    return(
      <div>
        <h2>all task</h2>
        {this.props.tasks.map((task)=> <Task key={task.id} task = {task} />)}
      </div>
    );
  }
}

const mapStateToProps =(state)=>{

  return {
    tasks:state
  }
}


export default connect(mapStateToProps)(AllTask); 