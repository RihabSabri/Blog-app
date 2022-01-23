import React ,{useEffect,useState,useContext} from 'react'
import './single.css'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';
import {RiPencilLine,RiDeleteBin7Line} from 'react-icons/ri'
import axios from 'axios';
import {Context} from '../../context/Context'

const Single = (props) => {
 const { user } = useContext(Context);
   const location=useLocation()
   const path=location.pathname.split('/')[2]
   const [post,setPost]=useState({})
   const PF="http://localhost:5000/images/"
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [update,setUpdate]=useState(false)

   useEffect(()=>{
       const getOnePost=async()=>{
           const res=await axios.get(`http://localhost:5000/api/v1/posts/${path}`)
           setPost(res.data.post);
           setTitle(res.data.post.title)
           setContent(res.data.post.content)

       }
       
       getOnePost()
       
   },[path])
   
   const deleteHandler=async()=>{
       try{
           await axios.delete(`http://localhost:5000/api/v1/posts/${path}`,{data:{author:user.username}})
           window.location.replace('/');
       }
       catch(error){
           console.log(error)
               }
   }
   const updateHandler=async()=>{
      setUpdate(true)
   }
   const updatePost =async()=>{
       try{
          const res = await axios.patch(`http://localhost:5000/api/v1/posts/${path}`,{author:user.username,title,content})
          res.data&& window.location.reload()
       }
       catch(error){
           console.log(error)
       }
   }
   
   return (
    <div className='single-post'>
         <div className='single-post-wrapper'>
                <img className='single-post-img' src={PF+post.cover} alt="cover" />
            <div className='single-post-info'>
               {update ? <input className="update-input single-post-title"  autofocus type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>:<h2 className='single-post-title'>{post.title}</h2>} 
             <div className='update-container'>
                 <div>

                <h4 className='h4-single-post'>By <span className='author'>{post.author}</span></h4>
                <h4  className='h4-single-post'>{new Date(post.updatedAt).toDateString()}</h4>
                 </div>
              {post.author==user?.username &&<div>
                <RiPencilLine className='icon-update' onClick={updateHandler}/>
                <RiDeleteBin7Line className='icon-update' onClick={deleteHandler}/>
              </div> } 
             </div>
            </div>
            <div className='blog-post-container'>
                {update ? <textarea className="update-content blog-post"  value={content} onChange={(e)=>setContent(e.target.value)}/>:<p className='blog-post'>{post.content}</p>}
             </div>
        </div>
        <div className='btn-div'>
        {update? <button className=' single-btn' onClick={updatePost}>Update</button>: <Link to="/">
        <button className=' single-btn'>More Posts</button>
      </Link>}
        
        </div>
    </div>
    )
}

export default Single
