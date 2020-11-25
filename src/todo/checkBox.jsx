import React from 'react'

export const CheckBox = props => {
    return (
      <li>
       <input key={props.id} onClick={props.handleCheckChildElement}
        type="checkbox" defaultChecked={props.disabled||props.isChecked}
         value={props.id}  disabled = {props.isDisabled}/> {props.id}
     
     
     
     
      </li>
    )
}

export default CheckBox