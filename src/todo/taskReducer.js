const taskReducer = (state=[], action) =>{
  switch(action.type){
    case 'ADD_TASK':
      return state.concat([action.data]);
    
     

    default:
        return state;
  }

}

export default taskReducer;