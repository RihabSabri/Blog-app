import React from 'react'
import LatestPost from '../LatestPost/LatestPost'
import Post from '../Post/Post'
import './posts.css'
const Posts = ({posts}) => {
    const PF="http://localhost:5000/images/"
    return (
        <div className='posts-container'>
            <div className="posts-inner">
                    <LatestPost/> 
            <div className="posts-flex">
               <div className="posts">
                   {
                      posts.map((post)=>
                          <Post img={PF+post.cover} title={post.title} author={post.author} time={new Date(post.updatedAt).toDateString()} id={post._id} />
                      ) 
                   }
                   
               </div>
               </div>
            </div>
        </div>
    )
}

export default Posts
