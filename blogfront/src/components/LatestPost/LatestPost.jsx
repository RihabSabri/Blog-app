import React,{useState,useEffect} from 'react'
import './latepost.css'
import latest from '../../assets/latest.jpg'
import {Link,useLocation} from 'react-router-dom'
import  axios from 'axios'
const LatestPost = () => {
    const [post,setPost]=useState([])
     const { search } = useLocation();
     const PF="http://localhost:5000/images/"
        useEffect(()=>{
        const getTitle=async()=>{
                try{
                    const res=await axios.get("http://localhost:5000/api/v1/posts?last=true")
                    setPost(res.data.posts[0])
                }
                catch(error){
                    console.log(error)
                }
        }
         getTitle()
    }
   
    ,[search])
    return (
        <div className='latest-post-container'>
            <div className="latest-post-center">
           <div className="cover-part">
               <img src={PF+post.cover} alt="Latest Post" className="latest-img" />
            </div> 
            <div className="des-author">
                <h2 className="latest-post-title">
                   {post.title}
                </h2>
                <h4>By <span className='author'>{post.author}</span></h4>
                <Link to={`/post/${post._id}`}>
                <button className='read-more-btn'>Read More</button>
                </Link>
                
            </div>
            </div>
        </div>
    )
}

export default LatestPost
