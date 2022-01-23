import React from 'react'
import { Link } from 'react-router-dom'
import './post.css'
const Post = (props) => {
    return (
        <div className='post-conatiner'>
           <div className="img-container">
            <img src={props.img} alt="Post image" className="post-image" />
               </div>  
            <div className="title-desc">
                <div className="of-hidden">
                <p className="title">
                    {props.title}
                </p>
                 <div className='flex-title-time'>
                 <Link to={`/?author=${props.author}`}>
                 <h4>By <span className='author'>{props.author}</span></h4>
                 </Link>
                 
                     <p className="time-stamp" >On {props.time}</p>
                 </div> 
                </div>
                <Link to={`/post/${props.id}`}>
                <button className='read-more-btn'>Read More</button>
                </Link>
            </div> 
        </div>
    )
}

export default Post
