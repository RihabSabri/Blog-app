import React,{useState,useContext} from 'react'
import './nav.css'
import { Link } from 'react-router-dom'
import {
    RiMenu3Line, RiCloseLine,RiArrowDropDownFill
} from 'react-icons/ri'
import { Context } from "../../context/Context";

const Nav = () => {
    const [toggle,setToggle]=useState(false)
    const { user,dispatch } = useContext(Context);
    const logoutHandler=()=>{
      dispatch({type:"LOGOUT"})
    }
    return (
        <div className='nav-container'>
            <div className="nav-center">
            { toggle?<button className="toggler" onClick={()=>setToggle(!toggle)}>
              <RiCloseLine className='nav-icon'/>
              </button>
              :<button className="toggler" onClick={()=>setToggle(!toggle)}>
              <RiMenu3Line className='nav-icon'/>
              </button>
              }
              <div className={ toggle?'link-container show-links' :'link-container'}>
              <Link className='nav-link' to='/'>
                01.Home  
              </Link>  
              <div className="dropdown">
              <button className='nav-link btn-cat'>
                03.Catgories
                <RiArrowDropDownFill className='drop-icon'/>
              </button>  
              <div className="dropdrown-menu">
                <Link className='nav-link menu-link' to='/?category=Business Insider'>
                 Business Insider
              </Link> 
              <Link className='nav-link menu-link' to='/?category=Sucess Story'>
                 Success Story
              </Link> 
              <Link className='nav-link menu-link' to='/?category=Crypto Currency'>
                 Crypto Currency
              </Link> 
              <Link className='nav-link menu-link' to='/?category=Tech hack'>
                 Tech hack
              </Link> 
              </div>
              </div>   
              <Link className='nav-link' to='/write'>
                03.Write
              </Link>  
             
                {user?<Link to='/'><button className='login-btn' onClick={logoutHandler}>LogOut</button></Link>: <Link to='/auth/login'><button className="login-btn">
                  Login
                </button>
              </Link>}
              </div>
            </div>
        </div>
    )
}

export default Nav
