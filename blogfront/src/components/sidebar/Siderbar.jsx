import React,{useEffect,useState,useContext} from 'react'
import './sidebar.css'
import {Link} from 'react-router-dom'
import {RiRedditLine, RiLinkedinLine,RiTwitterLine,RiSearch2Line,RiSendPlaneLine,RiTerminalLine } from "react-icons/ri";
import axios from 'axios'
import { Context } from "../../context/Context";

const Siderbar = () => {
    const [title,setTitle]=useState([])
    const { user } = useContext(Context);
    useEffect(()=>{
        const getTitle=async()=>{
                try{
                    const res=await axios.get("http://localhost:5000/api/v1/posts?special=true")
                    setTitle(res.data.posts)
                }
                catch(error){
                    console.log(error)
                }
        }
         getTitle()
    }
   
    ,[])
    return (
        <div className='sidebar-container'>
          <div className="sidebar-inner">

              {user &&<div className="user-frame">
                <Link to={`/user/${user._id}`}>
                <h2 className='user-name'>{user.username}</h2>
                </Link>  
              </div>}
              <div className='search'>
                 <input className='input-search' type='text' placeholder='Search ..'/>
                 <button className="search-btn">
                 <RiSearch2Line className='icon-search'/>
                 </button>
              </div>
              <h3 className="about-title">
                  About this blog
              </h3>
              <p className="about-text">
                  This Blog website was created by Rihab Sabri, a software engineer, a Tech head and a proud woman.
                  The aim of this blog is to highlight women in technological fields and celebrate their roles and contributions 
                  but most importantly to inspire younger girls to proceed in STEM fields and Tech industry.
              </p> 
              <hr/>
              <h3 className="about-title">
                  Special Posts
              </h3>
              <div className='link-sidebar'>
                  {title.map((title)=>
                   <Link className="sidebar-link" to={`/post/${title._id}`}>
                  <RiTerminalLine className='flicker'/>
                   {title.title}
                 </Link>
                  )}
             
 
              </div>
              <hr/>
               <h3 className="about-title">
                  Subscribe
                 </h3>
               <div className='search'>
                 <input className='input-search' type='text' placeholder='Your email ...'/>
                 <button className="search-btn">
                 <RiSendPlaneLine className='icon-search'/>
                 </button>
              </div>
              <h3 className="about-title">
                  Find me on
              </h3>
              <div className='icon-div'>
              <a href='https://www.linkedin.com/in/rihab-sabri-44292b186/' target='_blank'><RiLinkedinLine className='icon-sidebar'/></a>
              <a href='https://www.reddit.com/user/emilia_ravenclaw' target='_blank'><RiRedditLine className='icon-sidebar'/></a>
               <a href='https://twitter.com/sabri_rihab' target='_blank'><RiTwitterLine className='icon-sidebar'/></a>
              </div>

          </div>
        </div>
    )
}

export default Siderbar
