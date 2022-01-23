import React,{useState} from 'react'
const Input = (props) => {
    const [focused,setFocuse]=useState(false)
    return (
        <div>
            <input 
             className="input-login"
            style={{width:'100%'}}
             name={props.name} 
             placeholder={props.placeholder} 
             type={props.type } 
             onChange={props.onChange} 
             required={props.required} 
             pattern={props.pattern} 
             onBlur={(e)=>setFocuse(true)} 
             focused={focused.toString()}
             onFocus={()=>props.name==='confirmation'?setFocuse(true):null}
             />
            <span className='span' >{props.errorMessage}</span>
        </div>
    )
}

export default Input