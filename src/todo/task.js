import React from 'react';
import {connect} from 'react-redux';

class Task extends React.Component{

  render(){

    return(
      <div className="task">
        <h3>{this.props.task.title}</h3>
        <p>{this.props.task.status}</p>
        <button>Edit</button>
        <button
          onClick= {()=>this.props.dispatch({type: "DELETE_POST",
             id:this.props.post.id})}
        >Delete</button>
      </div>
    )
  }
}

export default connect()(Task);